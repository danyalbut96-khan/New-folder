"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import type { Medicine } from "@/types/medicine"
import { getMedicineTypeIcon, formatPrice } from "@/lib/utils"
import { translations, type Language } from "@/lib/translations"

interface ResultCardProps {
  medicine: Medicine
  warning: string
  language: Language
}

export default function ResultCard({ medicine, warning, language }: ResultCardProps) {
  const t = translations[language]
  const [showAllEffects, setShowAllEffects] = useState(false)

  const typeColors: Record<string, string> = {
    tablet: "#0EA5E9",
    syrup: "#10B981",
    injection: "#EF4444",
    cream: "#F59E0B",
    drops: "#8B5CF6",
  }
  const typeColor = typeColors[medicine.type] || "#0EA5E9"
  const icon = getMedicineTypeIcon(medicine.type)

  const displayedEffects = showAllEffects
    ? medicine.sideEffects
    : medicine.sideEffects.slice(0, 3)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card p-6 sm:p-8 mb-6"
    >
      <div className="flex flex-col sm:flex-row gap-6">
        {/* Icon */}
        <div className="flex-shrink-0">
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl"
            style={{
              background: `${typeColor}20`,
              border: `2px solid ${typeColor}40`,
              boxShadow: `0 0 30px ${typeColor}20`,
            }}
          >
            {icon}
          </div>
        </div>

        {/* Main Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-start gap-3 mb-3">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold gradient-text">{medicine.name}</h2>
              <p className="text-slate-400 text-sm mt-0.5">{medicine.genericName}</p>
            </div>
            <span
              className="badge mt-1"
              style={{
                background: `${typeColor}15`,
                color: typeColor,
                border: `1px solid ${typeColor}30`,
              }}
            >
              {medicine.type.toUpperCase()}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            {/* Salt */}
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">{t.active_salt}</p>
              <span className="badge-salt inline-block">{medicine.salt}</span>
            </div>
            {/* Price */}
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">{t.price}</p>
              <p className="text-2xl font-bold text-white">
                PKR <span className="gradient-text">{formatPrice(medicine.estimatedPrice)}</span>
              </p>
            </div>
            {/* Uses */}
            <div className="sm:col-span-2">
              <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">🩺 {t.uses}</p>
              <p className="text-slate-300 text-sm leading-relaxed">{medicine.uses}</p>
            </div>
            {/* Manufacturer */}
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">{t.manufacturer}</p>
              <p className="text-slate-300 text-sm">{medicine.manufacturer}</p>
            </div>
          </div>

          {/* Side Effects */}
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">⚠️ {t.side_effects}</p>
            <div className="flex flex-wrap gap-2">
              {displayedEffects.map((effect, i) => (
                <span
                  key={i}
                  className="text-xs px-2 py-1 rounded-lg bg-white/5 border border-white/8 text-slate-400"
                >
                  {effect}
                </span>
              ))}
              {medicine.sideEffects.length > 3 && (
                <button
                  className="text-xs px-2 py-1 rounded-lg text-sky-400 hover:text-sky-300 transition-colors"
                  onClick={() => setShowAllEffects(!showAllEffects)}
                >
                  {showAllEffects ? "Show less" : `+${medicine.sideEffects.length - 3} more`}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Warning */}
      {warning && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="warning-box mt-5 flex items-start gap-3"
        >
          <span className="text-xl flex-shrink-0">⚠️</span>
          <p className="text-amber-300 text-sm leading-relaxed">{warning}</p>
        </motion.div>
      )}
    </motion.div>
  )
}
