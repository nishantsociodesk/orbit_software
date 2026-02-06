"use client";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

const PRODUCTS = [
    {
        name: "Delano Corner Sofa",
        price: "₹1,99,999",
        image: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/de615810-2477-4b2a-a46f-bbb9871b0fc5_800w.png",
        tag: "Best Seller"
    },
    {
        name: "Lusine Accent Chair",
        price: "₹71,999",
        image: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/43b49b8e-7b66-47d4-8724-6950bd210b9a_800w.jpg",
        tag: "New"
    },
    {
        name: "Minimalist Coffee Table",
        price: "₹36,000",
        image: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/278606fa-b428-49f5-a8f0-f5ca3d8581de_800w.jpg"
    },
    {
        name: "Velvet Ottoman",
        price: "₹23,999",
        image: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/0e15a0f3-7f1a-4a39-bd51-2fe39c2f7e61_320w.jpg"
    },
    {
        name: "Modular Sectional",
        price: "₹2,56,000",
        image: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/cb4a28ea-dfc1-4c82-a8c0-b0f9c9eb6ee4_1600w.png",
        tag: "Trending"
    }
];

function ProductCard({ product }: { product: any }) {
    return (
        <div className="group relative">
            <div className="aspect-[3/4] overflow-hidden rounded-xl bg-[#F5F5F0] relative mb-4">
                {product.tag && (
                    <span className="absolute top-3 left-3 bg-white px-2 py-1 text-[10px] uppercase font-bold tracking-wider z-10">
                        {product.tag}
                    </span>
                )}
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button className="w-full bg-white text-gray-950 hover:bg-gray-100 shadow-md">
                        Add to Cart
                    </Button>
                </div>
            </div>
            <h3 className="text-base font-medium text-gray-900">{product.name}</h3>
            <p className="text-sm text-gray-500 mt-1">{product.price}</p>
        </div>
    );
}

export default function FeaturedProducts() {
    return (
        <section className="py-24 bg-[#FAFAFA]">
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 font-serif mb-4">Featured Collection</h2>
                    <p className="text-gray-500 max-w-lg mx-auto">Handpicked favorites that combine aesthetic appeal with functional design.</p>
                </div>

                <Carousel className="w-full">
                    <CarouselContent className="-ml-4">
                        {PRODUCTS.map((product, idx) => (
                            <CarouselItem key={idx} className="pl-4 md:basis-1/3 lg:basis-1/4">
                                <ProductCard product={product} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <div className="flex justify-end gap-2 mt-8 px-4">
                        <CarouselPrevious className="static translate-y-0" />
                        <CarouselNext className="static translate-y-0" />
                    </div>
                </Carousel>
            </div>
        </section>
    );
}
