export const dynamic = 'force-dynamic';
import { unstable_noStore as noStore } from 'next/cache';
import { supabaseAdmin, supabase } from '@/lib/supabase';
import type { Announcement } from '@/lib/types';
import { Calendar, Megaphone } from 'lucide-react';

async function getAnnouncements(): Promise<Announcement[]> {
  noStore();
  const client = supabaseAdmin || supabase;
  if (!client) return [];
  const { data } = await client
    .from('announcements')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false });
  return (data as Announcement[]) || [];
}

export default async function EventsPage() {
  const announcements = await getAnnouncements();

  return (
    <main>
      <section className="relative bg-gradient-to-br from-primary-700 via-primary-600 to-primary-500 text-white py-20 md:py-28">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-serif">
              News &amp; Announcements
            </h1>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          {announcements.length === 0 ? (
            <div className="text-center py-16 text-neutral-500">
              <Megaphone className="w-12 h-12 mx-auto mb-4 text-neutral-300" />
              <p className="text-lg">No announcements at this time. Check back soon.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {announcements.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-neutral-100"
                >
                  {item.image_url && (
                    <div className="h-48 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-neutral-900 mb-2">
                      {item.title}
                    </h2>
                    {item.date && (
                      <div className="flex items-center text-sm text-neutral-500 mb-3">
                        <Calendar className="w-4 h-4 mr-2" />
                        {new Date(item.date).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </div>
                    )}
                    <p className="text-neutral-600 leading-relaxed">{item.body}</p>
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
