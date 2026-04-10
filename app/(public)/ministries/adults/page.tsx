import CMSPage from '@/components/CMSPage';

export const dynamic = 'force-dynamic';

export default async function AdultsMinistryPage() {
  return (
    <CMSPage
      slug="adults"
      fallbackTitle="Adult Ministries"
      heroImage="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2070"
    />
  );
}
