"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-gray-50 border-t border-gray-200 pt-20 pb-10">
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
                    {/* Brand & Newsletter */}
                    <div className="lg:col-span-1">
                        <Link href="/" className="inline-block mb-6">
                            <span className="text-xl font-bold tracking-[0.2em] text-gray-950 uppercase border-2 border-gray-950 px-3 py-1">
                                Lusine
                            </span>
                        </Link>
                        <p className="text-gray-500 text-sm leading-relaxed mb-6">
                            Elevating living spaces with timeless design and unparalleled comfort. Crafted for the modern home.
                        </p>
                        <div className="space-y-3">
                            <h4 className="text-sm font-medium uppercase tracking-wider text-gray-900">Subscribe for updates</h4>
                            <div className="flex gap-2">
                                <Input placeholder="Email address" className="bg-white border-gray-300 focus-visible:ring-gray-400" />
                                <Button className="bg-gray-900 text-white hover:bg-gray-800">Join</Button>
                            </div>
                        </div>
                    </div>

                    {/* Links 1 */}
                    <div>
                        <h4 className="text-sm font-medium uppercase tracking-wider text-gray-900 mb-6">Shop</h4>
                        <ul className="space-y-4">
                            {["Living Room", "Bedroom", "Dining", "Office", "Decor", "Sale"].map(item => (
                                <li key={item}>
                                    <Link href="#" className="text-gray-500 hover:text-gray-900 text-sm transition-colors">{item}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Links 2 */}
                    <div>
                        <h4 className="text-sm font-medium uppercase tracking-wider text-gray-900 mb-6">Support</h4>
                        <ul className="space-y-4">
                            {["Contact Us", "Shipping & Delivery", "Returns & Exchanges", "Warranty", "FAQ", "Track Order"].map(item => (
                                <li key={item}>
                                    <Link href="#" className="text-gray-500 hover:text-gray-900 text-sm transition-colors">{item}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Links 3 */}
                    <div>
                        <h4 className="text-sm font-medium uppercase tracking-wider text-gray-900 mb-6">Company</h4>
                        <ul className="space-y-4">
                            {["About Us", "Sustainability", "Careers", "Press", "Showrooms", "Privacy Policy"].map(item => (
                                <li key={item}>
                                    <Link href="#" className="text-gray-500 hover:text-gray-900 text-sm transition-colors">{item}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-gray-400">
                        © 2026 Lusine Furniture. All rights reserved. Designed with precision.
                    </p>
                    <div className="flex gap-4">
                        <Button variant="ghost" size="icon" className="hover:bg-gray-200 text-gray-500 rounded-full h-8 w-8">
                            <Instagram className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="hover:bg-gray-200 text-gray-500 rounded-full h-8 w-8">
                            <Facebook className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="hover:bg-gray-200 text-gray-500 rounded-full h-8 w-8">
                            <Twitter className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="hover:bg-gray-200 text-gray-500 rounded-full h-8 w-8">
                            <Linkedin className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </footer>
    );
}
