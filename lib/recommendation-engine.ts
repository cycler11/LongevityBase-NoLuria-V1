import type { Product, QuizAnswers, ProductScore, RecommendationCollection, Goal } from "./types"

export function scoreProduct(product: Product, answers: QuizAnswers): number {
  let score = 0

  // Goal matching (most important factor)
  const goalMatches = product.goals.filter((g) => answers.primaryGoals.includes(g)).length
  score += goalMatches * 3

  // Related goals (partial credit)
  const hasRelatedGoal = product.goals.some((g) => {
    const relatedGoals: Record<Goal, Goal[]> = {
      sleep: ["recovery", "hrv"],
      hrv: ["sleep", "recovery"],
      metabolic: ["longevity"],
      cognitive: ["longevity"],
      recovery: ["sleep", "hrv"],
      longevity: ["metabolic", "cognitive"],
    }
    return answers.primaryGoals.some((ag) => relatedGoals[g]?.includes(ag))
  })
  if (hasRelatedGoal) score += 1

  // Price fit
  const priceFit = product.price >= answers.budget * 0.7 && product.price <= answers.budget * 1.3
  score += priceFit ? 1 : -1

  // Wearables preference
  if (!answers.prefersWearables && product.category === "wearables") {
    score -= 2
  }

  // Popularity boost
  score += product.popularity / 100

  // Stock status
  if (product.stockStatus === "out_of_stock") score -= 5
  if (product.stockStatus === "backorder") score -= 2

  return score
}

export function generateRecommendations(products: Product[], answers: QuizAnswers): RecommendationCollection[] {
  // Score all products
  const scoredProducts: ProductScore[] = products
    .map((product) => ({
      product,
      score: scoreProduct(product, answers),
    }))
    .filter((ps) => ps.score > 0)
    .sort((a, b) => b.score - a.score)

  // Take top 24
  const topProducts = scoredProducts.slice(0, 24)

  // Split into three collections
  const startHere = topProducts.filter((ps) => ps.product.price <= answers.budget * 0.8).slice(0, 8)

  const optimize = topProducts
    .filter(
      (ps) => ps.product.price > answers.budget * 0.8 && ps.product.price <= answers.budget * 1.5 && ps.score >= 5,
    )
    .slice(0, 8)

  const deepDive = topProducts.filter((ps) => ps.product.price > answers.budget * 1.5 || ps.score >= 7).slice(0, 8)

  return [
    {
      title: "Start Here",
      description: "Budget-friendly essentials to begin your longevity journey",
      products: startHere,
    },
    {
      title: "Optimize",
      description: "Mid-tier products for measurable improvements",
      products: optimize,
    },
    {
      title: "Deep Dive",
      description: "Advanced tools for serious optimization",
      products: deepDive,
    },
  ]
}
