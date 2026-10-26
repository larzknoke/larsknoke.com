import type { Metadata, Viewport } from "next";
import "@fontsource-variable/manrope";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import { Analytics } from "@vercel/analytics/next";
import { ContactProvider } from "@/components/contact";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Lars Knoke — Webdesign & Entwicklung aus Holzminden",
    template: "%s — Lars Knoke",
  },
  description:
    "Gutes Design. Sauberer Code. Persönlich gemacht. Lars Knoke entwickelt individuelle Websites, Online-Shops und Web-Apps – von der ersten Idee bis zum Launch.",
  applicationName: "Lars Knoke",
  authors: [{ name: site.name, url: site.url }],
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: site.name,
    title: "Lars Knoke — Design. Code. Wirkung.",
    description:
      "Individuelles Webdesign und Entwicklung aus Holzminden. Von der ersten Idee bis ins Web.",
    images: [
      {
        url: "/images/start_side.jpg",
        width: 1000,
        height: 667,
        alt: "Kreative Arbeit am Laptop – Lars Knoke Webdesign und Entwicklung",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lars Knoke — Design. Code. Wirkung.",
    description: "Webdesign und Entwicklung. Persönlich gemacht.",
    images: ["/images/start_side.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#202221",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de">
      <body id="top">
        <a className="skip-link" href="#main">
          Zum Inhalt springen
        </a>
        <ContactProvider>
          <Header />
          {children}
          <Footer />
        </ContactProvider>
        <Analytics />
      </body>
    </html>
  );
}
