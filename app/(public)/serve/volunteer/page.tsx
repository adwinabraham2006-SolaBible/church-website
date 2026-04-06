import CMSPage from '@/components/CMSPage';

export const dynamic = 'force-dynamic';

export default async function VolunteerPage() {
  return (
    <CMSPage
      slug="volunteer"
      fallbackTitle="Volunteer Opportunities"
      heroImage="https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=2070"
      fallbackContent={
        <div className="space-y-6">
          <p className="text-lg text-neutral-700">
            Discover how you can use your gifts and talents to serve in our church and community.
          </p>
          <p className="text-neutral-600">
            There are many ways to get involved, from greeting visitors and serving coffee to teaching children
            and leading worship. Contact us to learn more about volunteer opportunities that match your interests and gifts.
          </p>
        </div>
      }
    />
  );
}
