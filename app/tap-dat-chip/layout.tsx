import type React from "react"
import type { Metadata } from "next"
import "../newspaper.css"
import "./nfc.css"

const siteUrl = "https://edwardsamarth.vercel.app"
const pageUrl = `${siteUrl}/tap-dat-chip`
const ogImage = `${siteUrl}/images/og-card.png`

export const metadata: Metadata = {
  title: "Tap Dat Chip",
  description:
    "You just tapped an NFC chip on Samarth Ryan Edward's card and landed here. Learn what NFC is, how to set up your own chip, and why you should stick them on everything you own.",
  keywords: [
    "NFC",
    "NFC card",
    "tap chip",
    "Samarth Ryan Edward NFC",
    "sammy_ryed",
    "NFC business card",
    "programmable NFC",
    "NFC tag setup",
  ],
  alternates: {
    canonical: pageUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Tap Dat Chip · Samarth Ryan Edward",
    description:
      "You tapped an NFC chip and landed here. Learn what NFC is and how to make your own programmable card.",
    url: pageUrl,
    siteName: "Samarth Ryan Edward Portfolio",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Samarth Ryan Edward — Tap Dat Chip · NFC",
        type: "image/png",
      },
      {
        url: "/images/prosq.jpeg",
        width: 600,
        height: 600,
        alt: "Samarth Ryan Edward",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tap Dat Chip · Samarth Ryan Edward",
    description:
      "You tapped an NFC chip and landed here. Learn what NFC is and how to set up your own.",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Samarth Ryan Edward — NFC",
      },
    ],
    creator: "@sammy_ryed",
    site: "@sammy_ryed",
  },
}

export default function TapDatChipLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}

