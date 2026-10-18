/**
 * A tiny transformer, implemented from scratch — no ML libraries.
 *
 * Everything here is real math: tokenization, deterministic embeddings,
 * positional encodings, Q/K/V projections, scaled dot-product attention,
 * mean pooling, softmax, and a step-by-step decoding loop.
 *
 * The "weights" are fixed, seeded constants (not trained), and the answers
 * are scripted in src/data/qa.ts — but every number you see on screen is
 * actually computed from your input.
 */

import { DISTRACTORS, matchQuestion, type QA } from "@/data/qa";

export type Vec = number[];
export type Mat = Vec[];
export type Dist = { token: string; p: number }[];

export const MODEL_DIM = 8;
export const MAX_INPUT_TOKENS = 12;

const SOFTMAX_TEMP = 0.7;
const SCRIPTED_BIAS = 2.6;

/* ---------------- deterministic randomness ---------------- */

export function hashSeed(text: string): number {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function randVec(rng: () => number, dim = MODEL_DIM): Vec {
  return Array.from({ length: dim }, () => rng() * 2 - 1);
}

export function normalize(v: Vec): Vec {
  let sum = 0;
  for (const x of v) sum += x * x;
  const n = Math.sqrt(sum) || 1;
  return v.map((x) => x / n);
}

function dot(a: Vec, b: Vec): number {
  let s = 0;
  for (let i = 0; i < a.length; i++) s += a[i] * b[i];
  return s;
}

function add(a: Vec, b: Vec): Vec {
  return a.map((x, i) => x + b[i]);
}

/** Vectors are unit length, so cosine similarity is just the dot product. */
export function cosine(a: Vec, b: Vec): number {
  return dot(a, b);
}

/* ---------------- tokenizer ---------------- */

const TOKEN_RE = /[a-z0-9]+(?:'[a-z]+)?|[^\sa-z0-9]/gi;

/** Split text into tokens, preserving case (used for generated output). */
export function tokenizeAll(text: string): string[] {
  return text.match(TOKEN_RE) ?? [];
}

/** Split and lowercase user input, capped for the encoder's attention matrix. */
export function tokenizeInput(text: string): string[] {
  return tokenizeAll(text.toLowerCase()).slice(0, MAX_INPUT_TOKENS);
}

/* ---------------- embeddings ---------------- */

const embedCache = new Map<string, Vec>();

/** Deterministic 8-dimensional unit vector for any token. */
export function embed(token: string): Vec {
  const hit = embedCache.get(token);
  if (hit) return hit;
  const v = normalize(randVec(mulberry32(hashSeed(`token:${token}`))));
  embedCache.set(token, v);
  return v;
}

/** Classic sinusoidal positional encoding. */
export function positional(pos: number, dim = MODEL_DIM): Vec {
  return Array.from({ length: dim }, (_, i) =>
    i % 2 === 0
      ? Math.sin(pos / 10000 ** (i / dim))
      : Math.cos(pos / 10000 ** ((i - 1) / dim)),
  );
}

export function embedSequence(tokens: string[]): Mat {
  return tokens.map((t, i) => normalize(add(embed(t), positional(i))));
}

/* ---------------- projections & attention ---------------- */

const projCache = new Map<string, Mat>();

/** Fixed, seeded projection matrix (the "trained weights"). */
function projection(name: string, dim = MODEL_DIM): Mat {
  const hit = projCache.get(name);
  if (hit) return hit;
  const rng = mulberry32(hashSeed(`proj:${name}`));
  const scale = 1 / Math.sqrt(dim);
  const W: Mat = Array.from({ length: dim }, () =>
    Array.from({ length: dim }, () => (rng() * 2 - 1) * scale),
  );
  projCache.set(name, W);
  return W;
}

export function project(X: Mat, name: string): Mat {
  const W = projection(name);
  return X.map((x) =>
    W[0].map((_, j) => {
      let s = 0;
      for (let i = 0; i < x.length; i++) s += x[i] * W[i][j];
      return s;
    }),
  );
}

export function softmax(row: Vec): Vec {
  const max = Math.max(...row);
  const exps = row.map((x) => Math.exp(x - max));
  let sum = 0;
  for (const e of exps) sum += e;
  return exps.map((e) => e / sum);
}

export type Attention = { scores: Mat; weights: Mat; context: Mat };

/** Scaled dot-product attention: softmax(QKᵀ/√d) · V */
export function scaledDotAttention(Q: Mat, K: Mat, V: Mat): Attention {
  const dk = Q[0]?.length ?? 1;
  const scores = Q.map((q) => K.map((k) => dot(q, k) / Math.sqrt(dk)));
  const weights = scores.map((row) => softmax(row));
  const context = weights.map((row) => {
    const out = new Array<number>(dk).fill(0);
    row.forEach((w, j) => {
      const vj = V[j];
      for (let i = 0; i < dk; i++) out[i] += w * vj[i];
    });
    return out;
  });
  return { scores, weights, context };
}

export function meanPool(rows: Mat): Vec {
  const dim = rows[0]?.length ?? MODEL_DIM;
  const out = new Array<number>(dim).fill(0);
  for (const r of rows) for (let i = 0; i < dim; i++) out[i] += r[i];
  return normalize(out.map((x) => x / (rows.length || 1)));
}

/* ---------------- decoder ---------------- */

function advanceState(state: Vec, tokenEmbedding: Vec, position: number): Vec {
  const mixed = normalize(
    state.map((s, i) => 0.55 * s + 0.45 * tokenEmbedding[i]),
  );
  const k = position % mixed.length;
  return normalize(mixed.map((_, i) => mixed[(i + k) % mixed.length]));
}

/**
 * One decoding step: score candidate next tokens against the decoder state,
 * run a real softmax, and emit the highest-probability token.
 * (The scripted bias plays the role of trained weights.)
 */
export function decodeStep(
  state: Vec,
  actual: string,
  position: number,
): { probs: Dist; state: Vec } {
  const rng = mulberry32(hashSeed(`step:${position}:${actual}`));
  const distractors = [...DISTRACTORS]
    .filter((d) => d !== actual.toLowerCase())
    .map((w) => ({ w, k: rng() }))
    .sort((a, b) => a.k - b.k)
    .slice(0, 4)
    .map((x) => x.w);

  const candidates = [actual, ...distractors];
  const logits = candidates.map(
    (c, i) =>
      cosine(state, embed(c)) / SOFTMAX_TEMP + (i === 0 ? SCRIPTED_BIAS : 0),
  );
  const probs = softmax(logits);

  const dist = candidates
    .map((c, i) => ({ token: c, p: probs[i] }))
    .sort((a, b) => b.p - a.p)
    .slice(0, 4);

  return { probs: dist, state: advanceState(state, embed(actual), position) };
}

/* ---------------- pipeline ---------------- */

export type Stage =
  | { kind: "token"; index: number }
  | { kind: "attention"; row: number }
  | { kind: "think" }
  | { kind: "decode"; index: number; token: string; probs: Dist; state: Vec }
  | { kind: "done" };

export type Pipeline = {
  input: string;
  faq: QA;
  tokens: string[];
  embeddings: Mat;
  weights: Mat;
  summary: Vec;
  answerTokens: string[];
  stages: Stage[];
};

/** Run the whole thing up front, then replay it as an animation timeline. */
export function buildPipeline(input: string): Pipeline {
  const tokens = tokenizeInput(input);
  const X = embedSequence(tokens);

  const Q = project(X, "query");
  const K = project(X, "key");
  const V = project(X, "value");
  const { weights, context } = scaledDotAttention(Q, K, V);
  const summary = meanPool(context);

  const faq = matchQuestion(input);
  const answerTokens = tokenizeAll(faq.answer);

  const stages: Stage[] = [];
  tokens.forEach((_, i) => stages.push({ kind: "token", index: i }));
  tokens.forEach((_, row) => stages.push({ kind: "attention", row }));
  stages.push({ kind: "think" });

  let state = normalize(add(summary, embed("<bos>")));
  answerTokens.forEach((token, index) => {
    const { probs, state: next } = decodeStep(state, token, index);
    stages.push({ kind: "decode", index, token, probs, state: next });
    state = next;
  });
  stages.push({ kind: "done" });

  return { input, faq, tokens, embeddings: X, weights, summary, answerTokens, stages };
}

/* ---------------- view helpers ---------------- */

export type Phase = "input" | "encoding" | "decoding" | "done";

export type PipelineView = {
  tokensShown: number;
  attnRows: number;
  summaryShown: boolean;
  decoded: number;
  probs: Dist | null;
  decoderState: Vec | null;
  lastToken: string | null;
  phase: Phase;
  done: boolean;
};

/** Collapse the first `applied` stages into everything the panels need. */
export function viewOf(p: Pipeline, applied: number): PipelineView {
  const v: PipelineView = {
    tokensShown: 0,
    attnRows: 0,
    summaryShown: false,
    decoded: 0,
    probs: null,
    decoderState: null,
    lastToken: null,
    phase: "input",
    done: false,
  };

  const upto = Math.min(applied, p.stages.length);
  for (let i = 0; i < upto; i++) {
    const s = p.stages[i];
    switch (s.kind) {
      case "token":
        v.tokensShown = s.index + 1;
        break;
      case "attention":
        v.tokensShown = p.tokens.length;
        v.attnRows = s.row + 1;
        break;
      case "think":
        v.tokensShown = p.tokens.length;
        v.attnRows = p.tokens.length;
        v.summaryShown = true;
        break;
      case "decode":
        v.decoded = s.index + 1;
        v.probs = s.probs;
        v.decoderState = s.state;
        v.lastToken = s.token;
        break;
      case "done":
        v.tokensShown = p.tokens.length;
        v.attnRows = p.tokens.length;
        v.summaryShown = true;
        v.decoded = p.answerTokens.length;
        break;
    }
  }

  v.phase =
    applied >= p.stages.length
      ? "done"
      : v.decoded > 0
        ? "decoding"
        : v.tokensShown > 0 || v.attnRows > 0
          ? "encoding"
          : "input";

  v.done = v.phase === "done";

  return v;
}

export function stageDelay(stage: Stage | undefined): number {
  switch (stage?.kind) {
    case "token":
      return 85;
    case "attention":
      return 95;
    case "think":
      return 420;
    case "decode":
      return 80;
    default:
      return 0;
  }
}

/** Join generated tokens back into readable text. */
export function renderText(tokens: string[], count: number): string {
  return tokens
    .slice(0, count)
    .join(" ")
    .replace(/ ([,.!?;:])/g, "$1")
    .replace(/ - /g, "-")
    .replace(/\. (?=(?:js|jsx|ts|tsx|py)\b)/g, "."); // "next . js" → "next.js"
}
