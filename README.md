# Housing_4_Raajje

Housing_4_Raajje is a multi-branch property management platform for Malé, Hulhumalé, and Villingili built as a university final-year project.

## Stack

- Frontend: SvelteKit + TypeScript
- Backend: Node.js + Express + TypeScript
- Database: SQLite via Prisma
- Auth: Clerk (with MFA for admin roles)
- Email: Resend
- Validation: custom server-side checks + Zod

## Repository structure

- `apps/web` – SvelteKit UI
- `apps/api` – REST API and business logic
- `packages/shared` – shared enums and validation helpers
- `packages/database` – Prisma schema, migrations and seed data
- `docs` – requirements, architecture, RBAC, API docs and traceability
- `tests` – automated tests

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

## Testing

```bash
npm test
```

## Notes

This project uses Clerk and Resend as required by the assignment specification. In local development, the app can run with a development fallback when the keys are not configured, but production deployments must supply valid Clerk and Resend credentials.
