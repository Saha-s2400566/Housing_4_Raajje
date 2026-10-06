# Housing_4_Raajje

Housing_4_Raajje is a multi-branch property management platform for Malé, Hulhumalé, and Villingili built as a university final-year project.

## Stack

- Frontend: SvelteKit (Svelte 5) + TypeScript
- Backend: Node.js + Express + TypeScript
- Database: SQLite via Prisma
- Auth: Clerk (with MFA for admin roles)
- Email: Resend
- Validation: custom server-side checks + Zod
- Icons: [Moving Icons](https://www.movingicons.dev/icons) (`@jis3r/icons`, animated Lucide icons for Svelte)
- Fonts: Space Grotesk (headings, figures) and IBM Plex Sans (everything else), from Google Fonts

## Repository structure

- `apps/web` – SvelteKit UI
- `apps/api` – REST API and business logic
- `packages/shared` – shared enums, validation helpers and the API contract (`src/portal.ts`)
- `packages/database` – Prisma schema, migrations and seed data
- `docs` – requirements, architecture, RBAC, API docs and traceability
- `tests` – automated tests
- `PRODUCT.md` – product context: users, purpose, constraints, status vocabulary
- `apps/web/DESIGN.md` – the design system: colours, type, components, rules

## Quick start

1. Install dependencies
   ```bash
   npm install
   ```
2. Copy environment variables
   ```bash
   cp .env.example .env
   ```
3. Generate Prisma client and initialize SQLite database
   ```bash
   npm run db:generate
   npm run db:push
   npm run db:seed
   ```
4. Start the API and web app
   ```bash
   npm run api:dev
   npm run web:dev
   ```

The web app runs at `http://localhost:5173` and forwards `/api` requests to the API on port 4000.

## Testing

```bash
npm test
```

## Database

SQLite lives at `packages/database/prisma/dev.db` (git-ignored). `DATABASE_URL="file:./dev.db"` is resolved relative to the Prisma schema folder. `npm run db:seed` wipes the database and reloads the demo data. That gives every account a new ID, so anyone already signed in has to sign in again.

The seed holds the three branches, 8 staff, 4 owners, clients, 15 properties (2 awaiting verification), 5 leases with their rent payments, viewings with feedback, maintenance requests, message threads, notifications, inquiries and audit entries. All of it is fictional demo data.

`packages/database/prisma/prisma/dev.db` is an older copy that nothing uses.

## Demo accounts

Clerk is not configured in local development, so seeded accounts sign in by email without a password. The sign-in page lists them. The two-step verification step accepts any six digits in this mode, and the screen says so.

| Role | Email |
| --- | --- |
| Client | `client@housing-4-raajje.test` |
| Owner | `owner@housing-4-raajje.test` |
| System administrator | `shiham.ali@housing-4-raajje.test` |
| Branch manager | `hassan.zameel@housing-4-raajje.test` |
| Property specialist | `ahmed.afzal@housing-4-raajje.test` |
| Receptionist | `mariyam.leena@housing-4-raajje.test` |

## What the web app covers

| Area | Route | Pages |
| --- | --- | --- |
| Public | `/`, `/homes/[id]` | Apartment search with filters and sort; apartment detail |
| Sign-in | `/login` | Client, Owner and Staff tabs; account creation; verification code |
| Client portal | `/client` | Find a home, apartment detail (apply, request a viewing), My lease (sign, pay rent), Messages, Maintenance, Profile |
| Owner portal | `/owner` | Dashboard, My properties (register an apartment), Availability, Earnings, Profile |
| Staff portal | `/staff` | Overview, plus pages by role (below) |

Staff pages by role:

| Role | Pages |
| --- | --- |
| Property specialist | Verification queue, Viewings, Matchmaker, Lease execution |
| Receptionist | Inquiries, Viewings |
| Branch manager | Branch reports, Verification queue, Viewings, Lease execution |
| System administrator | Staff accounts, Audit log, Branch reports, Verification queue |

Staff see only their own branch; administrators can switch branch. The API enforces both. Every change is written to the audit log.

The old routes redirect: `/dashboard` → `/staff`, `/properties` → `/`, `/applications` → `/staff/queue`, `/branches` → `/staff/reports`, `/list-property` → owner sign-in.

## API

The new role-scoped routes are `/api/client/*`, `/api/owner/*` and `/api/staff/*`. Auth routes are `/api/auth/demo-accounts`, `/api/auth/demo-login` and `/api/auth/register`. Public listing search is `/api/properties`. See `docs/api.md` for the full list.

Request and response shapes are defined once in `packages/shared/src/portal.ts` and used by both the API and the web app.

Rate limits: 2,000 requests per 15 minutes overall, and 60 per 15 minutes on `/api/auth`.

## Changes in this session (October 2026)

**Product and design records**
- Added `PRODUCT.md`: users, purpose, branches, status vocabulary, and the rule that no invented claims or figures appear in the UI.
- Added `apps/web/DESIGN.md`: the paper-and-teal ledger design system from the Claude Design files, including the rule that icons come only from Moving Icons.

**Web app (`apps/web`)**
- Rebuilt every page from the Claude Design files: Home, Sign In, Client Portal, Owner Portal (Dashboard, My Properties, Availability, Earnings) and Staff Portal.
- Replaced the old template home page and its placeholder copy and figures.
- Owner portal pages follow their design files. A Profile page was kept, and the My properties form also asks for rooms, because search and matching need it.
- Kept the owner dashboard and the staff Overview minimal, and removed extras that weren't in the designs.
- Added animated Moving Icons to every sidebar link, the back arrows, the compliance checklist ticks and the phone menu toggle.
- Wired every page to the API. Pages show loading, empty and error states.
- Made every page work at phone width.
- Raised text and link contrast to meet accessibility minimums.

**API (`apps/api`)**
- Added client, owner and staff routes, with role checks and server-side branch scoping.
- Replaced the fake demo login with one that signs in real seeded users, and added registration for clients and owners.
- Public property search now returns only approved, available listings, with no owner details.
- Added a shared error handler and an audit helper; mutations write to the audit log.
- Notifications are stored in the database, and email is sent through Resend only when a real key is configured.
- Lease rules: a lease becomes active only after both the client and the owner have signed; the property then becomes Rented. Rent is due on the 5th and becomes overdue after that.
- Loosened the global rate limit, which was blocking normal use, and added a tighter one on sign-in.

**Database (`packages/database`)**
- Added optional schema fields:
  - display codes for users (CL-, OWN-, STF-)
  - property address, district, type and reference
  - client sex, date of birth and rooms
  - application term and reference
  - viewing feedback
  - lease reference, term and execution date
  - maintenance category and reference
  - message thread key
  - notification channel
- Added an `Inquiry` model.
- Rewrote the seed with the people, homes and leases from the designs.

## Notes

This project uses Clerk and Resend as required by the assignment specification. In local development, the app can run with a development fallback when the keys are not configured, but production deployments must supply valid Clerk and Resend credentials.
