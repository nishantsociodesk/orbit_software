# ORBIT360 Provisioning - Quick Reference Card

## 🚀 Quick Start Commands

### Initial Setup
```bash
# 1. Generate Prisma Client
cd backend && npx prisma generate

# 2. Run Migration
npx prisma migrate dev --name add_provisioning_models

# 3. Seed Default Data
node seed-provisioning.js

# 4. Start Backend
npm run dev
```

### Start All Services
```bash
# Terminal 1: Backend (Port 5000)
cd backend && npm run dev

# Terminal 2: Admin Panel (Port 3001)
cd orbit_admin && npm run dev

# Terminal 3: Merchant Dashboard (Port 3003)
cd Orbit-360 && npm run dev
```

---

## 📡 API Quick Reference

### Base URL
```
http://localhost:5000/api/provisioning
```

### Authentication
All requests require admin JWT token:
```bash
Authorization: Bearer <admin_token>
```

### Key Endpoints

#### Activate Merchant
```bash
POST /merchants/:id/activate
{
  "themeId": "uuid",
  "planId": "uuid",
  "subdomain": "store-name",
  "category": "Electronics"
}
```

#### Get Status
```bash
GET /merchants/:id/provisioning-status
```

#### Retry Failed
```bash
POST /merchants/:id/retry-provisioning
```

#### Get Themes
```bash
GET /themes?activeOnly=true
```

#### Get Plans
```bash
GET /plans?activeOnly=true
```

---

## 🎨 React Component Usage

### Merchant Activation Modal
```tsx
import { MerchantActivationModal } from "@/components/admin/MerchantActivationModal";

<MerchantActivationModal
  open={isOpen}
  onOpenChange={setIsOpen}
  storeId={store.id}
  storeName={store.name}
  onSuccess={() => {
    // Refresh merchant list
    fetchMerchants();
  }}
/>
```

### Provisioning Status
```tsx
import { ProvisioningStatus } from "@/components/admin/ProvisioningStatus";

<ProvisioningStatus
  storeId={store.id}
  autoRefresh={true}
  refreshInterval={3000}
/>
```

---

## 🗄️ Database Queries

### Check Provisioning Status
```sql
SELECT 
  mp.*,
  s.name as store_name,
  dm.dashboardUrl,
  dm.websiteUrl
FROM "MerchantProvisioning" mp
JOIN "Store" s ON s.id = mp."storeId"
LEFT JOIN "DeploymentMetadata" dm ON dm."storeId" = mp."storeId"
WHERE mp.status = 'IN_PROGRESS';
```

### Get All Active Themes
```sql
SELECT * FROM "Theme" WHERE "isActive" = true;
```

### Get All Active Plans
```sql
SELECT * FROM "Plan" WHERE "isActive" = true ORDER BY price ASC;
```

### Find Failed Provisioning
```sql
SELECT 
  mp.*,
  s.name,
  s.subdomain
FROM "MerchantProvisioning" mp
JOIN "Store" s ON s.id = mp."storeId"
WHERE mp.status = 'FAILED';
```

---

## 🔧 Common Tasks

### Add a New Theme
```javascript
// Via API
POST /api/provisioning/themes
{
  "name": "My Custom Theme",
  "slug": "my-custom-theme",
  "description": "A beautiful custom theme",
  "version": "1.0.0",
  "config": {
    "colors": {
      "primary": "#FF5733",
      "secondary": "#33FF57"
    }
  }
}

// Or via service
const themeService = require('./services/themeService');
await themeService.createTheme({
  name: "My Custom Theme",
  slug: "my-custom-theme",
  description: "A beautiful custom theme",
  version: "1.0.0"
});
```

### Add a New Plan
```javascript
// Via API
POST /api/provisioning/plans
{
  "name": "Premium",
  "slug": "premium",
  "description": "Premium features",
  "price": 149.99,
  "billingCycle": "monthly",
  "features": {
    "products": 5000,
    "orders": "unlimited"
  },
  "productLimit": 5000
}

// Or via service
const planService = require('./services/planService');
await planService.createPlan({
  name: "Premium",
  slug: "premium",
  price: 149.99,
  features: { products: 5000 }
});
```

### Manually Trigger Provisioning
```javascript
const provisioningService = require('./services/provisioningService');

await provisioningService.provisionMerchant(storeId, {
  themeId: 'theme-uuid',
  planId: 'plan-uuid',
  subdomain: 'my-store',
  category: 'Electronics'
});
```

### Check Provisioning Progress
```javascript
const status = await provisioningService.getProvisioningStatus(storeId);
console.log(`Status: ${status.status}`);
console.log(`Progress: ${status.completionPercent}%`);
console.log(`Current Step: ${status.currentStep}`);
```

---

## 🐛 Debugging

### Enable Debug Logging
```javascript
// In provisioningService.js
console.log('[Provisioning]', 'Debug message');
```

### Check Backend Logs
```bash
# If using PM2
pm2 logs backend

# If using npm run dev
# Logs appear in terminal
```

### Test Email Sending
```javascript
const emailService = require('./services/emailService');

await emailService.sendEmail({
  to: 'test@example.com',
  subject: 'Test Email',
  html: '<p>This is a test</p>'
});
```

### Reset Provisioning
```sql
-- Reset a failed provisioning to retry
UPDATE "MerchantProvisioning"
SET status = 'PENDING', "retryCount" = 0
WHERE "storeId" = 'store-uuid';
```

---

## 📊 Monitoring

### Check System Health
```bash
curl http://localhost:5000/health
```

### Get Provisioning Stats
```sql
SELECT 
  status,
  COUNT(*) as count,
  AVG("completionPercent") as avg_progress
FROM "MerchantProvisioning"
GROUP BY status;
```

### Recent Activations
```sql
SELECT 
  s.name,
  mp.status,
  mp."completionPercent",
  mp."createdAt"
FROM "MerchantProvisioning" mp
JOIN "Store" s ON s.id = mp."storeId"
ORDER BY mp."createdAt" DESC
LIMIT 10;
```

---

## 🔑 Environment Variables

```env
# Database
DATABASE_URL="postgresql://user:pass@localhost:5432/orbit360"
MONGODB_URI="mongodb://localhost:27017/orbit360"

# Provisioning
DASHBOARD_BASE_URL="http://localhost:3003"
WEBSITE_BASE_DOMAIN="orbit360.shop"
NODE_ENV="development"

# Email
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
SMTP_FROM="ORBIT360 <noreply@orbit360.com>"
```

---

## ⚡ Performance Tips

### Optimize Provisioning Speed
1. Use connection pooling for database
2. Implement parallel step execution where possible
3. Cache theme and plan data
4. Use background jobs for email sending

### Reduce Database Load
1. Index frequently queried fields
2. Use select queries instead of full models
3. Implement caching for static data
4. Use database transactions for atomic operations

---

## 🎯 Testing Checklist

- [ ] Backend starts without errors
- [ ] Database migrations applied
- [ ] Default themes seeded (3 themes)
- [ ] Default plans seeded (3 plans)
- [ ] Can create test merchant
- [ ] Can activate merchant via API
- [ ] Provisioning completes successfully
- [ ] Welcome email sent
- [ ] Dashboard URL accessible
- [ ] Website URL generated
- [ ] Status updates in real-time
- [ ] Failed provisioning can be retried
- [ ] Admin panel components render
- [ ] Theme selection works
- [ ] Plan selection works

---

## 📞 Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| Prisma errors | `npx prisma generate --force` |
| Migration fails | `npx prisma migrate reset` |
| Email not sending | Check SMTP config in .env |
| Provisioning stuck | Check backend logs, retry |
| Theme not found | Run seed script |
| Plan not found | Run seed script |
| 401 Unauthorized | Check JWT token |
| 500 Server Error | Check backend logs |

---

## 📚 Documentation Links

- [Full Implementation Plan](./MULTI_TENANT_PROVISIONING_PLAN.md)
- [Setup Guide](./PROVISIONING_SETUP_GUIDE.md)
- [API Documentation](./backend/PROVISIONING_API.md)
- [Implementation Summary](./PROVISIONING_IMPLEMENTATION_SUMMARY.md)

---

**Quick Ref Version**: 1.0  
**Last Updated**: 2026-02-05
