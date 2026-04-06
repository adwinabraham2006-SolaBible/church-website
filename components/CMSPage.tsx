import { supabase } from '@/lib/supabase';
import type { Page } from '@/lib/types';

interface CMSPageProps {
  slug: string;
  fallbackTitle?: string;
  fallbackContent?: React.ReactNode;
  heroImage?: string;
}

export default async function CMSPage({
  slug,
  fallbackTitle = 'Page',
  fallbackContent,
  heroImage,
}: CMSPageProps) {
  const { data: page } = await supabase
    .from('pages')
    .select('*')
    .eq('slug', slug)
    .single();

  const pageData = page as Page | null;
  const title = pageData?.title || fallbackTitle;
  const content = pageData?.content;
  const imageUrl = pageData?.image_url || heroImage;

  return (
    <main>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-700 via-primary-600 to-primary-500 text-white py-20 md:py-28">
        {imageUrl && (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: `url('${imageUrl}')` }}
          />
        )}
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-serif">
              {title}
            </h1>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {content ? (
              <div
                className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-neutral-900 prose-p:text-neutral-700 prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline prose-blockquote:border-primary-500 prose-blockquote:bg-primary-50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-img:rounded-xl prose-img:shadow-lg"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            ) : fallbackContent ? (
              <div className="prose prose-lg max-w-none">
                {fallbackContent}
              </div>
            ) : (
              <div className="text-center py-12 text-neutral-500">
                <p>Content coming soon.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
