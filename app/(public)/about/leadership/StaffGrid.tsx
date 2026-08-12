'use client';
import { useState, useEffect, useCallback } from 'react';
import { X } from 'lucide-react';

interface StaffMember {
  id: string;
  name: string;
  role: string;
  bio: string | null;
  photo_url: string | null;
  display_order: number;
}

export default function StaffGrid({ staff }: { staff: StaffMember[] }) {
  const [selected, setSelected] = useState<StaffMember | null>(null);

  const close = useCallback(() => setSelected(null), []);

  // Close on Escape key
  useEffect(() => {
    if (!selected) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [selected, close]);

  // Prevent body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = selected ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selected]);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {staff.map((member) => (
          <button
            key={member.id}
            onClick={() => setSelected(member)}
            className="group text-left bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md hover:border-primary-200 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            aria-label={`View bio for ${member.name}`}
          >
            {member.photo_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={member.photo_url}
                alt={member.name}
                className="w-full h-60 object-cover object-top group-hover:scale-[1.02] transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-60 bg-primary-50 flex items-center justify-center text-5xl font-bold text-primary-200 font-serif">
                {member.name.charAt(0)}
              </div>
            )}
            <div className="px-4 pt-3 pb-4">
              <h2 className="font-semibold text-gray-900 text-center text-base group-hover:text-primary-700 transition-colors">
                {member.name}
              </h2>
              <p className="text-sm text-gray-500 text-center mt-0.5">{member.role}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`Bio for ${selected.name}`}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={close}
            aria-hidden="true"
          />

          {/* Panel */}
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <button
              onClick={close}
              className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Photo */}
            {selected.photo_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={selected.photo_url}
                alt={selected.name}
                className="w-full h-72 object-cover object-top rounded-t-2xl"
              />
            ) : (
              <div className="w-full h-72 bg-primary-50 flex items-center justify-center text-8xl font-bold text-primary-200 font-serif rounded-t-2xl">
                {selected.name.charAt(0)}
              </div>
            )}

            {/* Content */}
            <div className="px-7 py-6">
              <h2 className="text-2xl font-bold text-gray-900 font-serif">{selected.name}</h2>
              <p className="text-primary-600 font-medium mt-1 mb-4">{selected.role}</p>
              {selected.bio ? (
                <p className="text-gray-700 leading-relaxed text-sm whitespace-pre-wrap">{selected.bio}</p>
              ) : (
                <p className="text-gray-400 italic text-sm">Bio coming soon.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
