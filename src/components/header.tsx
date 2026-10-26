"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ContactButton } from "./contact";
import { ArrowUpRight } from "./icons";

const links = [
  { href: "design", label: "Design" },
  { href: "code", label: "Code" },
  { href: "about", label: "Über mich" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");
  const menuButton = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-20% 0px -55% 0px" },
    );
    document
      .querySelectorAll("main > section[id]")
      .forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    }
    function closeOutside(event: PointerEvent) {
      if (!header.current?.contains(event.target as Node)) setMenuOpen(false);
    }
    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOutside);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOutside);
    };
  }, [menuOpen]);

  return (
    <header className="site-header" ref={header}>
      <div className="shell header-inner">
        <Link
          href="/"
          className="logo"
          aria-label="Lars Knoke – Startseite"
          onClick={() => setMenuOpen(false)}
        >
          <Image
            src="/images/logo.svg"
            alt="Lars Knoke"
            width={155}
            height={17}
            priority
          />
          <span className="logo-dot" />
        </Link>
        <button
          ref={menuButton}
          className={`menu-toggle ${menuOpen ? "is-open" : ""}`}
          type="button"
          aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
        </button>
        <nav
          id="main-navigation"
          aria-label="Hauptnavigation"
          className={`main-nav ${menuOpen ? "is-open" : ""}`}
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={`/#${link.href}`}
              aria-current={
                pathname === "/" && active === link.href
                  ? "location"
                  : undefined
              }
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <ContactButton
            className="nav-contact"
            onOpen={() => setMenuOpen(false)}
          >
            Projekt anfragen <ArrowUpRight width={17} height={17} />
          </ContactButton>
        </nav>
      </div>
    </header>
  );
}
