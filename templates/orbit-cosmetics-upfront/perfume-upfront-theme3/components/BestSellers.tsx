import ProductCard from "./ProductCard";

import { products } from "@/lib/data";

const PRODUCTS = products.slice(0, 4);

export default function BestSellers() {
    return (
        <section className="py-20 px-4 md:px-8 bg-[#EAE5D8]">
            <div className="container mx-auto">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <span className="text-[#8D6E63] uppercase tracking-widest text-xs font-bold font-sans">Our Collection</span>
                        <h2 className="text-3xl md:text-5xl font-serif mt-2 text-[#2C2621]">Best Sellers & Trending</h2>
                    </div>
                    <a href="/shop" className="hidden md:block text-xs uppercase tracking-[0.2em] font-bold border-b border-[#2C2621]/20 pb-1 hover:text-[#4A4238] hover:border-[#4A4238] transition-colors text-[#5D554A]">
                        View All
                    </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {PRODUCTS.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                <div className="mt-12 text-center md:hidden">
                    <a href="/shop" className="text-xs uppercase tracking-[0.2em] font-bold border-b border-[#2C2621]/20 pb-1 text-[#5D554A]">
                        View All
                    </a>
                </div>
            </div>
        </section>
    );
}
