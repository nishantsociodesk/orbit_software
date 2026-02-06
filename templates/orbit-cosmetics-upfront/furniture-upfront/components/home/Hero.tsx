"use client";

import { Button } from "@/components/ui/button";

export default function Hero() {
    return (
        <section className="relative h-[90vh] w-full bg-[#f4f4f4] overflow-hidden flex items-center justify-center">
            {/* Background Image Container */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://khezjineirmnudkxmzxw.supabase.co/storage/v1/object/public/images/textures/a_realistic_light-filled_living_room_scene_featuring_a_modular_as_the_central_element_styled_in_a_c_owhudusvejc04drorj9f_0.jfif"
                    alt="Luxury Living Room"
                    className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-black/10" />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center max-w-4xl px-4 animate-in fade-in slide-in-from-bottom-5 duration-1000">
                <h2 className="text-white/90 text-sm md:text-base font-medium uppercase tracking-[0.3em] mb-4 drop-shadow-sm">
                    The New Collection
                </h2>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-tight mb-8 font-serif drop-shadow-md">
                    Timeless Comfort.
                    <br />
                    Modern Living.
                </h1>
                <p className="text-white/90 text-lg md:text-xl font-light max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow-sm">
                    Discover furniture designed to elevate your everyday.
                    Crafted with precision, built for life.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                        size="lg"
                        className="bg-white text-gray-950 hover:bg-gray-100 text-base px-10 py-7 rounded-full transition-all hover:scale-105"
                    >
                        Shop Collection
                    </Button>
                    <Button
                        size="lg"
                        variant="outline"
                        className="bg-transparent text-white border-white hover:bg-white/20 text-base px-10 py-7 rounded-full transition-all hover:scale-105 backdrop-blur-sm"
                    >
                        View Lookbook
                    </Button>
                </div>
            </div>
        </section>
    );
}
