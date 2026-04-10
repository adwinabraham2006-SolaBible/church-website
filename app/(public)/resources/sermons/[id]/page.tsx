import Link from 'next/link';
import { notFound } from 'next/navigation';
import { unstable_noStore as noStore } from 'next/cache';
import { supabaseAdmin, supabase } from '@/lib/supabase';
import type { Sermon, SermonSeries } from '@/lib/types';
import { Play, Video, FileText, BookOpen, User, Calendar, ArrowLeft } from 'lucide-react';

export const dynamic = 'force-dynamic';

interface SermonWithSeries extends Sermon {
  sermon_series?: SermonSeries | null;
}

interface Props {
  params: { id: string };
}

export default async function SermonDetailPage({ params }: Props) {
  noStore();

  const client = supabaseAdmin || supabase;
  const { data: sermon } = await client
    .from('sermons')
    .select('*, sermon_series(*)')
    .eq('id', params.id)
    .single();

  if (!sermon) {
    notFound();
  }

  const sermonData = sermon as SermonWithSeries;

  return (
    <main>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-700 via-primary-600 to-primary-500 text-white py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/resources/sermons"
              className="inline-flex items-center gap-2 text-primary-100 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Sermons
            </Link>

            {sermonData.sermon_series && (
              <span className="inline-block bg-white/20 text-white text-sm font-semibold px-4 py-1 rounded-full mb-4">
                {sermonData.sermon_series.name}
              </span>
            )}

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 font-serif">
              {sermonData.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap gap-6 text-primary-100">
              <div className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                <span>{sermonData.speaker}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                <span>
                  {new Date(sermonData.date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>
              <div className="flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                <span>{sermonData.scripture}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {/* Media Section */}
            <div className="bg-neutral-50 rounded-xl p-6 md:p-8 mb-8">
              <h2 className="text-xl font-bold text-neutral-900 mb-4">Listen or Watch</h2>

              <div className="flex flex-wrap gap-4">
                {sermonData.audio_url ? (
                  <div className="flex-1 min-w-[280px]">
                    <p className="text-sm text-neutral-600 mb-2">Audio</p>
                    <audio
                      controls
                      className="w-full"
                      src={sermonData.audio_url}
                    >
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                ) : (
                  <p className="text-neutral-500">No audio available for this sermon.</p>
                )}
              </div>

              {sermonData.video_url && (
                <div className="mt-4">
                  <a
                    href={sermonData.video_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-neutral-800 hover:bg-neutral-900 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    <Video className="w-5 h-5" />
                    Watch Video
                  </a>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-neutral-900 mb-4">About This Message</h2>
              <div className="prose prose-lg max-w-none text-neutral-700">
                <p>{sermonData.description}</p>
              </div>
            </div>

            {/* Downloads */}
            {(sermonData.slides_url || sermonData.notes_url) && (
              <div className="bg-neutral-50 rounded-xl p-6 md:p-8">
                <h2 className="text-xl font-bold text-neutral-900 mb-4">Downloads</h2>
                <div className="flex flex-wrap gap-4">
                  {sermonData.slides_url && (
                    <a
                      href={sermonData.slides_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                      <FileText className="w-5 h-5" />
                      Download Slides (PDF)
                    </a>
                  )}
                  {sermonData.notes_url && (
                    <a
                      href={sermonData.notes_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 border-2 border-primary-600 text-primary-600 hover:bg-primary-50 px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                      <FileText className="w-5 h-5" />
                      Download Notes (PDF)
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Series Info */}
            {sermonData.sermon_series && sermonData.sermon_series.description && (
              <div className="mt-8 bg-secondary-50 rounded-xl p-6 md:p-8">
                <h2 className="text-xl font-bold text-neutral-900 mb-2">
                  Part of: {sermonData.sermon_series.name}
                </h2>
                <p className="text-neutral-600">{sermonData.sermon_series.description}</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
