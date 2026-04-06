import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import type { Sermon, SermonSeries } from '@/lib/types';
import { Play, Video, FileText, BookOpen, User, Calendar } from 'lucide-react';

interface SermonWithSeries extends Sermon {
  sermon_series?: SermonSeries | null;
}

export default async function SermonsPage() {
  const { data: sermons } = await supabase
    .from('sermons')
    .select('*, sermon_series(*)')
    .order('date', { ascending: false });

  return (
    <main>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-700 via-primary-600 to-primary-500 text-white py-20 md:py-28">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-serif">
              Sermons
            </h1>
            <p className="text-xl md:text-2xl text-primary-50 leading-relaxed">
              Explore our archive of messages from God&apos;s Word
            </p>
          </div>
        </div>
      </section>

      {/* Sermons List */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          {!sermons || sermons.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-neutral-600">No sermons available yet. Check back soon!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {(sermons as SermonWithSeries[]).map((sermon) => (
                <div
                  key={sermon.id}
                  className="bg-white border border-neutral-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
                >
                  <div className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row md:items-start gap-6">
                      {/* Sermon Info */}
                      <div className="flex-1">
                        {sermon.sermon_series && (
                          <span className="inline-block bg-primary-100 text-primary-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                            {sermon.sermon_series.name}
                          </span>
                        )}
                        <h2 className="text-2xl font-bold text-neutral-900 mb-3 hover:text-primary-600 transition-colors">
                          <Link href={`/resources/sermons/${sermon.id}`}>
                            {sermon.title}
                          </Link>
                        </h2>

                        {/* Meta Information */}
                        <div className="flex flex-wrap gap-4 mb-4 text-sm text-neutral-600">
                          <div className="flex items-center">
                            <User className="w-4 h-4 mr-2 text-primary-600" />
                            <span>{sermon.speaker}</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2 text-primary-600" />
                            <span>
                              {new Date(sermon.date).toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric',
                              })}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <BookOpen className="w-4 h-4 mr-2 text-primary-600" />
                            <span>{sermon.scripture}</span>
                          </div>
                        </div>

                        <p className="text-neutral-600 mb-4 line-clamp-2">
                          {sermon.description}
                        </p>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-3">
                          {sermon.audio_url && (
                            <a
                              href={sermon.audio_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                            >
                              <Play className="w-4 h-4" />
                              Listen
                            </a>
                          )}
                          {sermon.video_url && (
                            <a
                              href={sermon.video_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 bg-neutral-800 hover:bg-neutral-900 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                            >
                              <Video className="w-4 h-4" />
                              Watch
                            </a>
                          )}
                          {sermon.slides_url && (
                            <a
                              href={sermon.slides_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 border border-neutral-300 hover:border-neutral-400 text-neutral-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                            >
                              <FileText className="w-4 h-4" />
                              Slides
                            </a>
                          )}
                          {sermon.notes_url && (
                            <a
                              href={sermon.notes_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 border border-neutral-300 hover:border-neutral-400 text-neutral-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                            >
                              <FileText className="w-4 h-4" />
                              Notes
                            </a>
                          )}
                          <Link
                            href={`/resources/sermons/${sermon.id}`}
                            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 px-4 py-2 text-sm font-medium transition-colors"
                          >
                            View Details →
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
