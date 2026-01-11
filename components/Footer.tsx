import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-300">
      {/* Main Footer Content */}
      <div className="container-custom py-12 md:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Church Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <Image
                src="/logo.png"
                alt="Sola Bible Church Logo"
                width={40}
                height={40}
                className="w-10 h-10"
              />
              <div className="text-white font-bold text-lg">
                Sola Bible Church
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              Ephesians 3:20-21- Now to Him who is able to do far more abundantly beyond all that we ask or understand, according to the power that works within us, to Him be the glory in the church and in Christ Jesus to all generations forever and ever. Amen.
            </p>
            {/* Social Media */}
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-neutral-800 hover:bg-primary-600 p-2 rounded-full transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-neutral-800 hover:bg-primary-600 p-2 rounded-full transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-neutral-800 hover:bg-primary-600 p-2 rounded-full transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Service Times */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-primary-600" />
              Service Times
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <div className="text-white font-semibold">Sunday Morning</div>
                <div>9:00 AM - Old Testament Survey</div>
                <div>10:45 AM - Morning Service</div>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Contact Us</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 mr-2 text-primary-600 flex-shrink-0 mt-0.5" />
                <Link
                  href="https://maps.google.com/?q=219+King+Circle,+Temple,+TX+76501"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary-400 transition-colors"
                >
                  219 King Circle<br />
                  Temple, TX 76501
                </Link>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-2 text-primary-600 flex-shrink-0" />
                <a href="tel:+15551234567" className="hover:text-primary-400 transition-colors">
                  (555) 123-4567
                </a>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-2 text-primary-600 flex-shrink-0" />
                <a href="mailto:info@faithcommunity.org" className="hover:text-primary-400 transition-colors">
                  info@faithcommunity.org
                </a>
              </div>
            </div>

            {/* Office Hours */}
            <div className="mt-4 pt-4 border-t border-neutral-800">
              <div className="text-white font-semibold text-sm mb-2">Office Hours</div>
              <div className="text-sm space-y-1">
                <div>Monday - Friday: 9:00 AM - 5:00 PM</div>
                <div>Saturday - Sunday: Closed</div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
            <nav className="space-y-2 text-sm">
              <Link href="/about/visit" className="block hover:text-primary-400 transition-colors">
                Distinctives
              </Link>
              <Link href="/about/beliefs" className="block hover:text-primary-400 transition-colors">
                What We Believe
              </Link>
              <Link href="/ministries" className="block hover:text-primary-400 transition-colors">
                Ministries
              </Link>
              <Link href="/resources/sermons" className="block hover:text-primary-400 transition-colors">
                Sermons
              </Link>
              <Link href="/events" className="block hover:text-primary-400 transition-colors">
                Events & Calendar
              </Link>
              <Link href="/give" className="block hover:text-primary-400 transition-colors">
                Give Online
              </Link>
              <Link href="/contact" className="block hover:text-primary-400 transition-colors">
                Contact Us
              </Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-800">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-neutral-400">
            <div className="mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Sola Bible Church. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <Link href="/privacy" className="hover:text-primary-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-primary-400 transition-colors">
                Terms of Use
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
