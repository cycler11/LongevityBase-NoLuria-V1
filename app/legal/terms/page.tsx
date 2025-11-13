import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
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
          <Link href="/">
            <Button variant="ghost" size="sm">
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto max-w-4xl px-6 py-16">
        <h1 className="mb-8 font-sans text-4xl font-light tracking-tight text-foreground">Terms of Service</h1>
        <div className="prose prose-lg max-w-none">
          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

          <h2 className="mt-8 font-sans text-2xl font-light text-foreground">Acceptance of Terms</h2>
          <p className="text-muted-foreground">
            By accessing and using Longevity Base, you accept and agree to be bound by these Terms of Service.
          </p>

          <h2 className="mt-8 font-sans text-2xl font-light text-foreground">Use of Service</h2>
          <p className="text-muted-foreground">
            Our service provides personalized product recommendations for longevity and health optimization. You agree
            to use the service only for lawful purposes.
          </p>

          <h2 className="mt-8 font-sans text-2xl font-light text-foreground">Product Recommendations</h2>
          <p className="text-muted-foreground">
            Our recommendations are for informational purposes only and do not constitute medical advice. Always consult
            with a healthcare professional before starting any new health regimen.
          </p>

          <h2 className="mt-8 font-sans text-2xl font-light text-foreground">Limitation of Liability</h2>
          <p className="text-muted-foreground">
            Longevity Base is not liable for any damages arising from the use of products purchased through our
            affiliate links.
          </p>
        </div>
      </div>
    </div>
  )
}
