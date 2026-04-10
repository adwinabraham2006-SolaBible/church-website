import CMSPage from '@/components/CMSPage';

export const dynamic = 'force-dynamic';

export default async function VolunteerPage() {
  return (
    <CMSPage
      slug="volunteer"
      fallbackTitle="Volunteer Opportunities"
      heroImage="https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=2070"
    />
  );
}
