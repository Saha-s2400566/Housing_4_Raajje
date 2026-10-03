# Setup guide

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env` and provide valid environment values.
3. Run `npm run db:generate`.
4. Run `npm run db:push`.
5. Run `npm run db:seed`.
6. Start the API with `npm run api:dev`.
7. Start the web app with `npm run web:dev`.

Production use requires valid Clerk and Resend credentials in application environment variables.
