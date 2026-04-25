"use client"

import { motion } from "framer-motion"
import { translations, type Language } from "@/lib/translations"

interface ErrorStateProps {
  message: string
  language: Language
  onRetry: () => void
  onSearch: (query: string) => void
}

const SUGGESTIONS = ["Panadol", "Brufen", "Augmentin", "Disprin", "Flagyl"]

export default function ErrorState({ message, language, onRetry, onSearch }: ErrorStateProps) {
  const t = translations[language]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card p-10 flex flex-col items-center justify-center gap-5 my-8 text-center"
      style={{ boxShadow: "0 0 60px rgba(239,68,68,0.08)" }}
    >
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="text-6xl"
        style={{ filter: "drop-shadow(0 0 20px rgba(239,68,68,0.5))" }}
      >
        💊
      </motion.div>

      <div>
        <h3 className="text-xl font-bold text-white mb-2">{t.error_title}</h3>
        <p className="text-slate-400 text-sm max-w-sm">{message}</p>
      </div>

      <div>
        <p className="text-xs text-slate-500 mb-3">{t.try_these}</p>
        <div className="flex flex-wrap justify-center gap-2">
          {SUGGESTIONS.map((med) => (
            <button
              key={med}
              className="popular-chip"
              onClick={() => onSearch(med)}
            >
              {med}
            </button>
          ))}
        </div>
      </div>

      <button className="btn-gradient" onClick={onRetry}>
        {t.retry}
      </button>
    </motion.div>
  )
}
