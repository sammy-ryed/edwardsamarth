import type React from "react"
import type { Metadata } from "next"
import "../newspaper.css"
import "./nfc.css"

export const metadata: Metadata = {
  title: "Tap Dat Chip · Samarth Ryan Edward",
  description: "You just tapped an NFC chip on a card and landed here. Learn what NFC is, how to set up your own chip, and why you should stick them on everything you own.",
  openGraph: {
    title: "Tap Dat Chip · Samarth Ryan Edward",
    description: "You tapped a chip. Now learn how to make your own.",
    type: "website",
    locale: "en_IN",
    images: [{ url: "/images/prosq.jpeg", width: 1200, height: 630, alt: "Samarth Ryan Edward — NFC" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tap Dat Chip · Samarth Ryan Edward",
    description: "You tapped a chip. Now learn how to make your own.",
    images: ["/images/prosq.jpeg"],
  },
}

export default function TapDatChipLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
