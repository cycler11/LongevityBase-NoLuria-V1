import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AffiliateDisclosurePage() {
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
        <h1 className="mb-8 font-sans text-4xl font-light tracking-tight text-foreground">Affiliate Disclosure</h1>
        <div className="prose prose-lg max-w-none">
          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

          <h2 className="mt-8 font-sans text-2xl font-light text-foreground">Our Affiliate Relationships</h2>
          <p className="text-muted-foreground">
            Longevity Base participates in various affiliate marketing programs. This means we may earn a commission
            when you purchase products through links on our site.
          </p>

          <h2 className="mt-8 font-sans text-2xl font-light text-foreground">How This Works</h2>
          <p className="text-muted-foreground">
            When you click on an affiliate link and make a purchase, we receive a small commission from the vendor at no
            additional cost to you. These commissions help us maintain our free personalized recommendation service.
          </p>

          <h2 className="mt-8 font-sans text-2xl font-light text-foreground">Our Commitment</h2>
          <p className="text-muted-foreground">
            We only recommend products we genuinely believe in. Our affiliate relationships do not influence our product
            selection or recommendations—we curate products based on scientific evidence and user needs first.
          </p>

          <h2 className="mt-8 font-sans text-2xl font-light text-foreground">Transparency</h2>
          <p className="text-muted-foreground">
            All affiliate links are clearly marked throughout our site. We believe in full transparency about our
            business model and partnerships.
          </p>
        </div>
      </div>
    </div>
  )
}
