import { ArrowUpRight } from "@/components/icons";
import { projects } from "@/data/projects";

export function ProjectList() {
  return (
    <div className="mt-3 grid gap-2 sm:grid-cols-2">
      {projects.map((project) => {
        const isLive = project.links.some((link) =>
          link.label.toLowerCase().includes("live"),
        );

        return (
          <article
            key={project.name}
            className="flex flex-col rounded-lg border border-line bg-surface p-3.5 transition-colors hover:border-accent/35"
          >
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-[12px] font-semibold leading-5 text-ink">
                <a
                  href={project.links[0]?.href}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  {project.name}
                </a>
              </h3>

              <span
                className={
                  isLive
                    ? "inline-flex shrink-0 items-center gap-1 rounded-full border border-accent/25 bg-accent-soft px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-[0.08em] text-accent-ink"
                    : "inline-flex shrink-0 items-center rounded-full border border-line bg-surface-2 px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-[0.08em] text-muted"
                }
              >
                {isLive ? (
                  <span
                    className="size-1 rounded-full bg-accent"
                    aria-hidden="true"
                  />
                ) : null}
                {isLive ? "Live" : "Open source"}
              </span>
            </div>

            <p className="mt-1.5 text-[11px] leading-5 text-muted">
              {project.blurb}
            </p>

            <p className="mt-2 text-[9px] leading-4 text-muted">
              {project.stack.slice(0, 4).join(" · ")}
            </p>

            <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-2.5">
              {project.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-0.5 text-[10px] font-medium text-ink transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  {link.label}
                  <ArrowUpRight className="size-2.5" />
                </a>
              ))}
            </div>
          </article>
        );
      })}
    </div>
  );
}
