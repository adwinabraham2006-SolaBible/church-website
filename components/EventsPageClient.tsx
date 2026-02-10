'use client';

import { useState } from 'react';
import { Calendar as CalendarIcon, MapPin, Clock, Filter } from 'lucide-react';
import EventRegistrationModal from '@/components/EventRegistrationModal';
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

const categories = ['All', 'Worship', 'Outreach', 'Youth', 'Bible Study', 'Fellowship', 'Marriage', 'Music'];

function getImageUrl(event: EventWithImageUrl): string {
  if (event.imageUrl) {
    return event.imageUrl;
  }
  if (event.featuredImage) {
    return urlFor(event.featuredImage as Event['featuredImage']).width(800).height(600).url();
  }
  return 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=800';
}

export default function EventsPageClient({ events }: Props) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedEvent, setSelectedEvent] = useState<{ id: string; title: string } | null>(null);

  const filteredEvents =
    selectedCategory === 'All'
      ? events
      : events.filter((event) => event.category === selectedCategory);

  const handleRegister = (eventId: string, eventTitle: string) => {
    setSelectedEvent({ id: eventId, title: eventTitle });
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-700 via-primary-600 to-primary-500 text-white py-20 md:py-28">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <CalendarIcon className="w-16 h-16 mx-auto mb-6 opacity-90" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-serif">
              Events & Calendar
            </h1>
            <p className="text-xl md:text-2xl text-primary-50 leading-relaxed">
              Stay connected with everything happening in our church community
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="bg-white border-b border-neutral-200 py-6 sticky top-20 z-40">
        <div className="container-custom">
          <div className="flex items-center gap-4 overflow-x-auto">
            <div className="flex items-center gap-2 text-neutral-600 flex-shrink-0">
              <Filter className="w-5 h-5" />
              <span className="font-semibold">Filter:</span>
            </div>
            <div className="flex gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full font-medium transition-colors whitespace-nowrap ${
                    selectedCategory === category
                      ? 'bg-primary-600 text-white'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          {filteredEvents.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event) => (
                <div
                  key={event._id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                >
                  {/* Event Image */}
                  <div className="relative h-48 overflow-hidden">
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
                    {/* Date Badge */}
                    <div className="absolute bottom-4 right-4 bg-white rounded-lg p-2 text-center shadow-lg">
                      <div className="text-xs font-semibold text-neutral-600 uppercase">
                        {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                      </div>
                      <div className="text-2xl font-bold text-neutral-900">
                        {new Date(event.date).getDate()}
                      </div>
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-neutral-900 mb-3">{event.title}</h3>

                    <div className="space-y-2 mb-4 text-sm">
                      <div className="flex items-center text-neutral-600">
                        <CalendarIcon className="w-4 h-4 mr-2 text-primary-600 flex-shrink-0" />
                        <span>
                          {new Date(event.date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                      <div className="flex items-center text-neutral-600">
                        <Clock className="w-4 h-4 mr-2 text-primary-600 flex-shrink-0" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-start text-neutral-600">
                        <MapPin className="w-4 h-4 mr-2 text-primary-600 flex-shrink-0 mt-0.5" />
                        <span>{event.location}</span>
                      </div>
                    </div>

                    <p className="text-neutral-600 text-sm mb-4 line-clamp-2">
                      {event.description}
                    </p>

                    <button
                      onClick={() => handleRegister(event._id, event.title)}
                      className="w-full btn-primary"
                    >
                      Register
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <CalendarIcon className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-neutral-600 mb-2">
                No events in this category
              </h3>
              <p className="text-neutral-500">
                Check back soon or select a different category
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6 font-serif">
              Stay Updated
            </h2>
            <p className="text-lg text-neutral-600 mb-8">
              Want to receive updates about upcoming events and activities? Contact us to join our mailing list.
            </p>
            <a href="/contact" className="btn-primary">
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* Event Registration Modal */}
      {selectedEvent && (
        <EventRegistrationModal
          isOpen={!!selectedEvent}
          onClose={closeModal}
          eventTitle={selectedEvent.title}
          eventId={parseInt(selectedEvent.id) || 0}
        />
      )}
    </main>
  );
}
