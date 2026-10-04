# Setup guide

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env` and provide valid environment values.
3. Run `npm run db:generate`.
4. Run `npm run db:push`.
5. Run `npm run db:seed`.
6. Start the API with `npm run api:dev`.
7. Start the web app with `npm run web:dev`.

Production use requires valid Clerk and Resend credentials in application environment variables.

## Deploy the web app to Cloudflare Workers

The SvelteKit app is in the `apps/web` workspace and uses the Cloudflare adapter. In Cloudflare Builds, keep the repository root as the root directory, use `npm run build` as the build command, and use the following deploy command so Wrangler runs from the web workspace:

```bash
npm --workspace apps/web run deploy
```

The API in `apps/api` is a separate service and is not included in this Worker deployment.
