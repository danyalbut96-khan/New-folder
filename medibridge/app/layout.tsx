import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "MediBridge — AI Medicine Substitute Finder Pakistan",
  description:
    "Find affordable medicine substitutes in Pakistan instantly using AI. MediBridge helps you find alternatives when your prescribed medicine is unavailable or too expensive.",
  keywords:
    "medicine substitute Pakistan, alternative medicine finder, AI pharmacy, generic medicine Pakistan, MediBridge",
  openGraph: {
    title: "MediBridge — AI Medicine Substitute Finder",
    description: "AI-powered medicine substitute finder for Pakistan 🇵🇰",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>💊</text></svg>" />
      </head>
      <body>{children}</body>
    </html>
  )
}
