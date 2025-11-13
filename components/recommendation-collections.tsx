"use client"

import { useState } from "react"
import { ProductCard } from "./product-card"
import type { RecommendationCollection } from "@/lib/types"
import { Button } from "./ui/button"

interface RecommendationCollectionsProps {
  collections: RecommendationCollection[]
}

export function RecommendationCollections({ collections }: RecommendationCollectionsProps) {
  return (
    <div className="space-y-16">
      {collections.map((collection, index) => (
        <CollectionSection key={index} collection={collection} index={index} />
      ))}
    </div>
  )
}

function CollectionSection({ collection, index }: { collection: RecommendationCollection; index: number }) {
  const [showAll, setShowAll] = useState(false)
  const displayProducts = showAll ? collection.products : collection.products.slice(0, 4)

  if (collection.products.length === 0) {
    return null
  }

  return (
    <section className="relative">
      {/* Timeline Accent */}
      <div className="absolute -left-6 top-0 hidden h-full w-px bg-border md:block">
        <div className="absolute left-1/2 top-8 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-primary bg-background" />
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="mb-2 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 backdrop-blur-md">
            <span className="font-mono text-sm font-bold text-primary">{index + 1}</span>
          </div>
          <h2 className="font-sans text-3xl font-light tracking-tight text-foreground">{collection.title}</h2>
        </div>
        <p className="text-lg leading-relaxed text-muted-foreground">{collection.description}</p>
      </div>

      {/* Products Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {displayProducts.map((scored) => (
          <ProductCard key={scored.product.id} product={scored.product} score={scored.score} />
        ))}
      </div>

      {/* Show More */}
      {collection.products.length > 4 && (
        <div className="mt-6 text-center">
          <Button variant="secondary" onClick={() => setShowAll(!showAll)} className="rounded-2xl">
            {showAll ? "Show Less" : `Show ${collection.products.length - 4} More`}
          </Button>
        </div>
      )}
    </section>
  )
}
