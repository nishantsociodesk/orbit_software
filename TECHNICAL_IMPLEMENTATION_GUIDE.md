# Technical Implementation: Merchant-to-Website Data Flow

## 🎯 Quick Answer to Your Questions

### 1. How Admin Sees Merchants
**Page**: `http://localhost:3001/dashboard/merchants`
**Component**: Already exists at `orbit_admin/src/app/dashboard/merchants/page.tsx`
**API**: `GET /api/merchants`

### 2. How Merchant Lists Products
**Page**: `http://localhost:3003/dashboard/products` (in Orbit-360)
**API**: `POST /api/products`, `GET /api/products?storeId=xxx`
**Database**: `Product` model in Prisma schema

### 3. How Upfronts Are Added
**Page**: `http://localhost:3001/dashboard/themes`
**Component**: Already exists at `orbit_admin/src/app/dashboard/themes/page.tsx`
**API**: `POST /api/provisioning/themes`
**Service**: `themeService.js` (already created)

### 4. How Data Gets to Upfront Website
**Method**: Public API endpoints
**Sync**: Real-time via WebSocket (Phase 3 - to be implemented)
**Current**: REST API polling

### 5. How Brand Onboarding Works
**Wizard**: 7-step process in Orbit-360 dashboard
**API**: `PUT /api/onboarding/:storeId/step/:stepNumber`
**Status**: Tracked in `BrandOnboarding` model

---

## 🔧 Implementation Status

### ✅ Already Implemented (Phase 1 & 2)

1. **Database Schema** ✅
   - `Store`, `Product`, `Theme`, `Plan` models
   - `MerchantProvisioning`, `DeploymentMetadata`
   - `BrandOnboarding`, `BrandOnboardingStep`

2. **Backend Services** ✅
   - `provisioningService.js` - Merchant activation
   - `themeService.js` - Theme management
   - `planService.js` - Plan management

3. **Admin Panel** ✅
   - Merchants list page
   - Themes management page
   - `MerchantActivationModal` component
   - `ProvisioningStatus` component

4. **API Endpoints** ✅
   - `/api/provisioning/merchants/:id/activate`
   - `/api/provisioning/themes`
   - `/api/provisioning/plans`

### ⏳ To Be Implemented (Phase 3-6)

1. **Merchant Dashboard (Orbit-360)** ⏳
   - Products management page
   - Onboarding wizard
   - Website customization

2. **Public Upfront Websites** ⏳
   - Theme templates (Modern, Classic, Minimal)
   - Dynamic routing by subdomain
   - Public API endpoints

3. **Real-Time Sync** ⏳
   - WebSocket for live updates
   - Product sync to website
   - Order notifications

---

## 📝 Implementation Roadmap

### Phase 3: Real-Time Sync System (NEXT)

**Goal**: Products added in dashboard appear instantly on website

**Files to Create**:
```
backend/
  src/
    websocket/
      server.js              # WebSocket server
      handlers/
        productSync.js       # Product update handler
        orderSync.js         # Order notification handler
```

**Implementation**:
```javascript
// backend/src/websocket/server.js
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

// Store connections by merchantId
const connections = new Map();

wss.on('connection', (ws, req) => {
  const merchantId = req.url.split('?merchant=')[1];
  connections.set(merchantId, ws);
  
  ws.on('close', () => {
    connections.delete(merchantId);
  });
});

// Broadcast product update
function broadcastProductUpdate(merchantId, product) {
  const ws = connections.get(merchantId);
  if (ws) {
    ws.send(JSON.stringify({
      type: 'PRODUCT_UPDATE',
      data: product
    }));
  }
}

module.exports = { broadcastProductUpdate };
```

**Update Product Controller**:
```javascript
// backend/src/controllers/productController.js
const { broadcastProductUpdate } = require('../websocket/server');

exports.createProduct = async (req, res) => {
  const product = await prisma.product.create({
    data: req.body
  });
  
  // Broadcast to website
  const store = await prisma.store.findUnique({
    where: { id: product.storeId },
    include: { deployment: true }
  });
  
  broadcastProductUpdate(store.deployment.merchantId, product);
  
  res.json({ product });
};
```

---

### Phase 4: Merchant Dashboard Isolation

**Goal**: Each merchant sees only their data

**Files to Create**:
```
Orbit-360/
  src/
    middleware/
      tenantContext.js       # Extract merchantId from URL
      tenantIsolation.js     # Filter data by merchant
```

**Implementation**:
```javascript
// Orbit-360/src/middleware/tenantContext.js
export function getTenantContext(req) {
  // From URL: ?merchant=merchant_awe123
  const merchantId = req.query.merchant;
  
  if (!merchantId) {
    throw new Error('Merchant ID required');
  }
  
  return { merchantId };
}

// Orbit-360/src/middleware/tenantIsolation.js
export async function withTenantIsolation(handler) {
  return async (req, res) => {
    const { merchantId } = getTenantContext(req);
    
    // Add merchantId to all queries
    req.tenantFilter = { merchantId };
    
    return handler(req, res);
  };
}
```

**Usage in API Routes**:
```javascript
// Orbit-360/pages/api/products.js
import { withTenantIsolation } from '@/middleware/tenantIsolation';

async function handler(req, res) {
  const { merchantId } = req.tenantFilter;
  
  // Get products for this merchant only
  const products = await prisma.product.findMany({
    where: {
      store: {
        deployment: {
          merchantId: merchantId
        }
      }
    }
  });
  
  res.json({ products });
}

export default withTenantIsolation(handler);
```

---

### Phase 5: Website Template System

**Goal**: Upfront themes that display merchant products

**Files to Create**:
```
upfront-websites/
  themes/
    modern/
      index.html
      style.css
      script.js
    classic/
      index.html
      style.css
      script.js
    minimal/
      index.html
      style.css
      script.js
  
  public/
    [subdomain]/
      index.js              # Dynamic routing
```

**Implementation**:
```javascript
// upfront-websites/public/[subdomain]/index.js
export async function getServerSideProps({ params }) {
  const { subdomain } = params;
  
  // Fetch store data
  const storeRes = await fetch(
    `${process.env.API_URL}/api/public/stores/${subdomain}`
  );
  const store = await storeRes.json();
  
  // Fetch products
  const productsRes = await fetch(
    `${process.env.API_URL}/api/public/stores/${subdomain}/products`
  );
  const products = await productsRes.json();
  
  // Fetch theme
  const themeRes = await fetch(
    `${process.env.API_URL}/api/public/stores/${subdomain}/theme`
  );
  const theme = await themeRes.json();
  
  return {
    props: { store, products, theme }
  };
}

export default function StoreFront({ store, products, theme }) {
  // Load theme component dynamically
  const ThemeComponent = require(`@/themes/${theme.slug}`).default;
  
  return (
    <ThemeComponent
      store={store}
      products={products}
      config={theme.config}
    />
  );
}
```

**Theme Component Example**:
```jsx
// upfront-websites/themes/modern/index.jsx
export default function ModernTheme({ store, products, config }) {
  return (
    <div className="modern-theme" style={{ 
      '--primary-color': config.colors.primary 
    }}>
      <header>
        <img src={store.logo} alt={store.name} />
        <h1>{store.name}</h1>
      </header>
      
      <main>
        <section className="hero">
          <h2>Welcome to {store.name}</h2>
          <p>{store.description}</p>
        </section>
        
        <section className="products">
          <h2>Featured Products</h2>
          <div className="product-grid">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </main>
      
      <footer>
        <p>&copy; 2026 {store.name}. All rights reserved.</p>
      </footer>
    </div>
  );
}
```

---

### Phase 6: Onboarding Wizard

**Goal**: 7-step wizard for merchant setup

**Files to Create**:
```
Orbit-360/
  src/
    components/
      onboarding/
        OnboardingWizard.tsx
        steps/
          Step1BusinessInfo.tsx
          Step2Branding.tsx
          Step3Payment.tsx
          Step4Marketing.tsx
          Step5Products.tsx
          Step6Customization.tsx
          Step7GoLive.tsx
```

**Implementation**:
```tsx
// Orbit-360/src/components/onboarding/OnboardingWizard.tsx
export function OnboardingWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [onboarding, setOnboarding] = useState(null);
  
  useEffect(() => {
    // Fetch onboarding status
    fetch('/api/onboarding')
      .then(res => res.json())
      .then(data => {
        setOnboarding(data);
        setCurrentStep(data.currentStep);
      });
  }, []);
  
  const steps = [
    { component: Step1BusinessInfo, title: 'Business Information' },
    { component: Step2Branding, title: 'Logo & Branding' },
    { component: Step3Payment, title: 'Payment Setup' },
    { component: Step4Marketing, title: 'Marketing Setup' },
    { component: Step5Products, title: 'Product Upload' },
    { component: Step6Customization, title: 'Website Customization' },
    { component: Step7GoLive, title: 'Go Live!' },
  ];
  
  const CurrentStepComponent = steps[currentStep - 1].component;
  
  const handleNext = async (data) => {
    // Save step data
    await fetch(`/api/onboarding/step/${currentStep}`, {
      method: 'PUT',
      body: JSON.stringify({ data, completed: true })
    });
    
    setCurrentStep(currentStep + 1);
  };
  
  return (
    <div className="onboarding-wizard">
      <ProgressBar current={currentStep} total={7} />
      
      <CurrentStepComponent
        onNext={handleNext}
        onBack={() => setCurrentStep(currentStep - 1)}
      />
    </div>
  );
}
```

---

## 🔄 Complete Data Flow Example

### Scenario: Merchant adds iPhone 15 Pro Max

```
1. Merchant Dashboard (Orbit-360)
   ↓
   User fills product form:
   - Name: iPhone 15 Pro Max
   - Price: $1,199.00
   - Stock: 50
   - Images: [img1.jpg, img2.jpg]
   ↓
   Clicks "Save Product"
   ↓

2. Frontend sends request:
   POST http://localhost:3000/api/products
   {
     name: "iPhone 15 Pro Max",
     price: 1199.00,
     stock: 50,
     images: ["url1", "url2"]
   }
   ↓

3. Backend API (with tenant isolation):
   - Extract merchantId from session/URL
   - Find store for this merchant
   - Create product linked to store
   ↓

4. Database:
   INSERT INTO Product (
     id, storeId, name, price, stock, images
   ) VALUES (
     'uuid', 'store-uuid', 'iPhone 15 Pro Max', 1199.00, 50, ['url1', 'url2']
   )
   ↓

5. WebSocket broadcast:
   broadcastProductUpdate(merchantId, product)
   ↓

6. Upfront Website receives update:
   - WebSocket client listening
   - Receives new product data
   - Updates product list in real-time
   ↓

7. Customer visits website:
   https://awesome-electronics.orbit360.shop
   ↓
   
8. Website fetches data:
   GET /api/public/stores/awesome-electronics/products
   ↓
   
9. Backend returns products:
   [
     {
       id: 'uuid',
       name: 'iPhone 15 Pro Max',
       price: 1199.00,
       stock: 50,
       images: ['url1', 'url2']
     },
     // ... other products
   ]
   ↓

10. Upfront theme renders:
    <ProductCard
      name="iPhone 15 Pro Max"
      price="$1,199.00"
      image="url1"
    />
```

---

## 🚀 Next Steps to Complete Implementation

### Immediate (This Week):
1. ✅ Database schema - DONE
2. ✅ Provisioning service - DONE
3. ✅ Admin activation flow - DONE
4. ⏳ Create public API endpoints for Upfront websites
5. ⏳ Build basic Upfront theme template

### Short-term (Next Week):
1. ⏳ Implement WebSocket sync
2. ⏳ Build merchant dashboard product management
3. ⏳ Create onboarding wizard
4. ⏳ Deploy first Upfront website

### Medium-term (Next Month):
1. ⏳ Complete all 3 Upfront themes
2. ⏳ Add payment processing
3. ⏳ Implement order management
4. ⏳ Add analytics dashboard

---

## 📋 Quick Commands

```bash
# Seed themes and plans
cd backend
node seed-provisioning.js

# Start admin panel
cd orbit_admin
npm run dev
# http://localhost:3001/dashboard/merchants

# Start merchant dashboard
cd Orbit-360
npm run dev
# http://localhost:3003

# Start backend API
cd backend
npm run dev
# http://localhost:5000

# Activate a merchant (via API)
curl -X POST http://localhost:5000/api/provisioning/merchants/STORE_ID/activate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -d '{
    "themeId": "theme-uuid",
    "planId": "plan-uuid",
    "subdomain": "awesome-electronics",
    "domain": "awesomeelectronics.com",
    "category": "Electronics"
  }'
```

---

**This guide shows exactly how the system works from admin activation to live merchant website!** 🚀
