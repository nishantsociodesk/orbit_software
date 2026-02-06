/**
 * Orbit Storefront API Client
 * Fetches real merchant data from the backend instead of using static data
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export interface Store {
  id: string;
  name: string;
  subdomain: string;
  customDomain?: string;
  description: string;
  logo?: string;
  theme: {
    id: string;
    name: string;
    slug: string;
    primaryColor?: string;
    secondaryColor?: string;
    fontFamily?: string;
  };
  customization: {
    brandName: string;
    tagline?: string;
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
    logoUrl?: string;
    faviconUrl?: string;
    heroTitle?: string;
    heroSubtitle?: string;
    aboutUs?: string;
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string;
    ogImage?: string;
    twitterHandle?: string;
    facebookUrl?: string;
    instagramUrl?: string;
    linkedinUrl?: string;
  };
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  category?: string;
  tags?: string[];
  inStock: boolean;
  variants?: ProductVariant[];
}

export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  inStock: boolean;
  options: Record<string, string>;
}

export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  variantInfo?: Record<string, string>;
}

export interface CheckoutData {
  items: OrderItem[];
  customerEmail: string;
  customerName?: string;
  shippingAddress?: {
    line1: string;
    line2?: string;
    city: string;
    state?: string;
    postalCode: string;
    country: string;
  };
  billingAddress?: {
    line1: string;
    line2?: string;
    city: string;
    state?: string;
    postalCode: string;
    country: string;
  };
  paymentMethod?: string;
  notes?: string;
}

/**
 * Resolve store by domain (subdomain or custom domain)
 */
export const getStoreByDomain = async (domain: string): Promise<{ success: boolean; store: Store }> => {
  const res = await fetch(`${API_BASE}/api/storefront/resolve?domain=${domain}`, {
    cache: 'no-store', // Always fetch fresh data
  });
  
  if (!res.ok) {
    throw new Error(`Store not found for domain: ${domain}`);
  }
  
  return res.json();
};

/**
 * Get store by subdomain (legacy)
 */
export const getStoreBySubdomain = async (subdomain: string): Promise<{ store: Store }> => {
  const res = await fetch(`${API_BASE}/api/storefront/${subdomain}`, {
    cache: 'no-store',
  });
  
  if (!res.ok) {
    throw new Error(`Store not found: ${subdomain}`);
  }
  
  return res.json();
};

/**
 * Get all products for a store
 */
export const getProducts = async (subdomain: string): Promise<{ products: Product[] }> => {
  const res = await fetch(`${API_BASE}/api/storefront/${subdomain}/products`, {
    next: { revalidate: 60 }, // Cache for 60 seconds
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  
  return res.json();
};

/**
 * Get a single product by ID
 */
export const getProduct = async (subdomain: string, productId: string): Promise<{ product: Product }> => {
  const res = await fetch(`${API_BASE}/api/storefront/${subdomain}/products/${productId}`, {
    next: { revalidate: 60 },
  });
  
  if (!res.ok) {
    throw new Error(`Product not found: ${productId}`);
  }
  
  return res.json();
};

/**
 * Submit checkout order
 */
export const checkout = async (subdomain: string, orderData: CheckoutData): Promise<{ order: any }> => {
  const res = await fetch(`${API_BASE}/api/storefront/${subdomain}/checkout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData),
  });
  
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Checkout failed' }));
    throw new Error(error.message || 'Checkout failed');
  }
  
  return res.json();
};

/**
 * Get store layout configuration (if using MongoDB layouts)
 */
export const getLayout = async (subdomain: string): Promise<{ layout: any }> => {
  const res = await fetch(`${API_BASE}/api/storefront/${subdomain}/layout`, {
    next: { revalidate: 300 }, // Cache for 5 minutes
  });
  
  if (!res.ok) {
    return { layout: null };
  }
  
  return res.json();
};

/**
 * Helper: Get current domain from window or environment
 */
export const getCurrentDomain = (): string => {
  if (typeof window !== 'undefined') {
    return window.location.hostname;
  }
  return process.env.NEXT_PUBLIC_STORE_DOMAIN || 'default';
};

/**
 * Helper: Extract subdomain from domain
 */
export const getSubdomainFromDomain = (domain: string): string => {
  return domain.split('.')[0];
};
