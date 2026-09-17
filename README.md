# NYSAX Agency | Digital Marketing & Growth Architecture

[![Built with Vite](https://img.shields.io/badge/Built%20with-Vite%206-646CFF?logo=vite)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Deploy with Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](https://vercel.com/)

A modern, high-converting digital marketing agency website built for **NYSAX** (`nysax.agency`), featuring sleek animations, an interactive rule-based AI growth advisor chatbot, an interactive ROI revenue simulator, client onboarding, support ticketing, separate client and admin portals, and persistent database storage.

---

## Agency Info & Links

- **Instagram**: [@nysax.agency](https://www.instagram.com/nysax.agency?stkn=MXdycDVzN3lqc2tqZA==)
- **Direct Email**: [nysaxofficial@gmail.com](mailto:nysaxofficial@gmail.com)
- **Domain**: `nysax.agency`

---

## 5 Core Agency Capabilities

1. **SEO Optimization & Organic Dominance**
   - Technical audits, Core Web Vitals speed repair, buyer-intent keyword clustering, and high-authority white-hat digital PR backlinks.
2. **High-Converting Website Design & Funnels**
   - Bespoke, ultra-fast (<1s load time) website experiences engineered with psychological conversion principles, interactive widgets, and seamless CRM integrations.
3. **Sales Strategy & Revenue Architecture**
   - High-ticket offer structuring, inbound/outbound qualification frameworks, objection handling scripts, and automated pipeline workflows.
4. **Automated Email Marketing & Retention**
   - Klaviyo & Omnisend lifecycle flows (welcome sequence, cart/browse recovery, VIP cross-sells, winbacks, and high-engagement broadcast campaigns).
5. **Newbies in Social Media Marketing (Zero-to-Hero Incubator)**
   - Specialized beginner incubation program for founders starting from 0 followers on Instagram and TikTok: bio & grid aesthetic makeover, 30-day viral short-form script pack, algorithm growth hacks, and DM-to-lead funnels.

---

## Features

- **Rule-Based AI Growth Advisor**:
  - Always-on floating assistant widget in the bottom-right corner.
  - Guided interactive decision tree covering the 5 core services, pricing, case studies, and audit requests.
  - Rule-based keyword matching engine responding to 40+ common agency inquiries.
  - Interactive lead capture questionnaire that saves qualified client inquiries directly to the database.
- **Client & Admin Authentication System**:
  - Separate login and sign-up portals with role-based access control (`client` vs `admin`).
  - New user registration that persists directly into the database.
  - Quick 1-click demo logins (`client@brand.com` and `admin@nysax.agency`).
- **Client Portal**:
  - Active campaigns tracker with milestone checklists and progress bars.
  - Deliverables & shared asset vault (spreadsheets, guides, wireframes).
  - Direct support ticketing system connecting clients to NYSAX strategists.
- **Admin Command Center**:
  - Live KPI statistics (registered clients, active leads, pipeline value, conversion rate).
  - Real-time CRM table of all leads from the contact form, chatbot, and audit requests.
  - User account management with role toggling (Client <-> Admin).
  - 1-Click JSON database export for backups or migration to PostgreSQL/Supabase.
- **Interactive ROI / Growth Calculator**:
  - Dynamic sliders for monthly revenue, conversion rates, and average customer value projecting 90-day revenue gains.
- **Strategy Booking & Audit Modals**:
  - 30-Minute Growth Strategy Call scheduling with time slot selection.
  - 7-Point Marketing & SEO Audit request form with automated database logging.

---

## Quick Start (Local Development)

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Deploying to Vercel

See the step-by-step instructions in [VERCEL_DEPLOYMENT_GUIDE.md](./VERCEL_DEPLOYMENT_GUIDE.md).
The project includes a pre-configured `vercel.json` and builds cleanly with `npm run build`.
