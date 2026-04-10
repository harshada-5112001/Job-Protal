# Job Finder Plus

**Job Finder Plus** हा एक full-stack monorepo प्रोजेक्ट आहे ज्यात job search frontend, API backend आणि database schema सर्व समाविष्ट आहेत.

## Project Description

हा प्रोजेक्ट job seekers आणि employers साठी एक self-contained application आहे. Users job listings पाहू शकतात, filter करू शकतात, job ला apply करू शकतात आणि resume builder/ contact form सारख्या utility features वापरू शकतात.

### मुख्य उद्देश
- Job discovery आणि application flow सुलभ करणे
- Admin/management साठी job data आणि applications handle करणे
- Responsive user interface देणे
- Type-safe API integration आणि database access राखणे

## Repo Structure

```
/ (workspace root)
  |-- artifacts/
  |     |-- api-server/        # Backend API server
  |     |-- simple-samaj/      # Main React frontend app
  |     |-- mockup-sandbox/    # UI mockup environment and component preview
  |
  |-- lib/
  |     |-- api-client-react/  # Shared React API client
  |     |-- api-spec/          # OpenAPI schema and generator config
  |     |-- api-zod/           # Zod schema and API validation layer
  |     |-- db/                # Drizzle DB schema and database utilities
  |
  |-- scripts/                # Utility scripts for seeding or data generation
  |-- package.json             # Root workspace config
  |-- pnpm-workspace.yaml      # Monorepo package config
```

## Technology Stack

- Frontend: React, TypeScript, Vite
- Backend: Node.js, Express, TypeScript
- Database: Drizzle ORM
- API validation: Zod, OpenAPI-compatible patterns
- Package manager: pnpm workspace
- UI / component system: Tailwind CSS, Radix UI, React Query

## Main Packages

### `artifacts/simple-samaj`
- Main frontend application
- Uses Vite and React
- Contains pages like Home, Careers, Contact, Resume Builder, Admin
- Integrates with shared API client

### `artifacts/api-server`
- Backend REST API server
- Uses Express with TypeScript
- Connects to shared database package `@workspace/db`
- Uses `@workspace/api-zod` for type-safe validation and shared schemas

### `lib/api-client-react`
- Reusable API client library for React
- Likely holds generated API hooks and fetch helpers for frontend consumption

### `lib/db`
- Database layer and schema definitions
- Uses Drizzle ORM for schema definition and query building

### `lib/api-zod`
- Shared validation schemas using Zod
- Provides consistent server/client type definitions and runtime validation

## Install Dependencies

Workspace-level install:

```bash
pnpm install
```

> Important: This repo uses `pnpm` and the root workspace is configured to reject npm/yarn installs.

## Run Locally

### Frontend

```bash
pnpm --filter @workspace/simple-samaj dev
```

### Backend

```bash
pnpm --filter @workspace/api-server dev
```

### Build

Root build command:

```bash
pnpm run build
```

Package-specific builds:

```bash
pnpm --filter @workspace/simple-samaj build
pnpm --filter @workspace/api-server build
```

## Development Flow

1. `pnpm install`
2. Start backend server with `pnpm --filter @workspace/api-server dev`
3. Start frontend with `pnpm --filter @workspace/simple-samaj dev`
4. Open the local frontend URL shown by Vite
5. Use frontend forms and job pages to interact with the API

## Key Features

- Job listing and search UI
- Job application workflow
- Resume builder and export utilities
- Contact form for messages
- Admin-style backend for job/application management
- Type-safe API and data validation
- Responsive design for desktop and mobile

## Data Flow

- Frontend requests job-related data from `api-server`
- `api-server` validates requests using Zod schemas
- Data is stored and retrieved via `lib/db` Drizzle ORM
- Shared types and schemas reduce duplication across frontend/backend

## How to Explain this Project in an Interview

1. `Project summary`: "Job Finder Plus is a full-stack monorepo built with React, Vite, Express, TypeScript, and Drizzle. It supports job search, applications, resume generation, and admin data management."
2. `Architecture`: "I used a pnpm workspace with separate frontend, backend, and shared library packages. The frontend consumes APIs from the backend and both share types via Zod and a generated API client."
3. `My responsibilities`: "I worked on the React UI pages, API integration, backend routes, and database schema. I also ensured type safety and reusable code between packages."
4. `Challenges`: "Managing the monorepo, keeping types consistent, and wiring the backend API with the frontend forms were the main challenges."
5. `Improvements`: "I can add authentication, role-based admin access, search filters, analytics, and better error handling next."

## Notes

- The workspace uses `pnpm` and expects package names like `@workspace/simple-samaj` and `@workspace/api-server`.
- The root `package.json` is private and only contains workspace scripts and TypeScript toolchain config.
- `pnpm-workspace.yaml` limits package discovery to `artifacts/*`, `lib/*`, and `scripts`.

## Useful Commands

```bash
pnpm install
pnpm run typecheck
pnpm --filter @workspace/simple-samaj dev
pnpm --filter @workspace/api-server dev
pnpm --filter @workspace/simple-samaj build
pnpm --filter @workspace/api-server build
```

## Future Enhancements

- Authentication / user account management
- Admin dashboard with protected access
- Search filters by location, salary, type, and category
- Email notifications for applications
- Analytics and application status tracking
- Production deployment scripts
