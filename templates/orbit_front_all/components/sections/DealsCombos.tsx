import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

const combos = [
    {
        id: 1,
        name: "Movie Night Special",
        description: "2x Truffle Popcorn, 2x Sparkling Berry Fusion",
        originalPrice: 838,
        discountedPrice: 699,
        image: "/category-combos.png",
        savings: 139,
    },
    {
        id: 2,
        name: "Office Break Pack",
        description: "Gourmet Trail Mix, Cold Pressed Juice, Caffeine Boost",
        originalPrice: 749,
        discountedPrice: 599,
        image: "/category-combos.png",
        savings: 150,
    }
]

export default function DealsCombos() {
    return (
        <section className="py-16 md:py-24 bg-zinc-50">
            <div className="container mx-auto px-4 md:px-6 text-center">
                <div className="space-y-2 mb-12">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-zinc-900 uppercase italic">Great Deals & Combos</h2>
                    <p className="max-w-[700px] text-zinc-500 md:text-xl dark:text-zinc-400 mx-auto">
                        Save more with our curated selection of bundled favorites.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {combos.map((combo) => (
                        <Card key={combo.id} className="overflow-hidden border-none shadow-lg bg-white flex flex-col sm:flex-row items-center">
                            <div className="relative w-full sm:w-1/2 aspect-square">
                                <Image
                                    src={combo.image}
                                    alt={combo.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <CardContent className="p-8 text-left space-y-4 sm:w-1/2">
                                <Badge className="bg-orange-500 text-white border-none uppercase text-[10px] tracking-widest px-3 py-1">
                                    Save ₹{combo.savings}
                                </Badge>
                                <h3 className="text-2xl font-bold text-zinc-900 leading-tight uppercase">{combo.name}</h3>
                                <p className="text-zinc-500 text-sm leading-relaxed">{combo.description}</p>
                                <div className="flex items-baseline gap-3">
                                    <span className="text-3xl font-extrabold text-primary">₹{combo.discountedPrice}</span>
                                    <span className="text-lg text-zinc-400 line-through decoration-zinc-400/50">₹{combo.originalPrice}</span>
                                </div>
                                <Button className="w-full sm:w-auto px-8 font-bold uppercase tracking-widest">Add Combo</Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
