# NYSAX Agency Website - Vercel Deployment Guide

This website is built with Vite, React, TypeScript, and Tailwind CSS. It is **100% production-ready** for instant deployment to Vercel.

---

## Method 1: Deploy with Vercel CLI (Fastest - 2 Minutes)

Open your terminal in this project folder:

```bash
cd /Users/apple/Documents/nysax
```

Run the Vercel deploy command (using the bundled npx):

```bash
/Applications/ChatGPT.app/Contents/Resources/cua_node/bin/npx vercel
```
*(Or simply `npx vercel` if you have Node.js in your system PATH).*

1. It will ask: `Set up and deploy "~/Documents/nysax"?` → Press **Y** (Enter)
2. `Which scope do you want to deploy to?` → Select your Vercel account
3. `Link to existing project?` → Press **N**
4. `What's your project's name?` → Press Enter (default: `nysax`)
5. `In which directory is your code located?` → Press Enter (default: `./`)
6. Vercel will automatically detect **Vite** and deploy!

To deploy straight to **Production (live custom domain)**:
```bash
npx vercel --prod
```

---

## Method 2: Deploy via GitHub (Recommended for Continuous Updates)

1. Create a new repository on [github.com](https://github.com/new) (e.g., `nysax-agency`).
2. Push this folder to your GitHub repo:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of NYSAX agency website and portals"
   git branch -M main
   git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/nysax-agency.git
   git push -u origin main
   ```
3. Go to [vercel.com/new](https://vercel.com/new).
4. Select `nysax-agency` from your GitHub repositories and click **Import**.
5. Vercel automatically detects the build settings:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Click **Deploy**. Within 45 seconds, your website will be live worldwide on a `.vercel.app` domain (and you can attach `nysax.agency` in Vercel domain settings with 1 click).

---

## Pre-Configured Demo Accounts & Access

### 1. Client Portal Login
- **Email**: `client@brand.com`
- **Password**: `client123`
- **Capabilities**: View active marketing campaigns (SEO, Web Design, Email Flows, Social Media), milestone checklists, file deliverables, and submit direct strategist tickets.

### 2. Agency Admin Command Center
- **Email**: `admin@nysax.agency`
- **Password**: `admin123`
- **Capabilities**: Real-time KPI dashboards, lead CRM (form submissions + chatbot leads), user account manager (promote clients to admin), project status editor, and 1-click JSON database export.

### 3. New User Registration
- Visitors can click **"Create Account"** anywhere on the site, register their name, email, password, brand name, and chosen service.
- The new account is immediately stored in the persistent database, and they are logged into their new personal Client Portal automatically.

---

## Agency Configuration Reference

- **Brand Name**: NYSAX Agency
- **Domain**: `nysax.agency`
- **Primary Email**: `nysaxofficial@gmail.com`
- **Instagram**: `@nysax.agency` ([https://www.instagram.com/nysax.agency](https://www.instagram.com/nysax.agency?stkn=MXdycDVzN3lqc2tqZA==))
- **5 Core Services**:
  1. SEO Optimization & Rankings
  2. High-Converting Website Design & Funnels
  3. Sales Strategy & Revenue Architecture
  4. Automated Email Marketing & Retention
  5. Newbies in Social Media Marketing (Dedicated Beginner Incubator)
