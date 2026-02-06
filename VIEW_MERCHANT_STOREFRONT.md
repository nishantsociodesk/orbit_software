# 🏪 How to View Merchant's Upfront Storefront

## 📍 Merchant: "new business"

**Store Details:**
- **Name:** new business
- **Subdomain:** new-business
- **Template:** Kids Wonderland (TOYSTORE category)
- **Theme ID:** Check admin dashboard

---

## 🎯 3 Ways to View the Storefront

### Method 1: Preview Button in Dashboard ⭐ (Recommended)

**Step 1:** Login to Orbit-360
```
http://localhost:3003
Email: testing@gmail.com
Password: orbit123
```

**Step 2:** Look at the top-right header

**Step 3:** Click **"Preview Store"** button (next to Evoc Labs link)
- Opens storefront in new tab
- Shows live merchant website
- **URL:** http://localhost:3001

---

### Method 2: Direct URL Access

**After starting the template** (see Method 3 below):

**Storefront URL:**
```
http://localhost:3001
```

**With Subdomain (if configured):**
```
http://new-business.localhost:3001
```

---

### Method 3: Run the Template Locally

The Upfront template needs to be running on a separate port.

#### **Step 1: Find the Toy Template**

Based on "Kids Wonderland" (TOYSTORE), use one of:
- `templates/orbit_front_others/toy upfront 2/`
- `templates/orbit_front_others/toy upfront 3/`
- `templates/orbit_front_others/toys upfront/`

**Recommended:** `toy upfront 2` (most complete)

#### **Step 2: Install Dependencies**

```powershell
cd "D:\orbit\templates\orbit_front_others\toy upfront 2"
npm install
```

#### **Step 3: Configure API Connection**

Create `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_STORE_SUBDOMAIN=new-business
```

#### **Step 4: Start Template**

```powershell
npm run dev
```

**Expected Output:**
```
   ▲ Next.js 14.x.x
   - Local:        http://localhost:3000
   
 ✓ Ready in 2.5s
```

**Note:** If port 3000 is taken (by Orbit-360), it will use 3001 or 3002

#### **Step 5: Open in Browser**

```
http://localhost:3001
```

You should see the Kids Wonderland toy store!

---

## 🎨 What the Merchant Sees

### Homepage:
- **Hero Section:** Welcome banner with toy theme
- **Products:** Toy products displayed in grid
- **Categories:** Browse by toy types
- **Navigation:** Header with cart, search, login

### Features:
- ✅ Product listings
- ✅ Add to cart
- ✅ Product details
- ✅ Checkout flow
- ✅ Responsive design
- ✅ Branded with merchant's colors (from Website customization)

---

## 🔄 How Customization Works

### From Orbit-360 Dashboard:

**Step 1:** Go to **Website** tab

**Step 2:** Customize:
- **Branding:** Logo, colors, fonts
- **Content:** Hero text, about section
- **SEO:** Meta tags, keywords
- **Social:** Facebook, Instagram, Twitter

**Step 3:** Click **"Save Branding"** (or relevant section)

**Step 4:** Refresh the storefront
- Changes appear immediately
- Template fetches data from `/api/website`
- No code changes needed!

---

## 📊 Current Setup Status

### ✅ Working:
1. **Backend API** - Port 5000
   - `/api/public/stores/new-business` - Store data
   - `/api/website` - Customization data
   
2. **Admin Dashboard** - Port 3002
   - Provisioning complete
   - Theme assigned

3. **Merchant Dashboard** - Port 3003
   - Orbit-360 running
   - Website customization working

### ⚠️ Needs Setup:
4. **Storefront Template** - Port 3001
   - Template exists but not running
   - Need to start it manually
   - Will show merchant's public store

---

## 🚀 Quick Start Guide

### Terminal 4: Start Storefront Template

**Open a NEW terminal** (Terminal 4):

```powershell
# Navigate to template
cd "D:\orbit\templates\orbit_front_others\toy upfront 2"

# Install dependencies (first time only)
npm install

# Start template
npm run dev
```

**Wait for:**
```
✓ Ready in 2.5s
```

**Then open:**
```
http://localhost:3001
```

**You'll see the Kids Wonderland toy store!** 🎉

---

## 🎯 All Running Services

After starting storefront, you should have:

### Terminal 1: Backend (Port 5000)
```powershell
cd D:\orbit\backend
npm run dev
```
✅ API for all services

### Terminal 2: Admin Dashboard (Port 3002)
```powershell
cd D:\orbit\orbit_admin
npm run dev
```
✅ Admin provisioning & management

### Terminal 3: Merchant Dashboard (Port 3003)
```powershell
cd D:\orbit\Orbit-360
npm run dev
```
✅ Merchant customization & analytics

### Terminal 4: Storefront Template (Port 3001)
```powershell
cd "D:\orbit\templates\orbit_front_others\toy upfront 2"
npm run dev
```
✅ Public-facing store (Kids Wonderland)

---

## 🔗 Preview Button

I've added a **"Preview Store"** button to the Orbit-360 header!

**Location:** Top-right, next to "Evoc Labs" link

**What it does:**
- Opens storefront in new tab
- Shows live merchant website
- Direct link to http://localhost:3001

**Before using:**
- Make sure storefront template is running (Terminal 4)
- Otherwise you'll see "connection refused"

---

## 📱 Testing Flow

### Complete Test:

**1. Start all services** (4 terminals)

**2. Login to Orbit-360**
```
http://localhost:3003
Email: testing@gmail.com
Password: orbit123
```

**3. Customize website**
- Go to "Website" tab
- Change primary color to green
- Add hero title: "Welcome to Kids Paradise!"
- Click "Save Branding"

**4. Click "Preview Store"** (top-right)
- Opens storefront
- Should see green color theme
- Should see custom hero title

**5. Test customer flow**
- Browse products
- Add to cart
- Go to checkout
- Complete order

---

## 🎨 Template Customization

### How Template Gets Data:

**API Calls:**
```typescript
// In template's lib/storefront-api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
const SUBDOMAIN = process.env.NEXT_PUBLIC_STORE_SUBDOMAIN;

// Fetch store customization
const response = await fetch(`${API_URL}/api/public/stores/${SUBDOMAIN}`);
const { customization } = response.json();

// Apply colors
document.documentElement.style.setProperty('--primary', customization.brandColors.primary);
```

### Dynamic Features:
- ✅ Colors from Website > Branding
- ✅ Fonts from Website > Typography  
- ✅ Hero text from Website > Content
- ✅ Logo from Website > Branding
- ✅ SEO from Website > SEO tab

---

## 🔧 Troubleshooting

### Problem: "Preview Store" shows connection refused

**Solution:** Start the storefront template
```powershell
cd "D:\orbit\templates\orbit_front_others\toy upfront 2"
npm run dev
```

### Problem: Template not showing customization

**Solution:** Check API connection
1. Open template in browser
2. Press F12 (Dev Tools)
3. Network tab
4. Look for calls to `/api/public/stores/new-business`
5. Should return 200 OK with store data

### Problem: Port 3001 already in use

**Solution:** Use different port
```powershell
# In template .env.local
PORT=3004

# Or specify when running
PORT=3004 npm run dev
```

### Problem: Template shows default data, not merchant data

**Solution:** Check .env.local
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_STORE_SUBDOMAIN=new-business
```

---

## 📊 Architecture

```
┌─────────────────────────────────────┐
│  Customer Browser                   │
│  http://localhost:3001              │
└────────────┬────────────────────────┘
             │
             ↓
┌─────────────────────────────────────┐
│  Storefront Template (Port 3001)    │
│  - Next.js App                      │
│  - Kids Wonderland Theme            │
│  - Fetches data from API            │
└────────────┬────────────────────────┘
             │
             ↓
┌─────────────────────────────────────┐
│  Backend API (Port 5000)            │
│  - /api/public/stores/new-business  │
│  - Returns customization            │
│  - Returns products                 │
└────────────┬────────────────────────┘
             │
             ↓
┌─────────────────────────────────────┐
│  PostgreSQL Database                │
│  - Store data                       │
│  - Website customization            │
│  - Products                         │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  Merchant Browser                   │
│  http://localhost:3003              │
└────────────┬────────────────────────┘
             │
             ↓
┌─────────────────────────────────────┐
│  Orbit-360 (Port 3003)              │
│  - Dashboard                        │
│  - Website customization            │
│  - Updates via /api/website         │
└─────────────────────────────────────┘
```

---

## ✅ Summary

**To View Merchant's Storefront:**

1. **Start template** (Terminal 4):
   ```powershell
   cd "D:\orbit\templates\orbit_front_others\toy upfront 2"
   npm run dev
   ```

2. **Click "Preview Store"** in Orbit-360 header

3. **Or visit directly:**
   ```
   http://localhost:3001
   ```

4. **See Kids Wonderland toy store!** 🎉

---

**Next Steps:**
1. Start the storefront template
2. Click "Preview Store" button
3. Customize from Orbit-360
4. See changes live on storefront!
