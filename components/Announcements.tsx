import { supabase } from '@/lib/supabase';
import type { Announcement } from '@/lib/types';
import { Megaphone, Calendar } from 'lucide-react';

export default async function Announcements() {
  const { data: announcements } = await supabase
    .from('announcements')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })
    .limit(3);

  if (!announcements || announcements.length === 0) {
    return null; // Don't render section if no announcements
  }

  return (
    <section className="section-padding bg-secondary-50">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary-100 rounded-full mb-4">
            <Megaphone className="w-8 h-8 text-secondary-600" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4 font-serif">
            Announcements
          </h2>
        </div>

        {/* Announcements Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(announcements as Announcement[]).map((announcement) => (
            <div
              key={announcement.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
            >
              {announcement.image_url && (
                <div className="h-40 overflow-hidden">
                  <img
                    src={announcement.image_url}
                    alt={announcement.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold text-neutral-900 mb-2">
                  {announcement.title}
                </h3>
                {announcement.date && (
                  <div className="flex items-center text-sm text-neutral-500 mb-3">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(announcement.date).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </div>
                )}
                <p className="text-neutral-600 leading-relaxed line-clamp-3">
                  {announcement.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
