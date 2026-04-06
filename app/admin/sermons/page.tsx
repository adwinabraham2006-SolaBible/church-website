'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import type { Sermon, SermonSeries } from '@/lib/types';

type SermonWithSeries = Sermon & { sermon_series: SermonSeries | null };

export default function SermonsListPage() {
  const [sermons, setSermons] = useState<SermonWithSeries[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchSermons = async () => {
    const { data, error } = await supabase
      .from('sermons')
      .select('*, sermon_series(*)')
      .order('date', { ascending: false });

    if (error) {
      console.error('Error fetching sermons:', error);
    } else {
      setSermons(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSermons();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this sermon?')) return;

    setDeleting(id);
    const response = await fetch(`/api/admin/sermons/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setSermons(sermons.filter((s) => s.id !== id));
    } else {
      alert('Failed to delete sermon');
    }
    setDeleting(null);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Sermons</h1>
        <Link
          href="/admin/sermons/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Add Sermon
        </Link>
      </div>

      {loading ? (
        <div className="text-gray-600">Loading...</div>
      ) : sermons.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center text-gray-600">
          No sermons yet. Add your first one!
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
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Speaker
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Series
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sermons.map((sermon) => (
                <tr key={sermon.id}>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{sermon.title}</div>
                    <div className="text-sm text-gray-500">{sermon.scripture}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                    {sermon.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                    {sermon.speaker}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                    {sermon.sermon_series?.name || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                    <Link
                      href={`/admin/sermons/${sermon.id}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(sermon.id)}
                      disabled={deleting === sermon.id}
                      className="text-red-600 hover:text-red-800 disabled:opacity-50"
                    >
                      {deleting === sermon.id ? 'Deleting...' : 'Delete'}
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
