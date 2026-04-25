"use client"

import Link from "next/link"
import { translations, type Language } from "@/lib/translations"

interface FooterProps {
  language: Language
}

export default function Footer({ language }: FooterProps) {
  const t = translations[language]

  return (
    <footer className="relative mt-16 border-t border-white/5">
      <div className="navbar-glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">💊</span>
                <span className="text-xl font-bold gradient-text" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  MediBridge
                </span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
                AI-powered medicine substitute finder for Pakistan. Making healthcare more accessible, one search at a time.
              </p>
              <div className="flex items-center gap-1.5 mt-3 text-sky-400/70 text-sm">
                🇵🇰 Made for Pakistan
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm">Navigation</h4>
              <div className="flex flex-col gap-2">
                {[
                  { href: "/", label: t.nav_home },
                  { href: "#search", label: t.nav_search },
                  { href: "/about", label: t.nav_about },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-slate-500 hover:text-sky-400 text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Disclaimer */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm">⚕️ Medical Disclaimer</h4>
              <p className="text-slate-500 text-xs leading-relaxed">
                MediBridge provides information for educational purposes only. Always consult a licensed doctor or pharmacist before switching or changing any medication.
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-slate-600 text-xs">
              © 2025 MediBridge. All rights reserved.
            </p>
            <p className="text-slate-600 text-xs">
              Made with ❤️ by{" "}
              <a
                href="https://cloudexify.site"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-400 hover:text-sky-300 transition-colors"
              >
                Cloudexify
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
