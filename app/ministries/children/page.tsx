import MinistryTemplate from '@/components/MinistryTemplate';

export default function ChildrenMinistryPage() {
  return (
    <MinistryTemplate
      title="Children's Ministry"
      subtitle="Nurturing young hearts to love and follow Jesus"
      description="Our Children's Ministry provides a safe, fun, and engaging environment where kids can learn about God's love through age-appropriate lessons, worship, crafts, and activities. We partner with parents to lay a strong spiritual foundation in the lives of children from birth through 5th grade."
      heroImage="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=2070"
      ageGroup="Birth - 5th Grade"
      meetingTime="Sundays during 9:00 AM & 11:00 AM services"
      location="Children's Wing, Rooms 101-105"
      contactPerson={{
        name: 'Sarah Mitchell',
        email: 'children@faithcommunity.org',
        phone: '(555) 123-4567',
      }}
      callToAction={{
        text: 'Register Your Child',
        href: '/contact',
      }}
      resources={[
        {
          title: 'Parent Handbook',
          description: 'Information about our children\'s ministry policies and procedures',
          downloadUrl: '#',
        },
        {
          title: 'Safety & Security Policy',
          description: 'Learn about our check-in process and safety measures',
          downloadUrl: '#',
        },
        {
          title: 'Monthly Curriculum',
          description: 'What your child is learning this month',
          downloadUrl: '#',
        },
        {
          title: 'At-Home Devotions',
          description: 'Family devotional guides to continue learning at home',
          downloadUrl: '#',
        },
      ]}
      gallery={[
        {
          url: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=800',
          alt: 'Children in Sunday School',
        },
        {
          url: 'https://images.unsplash.com/photo-1560291029-59bb7d5e82e9?q=80&w=800',
          alt: 'Kids Worship',
        },
        {
          url: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=800',
          alt: 'VBS Activities',
        },
      ]}
    >
      {/* Age Groups Section */}
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-4 font-serif">
            Age-Specific Programs
          </h2>
          <p className="text-neutral-600 mb-6">
            We provide age-appropriate environments where children can learn and grow at their own pace.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-6">
            <h3 className="text-xl font-bold text-primary-900 mb-2">Nursery</h3>
            <p className="text-sm text-primary-700 mb-3">Birth - 2 years</p>
            <p className="text-neutral-700">
              A safe, loving environment with caring volunteers where infants and toddlers
              are cared for during services.
            </p>
          </div>

          <div className="bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-xl p-6">
            <h3 className="text-xl font-bold text-secondary-900 mb-2">Preschool</h3>
            <p className="text-sm text-secondary-700 mb-3">3 - 5 years (Pre-K)</p>
            <p className="text-neutral-700">
              Bible stories, songs, and activities designed to introduce young children
              to God's love in fun and engaging ways.
            </p>
          </div>

          <div className="bg-gradient-to-br from-accent-50 to-accent-100 rounded-xl p-6">
            <h3 className="text-xl font-bold text-accent-900 mb-2">Elementary</h3>
            <p className="text-sm text-accent-700 mb-3">Kindergarten - 2nd Grade</p>
            <p className="text-neutral-700">
              Interactive lessons that help children understand God's Word and how to
              apply it to their daily lives.
            </p>
          </div>

          <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-6">
            <h3 className="text-xl font-bold text-primary-900 mb-2">Upper Elementary</h3>
            <p className="text-sm text-primary-700 mb-3">3rd - 5th Grade</p>
            <p className="text-neutral-700">
              Deeper Bible study and discussion that challenges kids to grow in their
              faith and develop their relationship with God.
            </p>
          </div>
        </div>

        <div className="bg-neutral-100 rounded-xl p-6 mt-8">
          <h3 className="text-xl font-bold text-neutral-900 mb-3">Special Events</h3>
          <ul className="space-y-2 text-neutral-700">
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span><strong>Vacation Bible School (VBS)</strong> - Annual summer program (June)</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span><strong>Fall Festival</strong> - Safe Halloween alternative (October)</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span><strong>Christmas Program</strong> - Kids present the nativity story (December)</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span><strong>Easter Egg Hunt</strong> - Celebrating the resurrection (April)</span>
            </li>
          </ul>
        </div>
      </div>
    </MinistryTemplate>
  );
}
