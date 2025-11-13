import type { Product, Goal, Vendor, Category } from "./types"

export interface ProductFilters {
  goals: Goal[]
  vendors: Vendor[]
  categories: Category[]
  minPrice: number
  maxPrice: number
  search: string
}

export type SortOption = "best" | "price-asc" | "price-desc" | "rating" | "newest"

export function filterProducts(products: Product[], filters: Partial<ProductFilters>): Product[] {
  return products.filter((product) => {
    // Goal filter
    if (filters.goals && filters.goals.length > 0) {
      if (!filters.goals.some((g) => product.goals.includes(g))) {
        return false
      }
    }

    // Vendor filter
    if (filters.vendors && filters.vendors.length > 0) {
      if (!filters.vendors.includes(product.vendor)) {
        return false
      }
    }

    // Category filter
    if (filters.categories && filters.categories.length > 0) {
      if (!filters.categories.includes(product.category)) {
        return false
      }
    }

    // Price range
    if (filters.minPrice !== undefined && product.price < filters.minPrice) {
      return false
    }
    if (filters.maxPrice !== undefined && product.price > filters.maxPrice) {
      return false
    }

    // Search
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      const matchesSearch =
        product.title.toLowerCase().includes(searchLower) ||
        product.short.toLowerCase().includes(searchLower) ||
        product.tags.some((tag) => tag.toLowerCase().includes(searchLower))
      if (!matchesSearch) {
        return false
      }
    }

    return true
  })
}

export function sortProducts(products: Product[], sortBy: SortOption): Product[] {
  const sorted = [...products]

  switch (sortBy) {
    case "best":
      return sorted.sort((a, b) => b.popularity - a.popularity)
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price)
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price)
    case "rating":
      return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0))
    case "newest":
      return sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    default:
      return sorted
  }
}
