import { projects, site, skills } from "@/data/site";

/**
 * The scripted "model". Each entry is a topic with trigger words and the
 * answer the decoder will generate. Edit these to make the demo yours.
 */

export type QA = {
  id: string;
  patterns: string[];
  answer: string;
};

export const faqs: readonly QA[] = [
  {
    id: "about",
    patterns: ["who", "about", "yourself", "background", "intro", "you"],
    answer: `I'm ${site.name}, a ${site.role.toLowerCase()}. ${site.tagline} And this page? It's a tiny transformer running entirely in your browser.`,
  },
  {
    id: "projects",
    patterns: ["project", "built", "build", "work", "portfolio", "made", "app"],
    answer: `Three featured projects: ${projects.map((p) => p.name).join(", ")}. ${projects[0].name} is ${projects[0].description}. The rest are on my GitHub.`,
  },
  {
    id: "skills",
    patterns: ["skill", "stack", "tech", "tool", "language", "know", "use"],
    answer: `On the front end: ${skills[1].items.join(", ")}. On the back end: ${skills[2].items.join(", ")}. Day to day that means ${skills[0].items.join(", ")}, plus ${skills[3].items.join(", ")}.`,
  },
  {
    id: "contact",
    patterns: ["contact", "email", "reach", "hire", "talk", "connect", "touch"],
    answer: `The fastest way is email: ${site.email}. I'm also on ${site.links[0].label} and ${site.links[1].label} — all links are in the header.`,
  },
  {
    id: "resume",
    patterns: ["resume", "cv", "download"],
    answer: `You can download my resume right from this page — it's the resume.pdf link in the header.`,
  },
  {
    id: "hello",
    patterns: ["hi", "hello", "hey", "greetings", "sup"],
    answer: `Hey — good to see you! Ask me about projects, skills, or how to get in touch.`,
  },
];

export const FALLBACK_QA: QA = {
  id: "fallback",
  patterns: [],
  answer: `I'm a small scripted model, so my vocabulary is limited. Try "who are you?", "projects", "skills", or "contact".`,
};

export const EXAMPLE_QUESTIONS: readonly string[] = [
  "who are you?",
  "what projects have you built?",
  "what is your stack?",
  "how do I contact you?",
];

/** Candidate words the decoder's softmax chooses between at each step. */
export const DISTRACTORS: readonly string[] = [
  ...new Set([
    "the", "a", "is", "and", "to", "of", "in", "with", "for", "that",
    "it", "web", "code", "build", "fast", "design", "data", "model",
    "learn", "ship", "apps", "clean", "simple", "craft",
  ]),
];

/** Pick the best matching scripted answer for a question. */
export function matchQuestion(text: string): QA {
  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9' ]/g, " ")
    .split(/\s+/)
    .filter(Boolean);

  let best: QA | null = null;
  let bestScore = 0;

  for (const qa of faqs) {
    let score = 0;
    for (const pattern of qa.patterns) {
      if (words.some((w) => w.startsWith(pattern))) score += pattern.length;
    }
    if (score > bestScore) {
      bestScore = score;
      best = qa;
    }
  }

  return best ?? FALLBACK_QA;
}
