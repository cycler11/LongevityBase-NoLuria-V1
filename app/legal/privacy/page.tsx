import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function PrivacyPage() {
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
              {/* <span className="font-mono text-[10px] leading-tight tracking-wide text-foreground/60">By Luria</span> */}
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
        <h1 className="mb-8 font-sans text-4xl font-light tracking-tight text-foreground">Privacy Policy</h1>
        <div className="prose prose-lg max-w-none">
          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

          <h2 className="mt-8 font-sans text-2xl font-light text-foreground">Information We Collect</h2>
          <p className="text-muted-foreground">
            We collect information you provide directly to us, including when you take our quiz, create an account, or
            contact us for support.
          </p>

          <h2 className="mt-8 font-sans text-2xl font-light text-foreground">How We Use Your Information</h2>
          <p className="text-muted-foreground">
            We use the information we collect to provide personalized product recommendations, improve our services, and
            communicate with you about products and updates.
          </p>

          <h2 className="mt-8 font-sans text-2xl font-light text-foreground">Data Security</h2>
          <p className="text-muted-foreground">
            We implement appropriate security measures to protect your personal information from unauthorized access,
            disclosure, or destruction.
          </p>

          <h2 className="mt-8 font-sans text-2xl font-light text-foreground">Contact Us</h2>
          <p className="text-muted-foreground">
            If you have questions about this Privacy Policy, please contact us through our{" "}
            <Link href="/contact" className="text-primary hover:underline">
              contact page
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
