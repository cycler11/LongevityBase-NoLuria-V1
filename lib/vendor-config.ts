import type { Vendor } from "./types"

export const vendorConfig: Record<
  Vendor,
  {
    name: string
    baseUrl?: string
    affiliateParam?: string
  }
> = {
  amazon: {
    name: "Amazon",
    baseUrl: "https://amazon.com",
    affiliateParam: "tag=acme-20",
  },
  ebay: {
    name: "eBay",
    baseUrl: "https://ebay.com",
  },
  shopify: {
    name: "Shopify",
    baseUrl: "https://shopify.com",
  },
  oura: {
    name: "Oura",
    baseUrl: "https://ouraring.com",
    affiliateParam: "utm_source=acme",
  },
  whoop: {
    name: "WHOOP",
    baseUrl: "https://whoop.com",
    affiliateParam: "utm_source=acme",
  },
  eight_sleep: {
    name: "Eight Sleep",
    baseUrl: "https://eightsleep.com",
    affiliateParam: "utm_source=acme",
  },
  thorne: {
    name: "Thorne",
    baseUrl: "https://thorne.com",
    affiliateParam: "utm_source=acme",
  },
  levels: {
    name: "Levels",
    baseUrl: "https://levelshealth.com",
    affiliateParam: "utm_source=acme",
  },
  other: {
    name: "Other",
  },
}

export const trustLogos = [
  { vendor: "oura" as Vendor, name: "Oura" },
  { vendor: "whoop" as Vendor, name: "WHOOP" },
  { vendor: "eight_sleep" as Vendor, name: "Eight Sleep" },
  { vendor: "levels" as Vendor, name: "Levels" },
  { vendor: "thorne" as Vendor, name: "Thorne" },
  { vendor: "amazon" as Vendor, name: "Amazon" },
  { vendor: "ebay" as Vendor, name: "eBay" },
  { vendor: "shopify" as Vendor, name: "Shopify" },
]
