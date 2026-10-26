import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Datenschutz",
  description:
    "Informationen zum Datenschutz, zum Kontaktformular und zum Spamschutz auf larsknoke.com.",
  alternates: { canonical: "/datenschutz" },
};

export default function Datenschutz() {
  return (
    <main id="main" className="legal-page shell">
      <Link href="/" className="legal-back">
        ← Zurück zur Startseite
      </Link>
      <p className="eyebrow">TRANSPARENT MIT DEINEN DATEN</p>
      <h1>
        Datenschutz<span className="mint">.</span>
      </h1>
      <p>
        Hier erfährst du, welche personenbezogenen Daten beim Besuch dieser
        Website und bei einer Kontaktaufnahme verarbeitet werden.
      </p>
      <h2>Verantwortlicher</h2>
      <address>
        {site.name}
        <br />
        {site.street}
        <br />
        {site.city}
        <br />
        E-Mail: <a href={`mailto:${site.email}`}>{site.email}</a>
      </address>
      <h2>Besuch der Website</h2>
      <p>
        Beim Aufruf werden technisch notwendige Verbindungsdaten verarbeitet.
        Dazu können IP-Adresse, Zeitpunkt, aufgerufene Seite, Browser,
        Betriebssystem und die zuvor besuchte Seite gehören. Sie dienen der
        Auslieferung und Sicherheit der Website. Grundlage ist das berechtigte
        Interesse an einem sicheren, funktionsfähigen Webangebot nach Art. 6
        Abs. 1 lit. f DSGVO.
      </p>
      <p>
        Diese Website bindet keine Analyse- oder Werbetracker ein. Schriften und
        Bilder werden über die Website selbst ausgeliefert.
      </p>
      <h2>Kontakt per E-Mail oder Formular</h2>
      <p>
        Wenn du Kontakt aufnimmst, werden dein Name, deine E-Mail-Adresse, dein
        gewähltes Projektthema und deine Nachricht verarbeitet, um dir zu
        antworten und deine Anfrage zu bearbeiten. Die Angabe weiterer
        Informationen ist freiwillig.
      </p>
      <p>
        Bei einer projektbezogenen Anfrage erfolgt die Verarbeitung zur
        Durchführung vorvertraglicher Maßnahmen nach Art. 6 Abs. 1 lit. b DSGVO.
        Bei sonstigen Anliegen beruht sie auf dem berechtigten Interesse an der
        Beantwortung von Anfragen nach Art. 6 Abs. 1 lit. f DSGVO. Die Daten
        werden gelöscht, sobald sie für diesen Zweck nicht mehr benötigt werden,
        sofern keine gesetzlichen Aufbewahrungspflichten bestehen.
      </p>
      <h2>Formularversand über Formcarry</h2>
      <p>
        Das Kontaktformular nutzt Formcarry. Erst beim Absenden werden deine
        Formulareingaben an diesen Dienst übermittelt. Dabei werden auch
        technische Verbindungsdaten verarbeitet. Formcarry übernimmt die
        Entgegennahme und Weiterleitung der Nachricht sowie die Spamprüfung.
        Eine Verarbeitung außerhalb der Europäischen Union ist möglich.
      </p>
      <p>
        Weitere Angaben zu Anbieter, Datenverarbeitung und internationalen
        Übermittlungen findest du in der{" "}
        <a
          href="https://formcarry.com/legal/privacy-policy"
          target="_blank"
          rel="noopener noreferrer"
        >
          Datenschutzerklärung von Formcarry
        </a>{" "}
        und der{" "}
        <a
          href="https://formcarry.com/legal/data-processing-agreement"
          target="_blank"
          rel="noopener noreferrer"
        >
          Vereinbarung zur Auftragsverarbeitung
        </a>
        . Alternativ kannst du mich direkt per E-Mail erreichen.
      </p>
      <h2>Spamschutz mit Google reCAPTCHA</h2>
      <p>
        Das Formular verwendet Google reCAPTCHA zum Schutz vor automatisierten
        Nachrichten. Der Dienst wird erst geladen, wenn du „Spamschutz laden &
        aktivieren“ anklickst. Damit willigst du in die Einbindung ein. Google
        kann dabei unter anderem IP-Adresse, Geräte- und Browserinformationen
        sowie Interaktionen verarbeiten und Cookies setzen. Eine Übermittlung an
        Server in den USA ist möglich.
      </p>
      <p>
        Die Einbindung erfolgt auf Grundlage deiner Einwilligung nach Art. 6
        Abs. 1 lit. a DSGVO. Deine Entscheidung wird auf dieser Website nicht
        dauerhaft gespeichert. Du kannst das Formular schließen und die Seite
        neu laden, um eine erneute Einbindung zu vermeiden. Die Rechtmäßigkeit
        der bereits erfolgten Verarbeitung bleibt davon unberührt. Für eine
        Kontaktaufnahme ohne reCAPTCHA steht E-Mail zur Verfügung.
      </p>
      <p>
        Weitere Informationen:{" "}
        <a
          href="https://policies.google.com/privacy?hl=de"
          target="_blank"
          rel="noopener noreferrer"
        >
          Datenschutzerklärung von Google
        </a>{" "}
        und{" "}
        <a
          href="https://policies.google.com/terms?hl=de"
          target="_blank"
          rel="noopener noreferrer"
        >
          Nutzungsbedingungen von Google
        </a>
        .
      </p>
      <h2>Deine Rechte</h2>
      <p>
        Nach Maßgabe der gesetzlichen Voraussetzungen hast du das Recht auf
        Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung und
        Datenübertragbarkeit. Einer Verarbeitung aufgrund berechtigter
        Interessen kannst du aus Gründen, die sich aus deiner besonderen
        Situation ergeben, widersprechen. Eine erteilte Einwilligung kannst du
        jederzeit mit Wirkung für die Zukunft widerrufen.
      </p>
      <p>
        Wende dich dafür an <a href={`mailto:${site.email}`}>{site.email}</a>.
        Außerdem kannst du dich bei einer Datenschutzaufsichtsbehörde
        beschweren, insbesondere beim{" "}
        <a
          href="https://www.lfd.niedersachsen.de/beschwerde"
          target="_blank"
          rel="noopener noreferrer"
        >
          Landesbeauftragten für den Datenschutz Niedersachsen
        </a>
        .
      </p>
    </main>
  );
}
