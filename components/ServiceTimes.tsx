'use client';

import Link from 'next/link';
import { MapPin, Clock } from 'lucide-react';

export default function ServiceTimes() {
  return (
    <section className="section-padding bg-neutral-100">
      <div className="container-custom">
        {/* Service Times */}
        <div className="bg-white/95 backdrop-blur-sm text-neutral-900 rounded-2xl shadow-2xl max-w-4xl mx-auto p-6 md:p-8">
          <div className="flex items-center justify-center mb-4">
            <Clock className="w-6 h-6 text-primary-600 mr-2" />
            <h2 className="text-2xl md:text-3xl font-bold">Service Times</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4 md:gap-6 text-center max-w-2xl mx-auto">
            <div className="p-4 bg-primary-50 rounded-lg">
              <div className="text-lg font-semibold text-primary-900">Sunday Morning</div>
              <div className="text-3xl font-bold text-primary-600 my-2">9:00 AM</div>
              <div className="text-sm text-neutral-600">Old Testament Survey</div>
            </div>
            <div className="p-4 bg-primary-50 rounded-lg">
              <div className="text-lg font-semibold text-primary-900">Sunday Morning</div>
              <div className="text-3xl font-bold text-primary-600 my-2">10:45 AM</div>
              <div className="text-sm text-neutral-600">Morning Service</div>
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
      </div>
    </section>
  );
}
