"use client"

import { useEffect } from "react"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("App Error:", error)
  }, [error])

  return (
    <main className="min-h-screen mesh-bg flex items-center justify-center px-4">
      <div className="glass-card p-12 text-center max-w-md w-full">
        <div className="text-6xl mb-5" style={{ filter: "drop-shadow(0 0 20px rgba(239,68,68,0.5))" }}>
          ⚠️
        </div>
        <h1 className="text-2xl font-extrabold text-white mb-2">Something went wrong!</h1>
        <p className="text-slate-400 text-sm mb-8">
          An unexpected error occurred. Please try again or go back home.
        </p>
        <div className="flex gap-3 justify-center">
          <button className="btn-gradient" onClick={reset}>
            Try Again
          </button>
          <Link
            href="/"
            className="px-6 py-3 rounded-xl border border-white/10 text-slate-300 hover:text-white hover:border-white/20 transition-all text-sm font-medium"
          >
            Go Home
          </Link>
        </div>
      </div>
    </main>
  )
}
