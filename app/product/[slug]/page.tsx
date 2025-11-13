import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { products } from "@/lib/seed"
import { Button } from "@/components/ui/button"
import { VendorIcon } from "@/components/vendor-icon"
import { vendorConfig } from "@/lib/vendor-config"
import { ProductCard } from "@/components/product-card"

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }))
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = products.find((p) => p.slug === params.slug)

  if (!product) {
    notFound()
  }

  const vendorName = vendorConfig[product.vendor]?.name || product.vendor

  // Find related products by goals
  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.goals.some((g) => product.goals.includes(g)))
    .slice(0, 4)

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
            <Link href="/products">
              <Button variant="ghost" size="sm">
                Back to Catalog
              </Button>
            </Link>
            <Link href="/quiz">
              <Button variant="secondary" size="sm" className="rounded-2xl">
                Take Quiz
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Product Details */}
      <div className="container mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left: Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-muted">
              <Image src={product.images[0] || "/placeholder.svg"} alt={product.title} fill className="object-cover" />
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.slice(1, 5).map((image, index) => (
                  <div
                    key={index}
                    className="relative aspect-square overflow-hidden rounded-lg border border-border bg-muted"
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${product.title} ${index + 2}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Info */}
          <div className="space-y-6">
            {/* Vendor & Category */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 rounded-full bg-secondary/50 px-3 py-1">
                <VendorIcon vendor={product.vendor} className="h-4 w-4" />
                <span className="font-mono text-sm text-secondary-foreground">{vendorName}</span>
              </div>
              <div className="rounded-full bg-accent/20 px-3 py-1">
                <span className="font-mono text-sm capitalize text-accent-foreground">{product.category}</span>
              </div>
              {product.stockStatus === "in_stock" && (
                <div className="rounded-full bg-primary/10 px-3 py-1">
                  <span className="font-mono text-sm text-primary">In Stock</span>
                </div>
              )}
            </div>

            {/* Title */}
            <h1 className="font-sans text-4xl font-light leading-tight tracking-tight text-foreground md:text-5xl">
              {product.title}
            </h1>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < Math.floor(product.rating!) ? "text-accent" : "text-muted"}>
                      ★
                    </span>
                  ))}
                </div>
                <span className="font-mono text-sm font-semibold text-foreground">{product.rating}</span>
                <span className="text-sm text-muted-foreground">out of 5</span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-2">
              <span className="font-sans text-5xl font-bold text-foreground">${product.price}</span>
              <span className="text-lg text-muted-foreground">USD</span>
            </div>

            {/* Description */}
            <p className="text-lg leading-relaxed text-foreground">{product.short}</p>

            {/* Goals */}
            <div className="space-y-2">
              <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Optimizes For</p>
              <div className="flex flex-wrap gap-2">
                {product.goals.map((goal) => (
                  <div key={goal} className="rounded-full bg-primary/10 px-3 py-1">
                    <span className="font-mono text-sm capitalize text-primary">{goal}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pros & Cons */}
            {(product.pros || product.cons) && (
              <div className="grid gap-4 sm:grid-cols-2">
                {product.pros && (
                  <div className="space-y-2 rounded-2xl border border-border bg-card/30 p-4 backdrop-blur-md">
                    <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Pros</p>
                    <ul className="space-y-1">
                      {product.pros.map((pro, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-foreground">
                          <span className="text-primary">✓</span>
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {product.cons && (
                  <div className="space-y-2 rounded-2xl border border-border bg-card/30 p-4 backdrop-blur-md">
                    <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Cons</p>
                    <ul className="space-y-1">
                      {product.cons.map((con, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-foreground">
                          <span className="text-muted-foreground">•</span>
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* CTA */}
            <div className="space-y-3 pt-4">
              <Button asChild size="lg" className="w-full rounded-2xl py-6 text-lg">
                <a href={product.affiliateUrl || "#"} target="_blank" rel="noopener noreferrer">
                  Buy from {vendorName}
                </a>
              </Button>
              <p className="text-center text-xs text-muted-foreground">External link • Affiliate partnership</p>
            </div>

            {/* Affiliate Disclosure */}
            <div className="rounded-2xl border border-border bg-muted/20 p-4">
              <p className="text-sm text-muted-foreground">
                <strong>Affiliate Disclosure:</strong> We may earn an affiliate commission when you purchase through
                this link. This helps us provide free personalized recommendations without any extra cost to you.
              </p>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 border-t border-border pt-16">
            <h2 className="mb-8 font-sans text-3xl font-light tracking-tight text-foreground">Pairs Well With</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((related) => (
                <ProductCard key={related.id} product={related} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
