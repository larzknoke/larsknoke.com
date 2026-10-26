"use client";

import Link from "next/link";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { site } from "@/lib/site";
import { ArrowUpRight, CheckIcon, CloseIcon } from "./icons";
import { Recaptcha } from "./recaptcha";

type Topic = "Website" | "Design" | "Entwicklung" | "Etwas anderes";
const ContactContext = createContext<(topic?: Topic) => void>(() => {});

export function ContactButton({
  children,
  className = "button button-primary",
  topic,
  onOpen,
}: {
  children: ReactNode;
  className?: string;
  topic?: Topic;
  onOpen?: () => void;
}) {
  const open = useContext(ContactContext);
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        open(topic);
        onOpen?.();
      }}
    >
      {children}
    </button>
  );
}

export function ContactProvider({ children }: { children: ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [topic, setTopic] = useState<Topic>("Website");

  useEffect(() => {
    if (!isOpen) return;
    const node = dialog.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    node?.querySelector<HTMLButtonElement>("button")?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (!node) return;
      if (event.key === "Escape") {
        event.preventDefault();
        setIsOpen(false);
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = Array.from(
        node.querySelectorAll<HTMLElement>(
          'a[href], button:not(:disabled), input:not(:disabled), textarea:not(:disabled), iframe, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter(
        (element) =>
          element.tabIndex >= 0 &&
          element.getClientRects().length > 0 &&
          !element.closest('[aria-hidden="true"]'),
      );
      const first = focusable[0];
      const last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      const target = opener.current?.getClientRects().length
        ? opener.current
        : document.querySelector<HTMLElement>(".menu-toggle");
      target?.focus({ preventScroll: true });
    };
  }, [isOpen]);

  return (
    <ContactContext.Provider
      value={(nextTopic = "Website") => {
        opener.current = document.activeElement as HTMLElement | null;
        setTopic(nextTopic);
        setIsOpen(true);
      }}
    >
      <div inert={isOpen}>{children}</div>
      {isOpen && (
        <div
          className="contact-overlay"
          onClick={(event) => {
            if (event.target === event.currentTarget) setIsOpen(false);
          }}
        >
          {/* Avoid the browser top layer so reCAPTCHA's external challenge remains usable. */}
          <dialog
            open
            ref={dialog}
            className="contact-dialog"
            aria-modal="true"
            aria-labelledby="contact-dialog-title"
            onCancel={(event) => {
              event.preventDefault();
              setIsOpen(false);
            }}
            onClose={() => setIsOpen(false)}
          >
            <button
              type="button"
              className="dialog-close icon-button"
              aria-label="Kontaktformular schließen"
              onClick={() => setIsOpen(false)}
            >
              <CloseIcon />
            </button>
            {isOpen && (
              <ContactForm
                initialTopic={topic}
                onClose={() => setIsOpen(false)}
              />
            )}
          </dialog>
        </div>
      )}
    </ContactContext.Provider>
  );
}

function ContactForm({
  initialTopic,
  onClose,
}: {
  initialTopic: Topic;
  onClose: () => void;
}) {
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  );
  const [token, setToken] = useState("");
  const [captchaKey, setCaptchaKey] = useState(0);
  const request = useRef<AbortController | null>(null);
  const successTitle = useRef<HTMLHeadingElement>(null);

  useEffect(() => () => request.current?.abort(), []);
  useEffect(() => {
    if (state === "success") successTitle.current?.focus();
  }, [state]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "sending" || !token) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    if (data.get("_gotcha")) return;
    data.set("g-recaptcha-response", token);
    setState("sending");
    const controller = new AbortController();
    request.current = controller;
    const timeout = setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch(site.formEndpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
        signal: controller.signal,
      });
      const result = await response.json();
      if (!response.ok || Number(result.code) !== 200)
        throw new Error("Die Nachricht konnte nicht gesendet werden.");
      setState("success");
    } catch {
      setState("error");
      setToken("");
      setCaptchaKey((key) => key + 1);
    } finally {
      clearTimeout(timeout);
      request.current = null;
    }
  }

  if (state === "success")
    return (
      <div className="form-success">
        <span className="success-icon">
          <CheckIcon width={36} height={36} />
        </span>
        <p className="eyebrow">NACHRICHT ANGEKOMMEN</p>
        <h2 id="contact-dialog-title" ref={successTitle} tabIndex={-1}>
          Der erste Schritt
          <br />
          ist gemacht<span className="mint">.</span>
        </h2>
        <p>
          Danke für deine Nachricht! Ich schaue mir deine Idee an und melde mich
          persönlich bei dir.
        </p>
        <button
          className="button button-primary"
          type="button"
          onClick={onClose}
        >
          Zurück zur Seite <ArrowUpRight />
        </button>
      </div>
    );

  return (
    <>
      <p className="eyebrow mint">LASS UNS ETWAS GUTES STARTEN</p>
      <h2 id="contact-dialog-title">
        Was hast du vor<span className="mint">?</span>
      </h2>
      <p className="dialog-intro">
        Eine konkrete Idee oder ein erster Gedanke – erzähl mir davon. Ich freue
        mich auf dein Projekt.
      </p>
      <form
        onSubmit={submit}
        action={site.formEndpoint}
        method="POST"
        className="contact-form"
        aria-busy={state === "sending"}
      >
        <fieldset disabled={state === "sending"}>
          <legend>Worum geht’s?</legend>
          <div className="topic-options">
            {(
              ["Website", "Design", "Entwicklung", "Etwas anderes"] as Topic[]
            ).map((topic) => (
              <label className="topic-option" key={topic}>
                <input
                  type="radio"
                  name="project"
                  value={topic}
                  defaultChecked={topic === initialTopic}
                />
                <span>{topic}</span>
              </label>
            ))}
          </div>
          <div className="form-row">
            <label>
              Dein Name <span aria-hidden="true">*</span>
              <input
                name="name"
                autoComplete="name"
                placeholder="Wie heißt du?"
                required
                minLength={2}
                maxLength={120}
              />
            </label>
            <label>
              Deine E-Mail <span aria-hidden="true">*</span>
              <input
                type="email"
                name="email"
                autoComplete="email"
                placeholder="hallo@beispiel.de"
                required
                maxLength={254}
              />
            </label>
          </div>
          <label>
            Deine Idee <span aria-hidden="true">*</span>
            <textarea
              name="text"
              rows={4}
              placeholder="Was möchtest du bewegen?"
              required
              minLength={10}
              maxLength={5000}
            />
          </label>
          <div className="honeypot" aria-hidden="true">
            <label>
              Dieses Feld bitte leer lassen
              <input name="_gotcha" tabIndex={-1} autoComplete="off" />
            </label>
          </div>
          <p className="form-privacy">
            Deine Angaben werden zur Bearbeitung deiner Anfrage über Formcarry
            verarbeitet. Mehr dazu in den{" "}
            <Link href="/datenschutz" target="_blank" rel="noopener noreferrer">
              Datenschutzhinweisen (neuer Tab)
            </Link>
            . * Pflichtfelder
          </p>
          <Recaptcha key={captchaKey} onToken={setToken} />
          {state === "error" && (
            <p className="form-error" role="alert">
              Das hat leider nicht geklappt. Deine Eingaben sind noch da. Bitte
              versuche es erneut oder schreibe an{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a>.
            </p>
          )}
          <button
            className="button button-primary form-submit"
            type="submit"
            disabled={!token || state === "sending"}
          >
            {state === "sending" ? "Wird gesendet …" : "Nachricht senden"}
            <ArrowUpRight width={20} height={20} />
          </button>
        </fieldset>
      </form>
      <p className="dialog-direct">
        Lieber direkt? <a href={`mailto:${site.email}`}>{site.email}</a>
      </p>
    </>
  );
}
