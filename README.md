# Muhammad Osama — Portfolio

A modern, dark glassmorphic portfolio built with Next.js 15 (App Router), TypeScript, Tailwind CSS, and Framer Motion. All content is centralized in `lib/data.ts`, sourced directly from the attached CV.

## Local Setup

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

## Build

```bash
npm run build
npm start
```

> **Note:** This project was built in a sandboxed environment with no access to the npm registry, so `npm install` / `npm run build` could not be executed there to verify the production build. The code was written carefully and structurally checked with the TypeScript compiler using stub types, but you should run `npm run build` yourself after `npm install` (which requires network access) to confirm it compiles cleanly before deploying. If anything surfaces, share the error output and it can be fixed quickly.

## Editing Content

Everything — name, experience, projects, skills, education, certifications, links — lives in one file:

```
lib/data.ts
```

Edit that file to update copy without touching any component.

## Deploy to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

## Deploy to Vercel

1. Go to [vercel.com/new](https://vercel.com/new) and import your GitHub repo.
2. Framework preset: **Next.js** (auto-detected). No config changes needed.
3. Click **Deploy**.
4. (Optional) Add a custom domain under Project → Settings → Domains, then point your domain's DNS through Cloudflare to Vercel following Vercel's instructions.

## Optional: Cloudinary for Project Images

The site works with zero image-hosting config — project cards use gradient + icon treatments instead of screenshots. If you later want to add real screenshots via Cloudinary:

1. Copy `.env.example` to `.env.local`.
2. Set `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` to your Cloudinary cloud name.
3. Use the `cloudinaryUrl()` helper in `lib/cloudinary.ts` to build optimized URLs, and pass them to `next/image`.

## Optional: Wire Up the Contact Form

The contact form (`components/sections/contact.tsx`) currently opens the visitor's email client with a pre-filled message via `mailto:` — no backend required. To send messages directly instead, connect it to a service like [Formspree](https://formspree.io) or [Resend](https://resend.com) and replace the `handleSubmit` function.

## Tech Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS
- Framer Motion (animations)
- lucide-react (icons)
- next/font (self-hosted Space Grotesk, Inter, JetBrains Mono)

## Project Structure

```
app/                  Routes, layout, metadata, global styles
components/layout/    Navbar, Footer
components/sections/  Hero, About, Skills, Experience, Projects, Education, Contact
components/ui/        Reusable UI primitives (glass panels, badges, scroll reveal, etc.)
lib/data.ts           Single source of truth for all content
lib/cloudinary.ts      Optional Cloudinary helper
public/                Resume PDF, OG image
```
