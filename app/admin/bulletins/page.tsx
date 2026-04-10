'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { Bulletin } from '@/lib/types';

export default function BulletinsListPage() {
  const [bulletins, setBulletins] = useState<Bulletin[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchBulletins = async () => {
    const response = await fetch('/api/admin/bulletins');
    if (response.ok) {
      const data = await response.json();
      setBulletins(data || []);
    } else {
      console.error('Error fetching bulletins');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBulletins();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this bulletin?')) return;

    setDeleting(id);
    const response = await fetch(`/api/admin/bulletins/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setBulletins(bulletins.filter((b) => b.id !== id));
    } else {
      alert('Failed to delete bulletin');
    }
    setDeleting(null);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Bulletins</h1>
        <Link
          href="/admin/bulletins/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Add Bulletin
        </Link>
      </div>

      {loading ? (
        <div className="text-gray-600">Loading...</div>
      ) : bulletins.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center text-gray-600">
          No bulletins yet. Add your first one!
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Week Of
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  PDF
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
              {bulletins.map((bulletin) => (
                <tr key={bulletin.id}>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                    {bulletin.week_of}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                    {bulletin.pdf_url ? (
                      <a
                        href={bulletin.pdf_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        View PDF
                      </a>
                    ) : (
                      <span className="text-gray-400">No PDF</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        bulletin.published
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {bulletin.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                    <Link
                      href={`/admin/bulletins/${bulletin.id}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(bulletin.id)}
                      disabled={deleting === bulletin.id}
                      className="text-red-600 hover:text-red-800 disabled:opacity-50"
                    >
                      {deleting === bulletin.id ? 'Deleting...' : 'Delete'}
                    </button>
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
