import Link from 'next/link';
import { notFound } from 'next/navigation';
import { unstable_noStore as noStore } from 'next/cache';
import { supabaseAdmin, supabase } from '@/lib/supabase';
import type { Sermon, SermonSeries } from '@/lib/types';
import { Play, FileText, BookOpen, User, Calendar, ArrowLeft } from 'lucide-react';

export const dynamic = 'force-dynamic';

interface SermonWithSeries extends Sermon {
  sermon_series?: SermonSeries | null;
}

interface Props {
  params: { id: string };
}

function extractYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/watch\?(?:.*&)?v=|youtu\.be\/|youtube\.com\/embed\/)([A-Za-z0-9_-]{11})/
  );
  return match ? match[1] : null;
}

async function fetchTranscript(videoId: string): Promise<string[]> {
  try {
    const { YoutubeTranscript } = await import('youtube-transcript');
    const items = await YoutubeTranscript.fetchTranscript(videoId);
    // Group segments into ~30-second paragraphs for readability
    const paragraphs: string[] = [];
    let current = '';
    let elapsed = 0;
    for (const item of items) {
      current += (current ? ' ' : '') + item.text.replace(/\[.*?\]/g, '').trim();
      elapsed += item.duration;
      if (elapsed >= 30000) {
        if (current.trim()) paragraphs.push(current.trim());
        current = '';
        elapsed = 0;
      }
    }
    if (current.trim()) paragraphs.push(current.trim());
    return paragraphs;
  } catch {
    return [];
  }
}

export default async function SermonDetailPage({ params }: Props) {
  noStore();

  const client = supabaseAdmin || supabase;
  if (!client) return null;
  const { data: sermon } = await client
    .from('sermons')
    .select('*, sermon_series(*)')
    .eq('id', params.id)
    .single();

  if (!sermon) {
    notFound();
  }

  const sermonData = sermon as SermonWithSeries;
  const youtubeId = sermonData.video_url ? extractYouTubeId(sermonData.video_url) : null;
  const transcript = youtubeId ? await fetchTranscript(youtubeId) : [];

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
      <section className="section-padding bg-primary-800">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto space-y-8">

            {/* Video embed */}
            {youtubeId && (
              <div>
                <div className="relative w-full rounded-xl overflow-hidden shadow-lg" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${youtubeId}`}
                    title={sermonData.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              </div>
            )}

            {/* Audio player (shown when there's no video, or as a supplement) */}
            {sermonData.audio_url && !youtubeId && (
              <div className="bg-primary-700 rounded-lg p-6 md:p-8">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  Listen
                </h2>
                <audio controls className="w-full" src={sermonData.audio_url}>
                  Your browser does not support the audio element.
                </audio>
              </div>
            )}

            {/* Audio supplement when video also exists */}
            {sermonData.audio_url && youtubeId && (
              <details className="bg-primary-700 rounded-xl p-5">
                <summary className="cursor-pointer text-sm font-semibold text-primary-100 select-none">
                  Audio only version
                </summary>
                <div className="mt-4">
                  <audio controls className="w-full" src={sermonData.audio_url}>
                    Your browser does not support the audio element.
                  </audio>
                </div>
              </details>
            )}

            {/* Description */}
            {sermonData.description && (
              <div>
                <h2 className="text-xl font-bold text-white mb-3">About This Message</h2>
                <div className="prose prose-invert prose-lg max-w-none">
                  <p>{sermonData.description}</p>
                </div>
              </div>
            )}

            {/* Downloads */}
            {(sermonData.slides_url || sermonData.notes_url) && (
              <div className="bg-primary-700 rounded-xl p-6 md:p-8">
                <h2 className="text-xl font-bold text-white mb-4">Downloads</h2>
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
                      className="inline-flex items-center gap-2 border-2 border-secondary-400 text-secondary-400 hover:bg-primary-600 px-6 py-3 rounded-lg font-medium transition-colors"
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
              <div className="bg-primary-700 rounded-xl p-6 md:p-8">
                <h2 className="text-xl font-bold text-white mb-2">
                  Part of: {sermonData.sermon_series.name}
                </h2>
                <p className="text-primary-100">{sermonData.sermon_series.description}</p>
              </div>
            )}

            {/* Transcript */}
            {transcript.length > 0 && (
              <div className="border border-primary-600 rounded-xl overflow-hidden">
                <details>
                  <summary className="flex items-center justify-between px-6 py-4 cursor-pointer bg-primary-700 hover:bg-primary-600 transition-colors select-none">
                    <div className="flex items-center gap-2 font-semibold text-white">
                      <FileText className="w-5 h-5 text-secondary-400" />
                      Sermon Transcript
                    </div>
                    <span className="text-xs text-primary-200 font-normal">Auto-generated · click to expand</span>
                  </summary>
                  <div className="px-6 py-6 space-y-4 max-h-[600px] overflow-y-auto bg-primary-800">
                    <p className="text-xs text-primary-300 italic mb-2">
                      This transcript was automatically generated from the video and may contain minor errors.
                    </p>
                    {transcript.map((para, i) => (
                      <p key={i} className="text-primary-100 leading-relaxed text-sm">
                        {para}
                      </p>
                    ))}
                  </div>
                </details>
              </div>
            )}

          </div>
        </div>
      </section>
    </main>
  );
}
