'use client';
import { useState } from 'react';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

export default function PrayerPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [request, setRequest] = useState('');
  const [confidential, setConfidential] = useState(false);
  const [followup, setFollowup] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const validate = (): string | null => {
    if (!name.trim()) return 'Please enter your name.';
    if (!request.trim()) return 'Please share your prayer request.';
    if (followup && !email.trim() && !phone.trim()) {
      return 'Please provide an email or phone number so we can follow up with you.';
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setErrorMsg(validationError);
      return;
    }

    setFormState('submitting');
    setErrorMsg('');

    try {
      const res = await fetch('/api/prayer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim() || undefined,
          phone: phone.trim() || undefined,
          request: request.trim(),
          confidential,
          followup,
          website: honeypot, // honeypot
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setFormState('success');
      } else {
        setErrorMsg(data.error || 'Something went wrong. Please try again.');
        setFormState('error');
      }
    } catch {
      setErrorMsg('Something went wrong. Please check your connection and try again.');
      setFormState('error');
    }
  };

  if (formState === 'success') {
    return (
      <main>
        <section className="relative bg-gradient-to-br from-primary-700 via-primary-600 to-primary-500 text-white py-20 md:py-28">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4">Prayer Request</h1>
            </div>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container-custom max-w-2xl mx-auto text-center">
            <div className="bg-primary-50 border border-primary-200 rounded-2xl p-10">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold font-serif text-primary-900 mb-3">
                Your request has been received.
              </h2>
              <p className="text-neutral-600 leading-relaxed">
                We are grateful you reached out. Our pastors and elders will be praying for you.
                {followup && (email || phone) && (
                  <> You should expect a follow-up from us soon.</>
                )}
              </p>
              <p className="text-sm text-neutral-500 mt-4 italic">
                &ldquo;Do not be anxious about anything, but in everything by prayer and supplication
                with thanksgiving let your requests be made known to God.&rdquo; — Philippians 4:6
              </p>
              <button
                onClick={() => {
                  setName(''); setEmail(''); setPhone(''); setRequest('');
                  setConfidential(false); setFollowup(false);
                  setFormState('idle');
                }}
                className="mt-8 btn-outline px-6 py-2 rounded-lg text-sm font-medium"
              >
                Submit another request
              </button>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section className="relative bg-gradient-to-br from-primary-700 via-primary-600 to-primary-500 text-white py-20 md:py-28">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4">Prayer Request</h1>
            <p className="text-lg text-primary-100 max-w-xl mx-auto">
              We count it a privilege to pray for you. Below is a form you can fill out to
              submit prayer requests.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-neutral-50">
        <div className="container-custom max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-md p-8 md:p-10">

            {/* Error banner */}
            {(formState === 'error' || errorMsg) && (
              <div role="alert" className="mb-6 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              {/* Honeypot — hidden from humans, filled by bots */}
              <div aria-hidden="true" style={{ display: 'none' }}>
                <label htmlFor="website">Leave this blank</label>
                <input
                  id="website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={e => setHoneypot(e.target.value)}
                />
              </div>

              {/* Name */}
              <div className="mb-5">
                <label htmlFor="prayer-name" className="block text-sm font-semibold text-neutral-800 mb-1.5">
                  Name <span className="text-red-500" aria-label="required">*</span>
                </label>
                <input
                  id="prayer-name"
                  type="text"
                  required
                  autoComplete="name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm transition-colors"
                  placeholder="Your name"
                />
              </div>

              {/* Email */}
              <div className="mb-5">
                <label htmlFor="prayer-email" className="block text-sm font-semibold text-neutral-800 mb-1.5">
                  Email <span className="text-neutral-400 font-normal">(optional)</span>
                </label>
                <input
                  id="prayer-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm transition-colors"
                  placeholder="you@example.com"
                />
              </div>

              {/* Phone */}
              <div className="mb-5">
                <label htmlFor="prayer-phone" className="block text-sm font-semibold text-neutral-800 mb-1.5">
                  Phone <span className="text-neutral-400 font-normal">(optional)</span>
                </label>
                <input
                  id="prayer-phone"
                  type="tel"
                  autoComplete="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm transition-colors"
                  placeholder="(555) 000-0000"
                />
              </div>

              {/* Prayer Request */}
              <div className="mb-6">
                <label htmlFor="prayer-request" className="block text-sm font-semibold text-neutral-800 mb-1.5">
                  Prayer Request <span className="text-red-500" aria-label="required">*</span>
                </label>
                <textarea
                  id="prayer-request"
                  required
                  rows={6}
                  value={request}
                  onChange={e => setRequest(e.target.value)}
                  className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm transition-colors resize-y"
                  placeholder="Share your prayer request here…"
                />
              </div>

              {/* Checkboxes */}
              <fieldset className="mb-7 space-y-4">
                <legend className="sr-only">Request options</legend>

                <div className="flex items-start gap-3">
                  <input
                    id="prayer-confidential"
                    type="checkbox"
                    checked={confidential}
                    onChange={e => setConfidential(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500 cursor-pointer"
                  />
                  <div>
                    <label htmlFor="prayer-confidential" className="text-sm font-semibold text-neutral-800 cursor-pointer">
                      Confidential
                    </label>
                    <p className="text-sm text-neutral-500 mt-0.5">
                      Would you like your prayer request to be confidential? If so, only the pastor
                      and elders will see your request.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <input
                    id="prayer-followup"
                    type="checkbox"
                    checked={followup}
                    onChange={e => setFollowup(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500 cursor-pointer"
                  />
                  <div>
                    <label htmlFor="prayer-followup" className="text-sm font-semibold text-neutral-800 cursor-pointer">
                      Follow-up
                    </label>
                    <p className="text-sm text-neutral-500 mt-0.5">
                      Would you like a follow-up from a pastor/elder?
                    </p>
                    {followup && (
                      <p className="text-xs text-primary-700 mt-1 font-medium" role="status">
                        Please make sure your email or phone number is filled in above so we can reach you.
                      </p>
                    )}
                  </div>
                </div>
              </fieldset>

              <button
                type="submit"
                disabled={formState === 'submitting'}
                className="w-full btn-primary py-3 rounded-lg text-base font-semibold disabled:opacity-60 disabled:cursor-not-allowed transition-opacity"
              >
                {formState === 'submitting' ? 'Submitting…' : 'Submit Prayer Request'}
              </button>

              <p className="text-xs text-neutral-400 text-center mt-4">
                Your request will be received by our pastoral team.
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
