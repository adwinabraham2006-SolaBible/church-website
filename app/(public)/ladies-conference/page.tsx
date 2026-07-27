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

interface FaqItem {
  id: string;
  question: string;
  answer: string;
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

const DEFAULT_FAQ: FaqItem[] = [
  { id: '1', question: 'What should I bring?', answer: 'Your Bible, a notebook and pen, and an open heart. Bring a friend — this event is free and open to all women.', display_order: 0 },
  { id: '2', question: 'Is there a cost to attend?', answer: "No. This conference is completely free of charge. We want nothing to stand between you and a day in God's Word.", display_order: 1 },
  { id: '3', question: 'Is childcare available?', answer: 'Childcare details are coming soon. Check back closer to the event date or contact the church for more information.', display_order: 2 },
  { id: '4', question: 'Where do I park?', answer: 'Free parking is available on-site at Sola Bible Church, 219 King Circle, Temple, TX 76501.', display_order: 3 },
  { id: '5', question: 'Will lunch be provided?', answer: 'Yes — lunch is included at no cost. Dietary accommodation details will be shared closer to the event.', display_order: 4 },
  { id: '6', question: 'Who is this conference for?', answer: "Every woman is welcome — whether you've walked with Christ for decades or are still exploring faith. Come as you are.", display_order: 5 },
];

const FRUITS = [
  'Love', 'Joy', 'Peace', 'Patience',
  'Kindness', 'Goodness', 'Faithfulness', 'Gentleness', 'Self-Control',
];

// ── Data fetch ─────────────────────────────────────────────────────────────

async function getConferenceData() {
  noStore();
  if (!supabaseAdmin) return null;
  try {
    const [detailsRes, speakersRes, scheduleRes, faqRes] = await Promise.all([
      supabaseAdmin.from('conference_details').select('*').limit(1).maybeSingle(),
      supabaseAdmin.from('conference_speakers').select('*').order('display_order'),
      supabaseAdmin.from('conference_schedule').select('*').order('display_order'),
      supabaseAdmin.from('conference_faq').select('*').order('display_order'),
    ]);
    return {
      details: detailsRes.data as ConferenceDetails | null,
      speakers: (speakersRes.data as Speaker[]) || [],
      schedule: (scheduleRes.data as ScheduleItem[]) || [],
      faq: (faqRes.data as FaqItem[]) || [],
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
  const faq: FaqItem[] = db?.faq.length ? db.faq : DEFAULT_FAQ;

  const registerUrl = details.register_url || '#register';

  return (
    <>
      <style>{`
        .conf-hero {
          background-color: #3A4522;
          position: relative;
          overflow: hidden;
        }
        .conf-eyebrow {
          font-family: var(--font-inter), system-ui, sans-serif;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #C4923A;
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
          color: #3A4522;
        }
        .conf-gold-rule {
          width: 48px;
          height: 2px;
          background: #C4923A;
          margin: 0 auto;
        }
        .conf-btn {
          display: inline-block;
          background: #C4923A;
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
          background: #a87830;
          transform: translateY(-1px);
        }
        .conf-btn-outline {
          display: inline-block;
          border: 2px solid #C4923A;
          color: #C4923A;
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
          background: #C4923A;
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
          border: 2px solid #C4923A;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-merriweather), Georgia, serif;
          font-weight: 700;
          font-size: 1.4rem;
          color: #5C6B35;
          margin-bottom: 1.25rem;
          flex-shrink: 0;
        }
        .conf-speaker-photo {
          width: 88px;
          height: 88px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #C4923A;
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
          color: #C4923A;
          letter-spacing: 0.04em;
          padding-top: 2px;
        }
        .conf-faq-item {
          border-bottom: 1px solid #d8ddc8;
          padding: 1.5rem 0;
        }
        .conf-faq-item:first-child {
          border-top: 1px solid #d8ddc8;
        }
        .scripture-quote {
          font-family: var(--font-merriweather), Georgia, serif;
          font-weight: 300;
          font-style: italic;
          line-height: 1.75;
          color: #4A4A38;
        }
        .fruit-tag {
          font-family: var(--font-merriweather), Georgia, serif;
          font-style: italic;
          color: rgba(255,255,255,0.9);
          font-size: 0.95rem;
          padding: 0.3rem 0.1rem;
        }
        .fruit-dot {
          color: #C4923A;
          font-style: normal;
          padding: 0 0.6rem;
          opacity: 0.7;
        }
      `}</style>

      <main>

        {/* ── HERO ── */}
        <section className="conf-hero min-h-screen flex flex-col items-center justify-center text-center px-6 py-24">
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="botanical" x="0" y="0" width="420" height="420" patternUnits="userSpaceOnUse">
                  <path d="M25 410 Q70 310 115 210 Q150 130 185 60" stroke="rgba(255,255,255,0.07)" strokeWidth="1.5" fill="none"/>
                  <ellipse cx="72" cy="300" rx="8" ry="28" fill="rgba(255,255,255,0.055)" transform="rotate(-52 72 300)"/>
                  <ellipse cx="108" cy="240" rx="7" ry="24" fill="rgba(255,255,255,0.045)" transform="rotate(-60 108 240)"/>
                  <ellipse cx="140" cy="178" rx="9" ry="28" fill="rgba(255,255,255,0.06)" transform="rotate(18 140 178)"/>
                  <ellipse cx="168" cy="118" rx="6" ry="20" fill="rgba(255,255,255,0.04)" transform="rotate(-28 168 118)"/>
                  <ellipse cx="184" cy="65" rx="5" ry="17" fill="rgba(255,255,255,0.04)" transform="rotate(-10 184 65)"/>
                  <circle cx="118" cy="212" r="3" fill="rgba(196,146,58,0.38)"/>
                  <circle cx="185" cy="63" r="2.5" fill="rgba(196,146,58,0.3)"/>
                  <circle cx="70" cy="302" r="2" fill="rgba(196,146,58,0.28)"/>
                  <path d="M360 0 Q330 60 300 130 Q275 185 265 230" stroke="rgba(255,255,255,0.05)" strokeWidth="1.2" fill="none"/>
                  <ellipse cx="330" cy="55" rx="6" ry="22" fill="rgba(255,255,255,0.04)" transform="rotate(30 330 55)"/>
                  <ellipse cx="312" cy="105" rx="7" ry="22" fill="rgba(255,255,255,0.045)" transform="rotate(-20 312 105)"/>
                  <ellipse cx="280" cy="160" rx="6" ry="20" fill="rgba(255,255,255,0.04)" transform="rotate(40 280 160)"/>
                  <circle cx="310" cy="107" r="2" fill="rgba(196,146,58,0.25)"/>
                  <path d="M400 420 Q380 375 355 330" stroke="rgba(255,255,255,0.04)" strokeWidth="1" fill="none"/>
                  <ellipse cx="372" cy="375" rx="5" ry="18" fill="rgba(255,255,255,0.035)" transform="rotate(-35 372 375)"/>
                  <ellipse cx="358" cy="335" rx="6" ry="18" fill="rgba(255,255,255,0.04)" transform="rotate(15 358 335)"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#botanical)"/>
            </svg>
          </div>

          <div className="relative z-10 max-w-3xl mx-auto">
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
              <a href={registerUrl} className="conf-btn">
                Register Now &mdash; {details.cost === 'Free' ? "It's Free" : details.cost}
              </a>
              <a href="#about" className="conf-btn-outline">
                Learn More
              </a>
            </div>
            <p className="mt-10 font-sans text-white/40 text-xs uppercase tracking-widest">
              Rooted in the Fruits of the Spirit &nbsp;·&nbsp; {details.scripture_ref}
            </p>
          </div>
        </section>

        {/* ── FRUITS STRIP ── */}
        <div style={{ background: '#4E5A2E', padding: '1rem 0', overflowX: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 0, maxWidth: '900px', margin: '0 auto', padding: '0 1rem' }}>
            {FRUITS.map((fruit, i) => (
              <span key={fruit} className="fruit-tag">
                {fruit}
                {i < FRUITS.length - 1 && <span className="fruit-dot">·</span>}
              </span>
            ))}
          </div>
        </div>

        {/* ── ABOUT ── */}
        <section id="about" style={{ background: '#F5F0E8' }} className="py-20 md:py-28 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="conf-eyebrow mb-4">About the Conference</p>
            <h2 className="conf-section-heading text-3xl md:text-4xl mb-6 max-w-xl mx-auto">
              A Heart Wide Open for a World Closing In
            </h2>
            <div className="conf-gold-rule mb-10"></div>

            {details.scripture && (
              <p className="scripture-quote text-lg md:text-xl mb-10 max-w-2xl mx-auto">
                &ldquo;{details.scripture}&rdquo;
                <span className="block mt-3 text-sm not-italic font-semibold" style={{ color: '#C4923A', letterSpacing: '0.06em' }}>
                  — {details.scripture_ref.toUpperCase()}
                </span>
              </p>
            )}

            <div className="font-sans text-base md:text-lg leading-relaxed space-y-5" style={{ color: '#4A4A38' }}>
              {details.description ? (
                details.description.split('\n\n').filter(Boolean).map((para, i) => (
                  <p key={i}>{para}</p>
                ))
              ) : (
                <>
                  <p>
                    We live in a world that is increasingly turning inward — guarded, divided, and afraid.
                    Yet the women of God are called to something radically different: to bear fruit that the
                    world cannot produce on its own. Love when love is costly. Joy when circumstances are
                    heavy. Kindness when hardness feels safer.
                  </p>
                  <p>
                    <em>Open Hearts in a Closed World</em> is a one-day conference for women who want to
                    go deeper in Scripture and live more faithfully in the world around them. Through
                    expository teaching, worship, and fellowship, we&rsquo;ll explore what it looks like to bear
                    the Fruits of the Spirit in daily life — and why those fruits matter now more than ever.
                  </p>
                  <p>
                    Come expectant. Come as you are. Come ready to be rooted in God&rsquo;s Word.
                  </p>
                </>
              )}
            </div>

            <div className="mt-12">
              <a href={registerUrl} className="conf-btn">Register &mdash; {details.cost === 'Free' ? 'Free Admission' : details.cost}</a>
            </div>
          </div>
        </section>

        {/* ── SPEAKERS ── */}
        <section id="speakers" className="py-20 md:py-28 px-6" style={{ background: '#ffffff' }}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <p className="conf-eyebrow mb-4">Meet the Speakers</p>
              <h2 className="conf-section-heading text-3xl md:text-4xl mb-4">Women Who Know the Word</h2>
              <div className="conf-gold-rule"></div>
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
                  <h3 className="font-serif font-bold text-xl mb-1" style={{ color: '#3A4522' }}>
                    {speaker.name}
                  </h3>
                  <p className="font-sans text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#C4923A' }}>
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

            <div style={{ borderLeft: '3px solid #5C6B35', paddingLeft: '1.5rem' }}>
              {schedule.map((item) => (
                <div key={item.id} className="conf-timeline-item">
                  <span className="conf-time">{item.time}</span>
                  <div>
                    <span className="font-serif font-semibold text-base" style={{ color: '#3A4522' }}>
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

        {/* ── FAQ ── */}
        <section id="details" className="py-20 md:py-28 px-6" style={{ background: '#ffffff' }}>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-14">
              <p className="conf-eyebrow mb-4">Details &amp; FAQ</p>
              <h2 className="conf-section-heading text-3xl md:text-4xl mb-4">Everything You Need to Know</h2>
              <div className="conf-gold-rule"></div>
            </div>

            <div>
              {faq.map((item) => (
                <div key={item.id} className="conf-faq-item">
                  <h3 className="font-serif font-bold text-base mb-2" style={{ color: '#3A4522' }}>
                    {item.question}
                  </h3>
                  <p className="font-sans text-sm leading-relaxed" style={{ color: '#5C5A4A' }}>
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 p-8 text-center" style={{ background: '#EEF1E3', borderLeft: '4px solid #C4923A' }}>
              <p className="font-sans text-sm" style={{ color: '#4A4A38' }}>
                <strong>Location</strong><br />
                {details.location}<br />
                {details.address}
              </p>
              <p className="font-sans text-sm mt-4" style={{ color: '#4A4A38' }}>
                Questions? Email us at{' '}
                <a href="mailto:solabiblechurch@gmail.com" style={{ color: '#C4923A' }}>
                  solabiblechurch@gmail.com
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* ── FOOTER CTA ── */}
        <section className="py-24 px-6 text-center" style={{ background: '#3A4522' }}>
          <div className="relative max-w-2xl mx-auto">
            <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" opacity="0.15">
                <ellipse cx="15%" cy="50%" rx="40" ry="120" fill="rgba(255,255,255,0.08)" transform="rotate(-25 0 0)"/>
                <ellipse cx="85%" cy="50%" rx="35" ry="100" fill="rgba(255,255,255,0.06)" transform="rotate(20 0 0)"/>
              </svg>
            </div>
            <p className="conf-eyebrow mb-6">{details.date} · {details.location.split(',')[1]?.trim() || 'Temple, TX'} · {details.cost}</p>
            <h2 className="font-serif font-black italic text-white text-4xl md:text-5xl mb-4" style={{ lineHeight: 1.1 }}>
              Join Us
            </h2>
            <p className="font-serif italic font-light text-white/70 text-xl mb-10">
              {details.name}
            </p>
            <a href={registerUrl} className="conf-btn" style={{ fontSize: '1rem', padding: '1rem 2.8rem' }}>
              Reserve Your Spot &mdash; {details.cost === 'Free' ? "It's Free" : details.cost}
            </a>
            <p className="mt-8 font-sans text-white/40 text-xs uppercase tracking-widest">
              Hosted by Open Hearts in a Closed World Ministry · Sola Bible Church
            </p>
          </div>
        </section>

      </main>
    </>
  );
}
