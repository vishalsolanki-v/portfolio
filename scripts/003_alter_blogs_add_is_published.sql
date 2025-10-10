-- Ensure is_published column exists; keep default true
alter table if exists public.blogs
  add column if not exists is_published boolean default true;