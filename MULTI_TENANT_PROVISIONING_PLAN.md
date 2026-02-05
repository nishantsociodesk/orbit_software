# ORBIT360 Multi-Tenant Platform Integration & Automation Plan

## 🎯 Executive Summary

This document outlines the complete implementation plan for transforming ORBIT360 into a fully automated multi-merchant platform where every merchant automatically receives:
- A dedicated Orbit360 dashboard
- A dedicated storefront website (theme-based)
- A private workspace linked to Admin
- All systems synced through backend

**Target**: Zero manual setup after admin approval, full provisioning in < 30 seconds.

---

## 📊 Current System Analysis

### Existing Components
1. **Admin Panel** (`orbit_admin`) - Port 3001
2. **Merchant Dashboard** (`Orbit-360`) - Port 3003
3. **Backend** (`backend`) - Express + Prisma + MongoDB
4. **Website Templates** - Multiple Upfront Themes (to be integrated)

### Current Database Schema
- ✅ User model with role-based access
- ✅ Store model with multi-tenancy support
- ✅ Onboarding tracking (BrandOnboarding, BrandOnboardingStep)
- ✅ Admin model with role management
- ✅ Support ticket system
- ⚠️ Missing: Theme management, provisioning tracking, deployment metadata

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         ADMIN PANEL                              │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Merchant Management → Activate Merchant Button          │   │
│  │  - Select Theme                                          │   │
│  │  - Select Plan                                           │   │
│  │  - Assign Domain/Subdomain                               │   │
│  │  - Configure Integrations                                │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────┬───────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                    BACKEND ORCHESTRATOR                          │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Provisioning Service (NEW)                              │   │
│  │  ├─ createWorkspace()                                    │   │
│  │  ├─ createDashboard()                                    │   │
│  │  ├─ deployWebsite()                                      │   │
│  │  ├─ initializeData()                                     │   │
│  │  └─ sendCredentials()                                    │   │
│  └──────────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Real-time Sync Service (NEW)                            │   │
│  │  - WebSocket connections                                 │   │
│  │  - Event broadcasting                                    │   │
│  │  - Data synchronization                                  │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────┬───────────────────────────────────────────┘
                      │
        ┌─────────────┼─────────────┐
        ▼             ▼             ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│   MERCHANT   │ │   MERCHANT   │ │   MERCHANT   │
│  DASHBOARD   │ │   WEBSITE    │ │   DATABASE   │
│  (Orbit360)  │ │  (Theme)     │ │  (Isolated)  │
└──────────────┘ └──────────────┘ └──────────────┘
```

---

## 📋 Implementation Phases

### Phase 1: Database Schema Extensions ✅
**Goal**: Add necessary models for provisioning, themes, and deployment tracking

#### New Models Required:
1. **Theme** - Store website theme templates
2. **MerchantProvisioning** - Track provisioning status
3. **DeploymentMetadata** - Store deployment information
4. **Plan** - Subscription plans
5. **MerchantConfig** - Merchant-specific configurations

#### Schema Updates:
```prisma
model Theme {
  id          String   @id @default(uuid())
  name        String
  slug        String   @unique
  description String?
  thumbnail   String?
  version     String
  isActive    Boolean  @default(true)
  config      Json?    // Theme-specific configuration
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  stores      Store[]
}

model Plan {
  id              String   @id @default(uuid())
  name            String
  slug            String   @unique
  price           Decimal  @db.Decimal(10, 2)
  features        Json
  productLimit    Int?
  orderLimit      Int?
  storageLimit    Int?
  isActive        Boolean  @default(true)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  stores          Store[]
}

model MerchantProvisioning {
  id                    String              @id @default(uuid())
  storeId               String              @unique
  store                 Store               @relation(fields: [storeId], references: [id])
  status                ProvisioningStatus  @default(PENDING)
  workspaceCreated      Boolean             @default(false)
  dashboardCreated      Boolean             @default(false)
  websiteDeployed       Boolean             @default(false)
  dataInitialized       Boolean             @default(false)
  credentialsSent       Boolean             @default(false)
  errorLog              Json?
  startedAt             DateTime?
  completedAt           DateTime?
  createdAt             DateTime            @default(now())
  updatedAt             DateTime            @updatedAt
}

model DeploymentMetadata {
  id                String   @id @default(uuid())
  storeId           String   @unique
  store             Store    @relation(fields: [storeId], references: [id])
  dashboardUrl      String?
  websiteUrl        String?
  databaseName      String?
  tenantNamespace   String?
  deploymentConfig  Json?
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
}

enum ProvisioningStatus {
  PENDING
  IN_PROGRESS
  COMPLETED
  FAILED
  ROLLBACK
}
```

#### Store Model Updates:
```prisma
model Store {
  // ... existing fields
  themeId              String?
  theme                Theme?                @relation(fields: [themeId], references: [id])
  planId               String?
  plan                 Plan?                 @relation(fields: [planId], references: [id])
  provisioningStatus   ProvisioningStatus    @default(PENDING)
  provisioning         MerchantProvisioning?
  deployment           DeploymentMetadata?
  // ... rest of fields
}
```

---

### Phase 2: Backend Provisioning Engine 🔧
**Goal**: Create automated provisioning system

#### 2.1 Provisioning Service (`src/services/provisioningService.js`)

**Core Functions:**
```javascript
// Main orchestrator
async function provisionMerchant(storeId, config) {
  // 1. Create provisioning record
  // 2. Execute provisioning steps in sequence
  // 3. Handle errors and rollback if needed
  // 4. Update status throughout
}

// Individual provisioning steps
async function createWorkspace(storeId, merchantId)
async function createDashboard(storeId, merchantId)
async function deployWebsite(storeId, themeId, domain)
async function initializeDefaultData(storeId)
async function sendCredentials(storeId, userId)
```

#### 2.2 Theme Service (`src/services/themeService.js`)
- Theme template management
- Theme deployment
- Theme customization

#### 2.3 Deployment Service (`src/services/deploymentService.js`)
- Domain/subdomain configuration
- SSL certificate setup (future)
- DNS management (future)

---

### Phase 3: Admin Panel Integration 🎨
**Goal**: Add merchant activation workflow to admin panel

#### 3.1 New Admin Pages/Components:
1. **Merchant Activation Modal** (`orbit_admin/src/components/admin/MerchantActivationModal.tsx`)
   - Theme selector
   - Plan selector
   - Domain/subdomain input
   - Integration toggles
   - Activate button

2. **Provisioning Status Dashboard** (`orbit_admin/src/components/admin/ProvisioningStatus.tsx`)
   - Real-time provisioning progress
   - Error display
   - Retry mechanism

3. **Theme Management** (`orbit_admin/src/app/admin/themes/page.tsx`)
   - Upload themes
   - Configure themes
   - Activate/deactivate themes

#### 3.2 API Integration:
```typescript
// Admin API calls
POST /api/admin/merchants/:id/activate
GET  /api/admin/merchants/:id/provisioning-status
POST /api/admin/merchants/:id/retry-provisioning
POST /api/admin/themes
GET  /api/admin/themes
PUT  /api/admin/themes/:id
```

---

### Phase 4: Real-Time Sync System 🔄
**Goal**: Implement WebSocket-based real-time data synchronization

#### 4.1 WebSocket Server (`src/services/websocketService.js`)
```javascript
// Event types
- ORDER_CREATED
- ORDER_UPDATED
- PAYMENT_RECEIVED
- PRODUCT_UPDATED
- SUPPORT_TICKET_CREATED
- PROVISIONING_UPDATE
```

#### 4.2 Client Integration:
- Admin Panel: Subscribe to all merchant events
- Merchant Dashboard: Subscribe to own events only
- Website: Subscribe to product/order updates

---

### Phase 5: Merchant Dashboard Isolation 🔒
**Goal**: Ensure proper multi-tenancy in Orbit360 dashboard

#### 5.1 Tenant Context Provider (`Orbit-360/src/contexts/TenantContext.tsx`)
```typescript
interface TenantContext {
  merchantId: string;
  storeId: string;
  storeName: string;
  theme: Theme;
  plan: Plan;
}
```

#### 5.2 API Middleware:
- Automatic tenant scoping on all API calls
- Prevent cross-tenant data access
- Enforce row-level security

---

### Phase 6: Website Template System 🌐
**Goal**: Dynamic website deployment based on selected theme

#### 6.1 Theme Structure:
```
themes/
├── upfront-theme-1/
│   ├── pages/
│   ├── components/
│   ├── styles/
│   ├── config.json
│   └── preview.png
├── upfront-theme-2/
└── upfront-theme-3/
```

#### 6.2 Dynamic Routing:
```javascript
// Website routing based on domain/subdomain
if (subdomain) {
  // Load merchant store by subdomain
  // Apply merchant's theme
  // Render with merchant data
}
```

---

### Phase 7: Onboarding Wizard 🚀
**Goal**: Guide merchants through first-time setup

#### 7.1 Onboarding Steps:
1. **Business Info** - Name, description, category
2. **Branding** - Logo, colors, fonts
3. **Payment Setup** - Payment gateway configuration
4. **Marketing** - Meta integration, analytics
5. **Products** - Initial product upload
6. **Website Customization** - Theme settings
7. **Go Live** - Final review and activation

#### 7.2 Implementation:
- Multi-step form in Orbit360 dashboard
- Progress tracking in database
- Skip/complete individual steps
- Auto-save functionality

---

### Phase 8: Credential Management & Email 📧
**Goal**: Automated credential delivery

#### 8.1 Email Templates:
1. **Welcome Email** - Credentials + getting started guide
2. **Dashboard Access** - Login link + instructions
3. **Website Live** - Website URL + next steps

#### 8.2 SMS Integration (Optional):
- Twilio/similar service
- Send login credentials via SMS

---

## 🔐 Security Considerations

### Multi-Tenancy Security:
1. **Database Level**: Row-level security with `storeId` scoping
2. **API Level**: Middleware to enforce tenant isolation
3. **Authentication**: Separate auth tokens per merchant
4. **Authorization**: Role-based access control (RBAC)

### Data Isolation:
```javascript
// Every query must include tenant scope
prisma.product.findMany({
  where: {
    storeId: req.tenant.storeId, // Automatic injection
    // ... other filters
  }
})
```

---

## 📊 Monitoring & Logging

### Provisioning Metrics:
- Average provisioning time
- Success/failure rate
- Error types and frequency
- Resource usage per merchant

### Activity Logging:
- All provisioning steps logged
- Admin actions tracked
- Merchant activities recorded
- System events captured

---

## 🚀 Deployment Strategy

### Development:
1. Local development with Docker
2. Separate databases for testing
3. Mock email/SMS services

### Staging:
1. Full provisioning test
2. Load testing (100+ merchants)
3. Integration testing

### Production:
1. Blue-green deployment
2. Gradual rollout
3. Monitoring and alerting
4. Rollback plan

---

## 📅 Implementation Timeline

### Week 1: Foundation
- [ ] Database schema updates
- [ ] Migration scripts
- [ ] Basic provisioning service

### Week 2: Core Provisioning
- [ ] Complete provisioning engine
- [ ] Theme service
- [ ] Deployment service
- [ ] Error handling & rollback

### Week 3: Admin Integration
- [ ] Merchant activation UI
- [ ] Theme management
- [ ] Provisioning status dashboard

### Week 4: Real-Time Sync
- [ ] WebSocket server
- [ ] Client integration
- [ ] Event broadcasting

### Week 5: Dashboard & Website
- [ ] Tenant isolation
- [ ] Dynamic website routing
- [ ] Theme deployment

### Week 6: Onboarding & Polish
- [ ] Onboarding wizard
- [ ] Email templates
- [ ] Testing & bug fixes

### Week 7: Testing & Optimization
- [ ] Load testing
- [ ] Security audit
- [ ] Performance optimization

### Week 8: Deployment
- [ ] Staging deployment
- [ ] Production deployment
- [ ] Monitoring setup

---

## 🎯 Success Criteria

### Technical:
- ✅ Provisioning completes in < 30 seconds
- ✅ 99.9% provisioning success rate
- ✅ Zero cross-tenant data leaks
- ✅ Real-time sync latency < 1 second
- ✅ Support 10,000+ merchants

### Business:
- ✅ Zero manual setup required
- ✅ Merchant can start selling immediately
- ✅ Admin has full oversight
- ✅ Scalable infrastructure

---

## 📝 Next Steps

1. **Review and approve this plan**
2. **Set up development environment**
3. **Begin Phase 1: Database schema updates**
4. **Create detailed task breakdown for each phase**
5. **Assign responsibilities (if team)**
6. **Set up project tracking (GitHub Projects, Jira, etc.)**

---

## 🔗 Related Documentation

- [Current README](./README.md)
- [Integration Summary](./INTEGRATION_SUMMARY.md)
- [Deployment Checklist](./DEPLOYMENT_CHECKLIST.md)
- [Quick Start Guide](./QUICK_START.md)

---

**Document Version**: 1.0  
**Last Updated**: 2026-02-05  
**Author**: Antigravity AI  
**Status**: Ready for Implementation
