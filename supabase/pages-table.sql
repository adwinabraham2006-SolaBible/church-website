-- ============================================
-- PAGES TABLE (CMS for editable pages)
-- Run this in the Supabase SQL Editor
-- ============================================

-- Drop existing table if it exists
DROP TABLE IF EXISTS pages CASCADE;

-- Create pages table
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

-- Apply trigger for updated_at (assumes the function already exists from main schema)
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

-- Create storage bucket for pages (run separately if needed)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('pages', 'pages', true) ON CONFLICT DO NOTHING;
