import { supabase } from '@/lib/supabase';
import type { Bulletin } from '@/lib/types';
import { FileText, Download, Calendar, Archive } from 'lucide-react';

export default async function BulletinPage() {
  const { data: bulletins } = await supabase
    .from('bulletins')
    .select('*')
    .eq('published', true)
    .order('week_of', { ascending: false });

  const latestBulletin = bulletins && bulletins.length > 0 ? bulletins[0] : null;
  const archiveBulletins = bulletins && bulletins.length > 1 ? bulletins.slice(1) : [];

  return (
    <main>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-700 via-primary-600 to-primary-500 text-white py-20 md:py-28">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <FileText className="w-16 h-16 mx-auto mb-6 opacity-90" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-serif">
              Weekly Bulletin
            </h1>
            <p className="text-xl md:text-2xl text-primary-50 leading-relaxed">
              Stay informed with our weekly church bulletin
            </p>
          </div>
        </div>
      </section>

      {/* Latest Bulletin */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            {latestBulletin ? (
              <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-8 md:p-12 text-center border-2 border-primary-200">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-600 rounded-full mb-6">
                  <FileText className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4">
                  Current Bulletin
                </h2>
                <div className="flex items-center justify-center gap-2 text-neutral-600 mb-6">
                  <Calendar className="w-5 h-5" />
                  <span className="text-lg">
                    Week of {new Date(latestBulletin.week_of).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                {latestBulletin.pdf_url ? (
                  <a
                    href={latestBulletin.pdf_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
                  >
                    <Download className="w-6 h-6" />
                    Download PDF
                  </a>
                ) : (
                  <p className="text-neutral-500">PDF not available</p>
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
                <p className="text-xl text-neutral-600">No bulletins available yet. Check back soon!</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Bulletin Archive */}
      {archiveBulletins.length > 0 && (
        <section className="section-padding bg-neutral-50">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <Archive className="w-6 h-6 text-neutral-600" />
                <h2 className="text-2xl font-bold text-neutral-900">Bulletin Archive</h2>
              </div>

              <div className="space-y-4">
                {(archiveBulletins as Bulletin[]).map((bulletin) => (
                  <div
                    key={bulletin.id}
                    className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-6 h-6 text-neutral-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-neutral-900">
                          Week of {new Date(bulletin.week_of).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </p>
                      </div>
                    </div>
                    {bulletin.pdf_url ? (
                      <a
                        href={bulletin.pdf_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium transition-colors"
                      >
                        <Download className="w-5 h-5" />
                        Download
                      </a>
                    ) : (
                      <span className="text-neutral-400 text-sm">No PDF</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Info Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4">
              Stay Connected
            </h2>
            <p className="text-lg text-neutral-600 mb-6">
              The weekly bulletin contains announcements, prayer requests, and important updates about our church family. New bulletins are typically available each Sunday.
            </p>
            <a
              href="/contact"
              className="text-primary-600 hover:text-primary-700 font-semibold"
            >
              Have questions? Contact us →
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
