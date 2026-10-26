"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";

type RecaptchaApi = {
  ready: (callback: () => void) => void;
  render: (
    element: HTMLElement,
    options: {
      sitekey: string;
      theme: string;
      callback: (token: string) => void;
      "expired-callback": () => void;
      "error-callback": () => void;
    },
  ) => number;
  reset: (id: number) => void;
};

declare global {
  interface Window {
    grecaptcha?: RecaptchaApi;
  }
}

let scriptPromise: Promise<RecaptchaApi> | undefined;

function loadRecaptcha(): Promise<RecaptchaApi> {
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise((resolve, reject) => {
    if (window.grecaptcha) {
      window.grecaptcha.ready(() => resolve(window.grecaptcha!));
      return;
    }
    const script = document.createElement("script");
    script.src =
      "https://www.google.com/recaptcha/api.js?render=explicit&hl=de";
    script.async = true;
    script.defer = true;
    const timer = setTimeout(fail, 15000);
    function fail() {
      clearTimeout(timer);
      script.remove();
      scriptPromise = undefined;
      reject(new Error("reCAPTCHA konnte nicht geladen werden."));
    }
    script.onerror = fail;
    script.onload = () => {
      clearTimeout(timer);
      if (window.grecaptcha)
        window.grecaptcha.ready(() => resolve(window.grecaptcha!));
      else fail();
    };
    document.head.appendChild(script);
  });
  return scriptPromise;
}

export function Recaptcha({ onToken }: { onToken: (token: string) => void }) {
  const [enabled, setEnabled] = useState(false);
  const [error, setError] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  const tokenCallback = useRef(onToken);

  useEffect(() => {
    tokenCallback.current = onToken;
  }, [onToken]);

  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;
    let widget: number | undefined;
    const node = container.current;
    loadRecaptcha()
      .then((api) => {
        if (cancelled || !node) return;
        widget = api.render(node, {
          sitekey: site.recaptchaSiteKey,
          theme: "dark",
          callback: (token) => tokenCallback.current(token),
          "expired-callback": () => tokenCallback.current(""),
          "error-callback": () => {
            tokenCallback.current("");
            setError(true);
          },
        });
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });
    return () => {
      cancelled = true;
      if (widget !== undefined) window.grecaptcha?.reset(widget);
      node?.replaceChildren();
    };
  }, [enabled]);

  return (
    <div className="captcha-block">
      {!enabled && (
        <>
          <p>
            Für den Spamschutz wird Google reCAPTCHA geladen. Dabei werden Daten
            an Google übermittelt.
          </p>
          <button
            type="button"
            className="text-button"
            onClick={() => setEnabled(true)}
          >
            Spamschutz laden & aktivieren <span aria-hidden="true">↗</span>
          </button>
        </>
      )}
      {enabled && <div ref={container} className="captcha-widget" />}
      {enabled && !error && (
        <p className="captcha-note">
          Bitte den Spamschutz bestätigen, um die Nachricht zu senden.
        </p>
      )}
      {error && (
        <p role="alert" className="form-error">
          Der Spamschutz ist gerade nicht verfügbar. Bitte schreibe mir direkt
          an <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      )}
    </div>
  );
}
