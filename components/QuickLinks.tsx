import Link from 'next/link';
import { Heart, Calendar, Users, Mail } from 'lucide-react';

const quickLinks = [
  {
    icon: Heart,
    title: 'Give',
    description: 'Support our ministry and mission through online giving',
    href: '/give',
    color: 'bg-primary-600',
    hoverColor: 'hover:bg-primary-700',
  },
  {
    icon: Calendar,
    title: 'Calendar',
    description: 'View upcoming events, services, and activities',
    href: '/events',
    color: 'bg-secondary-600',
    hoverColor: 'hover:bg-secondary-700',
  },
  {
    icon: Users,
    title: 'Ministries',
    description: 'Discover ways to connect and grow in community',
    href: '/ministries',
    color: 'bg-accent-600',
    hoverColor: 'hover:bg-accent-700',
  },
  {
    icon: Mail,
    title: 'Contact',
    description: 'Get in touch with our staff and church office',
    href: '/contact',
    color: 'bg-neutral-700',
    hoverColor: 'hover:bg-neutral-800',
  },
];

export default function QuickLinks() {
  return (
    <section className="section-padding bg-primary-700">
      <div className="container-custom">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.title}
                href={link.href}
                className="group bg-white rounded-lg shadow hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                <div className="p-6">
                  <div
                    className={`${link.color} ${link.hoverColor} w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 mb-1 group-hover:text-primary-700 transition-colors">
                    {link.title}
                  </h3>
                  <p className="text-neutral-600 text-sm leading-relaxed">
                    {link.description}
                  </p>
                </div>
                <div className="h-1 bg-secondary-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
