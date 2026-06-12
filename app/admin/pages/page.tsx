'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { Page } from '@/lib/types';

const KNOWN_PAGES = [
  { slug: 'beliefs', title: 'Our Beliefs', category: 'About', publicUrl: '/about/beliefs' },
  { slug: 'leadership', title: 'Leadership', category: 'About', publicUrl: '/about/leadership' },
  { slug: 'history', title: 'Our History', category: 'About', publicUrl: '/about/history' },
  { slug: 'children', title: "Children's Ministry", category: 'Ministry', publicUrl: '/ministries/children' },
  { slug: 'youth', title: 'Youth Ministry', category: 'Ministry', publicUrl: '/ministries/youth' },
  { slug: 'adults', title: 'Adults Ministry', category: 'Ministry', publicUrl: '/ministries/adults' },
  { slug: 'seniors', title: 'Seniors Ministry', category: 'Ministry', publicUrl: '/ministries/seniors' },
  { slug: 'women', title: "Women's Ministry", category: 'Ministry', publicUrl: '/ministries/women' },
  { slug: 'men', title: "Men's Ministry", category: 'Ministry', publicUrl: '/ministries/men' },
  { slug: 'volunteer', title: 'Volunteer', category: 'Serve', publicUrl: '/serve/volunteer' },
  { slug: 'missions', title: 'Missions', category: 'Serve', publicUrl: '/serve/missions' },
  { slug: 'contact', title: 'Contact', category: 'Contact', publicUrl: '/contact' },
];

export default function PagesListPage() {
  const [savedPages, setSavedPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPages = async () => {
      const response = await fetch('/api/admin/pages');
      if (response.ok) {
        const data = await response.json();
        setSavedPages(data);
      }
      setLoading(false);
    };
    fetchPages();
  }, []);

  const savedSlugs = new Set(savedPages.map((p) => p.slug));

  const getLastUpdated = (slug: string): string | null => {
    const page = savedPages.find((p) => p.slug === slug);
    if (!page) return null;
    return new Date(page.updated_at).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Pages</h1>
      </div>

      {loading ? (
        <div className="text-gray-600">Loading...</div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {KNOWN_PAGES.map((page) => (
                <tr key={page.slug}>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{page.title}</div>
                    <div className="text-sm text-gray-500">/{page.slug}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {page.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {savedSlugs.has(page.slug) ? (
                      <span className="text-green-600">Last saved: {getLastUpdated(page.slug)}</span>
                    ) : (
                      <span className="text-amber-600">No content yet</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right space-x-3">
                    <a
                      href={page.publicUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-gray-800"
                    >
                      Preview
                    </a>
                    <Link
                      href={`/admin/pages/${page.slug}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {savedSlugs.has(page.slug) ? 'Edit' : 'Create'}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
