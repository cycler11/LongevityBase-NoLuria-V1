import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Longevity Base - Curated Marketplace for Longevity Products",
  description:
    "Discover personalized longevity products curated for your goals. Take our quiz to find evidence-based tools for sleep, HRV, metabolic health, and more.",
  keywords: ["longevity", "healthspan", "sleep tracking", "HRV", "metabolic health", "supplements", "wellness"],
  openGraph: {
    title: "Longevity Base - Personalized Longevity Products",
    description: "Take our quiz to discover longevity products tailored to your goals and lifestyle.",
    type: "website",
  },
    generator: 'v0.app'
}

export const viewport = {
  themeColor: "#0066ff",
  width: "device-width",
  initialScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
