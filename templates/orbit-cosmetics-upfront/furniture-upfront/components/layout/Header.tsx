"use client";

import Link from "next/link";
import { Search, ShoppingBag, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState, useEffect } from "react";

const NAV_LINKS = [
    { name: "Living Room", href: "#" },
    { name: "Bedroom", href: "#" },
    { name: "Dining", href: "#" },
    { name: "Office", href: "#" },
    { name: "Decor", href: "#" },
];

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${isScrolled
                    ? "bg-white/80 backdrop-blur-md border-gray-200 py-3 shadow-sm"
                    : "bg-transparent border-transparent py-5"
                }`}
        >
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                {/* Mobile Menu */}
                <div className="lg:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="hover:bg-black/5">
                                <Menu className="w-6 h-6 text-gray-900" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                            <nav className="flex flex-col gap-4 mt-8">
                                <Link href="#" className="text-2xl font-bold tracking-tighter mb-4">
                                    LUSINE
                                </Link>
                                {NAV_LINKS.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className="text-lg font-medium text-gray-600 hover:text-black transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>

                {/* Logo */}
                <div className="flex-shrink-0 lg:flex-1">
                    <Link href="/" className="flex items-center gap-2 group">
                        <span className="text-2xl font-bold tracking-[0.2em] text-gray-950 uppercase border-2 border-gray-950 px-3 py-1 bg-white group-hover:bg-gray-950 group-hover:text-white transition-colors duration-300">
                            Lusine
                        </span>
                    </Link>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex items-center gap-8 lg:gap-12">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-gray-600 hover:text-black tracking-wide uppercase transition-colors relative after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:h-[1px] after:w-0 after:bg-black after:transition-all hover:after:w-full"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link
                        href="#"
                        className="text-sm font-medium text-[#C46245] hover:text-[#a04530] tracking-wide uppercase transition-colors"
                    >
                        Sale
                    </Link>
                </nav>

                {/* Icons */}
                <div className="flex items-center gap-2 lg:flex-1 justify-end">
                    <Button variant="ghost" size="icon" className="hover:bg-black/5 hidden sm:flex">
                        <Search className="w-5 h-5 text-gray-900" />
                    </Button>
                    <Button variant="ghost" size="icon" className="hover:bg-black/5 hidden sm:flex">
                        <User className="w-5 h-5 text-gray-900" />
                    </Button>
                    <Button variant="ghost" size="icon" className="hover:bg-black/5 relative">
                        <ShoppingBag className="w-5 h-5 text-gray-900" />
                        <Badge className="absolute top-1 right-1 h-4 w-4 flex items-center justify-center p-0 bg-black text-white text-[10px]">
                            0
                        </Badge>
                    </Button>
                </div>
            </div>
        </header>
    );
}
