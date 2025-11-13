"use client"

import { useState, useMemo } from "react"
import { products } from "@/lib/seed"
import { ProductCard } from "@/components/product-card"
import { ProductFilters } from "@/components/product-filters"
import { filterProducts, sortProducts, type SortOption } from "@/lib/product-filters"
import type { Goal, Vendor, Category } from "@/lib/types"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ProductsPage() {
  const [selectedGoals, setSelectedGoals] = useState<Goal[]>([])
  const [selectedVendors, setSelectedVendors] = useState<Vendor[]>([])
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 3000])
  const [sortBy, setSortBy] = useState<SortOption>("best")
  const [search, setSearch] = useState("")

  const filteredProducts = useMemo(() => {
    const filtered = filterProducts(products, {
      goals: selectedGoals,
      vendors: selectedVendors,
      categories: selectedCategories,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      search,
    })
    return sortProducts(filtered, sortBy)
  }, [selectedGoals, selectedVendors, selectedCategories, priceRange, sortBy, search])

  const resetFilters = () => {
    setSelectedGoals([])
    setSelectedVendors([])
    setSelectedCategories([])
    setPriceRange([0, 3000])
    setSearch("")
  }

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
          <div className="flex items-center gap-4">
            <Link href="/quiz">
              <Button variant="secondary" className="rounded-2xl">
                Take Quiz
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="border-b border-border bg-gradient-to-b from-primary/5 to-background px-6 py-16">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-4 inline-block rounded-full border border-foreground/20 bg-foreground/15 px-4 py-1.5 backdrop-blur-md">
            <p className="font-mono text-xs text-foreground/90">Curated Products</p>
          </div>
          <h1 className="mb-4 font-sans text-5xl font-light leading-tight tracking-tight text-foreground md:text-6xl">
            <span className="text-balance">Browse the Catalog</span>
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
            <span className="text-pretty">
              Discover longevity products curated from the world's best brands. Filter by your goals and find what works
              for you.
            </span>
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto max-w-7xl px-6 py-12">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Search */}
          <Input
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-md rounded-2xl border-border bg-card/30 backdrop-blur-md"
          />

          {/* Sort */}
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Sort by</span>
            <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
              <SelectTrigger className="w-[180px] rounded-2xl border-border bg-card/30 backdrop-blur-md">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="best">Best Match</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Filters Sidebar */}
          <aside className="lg:w-64 lg:shrink-0">
            <ProductFilters
              selectedGoals={selectedGoals}
              selectedVendors={selectedVendors}
              selectedCategories={selectedCategories}
              priceRange={priceRange}
              onGoalsChange={setSelectedGoals}
              onVendorsChange={setSelectedVendors}
              onCategoriesChange={setSelectedCategories}
              onPriceRangeChange={setPriceRange}
              onReset={resetFilters}
            />
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/20 p-12 text-center">
                <p className="mb-2 font-sans text-xl font-semibold text-foreground">No products found</p>
                <p className="mb-6 text-muted-foreground">
                  Try adjusting your filters or search query to find what you're looking for.
                </p>
                <Button onClick={resetFilters} variant="secondary" className="rounded-2xl">
                  Reset Filters
                </Button>
              </div>
            ) : (
              <>
                <div className="mb-6 flex items-center justify-between">
                  <p className="font-mono text-sm text-muted-foreground">
                    Showing {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
                  </p>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
