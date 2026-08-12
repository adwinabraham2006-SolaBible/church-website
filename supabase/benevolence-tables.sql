CREATE TABLE IF NOT EXISTS benevolence_content (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  description text DEFAULT '',
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS benevolence_announcements (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  body text NOT NULL,
  date date,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS benevolence_files (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  url text NOT NULL,
  type text NOT NULL CHECK (type IN ('photo', 'pdf')),
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE benevolence_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE benevolence_announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE benevolence_files ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read benevolence_content" ON benevolence_content FOR SELECT USING (true);
CREATE POLICY "Public read benevolence_announcements" ON benevolence_announcements FOR SELECT USING (true);
CREATE POLICY "Public read benevolence_files" ON benevolence_files FOR SELECT USING (true);
