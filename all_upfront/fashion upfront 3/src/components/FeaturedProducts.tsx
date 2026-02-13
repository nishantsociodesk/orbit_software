'use client';

import Image from 'next/image';
import Link from 'next/link';

interface FeaturedProduct {
  id: number;
  name: string;
  price: string;
  originalPrice?: string;
  image: string;
  badge?: string;
}

const featuredProducts: FeaturedProduct[] = [
  { id: 101, name: 'Floral Summer Dress', price: '₹4,149', originalPrice: '₹6,639', image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&h=800&fit=crop', badge: 'Best Seller' },
  { id: 102, name: 'Designer Denim Jacket', price: '₹7,469', originalPrice: '₹10,789', image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=600&h=800&fit=crop', badge: 'New' },
  { id: 103, name: 'Classic Leather Boots', price: '₹12,449', originalPrice: '₹16,599', image: 'https://images.unsplash.com/photo-1542280756-74b2f55e73ab?w=600&h=800&fit=crop', badge: 'Sale' },
];

export default function FeaturedProducts() {
  return (
    <section id="featured" className="py-24 bg-[var(--page-bg)]">
      <div className="max-w-[1920px] mx-auto px-6 sm:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 pb-4 border-b border-[var(--card-border)]">
          <div>
            <span className="block text-[var(--highlight)] text-xs font-bold uppercase tracking-[0.2em] mb-2">Curated Selection</span>
            <h2 className="text-5xl md:text-6xl font-heading font-bold text-[var(--text-primary)] uppercase tracking-tight">
              Featured Edits
            </h2>
          </div>
          <Link href="/products" className="hidden md:block text-[var(--text-secondary)] hover:text-[var(--text-primary)] uppercase tracking-widest text-sm font-medium transition-colors">
            View All Collection &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
          {featuredProducts.map((product) => (
            <div key={product.id} className="group relative aspect-[3/4] overflow-hidden bg-[var(--card-bg)] cursor-pointer">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
              />

              {/* Badge */}
              {product.badge && (
                <span className="absolute top-6 left-6 bg-[var(--text-primary)] text-[var(--page-bg)] text-[10px] font-bold px-3 py-1 uppercase tracking-widest z-10">
                  {product.badge}
                </span>
              )}

              {/* Minimalist Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="absolute inset-x-0 bottom-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 opacity-0 group-hover:opacity-100">
                <h3 className="text-2xl font-heading font-medium text-[var(--accent-color)] mb-2 italic tracking-wide">{product.name}</h3>
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-lg font-light text-[var(--text-primary)]">{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-[var(--text-muted)] line-through">{product.originalPrice}</span>
                  )}
                </div>

                <button className="w-full border border-[var(--accent-color)] text-[var(--accent-color)] py-3 text-xs font-bold uppercase tracking-[0.2em] hover:bg-[var(--accent-color)] hover:text-black transition-all duration-300">
                  Add to Bag
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link href="/products" className="text-[var(--text-primary)] uppercase tracking-widest text-sm font-bold border-b border-[var(--text-primary)] pb-1">
            View All Collection
          </Link>
        </div>
      </div>
    </section>
  );
}
