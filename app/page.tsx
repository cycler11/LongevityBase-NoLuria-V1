"use client"

import { Shader, ChromaFlow, Swirl } from "shaders/react"
import { CustomCursor } from "@/components/custom-cursor"
import { GrainOverlay } from "@/components/grain-overlay"
import { MagneticButton } from "@/components/magnetic-button"
import { ProductCard } from "@/components/product-card"
import { products } from "@/lib/seed"
import { trustLogos, vendorConfig } from "@/lib/vendor-config"
import { useRef, useEffect, useState } from "react"
import Link from "next/link"

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  const shaderContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkShaderReady = () => {
      if (shaderContainerRef.current) {
        const canvas = shaderContainerRef.current.querySelector("canvas")
        if (canvas && canvas.width > 0 && canvas.height > 0) {
          setIsLoaded(true)
          return true
        }
      }
      return false
    }

    if (checkShaderReady()) return

    const intervalId = setInterval(() => {
      if (checkShaderReady()) {
        clearInterval(intervalId)
      }
    }, 100)

    const fallbackTimer = setTimeout(() => {
      setIsLoaded(true)
    }, 1500)

    return () => {
      clearInterval(intervalId)
      clearTimeout(fallbackTimer)
    }
  }, [])

  const featuredProducts = products.sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 3)

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-background">
      <CustomCursor />
      <GrainOverlay />

      <div
        ref={shaderContainerRef}
        className={`fixed inset-0 z-0 transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        style={{ contain: "strict" }}
      >
        <Shader className="h-full w-full">
          <Swirl
            colorA="#d4f1f9"
            colorB="#ffd4e5"
            speed={0.5}
            detail={0.8}
            blend={50}
            coarseX={40}
            coarseY={40}
            mediumX={40}
            mediumY={40}
            fineX={40}
            fineY={40}
          />
          <ChromaFlow
            baseColor="#e8f4fd"
            upColor="#cfe9ff"
            downColor="#ffd4e5"
            leftColor="#d4f1f9"
            rightColor="#ffe0f0"
            intensity={0.6}
            radius={1.8}
            momentum={25}
            maskType="alpha"
            opacity={0.85}
          />
        </Shader>
      </div>

      <nav
        className={`fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-6 transition-opacity duration-700 md:px-12 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-foreground/15 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-foreground/25">
            <span className="font-sans text-xl font-bold text-foreground">L</span>
          </div>
          <div className="flex flex-col">
            <span className="font-sans text-lg font-semibold leading-tight tracking-tight text-foreground">
              Longevity Base
            </span>
          </div>
        </div>

        <MagneticButton variant="secondary" asChild>
          <Link href="/quiz">Get Started</Link>
        </MagneticButton>
      </nav>

      <section className="relative z-10 flex min-h-screen flex-col justify-end px-6 pb-16 pt-24 md:px-12 md:pb-24">
        <div className="max-w-3xl">
          <h1 className="mb-6 animate-in fade-in slide-in-from-bottom-8 font-sans text-6xl font-light leading-[1.1] tracking-tight text-foreground duration-1000 md:text-7xl lg:text-8xl">
            <span className="text-balance">
              Find the right longevity
              <br />
              products for your goals
            </span>
          </h1>
          <p className="mb-8 max-w-xl animate-in fade-in slide-in-from-bottom-4 text-lg leading-relaxed text-foreground/90 duration-1000 delay-200 md:text-xl">
            <span className="text-pretty">
              Take our quick quiz to discover curated longevity products that match your health objectives and budget.
              Shop smarter, live longer.
            </span>
          </p>
          <div className="flex animate-in fade-in slide-in-from-bottom-4 flex-col gap-4 duration-1000 delay-300 sm:flex-row sm:items-center">
            <MagneticButton size="lg" variant="primary" asChild>
              <Link href="/quiz">Start Quiz</Link>
            </MagneticButton>
            <MagneticButton size="lg" variant="secondary" asChild>
              <Link href="/products">Browse Products</Link>
            </MagneticButton>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-in fade-in duration-1000 delay-500">
          <div className="flex items-center gap-2">
            <p className="font-mono text-xs text-foreground/80">Scroll to explore</p>
            <div className="flex h-6 w-12 items-center justify-center rounded-full border border-foreground/20 bg-foreground/15 backdrop-blur-md">
              <div className="h-2 w-2 animate-pulse rounded-full bg-foreground/80" />
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 border-t border-foreground/10 bg-white/60 px-6 py-24 backdrop-blur-md md:px-12">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-12">
            <div className="mb-4 inline-block rounded-full border border-foreground/20 bg-foreground/15 px-4 py-1.5 backdrop-blur-md">
              <p className="font-mono text-xs text-foreground/90">Best Sellers</p>
            </div>
            <h2 className="mb-4 font-sans text-5xl font-light leading-tight tracking-tight text-foreground md:text-6xl">
              <span className="text-balance">Most Popular Products</span>
            </h2>
            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
              <span className="text-pretty">
                Trusted by thousands of customers optimizing their healthspan and longevity.
              </span>
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <MagneticButton variant="secondary" size="lg" asChild>
              <Link href="/products">Shop All Products</Link>
            </MagneticButton>
          </div>
        </div>
      </section>

      <section className="relative z-10 border-t border-foreground/10 bg-white/40 px-6 py-16 backdrop-blur-md md:px-12">
        <div className="container mx-auto max-w-7xl">
          <p className="mb-8 text-center font-mono text-xs uppercase tracking-wider text-muted-foreground">
            Available From
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {trustLogos.map((logo) => (
              <div
                key={logo.vendor}
                className="flex items-center gap-2 rounded-2xl border border-border bg-card/30 px-6 py-3 backdrop-blur-md transition-all hover:scale-105 hover:border-foreground/30"
              >
                <span className="font-sans text-sm font-medium text-foreground">{vendorConfig[logo.vendor]?.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 border-t border-foreground/10 bg-gradient-to-b from-primary/5 to-white/50 px-6 py-24 md:px-12">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="mb-6 font-sans text-5xl font-light leading-tight tracking-tight text-foreground md:text-6xl">
            <span className="text-balance">Start your longevity journey today</span>
          </h2>
          <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
            <span className="text-pretty">
              Get personalized product recommendations based on your unique health goals and preferences.
            </span>
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center">
            <MagneticButton size="lg" variant="primary" asChild>
              <Link href="/quiz">Take the Quiz</Link>
            </MagneticButton>
            <MagneticButton size="lg" variant="secondary" asChild>
              <Link href="/about">Learn More</Link>
            </MagneticButton>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-foreground/10 bg-white/80 px-6 py-12 backdrop-blur-md md:px-12">
        <div className="container mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground/15">
                  <span className="font-sans text-lg font-bold text-foreground">L</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-sans text-base font-semibold leading-tight text-foreground">
                    Longevity Base
                  </span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Your curated marketplace for evidence-based longevity products.
              </p>
            </div>

            <div>
              <h3 className="mb-4 font-mono text-xs uppercase tracking-wider text-muted-foreground">Shop</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/products" className="text-sm text-foreground transition-colors hover:text-primary">
                    All Products
                  </Link>
                </li>
                <li>
                  <Link href="/quiz" className="text-sm text-foreground transition-colors hover:text-primary">
                    Take Quiz
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 font-mono text-xs uppercase tracking-wider text-muted-foreground">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-sm text-foreground transition-colors hover:text-primary">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-sm text-foreground transition-colors hover:text-primary">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 font-mono text-xs uppercase tracking-wider text-muted-foreground">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/legal/privacy" className="text-sm text-foreground transition-colors hover:text-primary">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/legal/terms" className="text-sm text-foreground transition-colors hover:text-primary">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/legal/affiliate-disclosure"
                    className="text-sm text-foreground transition-colors hover:text-primary"
                  >
                    Affiliate Disclosure
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-foreground/10 pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Longevity Base. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
