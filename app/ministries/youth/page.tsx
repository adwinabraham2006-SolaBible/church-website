import MinistryTemplate from '@/components/MinistryTemplate';

export default function YouthMinistryPage() {
  return (
    <MinistryTemplate
      title="Youth Ministry"
      subtitle="Empowering the next generation to live boldly for Christ"
      description="Our Youth Ministry creates a dynamic community where middle and high school students can encounter God, build authentic friendships, and discover their purpose. Through weekly gatherings, small groups, service projects, and retreats, we help teens develop a faith that will last a lifetime."
      heroImage="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2070"
      ageGroup="6th - 12th Grade"
      meetingTime="Wednesdays 7:00 PM - 8:30 PM"
      location="Youth Center"
      contactPerson={{
        name: 'Marcus Johnson',
        email: 'youth@faithcommunity.org',
        phone: '(555) 123-4568',
      }}
      callToAction={{
        text: 'Connect with Youth Group',
        href: '/contact',
      }}
      resources={[
        {
          title: 'Parent Guide',
          description: 'Everything parents need to know about our youth ministry',
          downloadUrl: '#',
        },
        {
          title: 'Permission Slip',
          description: 'Required form for all youth events and trips',
          downloadUrl: '#',
        },
      ]}
      gallery={[
        {
          url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800',
          alt: 'Youth Worship',
        },
        {
          url: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=800',
          alt: 'Small Groups',
        },
        {
          url: 'https://images.unsplash.com/photo-1510022079733-8b58aca7c4a9?q=80&w=800',
          alt: 'Youth Camp',
        },
      ]}
    >
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-4 font-serif">
            What We Do
          </h2>
          <p className="text-neutral-600 mb-6">
            Our youth ministry focuses on helping students grow in their relationship with Jesus
            while building a supportive community of friends who encourage one another.
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-xl p-6">
            <h3 className="text-2xl font-bold mb-2">Wednesday Night Youth Group</h3>
            <p className="text-primary-50 mb-3">7:00 PM - 8:30 PM | Youth Center</p>
            <p className="text-white">
              High-energy worship, relevant Bible teaching, games, and small group discussions.
              Come as you are and bring your friends!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-secondary-50 rounded-xl p-6 border-2 border-secondary-200">
              <h3 className="text-xl font-bold text-neutral-900 mb-3">Small Groups</h3>
              <p className="text-neutral-700 mb-3">
                Gender-specific small groups meet throughout the week for deeper discussion,
                accountability, and friendship.
              </p>
              <p className="text-sm text-secondary-700">
                <strong>Guys Groups:</strong> Thursdays 7:00 PM<br />
                <strong>Girls Groups:</strong> Thursdays 7:00 PM
              </p>
            </div>

            <div className="bg-accent-50 rounded-xl p-6 border-2 border-accent-200">
              <h3 className="text-xl font-bold text-neutral-900 mb-3">Sunday School</h3>
              <p className="text-neutral-700 mb-3">
                Join us Sunday mornings during the 11:00 AM service for in-depth Bible study
                and application.
              </p>
              <p className="text-sm text-accent-700">
                <strong>Time:</strong> Sundays 11:00 AM<br />
                <strong>Location:</strong> Youth Room 201
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-4 font-serif">
            Annual Events & Trips
          </h2>
          <div className="bg-neutral-100 rounded-xl p-6">
            <ul className="space-y-3 text-neutral-700">
              <li className="flex items-start">
                <span className="text-primary-600 font-bold mr-3 text-lg">→</span>
                <div>
                  <strong className="text-neutral-900">Winter Camp</strong>
                  <span className="text-neutral-600"> - February</span>
                  <p className="text-sm text-neutral-600 mt-1">
                    Weekend retreat in the mountains with worship, teaching, snow activities, and fun.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 font-bold mr-3 text-lg">→</span>
                <div>
                  <strong className="text-neutral-900">Mission Trip</strong>
                  <span className="text-neutral-600"> - June</span>
                  <p className="text-sm text-neutral-600 mt-1">
                    One-week service trip where students serve communities in need and grow in faith.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 font-bold mr-3 text-lg">→</span>
                <div>
                  <strong className="text-neutral-900">Summer Camp</strong>
                  <span className="text-neutral-600"> - July</span>
                  <p className="text-sm text-neutral-600 mt-1">
                    Week-long camp with worship, teaching, recreation, and building friendships.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 font-bold mr-3 text-lg">→</span>
                <div>
                  <strong className="text-neutral-900">Fall Retreat</strong>
                  <span className="text-neutral-600"> - October</span>
                  <p className="text-sm text-neutral-600 mt-1">
                    Weekend getaway focused on spiritual growth and community building.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 font-bold mr-3 text-lg">→</span>
                <div>
                  <strong className="text-neutral-900">Game Nights & Social Events</strong>
                  <span className="text-neutral-600"> - Monthly</span>
                  <p className="text-sm text-neutral-600 mt-1">
                    Fun outings and activities like laser tag, bowling, movie nights, and more.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-primary-50 border-l-4 border-primary-600 rounded-r-xl p-6">
          <h3 className="text-xl font-bold text-neutral-900 mb-2">New to Youth Group?</h3>
          <p className="text-neutral-700 mb-4">
            We'd love to meet you! Feel free to show up any Wednesday night, or contact us ahead
            of time so we can welcome you personally. Everyone is welcome—no matter where you are
            in your faith journey.
          </p>
          <p className="text-sm text-neutral-600 italic">
            "Don't let anyone look down on you because you are young, but set an example for the
            believers in speech, in conduct, in love, in faith and in purity." - 1 Timothy 4:12
          </p>
        </div>
      </div>
    </MinistryTemplate>
  );
}
