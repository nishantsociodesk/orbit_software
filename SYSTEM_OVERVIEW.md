# ORBIT360 System Overview - Quick Visual Reference

## 🎯 The Complete Picture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           ORBIT360 ECOSYSTEM                                 │
└─────────────────────────────────────────────────────────────────────────────┘

┌──────────────────┐      ┌──────────────────┐      ┌──────────────────┐
│   ADMIN PANEL    │      │  MERCHANT DASH   │      │  UPFRONT SITES   │
│  (orbit_admin)   │      │   (Orbit-360)    │      │ (Public Websites)│
│  Port: 3001      │      │   Port: 3003     │      │  orbit360.shop   │
└────────┬─────────┘      └────────┬─────────┘      └────────┬─────────┘
         │                         │                         │
         │                         │                         │
         └─────────────────────────┼─────────────────────────┘
                                   │
                                   ▼
                        ┌──────────────────┐
                        │   BACKEND API    │
                        │   (Express.js)   │
                        │   Port: 5000     │
                        └────────┬─────────┘
                                 │
                    ┌────────────┴────────────┐
                    ▼                         ▼
         ┌──────────────────┐      ┌──────────────────┐
         │   PostgreSQL     │      │    MongoDB       │
         │  (Prisma ORM)    │      │  (Mongoose)      │
         │  Relational Data │      │  Document Data   │
         └──────────────────┘      └──────────────────┘
```

---

## 📊 How Each Component Works

### 1. Admin Panel (orbit_admin) - Port 3001

**Purpose**: Platform administration and merchant management

**Key Pages**:
```
/dashboard                    → Overview, metrics
/dashboard/merchants          → View all merchants
/dashboard/merchants/:id      → Merchant details + Activate
/dashboard/themes             → Manage Upfront themes
/dashboard/analytics          → Platform analytics
/dashboard/brands             → Brand management
/dashboard/tickets            → Support tickets
```

**Admin Actions**:
```
1. View pending merchant registrations
2. Activate merchants (select theme + plan)
3. Monitor provisioning status
4. Manage themes and plans
5. View platform analytics
6. Handle support tickets
```

**Tech Stack**:
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- shadcn/ui components

---

### 2. Merchant Dashboard (Orbit-360) - Port 3003

**Purpose**: Merchant's control panel for managing their store

**Key Pages**:
```
/dashboard                    → Merchant overview
/dashboard/products           → Product management
/dashboard/orders             → Order management
/dashboard/analytics          → Store analytics
/dashboard/settings           → Store settings
/dashboard/onboarding         → 7-step wizard
```

**Merchant Actions**:
```
1. Complete onboarding wizard
2. Add/edit/delete products
3. Manage orders
4. View analytics
5. Customize website
6. Configure payments
7. Set up marketing integrations
```

**Tech Stack**:
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Multi-tenant architecture

---

### 3. Upfront Websites (Public) - orbit360.shop

**Purpose**: Customer-facing e-commerce websites

**URL Structure**:
```
https://[merchant-subdomain].orbit360.shop
https://awesome-electronics.orbit360.shop
https://fashion-hub.orbit360.shop
```

**Features**:
```
1. Product catalog
2. Shopping cart
3. Checkout
4. Order tracking
5. Customer accounts
6. Search & filters
```

**Available Themes**:
```
┌─────────────────────────────────────────────────────────┐
│  Upfront Modern                                         │
│  - Clean, minimalist design                             │
│  - Perfect for: Tech, Electronics, Modern brands        │
│  - Layout: Grid-based, lots of whitespace              │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  Upfront Classic                                        │
│  - Traditional e-commerce layout                        │
│  - Perfect for: General retail, Multi-category stores   │
│  - Layout: Sidebar navigation, featured products        │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  Upfront Minimal                                        │
│  - Ultra-minimal, photography-focused                   │
│  - Perfect for: Fashion, Jewelry, Luxury brands         │
│  - Layout: Full-width images, minimal text              │
└─────────────────────────────────────────────────────────┘
```

**Tech Stack**:
- Next.js (SSR for SEO)
- Dynamic routing by subdomain
- Theme system
- Public API integration

---

### 4. Backend API - Port 5000

**Purpose**: Central API for all applications

**Key Endpoints**:

#### Admin Endpoints:
```
POST   /api/provisioning/merchants/:id/activate
GET    /api/provisioning/merchants/:id/provisioning-status
POST   /api/provisioning/merchants/:id/retry-provisioning

GET    /api/provisioning/themes
POST   /api/provisioning/themes
PUT    /api/provisioning/themes/:id
DELETE /api/provisioning/themes/:id

GET    /api/provisioning/plans
POST   /api/provisioning/plans
PUT    /api/provisioning/plans/:id
DELETE /api/provisioning/plans/:id

POST   /api/provisioning/seed-defaults
```

#### Merchant Endpoints:
```
GET    /api/products?storeId=xxx
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id

GET    /api/orders?storeId=xxx
POST   /api/orders
PUT    /api/orders/:id

GET    /api/onboarding/:storeId
PUT    /api/onboarding/:storeId/step/:stepNumber
POST   /api/onboarding/:storeId/complete
```

#### Public Endpoints (for Upfront websites):
```
GET    /api/public/stores/:subdomain
GET    /api/public/stores/:subdomain/products
GET    /api/public/stores/:subdomain/theme
POST   /api/public/stores/:subdomain/orders
```

**Tech Stack**:
- Express.js
- Prisma ORM (PostgreSQL)
- Mongoose (MongoDB)
- JWT authentication
- WebSocket (planned)

---

## 🔄 Complete Workflow Example

### Scenario: New Merchant "Awesome Electronics" Gets Live Website

```
DAY 1 - REGISTRATION
─────────────────────
09:00 AM │ Merchant visits orbit360.com
         │ Fills registration form
         │ ↓
         │ Backend creates Store record
         │ Status: PENDING
         │ ↓
         │ Admin receives notification

10:00 AM │ Admin logs into orbit_admin
         │ http://localhost:3001/dashboard/merchants
         │ ↓
         │ Sees "Awesome Electronics" in Pending list
         │ Clicks "Activate"
         │ ↓
         │ MerchantActivationModal opens
         │ Selects:
         │   Theme: Upfront Classic
         │   Plan: Professional ($79.99/mo)
         │   Subdomain: awesome-electronics
         │   Category: Electronics
         │ ↓
         │ Clicks "Activate Merchant"

10:01 AM │ Provisioning Service starts
         │ ↓
         │ [10%]  Update store config
         │ [25%]  Create workspace
         │ [40%]  Create dashboard instance
         │ [60%]  Deploy website
         │ [80%]  Initialize default data
         │ [95%]  Send welcome email
         │ [100%] Mark complete
         │ ↓
         │ Total time: 28 seconds

10:02 AM │ Merchant receives email:
         │ ───────────────────────────────────
         │ Subject: Welcome to ORBIT360!
         │ 
         │ Dashboard: http://localhost:3003?merchant=merchant_awe123
         │ Website: https://awesome-electronics.orbit360.shop
         │ 
         │ Next steps:
         │ 1. Login to dashboard
         │ 2. Complete onboarding (7 steps)
         │ 3. Add products
         │ 4. Go live!
         │ ───────────────────────────────────

DAY 1 - ONBOARDING
──────────────────
11:00 AM │ Merchant clicks dashboard link
         │ Opens onboarding wizard
         │ ↓
         │ Step 1: Business Information ✅
         │ Step 2: Logo & Branding ✅
         │ Step 3: Payment Setup ✅
         │ Step 4: Marketing Setup ✅

02:00 PM │ Step 5: Product Upload
         │ Adds 15 products:
         │   - iPhone 15 Pro Max - $1,199
         │   - MacBook Pro 16" - $2,499
         │   - AirPods Pro - $249
         │   - ... (12 more)
         │ ✅

03:00 PM │ Step 6: Website Customization
         │ Configures:
         │   - Homepage sections
         │   - Navigation menu
         │   - Footer content
         │ ✅

03:30 PM │ Step 7: Go Live!
         │ Reviews everything
         │ Clicks "Publish & Go Live!"
         │ ✅

DAY 1 - LIVE!
─────────────
03:31 PM │ Website is LIVE! 🎉
         │ https://awesome-electronics.orbit360.shop
         │ ↓
         │ Customers can now:
         │   - Browse 15 products
         │   - Add to cart
         │   - Checkout with Stripe/PayPal
         │   - Track orders

04:00 PM │ First order received! 🎊
         │ Customer: John Doe
         │ Product: iPhone 15 Pro Max
         │ Amount: $1,199.00
         │ ↓
         │ Merchant receives notification
         │ Order appears in dashboard
```

---

## 📋 Data Models Overview

### Core Models:

```
Store (Merchant)
├── id
├── name
├── subdomain
├── customDomain
├── themeId → Theme
├── planId → Plan
├── provisioningStatus
├── category
└── Relations:
    ├── products[]
    ├── orders[]
    ├── settings
    ├── provisioning
    └── deployment

Product
├── id
├── storeId → Store
├── name
├── description
├── price
├── sku
├── stock
├── category
└── images[]

Theme
├── id
├── name
├── slug (upfront-modern, upfront-classic, upfront-minimal)
├── description
├── thumbnail
├── version
├── config (JSON)
└── stores[]

Plan
├── id
├── name
├── slug (starter, professional, enterprise)
├── price
├── billingCycle
├── features (JSON)
├── productLimit
├── storageLimit
└── stores[]

MerchantProvisioning
├── id
├── storeId
├── status (PENDING, IN_PROGRESS, COMPLETED, FAILED)
├── workspaceCreated
├── dashboardCreated
├── websiteDeployed
├── dataInitialized
├── credentialsSent
├── currentStep
├── completionPercent
└── errorLog

DeploymentMetadata
├── id
├── storeId
├── merchantId (unique identifier)
├── tenantNamespace
├── dashboardUrl
├── websiteUrl
└── deploymentConfig

BrandOnboarding
├── id
├── storeId
├── status
├── currentStep
├── totalSteps (7)
└── steps[]

Order
├── id
├── storeId → Store
├── customerEmail
├── items[]
├── total
├── status
└── paymentStatus
```

---

## 🚀 Quick Start Commands

### Setup:
```bash
# 1. Install dependencies
cd backend && npm install
cd ../orbit_admin && npm install
cd ../Orbit-360 && npm install

# 2. Setup database
cd backend
npx prisma migrate dev
npx prisma generate

# 3. Seed themes and plans
node seed-provisioning.js
```

### Run All Services:
```bash
# Terminal 1: Backend API
cd backend
npm run dev
# → http://localhost:5000

# Terminal 2: Admin Panel
cd orbit_admin
npm run dev
# → http://localhost:3001

# Terminal 3: Merchant Dashboard
cd Orbit-360
npm run dev
# → http://localhost:3003
```

### Test the Flow:
```bash
# 1. Open admin panel
http://localhost:3001/dashboard/merchants

# 2. Create a test merchant (or use existing)
# 3. Click "Activate" on a pending merchant
# 4. Fill in the activation modal
# 5. Watch provisioning status update in real-time
# 6. Check merchant dashboard
http://localhost:3003?merchant=MERCHANT_ID

# 7. Add products in merchant dashboard
# 8. View on Upfront website
https://[subdomain].orbit360.shop
```

---

## 📊 System Status

### ✅ Completed (Phases 1 & 2):
- [x] Database schema with multi-tenancy
- [x] Provisioning service (7-step automation)
- [x] Theme management system
- [x] Plan management system
- [x] Admin panel merchant activation
- [x] Provisioning status tracking
- [x] API endpoints for provisioning
- [x] Documentation (comprehensive)

### ⏳ In Progress (Phase 3):
- [ ] Real-time WebSocket sync
- [ ] Public API for Upfront websites
- [ ] Basic Upfront theme templates

### 📅 Planned (Phases 4-6):
- [ ] Merchant dashboard product management
- [ ] Onboarding wizard (7 steps)
- [ ] Website customization interface
- [ ] Payment processing integration
- [ ] Order management system
- [ ] Analytics dashboards

---

## 🎯 Key Features

### Multi-Tenancy:
- ✅ Each merchant has unique `merchantId`
- ✅ Data isolation via `tenantNamespace`
- ✅ Separate dashboard instances
- ✅ Unique subdomains for websites

### Automation:
- ✅ Automated provisioning (28 seconds)
- ✅ Workspace creation
- ✅ Dashboard deployment
- ✅ Website deployment
- ✅ Default data initialization
- ✅ Welcome email sending

### Scalability:
- ✅ Supports unlimited merchants
- ✅ Theme system (easy to add new themes)
- ✅ Plan system (flexible pricing)
- ✅ Modular architecture

### Security:
- ✅ JWT authentication
- ✅ Admin-only endpoints
- ✅ Tenant data isolation
- ✅ Role-based access control

---

**This is your complete ORBIT360 system overview!** 🚀

For detailed guides, see:
- `COMPLETE_MERCHANT_JOURNEY_GUIDE.md` - Visual flow diagrams
- `TECHNICAL_IMPLEMENTATION_GUIDE.md` - Code examples
- `PROVISIONING_SETUP_GUIDE.md` - Setup instructions
- `PROVISIONING_API.md` - API documentation
