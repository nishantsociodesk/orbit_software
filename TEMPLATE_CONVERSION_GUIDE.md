# Template Conversion Guide: From Static to API-Driven

## Overview
This guide documents the process of converting static Upfront templates into dynamic, API-driven storefronts that fetch real merchant data from the Orbit backend.

## Architecture

### Data Flow
```
Merchant Store (DB) 
  → Backend API (/api/storefront/:subdomain or /api/storefront/resolve?domain=...)
  → Template Frontend (Next.js)
  → Customer Browser
```

### Key Endpoints

#### 1. Store Resolution
- **Subdomain**: `GET /api/storefront/:subdomain`
- **Domain**: `GET /api/storefront/resolve?domain=example.com`
- Returns: Store info, theme, website customization

#### 2. Products
- `GET /api/storefront/:subdomain/products`
- Returns: All active products for the store

#### 3. Product Detail
- `GET /api/storefront/:subdomain/products/:id`
- Returns: Single product with variants

#### 4. Checkout
- `POST /api/storefront/:subdomain/checkout`
- Body: `{ items, customerEmail, shippingAddress, ... }`

## Conversion Steps

### Step 1: Remove Static Data Files
Remove or archive these files from each template:
- `lib/data.ts` or `src/data/products.ts`
- `lib/products.ts`
- `src/data/reviews.ts`
- `src/data/questions.ts`
- Any other hardcoded data files

### Step 2: Create API Service Layer
Create `lib/storefront-api.ts`:

```typescript
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const getStoreByDomain = async (domain: string) => {
  const res = await fetch(`${API_BASE}/api/storefront/resolve?domain=${domain}`);
  if (!res.ok) throw new Error('Store not found');
  return res.json();
};

export const getProducts = async (subdomain: string) => {
  const res = await fetch(`${API_BASE}/api/storefront/${subdomain}/products`);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
};

export const getProduct = async (subdomain: string, productId: string) => {
  const res = await fetch(`${API_BASE}/api/storefront/${subdomain}/products/${productId}`);
  if (!res.ok) throw new Error('Product not found');
  return res.json();
};

export const checkout = async (subdomain: string, orderData: any) => {
  const res = await fetch(`${API_BASE}/api/storefront/${subdomain}/checkout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData)
  });
  if (!res.ok) throw new Error('Checkout failed');
  return res.json();
};
```

### Step 3: Update Page Components

#### Home Page (`app/page.tsx`)
**Before:**
```typescript
import { products } from '@/lib/data';

export default function Home() {
  return <FeaturedProducts products={products.slice(0, 8)} />;
}
```

**After:**
```typescript
import { getStoreByDomain, getProducts } from '@/lib/storefront-api';

export default async function Home() {
  const domain = process.env.NEXT_PUBLIC_STORE_DOMAIN || 'default';
  const [storeData, productsData] = await Promise.all([
    getStoreByDomain(domain),
    getProducts(storeData.store.subdomain)
  ]);
  
  return (
    <>
      <Hero customization={storeData.store.customization} />
      <FeaturedProducts products={productsData.products.slice(0, 8)} />
    </>
  );
}
```

#### Products Page (`app/products/page.tsx`)
**Before:**
```typescript
import { products } from '@/lib/data';

export default function ProductsPage() {
  return <ProductGrid products={products} />;
}
```

**After:**
```typescript
import { getStoreByDomain, getProducts } from '@/lib/storefront-api';

export default async function ProductsPage() {
  const domain = process.env.NEXT_PUBLIC_STORE_DOMAIN || 'default';
  const storeData = await getStoreByDomain(domain);
  const productsData = await getProducts(storeData.store.subdomain);
  
  return <ProductGrid products={productsData.products} />;
}
```

#### Product Detail Page (`app/products/[id]/page.tsx`)
**Before:**
```typescript
import { products } from '@/lib/data';

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find(p => p.id === params.id);
  return <ProductDetail product={product} />;
}
```

**After:**
```typescript
import { getStoreByDomain, getProduct } from '@/lib/storefront-api';

export default async function ProductPage({ params }: { params: { id: string } }) {
  const domain = process.env.NEXT_PUBLIC_STORE_DOMAIN || 'default';
  const storeData = await getStoreByDomain(domain);
  const productData = await getProduct(storeData.store.subdomain, params.id);
  
  return <ProductDetail product={productData.product} />;
}
```

### Step 4: Update Environment Variables

Create `.env.local` in each template:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_STORE_DOMAIN=merchant-subdomain.orbit360.com
```

For production deployment:
```env
NEXT_PUBLIC_API_URL=https://api.orbit360.com
NEXT_PUBLIC_STORE_DOMAIN=${MERCHANT_DOMAIN}
```

### Step 5: Update Branding/Customization

Replace hardcoded branding with API data:

**Before:**
```typescript
<h1>My Store</h1>
<p>Welcome to our shop</p>
```

**After:**
```typescript
<h1>{customization.brandName}</h1>
<p>{customization.tagline}</p>
<style jsx>{`
  :root {
    --primary: ${customization.primaryColor};
    --secondary: ${customization.secondaryColor};
    --font-family: ${customization.fontFamily};
  }
`}</style>
```

## Deployment Strategy

### Option 1: Subdomain Per Merchant
- Deploy template once
- Use middleware to detect subdomain
- Fetch store data based on subdomain

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const subdomain = hostname.split('.')[0];
  
  // Pass subdomain to pages via header
  const response = NextResponse.next();
  response.headers.set('x-subdomain', subdomain);
  return response;
}
```

### Option 2: Custom Domain Per Merchant
- Same as Option 1
- Add DNS CNAME verification
- Store custom domain in `Store.customDomain`

### Option 3: Vercel/Netlify Multi-Tenant
- Use Vercel's multi-tenant features
- Deploy once, serve many domains
- Environment variables injected per domain

## Testing

### Local Testing
1. Start backend: `cd backend && npm run dev`
2. Seed data: `node seed-themes.js`
3. Create test merchant via onboarding
4. Provision merchant in admin
5. Start template: `cd templates/orbit_front_all && npm run dev`
6. Set `.env.local` with test subdomain
7. Visit `http://localhost:3000`

### Production Testing
1. Deploy backend to production
2. Deploy template to Vercel/Netlify
3. Configure environment variables
4. Test subdomain routing
5. Test custom domain routing

## Migration Checklist

For each template:
- [ ] Remove static data files
- [ ] Create `lib/storefront-api.ts`
- [ ] Update home page to fetch data
- [ ] Update products page to fetch data
- [ ] Update product detail page to fetch data
- [ ] Update checkout flow
- [ ] Replace hardcoded branding with API data
- [ ] Add environment variables
- [ ] Test locally with real backend
- [ ] Deploy to staging
- [ ] Test with multiple merchants
- [ ] Deploy to production

## Template Status

| Template | Status | Notes |
|----------|--------|-------|
| orbit_front_all | ✅ Ready | General-purpose template |
| orbit_upfront | ✅ Ready | Electronics/tech focus |
| orbit-cosmetics-upfront/* | ✅ Ready | Beauty/cosmetics variants |
| orbit_front_others/* | ✅ Ready | Fashion/toys/footwear |

## Next Steps

1. **Create Template Conversion Script**: Automate the conversion process
2. **Build Template Deployment Pipeline**: CI/CD for template updates
3. **Add Template Versioning**: Track template versions per merchant
4. **Implement Template Switching**: Allow merchants to switch templates
5. **Create Template Marketplace**: Let merchants preview/select templates

## Support

For questions or issues:
- Backend API: See `backend/src/controllers/storefrontController.js`
- Admin provisioning: See `orbit_admin/src/app/dashboard/provisioning/page.tsx`
- Merchant dashboard: See `Orbit-360/app/dashboard/website/page.tsx`
