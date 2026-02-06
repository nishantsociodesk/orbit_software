/**
 * Data Adapter for Orbit API
 * 
 * This file provides functions to fetch data from the Orbit API
 * and transform it into the format expected by the template components.
 * 
 * It replaces the dummy data in lib/data.ts with real merchant data.
 */

import { OrbitAPI, Product as APIProduct, WebsiteCustomization } from './orbit-api';
import { Product } from './data';

/**
 * Transform API product to template product format
 */
function transformProduct(apiProduct: APIProduct): Product {
  return {
    id: parseInt(apiProduct.id.substring(0, 8), 16), // Convert UUID to number for compatibility
    name: apiProduct.name,
    shortDescription: apiProduct.description?.substring(0, 100) || '',
    fullDescription: apiProduct.description || '',
    price: Number(apiProduct.price),
    image: apiProduct.images.length > 0 ? apiProduct.images : ['/placeholder.png'],
    veg: true, // Default, can be enhanced with product metadata
    rating: 4.5, // Default, can be enhanced with reviews
    reviewCount: 0, // Default, can be enhanced with reviews
    category: 'general', // Can be mapped from product category
    badge: apiProduct.compareAtPrice ? 'Sale' : undefined,
    dietary: {
      vegan: false,
      sugarFree: false,
      glutenFree: false
    },
    spiceLevel: 'None' as const,
    ingredients: [],
    nutrition: {
      energy: '',
      protein: '',
      carbohydrates: '',
      sugar: '',
      fat: ''
    },
    storage: {
      instructions: '',
      bestBefore: '',
      disclaimer: ''
    }
  };
}

/**
 * Get all products from API
 */
export async function getProducts(subdomain: string): Promise<Product[]> {
  try {
    const api = new OrbitAPI(subdomain);
    const response = await api.getProducts({ limit: 100 });
    return response.products.map(transformProduct);
  } catch (error) {
    console.error('Failed to fetch products from API:', error);
    // Return empty array on error - you could also return dummy data as fallback
    return [];
  }
}

/**
 * Get single product from API
 */
export async function getProduct(subdomain: string, productId: string): Promise<Product | null> {
  try {
    const api = new OrbitAPI(subdomain);
    const apiProduct = await api.getProduct(productId);
    return transformProduct(apiProduct);
  } catch (error) {
    console.error('Failed to fetch product from API:', error);
    return null;
  }
}

/**
 * Get categories from API
 */
export async function getCategories(subdomain: string) {
  try {
    const api = new OrbitAPI(subdomain);
    const apiCategories = await api.getCategories();
    
    // Transform to template format
    return apiCategories.map((cat, index) => ({
      name: cat.charAt(0).toUpperCase() + cat.slice(1),
      slug: cat.toLowerCase(),
      image: `/category-${cat.toLowerCase()}.png`
    }));
  } catch (error) {
    console.error('Failed to fetch categories from API:', error);
    return [];
  }
}

/**
 * Get store customization from API
 */
export async function getStoreCustomization(subdomain: string): Promise<WebsiteCustomization | null> {
  try {
    const api = new OrbitAPI(subdomain);
    return await api.getCustomization();
  } catch (error) {
    console.error('Failed to fetch store customization:', error);
    return null;
  }
}

/**
 * Get store info from API
 */
export async function getStoreInfo(subdomain: string) {
  try {
    const api = new OrbitAPI(subdomain);
    return await api.getStoreInfo();
  } catch (error) {
    console.error('Failed to fetch store info:', error);
    return null;
  }
}
