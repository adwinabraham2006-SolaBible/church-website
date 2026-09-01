export const dynamic = 'force-dynamic';
import { unstable_noStore as noStore } from 'next/cache';
import Link from 'next/link';
import { supabaseAdmin, supabase } from '@/lib/supabase';
import { BookOpen, Video, Calendar } from 'lucide-react';

interface Series {
  id: string;
  name: string;
  description: string | null;
  start_date: string | null;
  end_date: string | null;
}

interface Sermon {
  id: string;
  title: string;
  date: string;
  speaker: string | null;
  scripture: string | null;
  video_url: string | null;
  audio_url: string | null;
  series_id: string | null;
}

export default async function SermonsPage() {
  noStore();
  const client = supabaseAdmin || supabase;
  if (!client) return null;

  const [{ data: allSeries }, { data: sermons }] = await Promise.all([
    client.from('sermon_series').select('*').order('start_date', { ascending: false }),
    client.from('sermons').select('id, title, date, speaker, scripture, video_url, audio_url, series_id').order('date', { ascending: false }),
  ]);

  const series: Series[] = allSeries ?? [];
  const sermonList: Sermon[] = sermons ?? [];

  // Sermons not yet assigned to a series
  const unassigned = sermonList.filter(s => !s.series_id);

  // Count sermons per series
  const countBySeries: Record<string, number> = {};
  for (const s of sermonList) {
    if (s.series_id) countBySeries[s.series_id] = (countBySeries[s.series_id] ?? 0) + 1;
  }

  function formatDate(d: string) {
    return new Date(d + 'T00:00:00').toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric',
    });
  }

  return (
    <main>
      <section className="relative bg-gradient-to-br from-primary-700 via-primary-600 to-primary-500 text-white py-20 md:py-28">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 font-serif">Sermons</h1>
            <p className="text-xl text-primary-100">Explore our archive of messages from God&apos;s Word</p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-neutral-50">
        <div className="container-custom max-w-6xl mx-auto space-y-16">

          {/* Sermon Series */}
          {series.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold font-serif text-neutral-900 mb-6">Sermon Series</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {series.map(s => (
                  <Link
                    key={s.id}
                    href={`/resources/sermons/series/${s.id}`}
                    className="group bg-white rounded-xl border border-neutral-200 p-6 hover:border-primary-400 hover:shadow-md transition-all duration-200"
                  >
                    <h3 className="text-lg font-bold font-serif text-neutral-900 group-hover:text-primary-600 transition-colors mb-2">
                      {s.name}
                    </h3>
                    {s.description && (
                      <p className="text-sm text-neutral-500 mb-3 line-clamp-2">{s.description}</p>
                    )}
                    <div className="flex items-center justify-between text-xs text-neutral-400 mt-auto">
                      <span>{countBySeries[s.id] ?? 0} sermon{(countBySeries[s.id] ?? 0) !== 1 ? 's' : ''}</span>
                      {s.start_date && <span>{formatDate(s.start_date)}</span>}
                    </div>
                    <span className="inline-block mt-3 text-primary-600 text-sm font-semibold group-hover:underline">
                      View series →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* All Sermons (unassigned or all if no series exist) */}
          <div>
            <h2 className="text-2xl font-bold font-serif text-neutral-900 mb-6">
              {series.length > 0 ? 'All Sermons' : 'Sermons'}
            </h2>
            {sermonList.length === 0 ? (
              <p className="text-neutral-500 text-center py-12">No sermons available yet. Check back soon.</p>
            ) : (
              <div className="space-y-3">
                {sermonList.map(sermon => (
                  <div
                    key={sermon.id}
                    className="bg-white rounded-xl border border-neutral-200 px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 hover:border-primary-300 hover:shadow-sm transition-all"
                  >
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/resources/sermons/${sermon.id}`}
                        className="font-semibold text-neutral-900 hover:text-primary-600 transition-colors line-clamp-1"
                      >
                        {sermon.title}
                      </Link>
                      <div className="flex flex-wrap gap-3 mt-1 text-xs text-neutral-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(sermon.date)}
                        </span>
                        {sermon.speaker && (
                          <span>{sermon.speaker}</span>
                        )}
                        {sermon.scripture && (
                          <span className="flex items-center gap-1">
                            <BookOpen className="w-3 h-3" />
                            {sermon.scripture}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
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
                        className="text-primary-600 hover:text-primary-700 text-xs font-semibold"
                      >
                        Details →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </section>
    </main>
  );
}
