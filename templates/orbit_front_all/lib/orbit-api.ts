/**
 * Orbit API Client
 * 
 * This client library allows templates to fetch merchant data dynamically
 * from the Orbit backend API. It replaces hardcoded dummy data with real
 * merchant-specific content.
 * 
 * Usage:
 * ```typescript
 * const api = new OrbitAPI('merchant-subdomain');
 * const products = await api.getProducts();
 * const storeInfo = await api.getStoreInfo();
 * ```
 */

export interface StoreInfo {
  id: string;
  name: string;
  subdomain: string;
  customDomain?: string;
  description?: string;
  logo?: string;
  category?: string;
  isActive: boolean;
  createdAt: string;
  settings?: {
    currency: string;
    timezone: string;
    seoTitle?: string;
    seoDescription?: string;
    socialImage?: string;
    contactEmail?: string;
    contactPhone?: string;
  };
  theme?: {
    id: string;
    name: string;
    slug: string;
    category?: string;
  };
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  compareAtPrice?: number;
  sku?: string;
  stock: number;
  images: string[];
  isActive: boolean;
  createdAt: string;
  variants?: ProductVariant[];
}

export interface ProductVariant {
  id: string;
  name: string;
  sku?: string;
  price?: number;
  stock: number;
  options: any;
}

export interface WebsiteCustomization {
  id?: string;
  logo?: string;
  favicon?: string;
  brandColors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
  typography?: {
    headingFont: string;
    bodyFont: string;
  };
  heroSection?: {
    title: string;
    subtitle: string;
    backgroundImage?: string;
  };
  aboutSection?: {
    title: string;
    content: string;
  };
  contactInfo?: {
    email?: string;
    phone?: string;
    address?: string;
  };
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
  headerStyle?: string;
  footerContent?: any;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
}

export interface Theme {
  id: string;
  name: string;
  slug: string;
  category?: string;
  description?: string;
  thumbnail?: string;
  version: string;
  config?: any;
  previewUrl?: string;
}

export interface ProductsResponse {
  products: Product[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export class OrbitAPI {
  private baseUrl: string;
  private subdomain: string;

  /**
   * Initialize the Orbit API client
   * @param subdomain - The merchant's subdomain (e.g., 'mystore')
   * @param baseUrl - Optional custom API base URL (defaults to env variable or localhost)
   */
  constructor(subdomain: string, baseUrl?: string) {
    this.subdomain = subdomain;
    this.baseUrl = baseUrl || 
      process.env.NEXT_PUBLIC_ORBIT_API_URL || 
      'http://localhost:5000';
  }

  /**
   * Generic fetch wrapper with error handling
   */
  private async fetchAPI<T>(endpoint: string): Promise<T> {
    const url = `${this.baseUrl}/api/storefront/public/${this.subdomain}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // Enable caching for better performance
        next: { revalidate: 60 } // Revalidate every 60 seconds
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      const data: APIResponse<T> = await response.json();
      
      if (!data.success) {
        throw new Error(data.message || 'API request failed');
      }

      return data.data as T;
    } catch (error) {
      console.error(`Orbit API Error [${endpoint}]:`, error);
      throw error;
    }
  }

  /**
   * Get store basic information
   */
  async getStoreInfo(): Promise<StoreInfo> {
    return this.fetchAPI<StoreInfo>('/info');
  }

  /**
   * Get website customization (branding, colors, hero section, etc.)
   */
  async getCustomization(): Promise<WebsiteCustomization> {
    return this.fetchAPI<WebsiteCustomization>('/customization');
  }

  /**
   * Get all products for the store
   * @param options - Query options (category, search, limit, offset)
   */
  async getProducts(options?: {
    category?: string;
    search?: string;
    limit?: number;
    offset?: number;
  }): Promise<ProductsResponse> {
    const params = new URLSearchParams();
    
    if (options?.category) params.append('category', options.category);
    if (options?.search) params.append('search', options.search);
    if (options?.limit) params.append('limit', options.limit.toString());
    if (options?.offset) params.append('offset', options.offset.toString());

    const query = params.toString() ? `?${params.toString()}` : '';
    return this.fetchAPI<ProductsResponse>(`/products${query}`);
  }

  /**
   * Get a single product by ID
   * @param productId - The product ID
   */
  async getProduct(productId: string): Promise<Product> {
    return this.fetchAPI<Product>(`/products/${productId}`);
  }

  /**
   * Get all unique product categories
   */
  async getCategories(): Promise<string[]> {
    return this.fetchAPI<string[]>('/categories');
  }

  /**
   * Get store theme configuration
   */
  async getTheme(): Promise<Theme | null> {
    return this.fetchAPI<Theme | null>('/theme');
  }
}

/**
 * Helper function to get subdomain from hostname
 * Works in both browser and server environments
 */
export function getSubdomainFromHost(hostname: string): string {
  // Remove port if present
  const host = hostname.split(':')[0];
  
  // Split by dots
  const parts = host.split('.');
  
  // If localhost or IP, return default
  if (host === 'localhost' || /^\d+\.\d+\.\d+\.\d+$/.test(host)) {
    return process.env.NEXT_PUBLIC_DEFAULT_SUBDOMAIN || 'demo';
  }
  
  // Return first part as subdomain
  return parts[0];
}

/**
 * Create an API client instance from the current request
 * Usage in Next.js server components:
 * ```typescript
 * const api = createAPIFromRequest(headers());
 * ```
 */
export function createAPIFromRequest(headers: Headers): OrbitAPI {
  const hostname = headers.get('host') || 'localhost';
  const subdomain = getSubdomainFromHost(hostname);
  return new OrbitAPI(subdomain);
}

/**
 * Create an API client instance from window (client-side only)
 * Usage in Next.js client components:
 * ```typescript
 * const api = createAPIFromWindow();
 * ```
 */
export function createAPIFromWindow(): OrbitAPI {
  if (typeof window === 'undefined') {
    throw new Error('createAPIFromWindow can only be used in browser environment');
  }
  
  const subdomain = getSubdomainFromHost(window.location.hostname);
  return new OrbitAPI(subdomain);
}

export default OrbitAPI;
