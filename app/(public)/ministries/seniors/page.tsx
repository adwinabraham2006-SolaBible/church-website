import CMSPage from '@/components/CMSPage';

export const dynamic = 'force-dynamic';

export default async function SeniorsMinistryPage() {
  return (
    <CMSPage
      slug="seniors"
      fallbackTitle="Legacy Fellowship"
    />
  );
}
