"use client"

import { motion } from "framer-motion"
import type { Substitute } from "@/types/medicine"
import { getMedicineTypeIcon, formatPrice } from "@/lib/utils"
import { translations, type Language } from "@/lib/translations"

interface SubstituteCardProps {
  substitute: Substitute
  index: number
  language: Language
  isCompareSelected: boolean
  onCompareToggle: (id: string) => void
}

export default function SubstituteCard({
  substitute,
  index,
  language,
  isCompareSelected,
  onCompareToggle,
}: SubstituteCardProps) {
  const t = translations[language]

  const typeColors: Record<string, string> = {
    tablet: "#0EA5E9",
    syrup: "#10B981",
    injection: "#EF4444",
    cream: "#F59E0B",
    drops: "#8B5CF6",
  }
  const typeColor = typeColors[substitute.type] || "#0EA5E9"
  const icon = getMedicineTypeIcon(substitute.type)

  const priceConfig = {
    cheaper: { label: t.cheaper, cls: "badge-cheaper", arrow: "↓" },
    same: { label: t.same, cls: "badge-same", arrow: "→" },
    expensive: { label: t.expensive, cls: "badge-expensive", arrow: "↑" },
  }[substitute.priceComparison]

  const availConfig = {
    high: { label: t.avail_high, fillCls: "avail-fill-high", color: "#10B981" },
    medium: { label: t.avail_med, fillCls: "avail-fill-medium", color: "#F59E0B" },
    low: { label: t.avail_low, fillCls: "avail-fill-low", color: "#EF4444" },
  }[substitute.availability]

  const stars = Array.from({ length: 5 }, (_, i) => i + 1)
  const filledStars = Math.round(substitute.rating)

  const handleShare = async () => {
    const shareText = `${t.share_text}\n${substitute.name} — PKR ${formatPrice(substitute.estimatedPrice)}\nvia MediBridge`
    if (navigator.share) {
      await navigator.share({ title: "MediBridge", text: shareText, url: window.location.href })
    } else {
      await navigator.clipboard.writeText(shareText)
      alert("Copied to clipboard!")
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      className={`glass-card p-5 cursor-default h-full flex flex-col ${isCompareSelected ? "ring-2 ring-sky-400" : ""}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
            style={{
              background: `${typeColor}18`,
              border: `1.5px solid ${typeColor}35`,
            }}
          >
            {icon}
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-base text-white leading-tight truncate">{substitute.name}</h3>
            <p className="text-slate-500 text-xs mt-0.5 truncate">{substitute.manufacturer}</p>
          </div>
        </div>
        {/* Strength badge */}
        <span className="flex-shrink-0 text-xs px-2 py-1 rounded-lg border border-white/10 text-slate-400">
          {substitute.strength}
        </span>
      </div>

      {/* Salt */}
      <div className="mb-4">
        <span className="badge-salt">{substitute.salt}</span>
      </div>

      {/* Price Row */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs text-slate-500 mb-0.5">{t.price}</p>
          <p className="text-xl font-bold text-white">
            PKR <span className="gradient-text">{formatPrice(substitute.estimatedPrice)}</span>
          </p>
        </div>
        <span className={`badge ${priceConfig.cls}`}>
          {priceConfig.arrow} {priceConfig.label}
        </span>
      </div>

      {/* Availability */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1.5">
          <p className="text-xs text-slate-500">{t.availability}</p>
          <p className="text-xs font-medium" style={{ color: availConfig.color }}>
            {availConfig.label}
          </p>
        </div>
        <div className="avail-bar">
          <div className={`avail-fill ${availConfig.fillCls}`} />
        </div>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-1.5 mb-4">
        {stars.map((s) => (
          <span key={s} className={s <= filledStars ? "star-filled" : "star-empty"}>
            ★
          </span>
        ))}
        <span className="text-xs text-slate-500 ml-1">{substitute.rating.toFixed(1)}</span>
      </div>

      {/* Note */}
      {substitute.note && (
        <p className="text-xs text-slate-500 italic mb-4 flex-1">{substitute.note}</p>
      )}

      {/* Footer Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-white/5 mt-auto">
        <label className="flex items-center gap-2 cursor-pointer group">
          <input
            type="checkbox"
            checked={isCompareSelected}
            onChange={() => onCompareToggle(substitute.id)}
            className="w-4 h-4 rounded accent-sky-400"
          />
          <span className="text-xs text-slate-500 group-hover:text-slate-300 transition-colors">
            {t.compare}
          </span>
        </label>
        <button
          onClick={handleShare}
          className="flex items-center gap-1 text-xs text-slate-500 hover:text-sky-400 transition-colors px-2 py-1 rounded-lg hover:bg-sky-400/10"
          aria-label="Share substitute"
        >
          <span>🔗</span>
          {t.share}
        </button>
      </div>
    </motion.div>
  )
}
