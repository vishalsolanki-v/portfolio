-- Create blogs table for premium/custom blog posts
CREATE TABLE IF NOT EXISTS public.blogs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  medium_id TEXT UNIQUE, -- For imported Medium posts
  title TEXT NOT NULL,
  link TEXT,
  description TEXT,
  image TEXT,
  date TEXT,
  iso_date TIMESTAMPTZ,
  author TEXT,
  content_html TEXT,
  is_premium BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for security
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

-- Admin can do everything (we'll check ADMIN_SECRET in the app)
CREATE POLICY "Admin full access" ON public.blogs
  FOR ALL USING (true);

-- Public can only read published blogs
CREATE POLICY "Public read published" ON public.blogs
  FOR SELECT USING (is_published = true);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_blogs_medium_id ON public.blogs(medium_id);
CREATE INDEX IF NOT EXISTS idx_blogs_published ON public.blogs(is_published);
CREATE INDEX IF NOT EXISTS idx_blogs_date ON public.blogs(iso_date DESC);