# Norrant Portfolio

Personal portfolio built with Next.js, React, Tailwind CSS, and Framer Motion.

## Getting Started

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Build

```bash
npm run build
```

The project exports a static site to `out/`, so it can be deployed on GitHub Pages.

## Deploy on GitHub Pages

This repo includes a GitHub Actions workflow at `.github/workflows/deploy.yml`.

After pushing to GitHub:

1. Open the repository on GitHub.
2. Go to **Settings** > **Pages**.
3. Set **Source** to **GitHub Actions**.
4. Push to the `main` branch and wait for the deploy workflow to finish.

All project images are stored in `public/images`, so a fresh clone has the required assets.

## Scripts

```bash
npm run dev
npm run lint
npm run build
```
