export const dynamic = 'force-dynamic';
import { unstable_noStore as noStore } from 'next/cache';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { supabaseAdmin, supabase } from '@/lib/supabase';
import { BookOpen, Video, Play, Calendar, ArrowLeft } from 'lucide-react';

export default async function SeriesPage({ params }: { params: { id: string } }) {
  noStore();
  const client = supabaseAdmin || supabase;
  if (!client) return null;

  const [{ data: series }, { data: sermons }] = await Promise.all([
    client.from('sermon_series').select('*').eq('id', params.id).single(),
    client.from('sermons')
      .select('id, title, date, speaker, scripture, video_url, audio_url, description')
      .eq('series_id', params.id)
      .order('date', { ascending: true }),
  ]);

  if (!series) notFound();

  const sermonList = sermons ?? [];

  function formatDate(d: string) {
    return new Date(d + 'T00:00:00').toLocaleDateString('en-US', {
      month: 'long', day: 'numeric', year: 'numeric',
    });
  }

  return (
    <main>
      <section className="relative bg-gradient-to-br from-primary-700 via-primary-600 to-primary-500 text-white py-20 md:py-28">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-primary-200 text-sm font-medium uppercase tracking-widest mb-3">Sermon Series</p>
            <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4">{series.name}</h1>
            {series.description && (
              <p className="text-lg text-primary-100 max-w-2xl mx-auto">{series.description}</p>
            )}
            <p className="text-primary-200 text-sm mt-4">
              {sermonList.length} sermon{sermonList.length !== 1 ? 's' : ''}
              {series.start_date && ` · Started ${formatDate(series.start_date)}`}
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-neutral-50">
        <div className="container-custom max-w-4xl mx-auto">
          <Link
            href="/resources/sermons"
            className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-primary-600 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            All Sermons
          </Link>

          {sermonList.length === 0 ? (
            <p className="text-neutral-500 text-center py-12">No sermons in this series yet.</p>
          ) : (
            <ol className="space-y-4">
              {sermonList.map((sermon, idx) => (
                <li key={sermon.id} className="bg-white rounded-xl border border-neutral-200 px-6 py-5 hover:border-primary-300 hover:shadow-sm transition-all">
                  <div className="flex gap-4">
                    {/* Part number */}
                    <div className="shrink-0 w-8 h-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-sm font-bold mt-0.5">
                      {idx + 1}
                    </div>

                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/resources/sermons/${sermon.id}`}
                        className="font-bold text-neutral-900 hover:text-primary-600 transition-colors text-lg leading-snug"
                      >
                        {sermon.title}
                      </Link>

                      <div className="flex flex-wrap gap-3 mt-1.5 text-sm text-neutral-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {formatDate(sermon.date)}
                        </span>
                        {sermon.speaker && <span>{sermon.speaker}</span>}
                        {sermon.scripture && (
                          <span className="flex items-center gap-1">
                            <BookOpen className="w-3.5 h-3.5" />
                            {sermon.scripture}
                          </span>
                        )}
                      </div>

                      {sermon.description && (
                        <p className="text-sm text-neutral-500 mt-2 line-clamp-2">{sermon.description}</p>
                      )}

                      <div className="flex gap-2 mt-3">
                        {sermon.audio_url && (
                          <a
                            href={sermon.audio_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 bg-primary-600 hover:bg-primary-700 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
                          >
                            <Play className="w-3.5 h-3.5" />
                            Listen
                          </a>
                        )}
                        {sermon.video_url && (
                          <a
                            href={sermon.video_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 bg-neutral-800 hover:bg-neutral-900 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
                          >
                            <Video className="w-3.5 h-3.5" />
                            Watch
                          </a>
                        )}
                        <Link
                          href={`/resources/sermons/${sermon.id}`}
                          className="text-primary-600 hover:text-primary-700 text-xs font-semibold px-2 py-1.5"
                        >
                          Details →
                        </Link>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </div>
      </section>
    </main>
  );
}
