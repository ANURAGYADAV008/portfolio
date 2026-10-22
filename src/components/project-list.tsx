import { ArrowUpRight } from "@/components/icons";
import { projects } from "@/data/projects";

export function ProjectList() {
  return (
    <div className="mt-5">
      {projects.map((project, index) => (
        <article
          key={project.name}
          className="group border-t border-line py-4 first:border-t-0 first:pt-0 sm:py-5"
        >
          <div className="flex items-center justify-between gap-4 font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
            <span>Project {String(index + 1).padStart(2, "0")}</span>
            <span>{project.year}</span>
          </div>

          <h3 className="mt-1 text-balance font-display text-xl leading-tight tracking-[-0.01em] text-ink transition-colors group-hover:text-accent sm:text-2xl">
            {project.name}
          </h3>

          <p className="mt-1.5 max-w-2xl text-[13px] font-semibold leading-5 text-ink">
            {project.blurb}
          </p>

          <ul className="mt-2 max-w-2xl space-y-0.5">
            {project.points.map((point) => (
              <li
                key={point}
                className="flex gap-2 text-[13px] leading-5 text-muted"
              >
                <span
                  className="mt-[9px] h-px w-2.5 shrink-0 bg-accent"
                  aria-hidden="true"
                />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <ul className="mt-2.5 flex flex-wrap gap-1" aria-label="Stack">
            {project.stack.map((item) => (
              <li
                key={item}
                className="rounded-sm border border-line bg-surface px-1.5 py-0.5 font-mono text-[9px] text-muted"
              >
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-2">
            {project.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 border-b border-line-strong/70 pb-0.5 text-[11px] font-medium text-ink transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                {link.label}
                <ArrowUpRight className="size-3" />
              </a>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}
