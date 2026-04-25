"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import LoadingState from "@/components/LoadingState"
import ResultCard from "@/components/ResultCard"
import SubstituteCard from "@/components/SubstituteCard"
import ErrorState from "@/components/ErrorState"
import CompareDrawer from "@/components/CompareDrawer"
import Footer from "@/components/Footer"
import type { MedicineResult } from "@/types/medicine"
import { translations, type Language } from "@/lib/translations"

const MAX_HISTORY = 5

function HowItWorks({ language }: { language: Language }) {
  const t = translations[language]
  const steps = [
    { num: "01", title: t.step1_title, desc: t.step1_desc, icon: "⌨️" },
    { num: "02", title: t.step2_title, desc: t.step2_desc, icon: "🤖" },
    { num: "03", title: t.step3_title, desc: t.step3_desc, icon: "💰" },
  ]

  return (
    <section className="max-w-5xl mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
          {t.how_works}
        </h2>
        <div className="w-16 h-1 rounded-full mx-auto" style={{ background: "linear-gradient(90deg, #0EA5E9, #10B981)" }} />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((step, i) => (
          <motion.div
            key={step.num}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="glass-card p-6 text-center group"
          >
            <div className="step-number mb-2">{step.num}</div>
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{step.icon}</div>
            <h3 className="text-white font-bold text-lg mb-2">{step.title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default function HomePage() {
  const [language, setLanguage] = useState<Language>("en")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<MedicineResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [searchHistory, setSearchHistory] = useState<string[]>([])
  const [compareIds, setCompareIds] = useState<string[]>([])
  const [showCompare, setShowCompare] = useState(false)
  const resultsRef = useRef<HTMLDivElement>(null)

  const t = translations[language]

  // Load language & history from localStorage
  useEffect(() => {
    const savedLang = localStorage.getItem("medi-lang") as Language | null
    if (savedLang === "en" || savedLang === "ur") setLanguage(savedLang)
    const savedHistory = localStorage.getItem("medi-history")
    if (savedHistory) {
      try {
        setSearchHistory(JSON.parse(savedHistory))
      } catch {
        /* ignore */
      }
    }
  }, [])

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("medi-lang", lang)
  }

  const saveHistory = (query: string, history: string[]) => {
    const next = [query, ...history.filter((h) => h.toLowerCase() !== query.toLowerCase())].slice(0, MAX_HISTORY)
    setSearchHistory(next)
    localStorage.setItem("medi-history", JSON.stringify(next))
  }

  const handleSearch = useCallback(async (query: string) => {
    setIsLoading(true)
    setError(null)
    setResult(null)
    setCompareIds([])

    try {
      const res = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ medicineName: query }),
      })

      const data = await res.json()

      if (!res.ok || data.error) {
        setError(data.error || "Something went wrong. Please try again.")
      } else {
        setResult(data as MedicineResult)
        saveHistory(query, searchHistory)
        setTimeout(() => {
          resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
        }, 100)
      }
    } catch {
      setError("Network error. Please check your connection and try again.")
    } finally {
      setIsLoading(false)
    }
  }, [searchHistory])

  const handleCompareToggle = (id: string) => {
    setCompareIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : prev.length < 4 ? [...prev, id] : prev
    )
  }

  const removeHistory = (item: string) => {
    const next = searchHistory.filter((h) => h !== item)
    setSearchHistory(next)
    localStorage.setItem("medi-history", JSON.stringify(next))
  }

  const clearHistory = () => {
    setSearchHistory([])
    localStorage.removeItem("medi-history")
  }

  return (
    <main className="min-h-screen" style={{ direction: language === "ur" ? "rtl" : "ltr" }}>
      <Navbar language={language} setLanguage={handleLanguageChange} />

      <Hero
        language={language}
        onSearch={handleSearch}
        isLoading={isLoading}
        searchHistory={searchHistory}
        onRemoveHistory={removeHistory}
        onClearHistory={clearHistory}
      />

      {/* Results Section */}
      <div ref={resultsRef} className="max-w-5xl mx-auto px-4 pb-8">
        <AnimatePresence mode="wait">
          {isLoading && (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <LoadingState />
            </motion.div>
          )}

          {error && !isLoading && (
            <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ErrorState
                message={error}
                language={language}
                onRetry={() => setError(null)}
                onSearch={handleSearch}
              />
            </motion.div>
          )}

          {result && !isLoading && !error && (
            <motion.div
              key="result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Original Medicine */}
              <div className="mb-2">
                <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-4">
                  ⚕️ {t.original_medicine}
                </h2>
                <ResultCard
                  medicine={result.originalMedicine}
                  warning={result.warning}
                  language={language}
                />
              </div>

              {/* Substitutes */}
              {result.substitutes.length > 0 && (
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <h2 className="text-xl font-bold text-white">{t.substitutes_found}</h2>
                      <span className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold gradient-text"
                        style={{ background: "rgba(14,165,233,0.15)", border: "1px solid rgba(14,165,233,0.3)" }}>
                        {result.substitutes.length}
                      </span>
                    </div>
                    {compareIds.length >= 2 && (
                      <motion.button
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="btn-gradient text-sm px-4 py-2"
                        onClick={() => setShowCompare(true)}
                      >
                        Compare ({compareIds.length})
                      </motion.button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {result.substitutes.map((sub, i) => (
                      <SubstituteCard
                        key={sub.id}
                        substitute={sub}
                        index={i}
                        language={language}
                        isCompareSelected={compareIds.includes(sub.id)}
                        onCompareToggle={handleCompareToggle}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Disclaimer */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="disclaimer-box flex items-start gap-3"
              >
                <span className="text-2xl flex-shrink-0">⚕️</span>
                <div>
                  <p className="text-amber-300 font-semibold text-sm mb-1">Medical Disclaimer</p>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {result.disclaimer || t.disclaimer}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* How It Works (shown when no results) */}
      {!result && !isLoading && !error && <HowItWorks language={language} />}

      {/* Compare Drawer */}
      {showCompare && result && (
        <CompareDrawer
          substitutes={result.substitutes}
          compareIds={compareIds}
          onClose={() => setShowCompare(false)}
          language={language}
        />
      )}

      <Footer language={language} />
    </main>
  )
}
