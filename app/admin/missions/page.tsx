'use client';
import { useEffect, useState } from 'react';
import { Trash2, Upload } from 'lucide-react';

interface MissionsFile {
  id: string;
  name: string;
  url: string;
  type: 'photo' | 'pdf';
  display_order: number;
}

export default function MissionsAdminPage() {
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState<MissionsFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/missions').then(r => r.json()),
      fetch('/api/admin/missions/files').then(r => r.json()),
    ]).then(([content, fileData]) => {
      setDescription(content.description || '');
      setFiles(Array.isArray(fileData) ? fileData : []);
      setLoading(false);
    });
  }, []);

  const saveDescription = async () => {
    setSaving(true);
    setError('');
    const res = await fetch('/api/admin/missions', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description }),
    });
    setSaving(false);
    if (res.ok) {
      setSuccess('Saved!');
      setTimeout(() => setSuccess(''), 2500);
    } else {
      setError('Failed to save.');
    }
  };

  const uploadFile = async (e: React.ChangeEvent<HTMLInputElement>, type: 'photo' | 'pdf') => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError('');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('bucket', 'missions');

    const uploadRes = await fetch('/api/admin/upload', { method: 'POST', body: formData });
    if (!uploadRes.ok) {
      const r = await uploadRes.json().catch(() => ({}));
      setError(r.error || 'Upload failed');
      setUploading(false);
      e.target.value = '';
      return;
    }

    const { url } = await uploadRes.json();
    const name = file.name.replace(/\.[^/.]+$/, '');
    const addRes = await fetch('/api/admin/missions/files', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, url, type, display_order: files.length }),
    });

    if (addRes.ok) {
      const newFile = await addRes.json();
      setFiles(prev => [...prev, newFile]);
    } else {
      setError('File saved to storage but failed to record in database.');
    }
    setUploading(false);
    e.target.value = '';
  };

  const deleteFile = async (id: string) => {
    if (!confirm('Delete this file?')) return;
    const res = await fetch(`/api/admin/missions/files/${id}`, { method: 'DELETE' });
    if (res.ok) setFiles(prev => prev.filter(f => f.id !== id));
  };

  const photos = files.filter(f => f.type === 'photo');
  const pdfs = files.filter(f => f.type === 'pdf');

  if (loading) return <div className="text-gray-600">Loading...</div>;

  return (
    <div className="max-w-3xl space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">Missions &amp; Outreach</h1>

      {error && <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>}
      {success && <div className="bg-green-50 text-green-700 px-4 py-3 rounded-lg text-sm">{success}</div>}

      {/* Description */}
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Page Text</h2>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          rows={8}
          placeholder="Describe your missions and outreach work..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
        />
        <button
          onClick={saveDescription}
          disabled={saving}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 text-sm font-medium"
        >
          {saving ? 'Saving…' : 'Save Text'}
        </button>
      </div>

      {/* Photos */}
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Photos</h2>
          <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer text-sm font-medium transition-colors">
            <Upload className="w-4 h-4" />
            {uploading ? 'Uploading…' : 'Upload Photo'}
            <input type="file" accept="image/*" onChange={e => uploadFile(e, 'photo')} disabled={uploading} className="hidden" />
          </label>
        </div>
        {photos.length === 0 ? (
          <p className="text-sm text-gray-500">No photos yet.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {photos.map(f => (
              <div key={f.id} className="relative group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={f.url} alt={f.name} className="w-full h-32 object-cover rounded-lg" />
                <button
                  onClick={() => deleteFile(f.id)}
                  className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* PDFs */}
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">PDFs</h2>
          <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer text-sm font-medium transition-colors">
            <Upload className="w-4 h-4" />
            {uploading ? 'Uploading…' : 'Upload PDF'}
            <input type="file" accept="application/pdf" onChange={e => uploadFile(e, 'pdf')} disabled={uploading} className="hidden" />
          </label>
        </div>
        {pdfs.length === 0 ? (
          <p className="text-sm text-gray-500">No PDFs yet.</p>
        ) : (
          <ul className="divide-y divide-gray-100">
            {pdfs.map(f => (
              <li key={f.id} className="flex items-center justify-between py-3">
                <a href={f.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">
                  {f.name}
                </a>
                <button onClick={() => deleteFile(f.id)} className="text-red-500 hover:text-red-700 p-1">
                  <Trash2 className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
