import { fetchAmazonProducts, buildAmazonAffiliateUrl } from "./amazon"
import { fetchEbayProducts, buildEbayAffiliateUrl } from "./ebay"
import { fetchShopifyProducts, buildShopifyCartUrl } from "./shopify"
import type { Product, Vendor } from "../types"

export interface IntegrationStatus {
  amazon: boolean
  ebay: boolean
  shopify: boolean
}

export function getIntegrationStatus(): IntegrationStatus {
  return {
    amazon: !!(process.env.AMAZON_ACCESS_KEY && process.env.AMAZON_SECRET_KEY),
    ebay: !!process.env.EBAY_APP_ID,
    shopify: !!(process.env.SHOPIFY_DOMAIN && process.env.SHOPIFY_STOREFRONT_TOKEN),
  }
}

export async function fetchProductsFromAllIntegrations(query: string): Promise<Product[]> {
  const status = getIntegrationStatus()
  const promises: Promise<Product[]>[] = []

  if (status.amazon) {
    promises.push(fetchAmazonProducts(query))
  }
  if (status.ebay) {
    promises.push(fetchEbayProducts(query))
  }
  if (status.shopify) {
    promises.push(fetchShopifyProducts())
  }

  const results = await Promise.allSettled(promises)
  const products = results
    .filter((r) => r.status === "fulfilled")
    .flatMap((r) => (r.status === "fulfilled" ? r.value : []))

  return products
}

export function buildVendorAffiliateUrl(vendor: Vendor, productId: string, baseUrl?: string): string {
  switch (vendor) {
    case "amazon":
      return buildAmazonAffiliateUrl(productId)
    case "ebay":
      return buildEbayAffiliateUrl(productId)
    case "shopify":
      return baseUrl || `https://store.example.com/products/${productId}`
    default:
      return baseUrl || "#"
  }
}

export { fetchAmazonProducts, fetchEbayProducts, fetchShopifyProducts, buildShopifyCartUrl }
