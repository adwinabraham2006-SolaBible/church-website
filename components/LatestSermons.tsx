import Link from 'next/link';
import { Play, BookOpen, User, Calendar } from 'lucide-react';
import { getLatestSermons } from '@/lib/sanity.queries';
import { urlFor } from '@/lib/sanity.image';
import type { Sermon } from '@/types/sanity';

// Fallback data for when Sanity has no content yet
const fallbackSermons = [
  {
    _id: '1',
    title: 'Walking in Faith Through Uncertainty',
    slug: { current: 'walking-in-faith' },
    date: '2024-01-14',
    speaker: 'Pastor John Smith',
    scripture: 'Hebrews 11:1-6',
    series: 'Faith That Moves Mountains',
    description: 'Discovering how to trust God when we cannot see the path ahead.',
    thumbnail: null,
    thumbnailUrl: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=80&w=800',
  },
  {
    _id: '2',
    title: 'The Power of Community',
    slug: { current: 'power-of-community' },
    date: '2024-01-07',
    speaker: 'Pastor Sarah Johnson',
    scripture: 'Acts 2:42-47',
    series: 'One Another',
    description: 'How the early church modeled authentic Christian community.',
    thumbnail: null,
    thumbnailUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=800',
  },
  {
    _id: '3',
    title: 'Grace Upon Grace',
    slug: { current: 'grace-upon-grace' },
    date: '2023-12-31',
    speaker: 'Pastor John Smith',
    scripture: 'John 1:14-18',
    series: 'The Gospel of John',
    description: "Understanding the fullness of God's grace revealed in Jesus Christ.",
    thumbnail: null,
    thumbnailUrl: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=800',
  },
];

function getImageUrl(sermon: Sermon | typeof fallbackSermons[0]): string {
  if ('thumbnailUrl' in sermon && sermon.thumbnailUrl) {
    return sermon.thumbnailUrl;
  }
  if (sermon.thumbnail) {
    return urlFor(sermon.thumbnail).width(800).height(600).url();
  }
  return 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=80&w=800';
}

export default async function LatestSermons() {
  let sermons: (Sermon | typeof fallbackSermons[0])[];

  try {
    const sanitySermons = await getLatestSermons(3);
    sermons = sanitySermons.length > 0 ? sanitySermons : fallbackSermons;
  } catch {
    sermons = fallbackSermons;
  }

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4 font-serif">
            Latest Sermons
          </h2>
        </div>

        {/* Sermons Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {sermons.map((sermon) => (
            <div
              key={sermon._id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
            >
              {/* Thumbnail */}
              <div className="relative h-48 overflow-hidden bg-neutral-200">
                <div
                  className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-500"
                  style={{ backgroundImage: `url('${getImageUrl(sermon)}')` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 to-transparent"></div>
                </div>
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    className="bg-primary-600 hover:bg-primary-700 text-white rounded-full p-4 shadow-lg transform hover:scale-110 transition-transform cursor-not-allowed"
                    disabled
                    title="Audio/Video player coming soon"
                  >
                    <Play className="w-8 h-8" fill="currentColor" />
                  </button>
                </div>
                {/* Series Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-primary-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {sermon.series}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {sermon.title}
                </h3>

                {/* Meta Information */}
                <div className="space-y-2 mb-4 text-sm text-neutral-600">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2 text-primary-600" />
                    <span>{sermon.speaker}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-primary-600" />
                    <span>{new Date(sermon.date).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}</span>
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="w-4 h-4 mr-2 text-primary-600" />
                    <span>{sermon.scripture}</span>
                  </div>
                </div>

                <p className="text-neutral-600 text-sm mb-4 line-clamp-2">
                  {sermon.description}
                </p>

                <Link
                  href={`/resources/sermons/${sermon.slug.current}`}
                  className="text-primary-600 hover:text-primary-700 font-semibold text-sm flex items-center group/link"
                >
                  View Details
                  <span className="ml-1 transform group-hover/link:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All Sermons Link */}
        <div className="text-center">
          <Link
            href="/resources/sermons"
            className="btn-outline inline-block"
          >
            View All Sermons
          </Link>
        </div>
      </div>
    </section>
  );
}
