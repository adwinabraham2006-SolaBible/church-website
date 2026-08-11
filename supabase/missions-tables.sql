-- Missions page content (single row)
CREATE TABLE IF NOT EXISTS missions_content (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  description text DEFAULT '',
  updated_at timestamptz DEFAULT now()
);

-- Missions files: photos and PDFs
CREATE TABLE IF NOT EXISTS missions_files (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  url text NOT NULL,
  type text NOT NULL CHECK (type IN ('photo', 'pdf')),
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE missions_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE missions_files ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read missions_content" ON missions_content FOR SELECT USING (true);
CREATE POLICY "Public read missions_files" ON missions_files FOR SELECT USING (true);
