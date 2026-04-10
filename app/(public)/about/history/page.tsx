import CMSPage from '@/components/CMSPage';

export const dynamic = 'force-dynamic';

export default async function HistoryPage() {
  return (
    <CMSPage
      slug="history"
      fallbackTitle="Our History"
    />
  );
}
