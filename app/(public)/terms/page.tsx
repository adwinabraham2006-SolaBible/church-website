export const dynamic = 'force-dynamic';
import CMSPage from '@/components/CMSPage';

export default function TermsPage() {
  return (
    <CMSPage
      slug="terms"
      fallbackTitle="Terms of Use"
      fallbackContent={
        <p className="text-neutral-500 italic">Terms of use coming soon.</p>
      }
    />
  );
}
