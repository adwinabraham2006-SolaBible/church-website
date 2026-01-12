'use client';

import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative h-[600px] md:h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1438032005730-c779502df39b?q=80&w=2070')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/80 via-neutral-900/70 to-neutral-900/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom text-center text-white">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 font-serif">
          Welcome
        </h1>
        <p className="text-xl md:text-2xl lg:text-3xl mb-8 md:mb-12 text-neutral-100 max-w-3xl mx-auto">
          A High View of God, A High View of Scripture
        </p>

        {/* CTA Button */}
        <div className="flex justify-center">
          <Link
            href="/about/visit"
            className="btn-primary text-lg px-8 py-4"
          >
            Distinctives
          </Link>
        </div>
      </div>
    </section>
  );
}
