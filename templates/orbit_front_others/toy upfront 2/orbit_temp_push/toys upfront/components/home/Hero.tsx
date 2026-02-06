import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-yellow-50 pt-16 pb-20 lg:pt-24 lg:pb-28">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    {/* Text Content */}
                    <div className="flex-1 text-center lg:text-left z-10">
                        <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-white border border-orange-100 text-orange-600 font-semibold text-sm shadow-sm">
                            ✨ Making childhood magical
                        </div>
                        <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 font-display leading-[1.1]">
                            Play, Learn, & <br /> <span className="text-primary">Grow Together</span>
                        </h1>
                        <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                            Discover the safest, most engaging toys designed to spark creativity
                            and joy in every child. From educational puzzles to outdoor fun!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Link
                                href="/category/all"
                                className="inline-flex items-center justify-center px-8 py-3.5 text-base font-bold text-white bg-primary rounded-full hover:bg-orange-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            >
                                Shop Now
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                            <Link
                                href="/category/new-arrivals"
                                className="inline-flex items-center justify-center px-8 py-3.5 text-base font-bold text-gray-700 bg-white border-2 border-gray-100 rounded-full hover:border-primary/20 hover:bg-gray-50 transition-all shadow-sm"
                            >
                                New Arrivals ✨
                            </Link>
                        </div>
                    </div>

                    {/* Hero Image / Illustration */}
                    <div className="flex-1 relative w-full max-w-lg lg:max-w-xl">
                        <div className="relative aspect-square rounded-full bg-accent/20 p-8 animate-in fade-in zoom-in duration-700">
                            {/* Decorative elements */}
                            <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/30 rounded-full blur-2xl"></div>
                            <div className="absolute bottom-12 left-0 w-32 h-32 bg-primary/20 rounded-full blur-2xl"></div>

                            {/* Main visual - using the uploaded image */}
                            <div className="w-full h-full rounded-full bg-white border-4 border-white shadow-2xl overflow-hidden relative">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src="/hero-image.jpg"
                                    alt="Happy kids playing"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Floating cards */}
                            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg border border-gray-50 transform rotate-3 animate-bounce duration-[3000ms]">
                                <span className="block text-2xl mb-1">⭐ 4.9/5</span>
                                <span className="text-sm text-gray-500 font-medium">Happy Parents</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
