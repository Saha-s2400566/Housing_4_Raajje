# Housing_4_Raajje

Housing_4_Raajje is a multi-branch property management platform designed for Malé, Hulhumalé, and Villingili. The project was created as a final-year university software engineering solution and implements a realistic property workflow covering registration, applications, viewings, leasing, payments, maintenance, and branch-level administration.

## Overview

The platform supports the full lifecycle of rental operations across multiple business roles:

- System Administrator
- Branch Manager
- Property Specialist
- Receptionist
- Property Owner
- Client / Tenant

The system is structured to enforce role-based access control, branch-aware business rules, and a maintainable multi-layer architecture rather than a static mockup.

## Features

- Multi-branch real-estate management
- Property registration and verification flow
- Client rental application workflow
- Viewing scheduling and feedback management
- Lease creation and signature tracking
- Payment and financial reporting
- Maintenance request tracking
- Rule-based property matching for client preferences
- Audit logging and administrative oversight
- Responsive, modern dashboard interface

## Technology Stack

- Frontend: SvelteKit + TypeScript
- Backend: Node.js + Express + TypeScript
- Database: SQLite with Prisma ORM
- Authentication: Clerk-ready integration
- Notifications: Resend-ready transactional email service
- Validation: Zod and server-side checks
- Testing: Vitest

## Project Structure

```text
housing-4-raajje/
├── apps/
│   ├── api/                # Express REST API and route logic
│   └── web/               # SvelteKit frontend
├── packages/
│   ├── database/          # Prisma schema, migrations, and seed data
│   └── shared/             # Shared enums and reusable logic
├── docs/                  # Architecture and project documentation
├── tests/                 # Automated tests
├── .env.example           # Environment variable template
├── .gitignore
├── package.json
├── README.md
├── vitest.config.ts
└── LICENSE                # optional, add if required by your repo policy
```

## Architecture Summary

The application follows a practical layered design:

- Frontend for dashboards and property workflows
- API for business logic and role enforcement
- Shared package for reusable validation and rules
- Prisma database layer for SQLite persistence
- Documentation for architecture and evaluation support

## Local Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Create environment file

```bash
cp .env.example .env
```

Update the values with your actual environment configuration.

### 3. Generate Prisma client and initialize SQLite database

```bash
npm run db:generate
npm run db:push
npm run db:seed
```

### 4. Start the backend

```bash
npm run api:dev
```

### 5. Start the frontend

```bash
npm run web:dev
```

## Environment Variables

The project expects the following variables in the environment:

```env
PORT=4000
NODE_ENV=development
CLERK_SECRET_KEY=your_secret_key
CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_WEBHOOK_SECRET=your_webhook_secret
DATABASE_URL="file:./dev.db"
RESEND_API_KEY=your_resend_key
APP_URL=http://localhost:5173
PUBLIC_API_BASE=http://localhost:4000/api
```

> Clerk and Resend are required for production deployment, but local development can use placeholder values if needed for testing configuration.

## Testing

Run the automated checks with:

```bash
npm test
```

## Build

```bash
npm run build
```

## Documentation

The project includes supporting documentation for:

- system architecture
- RBAC and authorization design
- API reference
- database schema
- requirement traceability
- setup and deployment flow

See the [docs](docs) directory for the documentation set.

## Notes

This project is designed to be understandable, maintainable, and defendable in a university evaluation setting. It emphasizes separation between frontend, backend, data model, business rules, authorization, and documentation rather than a single monolithic implementation.

## License

This repository is intended for educational use within the final-year project context. Add an appropriate license if required by your institution or GitHub repository policy.
