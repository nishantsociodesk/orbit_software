const fs = require('fs');
const path = require('path');

// Theme configuration mapping
const themeConfig = {
  'food_1': {
    name: 'Food & Beverage Storefront 1',
    slug: 'food-beverage-1',
    category: 'FOOD_BEVERAGE',
    apiUrl: 'http://localhost:5000/api/storefront/public',
    subdomain: 'food-store-1'
  },
  'food_2': {
    name: 'Food & Beverage Storefront 2', 
    slug: 'food-beverage-2',
    category: 'FOOD_BEVERAGE',
    apiUrl: 'http://localhost:5000/api/storefront/public',
    subdomain: 'food-store-2'
  },
  'food_3': {
    name: 'Food & Beverage Storefront 3',
    slug: 'food-beverage-3',
    category: 'FOOD_BEVERAGE',
    apiUrl: 'http://localhost:5000/api/storefront/public',
    subdomain: 'food-store-3'
  },
  'electronics_1': {
    name: 'Electronics Storefront 1',
    slug: 'electronics-1',
    category: 'ELECTRONICS',
    apiUrl: 'http://localhost:5000/api/storefront/public',
    subdomain: 'electronics-store-1'
  },
  'electronics_2': {
    name: 'Electronics Storefront 2',
    slug: 'electronics-2',
    category: 'ELECTRONICS',
    apiUrl: 'http://localhost:5000/api/storefront/public',
    subdomain: 'electronics-store-2'
  },
  'electronics_3': {
    name: 'Electronics Storefront 3',
    slug: 'electronics-3',
    category: 'ELECTRONICS',
    apiUrl: 'http://localhost:5000/api/storefront/public',
    subdomain: 'electronics-store-3'
  },
  'perfume-upfront': {
    name: 'Perfume Storefront',
    slug: 'perfume-1',
    category: 'PERFUME',
    apiUrl: 'http://localhost:5000/api/storefront/public',
    subdomain: 'perfume-store-1'
  },
  'perfume-upfront-theme2': {
    name: 'Perfume Storefront Theme 2',
    slug: 'perfume-2',
    category: 'PERFUME',
    apiUrl: 'http://localhost:5000/api/storefront/public',
    subdomain: 'perfume-store-2'
  },
  'perfume-upfront-theme3': {
    name: 'Perfume Storefront Theme 3',
    slug: 'perfume-3',
    category: 'PERFUME',
    apiUrl: 'http://localhost:5000/api/storefront/public',
    subdomain: 'perfume-store-3'
  },
  'fashion_upfront': {
    name: 'Fashion Storefront',
    slug: 'fashion-1',
    category: 'CLOTHING',
    apiUrl: 'http://localhost:5000/api/storefront/public',
    subdomain: 'fashion-store-1'
  },
  'fashion_upfront_2': {
    name: 'Fashion Storefront 2',
    slug: 'fashion-2',
    category: 'CLOTHING',
    apiUrl: 'http://localhost:5000/api/storefront/public',
    subdomain: 'fashion-store-2'
  },
  'fashion upfront 3': {
    name: 'Fashion Storefront 3',
    slug: 'fashion-3',
    category: 'CLOTHING',
    apiUrl: 'http://localhost:5000/api/storefront/public',
    subdomain: 'fashion-store-3'
  },
  'toys upfront': {
    name: 'Toys Storefront',
    slug: 'toys-1',
    category: 'TOYSTORE',
    apiUrl: 'http://localhost:5000/api/storefront/public',
    subdomain: 'toys-store-1'
  },
  'toy upfront 2': {
    name: 'Toys Storefront 2',
    slug: 'toys-2',
    category: 'TOYSTORE',
    apiUrl: 'http://localhost:5000/api/storefront/public',
    subdomain: 'toys-store-2'
  },
  'toy upfront 3': {
    name: 'Toys Storefront 3',
    slug: 'toys-3',
    category: 'TOYSTORE',
    apiUrl: 'http://localhost:5000/api/storefront/public',
    subdomain: 'toys-store-3'
  },
  'beauty-personal-care-upfront': {
    name: 'Beauty & Personal Care',
    slug: 'beauty-1',
    category: 'COSMETICS',
    apiUrl: 'http://localhost:5000/api/storefront/public',
    subdomain: 'beauty-store-1'
  },
  'beauty-theme-2': {
    name: 'Beauty Theme 2',
    slug: 'beauty-2',
    category: 'COSMETICS',
    apiUrl: 'http://localhost:5000/api/storefront/public',
    subdomain: 'beauty-store-2'
  },
  'beauty-theme-3': {
    name: 'Beauty Theme 3',
    slug: 'beauty-3',
    category: 'COSMETICS',
    apiUrl: 'http://localhost:5000/api/storefront/public',
    subdomain: 'beauty-store-3'
  },
  'FOOTWEAR UPFRONT': {
    name: 'Footwear Storefront',
    slug: 'footwear-1',
    category: 'FOOTWEAR',
    apiUrl: 'http://localhost:5000/api/storefront/public',
    subdomain: 'footwear-store-1'
  }
};

// Function to create API file
function createApiFile(themePath, config) {
  const apiContent = `// API configuration for storefront themes
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '${config.apiUrl}';

// Utility functions for storefront API
export class StorefrontAPI {
  static subdomain = process.env.NEXT_PUBLIC_SUBDOMAIN || '${config.subdomain}';

  // Get store information
  static async getStoreInfo() {
    try {
      const response = await fetch(\`\${API_BASE_URL}/\${this.subdomain}/info\`);
      const data = await response.json();
      if (!data.success) throw new Error(data.message || 'Failed to fetch store info');
      return data.data;
    } catch (error) {
      console.error('Error fetching store info:', error);
      throw error;
    }
  }

  // Get store customization
  static async getStoreCustomization() {
    try {
      const response = await fetch(\`\${API_BASE_URL}/\${this.subdomain}/customization\`);
      const data = await response.json();
      if (!data.success) throw new Error(data.message || 'Failed to fetch customization');
      return data.data;
    } catch (error) {
      console.error('Error fetching customization:', error);
      // Return default values if API fails
      return {
        logo: null,
        brandColors: {
          primary: '#000000',
          secondary: '#666666',
          accent: '#ff6b6b'
        }
      };
    }
  }

  // Get products with optional filters
  static async getProducts(options = {}) {
    try {
      const { category, search, limit = 50, offset = 0 } = options;
      const params = new URLSearchParams();
      
      if (category) params.append('category', category);
      if (search) params.append('search', search);
      params.append('limit', limit.toString());
      params.append('offset', offset.toString());

      const response = await fetch(\`\${API_BASE_URL}/\${this.subdomain}/products?\${params}\`);
      const data = await response.json();
      if (!data.success) throw new Error(data.message || 'Failed to fetch products');
      return data.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      return { products: [], pagination: { total: 0, limit: 50, offset: 0, hasMore: false } };
    }
  }

  // Get single product
  static async getProduct(productId) {
    try {
      const response = await fetch(\`\${API_BASE_URL}/\${this.subdomain}/products/\${productId}\`);
      const data = await response.json();
      if (!data.success) throw new Error(data.message || 'Failed to fetch product');
      return data.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  }

  // Get store categories
  static async getCategories() {
    try {
      const response = await fetch(\`\${API_BASE_URL}/\${this.subdomain}/categories\`);
      const data = await response.json();
      if (!data.success) throw new Error(data.message || 'Failed to fetch categories');
      return data.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  }

  // Get theme configuration
  static async getThemeConfig() {
    try {
      const response = await fetch(\`\${API_BASE_URL}/\${this.subdomain}/theme\`);
      const data = await response.json();
      if (!data.success) throw new Error(data.message || 'Failed to fetch theme config');
      return data.data;
    } catch (error) {
      console.error('Error fetching theme config:', error);
      return {};
    }
  }

  // Create order
  static async createOrder(orderData) {
    try {
      const response = await fetch(\`\${API_BASE_URL}/\${this.subdomain}/orders\`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
      const data = await response.json();
      if (!data.success) throw new Error(data.message || 'Failed to create order');
      return data.data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  }

  // Verify payment
  static async verifyPayment(paymentData) {
    try {
      const response = await fetch(\`\${API_BASE_URL}/\${this.subdomain}/orders/verify\`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });
      const data = await response.json();
      if (!data.success) throw new Error(data.message || 'Failed to verify payment');
      return data.data;
    } catch (error) {
      console.error('Error verifying payment:', error);
      throw error;
    }
  }
}

import { useState, useEffect } from 'react';

// Hook for store context
export function useStore() {
  const [storeInfo, setStoreInfo] = useState(null);
  const [customization, setCustomization] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [info, custom] = await Promise.all([
          StorefrontAPI.getStoreInfo(),
          StorefrontAPI.getStoreCustomization()
        ]);
        setStoreInfo(info);
        setCustomization(custom);
      } catch (err: any) {
        setError(err.message || 'Unknown error');
        console.error('Error loading store data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    storeInfo,
    customization,
    loading,
    error
  };
}`;
  
  const libPath = path.join(themePath, 'lib');
  if (!fs.existsSync(libPath)) {
    fs.mkdirSync(libPath, { recursive: true });
  }
  
  fs.writeFileSync(path.join(libPath, 'api.ts'), apiContent);
  console.log(`Created API file for ${config.name}`);
}

// Function to create store context
function createStoreContext(themePath) {
  const contextContent = `"use client";

import { createContext, useContext, ReactNode } from 'react';
import { useStore } from '@/lib/api';

interface StoreContextType {
  storeInfo: any;
  customization: any;
  loading: boolean;
  error: string | null;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  const storeData = useStore();
  
  return (
    <StoreContext.Provider value={storeData}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStoreContext() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStoreContext must be used within a StoreProvider');
  }
  return context;
}`;

  const contextPath = path.join(themePath, 'context');
  if (!fs.existsSync(contextPath)) {
    fs.mkdirSync(contextPath, { recursive: true });
  }
  
  fs.writeFileSync(path.join(contextPath, 'store-context.tsx'), contextContent);
  console.log(`Created store context for theme`);
}

// Function to create environment file
function createEnvFile(themePath, config) {
  const envContent = `# Storefront Theme Environment Configuration

# Backend API URL
NEXT_PUBLIC_API_URL=${config.apiUrl}

# Store subdomain (will be set dynamically during provisioning)
NEXT_PUBLIC_SUBDOMAIN=${config.subdomain}

# Theme configuration
NEXT_PUBLIC_THEME_NAME=${config.name}
NEXT_PUBLIC_THEME_SLUG=${config.slug}
NEXT_PUBLIC_THEME_CATEGORY=${config.category}

# Development settings
NODE_ENV=development`;

  fs.writeFileSync(path.join(themePath, '.env.local'), envContent);
  console.log(`Created environment file for ${config.name}`);
}

// Main function to process all themes
function connectAllThemes() {
  const themesPath = path.join(__dirname, 'all_upfront');
  const themes = fs.readdirSync(themesPath);
  
  console.log('Connecting themes to backend...');
  
  themes.forEach(themeFolder => {
    const themePath = path.join(themesPath, themeFolder);
    const stat = fs.statSync(themePath);
    
    if (stat.isDirectory() && themeConfig[themeFolder]) {
      console.log(`\nProcessing theme: ${themeFolder}`);
      
      const config = themeConfig[themeFolder];
      
      // Create required files
      createApiFile(themePath, config);
      createStoreContext(themePath);
      createEnvFile(themePath, config);
      
      console.log(`✓ Connected ${config.name} to backend`);
    }
  });
  
  console.log('\n✅ All themes connected successfully!');
}

// Run the connection process
connectAllThemes();