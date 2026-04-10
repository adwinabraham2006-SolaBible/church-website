import CMSPage from '@/components/CMSPage';

export const dynamic = 'force-dynamic';

export default async function MensMinistryPage() {
  return (
    <CMSPage
      slug="men"
      fallbackTitle="Men's Ministry"
      heroImage="https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=2070"
    />
  );
}
