import CMSPage from '@/components/CMSPage';

export const dynamic = 'force-dynamic';

export default async function WomensMinistryPage() {
  return (
    <CMSPage
      slug="women"
      fallbackTitle="Women's Ministry"
    />
  );
}
