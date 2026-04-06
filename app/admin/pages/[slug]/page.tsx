'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import type { Page } from '@/lib/types';
import { ArrowLeft, ExternalLink, Upload } from 'lucide-react';

// Dynamic import for TipTap to avoid SSR issues
const TipTapEditor = dynamic(
  () => import('../../components/TipTapEditor'),
  { ssr: false, loading: () => <div className="border rounded-lg p-4 h-[400px] flex items-center justify-center text-gray-500">Loading editor...</div> }
);

export default function EditPagePage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;

  const [page, setPage] = useState<Page | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchPage = async () => {
      const response = await fetch(`/api/admin/pages/${slug}`);
      if (response.ok) {
        const data = await response.json();
        setPage(data);
        setTitle(data.title);
        setContent(data.content || '');
        setImageUrl(data.image_url || '');
      } else {
        setError('Page not found');
      }
      setLoading(false);
    };
    fetchPage();
  }, [slug]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('bucket', 'pages');

    const response = await fetch('/api/admin/upload', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const { url } = await response.json();
      setImageUrl(url);
    } else {
      alert('Upload failed');
    }
    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    const response = await fetch(`/api/admin/pages/${slug}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        content,
        image_url: imageUrl || null,
      }),
    });

    if (response.ok) {
      setSuccess('Page saved successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } else {
      const result = await response.json();
      setError(result.error || 'Failed to save page');
    }
    setSaving(false);
  };

  const getPublicUrl = (): string => {
    const ministryPages = ['children', 'youth', 'adults', 'seniors', 'women', 'men'];
    const servePages = ['volunteer', 'missions'];
    const aboutPages = ['beliefs', 'leadership', 'history'];

    if (ministryPages.includes(slug)) return `/ministries/${slug}`;
    if (servePages.includes(slug)) return `/serve/${slug}`;
    if (aboutPages.includes(slug)) return `/about/${slug}`;
    return `/${slug}`;
  };

  if (loading) {
    return <div className="text-gray-600">Loading...</div>;
  }

  if (!page) {
    return <div className="text-red-600">{error || 'Page not found'}</div>;
  }

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/pages"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Pages
          </Link>
        </div>
        <a
          href={getPublicUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
        >
          <ExternalLink className="w-4 h-4" />
          Preview Page
        </a>
      </div>

      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Page: {page.title}</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div className="bg-white rounded-lg shadow p-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Page Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Featured Image */}
        <div className="bg-white rounded-lg shadow p-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Featured Image
          </label>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer transition-colors">
                <Upload className="w-4 h-4" />
                <span>{uploading ? 'Uploading...' : 'Upload Image'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                  className="hidden"
                />
              </label>
              <span className="text-gray-500">or</span>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Enter image URL"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            {imageUrl && (
              <div className="relative">
                <img
                  src={imageUrl}
                  alt="Featured"
                  className="max-h-48 rounded-lg object-cover"
                />
                <button
                  type="button"
                  onClick={() => setImageUrl('')}
                  className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Content Editor */}
        <div className="bg-white rounded-lg shadow p-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Page Content
          </label>
          <TipTapEditor content={content} onChange={setContent} />
        </div>

        {/* Error/Success Messages */}
        {error && (
          <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-50 text-green-700 px-4 py-3 rounded-lg text-sm">
            {success}
          </div>
        )}

        {/* Actions */}
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
