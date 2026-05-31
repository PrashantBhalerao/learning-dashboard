-- Run this in your Supabase SQL Editor
-- https://app.supabase.com → SQL Editor → New Query

-- 1. Create the courses table
CREATE TABLE IF NOT EXISTS courses (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title      TEXT NOT NULL,
  progress   INTEGER NOT NULL CHECK (progress >= 0 AND progress <= 100),
  icon_name  TEXT NOT NULL DEFAULT 'BookOpen',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Enable Row Level Security
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

-- 3. Allow anonymous reads (public dashboard)
CREATE POLICY "Allow public read"
  ON courses
  FOR SELECT
  USING (true);

-- 4. Seed data
INSERT INTO courses (title, progress, icon_name) VALUES
  ('Advanced React Patterns',  75, 'Code2'),
  ('TypeScript Mastery',       52, 'FileCode'),
  ('System Design Pro',        30, 'Network'),
  ('Cloud Architecture',       88, 'Cloud');
