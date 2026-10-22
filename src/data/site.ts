import type { BrandIconSlug } from "@/data/brand-icons";

export type SocialIcon = BrandIconSlug | "mail";

export type SocialLink = {
  label: string;
  href: string;
  icon: SocialIcon;
};

export const site = {
  name: "Anurag Yadav",
  firstName: "Anurag",
  monogram: "AY",
  role: "Software Developer",
  focus: "Backend engineering & applied AI",
  focusAreas: ["RAG systems", "LangGraph agents", "LLM fine-tuning"],
  location: "Greater Noida, India",
  availability: "Open to work",
  tagline:
    "I build the backend and AI systems that make a product actually work.",
  email: "anuragyadav05556@gmail.com",
  resume: "/resume.pdf",
  githubUser: "ANURAGYADAV008",
  githubUrl: "https://github.com/ANURAGYADAV008",
  education: {
    degree: "B.Tech CSE (Data Science)",
    school: "Galgotias College, Greater Noida",
    period: "2023 — 2027",
  },
  summary: [
    "I'm a software developer focused on backend engineering and applied AI. I like the parts of a product that have to hold up: retrieval pipelines, agent workflows, APIs, data models, and the interface on top.",
    "Recently I've been building RAG systems with hybrid search, LangGraph agents, and fine-tuned small language models. I care about clean APIs, good data models, and the unglamorous details that make a product feel solid.",
  ],
  stats: [
    { value: "1,000+", label: "DSA problems solved" },
    { value: "1800+", label: "LeetCode rating" },
    { value: "Top 2K", label: "Weekly contest" },
  ],
} as const;

export const socials: readonly SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/ANURAGYADAV008",
    icon: "github",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/anurag-yadav-3bb3a1329",
    icon: "linkedin",
  },
  {
    label: "LeetCode",
    href: "https://leetcode.com/u/jayanurag123/",
    icon: "leetcode",
  },
  {
    label: "X",
    href: "https://x.com/Anurag95177267",
    icon: "x",
  },
  {
    label: "Email",
    href: "mailto:anuragyadav05556@gmail.com",
    icon: "mail",
  },
];
