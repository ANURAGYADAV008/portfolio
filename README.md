# transformer://portfolio

A single-page portfolio in the shape of a tiny transformer. You type a
question, it runs through an **input field → encoder → decoder → output**
pipeline, and the answer streams out one token at a time.

Everything runs in the browser, implemented from scratch in TypeScript — no
ML libraries, no API calls, no keys.

## What is real vs. scripted

**Real (computed from your input, every time):**

- the tokenizer (words, numbers, punctuation, contractions)
- deterministic 8-dim token embeddings + sinusoidal positional encodings
- Q/K/V projections and the attention matrix: `softmax(QKᵀ/√d)`
- mean pooling into the decoder's initial state
- the per-step softmax distribution over candidate next tokens
- the decoder's state updates and the greedy token-by-token loop

**Scripted:**

- the answers themselves (`src/data/qa.ts`) and the decoder's "trained
  weights" bias — this is a simulation of a transformer, not a trained LLM.

The math lives in `src/lib/transformer.ts`, ~250 lines, all pure functions.

## Make it yours

| File | What it controls |
| --- | --- |
| `src/data/site.ts` | name, role, links, projects, skills |
| `src/data/qa.ts` | the questions the "model" answers + example chips |
| `public/resume.pdf` | replace the placeholder with your real resume |
| `src/lib/transformer.ts` | the model itself, if you want to tweak dims or math |

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000 — try `who are you?`, `projects`, `skills`,
`contact`, or something the model doesn't know to see the fallback.

## Deploy

Push to GitHub and import the repo into [Vercel](https://vercel.com) — zero
configuration needed. `npm run build` for a local production check.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4
