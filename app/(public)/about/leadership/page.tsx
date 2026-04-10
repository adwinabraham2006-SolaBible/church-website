import CMSPage from '@/components/CMSPage';

export const dynamic = 'force-dynamic';

export default async function LeadershipPage() {
  return (
    <CMSPage
      slug="leadership"
      fallbackTitle="Our Leadership"
    />
  );
}
