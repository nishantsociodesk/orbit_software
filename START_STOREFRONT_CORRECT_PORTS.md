# 🚀 Start Merchant Storefront - CORRECT PORTS

## 📍 Your Current Port Setup:

- ✅ **Backend:** http://localhost:5000
- ✅ **Admin Dashboard:** http://localhost:3001
- ✅ **Orbit-360 (Merchant):** http://localhost:3003
- 🎯 **Storefront (Kids Wonderland):** http://localhost:3004 ← Need to start this!

---

## 🚀 Quick Start - 3 Commands:

### **Open NEW Terminal (Terminal 4):**

```powershell
# Step 1: Navigate to toy template
cd "D:\orbit\templates\orbit_front_others\toy upfront 2"

# Step 2: Install dependencies (first time only)
npm install

# Step 3: Start on port 3004
$env:PORT=3004; npm run dev
```

**Expected Output:**
```
   ▲ Next.js 14.x.x
   - Local:        http://localhost:3004
   
 ✓ Ready in 2.5s
```

---

## 🎨 View the Storefront:

### **Option 1: Preview Button** ⭐
- Go to Orbit-360: http://localhost:3003
- Click **"Preview Store"** button (top-right)
- Opens: http://localhost:3004

### **Option 2: Direct URL**
```
http://localhost:3004
```

---

## 🧪 What You'll See:

**Kids Wonderland Toy Store:**
- 🎪 Hero banner with toys
- 🧸 Product grid
- 🛒 Shopping cart
- 🎯 Navigation menu
- ✨ Add to cart functionality

---

## ✅ All 4 Services Running:

```
Port 5000: Backend API          ✅
Port 3001: Admin Dashboard      ✅
Port 3003: Orbit-360 Merchant   ✅
Port 3004: Public Storefront    🎯 ← Start this now!
```

---

## 🔄 Test Customization:

**1.** Login to Orbit-360 (http://localhost:3003)

**2.** Go to "Website" tab

**3.** Change primary color to green

**4.** Click "Save Branding"

**5.** Refresh storefront (http://localhost:3004)

**6.** See green theme! 🎉

---

**Run the 3 commands above in a new terminal!** 🚀
