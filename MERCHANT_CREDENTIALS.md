# 🔐 Merchant Login Credentials

## ✅ Provisioned Merchant: "new business"

### Login Information:

**Dashboard URL:** http://localhost:3003

**Credentials:**
- **Email:** `testing@gmail.com`
- **Password:** `orbit123` (will set this now)

**Store Details:**
- **Store Name:** new business
- **Subdomain:** new-business
- **Store ID:** 1ef40b17-f65f-4e86-9205-c872c637879c
- **Template:** Kids Wonderland (TOYSTORE)
- **Status:** COMPLETED (Provisioned)

---

## 🚀 Set Password Now

### Run this command to set a proper password:

```powershell
cd D:\orbit\backend
node set-merchant-password.js testing@gmail.com orbit123
```

**Expected Output:**
```
✅ Password updated successfully!

───────────────────────────────────────
User: Piyush Rathore
Email: testing@gmail.com
Role: MERCHANT
Password: orbit123

Stores:
  1. new business
     Subdomain: new-business

───────────────────────────────────────

🔐 Login Credentials:
   Email: testing@gmail.com
   Password: orbit123
   Dashboard: http://localhost:3003

✅ Ready to use!
```

---

## 🎯 How to Login

### Step 1: Open Orbit-360 Dashboard
```
http://localhost:3003
```

### Step 2: Enter Credentials
- **Email:** `testing@gmail.com`
- **Password:** `orbit123`

### Step 3: Click "Sign In"
You'll be logged into the merchant dashboard!

---

## 🎨 What the Merchant Can Do

Once logged in, the merchant can:

### 1. Dashboard Tab
- View store overview
- See analytics
- Monitor sales

### 2. Website Tab ⭐ (Most Important!)
- **Branding:** Upload logo, change colors
- **Content:** Edit hero section, about us
- **SEO:** Update meta tags, keywords
- **Social:** Add Facebook, Instagram, Twitter, LinkedIn

### 3. Analytics Tab
- View detailed metrics
- Track performance
- See customer insights

### 4. Products Tab (Future)
- Add products
- Manage inventory
- Set pricing

### 5. Orders Tab (Future)
- View orders
- Process orders
- Track shipments

### 6. Settings Tab
- Update store settings
- Configure domain
- Manage integrations

---

## 📊 Other Merchants (All Pending)

### Merchant 2: trip paglus
```
Email: rathorepiyush000@gmail.com
Password: (not set, use: node set-merchant-password.js rathorepiyush000@gmail.com orbit123)
Subdomain: trip-paglus
Status: PENDING (not yet provisioned)
```

### Merchant 3: testing
```
Email: guest-1007760c-7eca-4438-a7a5-57e208264fa8@onboarding.local
Password: (not set, use: node set-merchant-password.js [email] orbit123)
Subdomain: testing
Status: PENDING (not yet provisioned)
```

---

## 🔄 Change Password Later

To change password for any merchant:

```powershell
cd D:\orbit\backend
node set-merchant-password.js <email> <new-password>
```

**Examples:**
```powershell
# For new business
node set-merchant-password.js testing@gmail.com newpassword456

# For trip paglus
node set-merchant-password.js rathorepiyush000@gmail.com trippass123

# For testing
node set-merchant-password.js guest-1007760c-7eca-4438-a7a5-57e208264fa8@onboarding.local testpass789
```

---

## ✅ Quick Test

### Test Login Flow:
```
1. Open: http://localhost:3003
2. Enter: testing@gmail.com
3. Enter: orbit123
4. Click: Sign In
5. ✅ Should see dashboard!
```

### Test Logout:
```
1. Click avatar in top-right (shows "T")
2. Click "Log out"
3. ✅ Should return to login screen
```

### Test Customization:
```
1. Login as merchant
2. Click "Website" in sidebar
3. Go to "Branding" tab
4. Change primary color
5. Click "Save Changes"
6. ✅ Changes saved!
```

---

## 🔧 Troubleshooting

### Can't Login?
Run password script again:
```powershell
cd D:\orbit\backend
node set-merchant-password.js testing@gmail.com orbit123
```

### Wrong Email/Password?
Check user in database:
```powershell
cd D:\orbit\backend
node check-pending-merchants.js
```

### Account Locked?
Check user status:
```javascript
// In backend terminal
cd D:\orbit\backend
node

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

prisma.user.findUnique({
  where: { email: 'testing@gmail.com' }
}).then(console.log);
```

---

## 📝 Summary Card

```
╔═══════════════════════════════════════════╗
║   MERCHANT LOGIN - "new business"         ║
╠═══════════════════════════════════════════╣
║                                           ║
║   Dashboard: http://localhost:3003       ║
║                                           ║
║   Email:    testing@gmail.com            ║
║   Password: orbit123                      ║
║                                           ║
║   Store:    new business                  ║
║   Domain:   new-business.orbit360.com    ║
║   Template: Kids Wonderland               ║
║   Status:   ✅ PROVISIONED                ║
║                                           ║
╚═══════════════════════════════════════════╝
```

---

**Next Step:** Run the password script and login! 🚀
