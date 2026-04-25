"use client"

import { motion, AnimatePresence } from "framer-motion"
import type { Substitute } from "@/types/medicine"
import { formatPrice, getMedicineTypeIcon } from "@/lib/utils"
import { translations, type Language } from "@/lib/translations"

interface CompareDrawerProps {
  substitutes: Substitute[]
  compareIds: string[]
  onClose: () => void
  language: Language
}

export default function CompareDrawer({ substitutes, compareIds, onClose, language }: CompareDrawerProps) {
  const t = translations[language]
  const selected = substitutes.filter((s) => compareIds.includes(s.id))

  if (selected.length < 2) return null

  const fields: { label: string; key: keyof Substitute }[] = [
    { label: t.price, key: "estimatedPrice" },
    { label: "Strength", key: "strength" },
    { label: t.manufacturer, key: "manufacturer" },
    { label: t.availability, key: "availability" },
    { label: t.rating, key: "rating" },
  ]

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-end justify-center p-4 drawer-overlay"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="glass-card w-full max-w-3xl max-h-[80vh] overflow-auto"
          onClick={(e) => e.stopPropagation()}
          style={{ background: "rgba(10,15,30,0.95)" }}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold gradient-text">Compare Medicines</h3>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all"
              >
                ✕
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <td className="text-slate-500 text-xs uppercase tracking-wider pb-4 pr-4">Field</td>
                    {selected.map((s) => (
                      <th key={s.id} className="text-left pb-4 pr-6 min-w-[160px]">
                        <div className="flex items-center gap-2">
                          <span>{getMedicineTypeIcon(s.type)}</span>
                          <div>
                            <p className="text-white font-bold text-sm">{s.name}</p>
                            <p className="text-slate-500 text-xs font-normal">{s.salt}</p>
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {fields.map(({ label, key }) => (
                    <tr key={key} className="border-t border-white/5">
                      <td className="text-slate-500 py-3 pr-4 text-xs">{label}</td>
                      {selected.map((s) => {
                        const val = s[key]
                        return (
                          <td key={s.id} className="py-3 pr-6">
                            {key === "estimatedPrice" ? (
                              <span className="font-bold text-white">PKR {formatPrice(val as number)}</span>
                            ) : key === "rating" ? (
                              <span className="text-amber-400">{"★".repeat(Math.round(val as number))} {(val as number).toFixed(1)}</span>
                            ) : key === "availability" ? (
                              <span
                                className="badge"
                                style={{
                                  background: val === "high" ? "rgba(16,185,129,0.15)" : val === "medium" ? "rgba(245,158,11,0.15)" : "rgba(239,68,68,0.15)",
                                  color: val === "high" ? "#10B981" : val === "medium" ? "#F59E0B" : "#EF4444",
                                }}
                              >
                                {val as string}
                              </span>
                            ) : (
                              <span className="text-slate-300">{val as string}</span>
                            )}
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
