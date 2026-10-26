import Image from "next/image";
import type { Metadata } from "next";
import { ContactButton } from "@/components/contact";
import { ArrowDown, ArrowUpRight, Asterisk } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = { alternates: { canonical: "/" } };

const steps = [
  {
    number: "01",
    title: "Zuhören & verstehen.",
    text: "Wir sprechen über deine Idee, deine Ziele und die Menschen, die du erreichen möchtest. Daraus entsteht ein klarer Plan für dein Projekt.",
    tag: "DIE RICHTIGE RICHTUNG",
  },
  {
    number: "02",
    title: "Denken & gestalten.",
    text: "Aus Gedanken werden Struktur und Design. Du siehst früh, wohin die Reise geht, und wir schärfen gemeinsam die Details.",
    tag: "EINE KLARE VISION",
  },
  {
    number: "03",
    title: "Entwickeln & starten.",
    text: "Ich bringe das Design ins Web, prüfe die Umsetzung auf verschiedenen Geräten und begleite dich bis zum Launch – und gerne darüber hinaus.",
    tag: "BEREIT FÜR DIE WELT",
  },
];

export default function Home() {
  return (
    <main id="main">
      <section id="start" className="hero shell" aria-labelledby="hero-title">
        <div className="hero-meta">
          <p className="eyebrow">
            <span className="status-dot" /> FREELANCE DESIGNER & DEVELOPER
          </p>
          <p className="eyebrow hero-location">
            HOLZMINDEN, DEUTSCHLAND <span aria-hidden="true">↗</span>
          </p>
        </div>
        <div className="hero-grid">
          <div className="hero-copy">
            <h1 id="hero-title" className="hero-heading">
              <span>Design.</span>
              <span>Code.</span>
              <span className="mint">
                Wirkung<span className="hero-period">.</span>
              </span>
            </h1>
            <div className="hero-description">
              <p>
                Hi, ich bin Lars. Ich mache aus guten Ideen digitale Erlebnisse,
                die gut aussehen, sich richtig anfühlen und einfach
                funktionieren.
              </p>
              <ContactButton>
                Deine Idee. Unser Start. <ArrowUpRight width={20} height={20} />
              </ContactButton>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-photo">
              <Image
                src="/images/start_side.jpg"
                alt="Kreative Arbeit am Laptop in einem Café"
                fill
                sizes="(max-width: 700px) 100vw, 46vw"
                preload
                className="hero-image"
              />
              <div className="photo-grain" aria-hidden="true" />
              <div className="hero-photo-label">
                <span className="tiny-cross" aria-hidden="true">
                  +
                </span>
                <span>
                  MIT KOPF, HERZ
                  <br />
                  UND EINER MENGE CODE.
                </span>
              </div>
            </div>
            <a href="#design" className="hero-sticker">
              <Asterisk width={35} height={35} />
              <span>
                Von der Idee
                <br />
                <strong>bis ins Web.</strong>
              </span>
              <ArrowDown width={25} height={25} />
            </a>
            <div className="hero-caption">
              <span>DESIGN & ENTWICKLUNG AUS EINER HAND</span>
              <span aria-hidden="true">[ LK — 01 ]</span>
            </div>
          </div>
        </div>
        <div className="hero-bottom">
          <a href="#design" className="scroll-link">
            <span className="scroll-icon">
              <ArrowDown width={16} height={16} />
            </span>
            ENTDECKE, WAS MÖGLICH IST
          </a>
          <span className="hero-bottom-note">
            Gute Zusammenarbeit beginnt mit einem Hallo.
          </span>
          <span className="tiny-cross" aria-hidden="true">
            +
          </span>
        </div>
      </section>

      <div className="expertise-band" aria-label="Leistungsschwerpunkte">
        <div className="shell expertise-inner">
          <span>WEBDESIGN</span>
          <Asterisk />
          <span>DEVELOPMENT</span>
          <Asterisk />
          <span>WEB-APPS</span>
          <Asterisk />
          <span>ONLINE-SHOPS</span>
          <Asterisk />
          <span className="band-last">GUTE IDEEN</span>
        </div>
      </div>

      <section
        id="design"
        className="section shell services-section"
        aria-labelledby="services-title"
      >
        <Reveal>
          <div className="section-top">
            <p className="eyebrow section-label">
              <span>01 /</span> WAS ICH MACHE
            </p>
            <p className="section-aside">
              Ein Ansprechpartner.
              <br />
              Von der ersten Skizze bis zum letzten Pixel.
            </p>
          </div>
          <h2 id="services-title" className="section-heading">
            Deine Vision.
            <br />
            <span className="muted">Mein Handwerk.</span>
          </h2>
        </Reveal>
        <div className="services-grid">
          <Reveal className="service" delay={60}>
            <div className="service-image">
              <Image
                src="/images/design_side.jpg"
                alt="Bildbearbeitung und Gestaltung eines digitalen Entwurfs"
                fill
                sizes="(max-width: 700px) 100vw, 50vw"
              />
              <span className="image-index">01 / DESIGN</span>
              <span className="image-symbol" aria-hidden="true">
                ✳
              </span>
            </div>
            <div className="service-title">
              <h3>
                Design, das bleibt<span className="mint">.</span>
              </h3>
              <span className="service-number">01</span>
            </div>
            <p>
              Der erste Eindruck zählt. Ich gestalte Websites und Interfaces mit
              Charakter – klar in der Führung, durchdacht bis ins Detail und
              gemacht für die Menschen, die sie nutzen.
            </p>
            <ul className="tag-list" aria-label="Design-Leistungen">
              <li>UX & UI Design</li>
              <li>Webdesign</li>
              <li>Responsive Design</li>
            </ul>
            <ContactButton topic="Design" className="text-link">
              Lass uns deine Idee gestalten{" "}
              <ArrowUpRight width={18} height={18} />
            </ContactButton>
          </Reveal>
          <Reveal className="service" delay={140}>
            <div className="service-image">
              <Image
                src="/images/code_side.jpg"
                alt="Quellcode als Grundlage einer individuell entwickelten Website"
                fill
                sizes="(max-width: 700px) 100vw, 50vw"
              />
              <span className="image-index">02 / DEVELOPMENT</span>
              <span className="image-symbol code-symbol" aria-hidden="true">
                &lt;/&gt;
              </span>
            </div>
            <div className="service-title">
              <h3>
                Code, der weiterdenkt<span className="mint">.</span>
              </h3>
              <span className="service-number">02</span>
            </div>
            <p>
              Gutes Design verdient eine ebenso gute Umsetzung. Ich entwickle
              schnelle, zugängliche Websites und Web-Apps mit einer soliden
              technischen Basis, die mit deinen Anforderungen wachsen kann.
            </p>
            <ul className="tag-list" aria-label="Entwicklungsleistungen">
              <li>Webentwicklung</li>
              <li>Online-Shops</li>
              <li>CMS & Web-Apps</li>
            </ul>
            <ContactButton topic="Entwicklung" className="text-link">
              Bringen wir dein Projekt ins Web{" "}
              <ArrowUpRight width={18} height={18} />
            </ContactButton>
          </Reveal>
        </div>
      </section>

      <section id="code" className="code-section" aria-labelledby="code-title">
        <div className="shell code-grid">
          <Reveal className="code-copy">
            <p className="eyebrow section-label">
              <span>02 /</span> MEHR ALS NUR OBERFLÄCHE
            </p>
            <h2 id="code-title" className="section-heading">
              Sieht gut aus.
              <br />
              <span className="mint">Kann auch was.</span>
            </h2>
            <p>
              Eine Website soll nicht nur beeindrucken. Sie soll schnell laden,
              auf dem Smartphone genauso überzeugen wie am großen Bildschirm und
              dir den Alltag leichter machen.
            </p>
            <p>
              Ob schlanke Landingpage, individueller Online-Shop oder komplexe
              Web-Anwendung: Ich wähle die Technik passend zu deinem Projekt.
              Mit Erfahrung im Frontend und Backend – und einem Blick für das
              Ganze.
            </p>
            <div className="code-values">
              <span>
                <i />
                Durchdacht.
              </span>
              <span>
                <i />
                Performant.
              </span>
              <span>
                <i />
                Erweiterbar.
              </span>
            </div>
          </Reveal>
          <Reveal className="code-visual" delay={100}>
            <div className="code-window">
              <div className="code-window-bar">
                <span className="window-dots" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
                <span>deine-idee.tsx</span>
                <span className="code-window-branch">main*</span>
              </div>
              <div
                className="code-window-content"
                aria-label="Eine gute Website verbindet Idee, Design und sauberen Code"
              >
                <div>
                  <span className="line-number">01</span>
                  <span className="code-comment">
                    {"// Gute Ideen verdienen guten Code."}
                  </span>
                </div>
                <div>
                  <span className="line-number">02</span>
                  <span>&nbsp;</span>
                </div>
                <div>
                  <span className="line-number">03</span>
                  <span>
                    <b>const</b> projekt = {"{"}
                  </span>
                </div>
                <div>
                  <span className="line-number">04</span>
                  <span>
                    &nbsp;&nbsp;idee: <em>&apos;Deine Vision&apos;</em>,
                  </span>
                </div>
                <div>
                  <span className="line-number">05</span>
                  <span>
                    &nbsp;&nbsp;design: <em>&apos;Mit Charakter&apos;</em>,
                  </span>
                </div>
                <div>
                  <span className="line-number">06</span>
                  <span>
                    &nbsp;&nbsp;code: <em>&apos;Mit Substanz&apos;</em>,
                  </span>
                </div>
                <div>
                  <span className="line-number">07</span>
                  <span>
                    &nbsp;&nbsp;zusammenarbeit: <em>&apos;Persönlich&apos;</em>
                  </span>
                </div>
                <div>
                  <span className="line-number">08</span>
                  <span>{"};"}</span>
                </div>
                <div>
                  <span className="line-number">09</span>
                  <span>&nbsp;</span>
                </div>
                <div>
                  <span className="line-number">10</span>
                  <span>
                    <b>return</b> &lt;
                    <span className="mint">DeinNächsterSchritt</span> /&gt;;
                    <span className="code-cursor" aria-hidden="true" />
                  </span>
                </div>
              </div>
              <div className="code-window-footer">
                <span>
                  <span className="status-dot" /> Mit Liebe zum Detail.
                </span>
                <span>UTF-8</span>
              </div>
            </div>
            <div className="tech-stack" aria-label="Technologien">
              <span>HTML & CSS</span>
              <span>JavaScript</span>
              <span>React & Next.js</span>
              <span>Node.js</span>
              <span>Ruby & Rails</span>
            </div>
          </Reveal>
        </div>
      </section>

      <section
        id="about"
        className="section shell about-section"
        aria-labelledby="about-title"
      >
        <div className="about-grid">
          <Reveal className="about-visual">
            <div className="about-portrait">
              <Image
                src="/images/coder.jpg"
                alt="Lars Knoke bei der Arbeit am Laptop"
                fill
                sizes="(max-width: 700px) 90vw, 40vw"
              />
              <span className="portrait-corner corner-tl" />
              <span className="portrait-corner corner-br" />
            </div>
            <div className="portrait-caption">
              <span>LARS KNOKE</span>
              <span>DESIGNER. DEVELOPER. MÖGLICHMACHER.</span>
            </div>
            <div className="about-detail-photo">
              <Image
                src="/images/about_side.jpg"
                alt="Arbeitsplatz mit Design und Programmcode auf zwei Bildschirmen"
                fill
                sizes="(max-width: 700px) 40vw, 19vw"
              />
            </div>
            <div className="about-asterisk">
              <Asterisk width={84} height={84} />
            </div>
          </Reveal>
          <Reveal className="about-copy" delay={100}>
            <p className="eyebrow section-label">
              <span>03 /</span> DER MENSCH DAHINTER
            </p>
            <h2 id="about-title" className="section-heading">
              Hi, ich bin Lars<span className="mint">.</span>
              <br />
              <span className="muted">Gut, dass du da bist.</span>
            </h2>
            <p className="about-lead">
              Designer im Kopf.
              <br />
              Entwickler im Herzen.
              <br />
              Und am liebsten beides zusammen.
            </p>
            <p>
              Ich bin freiberuflicher Webdesigner und Entwickler aus Holzminden.
              Was mich antreibt? Aus einer ersten Idee etwas zu machen, das
              Menschen gerne nutzen.
            </p>
            <p>
              Bei mir sprichst du direkt mit dem Menschen, der dein Projekt
              gestaltet und entwickelt. Ich denke mit, stelle Fragen und finde
              Lösungen, die zu dir passen. Persönlich, unkompliziert und mit
              langjähriger Erfahrung.
            </p>
            <div className="about-location">
              <span className="location-mark" aria-hidden="true">
                ↗
              </span>
              <div>
                In Holzminden zu Hause.<span>Im Web überall.</span>
              </div>
              <ContactButton className="round-button">
                <span className="sr-only">
                  Lars kennenlernen und Kontakt aufnehmen
                </span>
                <ArrowUpRight />
              </ContactButton>
            </div>
          </Reveal>
        </div>
      </section>

      <section
        id="ablauf"
        className="section process-section shell"
        aria-labelledby="process-title"
      >
        <Reveal>
          <div className="section-top">
            <p className="eyebrow section-label">
              <span>04 /</span> SO ARBEITEN WIR ZUSAMMEN
            </p>
            <p className="section-aside">
              Gute Ergebnisse brauchen
              <br />
              einen klaren Weg.
            </p>
          </div>
          <h2 id="process-title" className="section-heading">
            Von „Was wäre, wenn …“
            <br />
            <span className="muted">zu „Genau so.“</span>
          </h2>
        </Reveal>
        <div className="process-grid">
          {steps.map((step, index) => (
            <Reveal
              className="process-step"
              key={step.number}
              delay={index * 80}
            >
              <div className="step-top">
                <span>{step.number}</span>
                <ArrowUpRight width={25} height={25} />
              </div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
              <span className="step-tag">{step.tag}</span>
            </Reveal>
          ))}
        </div>
      </section>

      <section
        id="contact"
        className="contact-section"
        aria-labelledby="contact-title"
      >
        <div className="contact-image">
          <Image src="/images/contact_side.jpg" alt="" fill sizes="100vw" />
        </div>
        <div className="shell contact-content">
          <Reveal>
            <p className="eyebrow">
              <span className="status-dot" /> DEIN NÄCHSTES PROJEKT BEGINNT HIER
            </p>
            <div className="contact-title-row">
              <h2 id="contact-title">
                Gute Idee?
                <br />
                <span className="mint">Lass uns reden.</span>
              </h2>
              <ContactButton className="contact-big-button">
                <span className="sr-only">
                  Projekt anfragen und Kontaktformular öffnen
                </span>
                <ArrowUpRight width={60} height={60} />
              </ContactButton>
            </div>
            <div className="contact-bottom">
              <p>
                Ob erste Frage oder konkretes Vorhaben:
                <br />
                Ich freue mich, von dir zu hören.
              </p>
              <a className="contact-email" href={`mailto:${site.email}`}>
                {site.email}
                <ArrowUpRight width={23} height={23} />
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
