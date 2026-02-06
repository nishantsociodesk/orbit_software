# 🚀 Start Orbit-360 Merchant Dashboard

## ❌ Problem
`localhost:3000` shows "ERR_CONNECTION_REFUSED" because Orbit-360 is not running.

## ✅ Solution

### Open a New Terminal (Terminal 3)

**In VS Code:**
1. Click **Terminal** menu → **New Terminal**
2. Or press: **Ctrl+Shift+`** (backtick)

### Run These Commands:

```powershell
cd D:\orbit\Orbit-360
npm run dev
```

**Expected Output:**
```
   ▲ Next.js 14.x.x
   - Local:        http://localhost:3000
   - Environments: .env.local

 ✓ Ready in 2.5s
```

### Now Try Again:

Open browser: **http://localhost:3000**

---

## 📋 All 3 Services Should Be Running:

### Terminal 1: Backend (Port 5000)
```powershell
cd D:\orbit\backend
npm run dev
```
✅ Running on: http://localhost:5000

### Terminal 2: Admin Dashboard (Port 3002)
```powershell
cd D:\orbit\orbit_admin
npm run dev
```
✅ Running on: http://localhost:3002

### Terminal 3: Merchant Dashboard (Port 3000)
```powershell
cd D:\orbit\Orbit-360
npm run dev
```
⚠️ **Need to start this one!**

---

## 🎯 After Starting

Once Orbit-360 is running:
1. Go to: http://localhost:3000
2. You should see the Orbit-360 dashboard
3. Login with merchant credentials if prompted
4. Navigate to "Website" tab to customize

---

**Status:** ⚠️ Need to start Orbit-360 on port 3000!
