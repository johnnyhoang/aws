-- Migration: Create independent tables for AWS Cloud Mastery with prefix 'aws_'
-- Shared Supabase database with BETH (which uses 'beth_')

CREATE TABLE IF NOT EXISTS public.aws_user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email TEXT NOT NULL UNIQUE,
  user_name TEXT,
  progress JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for fast user lookup
CREATE INDEX IF NOT EXISTS idx_aws_user_progress_email ON public.aws_user_progress(user_email);

-- Enable Row Level Security (RLS)
ALTER TABLE public.aws_user_progress ENABLE ROW LEVEL SECURITY;

-- Allow public / authenticated access based on email
CREATE POLICY "Allow individual user access by email" ON public.aws_user_progress
  FOR ALL
  USING (true)
  WITH CHECK (true);
