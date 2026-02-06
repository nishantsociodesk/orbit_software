# Template API Integration Guide

**Last Updated:** 2026-02-06  
**Status:** ✅ Backend API Ready | 🔄 Template Integration In Progress

---

## 🎯 Overview

This guide explains how to convert templates from using **dummy data** to fetching **real merchant data** from the Orbit backend API.

### What We Built

1. **✅ Backend Public API** (`backend/src/controllers/storefrontPublicController.js`)
   - Endpoints for store info, products, customization, categories, theme
   - No authentication required (public-facing)
   - Supports filtering, pagination, search

2. **✅ API Client Library** (`templates/orbit_front_all/lib/orbit-api.ts`)
   - TypeScript client for easy API consumption
   - Error handling and caching
   - Helper functions for subdomain detection

3. **✅ Data Adapter** (`templates/orbit_front_all/lib/data-adapter.ts`)
   - Transforms API responses to template format
   - Provides fallback for errors

---

## 📡 Available API Endpoints

All endpoints are prefixed with: `/api/storefront/public/:subdomain`

| Endpoint | Description | Example |
|----------|-------------|---------|
| `GET /info` | Store basic information | `/api/storefront/public/mystore/info` |
| `GET /customization` | Branding, colors, hero section | `/api/storefront/public/mystore/customization` |
| `GET /products` | All products (with pagination) | `/api/storefront/public/mystore/products?limit=20` |
| `GET /products/:id` | Single product details | `/api/storefront/public/mystore/products/abc123` |
| `GET /categories` | Unique product categories | `/api/storefront/public/mystore/categories` |
| `GET /theme` | Theme configuration | `/api/storefront/public/mystore/theme` |

### Query Parameters

**Products endpoint** supports:
- `category` - Filter by category
- `search` - Search in name/description
- `limit` - Number of products (default: 50)
- `offset` - Pagination offset (default: 0)

Example:
```
/api/storefront/public/mystore/products?category=snacks&limit=10&offset=0
```

---

## 🔧 How to Integrate API into Templates

### Step 1: Set Up Environment Variables

Create `.env.local` in your template root:

```env
NEXT_PUBLIC_ORBIT_API_URL=http://localhost:5000
NEXT_PUBLIC_DEFAULT_SUBDOMAIN=demo
```

### Step 2: Copy API Client Files

Copy these files to your template's `lib/` folder:
- `orbit-api.ts` - API client
- `data-adapter.ts` - Data transformer

### Step 3: Update Components to Use API

#### Option A: Server Components (Recommended)

```typescript
// app/page.tsx
import { headers } from 'next/headers';
import { createAPIFromRequest } from '@/lib/orbit-api';
import { getProducts, getStoreCustomization } from '@/lib/data-adapter';

export default async function Home() {
  const headersList = headers();
  const hostname = headersList.get('host') || 'localhost';
  const subdomain = hostname.split('.')[0];
  
  // Fetch data from API
  const products = await getProducts(subdomain);
  const customization = await getStoreCustomization(subdomain);
  
  return (
    <div>
      <h1>{customization?.heroSection?.title || 'Welcome'}</h1>
      <ProductGrid products={products} />
    </div>
  );
}
```

#### Option B: Client Components

```typescript
'use client';

import { useEffect, useState } from 'react';
import { createAPIFromWindow } from '@/lib/orbit-api';
import type { Product } from '@/lib/orbit-api';

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const api = createAPIFromWindow();
    
    api.getProducts()
      .then(response => setProducts(response.products))
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }, []);
  
  if (loading) return <div>Loading...</div>;
  
  return (
    <div>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

### Step 4: Replace Dummy Data Files

**Before:**
```typescript
// lib/data.ts
export const products = [
  { id: 1, name: "Truffle Popcorn", price: 299, ... },
  { id: 2, name: "Spicy Cashews", price: 499, ... },
];
```

**After:**
```typescript
// lib/data.ts (keep for type definitions)
export interface Product {
  id: number;
  name: string;
  price: number;
  // ... other fields
}

// Use data-adapter.ts to fetch real data
```

---

## 🏗️ Template-Specific Integration Examples

### Example 1: orbit_front_all (Food & Beverage)

**File:** `components/sections/BestSellers.tsx`

**Before:**
```typescript
import { products } from '@/lib/data';

export default function BestSellers() {
  const bestSellers = products.filter(p => p.badge === 'Bestseller');
  
  return (
    <div>
      {bestSellers.map(product => <ProductCard key={product.id} product={product} />)}
    </div>
  );
}
```

**After:**
```typescript
import { getProducts } from '@/lib/data-adapter';
import { headers } from 'next/headers';

export default async function BestSellers() {
  const headersList = headers();
  const subdomain = headersList.get('host')?.split('.')[0] || 'demo';
  
  const products = await getProducts(subdomain);
  const bestSellers = products.slice(0, 4); // Get first 4 products
  
  return (
    <div>
      {bestSellers.map(product => <ProductCard key={product.id} product={product} />)}
    </div>
  );
}
```

### Example 2: Hero Section with Customization

**File:** `components/sections/Hero.tsx`

**Before:**
```typescript
export default function Hero() {
  return (
    <div className="hero">
      <h1>Welcome to Our Store</h1>
      <p>Discover amazing products</p>
    </div>
  );
}
```

**After:**
```typescript
import { getStoreCustomization } from '@/lib/data-adapter';
import { headers } from 'next/headers';

export default async function Hero() {
  const headersList = headers();
  const subdomain = headersList.get('host')?.split('.')[0] || 'demo';
  
  const customization = await getStoreCustomization(subdomain);
  
  return (
    <div 
      className="hero"
      style={{
        backgroundImage: customization?.heroSection?.backgroundImage 
          ? `url(${customization.heroSection.backgroundImage})` 
          : undefined
      }}
    >
      <h1>{customization?.heroSection?.title || 'Welcome to Our Store'}</h1>
      <p>{customization?.heroSection?.subtitle || 'Discover amazing products'}</p>
    </div>
  );
}
```

---

## 🎨 Using Brand Customization

### Apply Brand Colors

```typescript
// app/layout.tsx
import { getStoreCustomization } from '@/lib/data-adapter';
import { headers } from 'next/headers';

export default async function RootLayout({ children }) {
  const headersList = headers();
  const subdomain = headersList.get('host')?.split('.')[0] || 'demo';
  const customization = await getStoreCustomization(subdomain);
  
  const colors = customization?.brandColors || {
    primary: '#000000',
    secondary: '#666666',
    accent: '#ff6b6b'
  };
  
  return (
    <html lang="en">
      <head>
        <style>{`
          :root {
            --color-primary: ${colors.primary};
            --color-secondary: ${colors.secondary};
            --color-accent: ${colors.accent};
          }
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### Use Logo

```typescript
// components/Header.tsx
import { getStoreInfo } from '@/lib/data-adapter';
import { headers } from 'next/headers';

export default async function Header() {
  const headersList = headers();
  const subdomain = headersList.get('host')?.split('.')[0] || 'demo';
  const storeInfo = await getStoreInfo(subdomain);
  
  return (
    <header>
      {storeInfo?.logo ? (
        <img src={storeInfo.logo} alt={storeInfo.name} />
      ) : (
        <h1>{storeInfo?.name || 'Store'}</h1>
      )}
    </header>
  );
}
```

---

## 🚀 Testing the Integration

### 1. Start Backend Server

```bash
cd d:\orbit\backend
npm run dev
```

Backend should run on `http://localhost:5000`

### 2. Create Test Data

Use Orbit-360 dashboard or create test data directly in database:

```javascript
// backend/test-data.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createTestStore() {
  const store = await prisma.store.create({
    data: {
      name: 'Demo Food Store',
      subdomain: 'demo',
      description: 'A demo food and beverage store',
      logo: 'https://example.com/logo.png',
      category: 'food_beverage',
      isActive: true,
      userId: 'user-id-here', // Replace with actual user ID
    }
  });
  
  await prisma.product.createMany({
    data: [
      {
        storeId: store.id,
        name: 'Organic Coffee',
        description: 'Premium organic coffee beans',
        price: 299,
        stock: 100,
        images: ['https://example.com/coffee.jpg'],
        isActive: true
      },
      {
        storeId: store.id,
        name: 'Green Tea',
        description: 'Fresh green tea leaves',
        price: 199,
        stock: 50,
        images: ['https://example.com/tea.jpg'],
        isActive: true
      }
    ]
  });
  
  console.log('Test data created!');
}

createTestStore();
```

### 3. Test API Endpoints

```bash
# Test store info
curl http://localhost:5000/api/storefront/public/demo/info

# Test products
curl http://localhost:5000/api/storefront/public/demo/products

# Test customization
curl http://localhost:5000/api/storefront/public/demo/customization
```

### 4. Start Template

```bash
cd d:\orbit\templates\orbit_front_all
npm install
npm run dev
```

Template should run on `http://localhost:3000`

---

## 🔄 Migration Checklist

For each template, complete these steps:

- [ ] Copy `orbit-api.ts` to `lib/`
- [ ] Copy `data-adapter.ts` to `lib/`
- [ ] Create `.env.local` with API URL
- [ ] Update `app/page.tsx` to fetch from API
- [ ] Update `components/sections/Hero.tsx` to use customization
- [ ] Update `components/sections/BestSellers.tsx` to use API products
- [ ] Update `components/sections/CategoryExplorer.tsx` to use API categories
- [ ] Update header/footer to use store info
- [ ] Add loading states for all API calls
- [ ] Add error handling and fallbacks
- [ ] Test with real merchant data
- [ ] Test with missing/empty data

---

## 🐛 Troubleshooting

### Issue: "Failed to fetch from API"

**Solution:** Check that:
1. Backend server is running (`npm run dev` in backend folder)
2. `.env.local` has correct `NEXT_PUBLIC_ORBIT_API_URL`
3. CORS is enabled in backend
4. Store exists in database with correct subdomain

### Issue: "Products not showing"

**Solution:**
1. Check if products exist in database for that store
2. Verify `isActive: true` on both store and products
3. Check browser console for API errors
4. Test API endpoint directly in browser

### Issue: "Customization not applying"

**Solution:**
1. Check if `WebsiteCustomization` record exists for store
2. Verify JSON structure in database matches expected format
3. Check if CSS variables are being set correctly

---

## 📚 Next Steps

1. **Complete orbit_front_all integration** ✅ (Files created, needs testing)
2. **Replicate for other templates** (12 remaining)
3. **Add image upload to Orbit-360 dashboard**
4. **Set up subdomain routing for production**
5. **Add real-time preview in dashboard**

---

## 🔗 Related Files

- Backend API: `backend/src/controllers/storefrontPublicController.js`
- Backend Routes: `backend/src/routes/storefrontPublic.js`
- API Client: `templates/orbit_front_all/lib/orbit-api.ts`
- Data Adapter: `templates/orbit_front_all/lib/data-adapter.ts`
- Integration Plan: `SHOPIFY_LIKE_INTEGRATION_PLAN.md`

---

**Ready to test?** Start the backend, create test data, and run the template! 🚀
