import CMSPage from '@/components/CMSPage';

export const dynamic = 'force-dynamic';

export default async function AdultsMinistryPage() {
  return (
    <CMSPage
      slug="adults"
      fallbackTitle="Adult Ministries"
    />
  );
}
