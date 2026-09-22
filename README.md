# WorkForce Manpower Consultancy

A modern, full-stack manpower consultancy and recruitment platform built with React, TypeScript, Vite, Express, Supabase, and Gemini AI.

The project provides a complete digital workflow for **job seekers, employers, recruiters, and administrators** — from job discovery and candidate registration to applications, employer enquiries, recruitment management, and an ATS-style admin dashboard.

> **Repository:** https://github.com/dadicharan/Man-Power-Consultancy

---

## Overview

WorkForce Manpower Consultancy is designed as a professional recruitment portal inspired by modern manpower consultancy workflows.

The platform includes:

- Corporate manpower consultancy website
- Job search and vacancy marketplace
- Candidate/job-seeker registration
- Candidate portal
- Employer portal
- Employer enquiry workflow
- Job application workflow
- Recruitment/ATS-style application tracking
- Admin dashboard
- Candidate and employer management
- Services and content management
- Notifications
- Reports and analytics
- Supabase-powered data persistence
- Gemini AI integration
- Responsive UI for desktop, tablet, and mobile

---

## Key Features

### Public Website

- Premium navy/orange corporate design
- Responsive navigation and footer
- Home page with hero section, statistics, services, featured jobs, industries, testimonials, and CTAs
- About Us page
- Services listing and service details
- Jobs / Vacancies page
- Job detail pages
- Job Seekers / Candidates page
- Employers page
- Employer Enquiry page
- Contact page
- Terms & Privacy page

### Job Marketplace

- Search jobs by keyword
- Filter by location, category, experience, employment type, and other criteria
- Featured jobs
- Job detail view
- Apply Now workflow
- Candidate application submission
- Application status tracking

### Candidate Experience

- Candidate registration
- Candidate login/authentication
- Candidate portal
- Profile management
- Resume upload
- Profile photo upload
- Application history
- Application status
- Saved jobs
- Candidate notifications

### Employer Experience

- Employer registration/login
- Employer profile
- Employer enquiries
- Job posting workflow
- Posted jobs management
- Applications received
- Candidate/application review

### Admin Panel

The admin panel provides recruitment-management functionality including:

- Dashboard
- Candidates
- Jobs
- Applications
- Employers
- Employer enquiries
- Services
- Testimonials
- Content/pages
- Notifications
- Reports
- User management
- Settings
- Audit-oriented management workflows

The dashboard includes recruitment metrics, charts, tables, recent activity, and management actions.

---

## Recruitment Workflow

The application is designed around a practical recruitment pipeline:

`Applied → Screening → Shortlisted → Interview → Selected → Joined`

Administrators/recruiters can manage candidates and applications through this workflow.

Application data is designed to support:

- Candidate
- Job
- Employer
- Resume
- Cover letter
- Current status/stage
- Recruiter
- Notes
- Status history
- Interview information

---

## Technology Stack

### Frontend

- React 19
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Lucide React
- Motion
- Recharts
- XLSX

### Backend

- Node.js
- Express
- TypeScript / TSX
- esbuild

### Database & Authentication

- Supabase
- PostgreSQL
- Supabase Auth
- Supabase Storage
- Supabase Row Level Security (RLS)

### AI

- Google Gemini API via `@google/genai`

---

## Project Structure

```text
Man-Power-Consultancy/
├── backend/
│   ├── routes/
│   │   └── api.ts
│   ├── services/
│   │   └── storage.ts
│   ├── server.ts
│   └── types.ts
│
├── src/
│   ├── components/
│   │   ├── common/
│   │   ├── jobs/
│   │   └── layout/
│   ├── context/
│   ├── data/
│   │   └── seedData.ts
│   ├── lib/
│   │   ├── excelExport.ts
│   │   └── supabase.ts
│   ├── pages/
│   │   ├── AboutPage.tsx
│   │   ├── AdminDashboardPage.tsx
│   │   ├── CandidatePortalPage.tsx
│   │   ├── CandidateRegistrationPage.tsx
│   │   ├── ContactPage.tsx
│   │   ├── EmployerEnquiryPage.tsx
│   │   ├── EmployersPage.tsx
│   │   ├── HomePage.tsx
│   │   ├── JobDetailPage.tsx
│   │   ├── JobSeekersPage.tsx
│   │   ├── JobsPage.tsx
│   │   ├── ServiceDetailPage.tsx
│   │   ├── ServicesPage.tsx
│   │   └── TermsPrivacyPage.tsx
│   ├── services/
│   │   └── apiClient.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── types.ts
│
├── public/
├── .env.example
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## Core Pages

| Page | Purpose |
|---|---|
| Home | Company overview, services, jobs, statistics, CTAs |
| About | Company story, mission, vision, values |
| Services | Recruitment and manpower services |
| Service Details | Individual service information |
| Jobs | Search and filter vacancies |
| Job Details | Job description and application |
| Job Seekers | Candidate-focused recruitment experience |
| Candidate Registration | Candidate profile and resume submission |
| Candidate Portal | Profile and application management |
| Employers | Employer recruitment solutions |
| Employer Enquiry | Hiring/manpower requirement submission |
| Contact | Contact details and enquiry form |
| Admin Dashboard | Recruitment and platform administration |

---

## Environment Variables

Create a local `.env.local` file based on `.env.example`.

Example:

```env
GEMINI_API_KEY=your_gemini_api_key
APP_URL=http://localhost:3000

VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_publishable_or_anon_key
```

### Notes

- Never commit real secrets to GitHub.
- Keep private/server-only credentials on the server.
- Use Supabase RLS to control access to application data.
- The Gemini API key is required only for features that use Gemini.

---

## Supabase Setup

1. Create a project in Supabase.
2. Copy the project URL and public client key.
3. Add them to `.env.local`.
4. Configure Supabase Auth.
5. Create the required application tables and relationships.
6. Enable Row Level Security on user/application-sensitive tables.
7. Create Storage buckets for resumes, profile images, and other media.
8. Configure access policies for private candidate documents.

Recommended data domains include:

- Users / Profiles
- Candidates
- Candidate education
- Candidate experience
- Employers
- Jobs
- Applications
- Application status history
- Saved jobs
- Interviews
- Notifications
- Employer enquiries
- Contact messages
- Services
- Testimonials
- Media
- Audit logs

---

## Local Development

### Prerequisites

- Node.js 18+ recommended
- npm
- A Supabase project
- Gemini API key for AI functionality

### Install dependencies

```bash
npm install
```

### Configure environment

Create:

```text
.env.local
```

and add the required values.

### Start development server

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

---

## Available Scripts

```bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm start

# Vite preview
npm run preview

# TypeScript check
npm run lint

# Clean generated output
npm run clean
```

---

## AI Integration

Gemini is integrated through:

```text
@google/genai
```

The AI layer can be extended for features such as:

- Candidate profile assistance
- Job description generation
- Recruitment content generation
- Resume/profile enhancement
- Intelligent candidate-job matching
- Recruitment assistant workflows

AI features should always validate inputs and avoid exposing secret API credentials to the browser.

---

## Security

The project should be deployed with the following security practices:

- Supabase Authentication for user identity
- Row Level Security for database access
- Role-based authorization
- Protected admin routes
- Server-side validation for sensitive operations
- Secure file upload validation
- Private storage for candidate documents
- Signed URLs for protected resumes/files
- Environment variables for secrets
- No private keys committed to source control

---

## User Roles

The application is structured to support:

- Candidate
- Employer
- Recruiter
- HR Manager
- Admin
- Super Admin

Each role can be given different access levels according to business requirements.

---

## Admin Dashboard

The admin dashboard is designed around recruitment operations.

### Main areas

- Dashboard
- Candidate management
- Job management
- Application management
- Employer management
- Enquiries
- Services
- Testimonials
- Notifications
- Reports
- Users
- Settings
- Audit logs

### Recruitment metrics

The dashboard can track:

- Total candidates
- Active jobs
- Employer enquiries
- Applications
- Interviews
- Shortlisted candidates
- Selected candidates
- Joined candidates
- Hiring trends
- Job category trends
- Application trends

---

## UI / UX

The UI is based on a professional manpower consultancy visual system:

- Deep navy corporate theme
- Orange CTA accents
- White content surfaces
- Clean cards
- Professional typography
- Recruitment imagery
- Responsive layouts
- Accessible form controls
- Dashboard tables and data cards
- Subtle motion and transitions

The design was developed using external manpower-consultancy references for **information architecture and visual direction**, while the implementation and branding remain original.

---

## Responsive Design

The application is designed for:

- Desktop
- Laptop
- Tablet
- Mobile

Responsive behavior includes:

- Mobile navigation
- Stacked forms
- Responsive job cards
- Responsive dashboard tables
- Mobile-friendly candidate/employer workflows
- Adaptive layouts for admin screens

---

## Data Export

The project contains XLSX export utilities for admin/recruitment workflows.

This can be extended to export:

- Candidate lists
- Job lists
- Applications
- Employer records
- Enquiries
- Reports

---

## Deployment

The application can be deployed to platforms such as **Vercel** or another Node-compatible hosting environment.

Before deployment:

1. Configure production environment variables.
2. Configure Supabase production project.
3. Verify Auth redirect URLs.
4. Verify Storage policies.
5. Verify Row Level Security.
6. Run a production build.
7. Test all public and protected routes.
8. Test candidate registration and job application flow.
9. Test employer workflows.
10. Verify admin authorization.

---

## Production Checklist

Before going live, verify:

- [ ] Production Supabase project configured
- [ ] Auth email settings configured
- [ ] RLS policies reviewed
- [ ] Storage policies reviewed
- [ ] Resume uploads tested
- [ ] Candidate registration tested
- [ ] Employer enquiry tested
- [ ] Job creation tested
- [ ] Job approval workflow tested
- [ ] Job application tested
- [ ] Application status workflow tested
- [ ] Admin authorization tested
- [ ] Environment variables configured
- [ ] Gemini API key configured where required
- [ ] SEO metadata reviewed
- [ ] Mobile layout reviewed
- [ ] 404/error states tested
- [ ] Production build tested

---

## Inspiration & References

The project was designed with reference to modern workforce/manpower consultancy websites and the supplied UI/UX reference material.

References used for product and UX direction include:

- Inspiration Manpower — https://www.inspirationmanpower.co.in/
- All4You Workforce — https://all4youworkforce.eu/
- Supplied manpower consultancy UI/UX reference

These references are used for **design inspiration, business workflow understanding, and information architecture**. The application code, components, data model, and branding are developed as an original implementation.

---

## Project Status

The repository currently contains a working application structure with:

- React frontend
- Express backend
- Supabase integration
- Candidate pages
- Employer pages
- Job marketplace
- Job detail and application components
- Candidate portal
- Admin dashboard
- Seed/demo data
- Excel export utility
- Gemini integration
- Responsive UI components

Further production work may include:

- Complete production Supabase schema
- Final RLS policies
- Full email notification system
- Advanced recruiter ATS workflow
- Interview scheduling
- Production analytics
- Media management
- Enhanced role/permission administration
- Production deployment configuration

---

## Contributing

1. Fork the repository.
2. Create a feature branch:

```bash
git checkout -b feature/your-feature
```

3. Make your changes.
4. Run type checks and build:

```bash
npm run lint
npm run build
```

5. Commit your changes:

```bash
git commit -m "feat: add your feature"
```

6. Push the branch and open a Pull Request.

---

## License

Add the project's chosen license before distributing the application publicly.

---

## Author

**Dadi Charan**

GitHub: https://github.com/dadicharan

Repository: https://github.com/dadicharan/Man-Power-Consultancy
