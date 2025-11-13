export type Vendor = "amazon" | "ebay" | "shopify" | "oura" | "whoop" | "eight_sleep" | "thorne" | "levels" | "other"

export type Goal = "sleep" | "hrv" | "metabolic" | "cognitive" | "recovery" | "longevity"

export type Category = "wearables" | "sleep" | "nutrition" | "diagnostics" | "smart_home" | "books"

export type StockStatus = "in_stock" | "backorder" | "out_of_stock"

export interface Product {
  id: string
  slug: string
  title: string
  vendor: Vendor
  vendorProductId?: string
  affiliateUrl?: string
  images: string[]
  price: number
  currency: "USD"
  rating?: number
  category: Category
  goals: Goal[]
  tags: string[]
  stockStatus: StockStatus
  short: string
  pros?: string[]
  cons?: string[]
  createdAt: string
  popularity: number
}

export type QuestionType = "single" | "multi" | "slider" | "toggle"

export interface QuizOption {
  id: string
  label: string
  value?: string
  goal?: Goal
}

export interface QuizQuestion {
  id: string
  type: QuestionType
  title: string
  subtitle?: string
  options?: QuizOption[]
  min?: number
  max?: number
  step?: number
  unit?: string
}

export interface QuizAnswers {
  primaryGoals: Goal[]
  budget: number
  prefersWearables: boolean
  dietConstraints?: string[]
  stimulantSensitivity?: "low" | "medium" | "high"
}

export interface ProductScore {
  product: Product
  score: number
}

export interface RecommendationCollection {
  title: string
  description: string
  products: ProductScore[]
}
