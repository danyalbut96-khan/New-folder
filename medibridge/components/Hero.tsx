"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { translations, type Language } from "@/lib/translations"

const POPULAR = ["Panadol", "Brufen", "Augmentin", "Disprin", "Flagyl", "Risek", "Nexium", "Amoxil"]

const loadingMessages = [
  "🔍 Searching medicine database...",
  "🤖 AI is analyzing substitutes...",
  "💊 Checking 10,000+ medicines...",
  "✅ Almost ready...",
]

interface HeroProps {
  language: Language
  onSearch: (query: string) => void
  isLoading: boolean
  searchHistory: string[]
  onRemoveHistory: (item: string) => void
  onClearHistory: () => void
}

export default function Hero({
  language,
  onSearch,
  isLoading,
  searchHistory,
  onRemoveHistory,
  onClearHistory,
}: HeroProps) {
  const t = translations[language]
  const [query, setQuery] = useState("")
  const [msgIndex, setMsgIndex] = useState(0)

  useEffect(() => {
    if (!isLoading) return
    const interval = setInterval(() => {
      setMsgIndex((i) => (i + 1) % loadingMessages.length)
    }, 1500)
    return () => clearInterval(interval)
  }, [isLoading])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim().length >= 2) onSearch(query.trim())
  }

  const stagger = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.12 } },
  }
  const fadeUp = {
    hidden: { opacity: 0, y: 32 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  }

  return (
    <section id="hero" className="relative min-h-screen mesh-bg flex flex-col items-center justify-center pt-20 pb-16 px-4">
      {/* Floating Pills */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-24 left-[8%] pill-3d" />
        <div className="absolute top-32 right-[12%] pill-3d pill-3d-warm" />
        <div className="absolute top-48 left-[30%] pill-3d pill-3d-teal" />
        <div className="absolute bottom-32 right-[20%] opacity-40" style={{ width: 70, height: 30, borderRadius: 50, background: "linear-gradient(135deg,#0EA5E9,#10B981)", transform: "rotate(30deg)", animation: "pillFloat 4s ease-in-out 2s infinite" }} />
        <div className="absolute bottom-24 left-[15%] opacity-30" style={{ width: 50, height: 22, borderRadius: 50, background: "linear-gradient(135deg,#F59E0B,#EF4444)", transform: "rotate(-20deg)", animation: "pillFloat 5s ease-in-out 1s infinite" }} />
      </div>

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-4xl mx-auto text-center w-full"
      >
        {/* Badge */}
        <motion.div variants={fadeUp} className="mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-300 text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            AI-Powered · Pakistan 🇵🇰 · Free Forever
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight mb-4"
        >
          <span className="text-white block">{t.hero_title}</span>
          <span className="gradient-text block">{t.hero_subtitle}</span>
        </motion.h1>

        {/* Urdu subtext */}
        <motion.p
          variants={fadeUp}
          className="urdu text-slate-400 text-lg mb-8 max-w-xl mx-auto"
        >
          {t.hero_urdu}
        </motion.p>

        {/* Search History */}
        {searchHistory.length > 0 && (
          <motion.div variants={fadeUp} className="mb-4 flex flex-wrap items-center justify-center gap-2">
            <span className="text-slate-500 text-sm">{t.recent}</span>
            {searchHistory.map((item) => (
              <span key={item} className="history-chip" onClick={() => onSearch(item)}>
                {item}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onRemoveHistory(item)
                  }}
                  className="ml-1 text-sky-400/60 hover:text-sky-400 transition-colors"
                  aria-label={`Remove ${item}`}
                >
                  ×
                </button>
              </span>
            ))}
            <button onClick={onClearHistory} className="text-xs text-slate-500 hover:text-slate-300 underline transition-colors">
              {t.clear_all}
            </button>
          </motion.div>
        )}

        {/* Search Box */}
        <motion.div variants={fadeUp} id="search">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl">🔍</span>
              <input
                id="medicine-search"
                type="text"
                className="search-input pl-12"
                placeholder={t.search_placeholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                disabled={isLoading}
                autoComplete="off"
                aria-label="Medicine search input"
              />
            </div>
            <button
              type="submit"
              className="btn-gradient flex items-center justify-center gap-2"
              disabled={isLoading || query.trim().length < 2}
              aria-label="Search for medicine substitutes"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span className="text-sm">{loadingMessages[msgIndex]}</span>
                </>
              ) : (
                <>
                  <span>💊</span>
                  {t.search_btn}
                </>
              )}
            </button>
          </form>
          <p className="text-xs text-slate-600 mt-2 text-center">Press Enter to search</p>
        </motion.div>

        {/* Popular Searches */}
        <motion.div variants={fadeUp} className="mt-6 flex flex-wrap justify-center gap-2">
          {POPULAR.map((med) => (
            <button
              key={med}
              className="popular-chip"
              onClick={() => {
                setQuery(med)
                onSearch(med)
              }}
            >
              {med}
            </button>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={fadeUp}
          className="mt-10 grid grid-cols-3 gap-6 max-w-md mx-auto"
        >
          {[
            { num: "10,000+", label: t.stats_medicines },
            { num: "500+", label: t.stats_companies },
            { num: t.stats_cost, label: t.stat_label_cost },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-extrabold gradient-text">{stat.num}</div>
              <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
      >
        <div className="w-5 h-8 rounded-full border-2 border-white/20 flex items-start justify-center pt-1.5">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-2 rounded-full bg-sky-400"
          />
        </div>
      </motion.div>
    </section>
  )
}
