import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";

export default function NotFound() {
  return (
    <main id="main" className="message-page shell">
      <p className="eyebrow mint">404 / KURZ VOM WEG ABGEKOMMEN</p>
      <h1>
        Hier ist noch
        <br />
        Platz für eine Idee<span className="mint">.</span>
      </h1>
      <p>
        Diese Seite gibt es leider nicht. Auf der Startseite findest du Design,
        Code und den direkten Weg zu mir.
      </p>
      <Link href="/" className="button button-primary">
        Zur Startseite <ArrowUpRight width={20} height={20} />
      </Link>
    </main>
  );
}
