# Acme Longevity - Quiz-Driven Dropshipping Marketplace

A modern, quiz-driven marketplace for longevity products built with Next.js 16, featuring personalized recommendations and multi-vendor integrations.

## Features

- **Personalized Quiz System**: 6-step quiz to understand user goals and preferences
- **Smart Recommendations**: AI-powered scoring algorithm that matches products to user needs
- **Product Catalog**: Filterable catalog with 18+ curated longevity products
- **Multi-Vendor Support**: Integration with Amazon, eBay, Shopify, and direct vendors
- **Beautiful UI**: Shader-powered design with smooth animations and transitions
- **Responsive**: Mobile-first design that works on all devices

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Styling**: Tailwind CSS with custom design tokens
- **UI Components**: shadcn/ui
- **Type Safety**: TypeScript
- **Animations**: Framer Motion compatible animations

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

\`\`\`bash
npm install
\`\`\`

3. Run the development server:

\`\`\`bash
npm run dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

### Optional Integrations

To enable third-party product syncing, add these environment variables:

#### Amazon Product Advertising API (PA-API v5)
\`\`\`env
AMAZON_ACCESS_KEY=your_access_key
AMAZON_SECRET_KEY=your_secret_key
AMAZON_ASSOC_TAG=your_associate_tag
AMAZON_PARTNER_TAG=your_partner_tag
AMAZON_LOCALE=US
\`\`\`

#### eBay Browse API
\`\`\`env
EBAY_APP_ID=your_app_id
\`\`\`

#### Shopify Storefront API
\`\`\`env
SHOPIFY_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_TOKEN=your_storefront_token
\`\`\`

**Note**: The app works without these variables by using the curated seed data. Integrations are optional and provide real-time product syncing when configured.

## Project Structure

\`\`\`
app/
├── page.tsx                 # Home page
├── products/page.tsx        # Product catalog
├── quiz/page.tsx           # Quiz system
├── recommendations/page.tsx # Personalized results
├── product/[slug]/page.tsx # Product details
├── about/page.tsx          # About page
├── contact/page.tsx        # Contact page
└── legal/                  # Legal pages

components/
├── product-card.tsx        # Product display card
├── product-filters.tsx     # Filter sidebar
├── quiz-wizard.tsx         # Multi-step quiz
├── recommendation-collections.tsx
└── vendor-icon.tsx         # Vendor badges

lib/
├── types.ts               # TypeScript types
├── seed.ts                # Product seed data
├── quiz.ts                # Quiz configuration
├── recommendation-engine.ts # Scoring algorithm
├── product-filters.ts     # Filter logic
├── vendor-config.ts       # Vendor settings
└── integrations/          # API integrations
    ├── index.ts
    ├── amazon.ts
    ├── ebay.ts
    └── shopify.ts
\`\`\`

## How It Works

### Personalization Algorithm

Products are scored based on:

1. **Goal Matching** (+3 points per matching goal)
2. **Related Goals** (+1 point for adjacent goals)
3. **Price Fit** (+1 if within 70-130% of budget, -1 otherwise)
4. **Wearables Preference** (-2 if user avoids wearables)
5. **Popularity** (0-1 point based on rating/demand)
6. **Stock Status** (-5 if out of stock)

### Collections

Results are organized into three tiers:

- **Start Here**: Budget-friendly essentials
- **Optimize**: Mid-tier products for measurable gains
- **Deep Dive**: Advanced tools for serious optimization

## Affiliate Disclosure

This marketplace includes affiliate links. We may earn commissions from purchases made through our links, which helps us provide free personalized recommendations.

## License

MIT
