import type React from "react"
import type { Metadata } from "next"
import type { Viewport } from "next"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./newspaper.css"

export const metadata: Metadata = {
  metadataBase: new URL("https://edwardsamarth.vercel.app"),
  title: "Samarth Ryan Edward",
  description: "Builder. Not just backend. Frontend. AI. Everything. Portfolio of Samarth Ryan Edward.",
  authors: [{ name: "Samarth Ryan Edward" }],
  keywords: ["Samarth Ryan Edward", "portfolio", "fullstack", "backend", "AI", "developer", "India"],
  openGraph: {
    title: "Samarth Ryan Edward",
    description: "Builder. Not just backend. Frontend. AI. Everything.",
    type: "website",
    locale: "en_IN",
    images: [{ url: "/images/prosq.jpeg", width: 1200, height: 630, alt: "Samarth Ryan Edward" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Samarth Ryan Edward",
    description: "Builder. Not just backend. Frontend. AI. Everything.",
    images: ["/images/prosq.jpeg"],
  },
  icons: {
    icon: "/images/prosq.jpeg",
    shortcut: "/images/prosq.jpeg",
    apple: "/images/prosq.jpeg",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
