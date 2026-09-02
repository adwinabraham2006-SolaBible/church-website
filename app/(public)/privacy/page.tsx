export const dynamic = 'force-dynamic';
import CMSPage from '@/components/CMSPage';

export default function PrivacyPage() {
  return (
    <CMSPage
      slug="privacy"
      fallbackTitle="Privacy Policy"
      fallbackContent={
        <p className="text-neutral-500 italic">Privacy policy coming soon.</p>
      }
    />
  );
}
