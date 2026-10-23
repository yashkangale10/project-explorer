# Project Explorer: A Project Management Portal

A lightweight, modular project management portal built with **Next.js (App Router)** and **TypeScript**, demonstrating modern Next.js architecture, nested layouts, dynamic routing, catch-all routes, streaming with React Suspense, error boundaries, and a balanced Server/Client Component design.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Application Flow & Architecture](#application-flow--architecture)
3. [Folder & File Structure](#folder--file-structure)
4. [Server vs. Client Components Breakdown](#server-vs-client-components-breakdown)
5. [Requirements & Implementation Map](#requirements--implementation-map)
   - [1. Application Structure](#1-application-structure)
   - [2. Common Application Layout](#2-common-application-layout)
   - [3. Dashboard Experience & Sub-pages](#3-dashboard-experience--sub-pages)
   - [4. Projects Module (Dynamic & Nested Routes)](#4-projects-module-dynamic--nested-routes)
   - [5. Catch-All Route](#5-catch-all-route)
   - [6. Search & Filtering with URL Query Parameters](#6-search--filtering-with-url-query-parameters)
   - [7. Loading Experience & Suspense Streaming](#7-loading-experience--suspense-streaming)
   - [8. Error Handling & Retry Boundaries](#8-error-handling--retry-boundaries)
   - [9. Client-Side Interactivity](#9-client-side-interactivity)
   - [10. Bonus Challenges Implemented](#10-bonus-challenges-implemented)
6. [Getting Started (Running Locally)](#getting-started-running-locally)

---

## Project Overview

Project Explorer is built to serve as an organizational hub where team members can browse ongoing initiatives, drill down into project specifics (overview, team members, tasks), navigate dashboard analytics, and configure settings.

The project strictly follows the **Next.js App Router** paradigm, keeping components as **Server Components** by default for maximum performance and SEO, while surgically isolating interactive and stateful logic into dedicated **Client Components** marked with `"use client"`.

---

## Application Flow & Architecture

```
                  ┌───────────────────────────────┐
                  │   RootLayout (app/layout.tsx) │
                  │     └─ Navbar (app/Navbar.tsx)│
                  └───────────────┬───────────────┘
                                  │
     ┌──────────────────┬─────────┴────────┬──────────────────┬──────────────┐
     ▼                  ▼                  ▼                  ▼              ▼
┌───────────┐    ┌─────────────┐    ┌───────────────┐   ┌────────────┐ ┌────────────┐
│   Home    │    │    About    │    │   Dashboard   │   │  Projects  │ │  Settings  │
│ (/page.tsx│    │(/about/page)│    │(/dashboard/..)│   │(/projects) │ │(/settings) │
└───────────┘    └─────────────┘    └───────┬───────┘   └─────┬──────┘ └────────────┘
                                            │                 │
                                    ┌───────┴───────┐   ┌─────┴──────────────────┐
                                    │DashboardLayout│   │ ProjectLayout          │
                                    │ └─ Sidebar    │   │  ├─ Suspense Boundary  │
                                    │  ├─ Analytics │   │  │   └─ ProjectsContent │
                                    │  ├─ Teams     │   │  │       ├─ Filter Bar │
                                    │  └─ Reports   │   │  │       └─ List Links │
                                    └───────────────┘   │  └─ Error Boundary     │
                                                        └─────────────┬──────────┘
                                                                      │
                                                        ┌─────────────┴──────────┐
                                                        │ Dynamic Project Route  │
                                                        │ (/projects/[projectId])│
                                                        │  ├─ loading.tsx        │
                                                        │  ├─ error.tsx          │
                                                        │  ├─ ProjectDetail      │
                                                        │  ├─ /overview          │
                                                        │  ├─ /team              │
                                                        │  ├─ /tasks             │
                                                        │  └─ /[...catchAll]     │
                                                        └────────────────────────┘
```

---

## Folder & File Structure

```
project-explorer/
├── app/
│   ├── about/
│   │   └── page.tsx                        # About route page (Server Component)
│   ├── dashboard/
│   │   ├── analytics/
│   │   │   └── page.tsx                    # Dashboard sub-page: Analytics
│   │   ├── reports/
│   │   │   └── page.tsx                    # Dashboard sub-page: Reports
│   │   ├── teams/
│   │   │   └── page.tsx                    # Dashboard sub-page: Teams
│   │   ├── layout.tsx                      # Dedicated nested dashboard layout with Sidebar
│   │   ├── page.tsx                        # Main dashboard content page
│   │   ├── Sidebar.tsx                     # Dashboard navigation sidebar
│   │   └── sidebar.css                     # Dedicated styling for dashboard sidebar layout
│   ├── projects/
│   │   ├── [projectId]/                    # Dynamic project routes
│   │   │   ├── [...projectDetails]/
│   │   │   │   └── page.tsx                # Catch-all route for deep resources/docs
│   │   │   ├── overview/
│   │   │   │   └── page.tsx                # Nested route: Project overview tab
│   │   │   ├── tasks/
│   │   │   │   └── page.tsx                # Nested route: Project tasks list
│   │   │   ├── team/
│   │   │   │   └── page.tsx                # Nested route: Project team list
│   │   │   ├── error.tsx                   # Route-level error boundary with Retry
│   │   │   ├── loading.tsx                 # Instant loading skeleton / fallback state
│   │   │   ├── page.tsx                    # Project detail parent page (simulates async fetch)
│   │   │   └── ProjectDetail.tsx           # Presentation component for project details
│   │   ├── BackButton.tsx                  # Reusable client component for router.back()
│   │   ├── error.tsx                       # Projects list error boundary with Retry
│   │   ├── layout.tsx                      # Projects module layout
│   │   ├── page.tsx                        # Projects page with Suspense boundary
│   │   ├── ProjectFilters.tsx              # Interactive search & status filter (Client Component)
│   │   └── ProjectsContent.tsx             # Async data fetcher & project list renderer
│   ├── settings/
│   │   └── page.tsx                        # Settings route page (Server Component)
│   ├── globals.css                         # Global CSS & Tailwind imports
│   ├── layout.tsx                          # Root layout wrapping all pages
│   ├── Navbar.tsx                          # Persistent top navigation bar
│   └── page.tsx                            # Home route landing page
├── data/
│   └── projects.json                       # Centralized JSON dataset for all projects
├── lib/
│   └── projects.ts                         # Data access layer (getProjects, getProjectById, filters)
├── types/
│   └── project.ts                          # TypeScript interface definitions (Project)
├── package.json                            # Scripts and dependencies
├── tsconfig.json                           # TypeScript configuration
└── README.md                               # Project documentation
```

---

## Server vs. Client Components Breakdown

In accordance with Next.js best practices, components remain Server Components unless client-side browser APIs, event listeners, or hooks are strictly required:

| File / Component | Type | Why This Type Was Chosen |
| :--- | :--- | :--- |
| `app/layout.tsx` | **Server** | Root layout containing persistent HTML shell and `Navbar`. No client hooks needed. |
| `app/Navbar.tsx` | **Server** | Renders static Next.js `<Link>` elements. Zero client-side JS overhead. |
| `app/page.tsx` | **Server** | Static landing page. Pure HTML/JSX rendered on the server. |
| `app/about/page.tsx` | **Server** | Static informational page. |
| `app/settings/page.tsx` | **Server** | Static settings placeholder. |
| `app/dashboard/layout.tsx` | **Server** | Composes the persistent `Sidebar` and main content wrapper. |
| `app/dashboard/Sidebar.tsx`| **Server** | Uses `<Link>` components to navigate dashboard sub-routes without hydration costs. |
| `app/dashboard/page.tsx` | **Server** | Renders primary dashboard view. |
| `app/dashboard/analytics/page.tsx` | **Server** | Analytics view. |
| `app/dashboard/reports/page.tsx` | **Server** | Reports view. |
| `app/dashboard/teams/page.tsx` | **Server** | Teams view. |
| `app/projects/layout.tsx` | **Server** | Wraps project views in a shared `.projects-container`. |
| `app/projects/page.tsx` | **Server** | Serves as the page boundary; orchestrates React `<Suspense>` streaming for content. |
| `app/projects/ProjectsContent.tsx` | **Server** | Async component that reads `searchParams` on the server and queries the data layer. |
| `app/projects/ProjectFilters.tsx` | **Client (`"use client"`)** | **Interactive**: uses `useRouter()`, `useSearchParams()`, and `onChange` events to sync input states to the URL query string. |
| `app/projects/error.tsx` | **Client (`"use client"`)** | **Error Boundary requirement**: Next.js error boundaries must be client components to utilize React error lifecycle hooks and execute the interactive `reset()` callback. |
| `app/projects/BackButton.tsx` | **Client (`"use client"`)** | **Interactive**: requires `useRouter().back()` and `onClick` handler to navigate browser history. |
| `app/projects/[projectId]/page.tsx` | **Server** | Async server component that resolves dynamic `params`, fetches project data, and simulates latency for loading demonstration. |
| `app/projects/[projectId]/loading.tsx` | **Server** | Automated Next.js loading UI rendered while the server resolves dynamic data. |
| `app/projects/[projectId]/error.tsx` | **Client (`"use client"`)** | **Error Boundary requirement**: Route-level fallback with an interactive "Retry" button. |
| `app/projects/[projectId]/ProjectDetail.tsx` | **Server** | Pure presentation component for project summary, links, and metadata. |
| `app/projects/[projectId]/overview/page.tsx` | **Server** | Reads `params`, looks up project in dataset, and renders overview. |
| `app/projects/[projectId]/team/page.tsx` | **Server** | Reads `params`, renders team member list with back navigation. |
| `app/projects/[projectId]/tasks/page.tsx` | **Server** | Reads `params`, renders tasks with back navigation. |
| `app/projects/[projectId]/[...projectDetails]/page.tsx` | **Server** | Catch-all server route parsing dynamic path segments. |

---

## Requirements & Implementation Map

### 1. Application Structure
The application defines 5 dedicated top-level sections using App Router conventions:
- **Home**: [`app/page.tsx`](file:///c:/Users/yashk/Downloads/nextjs-project/nextjs-project/project-explorer/app/page.tsx)
- **About**: [`app/about/page.tsx`](file:///c:/Users/yashk/Downloads/nextjs-project/nextjs-project/project-explorer/app/about/page.tsx)
- **Dashboard**: [`app/dashboard/page.tsx`](file:///c:/Users/yashk/Downloads/nextjs-project/nextjs-project/project-explorer/app/dashboard/page.tsx)
- **Projects**: [`app/projects/page.tsx`](file:///c:/Users/yashk/Downloads/nextjs-project/nextjs-project/project-explorer/app/projects/page.tsx)
- **Settings**: [`app/settings/page.tsx`](file:///c:/Users/yashk/Downloads/nextjs-project/nextjs-project/project-explorer/app/settings/page.tsx)

### 2. Common Application Layout
- Implemented in [`app/layout.tsx`](file:///c:/Users/yashk/Downloads/nextjs-project/nextjs-project/project-explorer/app/layout.tsx).
- Renders the common [`app/Navbar.tsx`](file:///c:/Users/yashk/Downloads/nextjs-project/nextjs-project/project-explorer/app/Navbar.tsx) containing navigation links (`/`, `/about`, `/dashboard`, `/projects`, `/settings`).
- The navbar stays persistent across client transitions without re-mounting.

### 3. Dashboard Experience & Sub-pages
- **Dedicated Layout**: [`app/dashboard/layout.tsx`](file:///c:/Users/yashk/Downloads/nextjs-project/nextjs-project/project-explorer/app/dashboard/layout.tsx) applies only to dashboard sub-routes.
- **Sidebar**: [`app/dashboard/Sidebar.tsx`](file:///c:/Users/yashk/Downloads/nextjs-project/nextjs-project/project-explorer/app/dashboard/Sidebar.tsx) with styling in `sidebar.css`.
- **Sub-pages**:
  - `/dashboard/analytics` -> [`app/dashboard/analytics/page.tsx`](file:///c:/Users/yashk/Downloads/nextjs-project/nextjs-project/project-explorer/app/dashboard/analytics/page.tsx)
  - `/dashboard/teams` -> [`app/dashboard/teams/page.tsx`](file:///c:/Users/yashk/Downloads/nextjs-project/nextjs-project/project-explorer/app/dashboard/teams/page.tsx)
  - `/dashboard/reports` -> [`app/dashboard/reports/page.tsx`](file:///c:/Users/yashk/Downloads/nextjs-project/nextjs-project/project-explorer/app/dashboard/reports/page.tsx)

### 4. Projects Module (Dynamic & Nested Routes)
- **Projects List**: [`app/projects/page.tsx`](file:///c:/Users/yashk/Downloads/nextjs-project/nextjs-project/project-explorer/app/projects/page.tsx)
- **Dynamic Route**: [`app/projects/[projectId]/page.tsx`](file:///c:/Users/yashk/Downloads/nextjs-project/nextjs-project/project-explorer/app/projects/%5BprojectId%5D/page.tsx) dynamically parses `params.projectId` to load the corresponding project.
- **Nested Routes**:
  - `/projects/[projectId]/overview` -> [`overview/page.tsx`](file:///c:/Users/yashk/Downloads/nextjs-project/nextjs-project/project-explorer/app/projects/%5BprojectId%5D/overview/page.tsx)
  - `/projects/[projectId]/team` -> [`team/page.tsx`](file:///c:/Users/yashk/Downloads/nextjs-project/nextjs-project/project-explorer/app/projects/%5BprojectId%5D/team/page.tsx)
  - `/projects/[projectId]/tasks` -> [`tasks/page.tsx`](file:///c:/Users/yashk/Downloads/nextjs-project/nextjs-project/project-explorer/app/projects/%5BprojectId%5D/tasks/page.tsx)

### 5. Catch-All Route
- Implemented in [`app/projects/[projectId]/[...projectDetails]/page.tsx`](file:///c:/Users/yashk/Downloads/nextjs-project/nextjs-project/project-explorer/app/projects/%5BprojectId%5D/%5B...projectDetails%5D/page.tsx).
- Captures deep documentation and arbitrary nested paths such as `/projects/1/docs/setup/database`.
- Reads `params.projectDetails` (an array of slugs) and prints out the exact path requested by the user.

### 6. Search & Filtering with URL Query Parameters
- Controlled via URL search parameters:
  - `/projects?search=cloud`
  - `/projects?status=active`
  - `/projects?search=ai&status=active`
- **Filter Component**: [`ProjectFilters.tsx`](file:///c:/Users/yashk/Downloads/nextjs-project/nextjs-project/project-explorer/app/projects/ProjectFilters.tsx) (`"use client"`) updates the URL search params using `useRouter()` and `useSearchParams()`.
- **Server-Side Filtering**: [`ProjectsContent.tsx`](file:///c:/Users/yashk/Downloads/nextjs-project/nextjs-project/project-explorer/app/projects/ProjectsContent.tsx) parses the resolved `searchParams` promise, filters projects via `getFilteredProjects()` in [`lib/projects.ts`](file:///c:/Users/yashk/Downloads/nextjs-project/nextjs-project/project-explorer/lib/projects.ts), and streams the matching projects.

### 7. Loading Experience & Suspense Streaming
- **Route-level Loading**: [`app/projects/[projectId]/loading.tsx`](file:///c:/Users/yashk/Downloads/nextjs-project/nextjs-project/project-explorer/app/projects/%5BprojectId%5D/loading.tsx) displays an immediate visual state while the simulated 2-second delay in [`[projectId]/page.tsx`](file:///c:/Users/yashk/Downloads/nextjs-project/nextjs-project/project-explorer/app/projects/%5BprojectId%5D/page.tsx) resolves.
- **Component Streaming (Suspense)**: [`app/projects/page.tsx`](file:///c:/Users/yashk/Downloads/nextjs-project/nextjs-project/project-explorer/app/projects/page.tsx) wraps `<ProjectsContent />` inside a `<Suspense fallback={<p>Loading projects...</p>}>` boundary. The header and layout render instantly without blocking on data retrieval.

### 8. Error Handling & Retry Boundaries
- **Projects List Error Boundary**: [`app/projects/error.tsx`](file:///c:/Users/yashk/Downloads/nextjs-project/nextjs-project/project-explorer/app/projects/error.tsx)
- **Project Detail Error Boundary**: [`app/projects/[projectId]/error.tsx`](file:///c:/Users/yashk/Downloads/nextjs-project/nextjs-project/project-explorer/app/projects/%5BprojectId%5D/error.tsx)
- Both use `"use client"` and accept `{ error, reset }` props:
  - If a data fetch fails, a friendly error screen is presented.
  - The **Retry** button invokes `reset()` to attempt re-rendering the route segment without a full page reload.
  - The outer navigation bar and root layout continue to function normally.

### 9. Client-Side Interactivity
- **`ProjectFilters`**: Interactive real-time search box and status dropdown that modifies URL parameters upon user input.
- **`BackButton`**: Interactive client button using Next.js `useRouter().back()` to return users to the previous screen.
- **Interactive Reset**: Client-side recovery buttons in error boundaries.

### 10. Bonus Challenges Implemented
- **Structured JSON Dataset**: Realistic multi-project dataset located in [`data/projects.json`](file:///c:/Users/yashk/Downloads/nextjs-project/nextjs-project/project-explorer/data/projects.json).
- **Type-safe Helper Utilities**: Reusable querying functions (`getProjects`, `getProjectById`, `getFilteredProjects`, `getAllStatuses`) with TypeScript typings in [`lib/projects.ts`](file:///c:/Users/yashk/Downloads/nextjs-project/nextjs-project/project-explorer/lib/projects.ts) and [`types/project.ts`](file:///c:/Users/yashk/Downloads/nextjs-project/nextjs-project/project-explorer/types/project.ts).
- **Graceful Not-Found Handling**: Clear "Project not found" message displayed when an invalid ID is requested.
- **Extra Dashboard Sub-routes**: Analytics, Teams, and Reports sections under the dashboard layout.
- **Multi-criteria Filtering**: Support for concurrent search queries and status dropdown filters with automatic capitalization and formatted tags.

---

## Getting Started (Running Locally)

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to explore the portal.

### 3. Build for Production
```bash
npm run build
npm run start
```
