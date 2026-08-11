-- Volunteer page content (single row)
CREATE TABLE IF NOT EXISTS volunteer_content (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  description text DEFAULT '',
  updated_at timestamptz DEFAULT now()
);

-- Volunteer files: photos and PDFs
CREATE TABLE IF NOT EXISTS volunteer_files (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  url text NOT NULL,
  type text NOT NULL CHECK (type IN ('photo', 'pdf')),
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- RLS
ALTER TABLE volunteer_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE volunteer_files ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read volunteer_content" ON volunteer_content FOR SELECT USING (true);
CREATE POLICY "Public read volunteer_files" ON volunteer_files FOR SELECT USING (true);
