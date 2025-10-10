-- create blogs table for DB-backed posts (Supabase)
create table if not exists public.blogs (
  id text primary key,
  title text not null,
  excerpt text,
  content_html text,
  cover_image text,
  medium_url text,
  iso_date timestamptz,
  author text,
  tags jsonb default '[]'::jsonb,
  is_premium boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists blogs_created_at_idx on public.blogs (created_at desc);
create index if not exists blogs_iso_date_idx on public.blogs (iso_date desc);