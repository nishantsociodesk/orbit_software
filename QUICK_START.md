# 🚀 Quick Start Guide - Shopify-Like Dynamic Templates

**Goal:** Get your first merchant website running with dynamic data in 5 minutes!

---

## ✅ What You Have Now

- ✅ **Backend API** - Serves merchant data dynamically
- ✅ **API Client** - TypeScript library for templates
- ✅ **Data Adapter** - Transforms API data to template format
- ✅ **Test Tools** - Verify everything works

---

## 🏃 Quick Start (5 Minutes)

### Step 1: Start Backend Server (1 min)

```bash
cd d:\orbit\backend
npm run dev
```

✅ Backend should run on `http://localhost:5000`

### Step 2: Verify API Works (1 min)

Open new terminal:

```bash
cd d:\orbit\backend
node test-storefront-api.js
```

**Expected:** All tests pass ✅

**If tests fail:** You need to create test data (see Step 3)

### Step 3: Create Test Store (2 min)

**Option A: Use Prisma Studio (Recommended)**

```bash
cd d:\orbit\backend
npx prisma studio
```

1. Open `http://localhost:5555`
2. Click "Store" → "Add record"
3. Fill in:
   - `name`: "Demo Food Store"
   - `subdomain`: "demo"
   - `description`: "A demo store"
   - `isActive`: true
   - `userId`: (select an existing user)
4. Save

**Option B: Use Orbit-360 Dashboard**

1. Start Orbit-360: `cd d:\orbit\Orbit-360 && npm run dev`
2. Login as merchant
3. Your store should already exist from onboarding

### Step 4: Add Test Products (1 min)

In Prisma Studio:

1. Click "Product" → "Add record"
2. Fill in:
   - `name`: "Organic Coffee"
   - `description`: "Premium organic coffee beans"
   - `price`: 299
   - `stock`: 100
   - `images`: ["https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=500"]
   - `isActive`: true
   - `storeId`: (select your store)
3. Save
4. Repeat for 2-3 more products

### Step 5: Test Template (1 min)

```bash
cd d:\orbit\templates\orbit_front_all

# Create environment file
echo NEXT_PUBLIC_ORBIT_API_URL=http://localhost:5000 > .env.local
echo NEXT_PUBLIC_DEFAULT_SUBDOMAIN=demo >> .env.local

# Start template
npm run dev
```

✅ Template runs on `http://localhost:3000`

---

## 🎉 Success!

You should now see:
- ✅ Backend API serving data
- ✅ Template fetching from API
- ✅ Your test products displayed

---

## 🔄 What's Next?

### Immediate Next Steps

1. **Update Template Components** to use API data
   - Follow: `TEMPLATE_API_INTEGRATION_GUIDE.md`
   - Start with: `components/sections/BestSellers.tsx`

2. **Add More Products** via Orbit-360 dashboard
   - See them appear on template automatically!

3. **Customize Branding** in Orbit-360
   - Logo, colors, hero section
   - Watch it update on template

### Full Integration Checklist

See `IMPLEMENTATION_SUMMARY.md` for complete checklist

---

## 🐛 Troubleshooting

### Backend won't start

```bash
# Check if port 5000 is in use
netstat -ano | findstr :5000

# Kill process if needed
taskkill /PID <process_id> /F
```

### API test fails with "Store not found"

**Solution:** Create a store with subdomain "demo" (see Step 3)

### Template shows no products

**Solution:** Add products to your store (see Step 4)

### "Module not found" errors

```bash
# Install dependencies
cd d:\orbit\backend
npm install

cd d:\orbit\templates\orbit_front_all
npm install
```

---

## 📚 Documentation

- **Full Guide:** `TEMPLATE_API_INTEGRATION_GUIDE.md`
- **Architecture:** `SHOPIFY_LIKE_INTEGRATION_PLAN.md`
- **Summary:** `IMPLEMENTATION_SUMMARY.md`

---

## 💡 Pro Tips

1. **Use Prisma Studio** for quick database edits
2. **Check Network tab** in browser to see API calls
3. **Use test script** to verify API before template testing
4. **Start simple** - Get one component working, then expand

---

**Ready? Let's go!** 🚀

```bash
# Terminal 1: Backend
cd d:\orbit\backend && npm run dev

# Terminal 2: Template
cd d:\orbit\templates\orbit_front_all && npm run dev

# Terminal 3: Test
cd d:\orbit\backend && node test-storefront-api.js
```
