# 🔧 Troubleshooting Guide

## Issue 1: "No merchants in Provisioning page"

### Solution A: Check Database
```bash
cd D:\orbit\backend
node check-pending-merchants.js
```

This will show:
- How many stores exist
- How many are PENDING vs PROVISIONED
- List all stores with details

### Solution B: Create Test Merchants
If you have no merchants yet:
```bash
cd D:\orbit\backend
node create-test-merchants.js
```

This creates 3 test merchants:
- **Tech Haven** (Electronics)
- **Bella Boutique** (Fashion)
- **Sparkle & Shine** (Jewelry)

### Solution C: Use Onboarding App
Register merchants properly:
1. Go to: `http://localhost:3001`
2. Fill out the registration form
3. Merchants will appear as PENDING in admin

---

## Issue 2: "Provisioning link not in sidebar"

### Solution: Clear Browser Cache & Restart
```bash
# 1. Stop admin dashboard (Ctrl+C in terminal)

# 2. Clear Next.js cache
cd D:\orbit\orbit_admin
rm -rf .next

# 3. Restart
npm run dev

# 4. Hard refresh browser (Ctrl+Shift+R or Ctrl+F5)
```

### Verify Sidebar Change
The sidebar should now show:
- Dashboard
- Lifecycle
- Analytics
- Projects
- Team
- Brands
- **Provisioning** ← NEW! 🚀
- Tickets
- Communication
- Themes
- Merchants

---

## Issue 3: Prisma Errors

### Error: "Unknown field brandOnboarding"
**Status:** ✅ FIXED
The controller has been updated to use `onboarding` instead.

### Restart Backend After Fix:
```bash
cd D:\orbit\backend
# Stop server (Ctrl+C)
npm run dev
```

---

## Issue 4: "Themes page empty"

### Solution: Seed Themes
```bash
cd D:\orbit\backend
node seed-themes.js
```

Expected output:
```
🌱 Seeding themes...
✅ Created/Updated: Modern Fashion Store
✅ Created/Updated: Tech Store Pro
✅ Created/Updated: Beauty Luxe
... (9 themes total)
✨ Theme seeding complete!
```

---

## Issue 5: "Can't access provisioning API"

### Check Backend is Running:
```bash
# Test API directly
curl http://localhost:5000/api/admin/provisioning/pending
```

**Expected:** JSON response (might need admin token)

**If error:** Backend is not running or crashed

### Restart Backend:
```bash
cd D:\orbit\backend
npm run dev
```

---

## Complete Reset (Nuclear Option)

If nothing works, do a complete reset:

### 1. Stop All Services
```bash
# Stop all terminals running the apps
# Ctrl+C in each terminal
```

### 2. Clear All Caches
```bash
# Admin
cd D:\orbit\orbit_admin
rm -rf .next
rm -rf node_modules/.cache

# Orbit-360
cd D:\orbit\Orbit-360
rm -rf .next
rm -rf node_modules/.cache

# Backend
cd D:\orbit\backend
npx prisma generate
```

### 3. Reset Database (⚠️ This deletes all data!)
```bash
cd D:\orbit\backend
npx prisma db push --force-reset
node seed-themes.js
node create-test-merchants.js
```

### 4. Restart Everything
```bash
# Terminal 1: Backend
cd D:\orbit\backend
npm run dev

# Terminal 2: Admin
cd D:\orbit\orbit_admin
npm run dev

# Terminal 3: Orbit-360
cd D:\orbit\Orbit-360
npm run dev
```

### 5. Hard Refresh Browsers
- Admin: `Ctrl+Shift+R` at `http://localhost:3002`
- Dashboard: `Ctrl+Shift+R` at `http://localhost:3000`

---

## Quick Checks Checklist

- [ ] Backend running on port 5000
- [ ] Admin running on port 3002
- [ ] Orbit-360 running on port 3000
- [ ] PostgreSQL database is running
- [ ] Prisma client is generated (`npx prisma generate`)
- [ ] Themes are seeded (`node seed-themes.js`)
- [ ] At least 1 merchant exists in database
- [ ] Browser cache cleared
- [ ] No console errors in browser dev tools
- [ ] No errors in backend terminal

---

## Still Not Working?

### Check Backend Logs
Look for errors in the terminal where backend is running

### Check Browser Console
1. Open browser dev tools (F12)
2. Go to Console tab
3. Look for red errors
4. Share the error message

### Check Database
```bash
cd D:\orbit\backend
node
```

```javascript
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Check stores
prisma.store.findMany().then(console.log);

// Check themes
prisma.theme.findMany().then(console.log);
```

---

## Common Issues Reference

| Issue | Solution |
|-------|----------|
| No merchants showing | Run `check-pending-merchants.js` |
| Provisioning not in sidebar | Clear cache, restart admin |
| Themes page empty | Run `seed-themes.js` |
| Prisma errors | Restart backend after fixes |
| API 404 errors | Check backend is running |
| Can't login | Check user exists in database |

---

**Last Updated:** February 6, 2026
