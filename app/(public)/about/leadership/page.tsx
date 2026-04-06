import CMSPage from '@/components/CMSPage';
import { Users } from 'lucide-react';

export const dynamic = 'force-dynamic';

function LeadershipContent() {
  return (
    <div className="space-y-12">
      <div className="text-center">
        <Users className="w-16 h-16 mx-auto mb-6 text-primary-600" />
        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
          Our church is led by a team of dedicated elders and staff who are committed to serving God and our congregation.
        </p>
      </div>

      <div className="bg-neutral-50 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold text-neutral-900 mb-4">Meet Our Team</h2>
        <p className="text-neutral-600">
          Leadership information coming soon. Please check back later or contact us for more information about our pastoral staff and elders.
        </p>
      </div>
    </div>
  );
}

export default function LeadershipPage() {
  return (
    <CMSPage
      slug="leadership"
      fallbackTitle="Our Leadership"
      fallbackContent={<LeadershipContent />}
    />
  );
}
