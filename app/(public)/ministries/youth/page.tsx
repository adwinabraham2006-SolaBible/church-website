import CMSPage from '@/components/CMSPage';

export const dynamic = 'force-dynamic';

export default async function YouthMinistryPage() {
  return (
    <CMSPage
      slug="youth"
      fallbackTitle="Youth Ministry"
    />
  );
}
