import CMSPage from '@/components/CMSPage';

export const dynamic = 'force-dynamic';

export default async function BeliefsPage() {
  return (
    <CMSPage
      slug="beliefs"
      fallbackTitle="Our Beliefs"
    />
  );
}
