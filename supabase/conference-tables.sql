-- Run this in Supabase Studio → SQL Editor

CREATE TABLE IF NOT EXISTS conference_details (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT DEFAULT 'Open Hearts in a Closed World',
  tagline TEXT DEFAULT 'Women''s Conference',
  date TEXT DEFAULT 'December 5, 2026',
  location TEXT DEFAULT 'Sola Bible Church, Temple, TX',
  address TEXT DEFAULT '219 King Circle, Temple, TX 76501',
  cost TEXT DEFAULT 'Free',
  description TEXT DEFAULT '',
  scripture TEXT DEFAULT '',
  scripture_ref TEXT DEFAULT 'Galatians 5:22–23',
  register_url TEXT DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS conference_speakers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT DEFAULT '',
  bio TEXT DEFAULT '',
  photo_url TEXT DEFAULT '',
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS conference_schedule (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  time TEXT NOT NULL,
  label TEXT NOT NULL,
  note TEXT DEFAULT '',
  display_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS conference_faq (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  display_order INT DEFAULT 0
);

-- Enable RLS
ALTER TABLE conference_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE conference_speakers ENABLE ROW LEVEL SECURITY;
ALTER TABLE conference_schedule ENABLE ROW LEVEL SECURITY;
ALTER TABLE conference_faq ENABLE ROW LEVEL SECURITY;

-- Public read access (service role key used for writes, bypasses RLS)
CREATE POLICY "Public read conference_details" ON conference_details FOR SELECT USING (true);
CREATE POLICY "Public read conference_speakers" ON conference_speakers FOR SELECT USING (true);
CREATE POLICY "Public read conference_schedule" ON conference_schedule FOR SELECT USING (true);
CREATE POLICY "Public read conference_faq" ON conference_faq FOR SELECT USING (true);
