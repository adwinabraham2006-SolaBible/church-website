import { getAllEvents } from '@/lib/sanity.queries';
import EventsPageClient from '@/components/EventsPageClient';

// Fallback data for when Sanity has no content yet
const fallbackEvents = [
  {
    _id: '1',
    title: 'Community Outreach Day',
    slug: { current: 'community-outreach-day' },
    date: '2024-02-10',
    time: '9:00 AM - 3:00 PM',
    location: 'City Community Center',
    description: 'Join us as we serve our community through practical acts of love and service.',
    category: 'Outreach',
    imageUrl: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=800',
  },
  {
    _id: '2',
    title: 'Marriage Enrichment Weekend',
    slug: { current: 'marriage-enrichment-weekend' },
    date: '2024-02-17',
    time: 'Friday 7:00 PM - Sunday 12:00 PM',
    location: 'Mountain Retreat Center',
    description: 'A transformative weekend designed to strengthen marriages.',
    category: 'Marriage',
    imageUrl: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=800',
  },
  {
    _id: '3',
    title: 'Youth Winter Camp',
    slug: { current: 'youth-winter-camp' },
    date: '2024-02-23',
    time: 'Friday 5:00 PM - Sunday 2:00 PM',
    location: 'Camp Pine Ridge',
    description: 'An unforgettable weekend for students grades 6-12.',
    category: 'Youth',
    imageUrl: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=800',
  },
  {
    _id: '4',
    title: "Women's Bible Study: Esther",
    slug: { current: 'womens-bible-study-esther' },
    date: '2024-02-15',
    time: '7:00 PM - 8:30 PM',
    location: 'Church Fellowship Hall',
    description: 'Join us for an 8-week study on the book of Esther.',
    category: 'Bible Study',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800',
  },
  {
    _id: '5',
    title: 'Worship Night',
    slug: { current: 'worship-night' },
    date: '2024-02-28',
    time: '7:00 PM - 9:00 PM',
    location: 'Main Sanctuary',
    description: 'An evening dedicated to worship and prayer.',
    category: 'Worship',
    imageUrl: 'https://images.unsplash.com/photo-1501612780327-45045538702b?q=80&w=800',
  },
  {
    _id: '6',
    title: 'Baptism Sunday',
    slug: { current: 'baptism-sunday' },
    date: '2024-03-03',
    time: '11:00 AM Service',
    location: 'Main Sanctuary',
    description: 'Celebrating new believers taking their public stand for Christ.',
    category: 'Worship',
    imageUrl: 'https://images.unsplash.com/photo-1438032005730-c779502df39b?q=80&w=800',
  },
  {
    _id: '7',
    title: "Men's Breakfast",
    slug: { current: 'mens-breakfast' },
    date: '2024-03-09',
    time: '8:00 AM - 10:00 AM',
    location: 'Fellowship Hall',
    description: 'Food, fellowship, and teaching for men of all ages.',
    category: 'Fellowship',
    imageUrl: 'https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=800',
  },
  {
    _id: '8',
    title: 'Easter Cantata Rehearsal',
    slug: { current: 'easter-cantata-rehearsal' },
    date: '2024-03-12',
    time: '7:00 PM - 8:30 PM',
    location: 'Choir Room',
    description: 'Join the choir as we prepare for our Easter celebration.',
    category: 'Music',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800',
  },
];

export default async function EventsPage() {
  let events;

  try {
    const sanityEvents = await getAllEvents();
    events = sanityEvents.length > 0 ? sanityEvents : fallbackEvents;
  } catch {
    events = fallbackEvents;
  }

  return <EventsPageClient events={events} />;
}
