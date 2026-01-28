'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Product } from '@/types/product';
import { fetchStorefrontProducts } from '@/lib/storefrontApi';

interface FeaturedProduct {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  image: string;
  badge?: string;
}

const toFeaturedProduct = (product: Product): FeaturedProduct => ({
  id: product.id,
  name: product.name,
  price: product.price,
  originalPrice: product.originalPrice,
  image: product.image,
  badge: product.discount ? `${product.discount}% OFF` : 'Top Pick'
});

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const loadProducts = async () => {
      setIsLoading(true);
      setLoadError(null);
      try {
        const data = await fetchStorefrontProducts();
        if (isMounted) {
          setProducts(data);
        }
      } catch (error) {
        if (isMounted) {
          setLoadError('Unable to load featured products right now.');
          setProducts([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadProducts();
    return () => {
      isMounted = false;
    };
  }, []);

  const featuredProducts = useMemo(() => {
    const sorted = [...products].sort((a, b) => {
      const discountDiff = (b.discount || 0) - (a.discount || 0);
      if (discountDiff !== 0) return discountDiff;
      return b.priceNum - a.priceNum;
    });
    return sorted.slice(0, 3).map(toFeaturedProduct);
  }, [products]);

  return (
    <section
      id="featured"
      className="py-16 transition-colors duration-300"
      style={{ backgroundColor: 'var(--card-bg)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: 'var(--text)' }}>
            Featured Products
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-muted)' }}>
            Handpicked favorites from our collection
          </p>
        </div>

        {loadError && (
          <div className="mb-6 rounded-lg border px-4 py-3 text-sm" style={{ borderColor: 'var(--card-border)', color: 'var(--text-muted)', backgroundColor: 'var(--card-bg)' }}>
            {loadError}
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {isLoading
            ? Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={`featured-skeleton-${index}`}
                  className="relative rounded-lg overflow-hidden border animate-pulse"
                  style={{ backgroundColor: 'var(--section-alt)', borderColor: 'var(--card-border)' }}
                >
                  <div className="aspect-square bg-gray-200" />
                  <div className="p-6 space-y-3">
                    <div className="h-5 w-3/4 bg-gray-200 rounded" />
                    <div className="h-6 w-1/2 bg-gray-200 rounded" />
                    <div className="h-10 w-full bg-gray-200 rounded" />
                  </div>
                </div>
              ))
            : featuredProducts.map((product) => (
                <div
                  key={product.id}
                  className="relative rounded-lg overflow-hidden hover:shadow-xl transition-shadow border group"
                  style={{ backgroundColor: 'var(--section-alt)', borderColor: 'var(--card-border)' }}
                >
                  {product.badge && (
                    <span className="absolute top-4 left-4 z-10 px-3 py-1 bg-red-500 text-white text-sm font-semibold rounded-full">
                      {product.badge}
                    </span>
                  )}
                  <div className="aspect-square bg-gray-200 overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text)' }}>{product.name}</h3>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl font-bold" style={{ color: 'var(--text)' }}>{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-lg line-through" style={{ color: 'var(--text-muted)' }}>{product.originalPrice}</span>
                      )}
                    </div>
                    <Link
                      href={`/products/${product.id}`}
                      className="w-full px-6 py-3 rounded-md font-semibold transition-opacity hover:opacity-90 text-center"
                      style={{ backgroundColor: 'var(--header-text)', color: 'var(--header-bg)' }}
                    >
                      Shop Now
                    </Link>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}
