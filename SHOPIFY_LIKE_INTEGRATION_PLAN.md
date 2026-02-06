# Shopify-Like Dynamic Template Integration Plan

**Date:** 2026-02-06  
**Objective:** Enable merchants to manage their storefront content from Orbit-360 dashboard and have it dynamically reflect on their live website templates (just like Shopify).

---

## 🎯 System Overview

```
┌─────────────────────┐
│  Merchant Dashboard │  ← Merchant edits business info, products, images
│   (Orbit-360)       │
└──────────┬──────────┘
           │
           │ Updates via API
           ▼
┌─────────────────────┐
│  Backend Database   │  ← Stores all merchant data (Prisma + PostgreSQL)
│  (PostgreSQL)       │
└──────────┬──────────┘
           │
           │ Fetches via Public API
           ▼
┌─────────────────────┐
│  Merchant Website   │  ← Template fetches data dynamically
│  (Next.js Template) │
└─────────────────────┘
```

---

## 📋 Phase 1: Backend Public API (Storefront API)

### 1.1 Create Public API Endpoints

**File:** `backend/src/routes/storefrontPublic.js`

Endpoints needed:
- `GET /api/storefront/public/:subdomain/info` - Get store business info
- `GET /api/storefront/public/:subdomain/products` - Get all products
- `GET /api/storefront/public/:subdomain/products/:id` - Get single product
- `GET /api/storefront/public/:subdomain/customization` - Get website customization
- `GET /api/storefront/public/:subdomain/categories` - Get product categories

### 1.2 Create Controllers

**File:** `backend/src/controllers/storefrontPublicController.js`

Functions:
- `getStoreInfo()` - Returns store name, logo, description, contact info
- `getStoreProducts()` - Returns products with images, prices, descriptions
- `getStoreCustomization()` - Returns branding, colors, hero section, etc.
- `getStoreCategories()` - Returns product categories

---

## 📋 Phase 2: Template API Integration Layer

### 2.1 Create API Client for Templates

**File:** `templates/shared/lib/orbit-api.ts` (shared across all templates)

```typescript
// API client to fetch data from Orbit backend
export class OrbitAPI {
  private baseUrl: string;
  private subdomain: string;

  constructor(subdomain: string) {
    this.baseUrl = process.env.NEXT_PUBLIC_ORBIT_API_URL || 'http://localhost:5000';
    this.subdomain = subdomain;
  }

  async getStoreInfo() { ... }
  async getProducts() { ... }
  async getProduct(id: string) { ... }
  async getCustomization() { ... }
  async getCategories() { ... }
}
```

### 2.2 Replace Dummy Data in Templates

For each template, replace:
- `lib/data.ts` → Fetch from API
- Hardcoded images → Use uploaded merchant images
- Static business info → Fetch from store customization

---

## 📋 Phase 3: Orbit-360 Dashboard Enhancements

### 3.1 Store Management UI

**Already exists:** `Orbit-360/app/dashboard/website/page.tsx`

Tabs:
1. **Branding** - Logo, colors, fonts
2. **Content** - Hero section, about section
3. **Products** - Manage products (already exists in products page)
4. **Layout** - Theme selection
5. **SEO** - Meta tags, descriptions

### 3.2 Image Upload System

- Upload merchant logos, product images, banners
- Store in `/backend/uploads/` or cloud storage
- Serve via `/api/uploads/:filename`

---

## 📋 Phase 4: Dynamic Subdomain Routing

### 4.1 Template Deployment Strategy

**Option A: Single Next.js App (Recommended)**
- One Next.js app serves all merchants
- Detect subdomain from request
- Fetch merchant-specific data based on subdomain
- Apply merchant-specific theme/customization

**Option B: Per-Merchant Deployment**
- Each merchant gets their own deployed template
- More resource-intensive but fully isolated

### 4.2 Subdomain Detection

```typescript
// middleware.ts in template
export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const subdomain = hostname.split('.')[0];
  
  // Store subdomain in cookie/header for API calls
  return NextResponse.next({
    headers: {
      'x-merchant-subdomain': subdomain
    }
  });
}
```

---

## 🚀 Implementation Steps

### Step 1: Backend API Setup ✅
1. Create `storefrontPublicController.js`
2. Create `storefrontPublic.js` routes
3. Add CORS configuration for template domains
4. Test endpoints with Postman/Thunder Client

### Step 2: Template API Client
1. Create `templates/shared/lib/orbit-api.ts`
2. Add environment variable `NEXT_PUBLIC_ORBIT_API_URL`
3. Test API client with one template

### Step 3: Convert First Template (orbit_front_all)
1. Replace `lib/data.ts` with API calls
2. Update components to use API data
3. Add loading states and error handling
4. Test with real merchant data

### Step 4: Replicate for All Templates
1. Apply same pattern to remaining 12 templates
2. Create template-specific adapters if needed
3. Document any template-specific quirks

### Step 5: Dashboard Integration
1. Ensure website customization API works
2. Add image upload functionality
3. Add real-time preview (optional)

### Step 6: Deployment
1. Deploy backend with public API
2. Deploy template(s) with subdomain routing
3. Configure DNS for `*.orbit360.com` → template server
4. Test end-to-end flow

---

## 🔧 Technical Details

### Data Flow Example

1. **Merchant edits logo in Orbit-360:**
   ```
   POST /api/website/customization
   { logo: "https://orbit360.com/uploads/merchant-123/logo.png" }
   ```

2. **Backend saves to database:**
   ```sql
   UPDATE WebsiteCustomization 
   SET logo = 'https://orbit360.com/uploads/merchant-123/logo.png'
   WHERE storeId = 'merchant-123'
   ```

3. **Template fetches data:**
   ```typescript
   const api = new OrbitAPI('merchant-123');
   const customization = await api.getCustomization();
   // customization.logo = "https://orbit360.com/uploads/merchant-123/logo.png"
   ```

4. **Template renders:**
   ```tsx
   <img src={customization.logo} alt="Store Logo" />
   ```

---

## 📊 Database Schema (Already Exists)

```prisma
model Store {
  id          String   @id @default(uuid())
  name        String
  subdomain   String   @unique
  logo        String?
  description String?
  // ... other fields
  
  products              Product[]
  websiteCustomization  WebsiteCustomization?
}

model WebsiteCustomization {
  id              String   @id @default(uuid())
  storeId         String   @unique
  logo            String?
  brandColors     Json?
  heroSection     Json?
  // ... other fields
}

model Product {
  id          String   @id @default(uuid())
  storeId     String
  name        String
  description String?
  price       Decimal
  images      String[]
  // ... other fields
}
```

---

## 🎨 Template Customization Mapping

| Template Field | Database Field | API Endpoint |
|---------------|----------------|--------------|
| Business Name | `Store.name` | `/api/storefront/public/:subdomain/info` |
| Logo | `WebsiteCustomization.logo` | `/api/storefront/public/:subdomain/customization` |
| Hero Title | `WebsiteCustomization.heroSection.title` | `/api/storefront/public/:subdomain/customization` |
| Products | `Product[]` | `/api/storefront/public/:subdomain/products` |
| Brand Colors | `WebsiteCustomization.brandColors` | `/api/storefront/public/:subdomain/customization` |

---

## 🔐 Security Considerations

1. **Public API** - No authentication needed (read-only public data)
2. **Rate Limiting** - Prevent abuse of public endpoints
3. **CORS** - Allow template domains to access API
4. **Image Validation** - Validate uploaded images (size, type)
5. **XSS Protection** - Sanitize user-generated content

---

## 📝 Next Steps

**Choose one to proceed:**

1. ✅ **Start with Backend API** - Create public storefront endpoints
2. ✅ **Start with Template** - Convert `orbit_front_all` to use API
3. ✅ **Start with Dashboard** - Add image upload to Orbit-360
4. ✅ **Do All Three in Parallel** - Full implementation

**Recommended:** Start with #1 (Backend API), then #2 (Template), then #3 (Dashboard).

---

## 📚 Files to Create/Modify

### Backend
- ✅ `backend/src/controllers/storefrontPublicController.js` (NEW)
- ✅ `backend/src/routes/storefrontPublic.js` (NEW)
- ✅ `backend/src/server.js` (MODIFY - add new routes)

### Template (orbit_front_all as example)
- ✅ `templates/orbit_front_all/lib/orbit-api.ts` (NEW)
- ✅ `templates/orbit_front_all/.env.local` (NEW)
- ✅ `templates/orbit_front_all/lib/data.ts` (MODIFY - use API)
- ✅ `templates/orbit_front_all/components/sections/*.tsx` (MODIFY - add loading states)

### Dashboard (Orbit-360)
- ✅ `Orbit-360/app/dashboard/products/page.tsx` (ENHANCE - image upload)
- ✅ `Orbit-360/app/dashboard/website/page.tsx` (ENHANCE - more fields)

---

**Ready to proceed? Let me know which phase to start with!** 🚀
