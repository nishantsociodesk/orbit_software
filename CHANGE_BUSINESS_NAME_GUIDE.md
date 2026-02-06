# 🏪 Change Your Business Name - Complete Guide

## 🎯 How to Change "new business" to Your Brand Name

Your store name appears EVERYWHERE on your website:
- ✅ Header/Logo area
- ✅ Footer copyright
- ✅ Browser tab title
- ✅ Meta descriptions

---

## 📝 Step-by-Step Instructions

### **Step 1: Login to Orbit-360**
```
URL: http://localhost:3003
Email: testing@gmail.com
Password: orbit123
```

---

### **Step 2: Go to Store Settings**
1. Look at the left sidebar
2. Click **"Store Settings"**

---

### **Step 3: Click "Store Info" Tab**
1. You'll see several tabs at the top
2. Click the **first tab: "Store Info"**

You'll see:
```
┌─────────────────────────────────┐
│ Store Information               │
├─────────────────────────────────┤
│ Store Name                      │
│ [new business            ]      │
│                                 │
│ Subdomain                       │
│ [new-business]  .orbit360.com   │
│                                 │
│ Store Category                  │
│ [Toys                    ]      │
│                                 │
│ [Save Store Information]        │
└─────────────────────────────────┘
```

---

### **Step 4: Change Your Store Name**

**Current:** `new business`

**Change To:** Your actual brand name!

**Examples:**
- `Kids Paradise` (for toy store)
- `Fashion Hub` (for clothing)
- `Tech World` (for electronics)
- `Toy Kingdom`
- `Little Wonders Shop`

Type your new name in the **Store Name** field.

---

### **Step 5: Update Category (Optional)**

Update the category to match your business:
- `Toys`
- `Fashion`
- `Electronics`
- `Home & Garden`
- `Sports & Outdoors`

---

### **Step 6: Click "Save Store Information"**

Click the blue button at the bottom.

You'll see: ✅ **"Store information saved! Refresh your storefront to see changes."**

---

### **Step 7: See Your Changes on Storefront**

**A. Open Your Storefront:**
```
http://localhost:3004
```

**B. Press F5 to Refresh**

**C. Check These Areas:**

**1. Header (Top of Page):**
```
Before: 🧸 new business.
After:  🧸 Kids Paradise.
```

**2. Footer (Bottom of Page):**
```
Before: © 2024 new business. All rights reserved.
After:  © 2024 Kids Paradise. All rights reserved.
```

**3. Browser Tab:**
```
Before: new business - Online Store
After:  Kids Paradise - Online Store
```

**4. About Section (Footer):**
```
Before: Welcome to new business...
After:  Welcome to Kids Paradise...
```

---

## 🎨 Complete Example

### **For a Toy Store:**

**Store Name:** `Toy Kingdom`

**Category:** `Toys & Games`

**Result on Storefront:**
```
┌───────────────────────────────────────┐
│  🧸 Toy Kingdom.     [Search] 🛒❤️👤  │ ← Header
├───────────────────────────────────────┤
│                                       │
│  Welcome to Toy Kingdom               │ ← Hero
│  The best toys for amazing kids       │
│                                       │
│  [Our Products]                       │
│                                       │
│  🚚 Free Shipping                     │ ← Features
│  ✅ Safe & Tested                     │
│  🔄 Easy Returns                      │
│                                       │
├───────────────────────────────────────┤
│  About Toy Kingdom                    │ ← Footer
│  We bring joy to children...          │
│                                       │
│  © 2024 Toy Kingdom.                  │
│  All rights reserved.                 │
└───────────────────────────────────────┘
```

---

### **For a Fashion Store:**

**Store Name:** `Style Studio`

**Category:** `Fashion & Apparel`

**Result:**
- Header: `Style Studio.`
- Hero: `Welcome to Style Studio`
- Footer: `© 2024 Style Studio. All rights reserved.`

---

## 🔄 Real-Time Sync Flow

```
┌──────────────────────────────────────┐
│ 1. Merchant Opens Orbit-360         │
│    (http://localhost:3003)           │
└────────────┬─────────────────────────┘
             │
             ↓
┌──────────────────────────────────────┐
│ 2. Goes to Store Settings            │
│    → Store Info Tab                  │
└────────────┬─────────────────────────┘
             │
             ↓
┌──────────────────────────────────────┐
│ 3. Changes Name:                     │
│    "new business" → "Toy Kingdom"    │
└────────────┬─────────────────────────┘
             │
             ↓
┌──────────────────────────────────────┐
│ 4. Clicks "Save Store Information"   │
└────────────┬─────────────────────────┘
             │
             ↓
┌──────────────────────────────────────┐
│ 5. Data Saved to PostgreSQL          │
│    Table: Store                      │
│    Field: name = "Toy Kingdom"       │
└────────────┬─────────────────────────┘
             │
             ↓
┌──────────────────────────────────────┐
│ 6. Customer Visits Storefront        │
│    (http://localhost:3004)           │
└────────────┬─────────────────────────┘
             │
             ↓
┌──────────────────────────────────────┐
│ 7. Storefront Fetches Store Data    │
│    GET /api/public/stores/...        │
│    Returns: { name: "Toy Kingdom" }  │
└────────────┬─────────────────────────┘
             │
             ↓
┌──────────────────────────────────────┐
│ ✅ Header Shows: "Toy Kingdom"       │
│ ✅ Footer Shows: "© Toy Kingdom"     │
│ ✅ Tab Shows: "Toy Kingdom - Store"  │
└──────────────────────────────────────┘
```

---

## 💡 Pro Tips

### **Tip 1: Choose a Memorable Name**
- Keep it short (2-3 words)
- Easy to spell
- Relevant to your products
- Unique and catchy

### **Tip 2: Test Different Names**
You can change your store name anytime! Try different options until you find the perfect one.

### **Tip 3: Update Everything Together**
When changing your store name, also update:
- ✅ Store Category
- ✅ Logo (Store Settings → Branding)
- ✅ Brand Colors (Store Settings → Branding)
- ✅ Hero Title (Website Content → Hero)
- ✅ About Content (Website Content → About)

### **Tip 4: Use Title Case**
Write your store name in Title Case for a professional look:
- ✅ `Toy Kingdom`
- ✅ `Kids Paradise`
- ❌ `toy kingdom`
- ❌ `TOY KINGDOM`

---

## ✅ Where Your Name Appears

| Location | Example |
|----------|---------|
| Header/Logo | `🧸 Toy Kingdom.` |
| Footer Copyright | `© 2024 Toy Kingdom. All rights reserved.` |
| Browser Tab | `Toy Kingdom - Online Store` |
| About Section | `Welcome to Toy Kingdom...` |
| Hero Section | Customizable via Website Content |
| Meta Title | `Toy Kingdom - Online Store` |
| Contact Section | `Contact Toy Kingdom` |

---

## 🚀 Quick Start

**1. Restart Orbit-360** (to see new UI)
```powershell
# Terminal 3
Ctrl+C
cd D:\orbit\Orbit-360
npm run dev
```

**2. Open Orbit-360**
```
http://localhost:3003
```

**3. Go To:**
```
Store Settings → Store Info Tab
```

**4. Change Name:**
```
Old: new business
New: [Your Brand Name]
```

**5. Click Save**

**6. Refresh Storefront:**
```
http://localhost:3004
Press F5
```

**7. ✅ See Your Brand Name Everywhere!**

---

## 🎯 Testing Checklist

After changing your store name, verify it appears in:

- [ ] Header logo area
- [ ] Footer copyright text
- [ ] Browser tab title
- [ ] About section content
- [ ] Hero section (if using store name in hero)
- [ ] Meta description
- [ ] Contact section

---

## 🔧 Troubleshooting

### **Problem:** Changes don't show on storefront

**Solution:**
1. Make sure you clicked "Save Store Information"
2. Wait 2-3 seconds
3. Refresh storefront (F5)
4. Clear browser cache (Ctrl+Shift+Delete)

---

### **Problem:** Store Info tab not visible

**Solution:**
1. Restart Orbit-360:
   ```powershell
   Ctrl+C
   npm run dev
   ```
2. Refresh browser (F5)

---

### **Problem:** Save button not working

**Solution:**
1. Check console for errors (F12)
2. Make sure backend is running (port 5000)
3. Check your auth token is valid (re-login)

---

## ✅ Summary

**What You Can Change:**
- ✅ Store Name (e.g., "new business" → "Toy Kingdom")
- ✅ Store Category (e.g., "Toys", "Fashion")
- ❌ Subdomain (Contact admin to change)

**Where It Updates:**
- ✅ Header
- ✅ Footer
- ✅ Browser tab
- ✅ About section
- ✅ Meta tags

**How to Do It:**
1. Login to Orbit-360
2. Go to Store Settings
3. Click Store Info tab
4. Change store name
5. Save
6. Refresh storefront
7. See changes!

---

**🎉 Your brand name is now live on your storefront!**
