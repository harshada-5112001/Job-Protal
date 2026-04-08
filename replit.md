# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)
- **File uploads**: multer (resume PDFs)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Project: Simple Samaj Job Portal

A full-stack job portal for Marathi-speaking job seekers.

### Features

**Public (Landing Page)**
- Job listings with real-time filters (IT/Non-IT, Location, Salary, Experience)
- Live stats: total jobs, IT vs Non-IT counts, available locations

**Job Apply System (No Login Required)**
- Direct application form: Name, Mobile, Email, Location, Experience, Skills
- Resume PDF upload (stored in `/tmp/resumes/`)
- Submissions saved to PostgreSQL

**Resume Builder (ATS Friendly)**
- Fill-in form: Personal Info, Work Experience, Education, Skills, Projects
- 3 templates: Modern, Classic, Minimal
- Live preview as you type
- PDF download via browser print

**Admin Panel**
- Login: username `admin`, password `samaj@2024`
- Add/edit/delete job listings
- View all applicants with filters
- Update application status: Pending / Called / Selected / Rejected
- Dashboard with stats overview

### DB Schema
- `jobs` — job listings (title, company, type IT/Non-IT, location, salary range, experience, description, isActive)
- `applications` — applicant submissions (linked to job, fullName, mobileNumber, email, location, experience, skills, resumeUrl, status)

### Artifacts
- `artifacts/simple-samaj` — React + Vite frontend (root `/`)
- `artifacts/api-server` — Express 5 API server (`/api`)

### API Routes
- `GET /api/jobs` — public job listings with filters
- `GET /api/jobs/stats` — public stats
- `GET /api/jobs/:id` — single job
- `POST /api/applications` — submit application (multipart/form-data)
- `POST /api/admin/login` — admin auth
- `GET/POST /api/admin/jobs` — admin job CRUD
- `PUT/DELETE /api/admin/jobs/:id` — update/delete job
- `GET /api/admin/applications` — view applications
- `PUT /api/admin/applications/:id/status` — update application status
- `GET /api/admin/stats` — admin dashboard stats
