import CMSPage from '@/components/CMSPage';
import { Clock } from 'lucide-react';

export const dynamic = 'force-dynamic';

function HistoryContent() {
  return (
    <div className="space-y-12">
      <div className="text-center">
        <Clock className="w-16 h-16 mx-auto mb-6 text-primary-600" />
        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
          Discover the story of how God has worked through our church community over the years.
        </p>
      </div>

      <div className="bg-neutral-50 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold text-neutral-900 mb-4">Our Story</h2>
        <p className="text-neutral-600">
          Church history information coming soon. Please check back later or contact us to learn more about our church&apos;s journey.
        </p>
      </div>
    </div>
  );
}

export default function HistoryPage() {
  return (
    <CMSPage
      slug="history"
      fallbackTitle="Our History"
      fallbackContent={<HistoryContent />}
    />
  );
}
