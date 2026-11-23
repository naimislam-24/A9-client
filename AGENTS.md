<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project

Next.js 16 App Router client for PizzaHub. Backend is a separate Express/MongoDB service in sibling `../server` (own git repo) listening on :5000; this repo tracks only the client.

## Commands

- Dev: start backend first — `cd ../server && node index.js` (:5000) — then `npm run dev` (client :3000). Backend has no usable npm scripts (ESM; run with node). Both `.env` files are required.
- Verification: `npm run lint` (eslint flat config), `npx tsc --noEmit`, `npm run build`. No tests, no CI, no formatter.

## Environment

- Client `.env` (gitignored, required): NEXT_PUBLIC_API_URL, NEXT_PUBLIC_IMGBB, BETTER_AUTH_SECRET, BETTER_AUTH_URL, MONGODB_URI, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, STRIPE_SECRET_KEY, NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY.
- Server `../server/.env`: MONGODB_URI, CLIENT_URL, STRIPE_SECRET_KEY (optional: AUTH_JWKS_URL).
- Both sides share Atlas DB `pizzahub`. Collections: better-auth's `user`/`account`/`session`, plus app data in `user` (the same collection the server PATCHes for role/premium), `usersvendor` (menu items), `usersorder`, `payments`.

## Architecture

- Path alias `@/*` -> `./src/*`. shadcn style `base-nova`; Tailwind v4 is CSS-first (no tailwind.config; theme lives in `src/app/globals.css`). `cn` comes from the `cn` npm package, re-exported by `src/lib/utils.ts`.
- Auth: better-auth (mongo adapter, email/password + Google, JWT plugin); user role is `admin | user | vendor`. The UI calls role `user` "customer": sign-up maps "customer" -> role `user`, and customer routes are `/dashboard/customer/*`.
- Route gating lives in `src/proxy.ts` (Next 16's replacement for middleware.ts): redirects to /sign-in when logged out, and its matcher lists paths one by one — add new dashboard routes there. It checks login only, never role; nothing enforces roles server-side.
- Express API: most routes require `Authorization: Bearer <better-auth JWT>` — get it via `getTokenFromClient()` (`src/lib/getTokenFromClient.ts`); the server verifies it against better-auth's JWKS. Public: GET /usersvendor, GET /usersvendor/approved, POST /payments/checkout-verify.
- Menu flow: addmenu uploads the image to ImgBB, then POSTs JSON to `${NEXT_PUBLIC_API_URL}/usersvendor` with the Bearer token; the server enforces the free-plan limit (3 items) and starts new items at `approvalStatus: "Pending"` until an admin approves. Public reads use GET /usersvendor/approved.
- Stripe checkout: `src/app/api/checkout_sessions/route.ts` creates the session (hardcoded price ID) -> `(dashboard)/success` page -> server action `checkoutVerify` (`src/lib/actions/Payments.ts`) -> backend POST /payments/checkout-verify sets `premium: true`.
- Images: `next.config.ts` remotePatterns hostname is the literal `***`, so no real remote hosts are allowed — existing code uses plain `<img>` or `unoptimized`.

## Quirks

- Lint baseline is not clean: 3 errors (`react-hooks/set-state-in-effect` in `(dashboard)/dashboard/vendor/subscription/page.tsx`, `ui/carousel.tsx`, `hooks/use-mobile.ts`) plus ~21 warnings (mostly no-img-element, no-unused-vars). Do not chase lint unless asked.
- Typecheck is clean except current Stripe WIP: `src/app/api/checkout_sessions/route.ts` has 1 error (`metadata.userId` is `string | undefined`).
- The server verifies JWTs against the client's JWKS at `http://localhost:3000/api/auth/jwks` (override with AUTH_JWKS_URL) — the client must run on port 3000 or every authenticated backend call fails.
- React Compiler is enabled; Turbopack serves CSS via the `@tailwindcss/turbopack` rule in next.config.ts.
- `.env*` gitignored; never commit secrets. `.next/` and `tsconfig.tsbuildinfo` ignored.
