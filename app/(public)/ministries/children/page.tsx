import CMSPage from '@/components/CMSPage';

export const dynamic = 'force-dynamic';

export default async function ChildrenMinistryPage() {
  return (
    <CMSPage
      slug="children"
      fallbackTitle="Children's Ministry"
      heroImage="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=2070"
    />
  );
}
