import CMSPage from '@/components/CMSPage';

export const dynamic = 'force-dynamic';

export default async function ContactPage() {
  return (
    <CMSPage
      slug="contact"
      fallbackTitle="Contact Us"
    />
  );
}
