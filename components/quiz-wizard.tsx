"use client"

import { useState } from "react"
import { quizQuestions } from "@/lib/quiz"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import type { Goal } from "@/lib/types"

interface QuizWizardProps {
  onComplete: (answers: QuizAnswerData) => void
}

export interface QuizAnswerData {
  primaryGoals: Goal[]
  budget: number
  prefersWearables: boolean
  dietConstraints: string[]
  stimulantSensitivity: "low" | "medium" | "high"
  trackingStyle: "passive" | "moderate" | "active"
  email?: string
}

export function QuizWizard({ onComplete }: QuizWizardProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Partial<QuizAnswerData>>({
    primaryGoals: [],
    budget: 100,
    prefersWearables: true,
    dietConstraints: [],
    stimulantSensitivity: "medium",
    trackingStyle: "moderate",
  })

  const question = quizQuestions[currentStep]
  const progress = ((currentStep + 1) / (quizQuestions.length + 1)) * 100

  const canProceed = () => {
    switch (question.id) {
      case "goals":
        return (answers.primaryGoals?.length || 0) > 0 && (answers.primaryGoals?.length || 0) <= 3
      case "budget":
        return answers.budget !== undefined
      case "wearables":
        return answers.prefersWearables !== undefined
      case "diet":
        return true // Optional
      case "stimulants":
        return answers.stimulantSensitivity !== undefined
      case "tracking":
        return answers.trackingStyle !== undefined
      default:
        return true
    }
  }

  const handleNext = () => {
    if (currentStep < quizQuestions.length) {
      setCurrentStep(currentStep + 1)
    } else {
      // Final step - email collection
      handleComplete()
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = () => {
    onComplete({
      primaryGoals: answers.primaryGoals || [],
      budget: answers.budget || 100,
      prefersWearables: answers.prefersWearables ?? true,
      dietConstraints: answers.dietConstraints || [],
      stimulantSensitivity: answers.stimulantSensitivity || "medium",
      trackingStyle: answers.trackingStyle || "moderate",
      email: answers.email,
    })
  }

  const toggleMultiChoice = (id: string, value: string | Goal) => {
    const fieldMap: Record<string, keyof QuizAnswerData> = {
      goals: "primaryGoals",
      diet: "dietConstraints",
    }
    const field = fieldMap[question.id] as "primaryGoals" | "dietConstraints"

    const current = (answers[field] || []) as (string | Goal)[]
    if (current.includes(value)) {
      setAnswers({ ...answers, [field]: current.filter((v) => v !== value) })
    } else {
      setAnswers({ ...answers, [field]: [...current, value] })
    }
  }

  const renderQuestion = () => {
    switch (question.type) {
      case "multi":
        return (
          <div className="space-y-3">
            {question.options?.map((option) => {
              const field = question.id === "goals" ? "primaryGoals" : "dietConstraints"
              const isSelected = (answers[field] || []).includes((option.goal || option.value) as never)

              return (
                <button
                  key={option.id}
                  onClick={() => toggleMultiChoice(question.id, (option.goal || option.value)!)}
                  className={cn(
                    "w-full rounded-2xl border-2 p-4 text-left transition-all",
                    isSelected
                      ? "border-primary bg-primary/10 shadow-lg"
                      : "border-border bg-card/30 hover:border-primary/50 hover:bg-card/50",
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Checkbox checked={isSelected} readOnly />
                    <span className="font-sans text-base font-medium text-foreground">{option.label}</span>
                  </div>
                </button>
              )
            })}
          </div>
        )

      case "slider":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="mb-4 inline-flex items-baseline gap-2 rounded-2xl border border-primary/30 bg-primary/10 px-6 py-3">
                <span className="font-sans text-5xl font-bold text-foreground">${answers.budget}</span>
                <span className="font-mono text-sm text-muted-foreground">{question.unit}</span>
              </div>
            </div>
            <Slider
              value={[answers.budget || 100]}
              onValueChange={(value) => setAnswers({ ...answers, budget: value[0] })}
              min={question.min}
              max={question.max}
              step={question.step}
              className="cursor-pointer"
            />
            <div className="flex justify-between font-mono text-xs text-muted-foreground">
              <span>${question.min}</span>
              <span>${question.max}</span>
            </div>
          </div>
        )

      case "toggle":
        return (
          <div className="flex gap-4">
            <button
              onClick={() => setAnswers({ ...answers, prefersWearables: true })}
              className={cn(
                "flex-1 rounded-2xl border-2 p-6 transition-all",
                answers.prefersWearables
                  ? "border-primary bg-primary/10 shadow-lg"
                  : "border-border bg-card/30 hover:border-primary/50",
              )}
            >
              <div className="mb-2 text-4xl">✓</div>
              <p className="font-sans text-lg font-semibold text-foreground">Yes</p>
              <p className="mt-1 text-sm text-muted-foreground">I'm comfortable with wearables</p>
            </button>
            <button
              onClick={() => setAnswers({ ...answers, prefersWearables: false })}
              className={cn(
                "flex-1 rounded-2xl border-2 p-6 transition-all",
                !answers.prefersWearables
                  ? "border-primary bg-primary/10 shadow-lg"
                  : "border-border bg-card/30 hover:border-primary/50",
              )}
            >
              <div className="mb-2 text-4xl">✗</div>
              <p className="font-sans text-lg font-semibold text-foreground">No</p>
              <p className="mt-1 text-sm text-muted-foreground">Prefer non-wearable solutions</p>
            </button>
          </div>
        )

      case "single":
        return (
          <div className="space-y-3">
            {question.options?.map((option) => {
              const field =
                question.id === "stimulants"
                  ? "stimulantSensitivity"
                  : question.id === "tracking"
                    ? "trackingStyle"
                    : undefined
              const isSelected = field && answers[field] === option.value

              return (
                <button
                  key={option.id}
                  onClick={() => field && setAnswers({ ...answers, [field]: option.value })}
                  className={cn(
                    "w-full rounded-2xl border-2 p-4 text-left transition-all",
                    isSelected
                      ? "border-primary bg-primary/10 shadow-lg"
                      : "border-border bg-card/30 hover:border-primary/50 hover:bg-card/50",
                  )}
                >
                  <span className="font-sans text-base font-medium text-foreground">{option.label}</span>
                </button>
              )
            })}
          </div>
        )

      default:
        return null
    }
  }

  // Final step - email collection
  if (currentStep === quizQuestions.length) {
    return (
      <div className="mx-auto max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8 h-1 overflow-hidden rounded-full bg-border">
          <div className="h-full bg-primary transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>

        <div className="text-center">
          <h2 className="mb-4 font-sans text-4xl font-light tracking-tight text-foreground">Almost there!</h2>
          <p className="mb-8 text-lg text-muted-foreground">
            <span className="text-pretty">
              Get your personalized recommendations delivered. Email is optional - skip to see results now.
            </span>
          </p>

          <div className="mb-6">
            <Input
              type="email"
              placeholder="your@email.com (optional)"
              value={answers.email || ""}
              onChange={(e) => setAnswers({ ...answers, email: e.target.value })}
              className="rounded-2xl border-border bg-card/30 py-6 text-center backdrop-blur-md"
            />
          </div>

          <div className="flex gap-4">
            <Button variant="secondary" onClick={handleBack} className="flex-1 rounded-2xl py-6">
              Back
            </Button>
            <Button onClick={handleComplete} className="flex-1 rounded-2xl py-6">
              Generate Recommendations
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl">
      {/* Progress Bar */}
      <div className="mb-8 h-1 overflow-hidden rounded-full bg-border">
        <div className="h-full bg-primary transition-all duration-500" style={{ width: `${progress}%` }} />
      </div>

      {/* Step Counter */}
      <div className="mb-4">
        <span className="font-mono text-sm text-muted-foreground">
          Question {currentStep + 1} of {quizQuestions.length}
        </span>
      </div>

      {/* Question */}
      <div className="mb-8">
        <h2 className="mb-3 font-sans text-3xl font-light leading-tight tracking-tight text-foreground md:text-4xl">
          <span className="text-balance">{question.title}</span>
        </h2>
        {question.subtitle && (
          <p className="text-lg leading-relaxed text-muted-foreground">
            <span className="text-pretty">{question.subtitle}</span>
          </p>
        )}
      </div>

      {/* Answer Options */}
      <div className="mb-8">{renderQuestion()}</div>

      {/* Navigation */}
      <div className="flex gap-4">
        <Button variant="secondary" onClick={handleBack} disabled={currentStep === 0} className="rounded-2xl px-8 py-6">
          Back
        </Button>
        <Button onClick={handleNext} disabled={!canProceed()} className="flex-1 rounded-2xl py-6">
          {currentStep === quizQuestions.length - 1 ? "Continue" : "Next"}
        </Button>
      </div>

      {/* Keyboard Hint */}
      <p className="mt-4 text-center font-mono text-xs text-muted-foreground">Use arrow keys or click to navigate</p>
    </div>
  )
}
