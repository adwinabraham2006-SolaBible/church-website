import Link from 'next/link';

export const dynamic = 'force-dynamic';

const MINISTRIES = [
  { title: "Children's Ministry", href: '/ministries/children' },
  { title: 'Youth Ministry', href: '/ministries/youth' },
  { title: 'Adults Ministry', href: '/ministries/adults' },
  { title: 'Legacy Fellowship', href: '/ministries/seniors' },
  { title: "Women's Ministry", href: '/ministries/women' },
  { title: "Men's Ministry", href: '/ministries/men' },
  { title: 'Benevolence Ministry', href: '/ministries/benevolence' },
];

export default function MinistriesPage() {
  return (
    <main>
      <section className="relative bg-gradient-to-br from-primary-700 via-primary-600 to-primary-500 text-white py-20 md:py-28">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 font-serif">
              Ministries
            </h1>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {MINISTRIES.map((ministry) => (
              <Link
                key={ministry.href}
                href={ministry.href}
                className="group block bg-white border border-neutral-200 rounded-xl p-8 hover:border-primary-400 hover:shadow-md transition-all duration-200"
              >
                <h2 className="text-xl font-bold text-neutral-900 mb-4 group-hover:text-primary-600 transition-colors font-serif">
                  {ministry.title}
                </h2>
                <span className="inline-block text-primary-600 text-sm font-semibold">
                  Learn more →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
