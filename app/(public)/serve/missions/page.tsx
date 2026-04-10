import CMSPage from '@/components/CMSPage';

export const dynamic = 'force-dynamic';

export default async function MissionsPage() {
  return (
    <CMSPage
      slug="missions"
      fallbackTitle="Mission & Outreach"
      heroImage="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070"
    />
  );
}
