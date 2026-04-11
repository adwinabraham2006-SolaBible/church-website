import Link from 'next/link';
import { BookOpen, User, Calendar } from 'lucide-react';
import { unstable_noStore as noStore } from 'next/cache';
import { supabaseAdmin, supabase } from '@/lib/supabase';
import type { Sermon, SermonSeries } from '@/lib/types';

interface SermonWithSeries extends Sermon {
  sermon_series?: SermonSeries | null;
}

export default async function LatestSermons() {
  noStore();

  const client = supabaseAdmin || supabase;
  const { data: sermons } = await client
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
              {/* Content */}
              <div className="p-6">
                {/* Series Badge */}
                {sermon.sermon_series && (
                  <span className="inline-block bg-primary-100 text-primary-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                    {sermon.sermon_series.name}
                  </span>
                )}
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
