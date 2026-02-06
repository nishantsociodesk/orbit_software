# 🚀 Admin Onboarding Guide - Get Your 3 Brands Live!

## Overview
This guide will walk you through onboarding the **3 brands** you see in your admin dashboard, assigning them Upfront templates based on their business category, and giving them access to their Orbit-360 dashboard and website.

---

## 📋 Prerequisites

Make sure all services are running:

```bash
# Terminal 1: Backend
cd D:\orbit\backend
npm run dev  # Should be on http://localhost:5000

# Terminal 2: Admin Dashboard  
cd D:\orbit\orbit_admin
npm run dev  # Should be on http://localhost:3002

# Terminal 3: Merchant Dashboard (Orbit-360)
cd D:\orbit\Orbit-360
npm run dev  # Should be on http://localhost:3000
```

---

## 🎯 Step-by-Step Onboarding Process

### Step 1: Access Admin Dashboard

1. Open your browser and go to: **http://localhost:3002**
2. Login with admin credentials (if required)
3. You should see the dashboard showing:
   - **Total Brands: 3**
   - **Active Brands: 3**
   - **Onboarding Funnel**: 2 Not Started, 1 In Progress

### Step 2: Navigate to Provisioning Page

1. In the left sidebar, click on **"Provisioning"** (🚀 rocket icon)
2. You should now see the **Merchant Provisioning** page
3. This page will display all pending merchants waiting to be provisioned

### Step 3: View Pending Merchants

On the Provisioning page, you'll see cards for each pending merchant showing:
- 🏪 Business Name
- 👤 Owner Name
- 📧 Email
- 📅 Registration Date
- 🌐 Subdomain (e.g., `awesome-electronics.orbit360.com`)

### Step 4: Check Available Templates

Before provisioning, check what templates are available:

1. Click **"Themes"** in the sidebar (🎨 palette icon)
2. You should see **9 Upfront templates** organized by category:
   - **Fashion & Apparel**: Modern Fashion Store, Boutique Fashion, Shoe Gallery
   - **Electronics**: Tech Store Pro
   - **Beauty & Cosmetics**: Beauty Luxe, Fragrance Elite
   - **Toys & Games**: Kids Wonderland
   - **Food & Beverages**: Restaurant Deluxe
   - **Jewelry & Accessories**: Jewel Showcase

3. Use the category filter buttons to browse templates
4. Click on a theme card to see color preview and details

### Step 5: Provision First Brand

Let's provision your first brand:

1. Go back to **Provisioning** page
2. Find the first merchant in the list
3. Click **"Provision Merchant"** button on their card
4. A dialog will open with two dropdowns:

   **Select Template:**
   - Match the template to their business category
   - Examples:
     - Electronics business → **Tech Store Pro**
     - Fashion business → **Modern Fashion Store** or **Boutique Fashion**
     - Beauty business → **Beauty Luxe**
     - Toys business → **Kids Wonderland**
     - Jewelry business → **Jewel Showcase**

   **Select Plan (Optional):**
   - Choose a subscription plan if you have plans set up
   - Or leave empty to skip plan assignment

5. Review the preview showing:
   - Storefront URL: `https://subdomain.orbit360.com`
   - Dashboard URL: `https://dashboard.orbit360.com/store/{id}`

6. Click **"Provision Merchant"**
7. ✅ Success! You'll see a confirmation message

### Step 6: Repeat for Remaining Brands

Repeat Step 5 for your other 2 brands:

**Example Provisioning:**

```
Brand 1: "Tech Haven" (Electronics)
├── Template: Tech Store Pro
└── Colors: Blue/Purple (tech theme)

Brand 2: "Bella Boutique" (Fashion)
├── Template: Boutique Fashion
└── Colors: Pink/Rose (elegant theme)

Brand 3: "Sparkle & Shine" (Jewelry)
├── Template: Jewel Showcase
└── Colors: Gold/Black (luxury theme)
```

### Step 7: Verify Provisioning

After provisioning all 3 brands:

1. Go to **"Brands"** page in sidebar
2. Check that all 3 brands now show:
   - ✅ Provisioning Status: **PROVISIONED**
   - ✅ Onboarding Status: **IN_PROGRESS**
   - ✅ Active: **true**
   - ✅ Theme assigned

---

## 🎨 What Happens During Provisioning?

When you click "Provision Merchant", the system automatically:

1. **Assigns the Selected Theme**
   - Links the theme to the store
   - Sets up theme colors and fonts

2. **Creates Website Customization**
   - Brand name from merchant registration
   - Default tagline: "Welcome to {Brand Name}"
   - Primary color from theme
   - Secondary color from theme
   - Font family from theme
   - Hero title: "Discover {Brand Name}"
   - Default meta tags for SEO

3. **Activates the Store**
   - Sets `isActive: true`
   - Changes `provisioningStatus` to `PROVISIONED`
   - Updates `onboardingStatus` to `IN_PROGRESS`

4. **Creates Subscription (if plan selected)**
   - Assigns the plan
   - Sets status to `TRIAL`
   - 14-day trial period

5. **Generates Access URLs**
   - Storefront: `https://{subdomain}.orbit360.com`
   - Dashboard: `https://dashboard.orbit360.com/store/{storeId}`

---

## 👥 Merchant Access to Orbit-360 Dashboard

After provisioning, each merchant can access their Orbit-360 dashboard:

### How Merchants Login:

1. **URL**: `http://localhost:3000` (or `https://dashboard.orbit360.com` in production)
2. **Email**: The email they used during registration
3. **Password**: The temporary password (needs to be set up)

### What Merchants Can Do:

Once logged in, merchants see their **Orbit-360 Dashboard** with:

**Dashboard Tab:**
- Overview of their store
- Sales metrics
- Recent orders
- Analytics

**Website Tab** (💎 This is key!):
- **Branding**: Change logo, colors, fonts
- **Content**: Edit hero section, tagline, about us
- **Layout**: (Future) Drag-drop sections
- **SEO**: Meta tags, keywords, OG image
- **Social**: Facebook, Instagram, Twitter, LinkedIn

**Products Tab** (Future):
- Add products
- Manage inventory
- Set pricing
- Upload images

**Orders Tab** (Future):
- View orders
- Process orders
- Shipping management

**Settings Tab**:
- Store settings
- Domain configuration
- Integrations

---

## 🌐 Merchant Storefront URLs

After provisioning, each merchant's storefront will be accessible at:

```
https://{subdomain}.orbit360.com
```

**Examples:**
- Tech Haven: `https://tech-haven.orbit360.com`
- Bella Boutique: `https://bella-boutique.orbit360.com`
- Sparkle & Shine: `https://sparkle-shine.orbit360.com`

**In Development (localhost):**
The storefront URLs won't work yet until you:
1. Convert the templates to be API-driven (see `TEMPLATE_CONVERSION_GUIDE.md`)
2. Deploy templates to a hosting service
3. Set up proper DNS/routing

**For Testing:**
You can test the API endpoints:
```bash
curl http://localhost:5000/api/storefront/resolve?domain=tech-haven.orbit360.com
```

This will return the store data, theme, and customization settings.

---

## 🔄 Complete Workflow Example

Let's walk through onboarding "Tech Haven":

### 1. Check Merchant Info
```
Name: Tech Haven
Email: owner@techhaven.com
Category: Electronics
Subdomain: tech-haven
Status: PENDING
```

### 2. Provision in Admin
- Select template: **Tech Store Pro**
- Select plan: **Starter Plan** (optional)
- Click **Provision Merchant**

### 3. System Creates
```sql
-- Updates Store
UPDATE "Store" 
SET 
  "themeId" = 'tech-store-pro-id',
  "provisioningStatus" = 'PROVISIONED',
  "onboardingStatus" = 'IN_PROGRESS',
  "isActive" = true
WHERE subdomain = 'tech-haven';

-- Creates WebsiteCustomization
INSERT INTO "WebsiteCustomization" (
  "storeId", "brandName", "tagline", 
  "primaryColor", "secondaryColor", "fontFamily"
) VALUES (
  'store-id', 'Tech Haven', 'Welcome to Tech Haven',
  '#6366f1', '#ec4899', 'Inter'
);
```

### 4. Merchant Receives Access
- **Dashboard**: `http://localhost:3000` (login with their email)
- **Storefront**: `http://tech-haven.orbit360.com` (will work after template deployment)

### 5. Merchant Customizes
Merchant logs into Orbit-360 and:
- Changes brand name to "Tech Haven Store"
- Updates tagline to "Your Tech Destination"
- Changes primary color to #3b82f6
- Adds hero title: "Latest Gadgets & Electronics"
- Adds about us text
- Sets up social media links

### 6. Storefront Goes Live
- Template fetches data from API
- Displays merchant's customization
- Shows products (when added)
- Accepts orders

---

## 📊 Monitoring Dashboard

After provisioning all 3 brands, your admin dashboard should show:

```
Total Brands: 3
Active Brands: 3  ✅
Inactive Brands: 0

Onboarding Funnel:
├── Not Started: 0 brands (0%)
├── In Progress: 3 brands (100%)  ← All provisioned!
├── Completed: 0 brands (0%)
└── Blocked: 0 brands (0%)
```

---

## 🛠️ Troubleshooting

### Issue: "No pending merchants" on Provisioning page

**Solution:**
```bash
# Check database
cd D:\orbit\backend
node
```
```javascript
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Check stores with PENDING status
prisma.store.findMany({
  where: { provisioningStatus: 'PENDING' },
  include: { user: true }
}).then(console.log);
```

### Issue: Theme not appearing in dropdown

**Solution:**
```bash
# Re-seed themes
cd D:\orbit\backend
node seed-themes.js
```

### Issue: Merchant can't login to Orbit-360

**Solution:**
You need to set up merchant authentication properly:
1. Check that user was created with role `MERCHANT`
2. Generate a login token or set a password
3. Merchant uses `/api/app-auth/login` endpoint

### Issue: Provisioning fails

**Check:**
1. Backend is running: `http://localhost:5000`
2. Database connection is working
3. Theme ID is valid
4. Check browser console for errors
5. Check backend logs for errors

---

## 🎯 Next Steps After Provisioning

### For Admin:
1. ✅ Monitor merchant onboarding progress
2. ✅ Check "Recent Alerts" for issues
3. ✅ Review brand activity in "Brands" page
4. ✅ Respond to support tickets
5. ✅ Track platform analytics

### For Merchants:
1. 🎨 Customize branding in Orbit-360 Website tab
2. 📦 Add products to store
3. 🚀 Preview storefront (after template deployment)
4. 💳 Set up payment methods
5. 📧 Configure email notifications
6. 📈 Monitor sales and analytics

### For Platform:
1. 🔄 Convert templates to API-driven (see `TEMPLATE_CONVERSION_GUIDE.md`)
2. 🚀 Deploy templates to production
3. 🌐 Set up DNS for custom domains
4. 🔐 Implement proper authentication
5. 📧 Add email notifications
6. 💳 Integrate payment gateways
7. 📊 Set up analytics tracking

---

## 📚 Related Documentation

- **`IMPLEMENTATION_COMPLETE.md`** - Complete system overview
- **`QUICK_START.md`** - How to run all services
- **`SYSTEM_OVERVIEW.md`** - Architecture and data flow
- **`TEMPLATE_CONVERSION_GUIDE.md`** - Convert templates to API-driven
- **`TEMPLATE_ANALYSIS.md`** - Template structure details

---

## ✅ Success Checklist

After completing this guide, you should have:

- [x] All 3 brands visible in admin dashboard
- [x] Provisioning page accessible with "Provisioning" sidebar link
- [x] All 9 Upfront themes visible in "Themes" page
- [x] All 3 brands provisioned with appropriate templates
- [x] Each brand has `provisioningStatus: PROVISIONED`
- [x] Each brand has `onboardingStatus: IN_PROGRESS`
- [x] Each brand has `isActive: true`
- [x] WebsiteCustomization created for each brand
- [x] Subdomain URLs generated for each brand
- [x] Merchants can login to Orbit-360 dashboard
- [x] Merchants can customize their website settings

---

## 🎉 You're Done!

Your 3 brands are now onboarded and have:
- ✅ Assigned Upfront templates
- ✅ Default website customization
- ✅ Access to Orbit-360 dashboard
- ✅ Subdomain URLs for their storefronts

**Next:** Convert the templates to be API-driven so the storefronts actually work! See `TEMPLATE_CONVERSION_GUIDE.md` for details.

---

**Last Updated**: February 6, 2026  
**Status**: Ready to Use
