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
  { id: 1, name: 'Premium Wireless Earbuds', price: formatINR(usdToInr(179.99)), originalPrice: formatINR(usdToInr(249.99)), image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&h=600&fit=crop', badge: 'Best Seller' },
  { id: 2, name: '4K Ultra HD Monitor', price: formatINR(usdToInr(399.99)), originalPrice: formatINR(usdToInr(499.99)), image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&h=600&fit=crop', badge: 'New' },
  { id: 3, name: 'Ergonomic Office Chair', price: formatINR(usdToInr(349.99)), originalPrice: formatINR(usdToInr(449.99)), image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&h=600&fit=crop', badge: 'Sale' },
];

export default function FeaturedProducts() {
  return (
    <section
      id="featured"
      className="py-16 transition-colors duration-300 relative overflow-hidden"
      style={{ backgroundColor: 'var(--page-bg)' }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_rgba(0,240,255,0.05),_transparent_40%)]"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black mb-4 font-heading tracking-tight" style={{ color: 'var(--text)' }}>
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-blue)] to-[var(--accent-purple)]">Selection</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-muted)' }}>
            Handpicked favorites from our collection
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="relative rounded-xl overflow-hidden hover:shadow-[0_0_20px_rgba(0,240,255,0.15)] transition-all duration-300 border group glass"
              style={{ borderColor: 'var(--card-border)' }}
            >
              {product.badge && (
                <span className="absolute top-4 left-4 z-10 px-3 py-1 bg-[var(--accent-purple)] text-white text-xs font-bold rounded shadow-[0_0_10px_rgba(189,0,255,0.5)]">
                  {product.badge}
                </span>
              )}
              <div className="aspect-square bg-black/50 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-90 group-hover:opacity-100" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text)' }}>{product.name}</h3>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl font-bold neon-text-blue" style={{ color: 'var(--text)' }}>{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm line-through text-gray-500">{product.originalPrice}</span>
                  )}
                </div>
                <button
                  className="w-full px-6 py-3 rounded font-bold transition-all hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] hover:scale-[1.02] bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)]"
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
