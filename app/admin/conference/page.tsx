'use client';

import { useState, useEffect } from 'react';

type Tab = 'details' | 'speakers' | 'schedule' | 'faq';

interface ConferenceDetails {
  id?: string;
  name: string;
  tagline: string;
  date: string;
  location: string;
  address: string;
  cost: string;
  description: string;
  scripture: string;
  scripture_ref: string;
  register_url: string;
}

interface Speaker {
  id: string;
  name: string;
  title: string;
  bio: string;
  photo_url: string;
  display_order: number;
}

interface ScheduleItem {
  id: string;
  time: string;
  label: string;
  note: string;
  display_order: number;
}

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  display_order: number;
}

const INPUT =
  'w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500';
const TEXTAREA = INPUT;

const DEFAULT_DETAILS: ConferenceDetails = {
  name: 'Open Hearts in a Closed World',
  tagline: "Women's Conference",
  date: 'December 5, 2026',
  location: 'Sola Bible Church, Temple, TX',
  address: '219 King Circle, Temple, TX 76501',
  cost: 'Free',
  description: '',
  scripture:
    'But the fruit of the Spirit is love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, self-control; against such things there is no law.',
  scripture_ref: 'Galatians 5:22–23',
  register_url: '',
};

const BLANK_SPEAKER = { name: '', title: '', bio: '', photo_url: '', display_order: 0 };
const BLANK_SCHEDULE = { time: '', label: '', note: '', display_order: 0 };
const BLANK_FAQ = { question: '', answer: '', display_order: 0 };

// ── Sub-form components ────────────────────────────────────────────────────

function SpeakerFormFields({
  data,
  onChange,
  onPhotoUpload,
  uploading,
}: {
  data: Partial<Speaker>;
  onChange: (patch: Partial<Speaker>) => void;
  onPhotoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  uploading: boolean;
}) {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
          <input
            required
            type="text"
            value={data.name || ''}
            onChange={(e) => onChange({ name: e.target.value })}
            className={INPUT}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title / Role</label>
          <input
            type="text"
            value={data.title || ''}
            onChange={(e) => onChange({ title: e.target.value })}
            className={INPUT}
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
        <textarea
          rows={4}
          value={data.bio || ''}
          onChange={(e) => onChange({ bio: e.target.value })}
          className={TEXTAREA}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Photo</label>
        <input
          type="file"
          accept="image/*"
          onChange={onPhotoUpload}
          disabled={uploading}
          className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
        />
        {uploading && <p className="text-xs text-blue-600 mt-1">Uploading photo...</p>}
        {data.photo_url && (
          <div className="mt-2 flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={data.photo_url} alt="Preview" className="w-10 h-10 rounded-full object-cover border" />
            <span className="text-xs text-green-600">Photo uploaded</span>
            <button
              type="button"
              onClick={() => onChange({ photo_url: '' })}
              className="text-xs text-red-500 hover:text-red-700 ml-1"
            >
              Remove
            </button>
          </div>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
        <input
          type="number"
          value={data.display_order ?? 0}
          onChange={(e) => onChange({ display_order: parseInt(e.target.value) || 0 })}
          className="w-24 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </>
  );
}

function ScheduleFormFields({
  data,
  onChange,
}: {
  data: { time: string; label: string; note: string; display_order: number };
  onChange: (patch: Partial<{ time: string; label: string; note: string; display_order: number }>) => void;
}) {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Time *</label>
          <input
            required
            type="text"
            placeholder="9:00 AM"
            value={data.time}
            onChange={(e) => onChange({ time: e.target.value })}
            className={INPUT}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Label *</label>
          <input
            required
            type="text"
            placeholder="Session One"
            value={data.label}
            onChange={(e) => onChange({ label: e.target.value })}
            className={INPUT}
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Note (optional)</label>
        <input
          type="text"
          placeholder="e.g. Brooke Bartz"
          value={data.note}
          onChange={(e) => onChange({ note: e.target.value })}
          className={INPUT}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
        <input
          type="number"
          value={data.display_order}
          onChange={(e) => onChange({ display_order: parseInt(e.target.value) || 0 })}
          className="w-24 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </>
  );
}

function FaqFormFields({
  data,
  onChange,
}: {
  data: { question: string; answer: string; display_order: number };
  onChange: (patch: Partial<{ question: string; answer: string; display_order: number }>) => void;
}) {
  return (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Question *</label>
        <input
          required
          type="text"
          value={data.question}
          onChange={(e) => onChange({ question: e.target.value })}
          className={INPUT}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Answer *</label>
        <textarea
          required
          rows={3}
          value={data.answer}
          onChange={(e) => onChange({ answer: e.target.value })}
          className={TEXTAREA}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
        <input
          type="number"
          value={data.display_order}
          onChange={(e) => onChange({ display_order: parseInt(e.target.value) || 0 })}
          className="w-24 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────

export default function ConferenceAdminPage() {
  const [tab, setTab] = useState<Tab>('details');
  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState('');

  // Details
  const [details, setDetails] = useState<ConferenceDetails>(DEFAULT_DETAILS);
  const [detailsSaving, setDetailsSaving] = useState(false);
  const [detailsMsg, setDetailsMsg] = useState('');

  // Speakers
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [editingSpeaker, setEditingSpeaker] = useState<Speaker | null>(null);
  const [showAddSpeaker, setShowAddSpeaker] = useState(false);
  const [newSpeaker, setNewSpeaker] = useState<typeof BLANK_SPEAKER>({ ...BLANK_SPEAKER });
  const [speakerMsg, setSpeakerMsg] = useState('');
  const [uploading, setUploading] = useState(false);

  // Schedule
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const [editingSchedule, setEditingSchedule] = useState<ScheduleItem | null>(null);
  const [showAddSchedule, setShowAddSchedule] = useState(false);
  const [newSchedule, setNewSchedule] = useState<typeof BLANK_SCHEDULE>({ ...BLANK_SCHEDULE });
  const [scheduleMsg, setScheduleMsg] = useState('');

  // FAQ
  const [faq, setFaq] = useState<FaqItem[]>([]);
  const [editingFaq, setEditingFaq] = useState<FaqItem | null>(null);
  const [showAddFaq, setShowAddFaq] = useState(false);
  const [newFaq, setNewFaq] = useState<typeof BLANK_FAQ>({ ...BLANK_FAQ });
  const [faqMsg, setFaqMsg] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const [d, s, sc, f] = await Promise.all([
          fetch('/api/admin/conference').then((r) => r.json()),
          fetch('/api/admin/conference/speakers').then((r) => r.json()),
          fetch('/api/admin/conference/schedule').then((r) => r.json()),
          fetch('/api/admin/conference/faq').then((r) => r.json()),
        ]);
        if (d && d.name) setDetails(d);
        if (Array.isArray(s)) setSpeakers(s);
        if (Array.isArray(sc)) setSchedule(sc);
        if (Array.isArray(f)) setFaq(f);
      } catch {
        setPageError('Failed to load conference data. Check your connection and try refreshing.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // ── Photo upload helper ──

  async function uploadPhoto(
    e: React.ChangeEvent<HTMLInputElement>,
    onSuccess: (url: string) => void,
    onError: (msg: string) => void
  ) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append('file', file);
    fd.append('bucket', 'speakers');
    const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
    if (res.ok) {
      const { url } = await res.json();
      onSuccess(url);
    } else {
      const d = await res.json().catch(() => ({}));
      onError(d.error || 'Photo upload failed');
    }
    setUploading(false);
  }

  // ── Details ──

  async function saveDetails(e: React.FormEvent) {
    e.preventDefault();
    setDetailsSaving(true);
    setDetailsMsg('');
    const res = await fetch('/api/admin/conference', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(details),
    });
    if (res.ok) {
      setDetailsMsg('Saved!');
      setTimeout(() => setDetailsMsg(''), 3000);
    } else {
      const d = await res.json().catch(() => ({}));
      setDetailsMsg(d.error || 'Failed to save');
    }
    setDetailsSaving(false);
  }

  // ── Speakers ──

  async function addSpeaker(e: React.FormEvent) {
    e.preventDefault();
    setSpeakerMsg('');
    const res = await fetch('/api/admin/conference/speakers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...newSpeaker, display_order: speakers.length }),
    });
    if (res.ok) {
      setSpeakers([...speakers, await res.json()]);
      setNewSpeaker({ ...BLANK_SPEAKER });
      setShowAddSpeaker(false);
    } else {
      const d = await res.json().catch(() => ({}));
      setSpeakerMsg(d.error || 'Failed to add speaker');
    }
  }

  async function saveSpeaker(e: React.FormEvent) {
    e.preventDefault();
    if (!editingSpeaker) return;
    setSpeakerMsg('');
    const res = await fetch(`/api/admin/conference/speakers/${editingSpeaker.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editingSpeaker),
    });
    if (res.ok) {
      const updated: Speaker = await res.json();
      setSpeakers(speakers.map((s) => (s.id === updated.id ? updated : s)));
      setEditingSpeaker(null);
    } else {
      const d = await res.json().catch(() => ({}));
      setSpeakerMsg(d.error || 'Failed to save');
    }
  }

  async function deleteSpeaker(id: string) {
    if (!confirm('Delete this speaker?')) return;
    const res = await fetch(`/api/admin/conference/speakers/${id}`, { method: 'DELETE' });
    if (res.ok) setSpeakers(speakers.filter((s) => s.id !== id));
  }

  // ── Schedule ──

  async function addScheduleItem(e: React.FormEvent) {
    e.preventDefault();
    setScheduleMsg('');
    const res = await fetch('/api/admin/conference/schedule', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...newSchedule, display_order: schedule.length }),
    });
    if (res.ok) {
      setSchedule([...schedule, await res.json()]);
      setNewSchedule({ ...BLANK_SCHEDULE });
      setShowAddSchedule(false);
    } else {
      const d = await res.json().catch(() => ({}));
      setScheduleMsg(d.error || 'Failed to add item');
    }
  }

  async function saveScheduleItem(e: React.FormEvent) {
    e.preventDefault();
    if (!editingSchedule) return;
    const res = await fetch(`/api/admin/conference/schedule/${editingSchedule.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editingSchedule),
    });
    if (res.ok) {
      const updated: ScheduleItem = await res.json();
      setSchedule(schedule.map((s) => (s.id === updated.id ? updated : s)));
      setEditingSchedule(null);
    } else {
      const d = await res.json().catch(() => ({}));
      setScheduleMsg(d.error || 'Failed to save');
    }
  }

  async function deleteScheduleItem(id: string) {
    if (!confirm('Delete this schedule item?')) return;
    const res = await fetch(`/api/admin/conference/schedule/${id}`, { method: 'DELETE' });
    if (res.ok) setSchedule(schedule.filter((s) => s.id !== id));
  }

  // ── FAQ ──

  async function addFaqItem(e: React.FormEvent) {
    e.preventDefault();
    setFaqMsg('');
    const res = await fetch('/api/admin/conference/faq', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...newFaq, display_order: faq.length }),
    });
    if (res.ok) {
      setFaq([...faq, await res.json()]);
      setNewFaq({ ...BLANK_FAQ });
      setShowAddFaq(false);
    } else {
      const d = await res.json().catch(() => ({}));
      setFaqMsg(d.error || 'Failed to add FAQ');
    }
  }

  async function saveFaqItem(e: React.FormEvent) {
    e.preventDefault();
    if (!editingFaq) return;
    const res = await fetch(`/api/admin/conference/faq/${editingFaq.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editingFaq),
    });
    if (res.ok) {
      const updated: FaqItem = await res.json();
      setFaq(faq.map((f) => (f.id === updated.id ? updated : f)));
      setEditingFaq(null);
    } else {
      const d = await res.json().catch(() => ({}));
      setFaqMsg(d.error || 'Failed to save');
    }
  }

  async function deleteFaqItem(id: string) {
    if (!confirm('Delete this FAQ item?')) return;
    const res = await fetch(`/api/admin/conference/faq/${id}`, { method: 'DELETE' });
    if (res.ok) setFaq(faq.filter((f) => f.id !== id));
  }

  // ── Render ──

  if (loading) {
    return <div className="text-gray-500 py-8">Loading conference data...</div>;
  }

  if (pageError) {
    return (
      <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg text-sm max-w-xl">
        {pageError}
        <button
          onClick={() => window.location.reload()}
          className="ml-4 underline"
        >
          Retry
        </button>
      </div>
    );
  }

  const TABS: { id: Tab; label: string }[] = [
    { id: 'details', label: 'Event Details' },
    { id: 'speakers', label: `Speakers (${speakers.length})` },
    { id: 'schedule', label: `Schedule (${schedule.length})` },
    { id: 'faq', label: `FAQ (${faq.length})` },
  ];

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Ladies Conference</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage all content for the /ladies-conference landing page
          </p>
        </div>
        <a
          href="/ladies-conference"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 hover:underline flex-shrink-0"
        >
          View page →
        </a>
      </div>

      {/* Tab bar */}
      <div className="border-b border-gray-200 mb-6">
        <div className="flex space-x-1 overflow-x-auto">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-2 text-sm font-medium whitespace-nowrap rounded-t-md transition-colors ${
                tab === t.id
                  ? 'bg-white border border-b-white border-gray-200 text-blue-700 -mb-px'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── DETAILS ── */}
      {tab === 'details' && (
        <form onSubmit={saveDetails} className="bg-white rounded-lg shadow p-6 space-y-4 max-w-2xl">
          <h2 className="font-semibold text-gray-800">Event Details</h2>
          {(
            [
              ['Event Name', 'name'],
              ["Tagline (e.g. \"Women's Conference\")", 'tagline'],
              ['Date', 'date'],
              ['Location', 'location'],
              ['Address', 'address'],
              ['Cost', 'cost'],
              ['Register URL (Google Form link)', 'register_url'],
              ['Scripture Reference', 'scripture_ref'],
            ] as [string, keyof ConferenceDetails][]
          ).map(([label, key]) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
              <input
                type="text"
                value={(details[key] as string) || ''}
                onChange={(e) => setDetails({ ...details, [key]: e.target.value })}
                className={INPUT}
              />
            </div>
          ))}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              About / Description
            </label>
            <textarea
              rows={5}
              value={details.description || ''}
              onChange={(e) => setDetails({ ...details, description: e.target.value })}
              className={TEXTAREA}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Scripture Quote</label>
            <textarea
              rows={3}
              value={details.scripture || ''}
              onChange={(e) => setDetails({ ...details, scripture: e.target.value })}
              className={TEXTAREA}
            />
          </div>
          <div className="flex items-center gap-4 pt-2">
            <button
              type="submit"
              disabled={detailsSaving}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 text-sm"
            >
              {detailsSaving ? 'Saving...' : 'Save Details'}
            </button>
            {detailsMsg && (
              <span
                className={`text-sm font-medium ${
                  detailsMsg === 'Saved!' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {detailsMsg}
              </span>
            )}
          </div>
        </form>
      )}

      {/* ── SPEAKERS ── */}
      {tab === 'speakers' && (
        <div className="space-y-4 max-w-3xl">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-gray-800">Speakers</h2>
            <button
              onClick={() => {
                setShowAddSpeaker(!showAddSpeaker);
                setEditingSpeaker(null);
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
            >
              {showAddSpeaker ? 'Cancel' : '+ Add Speaker'}
            </button>
          </div>

          {speakerMsg && <p className="text-red-600 text-sm">{speakerMsg}</p>}

          {showAddSpeaker && (
            <form
              onSubmit={addSpeaker}
              className="bg-white rounded-lg shadow p-5 space-y-3 border-2 border-blue-200"
            >
              <h3 className="font-semibold text-gray-700 text-sm">New Speaker</h3>
              <SpeakerFormFields
                data={newSpeaker}
                onChange={(patch) => setNewSpeaker((prev) => ({ ...prev, ...patch }))}
                onPhotoUpload={(e) =>
                  uploadPhoto(
                    e,
                    (url) => setNewSpeaker((prev) => ({ ...prev, photo_url: url })),
                    setSpeakerMsg
                  )
                }
                uploading={uploading}
              />
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
                >
                  Add Speaker
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddSpeaker(false);
                    setNewSpeaker({ ...BLANK_SPEAKER });
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {speakers.length === 0 && !showAddSpeaker && (
            <p className="text-gray-500 text-sm">No speakers added yet.</p>
          )}

          {speakers.map((speaker) => (
            <div key={speaker.id} className="bg-white rounded-lg shadow p-5">
              {editingSpeaker?.id === speaker.id ? (
                <form onSubmit={saveSpeaker} className="space-y-3">
                  <h3 className="font-semibold text-gray-700 text-sm">
                    Editing: {speaker.name}
                  </h3>
                  <SpeakerFormFields
                    data={editingSpeaker}
                    onChange={(patch) =>
                      setEditingSpeaker((prev) => (prev ? { ...prev, ...patch } : prev))
                    }
                    onPhotoUpload={(e) =>
                      uploadPhoto(
                        e,
                        (url) =>
                          setEditingSpeaker((prev) => (prev ? { ...prev, photo_url: url } : prev)),
                        setSpeakerMsg
                      )
                    }
                    uploading={uploading}
                  />
                  <div className="flex gap-3 pt-2">
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingSpeaker(null)}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="flex gap-4 items-start">
                  {speaker.photo_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={speaker.photo_url}
                      alt={speaker.name}
                      className="w-14 h-14 rounded-full object-cover flex-shrink-0 border"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold text-lg flex-shrink-0">
                      {speaker.name.charAt(0)}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm">{speaker.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{speaker.title}</p>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{speaker.bio}</p>
                  </div>
                  <div className="flex gap-3 flex-shrink-0">
                    <button
                      onClick={() => {
                        setEditingSpeaker({ ...speaker });
                        setShowAddSpeaker(false);
                      }}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteSpeaker(speaker.id)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ── SCHEDULE ── */}
      {tab === 'schedule' && (
        <div className="space-y-4 max-w-2xl">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-gray-800">Schedule</h2>
            <button
              onClick={() => {
                setShowAddSchedule(!showAddSchedule);
                setEditingSchedule(null);
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
            >
              {showAddSchedule ? 'Cancel' : '+ Add Item'}
            </button>
          </div>

          {scheduleMsg && <p className="text-red-600 text-sm">{scheduleMsg}</p>}

          {showAddSchedule && (
            <form
              onSubmit={addScheduleItem}
              className="bg-white rounded-lg shadow p-5 space-y-3 border-2 border-blue-200"
            >
              <h3 className="font-semibold text-gray-700 text-sm">New Schedule Item</h3>
              <ScheduleFormFields
                data={newSchedule}
                onChange={(patch) => setNewSchedule((prev) => ({ ...prev, ...patch }))}
              />
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddSchedule(false);
                    setNewSchedule({ ...BLANK_SCHEDULE });
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {schedule.length === 0 && !showAddSchedule && (
            <p className="text-gray-500 text-sm">No schedule items yet.</p>
          )}

          {schedule.length > 0 && (
            <div className="bg-white rounded-lg shadow divide-y">
              {schedule.map((item) => (
                <div key={item.id} className="p-4">
                  {editingSchedule?.id === item.id ? (
                    <form onSubmit={saveScheduleItem} className="space-y-3">
                      <ScheduleFormFields
                        data={editingSchedule}
                        onChange={(patch) =>
                          setEditingSchedule((prev) => (prev ? { ...prev, ...patch } : prev))
                        }
                      />
                      <div className="flex gap-3">
                        <button
                          type="submit"
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingSchedule(null)}
                          className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-semibold text-yellow-700 w-20 flex-shrink-0 font-mono">
                        {item.time}
                      </span>
                      <div className="flex-1 min-w-0">
                        <span className="text-sm font-medium text-gray-900">{item.label}</span>
                        {item.note && (
                          <span className="text-sm text-gray-500 ml-2">— {item.note}</span>
                        )}
                      </div>
                      <div className="flex gap-3 flex-shrink-0">
                        <button
                          onClick={() => {
                            setEditingSchedule({ ...item });
                            setShowAddSchedule(false);
                          }}
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteScheduleItem(item.id)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── FAQ ── */}
      {tab === 'faq' && (
        <div className="space-y-4 max-w-2xl">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-gray-800">FAQ</h2>
            <button
              onClick={() => {
                setShowAddFaq(!showAddFaq);
                setEditingFaq(null);
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
            >
              {showAddFaq ? 'Cancel' : '+ Add FAQ'}
            </button>
          </div>

          {faqMsg && <p className="text-red-600 text-sm">{faqMsg}</p>}

          {showAddFaq && (
            <form
              onSubmit={addFaqItem}
              className="bg-white rounded-lg shadow p-5 space-y-3 border-2 border-blue-200"
            >
              <h3 className="font-semibold text-gray-700 text-sm">New FAQ</h3>
              <FaqFormFields
                data={newFaq}
                onChange={(patch) => setNewFaq((prev) => ({ ...prev, ...patch }))}
              />
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddFaq(false);
                    setNewFaq({ ...BLANK_FAQ });
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {faq.length === 0 && !showAddFaq && (
            <p className="text-gray-500 text-sm">No FAQ items yet.</p>
          )}

          {faq.length > 0 && (
            <div className="bg-white rounded-lg shadow divide-y">
              {faq.map((item) => (
                <div key={item.id} className="p-4">
                  {editingFaq?.id === item.id ? (
                    <form onSubmit={saveFaqItem} className="space-y-3">
                      <FaqFormFields
                        data={editingFaq}
                        onChange={(patch) =>
                          setEditingFaq((prev) => (prev ? { ...prev, ...patch } : prev))
                        }
                      />
                      <div className="flex gap-3">
                        <button
                          type="submit"
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingFaq(null)}
                          className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="flex gap-4 items-start">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900">{item.question}</p>
                        <p className="text-sm text-gray-600 mt-1">{item.answer}</p>
                      </div>
                      <div className="flex gap-3 flex-shrink-0">
                        <button
                          onClick={() => {
                            setEditingFaq({ ...item });
                            setShowAddFaq(false);
                          }}
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteFaqItem(item.id)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
