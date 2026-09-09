export const dynamic = 'force-dynamic';
import type { Metadata } from 'next';
import { unstable_noStore as noStore } from 'next/cache';
import { supabaseAdmin } from '@/lib/supabase';

// ── Types ──────────────────────────────────────────────────────────────────

interface ConferenceDetails {
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

// ── Defaults (shown before admin has populated the DB) ─────────────────────

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
  register_url: '#register',
};

const DEFAULT_SPEAKERS: Speaker[] = [
  {
    id: '1',
    name: 'Brooke Bartz',
    title: 'Founder · Open Hearts in a Closed World',
    photo_url: '',
    bio: "Brooke Bartz is the founder of Open Hearts in a Closed World Ministry and this conference. As a pastor's wife at Sola Bible Church, author, and women's Bible teacher, she is passionate about spurring women to live as a light in the darkness — engaging the world around them with truth, grace, and open hearts.",
    display_order: 0,
  },
  {
    id: '2',
    name: 'Susan Heck',
    title: 'Founder · With the Master Ministries',
    photo_url: '',
    bio: "Susan Heck is the founder of With the Master Ministries and a beloved Bible teacher, author, and ACBC-certified biblical counselor with over 40 years in women's ministry. Known for her expository teaching and deep biblical conviction, Susan has memorized the entire New Testament.",
    display_order: 1,
  },
  {
    id: '3',
    name: 'Penny Amack',
    title: "Women's Bible Teacher & Conference Speaker",
    photo_url: '',
    bio: "Penny Amack is a women's Bible teacher and conference speaker with a heart for helping women go deeper in God's Word. Full bio coming soon.",
    display_order: 2,
  },
];

const DEFAULT_SCHEDULE: ScheduleItem[] = [
  { id: '1', time: '8:30 AM', label: 'Doors Open', note: 'Registration & fellowship', display_order: 0 },
  { id: '2', time: '9:00 AM', label: 'Welcome & Worship', note: '', display_order: 1 },
  { id: '3', time: '9:30 AM', label: 'Session One', note: 'Speaker TBD', display_order: 2 },
  { id: '4', time: '10:45 AM', label: 'Break', note: '', display_order: 3 },
  { id: '5', time: '11:00 AM', label: 'Session Two', note: 'Speaker TBD', display_order: 4 },
  { id: '6', time: '12:15 PM', label: 'Lunch', note: 'Provided', display_order: 5 },
  { id: '7', time: '1:30 PM', label: 'Session Three', note: 'Speaker TBD', display_order: 6 },
  { id: '8', time: '2:45 PM', label: 'Break', note: '', display_order: 7 },
  { id: '9', time: '3:00 PM', label: 'Worship & Closing Prayer', note: '', display_order: 8 },
  { id: '10', time: '3:30 PM', label: 'Dismissal', note: '', display_order: 9 },
];

// ── Data fetch ─────────────────────────────────────────────────────────────

async function getConferenceData() {
  noStore();
  if (!supabaseAdmin) return null;
  try {
    const [detailsRes, speakersRes, scheduleRes] = await Promise.all([
      supabaseAdmin.from('conference_details').select('*').limit(1).maybeSingle(),
      supabaseAdmin.from('conference_speakers').select('*').order('display_order'),
      supabaseAdmin.from('conference_schedule').select('*').order('display_order'),
    ]);
    return {
      details: detailsRes.data as ConferenceDetails | null,
      speakers: (speakersRes.data as Speaker[]) || [],
      schedule: (scheduleRes.data as ScheduleItem[]) || [],
    };
  } catch {
    return null;
  }
}

// ── Metadata ───────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: 'Open Hearts in a Closed World — Ladies Conference 2026 · Sola Bible Church',
  description:
    "December 5, 2026 · A free women's conference at Sola Bible Church, Temple, TX, rooted in the Fruits of the Spirit. Join us for a day of teaching, worship, and fellowship.",
};

// ── Page ───────────────────────────────────────────────────────────────────

export default async function LadiesConferencePage() {
  const db = await getConferenceData();

  const details: ConferenceDetails = (db?.details && db.details.name)
    ? db.details
    : DEFAULT_DETAILS;
  const speakers: Speaker[] = db?.speakers.length ? db.speakers : DEFAULT_SPEAKERS;
  const schedule: ScheduleItem[] = db?.schedule.length ? db.schedule : DEFAULT_SCHEDULE;

  const registerUrl = details.register_url || '#register';

  return (
    <>
      <style>{`
        .conf-hero {
          background-image: url('/images/conference-bg.png');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          position: relative;
          overflow: hidden;
        }
        .conf-eyebrow {
          font-family: var(--font-inter), system-ui, sans-serif;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #7A5018;
        }
        .conf-title-main {
          font-family: var(--font-merriweather), Georgia, serif;
          font-weight: 900;
          font-style: italic;
          line-height: 1.05;
          color: #ffffff;
        }
        .conf-title-sub {
          font-family: var(--font-merriweather), Georgia, serif;
          font-weight: 300;
          font-style: italic;
          color: rgba(255,255,255,0.82);
        }
        .conf-section-heading {
          font-family: var(--font-merriweather), Georgia, serif;
          font-weight: 700;
          color: #1E2710;
        }
        .conf-gold-rule {
          width: 48px;
          height: 2px;
          background: #7A5018;
          margin: 0 auto;
        }
        .conf-btn {
          display: inline-block;
          background: #7A5018;
          color: #ffffff;
          font-family: var(--font-inter), system-ui, sans-serif;
          font-weight: 600;
          font-size: 0.9rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 0.85rem 2.2rem;
          text-decoration: none;
          transition: background 0.2s, transform 0.15s;
        }
        .conf-btn:hover {
          background: #5C3C10;
          transform: translateY(-1px);
        }
        .conf-btn-outline {
          display: inline-block;
          border: 2px solid #7A5018;
          color: #7A5018;
          font-family: var(--font-inter), system-ui, sans-serif;
          font-weight: 600;
          font-size: 0.9rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 0.85rem 2.2rem;
          text-decoration: none;
          transition: background 0.2s, color 0.2s;
        }
        .conf-btn-outline:hover {
          background: #7A5018;
          color: #ffffff;
        }
        .conf-speaker-card {
          border: 1px solid #d8ddc8;
          background: #ffffff;
          padding: 2.5rem 2rem;
        }
        .conf-speaker-avatar {
          width: 88px;
          height: 88px;
          border-radius: 50%;
          background: #EEF1E3;
          border: 2px solid #7A5018;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-merriweather), Georgia, serif;
          font-weight: 700;
          font-size: 1.4rem;
          color: #384220;
          margin-bottom: 1.25rem;
          flex-shrink: 0;
        }
        .conf-speaker-photo {
          width: 88px;
          height: 88px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #7A5018;
          margin-bottom: 1.25rem;
          flex-shrink: 0;
        }
        .conf-timeline-item {
          display: grid;
          grid-template-columns: 90px 1fr;
          gap: 1.25rem;
          padding: 1.1rem 0;
          border-bottom: 1px solid #d8ddc8;
        }
        .conf-timeline-item:last-child {
          border-bottom: none;
        }
        .conf-time {
          font-family: var(--font-inter), system-ui, sans-serif;
          font-size: 0.78rem;
          font-weight: 600;
          color: #7A5018;
          letter-spacing: 0.04em;
          padding-top: 2px;
        }
        .scripture-quote {
          font-family: var(--font-merriweather), Georgia, serif;
          font-weight: 300;
          font-style: italic;
          line-height: 1.75;
          color: #4A4A38;
        }

      `}</style>

      <main>

        {/* ── HERO ── */}
        <section className="conf-hero min-h-screen flex flex-col items-center justify-center text-center px-6 py-24">
          <div className="max-w-3xl mx-auto">
            <p className="conf-eyebrow mb-6">Sola Bible Church · Temple, TX</p>
            <div className="conf-gold-rule mb-8" style={{ margin: '0 auto 2rem' }}></div>
            <h1 className="conf-title-main text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-4 tracking-tight">
              {details.name.includes(' in ') ? details.name.split(' in ')[0] : details.name}
            </h1>
            {details.name.includes(' in ') && (
              <p className="conf-title-sub text-2xl sm:text-3xl md:text-4xl mb-10">
                in {details.name.split(' in ').slice(1).join(' in ')}
              </p>
            )}
            <p className="font-sans text-sm uppercase tracking-widest text-white/60 mb-2">
              {details.tagline}
            </p>
            <p className="font-serif italic text-white/80 text-xl mb-10">
              {details.date} &nbsp;·&nbsp; {details.location}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="#speakers" className="conf-btn-outline">
                Conference Speakers
              </a>
              <a href={registerUrl} className="conf-btn" target="_blank" rel="noopener noreferrer">
                Register
              </a>
            </div>
          </div>
        </section>

        {/* ── SPEAKERS ── */}
        <section id="speakers" className="py-20 md:py-28 px-6" style={{ background: '#ffffff' }}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <p className="conf-eyebrow mb-4">Meet the Speakers</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {speakers.map((speaker) => (
                <div key={speaker.id} className="conf-speaker-card flex flex-col">
                  {speaker.photo_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={speaker.photo_url}
                      alt={speaker.name}
                      className="conf-speaker-photo"
                    />
                  ) : (
                    <div className="conf-speaker-avatar">{speaker.name.charAt(0)}{speaker.name.split(' ')[1]?.charAt(0)}</div>
                  )}
                  <h3 className="font-serif font-bold text-xl mb-1" style={{ color: '#1E2710' }}>
                    {speaker.name}
                  </h3>
                  <p className="font-sans text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#7A5018' }}>
                    {speaker.title}
                  </p>
                  <p className="font-sans text-sm leading-relaxed" style={{ color: '#5C5A4A' }}>
                    {speaker.bio}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SCHEDULE ── */}
        <section id="schedule" className="py-20 md:py-28 px-6" style={{ background: '#EEF1E3' }}>
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-14">
              <p className="conf-eyebrow mb-4">Day-of Schedule</p>
              <h2 className="conf-section-heading text-3xl md:text-4xl mb-2">{details.date}</h2>
              <p className="font-sans text-sm italic" style={{ color: '#7A7A60' }}>
                All times subject to change — final schedule sent before the event
              </p>
              <div className="conf-gold-rule mt-6"></div>
            </div>

            <div style={{ borderLeft: '3px solid #384220', paddingLeft: '1.5rem' }}>
              {schedule.map((item) => (
                <div key={item.id} className="conf-timeline-item">
                  <span className="conf-time">{item.time}</span>
                  <div>
                    <span className="font-serif font-semibold text-base" style={{ color: '#1E2710' }}>
                      {item.label}
                    </span>
                    {item.note && (
                      <span className="font-sans text-xs ml-2 italic" style={{ color: '#7A7A60' }}>
                        — {item.note}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── LOCATION ── */}
        <section className="py-20 md:py-28 px-6" style={{ background: '#ffffff' }}>
          <div className="max-w-3xl mx-auto">
            <div className="mt-12 p-8 text-center" style={{ background: '#EEF1E3', borderLeft: '4px solid #7A5018' }}>
              <p className="font-sans text-sm" style={{ color: '#4A4A38' }}>
                <strong>Location</strong><br />
                {details.location}<br />
                {details.address}
              </p>
              <p className="font-sans text-sm mt-4" style={{ color: '#4A4A38' }}>
                Questions? Email us at{' '}
                <a href="mailto:solabiblechurch@gmail.com" style={{ color: '#7A5018' }}>
                  solabiblechurch@gmail.com
                </a>
              </p>
            </div>
          </div>
        </section>


      </main>
    </>
  );
}
