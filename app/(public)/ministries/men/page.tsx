import CMSPage from '@/components/CMSPage';

export const dynamic = 'force-dynamic';

export default async function MensMinistryPage() {
  return (
    <CMSPage
      slug="men"
      fallbackTitle="Men's Ministry"
    />
  );
}
