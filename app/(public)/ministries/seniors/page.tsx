import CMSPage from '@/components/CMSPage';

export const dynamic = 'force-dynamic';

export default async function SeniorsMinistryPage() {
  return (
    <CMSPage
      slug="seniors"
      fallbackTitle="Legacy Fellowship"
      heroImage="https://images.unsplash.com/photo-1447005497901-b3e9ee359928?q=80&w=2070"
      fallbackContent={
        <div className="space-y-6">
          <p className="text-lg text-neutral-700">
            Our Legacy Fellowship is a vibrant community for seniors to enjoy fellowship and continue growing in faith.
          </p>
          <p className="text-neutral-600">
            Join us for monthly luncheons, Bible studies, day trips, and special events designed for those in their golden years.
            You&apos;re never too old to grow in your relationship with God and make new friends.
          </p>
        </div>
      }
    />
  );
}
