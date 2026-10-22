import { Suspense } from "react";
import { Bot } from "@/components/bot";
import {
  GitHubActivity,
  GitHubSkeleton,
} from "@/components/github-activity";
import {
  ArrowUpRight,
  Download,
  GraduationCap,
  Layers,
} from "@/components/icons";
import { ProjectList } from "@/components/project-list";
import { SectionHeading } from "@/components/section-heading";
import { SiteHeader } from "@/components/site-header";
import { SkillGrid } from "@/components/skill-grid";
import { SocialLinks } from "@/components/social-links";
import { alsoFamiliar } from "@/data/skills";
import { site } from "@/data/site";

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main id="top">
        <section id="about" className="px-5 pb-6 pt-10 sm:pb-8 sm:pt-14">
          <div className="mx-auto w-full max-w-[800px]">
            <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-7">
              <Bot className="size-28 sm:size-32" />

              <div>
                <h1 className="font-display text-4xl leading-none tracking-[-0.01em] text-ink sm:text-5xl">
                  {site.name}
                </h1>
                <p className="mt-2 text-sm text-muted">
                  {site.role}
                  <span className="px-1.5 text-line-strong">/</span>
                  {site.location}
                </p>
              </div>
            </div>

            <p className="mt-8 max-w-[700px] text-balance font-display text-[2rem] leading-[1.08] tracking-[-0.01em] text-ink sm:mt-9 sm:text-[2.5rem]">
              {site.tagline}
            </p>

            <div className="mt-5 max-w-[660px] space-y-4 text-[15px] leading-7 text-muted">
              {site.summary.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 sm:gap-10">
              <div className="flex gap-3">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-md border border-line bg-surface text-muted">
                  <GraduationCap className="size-4" />
                </span>
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
                    Currently
                  </p>
                  <p className="mt-1 text-sm leading-6 text-ink">
                    {site.education.degree}
                  </p>
                  <p className="mt-0.5 text-xs leading-5 text-muted">
                    {site.education.school} · {site.education.period}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-md border border-line bg-surface text-muted">
                  <Layers className="size-4" />
                </span>
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
                    Focus
                  </p>
                  <p className="mt-1 text-sm leading-6 text-ink">
                    {site.focus}
                  </p>
                  <p className="mt-0.5 text-xs leading-5 text-muted">
                    {site.focusAreas.join(" · ")}
                  </p>
                </div>
              </div>
            </div>

            <ul className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
              {site.stats.map((stat) => (
                <li key={stat.label}>
                  <span className="text-ink">{stat.value}</span>{" "}
                  {stat.label}
                </li>
              ))}
            </ul>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-4">
              <div className="flex flex-wrap items-center gap-4">
                <SocialLinks align="start" />
                <a
                  href={site.resume}
                  download="Anurag-Yadav-Resume.pdf"
                  className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  Résumé
                  <Download className="size-3" />
                </a>
              </div>

              <span className="ml-auto inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.12em] text-muted">
                <span
                  className="size-1.5 rounded-full bg-accent"
                  aria-hidden="true"
                />
                {site.availability}
              </span>
            </div>
          </div>
        </section>

        <section
          id="work"
          className="border-t border-line px-5 py-5 sm:py-7"
        >
          <div className="mx-auto w-full max-w-[800px]">
            <SectionHeading
              index="01"
              eyebrow="Selected work"
              title="Things I've built."
              description="A few projects taken from an idea to something real — deployed, containerized, or trained."
            />

            <ProjectList />

            <div className="mt-5 flex justify-center">
              <a
                href={site.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 border-b border-line-strong/70 pb-0.5 text-[11px] font-medium text-ink transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                More experiments on GitHub
                <ArrowUpRight className="size-3" />
              </a>
            </div>
          </div>
        </section>

        <section
          id="skills"
          className="border-t border-line px-5 py-5 sm:py-7"
        >
          <div className="mx-auto w-full max-w-[800px]">
            <SectionHeading
              index="02"
              eyebrow="Toolkit"
              title="The tools I reach for."
              description="Grouped by where they sit in the stack."
            />

            <SkillGrid />

            <p className="mx-auto mt-4 max-w-2xl text-center font-mono text-[9px] leading-5 text-muted">
              <span className="text-ink">Also in the toolkit:</span>{" "}
              {alsoFamiliar.join(" · ")}
            </p>
          </div>
        </section>

        <section
          id="github"
          className="border-t border-line px-5 py-5 sm:py-7"
        >
          <div className="mx-auto w-full max-w-[800px]">
            <p className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
              <span className="h-px w-4 bg-line-strong" aria-hidden="true" />
              <span>
                <span className="text-accent">03</span> / GitHub activity
              </span>
            </p>

            <div className="mt-5">
              <Suspense fallback={<GitHubSkeleton />}>
                <GitHubActivity />
              </Suspense>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-line px-5 pb-8 pt-5 sm:pt-7">
        <div className="mx-auto w-full max-w-[800px] text-center">
          <p className="flex items-center justify-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
            <span className="h-px w-4 bg-line-strong" aria-hidden="true" />
            <span>04 / Contact</span>
            <span className="h-px w-4 bg-line-strong" aria-hidden="true" />
          </p>

          <h2 className="mt-3 font-display text-2xl leading-tight text-ink sm:text-3xl">
            Say hello.
          </h2>

          <p className="mx-auto mt-3 max-w-md text-[13px] leading-6 text-muted">
            If you&apos;re working on backend systems, applied AI, or something
            in between, I&apos;d like to hear about it.
          </p>

          <a
            href={`mailto:${site.email}`}
            className="mt-5 inline-flex items-center gap-1.5 border-b border-line-strong pb-1 text-base font-medium text-ink transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:text-lg"
          >
            {site.email}
            <ArrowUpRight className="size-4" />
          </a>

          <SocialLinks className="mt-6" />

          <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-line pt-5 text-[10px] text-muted sm:flex-row">
            <p>© 2026 {site.name}</p>
            <p>Built with Next.js, TypeScript &amp; Tailwind CSS</p>
            <a
              href={site.resume}
              download="Anurag-Yadav-Resume.pdf"
              className="transition-colors hover:text-ink"
            >
              Résumé ↓
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
