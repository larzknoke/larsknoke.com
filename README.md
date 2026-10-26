# Lars Knoke — Design. Code. Wirkung.

Responsive Next.js-OnePage mit App Router, React und TypeScript (ersetzt die frühere Jekyll/HAML-Website; der Altbestand ist in der Git-Historie).

## Lokal starten

Node.js ab 20.9 (empfohlen: eine aktuelle LTS-Version) und npm installieren, dann:

```sh
npm ci
npm run dev
```

Die Seite läuft unter http://localhost:3000.

```sh
npm run lint
npm run typecheck
npm run build
npm start
```

## Aufbau

- `src/app/page.tsx`: OnePage mit Einstieg, Design, Entwicklung, Vorstellung, Ablauf und Kontakt.
- `src/app/globals.css`: responsives Layout, Farben, Typografie, Animationen und Modal.
- `src/components/contact.tsx`: Kontaktmodal und Versand über Formcarry.
- `src/components/recaptcha.tsx`: Google reCAPTCHA v2, erst nach ausdrücklicher Aktivierung geladen.
- `src/lib/site.ts`: Kontaktdaten und öffentliche Formularkonfiguration.
- `public/images/`: alle sechs Originalfotos und das bisherige Logo.
- `/impressum`, `/datenschutz`, `/danke`: ergänzende Seiten; eigene 404-Seite.
- `next.config.ts`: Weiterleitungen bisheriger Pfade wie `/design`, `/code`, `/about` und `/imprint`.

Manrope und IBM Plex Mono werden lokal ausgeliefert. Keine Google-Fonts-Anfragen, kein Tracking außer Vercel Web Analytics (cookielos, nur auf Vercel aktiv), keine Animation-Bibliothek. Animationen berücksichtigen `prefers-reduced-motion`; Inhalte sind auch ohne JavaScript lesbar. Navigation und Kontaktmodal benötigen JavaScript.

## Kontaktformular

Der bestehende öffentliche Formcarry-Endpunkt und der reCAPTCHA-v2-Site-Key werden aus dem Altbestand übernommen. Optional `.env.example` nach `.env.local` kopieren und die Werte ersetzen. `NEXT_PUBLIC_*` ist öffentlich und wird beim Build eingebunden; hier niemals geheime API- oder reCAPTCHA-Schlüssel eintragen.

Das Formular umfasst Pflichtfeldprüfung, Themenauswahl, Honeypot, reCAPTCHA, Ladezustand, Timeout, Fehlerbehandlung und eine Bestätigung nach erfolgreicher Formcarry-Antwort. Formularwerte bleiben bei einem Fehler erhalten. Der Erfolg wird nur bei einer erfolgreichen HTTP-Antwort mit Formcarry-Code `200` angezeigt.

Vor dem Livegang im bestehenden Formcarry-/Google-Konto prüfen:

- Ist das Formular `rJqKsktpG` noch aktiv, mit dem richtigen Empfänger verbunden und das Kontingent ausreichend?
- Ist der zum Site-Key gehörende reCAPTCHA-v2-Secret-Key in Formcarry hinterlegt?
- Sind die Live-Domain und bei Bedarf `localhost` in der reCAPTCHA-Domainliste freigeschaltet?
- Falls Formcarry auf eine eigene Dankeseite umleiten soll: `https://larsknoke.com/danke` hinterlegen.

Die automatisierten Tests simulieren Formcarry und reCAPTCHA. Sie verschicken keine echten Nachrichten und bestätigen nicht die Zustellung des bestehenden externen Kontos. Die Live-Zustellung muss mit Zugriff auf den tatsächlichen Posteingang geprüft werden.

## Inhalte vor Veröffentlichung

Adresse und E-Mail stammen aus der bisherigen Website. Die veraltete Altersangabe und die Telefonnummer wurden entfernt. Es wurden keine Projekte, Kunden, Bewertungen oder Erfolgszahlen erfunden. Das Impressum und die Datenschutzhinweise sind eine Ausgangsbasis aus vorhandenen Angaben und der neuen technischen Umsetzung. Vor Veröffentlichung aktuelle Anbieterangaben sowie den tatsächlichen Hosting-Anbieter, dessen Protokollierung/Speicherdauer, Auftragsverarbeitung und Drittlandtransfers prüfen und ergänzen. Der konkrete Hosting-Anbieter ist im Repository nicht angegeben. Die private Steuernummer des Altbestands wird nicht neu veröffentlicht.

## Browsertests

```sh
npx playwright install chromium
npm run test:e2e
```

Alternativ mit einem bereits installierten Google Chrome:

```sh
PLAYWRIGHT_CHANNEL=chrome npm run test:e2e
```

Die Tests verwenden den laufenden Server auf Port 3000 oder starten dort einen lokalen Entwicklungsserver. Sie prüfen Navigation, mobile Ansicht, Tastaturbedienung des Modals, Formularvalidierung, simulierten Versand/Fehlerfall, reduzierte Bewegung, Legal-Seiten und automatisierte Zugänglichkeitsregeln mit axe.

Mit `PLAYWRIGHT_BASE_URL=http://127.0.0.1:3100` lässt sich ein bereits gestarteter Produktionsserver prüfen; in diesem Fall startet Playwright keinen eigenen Server.

## Deployment

Vorgesehen ist Vercel: Repository importieren, Framework wird automatisch als Next.js erkannt (Build `npm run build`, keine weitere Konfiguration nötig). Optionale `NEXT_PUBLIC_*`-Variablen aus `.env.example` in den Projekteinstellungen setzen. Alternativ läuft `npm run build` und `npm start` auf jedem Node.js-Hosting.

Technische Referenzen: [Next.js App Router](https://nextjs.org/docs/app/getting-started), [Formcarry](https://docs.formcarry.com/getting-started), [Spam Protection](https://docs.formcarry.com/features/spam-protection).
