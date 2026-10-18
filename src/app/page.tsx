import { ThemeToggle } from "@/components/theme-toggle";
import { TransformerDemo } from "@/components/transformer-demo";
import { site } from "@/data/site";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-[1180px] flex-1 px-4 pb-16 sm:px-6">
      <header className="pt-10 sm:pt-14">
        <p className="font-mono text-xs text-nn-cyan">
          transformer://portfolio — runs entirely in your browser
        </p>
        <h1 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          Ask a tiny transformer about {site.name}.
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-nn-muted">
          Your question flows through a <span className="text-nn-fg">prompt</span>
          , an <span className="text-nn-fg">encoder</span> that computes real
          scaled dot-product attention, and a{" "}
          <span className="text-nn-fg">decoder</span> that writes the{" "}
          <span className="text-nn-fg">answer</span> one token at a time.
        </p>
        <nav className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-xs">
          {site.links.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target={link.url.startsWith("http") ? "_blank" : undefined}
              rel={link.url.startsWith("http") ? "noreferrer" : undefined}
              className="text-nn-muted transition-colors hover:text-nn-fg"
            >
              {link.label}
            </a>
          ))}
          <a
            href={site.resume}
            download
            className="inline-flex h-11 items-center rounded-lg border border-nn-violet/40 bg-nn-violet/5 px-3.5 font-medium text-nn-violet transition-colors hover:bg-nn-violet/10"
          >
            resume.pdf ↓
          </a>
          <ThemeToggle />
        </nav>
      </header>

      <TransformerDemo />

      <p className="mt-14 max-w-3xl text-xs leading-relaxed text-nn-muted">
        Honest fine print: this is a simulation of a transformer, not a trained
        LLM. The attention math is real, but the weights are fixed seeds and
        the answers are scripted in{" "}
        <span className="font-mono text-nn-fg">src/data/qa.ts</span>. Swap in
        your own questions and answers there.
      </p>
    </main>
  );
}
