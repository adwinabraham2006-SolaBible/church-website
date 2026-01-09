'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';

interface SubMenuItem {
  name: string;
  href: string;
}

interface MenuItem {
  name: string;
  href: string;
  submenu?: SubMenuItem[];
}

const menuItems: MenuItem[] = [
  {
    name: 'About',
    href: '/about',
    submenu: [
      { name: 'What We Believe', href: '/about/beliefs' },
      { name: 'Leadership & Staff', href: '/about/leadership' },
      { name: 'Our History', href: '/about/history' },
      { name: 'Visit Us', href: '/about/visit' },
    ],
  },
  {
    name: 'Ministries',
    href: '/ministries',
    submenu: [
      { name: 'Children', href: '/ministries/children' },
      { name: 'Youth', href: '/ministries/youth' },
      { name: 'College/Young Adults', href: '/ministries/young-adults' },
      { name: 'Adults', href: '/ministries/adults' },
      { name: 'Seniors', href: '/ministries/seniors' },
      { name: "Women&apos;s Ministry", href: '/ministries/women' },
      { name: "Men&apos;s Ministry", href: '/ministries/men' },
    ],
  },
  {
    name: 'Serve',
    href: '/serve',
    submenu: [
      { name: 'Volunteer Opportunities', href: '/serve/volunteer' },
      { name: 'Mission & Outreach', href: '/serve/missions' },
    ],
  },
  {
    name: 'Events & Calendar',
    href: '/events',
  },
  {
    name: 'Resources',
    href: '/resources',
    submenu: [
      { name: 'Sermons', href: '/resources/sermons' },
      { name: 'Bulletin', href: '/resources/bulletin' },
    ],
  },
];

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleDropdown = (menuName: string) => {
    setActiveDropdown(activeDropdown === menuName ? null : menuName);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo and Church Name */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">FC</span>
            </div>
            <div className="hidden sm:block">
              <div className="text-xl font-bold text-neutral-900">Faith Community Church</div>
              <div className="text-xs text-neutral-600">Growing Together in Faith</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {menuItems.map((item) => (
              <div key={item.name} className="relative group">
                {item.submenu ? (
                  <>
                    <button
                      className="flex items-center space-x-1 px-4 py-2 text-neutral-700 hover:text-primary-600 font-medium transition-colors"
                      onMouseEnter={() => setActiveDropdown(item.name)}
                    >
                      <span>{item.name}</span>
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    <div
                      className="absolute left-0 mt-0 w-56 bg-white rounded-lg shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-4 py-2 text-sm text-neutral-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="px-4 py-2 text-neutral-700 hover:text-primary-600 font-medium transition-colors"
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            <Link
              href="/give"
              className="ml-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
            >
              Give
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-neutral-700 hover:text-primary-600"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-neutral-200 bg-white">
          <div className="container-custom py-4 space-y-2">
            {menuItems.map((item) => (
              <div key={item.name}>
                {item.submenu ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(item.name)}
                      className="flex items-center justify-between w-full px-4 py-3 text-neutral-700 hover:bg-primary-50 rounded-lg font-medium transition-colors"
                    >
                      <span>{item.name}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          activeDropdown === item.name ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {activeDropdown === item.name && (
                      <div className="ml-4 mt-2 space-y-1">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-4 py-2 text-sm text-neutral-600 hover:bg-primary-50 hover:text-primary-600 rounded-lg transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="block px-4 py-3 text-neutral-700 hover:bg-primary-50 rounded-lg font-medium transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            <Link
              href="/give"
              className="block text-center bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors mt-4"
              onClick={() => setMobileMenuOpen(false)}
            >
              Give
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
