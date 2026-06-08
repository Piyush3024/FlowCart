# FlowCart

Live: [flowcart.vercel.app](https://flowcart.vercel.app)  
Dashboard: [flowcart.vercel.app/dashboard](https://flowcart.vercel.app/dashboard)

---

## Setup

```bash
# Clone
git clone https://github.com/Piyush3024/FlowCart.git
cd flowcart

# Install
pnpm install

# Dev server
pnpm dev
```

Open [localhost:3000](http://localhost:3000)

> Requires Node.js 20+ and pnpm 10+

---

## Stack

| Tool                    | Purpose                     |
| ----------------------- | --------------------------- |
| Next.js 16 + TypeScript | App framework, strict types |
| Tailwind CSS v4         | Utility styling             |
| GSAP + `@gsap/react`    | Animations                  |
| TanStack Query v5       | Async data fetching         |
| Zustand v5              | Client state                |
| shadcn/ui (Nova)        | Component library           |
| Recharts                | Dashboard charts            |
| Sonner                  | Toast notifications         |
| next-themes             | Dark/light mode             |

---

## GSAP Usage

All GSAP is centralized through `src/lib/gsap.ts` — plugins registered once, exported everywhere. `useGSAP()` from `@gsap/react` replaces `useEffect` for all animation logic, ensuring correct React 18 Strict Mode behavior and automatic cleanup.

| Component                  | Animation                                                     |
| -------------------------- | ------------------------------------------------------------- |
| `navbar.tsx`               | Entrance stagger on mount, animated mobile menu               |
| `hero-section.tsx`         | Timeline stagger — eyebrow → headline → subtext → CTA → image |
| `promo-banner.tsx`         | Infinite marquee via `xPercent`, speed-up on scroll           |
| `product-card.tsx`         | Hover scale + overlay + action reveal                         |
| `product-grid.tsx`         | Scroll-triggered reveal with stagger                          |
| `categories-section.tsx`   | Scroll-triggered scale entrance                               |
| `testimonials-section.tsx` | Scroll-triggered stagger                                      |
| `faq-section.tsx`          | Scroll-triggered stagger per item                             |
| `footer.tsx`               | Scroll-triggered fade                                         |
| `cart-drawer.tsx`          | Slide-in/out with overlay fade                                |
| `quick-view-modal.tsx`     | Scale + fade entrance/exit                                    |
| `dashboard-shell.tsx`      | Staggered section entrance                                    |

All animations respect `prefers-reduced-motion` via `useReducedMotion()` hook.

---

## TanStack Query

Simulated async fetching with realistic delays to demonstrate loading states, skeleton UI, and caching.

| Hook                    | Source                            | Delay |
| ----------------------- | --------------------------------- | ----- |
| `useFeaturedProducts()` | `src/services/product.service.ts` | 800ms |
| `useProducts()`         | `src/services/product.service.ts` | 800ms |
| `useFaqs()`             | `src/services/faq.service.ts`     | 600ms |

`QueryClient` configured with 5-minute stale time and 10-minute GC time. `ReactQueryDevtools` available in development.

---

## State Management

Zustand v5 with persistence where needed.

| Store                 | State                              | Persisted       |
| --------------------- | ---------------------------------- | --------------- |
| `cart.store.ts`       | Items, quantities, totals          | ✅ localStorage |
| `wishlist.store.ts`   | Wishlisted product IDs             | ✅ localStorage |
| `ui.store.ts`         | Cart drawer open, mobile menu open | ❌              |
| `quick-view.store.ts` | Currently previewed product        | ❌              |

---

## Design Decisions

**Typography pairing — Playfair Display + Inter**  
Playfair handles all headings and prices, creating a premium editorial feel. Inter handles all body copy and UI elements. The contrast between serif and sans-serif creates hierarchy without needing heavy font weights.

**Dark-first with light mode**  
Default theme is dark — consistent with Yatri Motorcycles' brand aesthetic. Light mode is fully supported via `next-themes` and CSS custom properties.

**Picsum Photos for mock imagery**  
Seed-based URLs (`picsum.photos/seed/{id}/w/h`) produce deterministic images — same seed always returns the same image. No API key, no rate limits, HTTPS, production-safe.

**`useGSAP` over `useEffect`**  
Official `@gsap/react` hook handles context scoping, cleanup, and React 18 Strict Mode double-invocation automatically. All animation logic lives inside `useGSAP` calls.

**Zustand `persist` middleware**  
Cart and wishlist survive page refresh — expected behavior on any real e-commerce site.

**shadcn Nova preset**  
Chosen for its clean, editorial aesthetic with balanced spacing — matches the premium lifestyle positioning of FlowCart.

---

## One Improvement

With more time I would add **full-text product search with filtering** — a `useProducts` query with category/price/sort params, a filter sidebar with Zustand state, and URL-synced filters via `nuqs` so results are shareable. The mock data and service layer are already structured to support this without refactoring.

---

## Pages

| Route        | Description                                                                  |
| ------------ | ---------------------------------------------------------------------------- |
| `/`          | Landing page — Hero, Products, Categories, Testimonials, FAQ, Footer         |
| `/dashboard` | Admin — KPI cards, revenue chart, category breakdown, product + order tables |

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout — fonts, providers
│   ├── page.tsx            # Landing page
│   └── dashboard/
│       └── page.tsx        # Dashboard page
├── components/
│   ├── dashboard/          # Dashboard-specific components
│   ├── layout/             # Navbar, Footer, CartDrawer
│   ├── providers/          # QueryProvider
│   ├── sections/           # Hero, Products, Categories, FAQ, Testimonials, QuickView, Promo
│   ├── shared/             # ImageWithFallback, ThemeToggle, Icons
│   └── ui/                 # shadcn components
├── constants/              # Site config, navigation
├── data/                   # Mock data
├── hooks/                  # useReducedMotion, useGsapEntrance, useScrollTrigger
├── lib/                    # gsap.ts, fonts.ts, utils.ts, metadata.ts
├── services/               # TanStack Query hooks
├── stores/                 # Zustand stores
└── types/                  # TypeScript interfaces
```

---

## Deployment

```bash
pnpm build
```

Deploy to Vercel — zero config required with Next.js.
