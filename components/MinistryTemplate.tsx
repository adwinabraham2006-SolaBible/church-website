import { ReactNode } from 'react';
import { Clock, MapPin, User, Download } from 'lucide-react';
import Link from 'next/link';

interface MinistryTemplateProps {
  title: string;
  subtitle: string;
  description: string;
  heroImage: string;
  meetingTime?: string;
  location?: string;
  contactPerson?: {
    name: string;
    email: string;
    phone?: string;
  };
  ageGroup?: string;
  callToAction?: {
    text: string;
    href: string;
  };
  resources?: {
    title: string;
    description: string;
    downloadUrl: string;
  }[];
  gallery?: {
    url: string;
    alt: string;
  }[];
  children?: ReactNode;
}

export default function MinistryTemplate({
  title,
  subtitle,
  description,
  heroImage,
  meetingTime,
  location,
  contactPerson,
  ageGroup,
  callToAction,
  resources,
  gallery,
  children,
}: MinistryTemplateProps) {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${heroImage}')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/80 to-neutral-900/60"></div>
        </div>
        <div className="relative z-10 container-custom text-center text-white">
          {ageGroup && (
            <div className="inline-block bg-primary-600 text-white text-sm font-semibold px-4 py-2 rounded-full mb-4">
              {ageGroup}
            </div>
          )}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 font-serif">
            {title}
          </h1>
          <p className="text-xl md:text-2xl text-neutral-100 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {/* Description */}
            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-lg text-neutral-700 leading-relaxed">
                {description}
              </p>
            </div>

            {/* Info Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {meetingTime && (
                <div className="bg-primary-50 rounded-xl p-6 text-center">
                  <Clock className="w-10 h-10 text-primary-600 mx-auto mb-3" />
                  <h3 className="font-bold text-neutral-900 mb-2">Meeting Time</h3>
                  <p className="text-neutral-700">{meetingTime}</p>
                </div>
              )}
              {location && (
                <div className="bg-secondary-50 rounded-xl p-6 text-center">
                  <MapPin className="w-10 h-10 text-secondary-600 mx-auto mb-3" />
                  <h3 className="font-bold text-neutral-900 mb-2">Location</h3>
                  <p className="text-neutral-700">{location}</p>
                </div>
              )}
              {contactPerson && (
                <div className="bg-accent-50 rounded-xl p-6 text-center">
                  <User className="w-10 h-10 text-accent-600 mx-auto mb-3" />
                  <h3 className="font-bold text-neutral-900 mb-2">Contact</h3>
                  <p className="text-neutral-700 font-semibold">{contactPerson.name}</p>
                  <a
                    href={`mailto:${contactPerson.email}`}
                    className="text-sm text-accent-600 hover:underline block mt-1"
                  >
                    {contactPerson.email}
                  </a>
                  {contactPerson.phone && (
                    <a
                      href={`tel:${contactPerson.phone}`}
                      className="text-sm text-accent-600 hover:underline block"
                    >
                      {contactPerson.phone}
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Custom Content */}
            {children && <div className="mb-12">{children}</div>}

            {/* Call to Action */}
            {callToAction && (
              <div className="text-center mb-12">
                <Link href={callToAction.href} className="btn-primary text-lg">
                  {callToAction.text}
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Resources Section */}
      {resources && resources.length > 0 && (
        <section className="section-padding bg-neutral-50">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-8 text-center font-serif">
                Resources & Downloads
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {resources.map((resource, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
                  >
                    <h3 className="text-xl font-bold text-neutral-900 mb-2">
                      {resource.title}
                    </h3>
                    <p className="text-neutral-600 mb-4">{resource.description}</p>
                    <a
                      href={resource.downloadUrl}
                      className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold"
                      download
                    >
                      <Download className="w-5 h-5" />
                      Download
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Photo Gallery */}
      {gallery && gallery.length > 0 && (
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-8 text-center font-serif">
                Photo Gallery
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {gallery.map((photo, index) => (
                  <div
                    key={index}
                    className="relative h-64 rounded-xl overflow-hidden group cursor-pointer"
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-500"
                      style={{ backgroundImage: `url('${photo.url}')` }}
                    />
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
