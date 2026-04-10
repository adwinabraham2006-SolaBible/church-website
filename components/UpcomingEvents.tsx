import { unstable_noStore as noStore } from 'next/cache';
import { supabaseAdmin, supabase } from '@/lib/supabase';
import type { Event } from '@/lib/types';
import UpcomingEventsClient from './UpcomingEventsClient';

export default async function UpcomingEvents() {
  noStore();

  const today = new Date().toISOString().split('T')[0];
  const client = supabaseAdmin || supabase;

  const { data: events } = await client
    .from('events')
    .select('*')
    .gte('date', today)
    .order('date', { ascending: true })
    .limit(4);

  // Transform events to match the client component's expected format
  const transformedEvents = (events || []).map((event: Event) => ({
    _id: event.id,
    title: event.title,
    slug: { current: event.id },
    date: event.date,
    time: event.time,
    location: event.location,
    description: event.description,
    imageUrl: event.image_url || 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=800',
    category: 'Event',
  }));

  if (transformedEvents.length === 0) {
    return (
      <section className="section-padding bg-neutral-100">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4 font-serif">
              Upcoming Events
            </h2>
          </div>
          <div className="text-center text-neutral-600 py-12">
            <p>No upcoming events at this time. Check back soon!</p>
          </div>
        </div>
      </section>
    );
  }

  return <UpcomingEventsClient events={transformedEvents} />;
}
