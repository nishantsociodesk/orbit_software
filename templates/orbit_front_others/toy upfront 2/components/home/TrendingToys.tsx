"use client";

import Link from "next/link";
import { Star, ShoppingCart, Heart } from "lucide-react";
import ProductCard from "../ui/ProductCard";
import { useEffect, useState } from "react";
import { getProducts, type Product } from "@/lib/products-api";

export default function TrendingToys() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await getProducts();
                // Show first 8 products or featured products
                setProducts(data.slice(0, 8));
            } catch (error) {
                console.error('Failed to load products:', error);
            } finally {
                setLoading(false);
            }
        };
        loadProducts();
    }, []);

    return (
        <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold font-display text-gray-900 mb-2">
                            {loading ? "Loading..." : "Our Products"}
                        </h2>
                        <p className="text-gray-500">
                            {products.length > 0 
                                ? `Browse our collection of ${products.length} amazing products!`
                                : "Add products to your store to get started"}
                        </p>
                    </div>
                    <Link
                        href="/category/all"
                        className="hidden md:block text-primary font-bold hover:underline"
                    >
                        View All →
                    </Link>
                </div>

                {loading ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500">Loading products...</p>
                    </div>
                ) : products.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <p className="text-gray-500 text-lg mb-4">No products yet!</p>
                        <p className="text-gray-400">Go to your Orbit-360 dashboard to add products.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}

                {!loading && products.length > 0 && (
                    <div className="mt-8 text-center md:hidden">
                        <Link
                            href="/category/all"
                            className="text-primary font-bold hover:underline"
                        >
                            View All Products →
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}
