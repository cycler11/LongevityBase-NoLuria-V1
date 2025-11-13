"use client"

import { useRouter } from "next/navigation"
import { QuizWizard, type QuizAnswerData } from "@/components/quiz-wizard"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function QuizPage() {
  const router = useRouter()

  const handleComplete = (answers: QuizAnswerData) => {
    // Store answers in sessionStorage
    sessionStorage.setItem("quizAnswers", JSON.stringify(answers))

    // Navigate to recommendations
    router.push("/recommendations")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-md">
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
          <Link href="/products">
            <Button variant="ghost" size="sm">
              Skip to Catalog
            </Button>
          </Link>
        </div>
      </header>

      {/* Quiz Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-block rounded-full border border-foreground/20 bg-foreground/15 px-4 py-1.5 backdrop-blur-md">
            <p className="font-mono text-xs text-foreground/90">Personalized Quiz</p>
          </div>
          <h1 className="mb-4 font-sans text-5xl font-light leading-tight tracking-tight text-foreground md:text-6xl">
            <span className="text-balance">Find Your Longevity Stack</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">
            <span className="text-pretty">
              Answer a few questions to get personalized product recommendations tailored to your goals and lifestyle.
            </span>
          </p>
        </div>

        <QuizWizard onComplete={handleComplete} />
      </div>
    </div>
  )
}
