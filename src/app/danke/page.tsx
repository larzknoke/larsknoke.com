import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";

export const metadata: Metadata = {
  title: "Vielen Dank",
  robots: { index: false, follow: true },
};

export default function Danke() {
  return (
    <main id="main" className="message-page shell">
      <p className="eyebrow mint">VIELEN DANK FÜR DEIN INTERESSE</p>
      <h1>
        Gute Ideen
        <br />
        beginnen im Gespräch<span className="mint">.</span>
      </h1>
      <p>
        Ich freue mich auf den Austausch mit dir. Falls du gerade eine Nachricht
        gesendet hast, melde ich mich persönlich bei dir.
      </p>
      <Link href="/" className="button button-primary">
        Zurück zur Startseite <ArrowUpRight width={20} height={20} />
      </Link>
    </main>
  );
}
