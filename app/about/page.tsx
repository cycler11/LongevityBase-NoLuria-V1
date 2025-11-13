import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
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
          <Link href="/quiz">
            <Button variant="secondary" className="rounded-2xl">
              Take Quiz
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="border-b border-border bg-gradient-to-b from-primary/5 to-background px-6 py-16">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-4 inline-block rounded-full border border-foreground/20 bg-foreground/15 px-4 py-1.5 backdrop-blur-md">
            <p className="font-mono text-xs text-foreground/90">Our Story</p>
          </div>
          <h1 className="mb-4 font-sans text-5xl font-light leading-tight tracking-tight text-foreground md:text-6xl">
            <span className="text-balance">Making longevity accessible to everyone</span>
          </h1>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto max-w-4xl px-6 py-16">
        <div className="prose prose-lg max-w-none">
          <p className="text-lg leading-relaxed text-foreground">
            Longevity Base was founded on a simple belief: everyone deserves access to evidence-based tools and products
            that can help them live longer, healthier lives.
          </p>

          <h2 className="mt-12 font-sans text-3xl font-light tracking-tight text-foreground">Our Mission</h2>
          <p className="leading-relaxed text-muted-foreground">
            We cut through the noise of the longevity industry to curate only the most effective, science-backed
            products. Our personalized quiz system ensures you discover products that align with your unique goals,
            budget, and lifestyle—not just what's trending.
          </p>

          <h2 className="mt-12 font-sans text-3xl font-light tracking-tight text-foreground">Why We're Different</h2>
          <ul className="space-y-3 text-muted-foreground">
            <li>
              <strong className="text-foreground">Personalized Recommendations:</strong> Our quiz-driven approach
              understands your specific goals and constraints
            </li>
            <li>
              <strong className="text-foreground">Curated Selection:</strong> Every product is vetted for quality and
              backed by scientific evidence
            </li>
            <li>
              <strong className="text-foreground">Multi-Vendor Marketplace:</strong> We aggregate the best products from
              top brands and retailers
            </li>
            <li>
              <strong className="text-foreground">Transparent Partnerships:</strong> All affiliate relationships are
              clearly disclosed
            </li>
          </ul>

          <h2 className="mt-12 font-sans text-3xl font-light tracking-tight text-foreground">Our Values</h2>
          <p className="leading-relaxed text-muted-foreground">
            We believe in transparency, scientific rigor, and putting your health first. We only recommend products we'd
            use ourselves, and we're committed to helping you make informed decisions about your longevity journey.
          </p>

          <div className="mt-12">
            <Link href="/quiz">
              <Button size="lg" className="rounded-2xl">
                Start Your Longevity Journey
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
