import Link from 'next/link';
import { Users, Heart, BookOpen, Coffee, Home, Briefcase } from 'lucide-react';

const ministries = [
  {
    title: 'Children',
    description: 'Nurturing young hearts to love and follow Jesus',
    ageGroup: 'Birth - 5th Grade',
    icon: Users,
    href: '/ministries/children',
    color: 'from-primary-500 to-primary-600',
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=800',
  },
  {
    title: 'Youth',
    description: 'Empowering the next generation to live boldly for Christ',
    ageGroup: '6th - 12th Grade',
    icon: Heart,
    href: '/ministries/youth',
    color: 'from-secondary-500 to-secondary-600',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800',
  },
  {
    title: 'College/Young Adults',
    description: 'Building faith and community during pivotal years',
    ageGroup: '18-29 years',
    icon: Coffee,
    href: '/ministries/young-adults',
    color: 'from-accent-500 to-accent-600',
    image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800',
  },
  {
    title: 'Adults',
    description: 'Growing together through small groups and Bible studies',
    ageGroup: '30+ years',
    icon: BookOpen,
    href: '/ministries/adults',
    color: 'from-primary-600 to-primary-700',
    image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=800',
  },
  {
    title: 'Seniors',
    description: 'Celebrating life and faith in the golden years',
    ageGroup: '65+ years',
    icon: Home,
    href: '/ministries/seniors',
    color: 'from-secondary-600 to-secondary-700',
    image: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?q=80&w=800',
  },
  {
    title: "Women's Ministry",
    description: 'Connecting women to grow in faith and friendship',
    ageGroup: 'All Ages',
    icon: Users,
    href: '/ministries/women',
    color: 'from-accent-600 to-accent-700',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=800',
  },
  {
    title: "Men's Ministry",
    description: 'Equipping men to lead with integrity and purpose',
    ageGroup: 'All Ages',
    icon: Briefcase,
    href: '/ministries/men',
    color: 'from-neutral-700 to-neutral-800',
    image: 'https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=800',
  },
];

export default function MinistriesPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-700 via-primary-600 to-primary-500 text-white py-20 md:py-28">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-serif">
              Ministries
            </h1>
            <p className="text-xl md:text-2xl text-primary-50 leading-relaxed">
              Discover meaningful ways to connect, grow, and serve together in community
            </p>
          </div>
        </div>
      </section>

      {/* Ministries Grid */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ministries.map((ministry) => {
              const Icon = ministry.icon;
              return (
                <Link
                  key={ministry.title}
                  href={ministry.href}
                  className="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden"
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-500"
                      style={{ backgroundImage: `url('${ministry.image}')` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 to-transparent"></div>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div
                          className={`bg-gradient-to-r ${ministry.color} w-10 h-10 rounded-lg flex items-center justify-center`}
                        >
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <span className="bg-white/90 text-neutral-900 text-xs font-semibold px-3 py-1 rounded-full">
                          {ministry.ageGroup}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
                      {ministry.title}
                    </h3>
                    <p className="text-neutral-600 mb-4">{ministry.description}</p>
                    <span className="text-primary-600 font-semibold text-sm flex items-center group/link">
                      Learn More
                      <span className="ml-1 transform group-hover/link:translate-x-1 transition-transform">
                        →
                      </span>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Get Involved Section */}
      <section className="section-padding bg-neutral-100">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6 font-serif">
              Get Involved
            </h2>
            <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
              Whether you're new to Faith Community or have been part of our family for years,
              there's a place for you to connect and grow. Our ministries are designed to help you
              deepen your faith, build meaningful relationships, and use your gifts to serve others.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary">
                Contact Us
              </Link>
              <Link href="/about/visit" className="btn-outline">
                Plan Your Visit
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
