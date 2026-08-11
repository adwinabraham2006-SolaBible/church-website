import CMSPage from '@/components/CMSPage';

export const dynamic = 'force-dynamic';

export default async function ChildrenMinistryPage() {
  return (
    <CMSPage
      slug="children"
      fallbackTitle="Children's Ministry"
    />
  );
}
