import CMSPage from '@/components/CMSPage';

export const dynamic = 'force-dynamic';

export default async function MissionsPage() {
  return (
    <CMSPage
      slug="missions"
      fallbackTitle="Mission & Outreach"
      heroImage="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070"
      fallbackContent={
        <div className="space-y-6">
          <p className="text-lg text-neutral-700">
            We are committed to sharing the love of Christ locally and around the world.
          </p>
          <p className="text-neutral-600">
            Our missions program supports missionaries, organizes local outreach events, and provides
            opportunities for short-term mission trips. We believe every believer is called to be on mission
            wherever God has placed them.
          </p>
        </div>
      }
    />
  );
}
