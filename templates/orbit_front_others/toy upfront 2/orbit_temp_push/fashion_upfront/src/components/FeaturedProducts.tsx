'use client';

interface FeaturedProduct {
  id: number;
  name: string;
  price: string;
  originalPrice?: string;
  image: string;
  badge?: string;
}

// Convert USD to INR (approximate rate: 1 USD = 83 INR)
const usdToInr = (usd: number) => Math.round(usd * 83);
const formatINR = (amount: number) => `₹${amount.toLocaleString('en-IN')}`;

const featuredProducts: FeaturedProduct[] = [
  { id: 101, name: 'Floral Summer Dress', price: formatINR(usdToInr(49.99)), originalPrice: formatINR(usdToInr(79.99)), image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&h=600&fit=crop', badge: 'Best Seller' },
  { id: 102, name: 'Designer Denim Jacket', price: formatINR(usdToInr(89.99)), originalPrice: formatINR(usdToInr(129.99)), image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=600&h=600&fit=crop', badge: 'New' },
  { id: 103, name: 'Classic Leather Boots', price: formatINR(usdToInr(149.99)), originalPrice: formatINR(usdToInr(199.99)), image: 'https://images.unsplash.com/photo-1542280756-74b2f55e73ab?w=600&h=600&fit=crop', badge: 'Sale' },
];

export default function FeaturedProducts() {
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
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
                <button
                  className="w-full px-6 py-3 rounded-md font-semibold transition-opacity hover:opacity-90"
                  style={{ backgroundColor: 'var(--header-text)', color: 'var(--header-bg)' }}
                >
                  Shop Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
