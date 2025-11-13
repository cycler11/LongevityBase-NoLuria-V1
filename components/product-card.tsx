import Link from "next/link"
import Image from "next/image"
import type { Product } from "@/lib/types"
import { VendorIcon } from "./vendor-icon"
import { vendorConfig } from "@/lib/vendor-config"
import { cn } from "@/lib/utils"

interface ProductCardProps {
  product: Product
  score?: number
  className?: string
}

export function ProductCard({ product, score, className }: ProductCardProps) {
  const vendorName = vendorConfig[product.vendor]?.name || product.vendor

  return (
    <Link
      href={`/product/${product.slug}`}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card/50 backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:border-foreground/30 hover:bg-card/70",
        className,
      )}
    >
      {/* Image */}
      <div className="relative aspect-square w-full overflow-hidden bg-muted">
        <Image
          src={product.images[0] || "/placeholder.svg"}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {score !== undefined && (
          <div className="absolute right-2 top-2 rounded-full bg-primary/90 px-3 py-1 backdrop-blur-sm">
            <span className="font-mono text-xs font-bold text-primary-foreground">{score.toFixed(1)}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        {/* Vendor & Category */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-full bg-secondary/50 px-2 py-0.5">
            <VendorIcon vendor={product.vendor} className="h-3 w-3" />
            <span className="font-mono text-xs text-secondary-foreground">{vendorName}</span>
          </div>
          <div className="rounded-full bg-accent/20 px-2 py-0.5">
            <span className="font-mono text-xs capitalize text-accent-foreground">{product.category}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="line-clamp-2 font-sans text-lg font-semibold leading-tight text-card-foreground">
          {product.title}
        </h3>

        {/* Description */}
        <p className="line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">{product.short}</p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex flex-col">
            <span className="font-sans text-2xl font-bold text-foreground">
              ${product.price}
              <span className="text-sm font-normal text-muted-foreground"> USD</span>
            </span>
          </div>
          {product.rating && (
            <div className="flex items-center gap-1">
              <span className="text-accent">★</span>
              <span className="font-mono text-sm font-semibold text-foreground">{product.rating}</span>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="mt-2 flex items-center justify-between rounded-lg bg-foreground/10 px-3 py-2 transition-colors group-hover:bg-foreground/15">
          <span className="font-mono text-xs text-foreground">View Details</span>
          <span className="text-foreground transition-transform group-hover:translate-x-1">→</span>
        </div>
      </div>
    </Link>
  )
}
