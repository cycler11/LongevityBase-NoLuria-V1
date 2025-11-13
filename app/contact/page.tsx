"use client"

import type React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
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
            <p className="font-mono text-xs text-foreground/90">Get in Touch</p>
          </div>
          <h1 className="mb-4 font-sans text-5xl font-light leading-tight tracking-tight text-foreground md:text-6xl">
            <span className="text-balance">We'd love to hear from you</span>
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Have questions about our products or recommendations? Send us a message and we'll get back to you soon.
          </p>
        </div>
      </section>

      {/* Form */}
      <div className="container mx-auto max-w-2xl px-6 py-16">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Your name" required className="rounded-2xl" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="your@email.com" required className="rounded-2xl" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" placeholder="What's this about?" required className="rounded-2xl" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Tell us more..."
              rows={6}
              required
              className="rounded-2xl resize-none"
            />
          </div>

          <Button type="submit" size="lg" className="w-full rounded-2xl" disabled={submitted}>
            {submitted ? "Message Sent!" : "Send Message"}
          </Button>
        </form>
      </div>
    </div>
  )
}
