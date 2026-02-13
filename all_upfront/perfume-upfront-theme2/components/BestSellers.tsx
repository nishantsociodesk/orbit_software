import ProductCard from "./ProductCard";

import { products } from "@/lib/data";

const PRODUCTS = products.slice(0, 4);

export default function BestSellers() {
    return (
        <section className="py-16 px-4 md:px-8 bg-white">
            <div className="container mx-auto">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <span className="text-gold-500 uppercase tracking-widest text-xs font-bold font-sans">Our Collection</span>
                        <h2 className="text-3xl md:text-4xl font-serif mt-2 text-black">Best Sellers & Trending</h2>
                    </div>
                    <a href="/shop" className="hidden md:block text-sm uppercase tracking-widest font-bold border-b border-black pb-1 hover:text-gold-600 hover:border-gold-600 transition-colors">
                        View All
                    </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {PRODUCTS.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                <div className="mt-12 text-center md:hidden">
                    <a href="/shop" className="text-sm uppercase tracking-widest font-bold border-b border-black pb-1">
                        View All
                    </a>
                </div>
            </div>
        </section>
    );
}
