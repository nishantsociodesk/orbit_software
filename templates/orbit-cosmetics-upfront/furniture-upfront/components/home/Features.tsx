import { Truck, Shield, Clock, Award } from "lucide-react";

const FEATURES = [
    {
        icon: Truck,
        title: "Free Shipping",
        desc: "On all orders over ₹75,000. White glove delivery options available.",
    },
    {
        icon: Shield,
        title: "10-Year Warranty",
        desc: "We stand by our craftsmanship with a comprehensive warranty.",
    },
    {
        icon: Clock,
        title: "100-Day Trial",
        desc: "Try it in your home. If you don't love it, we'll take it back.",
    },
    {
        icon: Award,
        title: "Sustainable Materials",
        desc: "Ethically sourced woods and eco-friendly fabrics.",
    },
];

export default function Features() {
    return (
        <section className="py-24 bg-white border-b border-gray-100">
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                    {FEATURES.map((feature, idx) => (
                        <div key={idx} className="flex flex-col items-center text-center group">
                            <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-6 text-gray-900 group-hover:bg-gray-950 group-hover:text-white transition-colors duration-300">
                                <feature.icon className="w-8 h-8" strokeWidth={1.5} />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2 font-serif">
                                {feature.title}
                            </h3>
                            <p className="text-sm text-gray-500 leading-relaxed max-w-[250px]">
                                {feature.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
