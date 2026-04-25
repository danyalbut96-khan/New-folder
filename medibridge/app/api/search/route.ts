import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { medicineName } = await request.json()

    if (!medicineName || medicineName.trim().length < 2) {
      return NextResponse.json(
        { error: "Please enter a valid medicine name" },
        { status: 400 }
      )
    }

    const prompt = `You are a professional pharmacist in Pakistan with 20 years of experience.
Find complete information and substitutes for: "${medicineName}"

Respond ONLY in valid JSON, no markdown, no backticks, no extra text:

{
  "originalMedicine": {
    "name": "exact medicine name",
    "genericName": "scientific name",
    "salt": "active ingredient + strength",
    "uses": "conditions it treats",
    "sideEffects": ["effect 1", "effect 2", "effect 3"],
    "manufacturer": "company name",
    "estimatedPrice": 50,
    "type": "tablet"
  },
  "substitutes": [
    {
      "id": "sub_1",
      "name": "substitute name",
      "salt": "same active ingredient",
      "manufacturer": "Pakistani pharma company",
      "estimatedPrice": 35,
      "strength": "500mg",
      "type": "tablet",
      "priceComparison": "cheaper",
      "availability": "high",
      "rating": 4.2,
      "note": "widely available"
    }
  ],
  "warning": "important warning or empty string",
  "disclaimer": "Always consult a doctor before switching medicines"
}

Rules:
- Give exactly 4-5 substitutes
- Pakistan available medicines only
- priceComparison: cheaper, same, or expensive only
- availability: high, medium, or low only
- type: tablet, syrup, injection, cream, or drops only
- estimatedPrice as number in PKR
- rating between 3.0 and 5.0
- If unknown medicine: {"error": "Medicine not found. Please check spelling."}`

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer":
          process.env.NEXT_PUBLIC_APP_URL || "https://medbridge.vercel.app",
        "X-Title": "MediBridge",
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3.1-8b-instruct:free",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.3,
        max_tokens: 2000,
      }),
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: "AI service unavailable. Please try again." },
        { status: 500 }
      )
    }

    const data = await response.json()
    const rawText = data.choices[0]?.message?.content || ""
    const cleanText = rawText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim()

    const parsed = JSON.parse(cleanText)

    if (parsed.error) {
      return NextResponse.json({ error: parsed.error }, { status: 404 })
    }

    return NextResponse.json(parsed)
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    )
  }
}
