import { getUpcomingEvents } from '@/lib/sanity.queries';
import UpcomingEventsClient from './UpcomingEventsClient';

// Fallback data for when Sanity has no content yet
const fallbackEvents = [
  {
    _id: '1',
    title: 'Community Outreach Day',
    slug: { current: 'community-outreach-day' },
    date: '2024-02-10',
    time: '9:00 AM - 3:00 PM',
    location: 'City Community Center',
    description: 'Join us as we serve our community through practical acts of love and service. Activities include food distribution, home repairs, and community cleanup.',
    imageUrl: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=800',
    category: 'Outreach',
  },
  {
    _id: '2',
    title: 'Marriage Enrichment Weekend',
    slug: { current: 'marriage-enrichment-weekend' },
    date: '2024-02-17',
    time: 'Friday 7:00 PM - Sunday 12:00 PM',
    location: 'Mountain Retreat Center',
    description: 'A transformative weekend designed to strengthen marriages through biblical teaching, practical workshops, and quality time together.',
    imageUrl: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=800',
    category: 'Marriage',
  },
  {
    _id: '3',
    title: 'Youth Winter Camp',
    slug: { current: 'youth-winter-camp' },
    date: '2024-02-23',
    time: 'Friday 5:00 PM - Sunday 2:00 PM',
    location: 'Camp Pine Ridge',
    description: 'An unforgettable weekend of worship, teaching, games, and fellowship for students grades 6-12. Theme: "Unshakeable Faith"',
    imageUrl: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=800',
    category: 'Youth',
  },
  {
    _id: '4',
    title: "Women's Bible Study: Esther",
    slug: { current: 'womens-bible-study-esther' },
    date: '2024-02-15',
    time: '7:00 PM - 8:30 PM',
    location: 'Church Fellowship Hall',
    description: 'Join us for an 8-week study on the book of Esther. Discover how God works through ordinary people in extraordinary circumstances.',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800',
    category: 'Bible Study',
  },
];

export default async function UpcomingEvents() {
  let events;

  try {
    const sanityEvents = await getUpcomingEvents(4);
    events = sanityEvents.length > 0 ? sanityEvents : fallbackEvents;
  } catch {
    events = fallbackEvents;
  }

  return <UpcomingEventsClient events={events} />;
}
