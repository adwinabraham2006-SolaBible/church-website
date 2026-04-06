'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import type { Staff } from '@/lib/types';

export default function EditStaffPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [staff, setStaff] = useState<Staff | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchStaff = async () => {
      const response = await fetch(`/api/admin/staff/${id}`);
      if (response.ok) {
        const data = await response.json();
        setStaff(data);
        setPhotoUrl(data.photo_url);
      } else {
        setError('Staff member not found');
      }
      setLoading(false);
    };
    fetchStaff();
  }, [id]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('bucket', 'staff');

    const response = await fetch('/api/admin/upload', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const { url } = await response.json();
      setPhotoUrl(url);
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
    const orderValue = formData.get('display_order') as string;
    const data = {
      name: formData.get('name') as string,
      role: formData.get('role') as string,
      bio: formData.get('bio') || null,
      photo_url: photoUrl,
      display_order: orderValue ? parseInt(orderValue) : 0,
    };

    const response = await fetch(`/api/admin/staff/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      router.push('/admin/staff');
    } else {
      const result = await response.json();
      setError(result.error || 'Failed to update staff member');
    }
    setSaving(false);
  };

  if (loading) {
    return <div className="text-gray-600">Loading...</div>;
  }

  if (!staff) {
    return <div className="text-red-600">{error || 'Staff member not found'}</div>;
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Staff Member</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name *
          </label>
          <input
            type="text"
            name="name"
            required
            defaultValue={staff.name}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Role *
          </label>
          <input
            type="text"
            name="role"
            required
            defaultValue={staff.role}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Bio
          </label>
          <textarea
            name="bio"
            rows={4}
            defaultValue={staff.bio || ''}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Photo
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            disabled={uploading}
            className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
          />
          {uploading && <p className="text-sm text-blue-600 mt-1">Uploading...</p>}
          {photoUrl && (
            <img src={photoUrl} alt="Preview" className="mt-2 h-24 w-24 object-cover rounded-full" />
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Display Order
          </label>
          <input
            type="number"
            name="display_order"
            min="0"
            defaultValue={staff.display_order}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <p className="text-sm text-gray-500 mt-1">Lower numbers appear first</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
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
