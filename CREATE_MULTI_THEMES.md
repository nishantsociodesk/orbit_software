# 🚀 Create Multi-Theme System - Step by Step

## ✅ What We're Building

**ONE Orbit-360 Dashboard** → **MULTIPLE Storefront Designs**

Merchant selects their category (Toys, Fashion, Electronics, etc.), and the storefront automatically uses the matching template!

---

## 📋 **Step 1: Update Database Schema**

### **Run Migration:**
```powershell
cd D:\orbit\backend
npx prisma db push
```

**What Changed:**
- ✅ Added `category` field to Product
- ✅ Added `tags` field to Product
- ✅ Added `isFeatured` field to Product
- ✅ Added `customFields` (JSON) for category-specific data

---

## 📋 **Step 2: Update Orbit-360 - Theme Selector**

### **File:** `D:\orbit\Orbit-360\app\dashboard\website\page.tsx`

Add theme selector to Store Info tab:

```typescript
// In StoreInfoTab component, add this after category input:

<div className="space-y-2">
  <Label htmlFor="theme">Store Theme/Template</Label>
  <Select
    value={storeInfo.theme || "toys"}
    onValueChange={(value) => setStoreInfo({ ...storeInfo, theme: value })}
  >
    <SelectTrigger>
      <SelectValue placeholder="Select a theme" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="toys">🧸 Toys Store (Playful)</SelectItem>
      <SelectItem value="fashion">👗 Fashion Store (Elegant)</SelectItem>
      <SelectItem value="electronics">💻 Electronics (Modern Tech)</SelectItem>
      <SelectItem value="food">🍕 Food/Restaurant (Appetizing)</SelectItem>
      <SelectItem value="fitness">🏋️ Fitness/Gym (Energetic)</SelectItem>
      <SelectItem value="home">🏠 Home & Garden (Natural)</SelectItem>
      <SelectItem value="books">📚 Books/Education (Academic)</SelectItem>
      <SelectItem value="beauty">💄 Beauty/Cosmetics (Luxurious)</SelectItem>
    </SelectContent>
  </Select>
  <p className="text-xs text-muted-foreground">
    Choose a template that matches your business type.
  </p>
</div>
```

---

## 📋 **Step 3: Add Dynamic Product Fields**

### **File:** `D:\orbit\Orbit-360\app\dashboard\products\page.tsx`

Add category-specific fields based on store category:

```typescript
// After existing product fields, add:

{/* Dynamic Fields Based on Category */}
{store?.category === 'fashion' && (
  <>
    <div className="space-y-2">
      <Label htmlFor="size">Size</Label>
      <Input
        id="size"
        value={currentProduct.customFields?.size || ''}
        onChange={(e) => setCurrentProduct({
          ...currentProduct,
          customFields: { ...currentProduct.customFields, size: e.target.value }
        })}
        placeholder="S, M, L, XL"
      />
    </div>
    <div className="space-y-2">
      <Label htmlFor="color">Color</Label>
      <Input
        id="color"
        value={currentProduct.customFields?.color || ''}
        onChange={(e) => setCurrentProduct({
          ...currentProduct,
          customFields: { ...currentProduct.customFields, color: e.target.value }
        })}
        placeholder="Red, Blue, Black"
      />
    </div>
    <div className="space-y-2">
      <Label htmlFor="material">Material</Label>
      <Input
        id="material"
        value={currentProduct.customFields?.material || ''}
        onChange={(e) => setCurrentProduct({
          ...currentProduct,
          customFields: { ...currentProduct.customFields, material: e.target.value }
        })}
        placeholder="Cotton, Polyester, Silk"
      />
    </div>
  </>
)}

{store?.category === 'electronics' && (
  <>
    <div className="space-y-2">
      <Label htmlFor="brand">Brand</Label>
      <Input
        id="brand"
        value={currentProduct.customFields?.brand || ''}
        onChange={(e) => setCurrentProduct({
          ...currentProduct,
          customFields: { ...currentProduct.customFields, brand: e.target.value }
        })}
        placeholder="Apple, Samsung, Sony"
      />
    </div>
    <div className="space-y-2">
      <Label htmlFor="model">Model Number</Label>
      <Input
        id="model"
        value={currentProduct.customFields?.model || ''}
        onChange={(e) => setCurrentProduct({
          ...currentProduct,
          customFields: { ...currentProduct.customFields, model: e.target.value }
        })}
        placeholder="iPhone 15 Pro"
      />
    </div>
    <div className="space-y-2">
      <Label htmlFor="warranty">Warranty</Label>
      <Input
        id="warranty"
        value={currentProduct.customFields?.warranty || ''}
        onChange={(e) => setCurrentProduct({
          ...currentProduct,
          customFields: { ...currentProduct.customFields, warranty: e.target.value }
        })}
        placeholder="1 Year Manufacturer Warranty"
      />
    </div>
  </>
)}

{store?.category === 'food' && (
  <>
    <div className="space-y-2">
      <Label htmlFor="ingredients">Ingredients</Label>
      <Textarea
        id="ingredients"
        value={currentProduct.customFields?.ingredients || ''}
        onChange={(e) => setCurrentProduct({
          ...currentProduct,
          customFields: { ...currentProduct.customFields, ingredients: e.target.value }
        })}
        placeholder="Flour, Eggs, Sugar..."
      />
    </div>
    <div className="space-y-2">
      <Label htmlFor="calories">Calories</Label>
      <Input
        id="calories"
        type="number"
        value={currentProduct.customFields?.calories || ''}
        onChange={(e) => setCurrentProduct({
          ...currentProduct,
          customFields: { ...currentProduct.customFields, calories: e.target.value }
        })}
        placeholder="350"
      />
    </div>
  </>
)}
```

---

## 📋 **Step 4: Create Theme Templates**

### **Option A: Create All Templates (Recommended)**

Run this script to create all 8 templates:

```powershell
cd D:\orbit\templates

# Create Fashion Template
cp -r "orbit_front_others/toy upfront 2" "orbit_front_fashion"
cd orbit_front_fashion
echo "NEXT_PUBLIC_API_BASE_URL=http://localhost:5000" > .env.local
echo "NEXT_PUBLIC_STORE_SUBDOMAIN=new-business" >> .env.local
echo "NEXT_PUBLIC_THEME=fashion" >> .env.local
npm install

# Create Electronics Template
cd ..
cp -r "orbit_front_others/toy upfront 2" "orbit_front_electronics"
cd orbit_front_electronics
echo "NEXT_PUBLIC_API_BASE_URL=http://localhost:5000" > .env.local
echo "NEXT_PUBLIC_STORE_SUBDOMAIN=new-business" >> .env.local
echo "NEXT_PUBLIC_THEME=electronics" >> .env.local
npm install

# Create Food Template
cd ..
cp -r "orbit_front_others/toy upfront 2" "orbit_front_food"
cd orbit_front_food
echo "NEXT_PUBLIC_API_BASE_URL=http://localhost:5000" > .env.local
echo "NEXT_PUBLIC_STORE_SUBDOMAIN=new-business" >> .env.local
echo "NEXT_PUBLIC_THEME=food" >> .env.local
npm install

# Continue for other templates...
```

### **Option B: Create Templates One by One**

I'll create each template with unique styling for you!

---

## 📋 **Step 5: Customize Each Template**

For each template, update these files:

### **1. Colors (`tailwind.config.ts`):**

**Fashion:**
```typescript
colors: {
  primary: '#000000',    // Black
  secondary: '#FFFFFF',  // White
  accent: '#FFD700',     // Gold
}
```

**Electronics:**
```typescript
colors: {
  primary: '#1E3A8A',    // Dark Blue
  secondary: '#C0C0C0',  // Silver
  accent: '#3B82F6',     // Blue
}
```

**Food:**
```typescript
colors: {
  primary: '#DC2626',    // Red
  secondary: '#F97316',  // Orange
  accent: '#FCD34D',     // Yellow
}
```

### **2. Fonts:**

**Fashion:**
```typescript
fontFamily: {
  display: ['Playfair Display', 'serif'],
  body: ['Lato', 'sans-serif'],
}
```

**Electronics:**
```typescript
fontFamily: {
  display: ['Roboto', 'sans-serif'],
  body: ['Roboto', 'sans-serif'],
}
```

**Food:**
```typescript
fontFamily: {
  display: ['Pacifico', 'cursive'],
  body: ['Open Sans', 'sans-serif'],
}
```

---

## 📋 **Step 6: Run Multiple Templates**

Each template on different port:

```powershell
# Terminal 1: Toys (Port 3004)
cd "D:\orbit\templates\orbit_front_others\toy upfront 2"
npm run dev -- -p 3004

# Terminal 2: Fashion (Port 3005)
cd D:\orbit\templates\orbit_front_fashion
npm run dev -- -p 3005

# Terminal 3: Electronics (Port 3006)
cd D:\orbit\templates\orbit_front_electronics
npm run dev -- -p 3006

# Terminal 4: Food (Port 3007)
cd D:\orbit\templates\orbit_front_food
npm run dev -- -p 3007
```

---

## 📋 **Step 7: Dynamic Preview Button**

Update Site Header to show correct template:

```typescript
// components/site-header.tsx

const getPreviewUrl = () => {
  const themePort = {
    toys: 3004,
    fashion: 3005,
    electronics: 3006,
    food: 3007,
    fitness: 3008,
    home: 3009,
    books: 3010,
    beauty: 3011,
  }[store?.theme] || 3004;
  
  return `http://localhost:${themePort}`;
};

<Button variant="outline" size="sm" asChild>
  <a href={getPreviewUrl()} target="_blank">
    <Store className="mr-2 h-4 w-4" />
    Preview Store
  </a>
</Button>
```

---

## 🎨 **Template Customization Examples**

### **Fashion Template Styling:**

```typescript
// components/layout/Header.tsx
export default function Header() {
  return (
    <header className="bg-black text-white">
      <div className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <h1 className="font-display text-3xl">
            {storeName}
          </h1>
          <div className="flex gap-6">
            <Link href="/women" className="hover:text-gold transition">
              Women
            </Link>
            <Link href="/men" className="hover:text-gold transition">
              Men
            </Link>
            <Link href="/sale" className="text-gold font-bold">
              SALE
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
```

### **Electronics Template Styling:**

```typescript
// components/layout/Header.tsx
export default function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-900 to-blue-700 text-white">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <h1 className="font-bold text-2xl tracking-wide">
            {storeName} <span className="text-blue-300">TECH</span>
          </h1>
          <div className="flex gap-8 text-sm font-medium">
            <Link href="/laptops">Laptops</Link>
            <Link href="/phones">Phones</Link>
            <Link href="/accessories">Accessories</Link>
            <Link href="/deals" className="text-yellow-400 font-bold">
              HOT DEALS
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
```

---

## ✅ **Testing Workflow**

1. **Login to Orbit-360**
   ```
   http://localhost:3003
   ```

2. **Select Theme**
   ```
   Store Settings → Store Info
   Select Theme: Fashion
   Save
   ```

3. **Add Products with Custom Fields**
   ```
   Products → Add Product
   Enter: Name, Price, Size, Color, Material
   Save
   ```

4. **Preview Storefront**
   ```
   Click "Preview Store" button
   Opens: http://localhost:3005 (Fashion template)
   ```

5. **Switch Theme**
   ```
   Store Settings → Store Info
   Select Theme: Electronics
   Save
   Preview → Opens port 3006 (Electronics template)
   ```

---

## 🎊 **Quick Start Commands**

### **Step 1: Update Database**
```powershell
cd D:\orbit\backend
npx prisma db push
```

### **Step 2: Restart Backend**
```powershell
cd D:\orbit\backend
npm run dev
```

### **Step 3: Restart Orbit-360**
```powershell
cd D:\orbit\Orbit-360
npm run dev
```

### **Step 4: I'll Create Templates**
Tell me which templates you want:
- [ ] All 8 templates
- [ ] Just Fashion
- [ ] Just Electronics
- [ ] Custom selection

---

## 🎯 **What You Get**

✅ **8 Different Templates** - Each with unique design
✅ **1 Dashboard** - Manage all from Orbit-360
✅ **Dynamic Fields** - Product fields change based on category
✅ **Easy Switching** - Change theme with dropdown
✅ **Same Features** - Orders, customers work the same
✅ **Scalable** - Add more themes anytime

---

**Ready to proceed?**

1. **Run migration** (Step 1)
2. **Tell me which templates to create**
3. **I'll set everything up!**
