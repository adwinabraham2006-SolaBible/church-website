import { unstable_noStore as noStore } from 'next/cache';
import { supabaseAdmin, supabase } from '@/lib/supabase';
import type { Event } from '@/lib/types';
import EventsPageClient from '@/components/EventsPageClient';

export const dynamic = 'force-dynamic';

export default async function EventsPage() {
  noStore();

  const today = new Date().toISOString().split('T')[0];
  const client = supabaseAdmin || supabase;

  const { data: events } = await client
    .from('events')
    .select('*')
    .gte('date', today)
    .order('date', { ascending: true });

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

  return <EventsPageClient events={transformedEvents} />;
}
