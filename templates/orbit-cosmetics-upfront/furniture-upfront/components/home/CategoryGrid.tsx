import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function CategoryGrid() {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 font-serif mb-4">Shop by Category</h2>
                        <p className="text-gray-500">Explore our curated collections for every room.</p>
                    </div>
                    <Link href="#" className="hidden sm:flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-gray-900 hover:text-gray-600 transition-colors">
                        View All
                        <ArrowUpRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 h-auto lg:h-[800px]">
                    {/* Main Large Item */}
                    <Link href="#" className="lg:col-span-6 lg:row-span-2 group relative overflow-hidden rounded-2xl">
                        <div className="absolute inset-0 bg-gray-200">
                            <img
                                src="https://khezjineirmnudkxmzxw.supabase.co/storage/v1/object/public/images/hero/dont_change_anything_from_the_first_image_keep_the_same_shot_and_composition_just_change_the_fabric__4001127f-63b6-42c8-9133-90ded35f7c3c.png"
                                alt="Living Room"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-70 transition-opacity" />
                        <div className="absolute bottom-8 left-8 text-white">
                            <h3 className="text-2xl md:text-3xl font-medium mb-2">Living Room</h3>
                            <p className="text-white/80 font-light text-sm">Sofas, Sectionals, Coffee Tables</p>
                        </div>
                    </Link>

                    {/* Secondary Items */}
                    <Link href="#" className="lg:col-span-3 lg:row-span-1 group relative overflow-hidden rounded-2xl min-h-[300px]">
                        <div className="absolute inset-0 bg-gray-200">
                            <img
                                src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/8e13e04e-3d35-48d5-ba31-e2efa6d16c49_1600w.png"
                                alt="Bedroom"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                        <div className="absolute bottom-6 left-6 text-white">
                            <h3 className="text-xl font-medium">Bedroom</h3>
                        </div>
                    </Link>

                    <Link href="#" className="lg:col-span-3 lg:row-span-1 group relative overflow-hidden rounded-2xl min-h-[300px]">
                        <div className="absolute inset-0 bg-gray-200">
                            <img
                                src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/5485560a-749d-4b79-b4f2-5fb1321b600b_800w.png"
                                alt="Dining"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                        <div className="absolute bottom-6 left-6 text-white">
                            <h3 className="text-xl font-medium">Dining</h3>
                        </div>
                    </Link>

                    {/* Tertiary Items */}
                    <Link href="#" className="lg:col-span-3 lg:row-span-1 group relative overflow-hidden rounded-2xl min-h-[300px]">
                        <div className="absolute inset-0 bg-gray-200">
                            <img
                                src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/32174284-0f84-4664-9c43-fbe0d6f18f7f_800w.jpg"
                                alt="Decor"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                        <div className="absolute bottom-6 left-6 text-white">
                            <h3 className="text-xl font-medium">Decor</h3>
                        </div>
                    </Link>

                    <Link href="#" className="lg:col-span-3 lg:row-span-1 group relative overflow-hidden rounded-2xl min-h-[300px]">
                        <div className="absolute inset-0 bg-gray-200">
                            <img
                                src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/c29aa736-0271-48f8-a595-b30d6e787767_800w.jpg"
                                alt="Lighting"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                        <div className="absolute bottom-6 left-6 text-white">
                            <h3 className="text-xl font-medium">Lighting</h3>
                        </div>
                    </Link>

                </div>
            </div>
        </section>
    );
}
