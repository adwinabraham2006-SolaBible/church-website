-- Prayer Requests table
-- Run in Supabase SQL Editor

CREATE TABLE IF NOT EXISTS prayer_requests (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at  timestamptz DEFAULT now(),
  name        text NOT NULL,
  email       text,
  phone       text,
  request     text NOT NULL,
  confidential boolean NOT NULL DEFAULT false,
  followup    boolean NOT NULL DEFAULT false,
  status      text NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'praying', 'followed_up')),
  handled_by  text,
  notes       text
);

CREATE INDEX IF NOT EXISTS idx_prayer_requests_created ON prayer_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_prayer_requests_status  ON prayer_requests(status);

-- RLS: no public reads or inserts — all access goes through service role in API routes
ALTER TABLE prayer_requests ENABLE ROW LEVEL SECURITY;

-- Service role bypasses RLS automatically; these policies block anon/authenticated roles
CREATE POLICY "No public read on prayer_requests"
  ON prayer_requests FOR SELECT USING (false);

CREATE POLICY "No public insert on prayer_requests"
  ON prayer_requests FOR INSERT WITH CHECK (false);
