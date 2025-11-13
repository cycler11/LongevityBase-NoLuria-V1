import type { QuizQuestion } from "./types"

export const quizQuestions: QuizQuestion[] = [
  {
    id: "goals",
    type: "multi",
    title: "What are your primary longevity goals?",
    subtitle: "Select up to 3 areas you'd like to optimize",
    options: [
      { id: "sleep", label: "Better Sleep Quality", goal: "sleep" },
      { id: "hrv", label: "Heart Rate Variability", goal: "hrv" },
      { id: "metabolic", label: "Metabolic Health", goal: "metabolic" },
      { id: "cognitive", label: "Cognitive Performance", goal: "cognitive" },
      { id: "recovery", label: "Recovery & Performance", goal: "recovery" },
      { id: "longevity", label: "General Longevity", goal: "longevity" },
    ],
  },
  {
    id: "budget",
    type: "slider",
    title: "What's your budget per product?",
    subtitle: "This helps us recommend items in your price range",
    min: 20,
    max: 500,
    step: 10,
    unit: "USD",
  },
  {
    id: "wearables",
    type: "toggle",
    title: "Are you open to wearing devices?",
    subtitle: "Some tracking requires wearables like rings, watches, or bands",
  },
  {
    id: "diet",
    type: "multi",
    title: "Do you have any dietary preferences?",
    subtitle: "Select all that apply",
    options: [
      { id: "none", label: "No restrictions", value: "none" },
      { id: "vegan", label: "Vegan", value: "vegan" },
      { id: "vegetarian", label: "Vegetarian", value: "vegetarian" },
      { id: "keto", label: "Keto", value: "keto" },
      { id: "paleo", label: "Paleo", value: "paleo" },
    ],
  },
  {
    id: "stimulants",
    type: "single",
    title: "How sensitive are you to stimulants?",
    subtitle: "This helps us recommend appropriate supplements",
    options: [
      { id: "low", label: "Not sensitive - I handle caffeine well", value: "low" },
      { id: "medium", label: "Moderately sensitive", value: "medium" },
      { id: "high", label: "Very sensitive - I avoid caffeine", value: "high" },
    ],
  },
  {
    id: "tracking",
    type: "single",
    title: "What's your tracking style?",
    subtitle: "How hands-on do you want to be?",
    options: [
      { id: "passive", label: "Passive - set it and forget it", value: "passive" },
      { id: "moderate", label: "Moderate - check occasionally", value: "moderate" },
      { id: "active", label: "Active - I love data and optimization", value: "active" },
    ],
  },
]
