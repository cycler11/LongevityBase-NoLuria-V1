"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import type { Goal, Vendor, Category } from "@/lib/types"
import { vendorConfig } from "@/lib/vendor-config"
import { cn } from "@/lib/utils"

interface FiltersProps {
  selectedGoals: Goal[]
  selectedVendors: Vendor[]
  selectedCategories: Category[]
  priceRange: [number, number]
  onGoalsChange: (goals: Goal[]) => void
  onVendorsChange: (vendors: Vendor[]) => void
  onCategoriesChange: (categories: Category[]) => void
  onPriceRangeChange: (range: [number, number]) => void
  onReset: () => void
  className?: string
}

const goals: { value: Goal; label: string }[] = [
  { value: "sleep", label: "Sleep" },
  { value: "hrv", label: "HRV" },
  { value: "metabolic", label: "Metabolic" },
  { value: "cognitive", label: "Cognitive" },
  { value: "recovery", label: "Recovery" },
  { value: "longevity", label: "Longevity General" },
]

const categories: { value: Category; label: string }[] = [
  { value: "wearables", label: "Wearables" },
  { value: "sleep", label: "Sleep" },
  { value: "nutrition", label: "Nutrition" },
  { value: "diagnostics", label: "Diagnostics" },
  { value: "smart_home", label: "Smart Home" },
  { value: "books", label: "Books" },
]

const vendors: Vendor[] = ["amazon", "oura", "whoop", "eight_sleep", "thorne", "levels", "shopify", "ebay", "other"]

export function ProductFilters({
  selectedGoals,
  selectedVendors,
  selectedCategories,
  priceRange,
  onGoalsChange,
  onVendorsChange,
  onCategoriesChange,
  onPriceRangeChange,
  onReset,
  className,
}: FiltersProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleGoal = (goal: Goal) => {
    if (selectedGoals.includes(goal)) {
      onGoalsChange(selectedGoals.filter((g) => g !== goal))
    } else {
      onGoalsChange([...selectedGoals, goal])
    }
  }

  const toggleVendor = (vendor: Vendor) => {
    if (selectedVendors.includes(vendor)) {
      onVendorsChange(selectedVendors.filter((v) => v !== vendor))
    } else {
      onVendorsChange([...selectedVendors, vendor])
    }
  }

  const toggleCategory = (category: Category) => {
    if (selectedCategories.includes(category)) {
      onCategoriesChange(selectedCategories.filter((c) => c !== category))
    } else {
      onCategoriesChange([...selectedCategories, category])
    }
  }

  return (
    <>
      {/* Mobile Toggle */}
      <Button variant="secondary" onClick={() => setIsOpen(!isOpen)} className="mb-4 w-full rounded-2xl lg:hidden">
        {isOpen ? "Hide Filters" : "Show Filters"}
      </Button>

      {/* Filters */}
      <div
        className={cn(
          "space-y-6 rounded-2xl border border-border bg-card/30 p-6 backdrop-blur-md lg:block",
          !isOpen && "hidden",
          className,
        )}
      >
        <div className="flex items-center justify-between">
          <h3 className="font-sans text-lg font-semibold text-foreground">Filters</h3>
          <Button variant="ghost" size="sm" onClick={onReset} className="h-auto p-0 font-mono text-xs">
            Reset
          </Button>
        </div>

        {/* Goals */}
        <div className="space-y-3">
          <Label className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Goals</Label>
          <div className="space-y-2">
            {goals.map((goal) => (
              <div key={goal.value} className="flex items-center gap-2">
                <Checkbox
                  id={`goal-${goal.value}`}
                  checked={selectedGoals.includes(goal.value)}
                  onCheckedChange={() => toggleGoal(goal.value)}
                />
                <label
                  htmlFor={`goal-${goal.value}`}
                  className="cursor-pointer text-sm text-foreground transition-colors hover:text-primary"
                >
                  {goal.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-3">
          <Label className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Categories</Label>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category.value} className="flex items-center gap-2">
                <Checkbox
                  id={`category-${category.value}`}
                  checked={selectedCategories.includes(category.value)}
                  onCheckedChange={() => toggleCategory(category.value)}
                />
                <label
                  htmlFor={`category-${category.value}`}
                  className="cursor-pointer text-sm text-foreground transition-colors hover:text-primary"
                >
                  {category.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="space-y-3">
          <Label className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            Price Range: ${priceRange[0]} - ${priceRange[1]}
          </Label>
          <Slider
            value={priceRange}
            onValueChange={(value) => onPriceRangeChange(value as [number, number])}
            min={0}
            max={3000}
            step={50}
            className="cursor-pointer"
          />
        </div>

        {/* Vendors */}
        <div className="space-y-3">
          <Label className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Vendors</Label>
          <div className="space-y-2">
            {vendors.map((vendor) => (
              <div key={vendor} className="flex items-center gap-2">
                <Checkbox
                  id={`vendor-${vendor}`}
                  checked={selectedVendors.includes(vendor)}
                  onCheckedChange={() => toggleVendor(vendor)}
                />
                <label
                  htmlFor={`vendor-${vendor}`}
                  className="cursor-pointer text-sm text-foreground transition-colors hover:text-primary"
                >
                  {vendorConfig[vendor]?.name || vendor}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
