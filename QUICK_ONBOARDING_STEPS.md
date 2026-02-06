# ⚡ Quick Onboarding Steps - Start Here!

## 🎯 Your Goal
Get your **3 brands** onboarded with Upfront templates and give them access to Orbit-360 dashboard + websites.

---

## ✅ Step-by-Step (5 Minutes)

### 1️⃣ Start Services (if not running)
```bash
# Terminal 1
cd D:\orbit\backend && npm run dev

# Terminal 2  
cd D:\orbit\orbit_admin && npm run dev

# Terminal 3
cd D:\orbit\Orbit-360 && npm run dev
```

### 2️⃣ Access Admin Dashboard
Open: **http://localhost:3002**

### 3️⃣ Click "Provisioning" in Sidebar
Look for 🚀 **Provisioning** (newly added!)

### 4️⃣ For Each of Your 3 Brands:

**Click "Provision Merchant"** button on the brand card

**Select Template Based on Category:**
- Electronics → **Tech Store Pro**
- Fashion → **Modern Fashion Store** or **Boutique Fashion**  
- Beauty → **Beauty Luxe**
- Toys → **Kids Wonderland**
- Jewelry → **Jewel Showcase**
- Food → **Restaurant Deluxe**

**Click "Provision Merchant"** → ✅ Done!

### 5️⃣ Check "Themes" Page
Click **Themes** (🎨) in sidebar to see all **9 Upfront templates** organized by category.

---

## 🎉 What Each Merchant Gets

After provisioning, each merchant receives:

**1. Orbit-360 Dashboard Access**
- URL: `http://localhost:3000`
- Login with their registration email
- Can customize branding, content, SEO, social links

**2. Storefront URL**
- Format: `https://subdomain.orbit360.com`
- Example: `https://tech-haven.orbit360.com`
- *(Will work after template conversion - see below)*

**3. Default Website Setup**
- Brand name, tagline, colors
- Hero section content
- Meta tags for SEO
- Social media links (empty, ready to fill)

---

## 📋 What You'll See After Provisioning

**Admin Dashboard Updates:**
```
Onboarding Funnel:
├── Not Started: 0 brands (0%)
├── In Progress: 3 brands (100%)  ← All provisioned!
├── Completed: 0 brands (0%)
└── Blocked: 0 brands (0%)
```

**Brands Page:**
- All 3 brands show status: ✅ **PROVISIONED**
- All have themes assigned
- All are **Active**

**Provisioning Page:**
- Shows "No pending merchants" (all done!)

---

## 🚀 Next Step: Make Storefronts Live

The websites won't load yet because templates need to be converted from static to API-driven.

**Quick Option:** Convert one template first (`orbit_front_all`)

See: **`TEMPLATE_CONVERSION_GUIDE.md`** for details

**OR wait for future implementation**

---

## 🆘 Need Help?

**Can't see Provisioning in sidebar?**  
→ Refresh the page, it was just added!

**No pending merchants?**  
→ Check if brands are already provisioned in "Brands" page

**Themes page empty?**  
→ Run: `cd D:\orbit\backend && node seed-themes.js`

**More details:**  
→ See `ADMIN_ONBOARDING_GUIDE.md`

---

## 📚 Files Created/Updated

✅ **Admin Sidebar** - Added "Provisioning" link  
✅ **Themes Page** - Now fetches real templates from API  
✅ **Category Filters** - Browse templates by category  
✅ **Complete Guide** - `ADMIN_ONBOARDING_GUIDE.md`

---

**⏱️ Time to Complete:** 5 minutes  
**🎯 Result:** 3 fully provisioned merchants ready to customize their stores!
