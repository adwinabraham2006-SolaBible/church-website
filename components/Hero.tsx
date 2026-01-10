'use client';

import Link from 'next/link';
import { MapPin, Clock } from 'lucide-react';

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

        {/* Service Times */}
        <div className="bg-white/95 backdrop-blur-sm text-neutral-900 rounded-2xl shadow-2xl max-w-4xl mx-auto p-6 md:p-8 mb-8">
          <div className="flex items-center justify-center mb-4">
            <Clock className="w-6 h-6 text-primary-600 mr-2" />
            <h2 className="text-2xl md:text-3xl font-bold">Service Times</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4 md:gap-6 text-center">
            <div className="p-4 bg-primary-50 rounded-lg">
              <div className="text-lg font-semibold text-primary-900">Sunday Morning</div>
              <div className="text-3xl font-bold text-primary-600 my-2">9:00 AM</div>
              <div className="text-sm text-neutral-600">Traditional Service</div>
            </div>
            <div className="p-4 bg-primary-50 rounded-lg">
              <div className="text-lg font-semibold text-primary-900">Sunday Morning</div>
              <div className="text-3xl font-bold text-primary-600 my-2">11:00 AM</div>
              <div className="text-sm text-neutral-600">Contemporary Service</div>
            </div>
            <div className="p-4 bg-primary-50 rounded-lg">
              <div className="text-lg font-semibold text-primary-900">Wednesday Evening</div>
              <div className="text-3xl font-bold text-primary-600 my-2">7:00 PM</div>
              <div className="text-sm text-neutral-600">Bible Study & Prayer</div>
            </div>
          </div>

          {/* Location */}
          <div className="mt-6 pt-6 border-t border-neutral-200">
            <div className="flex items-center justify-center text-neutral-700">
              <MapPin className="w-5 h-5 text-primary-600 mr-2 flex-shrink-0" />
              <Link
                href="https://maps.google.com/?q=219+King+Circle,+Temple,+TX+76501"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-600 transition-colors text-lg"
              >
                219 King Circle, Temple, TX 76501
              </Link>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <Link
            href="/about/visit"
            className="btn-primary text-lg px-8 py-4"
          >
            Plan Your Visit
          </Link>
        </div>
      </div>
    </section>
  );
}
