<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project

Next.js 16 App Router client for PizzaHub. Backend is separate Express/MongoDB service in sibling `../server` (own git repo) on port 5000; this repo tracks only the client.

## Commands

- Dev: start backend first `cd ../server && node index.js`, then `npm run dev` (client :3000). Backend has no npm scripts (ESM; run with node). Requires both .env files.
- Lint: `npm run lint`. Typecheck: `npx tsc --noEmit`. Build: `npm run build`. Prod start: `npm run start`.
- No test suite or test scripts exist.

## Environment

- `.env` gitignored but required locally. Keys: NEXT_PUBLIC_API_URL, NEXT_PUBLIC_IMGBB, BETTER_AUTH_SECRET, BETTER_AUTH_URL, MONGODB_URI, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET.
- Server `../server/.env`: MONGODB_URI, CLIENT_URL.
- Client auth and backend share MongoDB database `pizzahub` (Atlas). Auth via better-auth; app data in `usersvendor`.

## Architecture

- Path alias `@/*` -> `./src/*`. shadcn base-nova UI in `src/components/ui`; globals in `src/app/globals.css`.
- Auth: better-auth with mongo adapter, email/password + Google; user has role field admin/user/vendor. Client `src/lib/auth-client.ts`; handler `src/app/api/auth/[...all]/route.ts`.
- Data flow: vendor menu items upload image to ImgBB, then POST JSON to backend `/usersvendor`; reads from same endpoint. New items start Pending until admin approval.
- Images: uploads via ImgBB; next.config remotePatterns hostname `***`; many img/unoptimized next/image usages.

## Quirks

- Baseline `npm run lint` is not clean (react-hooks rules, JSX-in-try, img warnings); typecheck is clean. Do not chase lint unless asked.
- React Compiler enabled; Turbopack handles CSS via @tailwindcss/turbopack rule in next.config.ts.
- `.env*` gitignored; never commit secrets. `.next/` ignored.
