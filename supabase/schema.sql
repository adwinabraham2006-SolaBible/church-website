-- Supabase Database Schema for Sola Bible Church
-- Run this in the Supabase SQL Editor to create all tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- DROP EXISTING TABLES (for fresh install)
-- Comment out this section if you want to preserve existing data
-- ============================================
DROP TABLE IF EXISTS sermons CASCADE;
DROP TABLE IF EXISTS sermon_series CASCADE;
DROP TABLE IF EXISTS events CASCADE;
DROP TABLE IF EXISTS announcements CASCADE;
DROP TABLE IF EXISTS bulletins CASCADE;
DROP TABLE IF EXISTS staff CASCADE;
DROP TABLE IF EXISTS books CASCADE;

-- ============================================
-- SERMON SERIES TABLE (must be created first for FK reference)
-- ============================================
CREATE TABLE IF NOT EXISTS sermon_series (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  start_date DATE,
  end_date DATE,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- SERMONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS sermons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  date DATE NOT NULL,
  speaker TEXT NOT NULL,
  scripture TEXT NOT NULL,
  series_id UUID REFERENCES sermon_series(id) ON DELETE SET NULL,
  description TEXT NOT NULL,
  audio_url TEXT,
  video_url TEXT,
  slides_url TEXT,
  notes_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster date-based queries
CREATE INDEX IF NOT EXISTS idx_sermons_date ON sermons(date DESC);
CREATE INDEX IF NOT EXISTS idx_sermons_series ON sermons(series_id);

-- ============================================
-- EVENTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  date DATE NOT NULL,
  time TEXT NOT NULL,
  location TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster date-based queries
CREATE INDEX IF NOT EXISTS idx_events_date ON events(date ASC);

-- ============================================
-- ANNOUNCEMENTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS announcements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  date DATE,
  body TEXT NOT NULL,
  image_url TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for published announcements
CREATE INDEX IF NOT EXISTS idx_announcements_published ON announcements(published, date DESC);

-- ============================================
-- BULLETINS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS bulletins (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  week_of DATE NOT NULL,
  pdf_url TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster date-based queries
CREATE INDEX IF NOT EXISTS idx_bulletins_week ON bulletins(week_of DESC);

-- ============================================
-- STAFF TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS staff (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  bio TEXT,
  photo_url TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for ordering
CREATE INDEX IF NOT EXISTS idx_staff_order ON staff(display_order ASC);

-- ============================================
-- BOOKS TABLE (Bookstore)
-- ============================================
CREATE TABLE IF NOT EXISTS books (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2),
  image_url TEXT,
  category TEXT,
  in_stock BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for category filtering
CREATE INDEX IF NOT EXISTS idx_books_category ON books(category);
CREATE INDEX IF NOT EXISTS idx_books_in_stock ON books(in_stock);

-- ============================================
-- AUTOMATIC UPDATED_AT TRIGGER
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to all tables
DROP TRIGGER IF EXISTS update_sermons_updated_at ON sermons;
CREATE TRIGGER update_sermons_updated_at
  BEFORE UPDATE ON sermons
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_sermon_series_updated_at ON sermon_series;
CREATE TRIGGER update_sermon_series_updated_at
  BEFORE UPDATE ON sermon_series
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_events_updated_at ON events;
CREATE TRIGGER update_events_updated_at
  BEFORE UPDATE ON events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_announcements_updated_at ON announcements;
CREATE TRIGGER update_announcements_updated_at
  BEFORE UPDATE ON announcements
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_bulletins_updated_at ON bulletins;
CREATE TRIGGER update_bulletins_updated_at
  BEFORE UPDATE ON bulletins
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_staff_updated_at ON staff;
CREATE TRIGGER update_staff_updated_at
  BEFORE UPDATE ON staff
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_books_updated_at ON books;
CREATE TRIGGER update_books_updated_at
  BEFORE UPDATE ON books
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================
-- Enable RLS on all tables
ALTER TABLE sermons ENABLE ROW LEVEL SECURITY;
ALTER TABLE sermon_series ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE bulletins ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE books ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public read access" ON sermons;
DROP POLICY IF EXISTS "Public read access" ON sermon_series;
DROP POLICY IF EXISTS "Public read access" ON events;
DROP POLICY IF EXISTS "Public read access" ON announcements;
DROP POLICY IF EXISTS "Public read access" ON bulletins;
DROP POLICY IF EXISTS "Public read access" ON staff;
DROP POLICY IF EXISTS "Public read access" ON books;

DROP POLICY IF EXISTS "Service role full access" ON sermons;
DROP POLICY IF EXISTS "Service role full access" ON sermon_series;
DROP POLICY IF EXISTS "Service role full access" ON events;
DROP POLICY IF EXISTS "Service role full access" ON announcements;
DROP POLICY IF EXISTS "Service role full access" ON bulletins;
DROP POLICY IF EXISTS "Service role full access" ON staff;
DROP POLICY IF EXISTS "Service role full access" ON books;

-- Public read access policies (for anonymous users)
CREATE POLICY "Public read access" ON sermons FOR SELECT USING (true);
CREATE POLICY "Public read access" ON sermon_series FOR SELECT USING (true);
CREATE POLICY "Public read access" ON events FOR SELECT USING (true);
CREATE POLICY "Public read access" ON announcements FOR SELECT USING (published = true);
CREATE POLICY "Public read access" ON bulletins FOR SELECT USING (published = true);
CREATE POLICY "Public read access" ON staff FOR SELECT USING (true);
CREATE POLICY "Public read access" ON books FOR SELECT USING (true);

-- Service role has full access (for admin operations)
CREATE POLICY "Service role full access" ON sermons FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON sermon_series FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON events FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON announcements FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON bulletins FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON staff FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON books FOR ALL USING (true) WITH CHECK (true);

-- ============================================
-- PAGES TABLE (CMS for editable pages)
-- ============================================
DROP TABLE IF EXISTS pages CASCADE;

CREATE TABLE IF NOT EXISTS pages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  content TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for slug lookups
CREATE INDEX IF NOT EXISTS idx_pages_slug ON pages(slug);

-- Apply trigger for updated_at
DROP TRIGGER IF EXISTS update_pages_updated_at ON pages;
CREATE TRIGGER update_pages_updated_at
  BEFORE UPDATE ON pages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public read access" ON pages;
DROP POLICY IF EXISTS "Service role full access" ON pages;

-- Public read access
CREATE POLICY "Public read access" ON pages FOR SELECT USING (true);

-- Service role full access
CREATE POLICY "Service role full access" ON pages FOR ALL USING (true) WITH CHECK (true);

-- Pre-populate with default pages
INSERT INTO pages (slug, title, content) VALUES
  ('children', 'Children''s Ministry', '<p>Welcome to our Children''s Ministry! We are dedicated to nurturing the faith of the next generation.</p>'),
  ('youth', 'Youth Ministry', '<p>Our Youth Ministry provides a place for teenagers to grow in their faith and build lasting friendships.</p>'),
  ('adults', 'Adult Ministries', '<p>We offer various opportunities for adults to connect, learn, and serve together.</p>'),
  ('seniors', 'Legacy Fellowship', '<p>Our Legacy Fellowship is a vibrant community for seniors to enjoy fellowship and continue growing in faith.</p>'),
  ('women', 'Women''s Ministry', '<p>Our Women''s Ministry creates opportunities for women to connect, grow, and serve together.</p>'),
  ('men', 'Men''s Ministry', '<p>Our Men''s Ministry equips men to be godly leaders in their homes, workplaces, and communities.</p>'),
  ('volunteer', 'Volunteer Opportunities', '<p>Discover how you can use your gifts and talents to serve in our church and community.</p>'),
  ('missions', 'Mission & Outreach', '<p>We are committed to sharing the love of Christ locally and around the world.</p>'),
  ('beliefs', 'What We Believe', '<p>Learn about our core beliefs and doctrinal positions.</p>'),
  ('leadership', 'Leadership & Staff', '<p>Meet our pastoral staff and church leadership.</p>'),
  ('history', 'Our History', '<p>Learn about the history of our church and how God has been at work in our community.</p>'),
  ('contact', 'Contact Us', '<p>We would love to hear from you. Reach out to us with any questions.</p>')
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- STORAGE BUCKETS
-- ============================================
-- Run these commands in SQL Editor to create storage buckets:
-- INSERT INTO storage.buckets (id, name, public) VALUES ('sermons', 'sermons', true);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('events', 'events', true);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('announcements', 'announcements', true);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('bulletins', 'bulletins', true);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('staff', 'staff', true);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('books', 'books', true);

-- Storage policies for public read access
-- CREATE POLICY "Public read access" ON storage.objects FOR SELECT USING (bucket_id IN ('sermons', 'events', 'announcements', 'bulletins', 'staff', 'books'));
-- CREATE POLICY "Service role upload access" ON storage.objects FOR INSERT WITH CHECK (true);
-- CREATE POLICY "Service role update access" ON storage.objects FOR UPDATE USING (true) WITH CHECK (true);
-- CREATE POLICY "Service role delete access" ON storage.objects FOR DELETE USING (true);
