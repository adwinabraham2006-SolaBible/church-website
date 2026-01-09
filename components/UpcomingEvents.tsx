'use client';

import { useState } from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';
import EventRegistrationModal from './EventRegistrationModal';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  imageUrl: string;
  category: string;
}

const events: Event[] = [
  {
    id: 1,
    title: 'Community Outreach Day',
    date: '2024-02-10',
    time: '9:00 AM - 3:00 PM',
    location: 'City Community Center',
    description: 'Join us as we serve our community through practical acts of love and service. Activities include food distribution, home repairs, and community cleanup.',
    imageUrl: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=800',
    category: 'Outreach',
  },
  {
    id: 2,
    title: 'Marriage Enrichment Weekend',
    date: '2024-02-17',
    time: 'Friday 7:00 PM - Sunday 12:00 PM',
    location: 'Mountain Retreat Center',
    description: 'A transformative weekend designed to strengthen marriages through biblical teaching, practical workshops, and quality time together.',
    imageUrl: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=800',
    category: 'Marriage',
  },
  {
    id: 3,
    title: 'Youth Winter Camp',
    date: '2024-02-23',
    time: 'Friday 5:00 PM - Sunday 2:00 PM',
    location: 'Camp Pine Ridge',
    description: 'An unforgettable weekend of worship, teaching, games, and fellowship for students grades 6-12. Theme: "Unshakeable Faith"',
    imageUrl: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=800',
    category: 'Youth',
  },
  {
    id: 4,
    title: 'Women&apos;s Bible Study: Esther',
    date: '2024-02-15',
    time: '7:00 PM - 8:30 PM',
    location: 'Church Fellowship Hall',
    description: 'Join us for an 8-week study on the book of Esther. Discover how God works through ordinary people in extraordinary circumstances.',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800',
    category: 'Bible Study',
  },
];

export default function UpcomingEvents() {
  const [selectedEvent, setSelectedEvent] = useState<{ id: number; title: string } | null>(null);

  const handleRegister = (eventId: number, eventTitle: string) => {
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
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Connect, grow, and serve together through our community events and programs
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              {/* Event Image */}
              <div className="relative h-56 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transform hover:scale-105 transition-transform duration-500"
                  style={{ backgroundImage: `url('${event.imageUrl}')` }}
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
                  onClick={() => handleRegister(event.id, event.title)}
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
          eventId={selectedEvent.id}
        />
      )}
    </section>
  );
}
