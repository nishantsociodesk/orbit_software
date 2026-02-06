# Upfront Template Analysis

Date: 2026-02-06

## Summary
- Total repositories: 4
- Total templates/themes identified: 13
- Common stack: Next.js (App Router) + React 19 + TypeScript
- Common styling: Tailwind CSS (some templates use Radix UI and shadcn-style components)

## Repository: `orbit_front_others`
Templates (6):
1. `fashion_upfront` (Clothing)
2. `fashion_upfront_2` (Clothing)
3. `FOOTWEAR UPFRONT` (Footwear)
4. `toy upfront 2` (Toy Store)
5. `toy upfront 3` (Toy Store)
6. `toys upfront` (Toy Store)

Tech stack:
- Next.js 16.1.x, React 19, TypeScript
- App Router (`src/app` in most projects)

Styling:
- Tailwind CSS (postcss + tailwind)
- Some templates include custom CSS files in `app` or `components`

Dummy data locations:
- `fashion_upfront/src/data/products.ts`
- `fashion_upfront/src/data/questions.ts`
- `fashion_upfront/src/data/reviews.ts`
- `fashion_upfront_2/src/data/products.ts`
- `fashion_upfront_2/src/data/questions.ts`
- `fashion_upfront_2/src/data/reviews.ts`
- `FOOTWEAR UPFRONT/src/data/products.ts`
- `toy upfront 2/lib/data.ts`
- `toy upfront 3/lib/data.ts`
- `toys upfront/lib/data.ts`
- Static images in `public/` and `/images/*`

Component architecture:
- Feature components in `components/`
- Shared state in `context/` or `contexts/`
- Product rendering via map of local arrays

Category fit:
- Clothing: `fashion_upfront`, `fashion_upfront_2`
- Footwear: `FOOTWEAR UPFRONT`
- Toy Store: `toy upfront 2`, `toy upfront 3`, `toys upfront`

## Repository: `orbit-cosmetics-upfront`
Templates (5):
1. `beauty-personal-care-upfront` (Cosmetics)
2. `furniture-upfront` (Accessory/Home; needs category decision)
3. `perfume-upfront` (Perfume)
4. `perfume-upfront-theme2` (Perfume)
5. `perfume-upfront-theme3` (Perfume)

Tech stack:
- Next.js 16.1.6, React 19, TypeScript
- App Router (`app/`)

Styling:
- Tailwind CSS + Radix UI/shadcn-style components
- Animated UI via `framer-motion` in perfume templates

Dummy data locations:
- `beauty-personal-care-upfront/lib/products.ts` (products + filters + reviews)
- `perfume-upfront/lib/data.ts` (products + filters + reviews)
- `perfume-upfront-theme2/lib/data.ts`
- `perfume-upfront-theme3/lib/data.ts`
- `furniture-upfront/components/home/FeaturedProducts.tsx` (hardcoded `PRODUCTS`)
- Additional static content in `components/home/*.tsx`

Component architecture:
- Feature sections in `components/` grouped by domain (cart, shop, search)
- Shared cart context in `context/CartContext.tsx`

Category fit:
- Cosmetics: `beauty-personal-care-upfront`
- Perfume: `perfume-upfront`, `perfume-upfront-theme2`, `perfume-upfront-theme3`
- Jewellery/Accessories (tentative): `furniture-upfront` (needs confirmation)

## Repository: `orbit_front_all`
Templates (1):
1. Root template (Food & Beverage)

Tech stack:
- Next.js 16.1.5, React 19, TypeScript

Styling:
- Tailwind CSS + Radix UI/shadcn-style components

Dummy data locations:
- `lib/data.ts` (products + categories)
- Static images in `public/`

Component architecture:
- Section components in `components/sections/`
- UI components in `components/ui/`

Category fit:
- Food & Beverage

## Repository: `orbit_upfront`
Templates (1):
1. Root template (Electronics)

Tech stack:
- Next.js 16.1.4, React 19, TypeScript

Styling:
- Tailwind CSS

Dummy data locations:
- `src/data/products.ts`
- `src/data/reviews.ts`
- `src/data/questions.ts`
- Static assets referenced via external URLs

Component architecture:
- Feature components in `src/components/`
- State via `contexts/ThemeContext.tsx` and `store/*`

Category fit:
- Electronics
