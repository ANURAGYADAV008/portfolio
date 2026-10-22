export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  name: string;
  year: string;
  blurb: string;
  points: readonly string[];
  stack: readonly string[];
  links: readonly ProjectLink[];
};

export const projects: readonly Project[] = [
  {
    name: "RAG-Based E-Commerce Assistant",
    year: "2026",
    blurb:
      "An agentic shopping assistant over Amazon product data — grounded answers, hybrid retrieval, and a cart that actually works.",
    points: [
      "Hybrid dense + BM25 retrieval in Qdrant, fused with reciprocal rank fusion and reranked by Cohere.",
      "LangGraph shopping agent with intent routing, conversation-aware queries, and structured LLM outputs.",
      "FastAPI + React app with PostgreSQL-backed cart operations, traced end to end in LangSmith.",
    ],
    stack: [
      "Python",
      "FastAPI",
      "LangGraph",
      "Qdrant",
      "OpenAI",
      "PostgreSQL",
      "React",
      "Docker",
    ],
    links: [
      {
        label: "Live demo",
        href: "https://frontend-ebon-alpha-84.vercel.app/",
      },
      {
        label: "Backend code",
        href: "https://github.com/ANURAGYADAV008/amazon_ecommerce",
      },
      {
        label: "Frontend code",
        href: "https://github.com/ANURAGYADAV008/frontend",
      },
    ],
  },
  {
    name: "SketchWaves",
    year: "2025",
    blurb:
      "A collaborative whiteboard where multiple people can draw on the same canvas, in real time.",
    points: [
      "Real-time canvas sync over WebSockets, with live drawing, shapes, and undo/redo.",
      "Room and session management with JWT auth; board state persisted in MongoDB.",
      "React + Node/Express split, containerized with Docker for reproducible deploys.",
    ],
    stack: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Socket.IO",
      "Tailwind CSS",
      "Docker",
    ],
    links: [
      { label: "Live demo", href: "https://sketch-waves.vercel.app/" },
      {
        label: "Code",
        href: "https://github.com/ANURAGYADAV008/SketchWaves",
      },
    ],
  },
  {
    name: "Qwen3-4B Math Reasoning",
    year: "2026",
    blurb:
      "A parameter-efficient fine-tune of Qwen3-4B for mathematical reasoning, trained on Google Colab.",
    points: [
      "QLoRA fine-tuning keeps the Qwen3-4B base model quantized to 4-bit while training LoRA adapters.",
      "2,000 OpenMathReasoning samples converted into Qwen's chat-template format for supervised training.",
      "Adapters trained with Hugging Face Transformers, PEFT, TRL, and PyTorch.",
    ],
    stack: [
      "Python",
      "PyTorch",
      "Hugging Face",
      "PEFT",
      "QLoRA",
      "TRL",
      "Colab",
    ],
    links: [
      {
        label: "Code",
        href: "https://github.com/ANURAGYADAV008/FinetuneQwenModel",
      },
    ],
  },
];
