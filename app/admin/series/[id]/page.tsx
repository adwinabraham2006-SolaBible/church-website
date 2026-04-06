'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import type { SermonSeries } from '@/lib/types';

export default function EditSeriesPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [series, setSeries] = useState<SermonSeries | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSeries = async () => {
      const response = await fetch(`/api/admin/series/${id}`);
      if (response.ok) {
        const data = await response.json();
        setSeries(data);
      } else {
        setError('Series not found');
      }
      setLoading(false);
    };
    fetchSeries();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      start_date: formData.get('start_date') || null,
      end_date: formData.get('end_date') || null,
      description: formData.get('description') || null,
    };

    const response = await fetch(`/api/admin/series/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      router.push('/admin/series');
    } else {
      const result = await response.json();
      setError(result.error || 'Failed to update series');
    }
    setSaving(false);
  };

  if (loading) {
    return <div className="text-gray-600">Loading...</div>;
  }

  if (!series) {
    return <div className="text-red-600">{error || 'Series not found'}</div>;
  }

  return (
    <div className="max-w-2xl">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Series</h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Series Name *
            </label>
            <input
              type="text"
              name="name"
              required
              defaultValue={series.name}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                name="start_date"
                defaultValue={series.start_date || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                name="end_date"
                defaultValue={series.end_date || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              rows={3}
              defaultValue={series.description || ''}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={saving}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
    </div>
  );
}
