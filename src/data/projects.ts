export type ProjectLink = { label: string; url: string };

export type Project = {
  name: string;
  year: string;
  blurb: string;
  stack: string[];
  links: ProjectLink[];
};

// TODO: replace these placeholder entries with your real projects.
// Each card shows: name · year, a short blurb, the stack, and links.
const GITHUB = "https://github.com/ANURAGYADAV008";

export const PROJECTS: Project[] = [
  {
    name: "This portfolio",
    year: "2026",
    blurb:
      "A single-page transformer simulation: real scaled dot-product attention and from-scratch math, answering questions entirely in the browser — no ML libraries, no API keys.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    links: [{ label: "code", url: `${GITHUB}/portfolio` }],
  },
  {
    name: "Project two",
    year: "2026",
    blurb:
      "Placeholder — a full-stack app with its own API, authentication, and a database. Replace with the real story: what it does and what you built.",
    stack: ["Node.js", "Express", "PostgreSQL"],
    links: [{ label: "code", url: GITHUB }],
  },
  {
    name: "Project three",
    year: "2025",
    blurb:
      "Placeholder — a developer tool or library. Replace with the problem it solves and how it works under the hood.",
    stack: ["TypeScript", "CLI"],
    links: [{ label: "code", url: GITHUB }],
  },
  {
    name: "Project four",
    year: "2025",
    blurb:
      "Placeholder — a UI experiment or small game. Replace with what makes it fun to use and interesting to build.",
    stack: ["React", "Canvas"],
    links: [{ label: "code", url: GITHUB }],
  },
];
