import CMSPage from '@/components/CMSPage';

export const dynamic = 'force-dynamic';

export default async function SeniorsMinistryPage() {
  return (
    <CMSPage
      slug="seniors"
      fallbackTitle="Legacy Fellowship"
      heroImage="https://images.unsplash.com/photo-1447005497901-b3e9ee359928?q=80&w=2070"
    />
  );
}
