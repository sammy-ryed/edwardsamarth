import type React from "react"
import type { Metadata } from "next"
import type { Viewport } from "next"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./newspaper.css"

const siteUrl = "https://edwardsamarth.vercel.app"
const fullName = "Samarth Ryan Edward"
const description =
  "Portfolio of Samarth Ryan Edward — Builder. AI, Fullstack, Games, Tools. B.Tech CSE student at SRMIST who builds everything from mood-detecting AI to apocalypse simulators."
const ogImage = `${siteUrl}/images/og-card.png`

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  // ── Core SEO ──────────────────────────────────────────────
  title: {
    default: `${fullName} — Builder · AI · Fullstack · Portfolio`,
    template: `%s · ${fullName}`,
  },
  description,
  applicationName: `${fullName} Portfolio`,
  authors: [{ name: fullName, url: siteUrl }],
  creator: fullName,
  publisher: fullName,
  generator: "Next.js",
  keywords: [
    "Samarth Ryan Edward",
    "Samarth Edward",
    "sammy_ryed",
    "sammy-ryed",
    "portfolio",
    "fullstack developer",
    "backend developer",
    "AI developer",
    "developer India",
    "SRMIST",
    "SRM KTR",
    "B.Tech CSE",
    "Next.js developer",
    "FastAPI",
    "Python developer",
    "web developer portfolio",
    "software engineer India",
    "MusAIc",
    "Bunker",
    "Bhandi",
    "FlatMate",
    "FlowState",
    "BurstTime Chronicles",
    "The Woven Guild",
    "Here attendance",
  ],
  referrer: "origin-when-cross-origin",
  category: "technology",

  // ── Robots / Indexing ─────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ── Canonical & Alternates ────────────────────────────────
  alternates: {
    canonical: siteUrl,
  },

  // ── Open Graph (Facebook, WhatsApp, LinkedIn, Discord, etc.) ──
  openGraph: {
    title: `${fullName} — Builder · AI · Fullstack · Portfolio`,
    description,
    url: siteUrl,
    siteName: `${fullName} Portfolio`,
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: `${fullName} — Builder · AI · Fullstack Developer Portfolio`,
        type: "image/png",
      },
      {
        url: "/images/prosq.jpeg",
        width: 600,
        height: 600,
        alt: `${fullName}`,
        type: "image/jpeg",
      },
    ],
  },

  // ── Twitter / X ───────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title: `${fullName} — Builder · AI · Fullstack`,
    description,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: `${fullName} — Portfolio`,
      },
    ],
    creator: "@sammy_ryed",
    site: "@sammy_ryed",
  },

  // ── Icons ─────────────────────────────────────────────────
  icons: {
    icon: "/images/prosq.jpeg",
    shortcut: "/images/prosq.jpeg",
    apple: "/images/prosq.jpeg",
  },

  // ── Other Meta (Pinterest, etc.) ──────────────────────────
  other: {
    // Pinterest rich pin
    "pinterest-rich-pin": "true",
    // Allow Pinterest to save content
    "pinterest": "nopin",
    // Revisit interval hint for older crawlers
    "revisit-after": "7 days",
    // Content language
    "content-language": "en",
    // Distribution
    "distribution": "global",
    // Rating
    "rating": "general",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f0e8" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1a1a" },
  ],
}

// ── JSON-LD Structured Data ───────────────────────────────────
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: fullName,
  alternateName: ["sammy_ryed", "sammy-ryed", "Samarth Edward"],
  url: siteUrl,
  image: `${siteUrl}/images/prosq.jpeg`,
  description:
    "B.Tech CSE student at SRMIST. Builder of AI tools, fullstack platforms, browser games, and productivity systems.",
  sameAs: [
    "https://github.com/sammy-ryed",
    "https://www.linkedin.com/in/samarth-ryan-edward-a51047352/",
    "https://instagram.com/sammy_ryed",
    "https://leetcode.com/u/sammy_ryed/",
    "https://codeforces.com/profile/sammy_ryed",
    "https://www.hackerrank.com/profile/edwardsamarth",
  ],
  email: "edwardsamarth@gmail.com",
  jobTitle: "Software Developer",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "SRM Institute of Science and Technology",
    alternateName: "SRMIST",
  },
  knowsAbout: [
    "Artificial Intelligence",
    "Full-Stack Development",
    "Backend Development",
    "Python",
    "Next.js",
    "FastAPI",
    "MySQL",
    "Java",
    "C++",
    "Data Structures and Algorithms",
  ],
  nationality: {
    "@type": "Country",
    name: "India",
  },
}

// ── Second JSON-LD: WebSite (enables site search in Google) ─
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: `${fullName} Portfolio`,
  url: siteUrl,
  description,
  author: {
    "@type": "Person",
    name: fullName,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        {/* Pinterest domain verification — replace XXXXX with your code if you claim on Pinterest */}
        <meta name="p:domain_verify" content="" />
      </head>
      <body>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
