import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-PK").format(price)
}

export function getMedicineTypeIcon(type: string): string {
  const icons: Record<string, string> = {
    tablet: "💊",
    syrup: "🧪",
    injection: "💉",
    cream: "🧴",
    drops: "💧",
  }
  return icons[type] || "💊"
}

export function getMedicineTypeColor(type: string): string {
  const colors: Record<string, string> = {
    tablet: "#0EA5E9",
    syrup: "#10B981",
    injection: "#EF4444",
    cream: "#F59E0B",
    drops: "#8B5CF6",
  }
  return colors[type] || "#0EA5E9"
}

export function getPriceComparisonBadge(comparison: string): {
  label: string
  color: string
  bg: string
} {
  if (comparison === "cheaper") {
    return { label: "Cheaper", color: "#10B981", bg: "rgba(16,185,129,0.15)" }
  }
  if (comparison === "expensive") {
    return { label: "Expensive", color: "#EF4444", bg: "rgba(239,68,68,0.15)" }
  }
  return { label: "Same Price", color: "#94A3B8", bg: "rgba(148,163,184,0.15)" }
}
