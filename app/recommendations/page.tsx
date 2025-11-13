"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { RecommendationCollections } from "@/components/recommendation-collections"
import { generateRecommendations } from "@/lib/recommendation-engine"
import { products } from "@/lib/seed"
import type { QuizAnswers, RecommendationCollection } from "@/lib/types"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function RecommendationsPage() {
  const router = useRouter()
  const [collections, setCollections] = useState<RecommendationCollection[]>([])
  const [loading, setLoading] = useState(true)
  const [savedToLocal, setSavedToLocal] = useState(false)

  useEffect(() => {
    // Get quiz answers from sessionStorage
    const storedAnswers = sessionStorage.getItem("quizAnswers")

    if (!storedAnswers) {
      // No quiz data, redirect to quiz
      router.push("/quiz")
      return
    }

    try {
      const answers = JSON.parse(storedAnswers) as QuizAnswers
      const recommendations = generateRecommendations(products, answers)
      setCollections(recommendations)
    } catch (error) {
      console.error("Failed to generate recommendations:", error)
      router.push("/quiz")
    } finally {
      setLoading(false)
    }
  }, [router])

  const handleSaveStack = () => {
    const stackId = `stack-${Date.now()}`
    const allProducts = collections.flatMap((c) => c.products.map((p) => p.product.id))

    localStorage.setItem(
      stackId,
      JSON.stringify({
        id: stackId,
        productIds: allProducts,
        createdAt: new Date().toISOString(),
      }),
    )

    setSavedToLocal(true)
    setTimeout(() => setSavedToLocal(false), 3000)
  }

  const handleRetakeQuiz = () => {
    sessionStorage.removeItem("quizAnswers")
    router.push("/quiz")
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="font-mono text-sm text-muted-foreground">Generating your personalized stack...</p>
        </div>
      </div>
    )
  }

  const totalProducts = collections.reduce((sum, c) => sum + c.products.length, 0)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-foreground/15 backdrop-blur-md">
              <span className="font-sans text-xl font-bold text-foreground">L</span>
            </div>
            <div className="flex flex-col">
              <span className="font-sans text-lg font-semibold leading-tight tracking-tight text-foreground">
                Longevity Base
              </span>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={handleRetakeQuiz}>
              Retake Quiz
            </Button>
            <Link href="/products">
              <Button variant="secondary" size="sm" className="rounded-2xl">
                Browse All
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="border-b border-border bg-gradient-to-b from-primary/5 to-background px-6 py-16">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-4 inline-block rounded-full border border-foreground/20 bg-foreground/15 px-4 py-1.5 backdrop-blur-md">
            <p className="font-mono text-xs text-foreground/90">Personalized Results</p>
          </div>
          <h1 className="mb-4 font-sans text-5xl font-light leading-tight tracking-tight text-foreground md:text-6xl">
            <span className="text-balance">Your Longevity Stack</span>
          </h1>
          <p className="mb-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            <span className="text-pretty">
              Based on your goals and preferences, we've curated {totalProducts} products to help you optimize your
              healthspan and longevity.
            </span>
          </p>
          <div className="flex flex-wrap gap-3">
            <Button onClick={handleSaveStack} className="rounded-2xl">
              {savedToLocal ? "✓ Saved!" : "Save My Stack"}
            </Button>
            <Button variant="secondary" onClick={handleRetakeQuiz} className="rounded-2xl">
              Re-tune Results
            </Button>
          </div>
        </div>
      </section>

      {/* Recommendations */}
      <div className="container mx-auto max-w-7xl px-6 py-16 md:px-12">
        {collections.length === 0 ? (
          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/20 p-12 text-center">
            <p className="mb-2 font-sans text-xl font-semibold text-foreground">No recommendations found</p>
            <p className="mb-6 text-muted-foreground">
              We couldn't find products matching your criteria. Try adjusting your preferences.
            </p>
            <Button onClick={handleRetakeQuiz} variant="secondary" className="rounded-2xl">
              Retake Quiz
            </Button>
          </div>
        ) : (
          <RecommendationCollections collections={collections} />
        )}
      </div>

      {/* Affiliate Disclosure */}
      <div className="border-t border-border bg-muted/20 px-6 py-8">
        <div className="container mx-auto max-w-7xl">
          <p className="text-center text-sm text-muted-foreground">
            We may earn an affiliate commission when you buy through our links. This helps us continue providing free
            personalized recommendations.
          </p>
        </div>
      </div>
    </div>
  )
}
