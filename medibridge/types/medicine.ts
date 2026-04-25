export interface Medicine {
  name: string
  genericName: string
  salt: string
  uses: string
  sideEffects: string[]
  manufacturer: string
  estimatedPrice: number
  type: "tablet" | "syrup" | "injection" | "cream" | "drops"
}

export interface Substitute {
  id: string
  name: string
  salt: string
  manufacturer: string
  estimatedPrice: number
  strength: string
  type: "tablet" | "syrup" | "injection" | "cream" | "drops"
  priceComparison: "cheaper" | "same" | "expensive"
  availability: "high" | "medium" | "low"
  rating: number
  note: string
}

export interface MedicineResult {
  originalMedicine: Medicine
  substitutes: Substitute[]
  warning: string
  disclaimer: string
}

export interface SearchError {
  error: string
}
