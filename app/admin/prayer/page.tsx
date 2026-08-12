'use client';
import { useEffect, useState } from 'react';

interface PrayerRequest {
  id: string;
  created_at: string;
  name: string;
  email: string | null;
  phone: string | null;
  request: string;
  confidential: boolean;
  followup: boolean;
  status: 'new' | 'praying' | 'followed_up';
  handled_by: string | null;
  notes: string | null;
}

const STATUS_LABELS: Record<string, string> = {
  new: 'New',
  praying: 'Praying',
  followed_up: 'Followed Up',
};

const STATUS_COLORS: Record<string, string> = {
  new: 'bg-blue-100 text-blue-700',
  praying: 'bg-yellow-100 text-yellow-700',
  followed_up: 'bg-green-100 text-green-700',
};

export default function PrayerAdminPage() {
  const [requests, setRequests] = useState<PrayerRequest[]>([]);
  const [isElder, setIsElder] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [editNotes, setEditNotes] = useState<Record<string, string>>({});
  const [editHandledBy, setEditHandledBy] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch('/api/admin/prayer')
      .then(r => r.json())
      .then(data => {
        setRequests(data.requests || []);
        setIsElder(data.isElder || false);
      })
      .catch(() => setError('Failed to load prayer requests.'))
      .finally(() => setLoading(false));
  }, []);

  const updateRequest = async (id: string, patch: Partial<PrayerRequest>) => {
    setSavingId(id);
    const res = await fetch(`/api/admin/prayer/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patch),
    });
    if (res.ok) {
      const updated = await res.json();
      setRequests(prev => prev.map(r => r.id === id ? { ...r, ...updated } : r));
    } else {
      setError('Failed to save. Please try again.');
    }
    setSavingId(null);
  };

  const saveNotes = (req: PrayerRequest) => {
    updateRequest(req.id, {
      notes: editNotes[req.id] ?? req.notes ?? '',
      handled_by: editHandledBy[req.id] ?? req.handled_by ?? '',
    });
  };

  const counts = {
    total: requests.length,
    new: requests.filter(r => r.status === 'new').length,
    followup: requests.filter(r => r.followup).length,
  };

  if (loading) return <div className="text-gray-600">Loading…</div>;

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Prayer Requests</h1>
          {!isElder && (
            <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-1.5 mt-2 inline-block">
              Signed in as admin — confidential requests are hidden. Log in with the elder password to see them.
            </p>
          )}
        </div>
        <div className="flex gap-3 text-sm shrink-0">
          <div className="bg-white border rounded-lg px-3 py-2 text-center">
            <div className="font-bold text-lg text-gray-900">{counts.total}</div>
            <div className="text-gray-500">Total</div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-2 text-center">
            <div className="font-bold text-lg text-blue-700">{counts.new}</div>
            <div className="text-blue-600">New</div>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-2 text-center">
            <div className="font-bold text-lg text-yellow-700">{counts.followup}</div>
            <div className="text-yellow-600">Follow-up</div>
          </div>
        </div>
      </div>

      {error && <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>}

      {requests.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
          No prayer requests yet.
        </div>
      ) : (
        <ul className="space-y-3">
          {requests.map(req => {
            const isExpanded = expandedId === req.id;
            const notesVal = editNotes[req.id] ?? req.notes ?? '';
            const handledVal = editHandledBy[req.id] ?? req.handled_by ?? '';

            return (
              <li key={req.id} className="bg-white rounded-lg shadow">
                {/* Header row */}
                <button
                  onClick={() => setExpandedId(isExpanded ? null : req.id)}
                  className="w-full text-left px-5 py-4 flex items-start justify-between gap-4 hover:bg-gray-50 rounded-lg transition-colors"
                  aria-expanded={isExpanded}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center flex-wrap gap-2 mb-1">
                      <span className="font-semibold text-gray-900">{req.name}</span>
                      {req.confidential && (
                        <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-semibold">Confidential</span>
                      )}
                      {req.followup && (
                        <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-semibold">Follow-up</span>
                      )}
                      <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${STATUS_COLORS[req.status]}`}>
                        {STATUS_LABELS[req.status]}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      {new Date(req.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' })}
                      {req.email && <> · {req.email}</>}
                      {req.phone && <> · {req.phone}</>}
                    </p>
                    {!isExpanded && (
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">{req.request}</p>
                    )}
                  </div>
                  <svg
                    className={`w-5 h-5 text-gray-400 shrink-0 transition-transform mt-0.5 ${isExpanded ? 'rotate-180' : ''}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Expanded detail */}
                {isExpanded && (
                  <div className="px-5 pb-5 space-y-4 border-t border-gray-100 pt-4">
                    {/* Request text */}
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Prayer Request</p>
                      <p className="text-sm text-gray-800 whitespace-pre-wrap bg-gray-50 rounded-lg p-3 border border-gray-100">
                        {req.request}
                      </p>
                    </div>

                    {/* Contact info */}
                    {(req.email || req.phone) && (
                      <div className="flex gap-4 text-sm">
                        {req.email && (
                          <div>
                            <span className="font-semibold text-gray-500">Email: </span>
                            <a href={`mailto:${req.email}`} className="text-blue-600 hover:underline">{req.email}</a>
                          </div>
                        )}
                        {req.phone && (
                          <div>
                            <span className="font-semibold text-gray-500">Phone: </span>
                            <a href={`tel:${req.phone}`} className="text-blue-600 hover:underline">{req.phone}</a>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Status */}
                    <div className="flex items-center gap-3">
                      <label htmlFor={`status-${req.id}`} className="text-sm font-semibold text-gray-700 shrink-0">
                        Status
                      </label>
                      <select
                        id={`status-${req.id}`}
                        value={req.status}
                        onChange={e => updateRequest(req.id, { status: e.target.value as PrayerRequest['status'] })}
                        disabled={savingId === req.id}
                        className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="new">New</option>
                        <option value="praying">Praying</option>
                        <option value="followed_up">Followed Up</option>
                      </select>
                      {savingId === req.id && <span className="text-xs text-gray-400">Saving…</span>}
                    </div>

                    {/* Handled by */}
                    <div>
                      <label htmlFor={`handled-${req.id}`} className="block text-sm font-semibold text-gray-700 mb-1">
                        Handled by
                      </label>
                      <input
                        id={`handled-${req.id}`}
                        type="text"
                        placeholder="Name of pastor/elder"
                        value={handledVal}
                        onChange={e => setEditHandledBy(prev => ({ ...prev, [req.id]: e.target.value }))}
                        className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    {/* Notes */}
                    <div>
                      <label htmlFor={`notes-${req.id}`} className="block text-sm font-semibold text-gray-700 mb-1">
                        Notes
                      </label>
                      <textarea
                        id={`notes-${req.id}`}
                        rows={3}
                        placeholder="Add internal notes…"
                        value={notesVal}
                        onChange={e => setEditNotes(prev => ({ ...prev, [req.id]: e.target.value }))}
                        className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-y"
                      />
                    </div>

                    <button
                      onClick={() => saveNotes(req)}
                      disabled={savingId === req.id}
                      className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium"
                    >
                      {savingId === req.id ? 'Saving…' : 'Save Notes'}
                    </button>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
