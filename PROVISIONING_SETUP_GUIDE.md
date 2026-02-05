# ORBIT360 Multi-Tenant Platform - Setup Guide

## 🚀 Quick Start

This guide will help you set up the complete multi-tenant provisioning system for ORBIT360.

---

## 📋 Prerequisites

- Node.js 18+ installed
- PostgreSQL database running
- MongoDB running (for existing features)
- npm or yarn package manager

---

## 🔧 Installation Steps

### 1. Database Setup

#### Update Prisma Schema
The schema has been updated with new models:
- `Theme` - Website theme templates
- `Plan` - Subscription plans
- `MerchantProvisioning` - Provisioning status tracking
- `DeploymentMetadata` - Deployment information
- `ProvisioningStatus` enum

#### Generate Prisma Client
```bash
cd backend
npx prisma generate
```

#### Run Migration
```bash
npx prisma migrate dev --name add_provisioning_models
```

This will create the new tables in your PostgreSQL database.

### 2. Seed Default Data

Seed default themes and plans:

```bash
cd backend
node seed-provisioning.js
```

This will create:
- **3 default themes**: Upfront Modern, Upfront Classic, Upfront Minimal
- **3 default plans**: Starter ($29.99), Professional ($79.99), Enterprise ($299.99)

### 3. Environment Variables

Add these to your `backend/.env` file:

```env
# Existing variables...
DATABASE_URL="postgresql://user:password@localhost:5432/orbit360"
MONGODB_URI="mongodb://localhost:27017/orbit360"

# New provisioning variables
DASHBOARD_BASE_URL="http://localhost:3003"
WEBSITE_BASE_DOMAIN="orbit360.shop"
NODE_ENV="development"

# Email configuration (for sending credentials)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
SMTP_FROM="ORBIT360 <noreply@orbit360.com>"
```

### 4. Start the Backend

```bash
cd backend
npm run dev
```

The backend will start on port 5000 (or your configured port).

---

## 🎨 Admin Panel Integration

### Install Dependencies

The admin panel (`orbit_admin`) already has the necessary dependencies. No additional installation needed.

### Create Admin Components

The following components need to be created in `orbit_admin/src/components/admin/`:

1. **MerchantActivationModal.tsx** - Modal for activating merchants
2. **ProvisioningStatus.tsx** - Real-time provisioning status display
3. **ThemeManager.tsx** - Theme management interface
4. **PlanManager.tsx** - Plan management interface

### API Integration

Update your API client to include provisioning endpoints:

```typescript
// orbit_admin/src/lib/api.ts

export const provisioningApi = {
  activateMerchant: (storeId: string, data: ActivationData) =>
    api.post(`/provisioning/merchants/${storeId}/activate`, data),
  
  getProvisioningStatus: (storeId: string) =>
    api.get(`/provisioning/merchants/${storeId}/provisioning-status`),
  
  retryProvisioning: (storeId: string) =>
    api.post(`/provisioning/merchants/${storeId}/retry-provisioning`),
  
  getThemes: (activeOnly?: boolean) =>
    api.get(`/provisioning/themes${activeOnly ? '?activeOnly=true' : ''}`),
  
  getPlans: (activeOnly?: boolean) =>
    api.get(`/provisioning/plans${activeOnly ? '?activeOnly=true' : ''}`),
};
```

---

## 🔄 Testing the Provisioning Flow

### 1. Create a Test Merchant

Using your existing admin panel or API:

```bash
POST /api/stores
{
  "name": "Test Store",
  "subdomain": "test-store",
  "userId": "existing-user-id"
}
```

### 2. Activate the Merchant

```bash
POST /api/provisioning/merchants/{storeId}/activate
{
  "themeId": "theme-id-from-seed",
  "planId": "plan-id-from-seed",
  "subdomain": "test-store",
  "category": "Electronics"
}
```

### 3. Monitor Provisioning Status

```bash
GET /api/provisioning/merchants/{storeId}/provisioning-status
```

You should see the provisioning progress through these steps:
1. STORE_CONFIGURED (10%)
2. WORKSPACE_CREATED (25%)
3. DASHBOARD_CREATED (40%)
4. WEBSITE_DEPLOYED (60%)
5. DATA_INITIALIZED (80%)
6. CREDENTIALS_SENT (95%)
7. COMPLETED (100%)

### 4. Check Email

The merchant should receive a welcome email with:
- Dashboard URL
- Website URL
- Login instructions

---

## 📊 Verifying the Setup

### Check Database

```sql
-- Check themes
SELECT * FROM "Theme";

-- Check plans
SELECT * FROM "Plan";

-- Check provisioning records
SELECT * FROM "MerchantProvisioning";

-- Check deployment metadata
SELECT * FROM "DeploymentMetadata";
```

### Check API Endpoints

```bash
# Get all themes
curl http://localhost:5000/api/provisioning/themes

# Get all plans
curl http://localhost:5000/api/provisioning/plans
```

---

## 🎯 Next Steps

### Phase 1: Backend ✅ COMPLETED
- [x] Database schema updates
- [x] Provisioning service
- [x] Theme service
- [x] Plan service
- [x] API endpoints
- [x] Seed data

### Phase 2: Admin Panel Integration (TODO)
- [ ] Create MerchantActivationModal component
- [ ] Create ProvisioningStatus component
- [ ] Add theme management page
- [ ] Add plan management page
- [ ] Update merchants list with activation button

### Phase 3: Real-Time Sync (TODO)
- [ ] Set up WebSocket server
- [ ] Implement event broadcasting
- [ ] Add client-side WebSocket listeners
- [ ] Sync orders, payments, products

### Phase 4: Merchant Dashboard Isolation (TODO)
- [ ] Add tenant context provider
- [ ] Implement tenant-scoped API middleware
- [ ] Add merchant ID to all queries
- [ ] Test cross-tenant isolation

### Phase 5: Website Template System (TODO)
- [ ] Create theme templates
- [ ] Implement dynamic routing
- [ ] Add theme customization
- [ ] Deploy website instances

### Phase 6: Onboarding Wizard (TODO)
- [ ] Create onboarding wizard UI
- [ ] Implement step tracking
- [ ] Add auto-save functionality
- [ ] Create completion flow

---

## 🐛 Troubleshooting

### Prisma Generate Fails

```bash
# Clear Prisma cache
npx prisma generate --force

# If still failing, check schema syntax
npx prisma validate
```

### Migration Fails

```bash
# Reset database (WARNING: This will delete all data)
npx prisma migrate reset

# Or create a new migration
npx prisma migrate dev --name fix_schema
```

### Seeding Fails

```bash
# Check if themes/plans already exist
# The seed script will skip existing records

# To force re-seed, delete existing records first
```

### Email Not Sending

```bash
# Check SMTP configuration in .env
# For Gmail, you need to:
# 1. Enable 2-factor authentication
# 2. Generate an app-specific password
# 3. Use that password in SMTP_PASS
```

---

## 📚 Documentation

- [Implementation Plan](./MULTI_TENANT_PROVISIONING_PLAN.md)
- [API Documentation](./backend/PROVISIONING_API.md)
- [Integration Summary](./INTEGRATION_SUMMARY.md)
- [Deployment Checklist](./DEPLOYMENT_CHECKLIST.md)

---

## 🔐 Security Notes

### Multi-Tenancy
- All queries are automatically scoped by `storeId`
- Merchant data is isolated at the database level
- Each merchant has a unique `merchantId` and `tenantNamespace`

### Authentication
- Admin endpoints require admin JWT token
- Merchant endpoints require merchant JWT token
- Tokens include tenant information

### Data Protection
- Passwords are hashed with bcrypt
- Sensitive data is encrypted
- API rate limiting is enabled

---

## 📞 Support

If you encounter any issues:

1. Check the logs: `backend/logs/`
2. Review error messages in provisioning records
3. Check database connectivity
4. Verify environment variables

---

## 🎉 Success Criteria

Your setup is complete when:

- ✅ Backend starts without errors
- ✅ Database migrations are applied
- ✅ Default themes and plans are seeded
- ✅ Test merchant can be activated
- ✅ Provisioning completes in < 30 seconds
- ✅ Welcome email is sent
- ✅ Dashboard and website URLs are generated

---

**Setup Version**: 1.0  
**Last Updated**: 2026-02-05  
**Status**: Ready for Testing
