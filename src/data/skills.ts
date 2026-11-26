import type { BrandIconSlug } from "@/data/brand-icons";

export type SkillIconName = BrandIconSlug | "server" | "voice";

export type Skill = {
  name: string;
  icon: SkillIconName;
};

export type SkillGroup = {
  label: string;
  caption: string;
  skills: readonly Skill[];
};

export const skillGroups: readonly SkillGroup[] = [
  {
    label: "Frontend",
    caption: "Interfaces & state",
    skills: [
      { name: "React", icon: "react" },
      { name: "Next.js", icon: "nextdotjs" },
      { name: "TypeScript", icon: "typescript" },
      { name: "JavaScript", icon: "javascript" },
      { name: "Tailwind CSS", icon: "tailwindcss" },
      { name: "Redux", icon: "redux" },
    ],
  },
  {
    label: "Backend",
    caption: "APIs & data",
    skills: [
      { name: "Node.js", icon: "nodedotjs" },
      { name: "Express", icon: "express" },
      { name: "FastAPI", icon: "fastapi" },
      { name: "Python", icon: "python" },
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "MongoDB", icon: "mongodb" },
      { name: "Redis", icon: "redis" },
      { name: "REST APIs", icon: "server" },
    ],
  },
  {
    label: "AI/ML",
    caption: "Models & retrieval",
    skills: [
      { name: "PyTorch", icon: "pytorch" },
      { name: "Hugging Face", icon: "huggingface" },
      { name: "LangChain", icon: "langchain" },
      { name: "LangGraph", icon: "langgraph" },
      { name: "Voice AI", icon: "voice" },
      { name: "Qdrant", icon: "qdrant" },
      { name: "Pydantic", icon: "pydantic" },
      { name: "Jupyter", icon: "jupyter" },
    ],
  },
  {
    label: "Tools & DevOps",
    caption: "Ship & run",
    skills: [
      { name: "Docker", icon: "docker" },
      { name: "Vercel", icon: "vercel" },
      { name: "GitHub", icon: "github" },
      { name: "Git", icon: "git" },
      { name: "Google Colab", icon: "googlecolab" },
      { name: "Postman", icon: "postman" },
    ],
  },
];

export const alsoFamiliar: readonly string[] = [
  "C++",
  "SQL",
  "MySQL",
  "FAISS",
  "ChromaDB",
  "Cohere",
  "LangSmith",
  "RAG",
  "TTS / STT",
  "LoRA / QLoRA",
  "TRL",
  "tool calling",
  "multi-agent systems",
];
