import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import { PROJECTS } from "@/data/projects";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `Projects — ${site.name}`,
  description: `Selected projects by ${site.name} — full-stack apps, developer tools, and interface experiments.`,
};

export default function ProjectsPage() {
  return (
    <main className="mx-auto w-full max-w-[1180px] flex-1 px-4 pb-16 sm:px-6">
      <header className="pt-10 sm:pt-14">
        <p className="font-mono text-xs text-nn-cyan">
          transformer://projects — selected work
        </p>
        <h1 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          Things I&apos;ve built.
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-nn-muted">
          Full-stack apps, developer tools, and interface experiments — each
          entry links to the code.
        </p>
        <SiteNav />
      </header>

      <section className="mt-14 grid items-start gap-6 md:grid-cols-2">
        {PROJECTS.map((project) => (
          <article
            key={project.name}
            className="rounded-lg border border-nn-line bg-nn-panel p-5"
          >
            <div className="flex items-baseline justify-between gap-3">
              <h2 className="text-base font-semibold text-nn-fg">
                {project.name}
              </h2>
              <span className="shrink-0 font-mono text-[10px] text-nn-muted">
                {project.year}
              </span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-nn-muted">
              {project.blurb}
            </p>
            <p className="mt-4 font-mono text-[11px] text-nn-muted">
              {project.stack.join(" · ")}
            </p>
            {project.links.length ? (
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs">
                {project.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-nn-muted transition-colors hover:text-nn-violet"
                  >
                    {link.label} ↗
                  </a>
                ))}
              </div>
            ) : null}
          </article>
        ))}
      </section>

      <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs">
        <span className="font-mono text-[11px] text-nn-muted/70">
          placeholder entries — edit src/data/projects.ts
        </span>
        <Link
          href="/"
          className="text-nn-muted transition-colors hover:text-nn-violet"
        >
          ← back to the transformer
        </Link>
      </div>
    </main>
  );
}
