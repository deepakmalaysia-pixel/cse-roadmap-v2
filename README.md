# CSE Mentorship Platform 2026 - Vercel + Supabase Edition

Mentorship OS for CSE students: Year 1-2 Foundation Fishbone + Year 3-4 Career Flowchart + Progress Tracker with DB.

## 1. What this contains (extensive intro)

This is **not** a course list. It's a mentor's classroom tool.

**Intro Section** explains philosophy: Foundation (Y1-Y2) = 80% employability, Specialization (Y3-Y4) = salary multiplier. Data: India Skills Report 2026 - CSE 80% employability, B.Tech overall 71.5% (5-year high), Fresher 3.5-7 LPA, Avg 9-15 LPA. Bangalore/Hyd/Pune 20-30% premium.

**Fishbone (Y1-Y2):** 4 bones: Programming Logic, CS Core (DSA/DBMS/OS/CN/OOP), Math & Logic, Engineering Habits. Each bone has checkable tasks.

**Flowchart (Y3-Y4):** 6 career tracks:
1. Full Stack / Product (SaaS) - 6-12 LPA
2. Cloud & DevOps - 5-9 LPA -> 15-25 LPA (8x demand gap)
3. Data & AI - 6-10 LPA -> 10-18 LPA
4. Cybersecurity - 5-8 LPA -> 12-20 LPA
5. Enterprise IT / Digitization - 3.5-6 LPA -> 12-18 LPA (massive volume in banks, manufacturing, retail computerising)
6. QA/SDET - 3-5 LPA -> 8-12 LPA (fastest entry for passed-out)

Each track: Sem-wise skills, 2 projects, certs, target companies.

**Recovery Plan:** 90-day for passed-out job seekers.

**Progress Tracker:** Checkbox system with LocalStorage + Supabase sync. Student sees % complete.

**Resources Section:** Curated free resources, data sources, why Vercel+Supabase.

## 2. How students use it as progress tool

- Student opens Vercel link, goes to My Progress
- Checks off tasks as they complete (e.g., C Pointers done, SQL Joins done, Docker done)
- % bar updates. Data saved in browser LocalStorage instantly (works offline)
- Optional: Signup/Login -> Sync to Cloud -> Mentor can see in Supabase dashboard
- Mentor can ask for screenshot or query `student_progress` table

## 3. Resources used

- India Skills Report 2026 (Wheebox) - employability stats
- UPES / Ambitionbox - salary bands
- TOI, Economic Times - AI boom context
- NASSCOM - demand gap

## 4. Tech: Why Vercel + Supabase is best (Free tier)

- **Vercel Free:** 100GB bandwidth, auto deploy from GitHub, perfect for classroom link. No server needed.
- **Supabase Free:** 500MB DB, 50k MAU Auth, Postgres (students learn SQL while using it). Open source.
- **Alternative comparison:** Firebase (NoSQL, less relevant for SQL mentoring), Render (sleeps). Supabase aligns with your DB management teaching.
- **Cost:** ₹0 to start, scales to $25 when >1000 students.

## Local Setup in VS Code

1. Clone / unzip
2. Open in VS Code
3. Install Live Server extension -> Open with Live Server -> works
4. No npm needed for basic version

## Setup Supabase (5 mins)

1. Go to supabase.com -> New Project (free)
2. SQL Editor -> paste `sql/schema.sql` -> Run
3. Project Settings -> API -> copy URL and anon key
4. Option A (quick test): In browser console: 
   ```
   localStorage.setItem('SUPABASE_URL','https://xyz.supabase.co')
   localStorage.setItem('SUPABASE_ANON_KEY','your-anon-key')
   ```
   Reload page -> My Progress -> Signup/Login -> Sync
5. Option B (static deployment): Put your project URL and anon key in `js/supabase-config.js`, then deploy. The anon key is intended for browser use; never put a `service_role` key in this file.
6. Option C (Vercel build): `.env.local` and Vercel environment variables do not automatically reach this no-build static page. Use Option B, or add a build step that injects `SUPABASE_CONFIG` before deployment.

## Deploy to Vercel (2 mins)

1. Push to GitHub
2. vercel.com -> New Project -> Import your GitHub repo
3. Add env vars SUPABASE_URL and SUPABASE_ANON_KEY in Vercel Settings if you want build-time injection
4. Deploy -> you get https://your-project.vercel.app link to share with students

## Security & Privacy Checklist (Before Public Repo)

1. Never commit Supabase service_role keys. Only use SUPABASE_ANON_KEY in client-side code.
2. Update mentor policy in `sql/schema.sql` with real mentor emails before production use.
3. Keep student data access least-privilege: students read/write only their own row.
4. If demoing publicly, use test accounts and avoid real personal student data.
5. Rotate anon key if it is accidentally exposed in screenshots/docs with extra context.

## File Structure (clean components)

```
index.html           -> 5 views (Intro, HowTo, Roadmap, Resources, Progress)
css/style.css        -> All styling, dark glass, responsive
js/data.js           -> EDIT SALARIES / TASKS HERE - single source of truth
js/fishbone.js       -> SVG fishbone rendering
js/flowchart.js      -> Career cards rendering + filters
js/progress.js       -> LocalStorage + Supabase sync + auth + % calc
js/app.js            -> Navigation
sql/schema.sql       -> Supabase table + RLS policies
.env.example         -> Env template
vercel.json          -> Vercel config
```

## Next enhancements you can build in VS Code

- Mentor Dashboard page: query all student_progress and show leaderboard
- Add Chart.js salary bar chart
- Add weekly streaks
- Add certificate upload

