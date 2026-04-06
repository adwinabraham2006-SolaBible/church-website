import { supabase } from '@/lib/supabase';
import type { Page } from '@/lib/types';
import MinistryTemplate from '@/components/MinistryTemplate';

export const dynamic = 'force-dynamic';

export default async function ChildrenMinistryPage() {
  const { data: page } = await supabase
    .from('pages')
    .select('*')
    .eq('slug', 'children')
    .single();

  const pageData = page as Page | null;

  return (
    <MinistryTemplate
      title={pageData?.title || "Children's Ministry"}
      subtitle="Nurturing young hearts to love and follow Jesus"
      description=""
      heroImage={pageData?.image_url || "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=2070"}
      ageGroup="Birth - 5th Grade"
      meetingTime="Sundays during 9:00 AM & 11:00 AM services"
      location="Children's Wing, Rooms 101-105"
      contactPerson={{
        name: 'Sarah Mitchell',
        email: 'children@faithcommunity.org',
        phone: '(555) 123-4567',
      }}
      callToAction={{
        text: 'Register Your Child',
        href: '/contact',
      }}
    >
      {pageData?.content ? (
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: pageData.content }}
        />
      ) : (
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-neutral-900 mb-4 font-serif">
              Age-Specific Programs
            </h2>
            <p className="text-neutral-600 mb-6">
              We provide age-appropriate environments where children can learn and grow at their own pace.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-6">
              <h3 className="text-xl font-bold text-primary-900 mb-2">Nursery</h3>
              <p className="text-sm text-primary-700 mb-3">Birth - 2 years</p>
              <p className="text-neutral-700">
                A safe, loving environment with caring volunteers where infants and toddlers
                are cared for during services.
              </p>
            </div>

            <div className="bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-xl p-6">
              <h3 className="text-xl font-bold text-secondary-900 mb-2">Preschool</h3>
              <p className="text-sm text-secondary-700 mb-3">3 - 5 years (Pre-K)</p>
              <p className="text-neutral-700">
                Bible stories, songs, and activities designed to introduce young children
                to God&apos;s love in fun and engaging ways.
              </p>
            </div>

            <div className="bg-gradient-to-br from-accent-50 to-accent-100 rounded-xl p-6">
              <h3 className="text-xl font-bold text-accent-900 mb-2">Elementary</h3>
              <p className="text-sm text-accent-700 mb-3">Kindergarten - 2nd Grade</p>
              <p className="text-neutral-700">
                Interactive lessons that help children understand God&apos;s Word and how to
                apply it to their daily lives.
              </p>
            </div>

            <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-6">
              <h3 className="text-xl font-bold text-primary-900 mb-2">Upper Elementary</h3>
              <p className="text-sm text-primary-700 mb-3">3rd - 5th Grade</p>
              <p className="text-neutral-700">
                Deeper Bible study and discussion that challenges kids to grow in their
                faith and develop their relationship with God.
              </p>
            </div>
          </div>
        </div>
      )}
    </MinistryTemplate>
  );
}
