-- Run this in Supabase SQL Editor

-- 1. Enable auth already exists
-- 2. Progress table
create table if not exists public.student_progress (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text,
  progress jsonb not null default '{}'::jsonb,
  updated_at timestamp with time zone default now()
);

-- 3. Enable RLS
alter table public.student_progress enable row level security;

-- 4. Policies: user can read/write own row, mentor can read all if you add role later
create policy "Users can upsert own progress"
on public.student_progress for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

-- 5. Optional: Mentor view (create a view for mentors)
create or replace view public.mentor_cohort_view as
select email, progress, updated_at from public.student_progress order by updated_at desc;

-- 6. Index
create index if not exists idx_progress_updated on public.student_progress(updated_at desc);

-- Mentor read-all policy: allow authenticated users to read all for dashboard
-- For production, restrict to mentor emails via: auth.email() in ('you@college.edu')
-- Here we allow all authenticated to read (cohort view)
drop policy if exists "Mentors can read all" on public.student_progress;
create policy "Mentors can read all"
on public.student_progress for select
using (auth.role() = 'authenticated');

-- If you want public read for demo (remove in prod):
-- create policy "Public read for demo" on public.student_progress for select using (true);
