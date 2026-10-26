import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { ArrowUpRight } from "./icons";

export function Footer() {
  return (
    <footer className="site-footer shell">
      <div className="footer-top">
        <Link
          href="/"
          className="footer-logo"
          aria-label="Lars Knoke – Startseite"
        >
          <Image
            src="/images/logo.svg"
            alt="Lars Knoke"
            width={155}
            height={17}
          />
          <span className="logo-dot" />
        </Link>
        <p>Gutes Design. Sauberer Code. Persönlich gemacht.</p>
        <a href="#top" className="back-to-top" aria-label="Zurück nach oben">
          <ArrowUpRight />
        </a>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Lars Knoke</span>
        <a href={`mailto:${site.email}`}>{site.email}</a>
        <div>
          <Link href="/impressum">Impressum</Link>
          <Link href="/datenschutz">Datenschutz</Link>
        </div>
        <span className="footer-made">
          Mit Liebe zum Detail. Aus Holzminden.
        </span>
      </div>
    </footer>
  );
}
