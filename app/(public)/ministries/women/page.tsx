import CMSPage from '@/components/CMSPage';

export const dynamic = 'force-dynamic';

export default async function WomensMinistryPage() {
  return (
    <CMSPage
      slug="women"
      fallbackTitle="Women's Ministry"
      heroImage="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2070"
      fallbackContent={
        <div className="space-y-6">
          <p className="text-lg text-neutral-700">
            Our Women&apos;s Ministry creates opportunities for women to connect, grow, and serve together.
          </p>
          <p className="text-neutral-600">
            Through Bible studies, retreats, mentoring relationships, and service projects, we encourage women
            to deepen their faith and build meaningful friendships.
          </p>
        </div>
      }
    />
  );
}
