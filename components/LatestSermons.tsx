import Link from 'next/link';
import { Play, BookOpen, User, Calendar } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { Sermon, SermonSeries } from '@/lib/types';

interface SermonWithSeries extends Sermon {
  sermon_series?: SermonSeries | null;
}

export default async function LatestSermons() {
  const { data: sermons } = await supabase
    .from('sermons')
    .select('*, sermon_series(*)')
    .order('date', { ascending: false })
    .limit(3);

  if (!sermons || sermons.length === 0) {
    return (
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4 font-serif">
              Latest Sermons
            </h2>
          </div>
          <div className="text-center text-neutral-600 py-12">
            <p>No sermons available yet. Check back soon!</p>
          </div>
        </div>
      </section>
    );
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
          {(sermons as SermonWithSeries[]).map((sermon) => (
            <div
              key={sermon.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
            >
              {/* Thumbnail */}
              <div className="relative h-48 overflow-hidden bg-neutral-200">
                <div
                  className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-500"
                  style={{ backgroundImage: `url('https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=80&w=800')` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 to-transparent"></div>
                </div>
                {/* Play Button */}
                {sermon.audio_url && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-primary-600 hover:bg-primary-700 text-white rounded-full p-4 shadow-lg transform hover:scale-110 transition-transform">
                      <Play className="w-8 h-8" fill="currentColor" />
                    </div>
                  </div>
                )}
                {/* Series Badge */}
                {sermon.sermon_series && (
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {sermon.sermon_series.name}
                    </span>
                  </div>
                )}
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
                  href={`/resources/sermons/${sermon.id}`}
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
