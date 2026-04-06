'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import type { Sermon, SermonSeries } from '@/lib/types';

export default function EditSermonPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [sermon, setSermon] = useState<Sermon | null>(null);
  const [series, setSeries] = useState<SermonSeries[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState<string | null>(null);
  const [fileUrls, setFileUrls] = useState<{
    slides_url?: string;
    notes_url?: string;
  }>({});

  useEffect(() => {
    const fetchData = async () => {
      const [sermonRes, seriesRes] = await Promise.all([
        fetch(`/api/admin/sermons/${id}`),
        supabase.from('sermon_series').select('*').order('name'),
      ]);

      if (sermonRes.ok) {
        const data = await sermonRes.json();
        setSermon(data);
        setFileUrls({
          slides_url: data.slides_url || undefined,
          notes_url: data.notes_url || undefined,
        });
      } else {
        setError('Sermon not found');
      }

      setSeries(seriesRes.data || []);
      setLoading(false);
    };
    fetchData();
  }, [id]);

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: 'slides_url' | 'notes_url'
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(field);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('bucket', 'sermons');

    const response = await fetch('/api/admin/upload', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const { url } = await response.json();
      setFileUrls((prev) => ({ ...prev, [field]: url }));
    } else {
      alert('Upload failed');
    }
    setUploading(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get('title') as string,
      date: formData.get('date') as string,
      speaker: formData.get('speaker') as string,
      scripture: formData.get('scripture') as string,
      series_id: formData.get('series_id') || null,
      description: formData.get('description') as string,
      audio_url: formData.get('audio_url') || null,
      video_url: formData.get('video_url') || null,
      slides_url: fileUrls.slides_url || null,
      notes_url: fileUrls.notes_url || null,
    };

    const response = await fetch(`/api/admin/sermons/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      router.push('/admin/sermons');
    } else {
      const result = await response.json();
      setError(result.error || 'Failed to update sermon');
    }
    setSaving(false);
  };

  if (loading) {
    return <div className="text-gray-600">Loading...</div>;
  }

  if (!sermon) {
    return <div className="text-red-600">{error || 'Sermon not found'}</div>;
  }

  return (
    <div className="max-w-2xl">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Sermon</h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title *
            </label>
            <input
              type="text"
              name="title"
              required
              defaultValue={sermon.title}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date *
              </label>
              <input
                type="date"
                name="date"
                required
                defaultValue={sermon.date}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Speaker *
              </label>
              <input
                type="text"
                name="speaker"
                required
                defaultValue={sermon.speaker}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Scripture *
              </label>
              <input
                type="text"
                name="scripture"
                required
                defaultValue={sermon.scripture}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Series
              </label>
              <select
                name="series_id"
                defaultValue={sermon.series_id || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">No series</option>
                {series.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              name="description"
              required
              rows={3}
              defaultValue={sermon.description}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Audio URL
              </label>
              <input
                type="url"
                name="audio_url"
                defaultValue={sermon.audio_url || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Video URL
              </label>
              <input
                type="url"
                name="video_url"
                defaultValue={sermon.video_url || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Slides (PDF)
              </label>
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => handleFileUpload(e, 'slides_url')}
                disabled={uploading === 'slides_url'}
                className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
              />
              {uploading === 'slides_url' && (
                <p className="text-sm text-blue-600 mt-1">Uploading...</p>
              )}
              {fileUrls.slides_url && (
                <p className="text-sm text-green-600 mt-1">
                  <a href={fileUrls.slides_url} target="_blank" rel="noopener noreferrer" className="underline">
                    View current file
                  </a>
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes (PDF)
              </label>
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => handleFileUpload(e, 'notes_url')}
                disabled={uploading === 'notes_url'}
                className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
              />
              {uploading === 'notes_url' && (
                <p className="text-sm text-blue-600 mt-1">Uploading...</p>
              )}
              {fileUrls.notes_url && (
                <p className="text-sm text-green-600 mt-1">
                  <a href={fileUrls.notes_url} target="_blank" rel="noopener noreferrer" className="underline">
                    View current file
                  </a>
                </p>
              )}
            </div>
          </div>

          {error && (
            <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={saving || uploading !== null}
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
