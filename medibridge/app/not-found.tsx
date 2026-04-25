import Link from "next/link"

export default function NotFound() {
  return (
    <main className="min-h-screen mesh-bg flex items-center justify-center px-4">
      <div className="glass-card p-12 text-center max-w-md w-full">
        <div
          className="text-7xl mb-6 inline-block"
          style={{
            filter: "drop-shadow(0 0 30px rgba(14,165,233,0.4))",
            animation: "pillFloat 3s ease-in-out infinite",
          }}
        >
          💊
        </div>
        <h1 className="text-6xl font-extrabold gradient-text mb-2">404</h1>
        <h2 className="text-xl font-bold text-white mb-3">Page Not Found</h2>
        <p className="text-slate-500 text-sm mb-8">
          The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you back on track.
        </p>
        <Link href="/" className="btn-gradient inline-block">
          ← Go Home
        </Link>
      </div>
    </main>
  )
}
