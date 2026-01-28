'use client';

export default function Hero() {
  return (
    <section className="relative w-full h-[500px] md:h-[600px] overflow-hidden flex items-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0 transition-transform duration-700 hover:scale-105"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1556656793-02f1ba1849e7?q=80&w=2000&auto=format&fit=crop")',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white">
        <div className="max-w-2xl animate-fade-in-up">
          <span className="inline-block py-1 px-3 rounded-full bg-[#E7F874] text-black text-sm font-bold mb-6 tracking-wide">
            UPFRONT ELECTRONICS WEEK
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
            Next-gen <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Electronics
            </span>
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-200">
            Curated devices, smart accessories, and audio gear built for everyday performance. <br />
            Save up to <span className="text-[#E7F874] font-bold">40% OFF</span> this week.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#products"
              className="px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-[#E7F874] transition-colors duration-300 shadow-lg text-center"
            >
              Shop Collection
            </a>
            <a
              href="#featured"
              className="px-8 py-4 border border-white/30 text-white rounded-full font-bold hover:bg-white/10 transition-colors duration-300 backdrop-blur-sm text-center"
            >
              Explore Features
            </a>
          </div>
          <div className="mt-8 flex flex-wrap gap-3 text-sm text-white/90">
            <span className="px-3 py-1 rounded-full border border-white/30 bg-white/10">48-hour dispatch</span>
            <span className="px-3 py-1 rounded-full border border-white/30 bg-white/10">1-year warranty</span>
            <span className="px-3 py-1 rounded-full border border-white/30 bg-white/10">Easy 30-day returns</span>
          </div>
        </div>
      </div>
    </section>
  );
}
