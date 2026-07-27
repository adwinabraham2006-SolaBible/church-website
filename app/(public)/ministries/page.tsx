import CMSPage from '@/components/CMSPage';

export const dynamic = 'force-dynamic';

export default async function MinistriesPage() {
  return (
    <CMSPage
      slug="ministries"
      fallbackTitle="Ministries"
    />
  );
}
