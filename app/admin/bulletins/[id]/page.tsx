'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import type { Bulletin } from '@/lib/types';

export default function EditBulletinPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [bulletin, setBulletin] = useState<Bulletin | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchBulletin = async () => {
      const response = await fetch(`/api/admin/bulletins/${id}`);
      if (response.ok) {
        const data = await response.json();
        setBulletin(data);
        setPdfUrl(data.pdf_url);
      } else {
        setError('Bulletin not found');
      }
      setLoading(false);
    };
    fetchBulletin();
  }, [id]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('bucket', 'bulletins');

    const response = await fetch('/api/admin/upload', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const { url } = await response.json();
      setPdfUrl(url);
    } else {
      alert('Upload failed');
    }
    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const data = {
      week_of: formData.get('week_of') as string,
      pdf_url: pdfUrl,
      published: formData.get('published') === 'on',
    };

    const response = await fetch(`/api/admin/bulletins/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      setSuccess(true);
      setTimeout(() => router.push('/admin/bulletins'), 1500);
    } else {
      const result = await response.json();
      setError(result.error || 'Failed to update bulletin');
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-gray-600">Loading...</div>;
  }

  if (!bulletin) {
    return <div className="text-red-600">{error || 'Bulletin not found'}</div>;
  }

  return (
    <div className="max-w-2xl">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Bulletin</h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Week Of *
            </label>
            <input
              type="date"
              name="week_of"
              required
              defaultValue={bulletin.week_of}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              PDF File
            </label>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileUpload}
              disabled={uploading}
              className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
            />
            {uploading && <p className="text-sm text-blue-600 mt-1">Uploading...</p>}
            {pdfUrl && (
              <p className="text-sm text-green-600 mt-1">
                <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="underline">
                  View current PDF
                </a>
              </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="published"
              id="published"
              defaultChecked={bulletin.published}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="published" className="text-sm font-medium text-gray-700">
              Published
            </label>
          </div>

          {error && (
            <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 text-green-700 px-4 py-3 rounded-lg text-sm">
              Bulletin saved successfully! Redirecting...
            </div>
          )}

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={saving || uploading}
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
