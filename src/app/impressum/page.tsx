import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Impressum",
  description:
    "Anbieter- und Kontaktangaben von Lars Knoke, Webdesigner und Entwickler aus Holzminden.",
  alternates: { canonical: "/impressum" },
};

export default function Impressum() {
  return (
    <main id="main" className="legal-page shell">
      <Link href="/" className="legal-back">
        ← Zurück zur Startseite
      </Link>
      <p className="eyebrow">DIE ANGABEN DAHINTER</p>
      <h1>
        Impressum<span className="mint">.</span>
      </h1>
      <h2>Anbieter</h2>
      <address>
        {site.name}
        <br />
        {site.street}
        <br />
        {site.city}
        <br />
        Deutschland
      </address>
      <h2>Kontakt</h2>
      <p>
        E-Mail: <a href={`mailto:${site.email}`}>{site.email}</a>
        <br />
        Website: <a href={site.url}>larsknoke.com</a>
      </p>
      <h2>Tätigkeit</h2>
      <p>Freiberufliches Webdesign und Webentwicklung.</p>
      <h2>Datenschutz</h2>
      <p>
        Informationen zur Verarbeitung personenbezogener Daten findest du in den{" "}
        <Link href="/datenschutz">Datenschutzhinweisen</Link>.
      </p>
    </main>
  );
}
