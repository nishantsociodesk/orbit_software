# 🎨 Multi-Theme System - Multiple Upfront Templates

## 🎯 Goal

Create multiple upfront templates for different business categories:
- 🧸 **Toys Store** (Already done!)
- 👗 **Fashion Store**
- 💻 **Electronics Store**
- 🍕 **Food/Restaurant**
- 🏋️ **Fitness/Gym**
- 🏠 **Home & Garden**
- 📚 **Books/Education**
- 💄 **Beauty/Cosmetics**

**All controlled from ONE Orbit-360 dashboard!**

---

## 📁 **Template Structure**

```
D:\orbit\templates\
├── orbit_front_toys\          ✅ DONE (toy upfront 2)
├── orbit_front_fashion\       🆕 NEW
├── orbit_front_electronics\   🆕 NEW
├── orbit_front_food\          🆕 NEW
├── orbit_front_fitness\       🆕 NEW
├── orbit_front_home\          🆕 NEW
├── orbit_front_books\         🆕 NEW
└── orbit_front_beauty\        🆕 NEW
```

---

## 🎨 **How It Works**

### **Same Backend, Different Frontends**

```
┌────────────────────────────────────────────┐
│         Orbit-360 Dashboard                │
│  (One dashboard for all merchants)         │
├────────────────────────────────────────────┤
│  🎨 Visual Editor                          │
│  🛍️ Products                               │
│  📊 Orders                                  │
│  👥 Customers                               │
│  ⚙️ Store Settings                         │
│      └─ Select Theme: [Fashion ▼]          │
└─────────────────┬──────────────────────────┘
                  │
                  ↓ API (http://localhost:5000)
┌─────────────────────────────────────────────┐
│         PostgreSQL Database                 │
│  ├─ Store (name, category, theme)          │
│  ├─ Products                                │
│  ├─ WebsiteCustomization                   │
│  └─ Theme (selected theme)                  │
└─────────────────┬───────────────────────────┘
                  │
                  ↓ Fetch Data
┌─────────────────────────────────────────────┐
│         Storefront (Port 3004)              │
│  ┌────────────────────────────────────────┐ │
│  │ IF theme = "fashion"                   │ │
│  │   SHOW: Fashion Template               │ │
│  │ ELSE IF theme = "electronics"          │ │
│  │   SHOW: Electronics Template           │ │
│  │ ELSE IF theme = "toys"                 │ │
│  │   SHOW: Toys Template (current)        │ │
│  └────────────────────────────────────────┘ │
└─────────────────────────────────────────────┘
```

---

## 🎯 **Category-Specific Features**

### **1. Toys Store** (Current) ✅
**Features:**
- Playful colors (primary green, pink, purple)
- Age-appropriate categories
- Safety certifications display
- Gift wrapping options

**Unique Fields:**
- Age Range
- Safety Rating
- Educational Value

---

### **2. Fashion Store** 👗
**Features:**
- Elegant design (black, white, gold colors)
- Size charts
- Color swatches
- Style guides
- Lookbooks

**Unique Fields:**
- Sizes (XS, S, M, L, XL, XXL)
- Colors (Red, Blue, Black, etc.)
- Material (Cotton, Polyester, Silk)
- Gender (Men, Women, Unisex)

**Visual Style:**
```css
Colors: Black (#000000), White (#FFFFFF), Gold (#FFD700)
Fonts: Playfair Display (headings), Lato (body)
Layout: Minimalist, grid-based
```

---

### **3. Electronics Store** 💻
**Features:**
- Tech-focused design (blue, silver, dark)
- Specifications tables
- Comparison tools
- Warranty information
- Tech support

**Unique Fields:**
- Brand
- Model Number
- Warranty Period
- Specifications (RAM, Storage, etc.)
- Compatibility

**Visual Style:**
```css
Colors: Dark Blue (#1E3A8A), Silver (#C0C0C0), White
Fonts: Roboto (headings & body)
Layout: Grid with detailed specs
```

---

### **4. Food/Restaurant** 🍕
**Features:**
- Appetizing colors (red, orange, yellow)
- Menu categories
- Dietary tags (Vegan, Gluten-free)
- Delivery options
- Opening hours

**Unique Fields:**
- Ingredients
- Allergens
- Calories
- Spice Level
- Serving Size

**Visual Style:**
```css
Colors: Red (#DC2626), Orange (#F97316), Yellow (#FCD34D)
Fonts: Pacifico (headings), Open Sans (body)
Layout: Card-based menu
```

---

### **5. Fitness/Gym** 🏋️
**Features:**
- Energetic design (bright green, orange, black)
- Class schedules
- Membership tiers
- Trainer profiles
- Body transformation galleries

**Unique Fields:**
- Class Duration
- Difficulty Level
- Trainer Name
- Capacity
- Equipment Needed

**Visual Style:**
```css
Colors: Bright Green (#10B981), Orange (#F97316), Black
Fonts: Montserrat (headings), Poppins (body)
Layout: Bold, high-contrast
```

---

### **6. Home & Garden** 🏠
**Features:**
- Natural colors (green, brown, beige)
- Room categories
- Style guides (Modern, Rustic, etc.)
- Care instructions
- Dimensions

**Unique Fields:**
- Dimensions (L x W x H)
- Material
- Room Type
- Style
- Care Instructions

**Visual Style:**
```css
Colors: Forest Green (#22543D), Brown (#78350F), Beige (#F5F5DC)
Fonts: Merriweather (headings), Source Sans (body)
Layout: Natural, spacious
```

---

### **7. Books/Education** 📚
**Features:**
- Academic design (navy, burgundy, cream)
- Author information
- Reviews & ratings
- Reading level
- Sample chapters

**Unique Fields:**
- Author
- ISBN
- Publisher
- Publication Date
- Page Count
- Language
- Reading Level

**Visual Style:**
```css
Colors: Navy (#1E3A8A), Burgundy (#7C2D12), Cream (#FFFBEB)
Fonts: Georgia (headings), Crimson Text (body)
Layout: Classic, text-focused
```

---

### **8. Beauty/Cosmetics** 💄
**Features:**
- Luxurious design (pink, gold, white)
- Ingredient lists
- Skin type compatibility
- Application guides
- Before/after galleries

**Unique Fields:**
- Skin Type (Oily, Dry, Combination)
- Ingredients
- Application Method
- Shade/Color
- Volume/Size

**Visual Style:**
```css
Colors: Pink (#EC4899), Gold (#F59E0B), White (#FFFFFF)
Fonts: Raleway (headings), Nunito (body)
Layout: Elegant, product-focused
```

---

## 🔧 **Implementation Plan**

### **Phase 1: Theme Selector in Orbit-360** ✅
```
Store Settings → Store Info
Add dropdown: Select Theme [Fashion ▼]
```

### **Phase 2: Create Base Templates**
```
1. Copy "toy upfront 2" folder
2. Rename to category (e.g., "orbit_front_fashion")
3. Update colors, fonts, layout
4. Keep API integration (StoreContext, storefront-api.ts)
5. Update .env.local
```

### **Phase 3: Category-Specific Product Fields**
```
Orbit-360 → Products
Add dynamic fields based on category:
- Fashion: Size, Color, Material
- Electronics: Brand, Model, Warranty
- Food: Ingredients, Calories
```

### **Phase 4: Theme-Based Routing**
```
Backend checks merchant's selected theme
Serves appropriate template
All templates fetch from same API
```

---

## 🚀 **Quick Start: Create Fashion Template**

### **Step 1: Copy Toy Template**
```powershell
cd D:\orbit\templates\orbit_front_others
cp -r "toy upfront 2" "../orbit_front_fashion"
```

### **Step 2: Update Configuration**
```powershell
cd D:\orbit\templates\orbit_front_fashion

# Update .env.local
echo "NEXT_PUBLIC_API_BASE_URL=http://localhost:5000" > .env.local
echo "NEXT_PUBLIC_STORE_SUBDOMAIN=new-business" >> .env.local
echo "NEXT_PUBLIC_THEME=fashion" >> .env.local
```

### **Step 3: Update Styling**
```typescript
// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        primary: '#000000',    // Black
        secondary: '#FFFFFF',  // White
        accent: '#FFD700',     // Gold
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['Lato', 'sans-serif'],
      },
    },
  },
}
```

### **Step 4: Update Components**
```typescript
// components/layout/Header.tsx
const primaryColor = customization?.brandColors?.primary || "#000000"; // Black for fashion
const secondaryColor = customization?.brandColors?.secondary || "#FFFFFF";
const accentColor = customization?.brandColors?.accent || "#FFD700"; // Gold
```

### **Step 5: Install & Run**
```powershell
npm install
npm run dev -- -p 3005  # Different port for fashion template
```

---

## 📋 **Template Ports**

To run multiple templates simultaneously:

```
Port 3004: Toys Template
Port 3005: Fashion Template
Port 3006: Electronics Template
Port 3007: Food Template
Port 3008: Fitness Template
Port 3009: Home Template
Port 3010: Books Template
Port 3011: Beauty Template
```

---

## 🎨 **Orbit-360 Changes Needed**

### **1. Theme Selector**
```typescript
// Store Settings → Store Info
<Select
  value={storeInfo.theme}
  onValueChange={(value) => setStoreInfo({ ...storeInfo, theme: value })}
>
  <SelectItem value="toys">🧸 Toys Store</SelectItem>
  <SelectItem value="fashion">👗 Fashion Store</SelectItem>
  <SelectItem value="electronics">💻 Electronics Store</SelectItem>
  <SelectItem value="food">🍕 Food/Restaurant</SelectItem>
  <SelectItem value="fitness">🏋️ Fitness/Gym</SelectItem>
  <SelectItem value="home">🏠 Home & Garden</SelectItem>
  <SelectItem value="books">📚 Books/Education</SelectItem>
  <SelectItem value="beauty">💄 Beauty/Cosmetics</SelectItem>
</Select>
```

### **2. Category-Specific Product Fields**
```typescript
// Products Page
{category === 'fashion' && (
  <>
    <Input label="Size" />
    <Input label="Color" />
    <Input label="Material" />
  </>
)}

{category === 'electronics' && (
  <>
    <Input label="Brand" />
    <Input label="Model Number" />
    <Input label="Warranty" />
  </>
)}
```

### **3. Dynamic Preview Link**
```typescript
// Site Header
const themePort = {
  toys: 3004,
  fashion: 3005,
  electronics: 3006,
  food: 3007,
  fitness: 3008,
  home: 3009,
  books: 3010,
  beauty: 3011,
}[storeInfo.theme] || 3004;

<Button asChild>
  <a href={`http://localhost:${themePort}`}>
    Preview Store
  </a>
</Button>
```

---

## ✅ **Next Steps**

1. **Choose which templates to create first**
2. **I'll copy and customize the templates**
3. **Update Orbit-360 with theme selector**
4. **Add category-specific product fields**
5. **Test all templates**

---

## 🎊 **Benefits**

✅ **One Dashboard** - Manage all categories from Orbit-360
✅ **Multiple Designs** - Each category has unique look
✅ **Same Features** - Products, orders, customers work the same
✅ **Easy Switching** - Change theme with dropdown
✅ **Scalable** - Add more themes anytime

---

**Which templates should I create first?**
1. Fashion 👗
2. Electronics 💻
3. Food 🍕
4. All of them! 🚀

**Let me know and I'll start building!**
