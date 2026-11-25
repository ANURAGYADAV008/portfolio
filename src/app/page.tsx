import { Suspense } from "react";
import { Bot } from "@/components/bot";
import {
  GitHubActivity,
  GitHubSkeleton,
} from "@/components/github-activity";
import { ArrowUpRight, Download, Mail } from "@/components/icons";
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

      <main id="top" className="mx-auto w-full max-w-[680px] px-5 sm:px-6">
        <section id="about" className="pb-1 pt-8 sm:pt-10">
          <div className="flex items-start gap-3">
            <Bot className="size-14" />

            <div className="min-w-0 pt-0.5">
              <h1 className="text-[14px] font-semibold leading-5 tracking-[-0.01em] text-ink sm:text-[15px]">
                Hey, I&apos;m{" "}
                <span className="rounded-[3px] bg-accent-soft px-1 py-0.5 text-accent-ink">
                  {site.name}
                </span>
                !
              </h1>
              <p className="mt-1.5 text-[12px] leading-5 text-muted">
                {site.role} based in {site.location}.
                <br />
                I build backend &amp; AI systems — RAG pipelines, agents, APIs.
              </p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <a
              href={site.resume}
              download="Anurag-Yadav-Resume.pdf"
              className="inline-flex items-center gap-1.5 rounded-md bg-ink px-2.5 py-1.5 text-[10px] font-medium text-paper transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <Download className="size-3" />
              Résumé
            </a>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-1.5 rounded-md border border-line bg-surface px-2.5 py-1.5 text-[10px] font-medium text-ink transition-colors hover:border-accent/40 hover:bg-accent-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <Mail className="size-3" />
              Send an email
            </a>
          </div>

          <p className="mt-3 flex items-center gap-1.5 text-[10px] text-muted">
            <span
              className="availability-dot size-1.5 rounded-full bg-accent"
              aria-hidden="true"
            />
            {site.availability} — let&apos;s talk!
          </p>

          <p className="mt-2 text-[10px] leading-5 text-muted">
            {site.education.degree} · {site.education.school} ·{" "}
            {site.education.period}
          </p>

          <ul className="mt-1 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[9px] uppercase tracking-[0.08em] text-muted">
            {site.stats.map((stat) => (
              <li key={stat.label}>
                <span className="text-ink">{stat.value}</span> {stat.label}
              </li>
            ))}
          </ul>
        </section>

        <section id="skills" className="mt-8 border-t border-line pt-5">
          <SectionHeading
            label="Tech stack"
            description="The tools I use for personal and client work:"
          />
          <div className="mt-3">
            <SkillGrid />
          </div>
          <p className="mt-2 text-[9px] leading-4 text-muted">
            <span className="text-ink">Also:</span>{" "}
            {alsoFamiliar.join(" · ")}
          </p>
        </section>

        <section id="work" className="mt-8 border-t border-line pt-5">
          <SectionHeading
            label="Projects"
            description="These are my personal projects, both live and ongoing:"
          />
          <ProjectList />
          <div className="mt-3">
            <a
              href={site.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-0.5 text-[10px] font-medium text-ink transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              More on GitHub
              <ArrowUpRight className="size-2.5" />
            </a>
          </div>
        </section>

        <section id="github" className="mt-8 border-t border-line pt-5">
          <SectionHeading label="GitHub activity" />
          <div className="mt-3">
            <Suspense fallback={<GitHubSkeleton />}>
              <GitHubActivity />
            </Suspense>
          </div>
        </section>

        <section id="social" className="mt-8 border-t border-line pt-5">
          <SectionHeading
            label="Find me on"
            description="You can find me on the following platforms:"
          />
          <SocialLinks align="start" className="mt-3" />
        </section>

        <section id="contact" className="mt-8 border-t border-line pt-5">
          <SectionHeading label="Get in touch" />
          <p className="mt-2 text-[11px] leading-5 text-muted">
            You can reach me anytime at{" "}
            <a
              href={`mailto:${site.email}`}
              className="text-ink underline decoration-line-strong underline-offset-2 transition-colors hover:text-accent hover:decoration-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {site.email}
            </a>
            .
          </p>
          <p className="mt-1 text-[11px] leading-5 text-muted">
            Or download my{" "}
            <a
              href={site.resume}
              download="Anurag-Yadav-Resume.pdf"
              className="text-ink underline decoration-line-strong underline-offset-2 transition-colors hover:text-accent hover:decoration-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              résumé
            </a>
            .
          </p>
        </section>
      </main>

      <footer className="mt-10 border-t border-line">
        <div className="mx-auto flex w-full max-w-[680px] flex-col items-start justify-between gap-1.5 px-5 py-5 text-[9px] text-muted sm:flex-row sm:items-center sm:px-6">
          <p>© 2026 {site.name}</p>
          <p>Built with Next.js, TypeScript &amp; Tailwind CSS</p>
          <a
            href="https://github.com/ANURAGYADAV008/portfolio"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            This website is open source ↗
          </a>
        </div>
      </footer>
    </>
  );
}
