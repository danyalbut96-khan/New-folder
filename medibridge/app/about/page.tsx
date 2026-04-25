import type { Metadata } from "next"
import Link from "next/link"
import Footer from "@/components/Footer"

export const metadata: Metadata = {
  title: "About MediBridge — AI Medicine Finder for Pakistan",
  description: "Learn about MediBridge, the AI-powered medicine substitute finder built for Pakistan.",
}

export default function AboutPage() {
  const steps = [
    { num: "01", title: "Type Medicine Name", desc: "Enter any medicine name — brand or generic", icon: "⌨️" },
    { num: "02", title: "AI Analyzes Instantly", desc: "Our AI searches thousands of Pakistan medicines", icon: "🤖" },
    { num: "03", title: "Get Affordable Alternatives", desc: "Compare prices and availability instantly", icon: "💰" },
  ]

  const techStack = [
    { name: "Next.js 14", desc: "App Router + TypeScript", icon: "⚡" },
    { name: "OpenRouter AI", desc: "Llama 3.1 8B Instruct", icon: "🤖" },
    { name: "Framer Motion", desc: "Smooth animations", icon: "🎬" },
    { name: "Tailwind CSS", desc: "Utility-first styling", icon: "🎨" },
    { name: "Vercel", desc: "Zero-config deployment", icon: "🚀" },
  ]

  return (
    <main className="min-h-screen mesh-bg">
      {/* Simple Navbar for About */}
      <nav className="sticky top-0 z-50 navbar-glass">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">💊</span>
            <span className="text-xl font-bold gradient-text" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              MediBridge
            </span>
          </Link>
          <Link
            href="/"
            className="text-sm text-slate-400 hover:text-white transition-colors border border-white/10 rounded-xl px-4 py-2 hover:border-sky-400/40"
          >
            ← Back to Home
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 pt-16 pb-20">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-300 text-sm font-medium mb-6">
            🇵🇰 Built for Pakistan
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
            About <span className="gradient-text">MediBridge</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            We believe every Pakistani deserves access to affordable medication. MediBridge uses AI to help you find verified, cheaper alternatives when your medicine is unavailable or too expensive.
          </p>
        </div>

        {/* Problem + Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="glass-card p-6">
            <div className="text-3xl mb-3">😟</div>
            <h2 className="text-xl font-bold text-white mb-2">The Problem</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              In Pakistan, prescribed medicines are often unavailable, too expensive, or discontinued. People search Google and get unreliable, unverified information that can be dangerous.
            </p>
          </div>
          <div className="glass-card p-6">
            <div className="text-3xl mb-3">✨</div>
            <h2 className="text-xl font-bold gradient-text mb-2">Our Solution</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              MediBridge uses AI to instantly find verified, affordable medicine substitutes available in Pakistan — with pricing, availability, and safety information — in seconds.
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white text-center mb-8">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {steps.map((step, i) => (
              <div key={i} className="glass-card p-6 text-center">
                <div className="step-number mb-2">{step.num}</div>
                <div className="text-3xl mb-3">{step.icon}</div>
                <h3 className="text-white font-bold mb-2">{step.title}</h3>
                <p className="text-slate-500 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Tech Stack</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {techStack.map((tech) => (
              <div key={tech.name} className="glass-card p-4 flex items-center gap-3">
                <span className="text-2xl">{tech.icon}</span>
                <div>
                  <p className="text-white font-semibold text-sm">{tech.name}</p>
                  <p className="text-slate-500 text-xs">{tech.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Medical Disclaimer */}
        <div className="disclaimer-box mb-12">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚕️</span>
            <div>
              <h3 className="text-amber-300 font-bold mb-2">Important Medical Disclaimer</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                MediBridge is an informational tool and is NOT a substitute for professional medical advice, diagnosis, or treatment. The information provided is generated by AI and may not be 100% accurate. Always consult a licensed doctor, pharmacist, or healthcare professional before switching, stopping, or changing any medication. Never make medical decisions based solely on AI-generated information.
              </p>
            </div>
          </div>
        </div>

        {/* Contact / Feedback */}
        <div className="glass-card p-8 text-center">
          <div className="text-3xl mb-3">💬</div>
          <h2 className="text-xl font-bold text-white mb-2">Feedback & Contact</h2>
          <p className="text-slate-400 text-sm mb-5">
            Found a bug or have suggestions? We&apos;d love to hear from you!
          </p>
          <a
            href="https://cloudexify.site"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gradient inline-block"
          >
            Visit Cloudexify →
          </a>
        </div>
      </div>

      <Footer language="en" />
    </main>
  )
}
