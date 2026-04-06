import CMSPage from '@/components/CMSPage';

export const dynamic = 'force-dynamic';

export default async function AdultsMinistryPage() {
  return (
    <CMSPage
      slug="adults"
      fallbackTitle="Adult Ministries"
      heroImage="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2070"
      fallbackContent={
        <div className="space-y-6">
          <p className="text-lg text-neutral-700">
            We offer various opportunities for adults to connect, learn, and serve together.
          </p>
          <p className="text-neutral-600">
            Our adult ministries include Sunday School classes, small groups, Bible studies, and fellowship events.
            Whatever stage of life you&apos;re in, there&apos;s a place for you to grow in your faith and build lasting friendships.
          </p>
        </div>
      }
    />
  );
}
