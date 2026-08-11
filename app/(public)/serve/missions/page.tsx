export const dynamic = 'force-dynamic';
import { unstable_noStore as noStore } from 'next/cache';
import { supabaseAdmin } from '@/lib/supabase';
import { FileText } from 'lucide-react';

interface MissionsFile {
  id: string;
  name: string;
  url: string;
  type: 'photo' | 'pdf';
  display_order: number;
}

async function getMissionsData() {
  noStore();
  if (!supabaseAdmin) return { description: '', files: [] };
  try {
    const [contentRes, filesRes] = await Promise.all([
      supabaseAdmin.from('missions_content').select('*').limit(1).maybeSingle(),
      supabaseAdmin.from('missions_files').select('*').order('display_order'),
    ]);
    return {
      description: (contentRes.data?.description as string) || '',
      files: (filesRes.data as MissionsFile[]) || [],
    };
  } catch {
    return { description: '', files: [] };
  }
}

export default async function MissionsPage() {
  const { description, files } = await getMissionsData();
  const photos = files.filter(f => f.type === 'photo');
  const pdfs = files.filter(f => f.type === 'pdf');

  return (
    <main>
      <section className="relative bg-gradient-to-br from-primary-700 via-primary-600 to-primary-500 text-white py-20 md:py-28">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 font-serif">
              Missions &amp; Outreach
            </h1>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl mx-auto space-y-14">

          {description && (
            <div className="prose prose-lg max-w-none text-neutral-700 whitespace-pre-line">
              {description}
            </div>
          )}

          {photos.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {photos.map(photo => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={photo.id}
                  src={photo.url}
                  alt={photo.name}
                  className="w-full h-52 object-cover rounded-xl"
                />
              ))}
            </div>
          )}

          {pdfs.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-neutral-900 mb-4 font-serif">Downloads</h2>
              <ul className="space-y-3">
                {pdfs.map(pdf => (
                  <li key={pdf.id}>
                    <a
                      href={pdf.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors group"
                    >
                      <FileText className="w-5 h-5 text-primary-600 flex-shrink-0" />
                      <span className="text-neutral-800 group-hover:text-primary-600 font-medium">
                        {pdf.name}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {!description && photos.length === 0 && pdfs.length === 0 && (
            <p className="text-neutral-500 text-center py-12">
              Missions information coming soon.
            </p>
          )}

        </div>
      </section>
    </main>
  );
}
