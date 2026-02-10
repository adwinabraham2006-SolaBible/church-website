'use client';

import { useState } from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';
import EventRegistrationModal from './EventRegistrationModal';
import { urlFor } from '@/lib/sanity.image';
import type { Event } from '@/types/sanity';

interface EventWithImageUrl {
  _id: string;
  title: string;
  slug: { current: string };
  date: string;
  time: string;
  location: string;
  description: string;
  featuredImage?: unknown;
  imageUrl?: string;
  category: string;
}

interface Props {
  events: EventWithImageUrl[];
}

function getImageUrl(event: EventWithImageUrl): string {
  if (event.imageUrl) {
    return event.imageUrl;
  }
  if (event.featuredImage) {
    return urlFor(event.featuredImage as Event['featuredImage']).width(800).height(600).url();
  }
  return 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=800';
}

export default function UpcomingEventsClient({ events }: Props) {
  const [selectedEvent, setSelectedEvent] = useState<{ id: string; title: string } | null>(null);

  const handleRegister = (eventId: string, eventTitle: string) => {
    setSelectedEvent({ id: eventId, title: eventTitle });
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  return (
    <section className="section-padding bg-neutral-100">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4 font-serif">
            Upcoming Events
          </h2>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {events.map((event) => (
            <div
              key={event._id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              {/* Event Image */}
              <div className="relative h-56 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transform hover:scale-105 transition-transform duration-500"
                  style={{ backgroundImage: `url('${getImageUrl(event)}')` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 to-transparent"></div>
                </div>
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-primary-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {event.category}
                  </span>
                </div>
              </div>

              {/* Event Details */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-neutral-900 mb-3">
                  {event.title}
                </h3>

                {/* Meta Information */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-start text-neutral-600">
                    <Calendar className="w-5 h-5 mr-3 text-primary-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold">
                        {new Date(event.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start text-neutral-600">
                    <Clock className="w-5 h-5 mr-3 text-primary-600 flex-shrink-0 mt-0.5" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-start text-neutral-600">
                    <MapPin className="w-5 h-5 mr-3 text-primary-600 flex-shrink-0 mt-0.5" />
                    <span>{event.location}</span>
                  </div>
                </div>

                <p className="text-neutral-600 mb-6 leading-relaxed">
                  {event.description}
                </p>

                <button
                  onClick={() => handleRegister(event._id, event.title)}
                  className="w-full btn-primary"
                >
                  Register Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Events Link */}
        <div className="text-center">
          <a
            href="/events"
            className="btn-outline inline-block"
          >
            View Full Calendar
          </a>
        </div>
      </div>

      {/* Event Registration Modal */}
      {selectedEvent && (
        <EventRegistrationModal
          isOpen={!!selectedEvent}
          onClose={closeModal}
          eventTitle={selectedEvent.title}
          eventId={parseInt(selectedEvent.id) || 0}
        />
      )}
    </section>
  );
}
