import CMSPage from '@/components/CMSPage';

export const dynamic = 'force-dynamic';

export default async function MensMinistryPage() {
  return (
    <CMSPage
      slug="men"
      fallbackTitle="Men's Ministry"
      heroImage="https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=2070"
      fallbackContent={
        <div className="space-y-6">
          <p className="text-lg text-neutral-700">
            Our Men&apos;s Ministry equips men to be godly leaders in their homes, workplaces, and communities.
          </p>
          <p className="text-neutral-600">
            Through monthly breakfasts, small groups, retreats, and service projects, we challenge men
            to grow in their faith and hold each other accountable.
          </p>
        </div>
      }
    />
  );
}
