# 🔐 Access Merchant Dashboard - "new business"

## ✅ Merchant Successfully Provisioned!

**Store:** new business  
**Subdomain:** new-business.orbit360.com  
**Store ID:** 1ef40b17-f65f-4e86-9205-c872c637879c  
**Template:** Kids Wonderland (TOYSTORE)

---

## 🚀 How to Access the Dashboard

### Step 1: Make Sure Orbit-360 is Running

Check if Orbit-360 dashboard is running on port 3000:

```powershell
# If not running, start it:
cd D:\orbit\Orbit-360
npm run dev
```

**Should see:** Server running on `http://localhost:3000`

### Step 2: Open Browser

Go to: **http://localhost:3000**

### Step 3: Login as Merchant

**Email:** `testing@gmail.com`  
**Password:** `temp-password` (or the password set during registration)

**Note:** If authentication isn't set up yet, you may need to:
1. Create a login route in Orbit-360
2. Or temporarily bypass auth for testing

---

## 🎨 What the Merchant Can Do

Once logged in, the merchant will see their **Orbit-360 Dashboard** with:

### Navigation Sidebar:
```
🏠 Dashboard       - Overview & analytics
📊 Analytics       - Detailed metrics
🎨 Website        ← Click here to customize!
📦 Products       - (Future) Manage products
📋 Orders         - (Future) View orders
⚙️  Settings       - Store configuration
```

### Website Customization Page:

Click **"Website"** to customize their store:

#### Branding Tab:
- Upload logo
- Set primary color: `#6366f1` (currently)
- Set secondary color: `#ec4899` (currently)
- Choose font family: `Inter` (currently)

#### Content Tab:
- Hero title: `Discover new business`
- Hero subtitle: `Quality products for you`
- About us: `new business is committed to bringing you the best products.`
- CTA button text: `Shop Now`

#### SEO Tab:
- Meta title: `new business`
- Meta description: `Shop at new business for quality products`
- Keywords: `Fashion & Apparel store`

#### Social Tab:
- Facebook URL
- Instagram URL
- Twitter URL
- LinkedIn URL

---

## 🌐 Storefront URL (Future)

Once templates are converted and deployed, the merchant's public storefront will be at:

**Production:** `https://new-business.orbit360.com`

**Features:**
- Shows merchant's branding (colors, logo, fonts)
- Displays products from their catalog
- Accepts orders from customers
- All customization from dashboard applies automatically

---

## 🔧 Testing the API

You can test that the merchant data is properly set up:

### Check Store Data:
```bash
curl http://localhost:5000/api/storefront/resolve?domain=new-business.orbit360.com
```

**Expected Response:**
```json
{
  "success": true,
  "store": {
    "id": "1ef40b17-f65f-4e86-9205-c872c637879c",
    "name": "new business",
    "subdomain": "new-business",
    "theme": {
      "name": "Kids Wonderland",
      "slug": "kids-wonderland",
      "primaryColor": "#6366f1",
      "secondaryColor": "#ec4899"
    },
    "customization": {
      "brandColors": {
        "primary": "#6366f1",
        "secondary": "#ec4899",
        "accent": "#8b5cf6"
      },
      "heroSection": {
        "title": "Discover new business",
        "subtitle": "Quality products for you"
      },
      "socialLinks": {
        "facebook": "",
        "instagram": "",
        "twitter": "",
        "linkedin": ""
      }
    }
  }
}
```

---

## 🎯 Next Steps for Merchant

### 1. Customize Branding (5 minutes)
- Go to Website → Branding tab
- Upload logo
- Change colors to match their brand
- Select preferred fonts

### 2. Edit Content (5 minutes)
- Go to Website → Content tab
- Write compelling hero title
- Add detailed about us section
- Set up contact information

### 3. Add Products (Future)
- Go to Products tab
- Click "Add Product"
- Upload images, set prices
- Manage inventory

### 4. Set Up Domain (Optional)
- Go to Settings
- Add custom domain
- Point DNS to Orbit servers

---

## 🔐 Authentication Setup (If Needed)

If the merchant can't login, you may need to set up authentication:

### Quick Fix for Testing:
In `Orbit-360/app/dashboard/page.tsx`, temporarily bypass auth:

```typescript
// Skip auth check for testing
const merchantId = "1ef40b17-f65f-4e86-9205-c872c637879c";
const storeData = await getStoreById(merchantId);
```

### Proper Solution:
Implement JWT authentication:
1. Merchant logs in via `/api/app-auth/login`
2. Receives JWT token
3. Token stored in localStorage
4. All API calls include token
5. Dashboard shows merchant's specific data

---

## ✅ Success Indicators

Merchant dashboard is working if you can:
- [x] Access http://localhost:3000
- [x] See merchant-specific store name in header
- [x] Navigate to Website tab
- [x] See customization form with 5 tabs
- [x] Edit and save branding/content
- [x] Changes reflect in database

---

## 📚 Related URLs

**Admin Dashboard:** http://localhost:3002/dashboard/provisioning  
**Merchant Dashboard:** http://localhost:3000  
**Backend API:** http://localhost:5000  
**Onboarding App:** http://localhost:3001  

**Store API:** http://localhost:5000/api/storefront/resolve?domain=new-business.orbit360.com  
**Admin API:** http://localhost:5000/api/admin/provisioning/pending  

---

**Status:** ✅ Merchant Provisioned & Ready!  
**Next:** Login to http://localhost:3000 and customize the store!
