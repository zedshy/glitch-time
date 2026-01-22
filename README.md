# GLITCH TIME

A luxury cyberpunk ecommerce platform built with Next.js 14, featuring Solana wallet integration for payments.

## Features

- 🎨 **Neon Cyberpunk Design** - Dark theme with cyan and magenta neon accents
- 🛍️ **Product Grid** - Luxury watch collection with hover effects
- 🛒 **Vault Drawer** - Shopping cart with localStorage persistence
- 💰 **Solana Checkout** - Demo checkout flow using Solana Devnet
- ✅ **Success Page** - Transaction confirmation with explorer links
- 🔐 **Admin Dashboard** - Protected orders management page

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui**
- **Solana Web3.js**
- **Zustand** (state management)
- **Radix UI** (drawer, dialog components)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Demo Mode

This project runs in **DEMO MODE** using Solana Devnet:
- Connect Phantom or Solflare wallet
- Transactions use minimal SOL amounts for demonstration
- All transactions are on Devnet (not mainnet)

## Admin Access

- Navigate to `/admin`
- Use token: `demo-admin-token` (set via `ADMIN_TOKEN` env variable)

## Project Structure

```
├── app/
│   ├── api/orders/        # Order API endpoints
│   ├── admin/             # Admin dashboard
│   ├── checkout/          # Checkout page
│   ├── success/           # Success page
│   └── page.tsx           # Homepage
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── hero-video.tsx     # Hero section
│   ├── product-grid.tsx   # Product listing
│   └── vault-drawer.tsx   # Shopping cart
├── store/
│   └── vault-store.ts     # Zustand store
└── data/
    └── products.ts        # Product data
```

## Environment Variables

Create a `.env.local` file:

```env
ADMIN_TOKEN=demo-admin-token
```

## Notes

- Product images use Unsplash placeholders
- Hero video requires `/public/hero-video.mp4` (add your own video)
- Orders are stored in-memory (use a database in production)
- SPL token transfers for USDT would require additional setup

