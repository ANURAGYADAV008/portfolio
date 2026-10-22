# Anurag Yadav — Portfolio

A single-page portfolio for Anurag Yadav, focused on backend engineering,
generative AI, and agentic systems.

The page is deliberately quiet: a pure white canvas, a single green accent,
editorial type, and a small animated bot at the top. No gradients, no glass,
no purple.

## Sections

1. **Intro** — animated bot, name and role, statement, summary, current education and focus, verified numbers, links, resume, availability
2. **Selected work** — three projects with highlights, stack, and links
3. **Toolkit** — frontend, backend, cloud/devops, and AI/ML groups with icons
4. **GitHub activity** — live contribution graph for the last 12 months
5. **Contact** — email and social links

## Content

Everything editable lives in `src/data/`:

| File | Controls |
| --- | --- |
| `src/data/site.ts` | name, role, tagline, summary, education, focus areas, availability, stats, social links, email |
| `src/data/projects.ts` | project names, descriptions, highlights, stacks, links |
| `src/data/skills.ts` | skill groups and the “also in the toolkit” line |
| `src/data/brand-icons.ts` | inline brand glyphs from [Simple Icons](https://simpleicons.org) (CC0) |
| `public/resume.pdf` | the resume linked from the intro and footer |

The GitHub section reads:

- `github-contributions-api.jogruber.de` for the contribution calendar
- `api.github.com` for public repository and follower counts

Both are cached with `use cache` and `cacheLife("hours")`. If either request
fails, the section falls back to a link to the GitHub profile rather than
showing stale or invented data.

## Run it

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Deploy

Push the repo and import it into [Vercel](https://vercel.com). No environment
variables are required. The GitHub section needs outbound access to the two
public APIs at build time and on hourly revalidation.

## Stack

Next.js 16 (App Router, Cache Components) · React 19 · TypeScript · Tailwind
CSS 4 · inline SVG icons
