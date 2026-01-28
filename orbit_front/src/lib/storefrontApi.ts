import { formatINR } from '@/lib/utils';
import { Product } from '@/types/product';

type StorefrontProduct = {
  id: string;
  name: string;
  description?: string | null;
  price: number | string;
  compareAtPrice?: number | string | null;
  stock?: number | null;
  images?: string[] | null;
  createdAt?: string | Date | null;
  variants?: Array<{
    id: string;
    name: string;
    price?: number | string | null;
    stock?: number | null;
    options?: Record<string, string>;
  }>;
};

type StorefrontStore = {
  id: string;
  name: string;
  subdomain: string;
  description?: string | null;
  logo?: string | null;
};

const DEFAULT_API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, '') || 'http://localhost:5000';
const DEFAULT_SUBDOMAIN = process.env.NEXT_PUBLIC_STOREFRONT_SUBDOMAIN || 'default';

const storefrontUrl = (path: string) =>
  `${DEFAULT_API_BASE_URL}/api/storefront/${DEFAULT_SUBDOMAIN}${path}`;

const parseNumber = (value: number | string | null | undefined) => {
  if (value === null || value === undefined) return 0;
  if (typeof value === 'number') return value;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

const getFallbackImage = (category: string) => {
  switch (category) {
    case 'Audio':
      return 'https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=800&h=800&fit=crop';
    case 'Computers':
      return 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=800&fit=crop';
    case 'Mobile':
      return 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=800&fit=crop';
    case 'Wearables':
      return 'https://images.unsplash.com/photo-1510017098667-27dfc7150db8?w=800&h=800&fit=crop';
    case 'Accessories':
      return 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=800&fit=crop';
    default:
      return 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=800&h=800&fit=crop';
  }
};

const deriveCategory = (name: string, description?: string | null) => {
  const haystack = `${name} ${description ?? ''}`.toLowerCase();
  if (/(laptop|notebook|monitor|desktop|pc)/.test(haystack)) return 'Computers';
  if (/(phone|smartphone|mobile)/.test(haystack)) return 'Mobile';
  if (/(watch|wearable)/.test(haystack)) return 'Wearables';
  if (/(earbud|headphone|speaker|audio)/.test(haystack)) return 'Audio';
  if (/(charger|cable|keyboard|mouse|adapter|case)/.test(haystack)) return 'Accessories';
  return 'Electronics';
};

const deriveBrand = (name: string) => {
  const firstWord = name.split(' ')[0]?.trim();
  if (!firstWord) return 'Upfront';
  if (firstWord.length <= 2) return 'Upfront';
  return firstWord;
};

const buildShortDescription = (description?: string | null) => {
  if (!description) return 'Premium electronics with dependable performance.';
  const [first] = description.split('. ');
  return first?.length ? `${first.replace(/\.$/, '')}.` : description;
};

export const mapStorefrontProduct = (product: StorefrontProduct): Product => {
  const category = deriveCategory(product.name, product.description);
  const priceNum = parseNumber(product.price);
  const compareAt = parseNumber(product.compareAtPrice ?? undefined);
  const discount =
    compareAt > priceNum && priceNum > 0
      ? Math.round(((compareAt - priceNum) / compareAt) * 100)
      : undefined;
  const images = product.images?.length ? product.images : [getFallbackImage(category)];

  return {
    id: product.id,
    name: product.name,
    price: formatINR(priceNum),
    priceNum,
    image: images[0],
    images,
    description: product.description || 'Built for modern life with dependable performance.',
    shortDescription: buildShortDescription(product.description),
    category,
    brand: deriveBrand(product.name),
    rating: 4.4,
    reviewCount: 120,
    stock: (product.stock ?? 0) > 0,
    createdAt: product.createdAt ? new Date(product.createdAt) : new Date(),
    originalPrice: compareAt > priceNum ? formatINR(compareAt) : undefined,
    discount,
    features: [
      'Fast performance for daily multitasking',
      'Energy efficient, built to last',
      'Seamless connectivity across devices'
    ]
  };
};

const fetchJson = async <T>(url: string, options?: RequestInit) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Request failed: ${response.status}`);
  }
  return response.json() as Promise<T>;
};

export const fetchStorefrontStore = async () => {
  const data = await fetchJson<{ store: StorefrontStore }>(storefrontUrl(''));
  return data.store;
};

export const fetchStorefrontProducts = async () => {
  const data = await fetchJson<{ products: StorefrontProduct[] }>(
    storefrontUrl('/products')
  );
  return data.products.map(mapStorefrontProduct);
};

export const fetchStorefrontProduct = async (id: string) => {
  const data = await fetchJson<{ product: StorefrontProduct }>(
    storefrontUrl(`/products/${id}`)
  );
  return mapStorefrontProduct(data.product);
};

export const createStorefrontCheckout = async (payload: {
  customerEmail: string;
  customerName: string;
  shippingAddress: Record<string, string>;
  billingAddress: Record<string, string>;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  items: Array<{
    productId: string;
    name: string;
    quantity: number;
    price: number;
    variantInfo?: Record<string, string>;
  }>;
}) => {
  const data = await fetchJson<{ order: { id: string; orderNumber: string } }>(
    storefrontUrl('/checkout'),
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }
  );
  return data.order;
};

