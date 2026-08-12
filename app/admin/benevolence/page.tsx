'use client';
import { useEffect, useState } from 'react';
import { Trash2, Upload, Plus, Pencil, X, Check } from 'lucide-react';

interface BenevolenceFile {
  id: string;
  name: string;
  url: string;
  type: 'photo' | 'pdf';
  display_order: number;
}

interface BenevolenceAnnouncement {
  id: string;
  title: string;
  body: string;
  date: string | null;
  display_order: number;
}

export default function BenevolenceAdminPage() {
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState<BenevolenceFile[]>([]);
  const [announcements, setAnnouncements] = useState<BenevolenceAnnouncement[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // New announcement form state
  const [showNewForm, setShowNewForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newBody, setNewBody] = useState('');
  const [newDate, setNewDate] = useState('');
  const [addingAnn, setAddingAnn] = useState(false);

  // Edit announcement state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  const [editDate, setEditDate] = useState('');

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/benevolence').then(r => r.json()),
      fetch('/api/admin/benevolence/files').then(r => r.json()),
      fetch('/api/admin/benevolence/announcements').then(r => r.json()),
    ]).then(([content, fileData, annData]) => {
      setDescription(content.description || '');
      setFiles(Array.isArray(fileData) ? fileData : []);
      setAnnouncements(Array.isArray(annData) ? annData : []);
    }).catch(() => {
      setError('Failed to load. Check your connection and refresh.');
    }).finally(() => {
      setLoading(false);
    });
  }, []);

  const saveDescription = async () => {
    setSaving(true);
    setError('');
    const res = await fetch('/api/admin/benevolence', {
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

  const addAnnouncement = async () => {
    if (!newTitle.trim() || !newBody.trim()) return;
    setAddingAnn(true);
    const res = await fetch('/api/admin/benevolence/announcements', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: newTitle.trim(),
        body: newBody.trim(),
        date: newDate || null,
        display_order: announcements.length,
      }),
    });
    if (res.ok) {
      const created = await res.json();
      setAnnouncements(prev => [...prev, created]);
      setNewTitle('');
      setNewBody('');
      setNewDate('');
      setShowNewForm(false);
    } else {
      setError('Failed to add announcement.');
    }
    setAddingAnn(false);
  };

  const startEdit = (ann: BenevolenceAnnouncement) => {
    setEditingId(ann.id);
    setEditTitle(ann.title);
    setEditBody(ann.body);
    setEditDate(ann.date || '');
  };

  const saveEdit = async (id: string) => {
    const res = await fetch(`/api/admin/benevolence/announcements/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: editTitle, body: editBody, date: editDate || null }),
    });
    if (res.ok) {
      const updated = await res.json();
      setAnnouncements(prev => prev.map(a => a.id === id ? updated : a));
      setEditingId(null);
    } else {
      setError('Failed to save announcement.');
    }
  };

  const deleteAnnouncement = async (id: string) => {
    if (!confirm('Delete this announcement?')) return;
    const res = await fetch(`/api/admin/benevolence/announcements/${id}`, { method: 'DELETE' });
    if (res.ok) setAnnouncements(prev => prev.filter(a => a.id !== id));
  };

  const uploadFile = async (e: React.ChangeEvent<HTMLInputElement>, type: 'photo' | 'pdf') => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError('');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('bucket', 'benevolence');

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
    const addRes = await fetch('/api/admin/benevolence/files', {
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
    const res = await fetch(`/api/admin/benevolence/files/${id}`, { method: 'DELETE' });
    if (res.ok) setFiles(prev => prev.filter(f => f.id !== id));
  };

  const photos = files.filter(f => f.type === 'photo');
  const pdfs = files.filter(f => f.type === 'pdf');

  if (loading) return <div className="text-gray-600">Loading...</div>;

  return (
    <div className="max-w-3xl space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">Benevolence Ministry</h1>

      {error && <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>}
      {success && <div className="bg-green-50 text-green-700 px-4 py-3 rounded-lg text-sm">{success}</div>}

      {/* Description */}
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Ministry Description</h2>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          rows={8}
          placeholder="Describe the Benevolence Ministry..."
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

      {/* Announcements */}
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Announcements</h2>
          <button
            onClick={() => setShowNewForm(v => !v)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            Add Announcement
          </button>
        </div>

        {showNewForm && (
          <div className="border border-blue-200 rounded-lg p-4 space-y-3 bg-blue-50">
            <input
              type="text"
              placeholder="Title"
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <textarea
              placeholder="Body text..."
              value={newBody}
              onChange={e => setNewBody(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="date"
              value={newDate}
              onChange={e => setNewDate(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <div className="flex gap-2">
              <button
                onClick={addAnnouncement}
                disabled={addingAnn || !newTitle.trim() || !newBody.trim()}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 text-sm font-medium"
              >
                {addingAnn ? 'Adding…' : 'Add'}
              </button>
              <button
                onClick={() => { setShowNewForm(false); setNewTitle(''); setNewBody(''); setNewDate(''); }}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 text-sm font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {announcements.length === 0 ? (
          <p className="text-sm text-gray-500">No announcements yet.</p>
        ) : (
          <ul className="divide-y divide-gray-100">
            {announcements.map(ann => (
              <li key={ann.id} className="py-4">
                {editingId === ann.id ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={editTitle}
                      onChange={e => setEditTitle(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                    />
                    <textarea
                      value={editBody}
                      onChange={e => setEditBody(e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="date"
                      value={editDate}
                      onChange={e => setEditDate(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                    <div className="flex gap-2">
                      <button onClick={() => saveEdit(ann.id)} className="flex items-center gap-1 bg-green-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-green-700">
                        <Check className="w-3 h-3" /> Save
                      </button>
                      <button onClick={() => setEditingId(null)} className="flex items-center gap-1 bg-gray-200 text-gray-700 px-3 py-1.5 rounded-lg text-sm hover:bg-gray-300">
                        <X className="w-3 h-3" /> Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 text-sm">{ann.title}</p>
                      {ann.date && <p className="text-xs text-gray-500 mt-0.5">{ann.date}</p>}
                      <p className="text-sm text-gray-600 mt-1 whitespace-pre-wrap">{ann.body}</p>
                    </div>
                    <div className="flex gap-1 shrink-0">
                      <button onClick={() => startEdit(ann)} className="p-1.5 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button onClick={() => deleteAnnouncement(ann.id)} className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
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
