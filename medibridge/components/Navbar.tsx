"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { translations, type Language } from "@/lib/translations"

interface NavbarProps {
  language: Language
  setLanguage: (lang: Language) => void
}

export default function Navbar({ language, setLanguage }: NavbarProps) {
  const t = translations[language]
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const navLinks = [
    { href: "/", label: t.nav_home },
    { href: "#search", label: t.nav_search },
    { href: "/about", label: t.nav_about },
  ]

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 navbar-glass ${
        scrolled ? "shadow-lg shadow-black/20" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <span className="text-2xl">💊</span>
              <div className="absolute inset-0 bg-sky-400/20 blur-md rounded-full group-hover:bg-sky-400/40 transition-all" />
            </div>
            <span className="text-xl font-bold gradient-text" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              MediBridge
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-400 hover:text-white transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-sky-400 to-emerald-400 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-3">
            {/* Pakistan Badge */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-sky-500/30 text-sky-400 text-xs font-medium">
              🇵🇰 Pakistan
            </div>

            {/* Language Toggle */}
            <div className="lang-toggle">
              <button
                className={`lang-btn ${language === "en" ? "active" : ""}`}
                onClick={() => setLanguage("en")}
              >
                EN
              </button>
              <button
                className={`lang-btn ${language === "ur" ? "active" : ""}`}
                onClick={() => setLanguage("ur")}
              >
                اردو
              </button>
            </div>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <div className="lang-toggle">
              <button
                className={`lang-btn ${language === "en" ? "active" : ""}`}
                onClick={() => setLanguage("en")}
              >
                EN
              </button>
              <button
                className={`lang-btn ${language === "ur" ? "active" : ""}`}
                onClick={() => setLanguage("ur")}
              >
                اردو
              </button>
            </div>
            <button
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <div className="w-5 flex flex-col gap-1.5">
                <span
                  className={`h-0.5 bg-current transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
                />
                <span
                  className={`h-0.5 bg-current transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
                />
                <span
                  className={`h-0.5 bg-current transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            ref={menuRef}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden navbar-glass border-t border-white/5"
          >
            <div className="px-4 py-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-slate-300 hover:text-white hover:bg-white/5 px-4 py-3 rounded-xl transition-all text-sm font-medium"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 border-t border-white/5 mt-1">
                <div className="flex items-center gap-1.5 px-3 py-1.5 w-fit rounded-full border border-sky-500/30 text-sky-400 text-xs font-medium">
                  🇵🇰 Pakistan
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
