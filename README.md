# Village — Cooperative Finance Platform

A React single-page application for cooperative finance. Users form groups to pool money, vote on fund allocation, and achieve shared financial goals.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Build for Production

```bash
npm run build
```

This generates a `dist/` folder with static assets ready to deploy.

## Preview Production Build

```bash
npm run preview
```

## Deploy

### Netlify
Push to a Git repo and connect it to Netlify — it will auto-detect the Vite config. Or drag and drop the `dist/` folder into [Netlify Drop](https://app.netlify.com/drop).

### Vercel
```bash
npx vercel
```
Or push to a Git repo and connect it to Vercel.

### Any Static Host
Upload the contents of `dist/` to any static file host (GitHub Pages, Cloudflare Pages, AWS S3 + CloudFront, etc.). Make sure to configure SPA fallback routing so all paths serve `index.html`.

## Tech Stack

- **React 18** — UI framework
- **Vite 5** — Build tool & dev server
- **Lucide React** — Icon library
- **Young Serif + Karla** — Typography (loaded via Google Fonts)
