'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { Page } from '@/lib/types';

export default function PagesListPage() {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPages = async () => {
      const response = await fetch('/api/admin/pages');
      if (response.ok) {
        const data = await response.json();
        setPages(data);
      }
      setLoading(false);
    };
    fetchPages();
  }, []);

  const getPageCategory = (slug: string): string => {
    const ministryPages = ['children', 'youth', 'adults', 'seniors', 'women', 'men'];
    const servePages = ['volunteer', 'missions'];
    const aboutPages = ['beliefs', 'leadership', 'history'];

    if (ministryPages.includes(slug)) return 'Ministry';
    if (servePages.includes(slug)) return 'Serve';
    if (aboutPages.includes(slug)) return 'About';
    if (slug === 'contact') return 'Contact';
    return 'Other';
  };

  const getPublicUrl = (slug: string): string => {
    const ministryPages = ['children', 'youth', 'adults', 'seniors', 'women', 'men'];
    const servePages = ['volunteer', 'missions'];
    const aboutPages = ['beliefs', 'leadership', 'history'];

    if (ministryPages.includes(slug)) return `/ministries/${slug}`;
    if (servePages.includes(slug)) return `/serve/${slug}`;
    if (aboutPages.includes(slug)) return `/about/${slug}`;
    return `/${slug}`;
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Pages</h1>
      </div>

      {loading ? (
        <div className="text-gray-600">Loading...</div>
      ) : pages.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center text-gray-600">
          No pages found. Run the database migration to create default pages.
        </div>
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
                  Last Updated
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pages.map((page) => (
                <tr key={page.id}>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{page.title}</div>
                    <div className="text-sm text-gray-500">/{page.slug}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {getPageCategory(page.slug)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                    {new Date(page.updated_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit',
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right space-x-3">
                    <a
                      href={getPublicUrl(page.slug)}
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
                      Edit
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
