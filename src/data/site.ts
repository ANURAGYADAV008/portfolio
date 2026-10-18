/**
 * Placeholder content — edit freely.
 * This feeds the scripted answers in src/data/qa.ts.
 */

export const site = {
  name: "Anurag",
  handle: "anurag",
  role: "Full-Stack Developer",
  tagline: "I build fast, thoughtful web experiences.",
  bio: [
    "I'm a developer who likes turning ideas into fast, accessible web apps — from the first sketch to the final deploy.",
    "When I'm not coding, I'm probably reading about databases, tweaking my dotfiles, or shipping side projects.",
  ],
  email: "hello@example.com", // TODO: replace with your real email
  resume: "/resume.pdf",
  links: [
    { label: "github", url: "https://github.com/ANURAGYADAV008" },
    {
      label: "linkedin",
      url: "https://www.linkedin.com/in/anurag-yadav-3bb3a1329",
    },
    { label: "email", url: "mailto:hello@example.com" }, // TODO: replace
  ],
} as const;

export type Project = {
  name: string;
  description: string;
  stack: readonly string[];
  repo?: string;
  live?: string;
  status: "active" | "wip" | "archived";
};

export const projects: readonly Project[] = [
  {
    name: "devboard",
    description:
      "a real-time analytics dashboard for side projects with charts, alerts, and weekly digests",
    stack: ["Next.js", "TypeScript", "PostgreSQL"],
    repo: "https://github.com/ANURAGYADAV008/devboard",
    live: "https://devboard.example.com",
    status: "active",
  },
  {
    name: "termblog",
    description:
      "a markdown-first blog engine that renders posts in a retro terminal UI",
    stack: ["Node.js", "Markdown", "CLI"],
    repo: "https://github.com/ANURAGYADAV008/termblog",
    status: "active",
  },
  {
    name: "snipkeep",
    description:
      "a keyboard-first snippet manager with fuzzy search and fully offline storage",
    stack: ["React", "TypeScript", "IndexedDB"],
    repo: "https://github.com/ANURAGYADAV008/snipkeep",
    status: "wip",
  },
];

export const skills: readonly { group: string; items: readonly string[] }[] = [
  {
    group: "languages",
    items: ["TypeScript", "JavaScript", "Python", "SQL"],
  },
  {
    group: "frontend",
    items: ["React", "Next.js", "Tailwind CSS", "HTML & CSS"],
  },
  {
    group: "backend",
    items: ["Node.js", "Express", "PostgreSQL", "REST APIs"],
  },
  {
    group: "tools",
    items: ["Git & GitHub", "Docker", "Linux", "Vercel"],
  },
];
