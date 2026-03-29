# Glitch Time

A **demo ecommerce storefront** with a cyberpunk-style UI, built as a learning project. It uses **Next.js 14 (App Router)**, **React**, **TypeScript**, and **Solana Devnet** so you can practice wallet connection and a simplified checkout flow—without real money on mainnet.

---

## Who this is for

This repo is meant for **students and beginners** who want to see how a modern web app combines:

- A marketing-style landing page and product catalog  
- Client-side cart state (with persistence)  
- API routes for orders  
- Optional **Solana** wallet UX on **Devnet** only  

Treat it as a **tutorial codebase**: read the structure, run it locally, then try the extension ideas at the end.

---

## Table of contents

1. [Features](#features)  
2. [What you can learn](#what-you-can-learn)  
3. [Prerequisites](#prerequisites)  
4. [Quick start](#quick-start)  
5. [Using the demo](#using-the-demo)  
6. [Routes and pages](#routes-and-pages)  
7. [Project structure](#project-structure)  
8. [Important files](#important-files)  
9. [Environment variables](#environment-variables)  
10. [Media assets (images & video)](#media-assets-images--video)  
11. [Limitations (read before presenting)](#limitations-read-before-presenting)  
12. [Ideas for assignments](#ideas-for-assignments)  
13. [Troubleshooting](#troubleshooting)  
14. [Tech stack](#tech-stack)  

---

## Features

- **Homepage** — Hero video area, product grid, about/support sections, ambient video section  
- **Vault (cart)** — Slide-out drawer; cart state managed with **Zustand** and persisted locally  
- **Checkout** — Customer details (including country-specific fields), **Solana Devnet** payment demo  
- **Order API** — `POST` to create orders, `GET` to list orders (admin token required)  
- **Admin page** — Enter your admin token to view orders (demo auth only)  
- **Success page** — Shown after checkout with transaction context  

---

## What you can learn

| Topic | Where to look |
|--------|----------------|
| App Router pages | `app/page.tsx`, `app/checkout/page.tsx`, `app/success/page.tsx`, `app/admin/page.tsx` |
| API routes | `app/api/orders/route.ts`, `app/api/orders/[id]/route.ts` |
| Global client providers (Solana) | `components/providers.tsx` |
| Cart / global state | `store/vault-store.ts` |
| Reusable UI (shadcn-style) | `components/ui/` |
| Static product data | `data/products.ts`, `types/product.ts` |

---

## Prerequisites

- **Node.js** 18+ (LTS recommended)  
- **npm** (comes with Node)  
- A **Solana Devnet** wallet (e.g. [Phantom](https://phantom.app/) or [Solflare](https://solflare.com/)) if you want to try payments—get free Devnet SOL from a [faucet](https://faucet.solana.com/)  

---

## Quick start

### 1. Clone and install

```bash
git clone https://github.com/zedshy/glitch-time.git
cd glitch-time
npm install
```

### 2. Environment file

Create `.env.local` in the project root (same folder as `package.json`):

```env
ADMIN_TOKEN=demo-admin-token
```

You can change `ADMIN_TOKEN` to any secret string; use the **same value** when logging into `/admin`.

Optional (for future use if you wire it up):

```env
NEXT_PUBLIC_PAYMENT_MODE=demo
```

### 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 4. Production build (optional check)

```bash
npm run build
npm start
```

---

## Using the demo

1. Browse products on the homepage and add items to the **vault** (cart).  
2. Open checkout from the cart.  
3. Fill in shipping/customer fields.  
4. Connect a **Devnet** wallet when prompted and complete the demo flow.  
5. **Admin:** go to `/admin`, paste your `ADMIN_TOKEN` value, and load orders.  

**Important:** The app is configured for **Solana Devnet** in `components/providers.tsx`. Do not expect mainnet behavior without changing the network and related logic.

---

## Routes and pages

| Path | Purpose |
|------|---------|
| `/` | Landing page, catalog, vault drawer |
| `/checkout` | Checkout + wallet payment demo |
| `/success` | Post-checkout confirmation |
| `/admin` | List orders (Bearer token) |
| `POST /api/orders` | Create an order (used by checkout flow) |
| `GET /api/orders` | List orders — requires `Authorization: Bearer <ADMIN_TOKEN>` |
| `GET/PATCH /api/orders/[id]` | Single order read/update (see route file) |

---

## Project structure

```
├── app/
│   ├── api/orders/           # Order REST handlers
│   ├── admin/                # Admin UI
│   ├── checkout/             # Checkout page
│   ├── success/              # Success page
│   ├── layout.tsx            # Root layout, fonts, providers
│   └── page.tsx              # Homepage
├── components/
│   ├── ui/                   # Buttons, cards, drawer, select, etc.
│   ├── navbar.tsx, footer.tsx
│   ├── product-grid.tsx, product-card.tsx
│   ├── vault-drawer.tsx    # Cart UI
│   ├── hero-video.tsx
│   └── providers.tsx       # Solana wallet providers (Devnet)
├── store/
│   └── vault-store.ts      # Zustand cart store
├── data/
│   └── products.ts         # Product catalog (demo data)
├── types/
│   └── product.ts
├── lib/
│   └── utils.ts
└── public/
    └── media/              # Add your images/videos here (see below)
```

---

## Important files

- **`components/providers.tsx`** — Sets **Devnet** RPC and wallet adapters (Phantom, Solflare).  
- **`store/vault-store.ts`** — Cart logic; good example of small global state.  
- **`app/api/orders/route.ts`** — Orders stored **in memory** for the demo (resets when the server restarts).  
- **`app/checkout/page.tsx`** — Form + Solana transaction demo; largest student-facing page.  

---

## Environment variables

| Variable | Required | Purpose |
|----------|----------|---------|
| `ADMIN_TOKEN` | Recommended | Secret for `GET /api/orders` and the `/admin` UI. Defaults to `demo-admin-token` in code if unset—setting it explicitly is better for learning real config patterns. |
| `NEXT_PUBLIC_PAYMENT_MODE` | Optional | Reserved for client-side demo flags (see `components/footer.tsx`). |

Never commit real secrets. Keep `.env.local` out of git (Next.js ignores it by default).

---

## Media assets (images & video)

The `public/` folder is mostly empty in git so the repo stays small. The app expects media under **`public/media/`**:

| Asset | Path used in code |
|-------|-------------------|
| Hero background video | `public/media/video/hero.mp4` |
| Ambient section video | `public/media/video/ambient-loop.mp4` |
| Marketing fallback image | `public/media/images/marketing.png` |
| Product images | `public/media/images/watch-1.png` … (see `data/products.ts`) |

If a file is missing, the hero video hides on error; you can add your own MP4s and PNGs to match those paths or update `data/products.ts` to point to new filenames.

---

## Limitations (read before presenting)

- **Orders** live in **server memory**—they disappear when the dev server restarts.  
- **Admin auth** is a single shared token, not a full user system.  
- **Payments** are a **learning demo** on **Devnet**, not production-ready payment processing.  
- **Product data** is static TypeScript, not a database.  

These choices keep the project easy to run in a classroom or self-study setting.

---

## Ideas for assignments

- Replace in-memory orders with **SQLite**, **Supabase**, or **MongoDB**.  
- Add **form validation** (e.g. Zod) on checkout and show clear error messages.  
- Implement **real inventory** (stock counts) and disable checkout when out of stock.  
- Add **tests** (Playwright for checkout, Vitest for store/API helpers).  
- Document **API** request/response shapes in a small `docs/api.md` (you author it).  
- **Accessibility** audit: keyboard nav, focus states, `aria` on the drawer and select.  

---

## Troubleshooting

| Problem | What to try |
|---------|-------------|
| `npm install` fails | Use Node 18+; delete `node_modules` and `package-lock.json` only if your instructor agrees, then reinstall. |
| Wallet will not connect | Confirm the wallet network is **Devnet**; try another browser or disable conflicting extensions. |
| No Devnet SOL | Use an official Devnet faucet; amounts are small and free for testing. |
| `/admin` says unauthorized | `Authorization` header must be exactly `Bearer ` + your `ADMIN_TOKEN` from `.env.local`. Restart dev server after changing env vars. |
| Broken images or video | Add files under `public/media/...` or update paths in `data/products.ts` / components. |
| Build errors | Run `npm run lint` and fix TypeScript issues; ensure no edits removed required imports. |

---

## Tech stack

- **Next.js 14** (App Router)  
- **TypeScript**  
- **Tailwind CSS**  
- **shadcn-style UI** (Radix primitives, `class-variance-authority`, `tailwind-merge`)  
- **Zustand** (cart)  
- **Solana** — `@solana/web3.js`, wallet adapter (Devnet)  

---

## License

No license file is included in this repository. If you fork for coursework, follow your school’s rules for attribution and sharing.
