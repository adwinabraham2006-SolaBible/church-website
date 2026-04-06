import { supabase } from '@/lib/supabase';
import type { Page } from '@/lib/types';
import MinistryTemplate from '@/components/MinistryTemplate';

export default async function YouthMinistryPage() {
  const { data: page } = await supabase
    .from('pages')
    .select('*')
    .eq('slug', 'youth')
    .single();

  const pageData = page as Page | null;

  return (
    <MinistryTemplate
      title={pageData?.title || "Youth Ministry"}
      subtitle="Empowering the next generation to live boldly for Christ"
      description=""
      heroImage={pageData?.image_url || "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2070"}
      ageGroup="6th - 12th Grade"
      meetingTime="Wednesdays 7:00 PM - 8:30 PM"
      location="Youth Center"
      contactPerson={{
        name: 'Marcus Johnson',
        email: 'youth@faithcommunity.org',
        phone: '(555) 123-4568',
      }}
      callToAction={{
        text: 'Connect with Youth Group',
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
              What We Do
            </h2>
            <p className="text-neutral-600 mb-6">
              Our youth ministry focuses on helping students grow in their relationship with Jesus
              while building a supportive community of friends who encourage one another.
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-xl p-6">
              <h3 className="text-2xl font-bold mb-2">Wednesday Night Youth Group</h3>
              <p className="text-primary-50 mb-3">7:00 PM - 8:30 PM | Youth Center</p>
              <p className="text-white">
                High-energy worship, relevant Bible teaching, games, and small group discussions.
                Come as you are and bring your friends!
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-secondary-50 rounded-xl p-6 border-2 border-secondary-200">
                <h3 className="text-xl font-bold text-neutral-900 mb-3">Small Groups</h3>
                <p className="text-neutral-700 mb-3">
                  Gender-specific small groups meet throughout the week for deeper discussion,
                  accountability, and friendship.
                </p>
              </div>

              <div className="bg-accent-50 rounded-xl p-6 border-2 border-accent-200">
                <h3 className="text-xl font-bold text-neutral-900 mb-3">Sunday School</h3>
                <p className="text-neutral-700 mb-3">
                  Join us Sunday mornings during the 11:00 AM service for in-depth Bible study
                  and application.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </MinistryTemplate>
  );
}
