"use client";

import Link from "next/link";
import { Search, ShoppingCart, Heart, User, Menu, X } from "lucide-react";
import { useState } from "react";
import AnnouncementBar from "./AnnouncementBar";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useStore } from "@/context/StoreContext";
import Image from "next/image";

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { wishlist } = useWishlist();
    const { cartCount } = useCart();
    const { store, customization } = useStore();


    return (
        <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100/50 shadow-sm transition-all duration-300">
            {/* Colorful Top Strip */}
            <div className="h-2 w-full bg-gradient-to-r from-primary via-accent to-secondary" />

            <AnnouncementBar />

            {/* Main Header */}
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between gap-4">
                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden p-2 text-foreground/80 hover:bg-muted rounded-full transition-colors"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X /> : <Menu />}
                    </button>

                    {/* Logo - Dynamic from merchant's customization */}
                    <Link href="/" className="flex-shrink-0 group flex items-center gap-2">
                        {customization?.logo ? (
                            <div className="flex items-center gap-3">
                                <Image
                                    src={customization.logo}
                                    alt={store?.name || "Store Logo"}
                                    width={48}
                                    height={48}
                                    className="object-contain rounded-lg"
                                />
                                <span className="text-2xl font-extrabold text-foreground font-display tracking-tight leading-none">
                                    {store?.name || "Store"}
                                </span>
                            </div>
                        ) : (
                            <>
                                <div className="bg-primary/10 p-2 rounded-xl rotate-3 group-hover:rotate-6 transition-transform">
                                    <span className="text-2xl">🧸</span>
                                </div>
                                <span className="text-3xl font-extrabold text-foreground font-display tracking-tight leading-none">
                                    {store?.name || "ToyStore"}
                                    <span className="text-secondary animate-pulse">.</span>
                                </span>
                            </>
                        )}
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-2 font-medium text-foreground/80">
                        <div className="group relative cursor-pointer px-4 py-2 hover:bg-muted/50 rounded-full transition-all">
                            <span className="group-hover:text-primary transition-colors">By Age</span>
                            <div className="absolute top-full left-0 w-56 bg-white/95 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl p-2 hidden group-hover:block border border-gray-100 mt-2">
                                <Link href="/category/age-0-2" className="block px-4 py-3 hover:bg-muted/50 rounded-xl text-sm transition-colors text-foreground/80 hover:text-primary">0 - 2 Years</Link>
                                <Link href="/category/age-3-5" className="block px-4 py-3 hover:bg-muted/50 rounded-xl text-sm transition-colors text-foreground/80 hover:text-primary">3 - 5 Years</Link>
                                <Link href="/category/age-6-8" className="block px-4 py-3 hover:bg-muted/50 rounded-xl text-sm transition-colors text-foreground/80 hover:text-primary">6 - 8 Years</Link>
                                <Link href="/category/age-9-12" className="block px-4 py-3 hover:bg-muted/50 rounded-xl text-sm transition-colors text-foreground/80 hover:text-primary">9 - 12 Years</Link>
                            </div>
                        </div>
                        <Link href="/category/educational" className="px-4 py-2 hover:bg-muted/50 rounded-full hover:text-primary transition-all">Educational</Link>
                        <Link href="/category/outdoor" className="px-4 py-2 hover:bg-muted/50 rounded-full hover:text-primary transition-all">Outdoor</Link>
                        <Link href="/category/new-arrivals" className="px-4 py-2 hover:bg-muted/50 rounded-full hover:text-primary transition-all">New Arrivals</Link>
                    </nav>

                    {/* Search Bar */}
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            const formData = new FormData(e.currentTarget);
                            const query = formData.get('search');
                            if (query) {
                                window.location.href = `/category/all?search=${query}`;
                            }
                        }}
                        className="hidden md:flex flex-1 max-w-md mx-6 relative group"
                    >
                        <input
                            type="text"
                            name="search"
                            placeholder="Find something fun..."
                            className="w-full pl-11 pr-4 py-3 bg-white border border-muted/60 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 rounded-full transition-all outline-none text-sm placeholder:text-gray-400 text-foreground shadow-[0_2px_15px_rgba(0,0,0,0.03)]"
                        />
                        <button type="submit" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
                            <Search className="w-5 h-5" />
                        </button>
                    </form>

                    {/* User Actions */}
                    <div className="flex items-center gap-2">
                        <Link href="/wishlist" className="p-2.5 hover:bg-muted rounded-full transition-colors relative group text-foreground/70 hover:text-red-400">
                            <Heart className="w-6 h-6 transition-transform group-hover:scale-110" />
                            {wishlist.length > 0 && (
                                <span className="absolute top-1 right-1 w-4 h-4 bg-red-400 text-white text-[10px] font-bold flex items-center justify-center rounded-full ring-2 ring-white">
                                    {wishlist.length}
                                </span>
                            )}
                        </Link>
                        <Link href="/cart" className="p-2.5 hover:bg-muted rounded-full transition-colors relative group text-foreground/70 hover:text-primary">
                            <ShoppingCart className="w-6 h-6 transition-transform group-hover:scale-110" />
                            {cartCount > 0 && (
                                <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-white text-[10px] font-bold flex items-center justify-center rounded-full ring-2 ring-white">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                        <Link href="/profile" className="p-2.5 hover:bg-muted rounded-full transition-colors hidden sm:block text-foreground/70 hover:text-secondary group">
                            <User className="w-6 h-6 transition-transform group-hover:scale-110" />
                        </Link>
                    </div>
                </div>

                {/* Mobile Search - Visible only on mobile */}
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        const query = formData.get('search');
                        if (query) {
                            window.location.href = `/category/all?search=${query}`;
                        }
                    }}
                    className="md:hidden mt-4 relative"
                >
                    <input
                        type="text"
                        name="search"
                        placeholder="Search for toys..."
                        className="w-full pl-10 pr-4 py-2.5 bg-muted/50 rounded-full text-sm focus:outline-none border border-transparent focus:border-primary/20 focus:bg-white text-foreground placeholder:text-gray-400"
                    />
                    <button type="submit" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors">
                        <Search className="w-4 h-4" />
                    </button>
                </form>
            </div>
        </div>
    );
}
