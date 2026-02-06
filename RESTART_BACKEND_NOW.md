# ⚡ RESTART BACKEND NOW!

## 🔧 What Was Fixed

The `WebsiteCustomization` model uses **JSON fields**, not individual fields.

**Fixed the provisioning controller to use:**
- `brandColors` (JSON) instead of `brandName`, `primaryColor`, `secondaryColor`
- `typography` (JSON) instead of `fontFamily`
- `heroSection` (JSON) instead of `heroTitle`, `heroSubtitle`
- `aboutSection` (JSON) instead of `aboutUs`
- `contactInfo` (JSON) for contact details
- `socialLinks` (JSON) instead of individual social URLs

---

## 🚀 RESTART BACKEND NOW

### In the terminal where backend is running:

```powershell
# Press Ctrl+C to stop backend

# Then restart:
npm run dev
```

---

## ✅ Then Try Provisioning Again

1. Go to: **http://localhost:3002/dashboard/provisioning**
2. Click **"Provision Merchant"** on "new business"
3. Select template: **Kids Wonderland** (or any other)
4. Click **"Provision Merchant"** button
5. ✅ Should work now!

---

## 🎯 What Will Happen

After provisioning, the merchant will have:

```json
{
  "brandColors": {
    "primary": "#6366f1",
    "secondary": "#ec4899",
    "accent": "#8b5cf6"
  },
  "typography": {
    "fontFamily": "Inter",
    "headingFont": "Inter",
    "bodyFont": "Inter"
  },
  "heroSection": {
    "title": "Discover new business",
    "subtitle": "Quality products for you",
    "ctaText": "Shop Now"
  },
  "aboutSection": {
    "title": "About new business",
    "content": "Committed to quality..."
  },
  "socialLinks": {
    "facebook": "",
    "instagram": "",
    "twitter": "",
    "linkedin": ""
  }
}
```

---

**Status:** ✅ Fixed - Just restart backend!
