"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const messages = [
  "🔍 Searching medicine database...",
  "🤖 AI is analyzing substitutes...",
  "💊 Checking 10,000+ medicines...",
  "✅ Almost ready...",
]

export default function LoadingState() {
  const [msgIndex, setMsgIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((i) => (i + 1) % messages.length)
    }, 1500)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card p-12 flex flex-col items-center justify-center gap-6 my-8"
      style={{ boxShadow: "0 0 80px rgba(14,165,233,0.12)" }}
    >
      {/* Animated Pill */}
      <div className="relative flex items-center justify-center">
        <div
          className="w-20 h-8 rounded-full"
          style={{
            background: "linear-gradient(135deg, #0EA5E9, #10B981)",
            boxShadow: "inset -3px -3px 6px rgba(0,0,0,0.3), inset 3px 3px 6px rgba(255,255,255,0.2), 0 0 40px rgba(14,165,233,0.5)",
            animation: "pillFloat 1s ease-in-out infinite",
          }}
        />
        <div
          className="absolute w-28 h-28 rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, #0EA5E9, transparent)",
            animation: "pulse 2s ease-in-out infinite",
          }}
        />
        {/* Orbiting dot */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute w-20 h-20"
        >
          <div className="w-3 h-3 rounded-full bg-sky-400 absolute -top-1.5 left-1/2 -translate-x-1/2 shadow-lg shadow-sky-400/50" />
        </motion.div>
      </div>

      {/* Message */}
      <div className="text-center">
        <motion.p
          key={msgIndex}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="text-slate-300 font-medium text-lg"
        >
          {messages[msgIndex]}
        </motion.p>
        <p className="text-slate-600 text-sm mt-2">This usually takes 5-10 seconds</p>
      </div>

      {/* Progress dots */}
      <div className="flex gap-2">
        {messages.map((_, i) => (
          <motion.div
            key={i}
            animate={{ scale: i === msgIndex ? 1.3 : 1, opacity: i === msgIndex ? 1 : 0.3 }}
            className="w-2 h-2 rounded-full"
            style={{ background: i === msgIndex ? "#0EA5E9" : "#334155" }}
          />
        ))}
      </div>
    </motion.div>
  )
}
