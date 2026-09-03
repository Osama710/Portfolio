import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { profile } from "@/lib/data";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const siteUrl = "https://muhammadosama.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} | ${profile.title}`,
    template: `%s | ${profile.name}`,
  },
  description: profile.tagline,
  keywords: [
    "Muhammad Osama",
    "Full Stack Software Engineer",
    "Next.js Developer",
    "React Developer Pakistan",
    "Node.js Developer",
    "Fintech Engineer",
    "Raptr Games",
    "Karachi Software Engineer",
  ],
  authors: [{ name: profile.name, url: profile.github }],
  creator: profile.name,
  openGraph: {
    type: "website",
    url: siteUrl,
    title: `${profile.name} | ${profile.title}`,
    description: profile.tagline,
    siteName: `${profile.name} · Portfolio`,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${profile.name}, ${profile.title}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} | ${profile.title}`,
    description: profile.tagline,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.title,
    url: siteUrl,
    email: `mailto:${profile.email}`,
    telephone: profile.phoneHref,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Karachi",
      addressCountry: "PK",
    },
    sameAs: [profile.linkedin, profile.github],
    worksFor: {
      "@type": "Organization",
      name: "Raptr Games",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Usman Institute of Technology",
    },
  };

  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html:
              "@media (prefers-reduced-motion:no-preference){.hero-reveal{opacity:0;transform:translateY(14px);animation:hero-reveal-in .45s cubic-bezier(.22,1,.36,1) both}.hero-rotator-word.is-visible{opacity:1;transform:translateY(0)}.hero-orbit-ring{animation:spin-slow 18s linear infinite}.hero-orbit-icon-spin{animation:spin-slow 14s linear infinite}.hero-orbit-chip-float{animation:hero-orbit-chip-float 3.4s ease-in-out infinite;animation-delay:var(--chip-delay,0s)}.hero-typewriter-cursor{animation:hero-cursor-blink 1s step-end infinite}.hero-count::after{content:\"0+\";display:inline-block;font-variant-numeric:tabular-nums}.hero-count[data-value=\"5\"]::after{animation:hero-count-step-5 .675s linear .34s forwards}.hero-count[data-value=\"10\"]::after{animation:hero-count-step-10 1.35s linear .34s forwards}}@keyframes hero-reveal-in{to{opacity:1;transform:translateY(0)}}@keyframes spin-slow{to{transform:rotate(360deg)}}@keyframes hero-orbit-chip-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}@keyframes hero-cursor-blink{0%,100%{opacity:1}50%{opacity:0}}@keyframes hero-count-step-5{0%,19.99%{content:\"0+\"}20%,39.99%{content:\"1+\"}40%,59.99%{content:\"2+\"}60%,79.99%{content:\"3+\"}80%,99.99%{content:\"4+\"}100%{content:\"5+\"}}@keyframes hero-count-step-10{0%,9.99%{content:\"0+\"}10%,19.99%{content:\"1+\"}20%,29.99%{content:\"2+\"}30%,39.99%{content:\"3+\"}40%,49.99%{content:\"4+\"}50%,59.99%{content:\"5+\"}60%,69.99%{content:\"6+\"}70%,79.99%{content:\"7+\"}80%,89.99%{content:\"8+\"}90%,99.99%{content:\"9+\"}100%{content:\"10+\"}}",
          }}
        />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning className="bg-void font-sans text-ink antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-xl focus:bg-accent-violet focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
