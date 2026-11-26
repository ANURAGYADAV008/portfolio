import Image from "next/image";
import { Fragment, Suspense } from "react";
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

      <main id="top" className="mx-auto w-full max-w-[704px] px-4 sm:px-8">
        <section id="about" className="pt-6 sm:pt-8">
          <div className="profile-avatar mb-5">
            <span className="profile-avatar__inner">
              <Image
                src="/avatar.png"
                alt={`${site.name} — profile`}
                width={64}
                height={64}
                priority
                className="size-full object-cover"
              />
            </span>
            <span className="profile-avatar__dot" aria-hidden="true" />
          </div>

          <h1 className="text-[20px] font-semibold leading-tight tracking-[-0.01em] text-ink sm:text-[24px]">
            Hey, I&apos;m{" "}
            <span className="rounded-[3px] bg-orange-100 py-0.5 pl-1 pr-0.5 text-orange-600 dark:bg-orange-400/15 dark:text-orange-400">
              {site.name}
            </span>
            !
          </h1>

          <div className="mt-4 space-y-2 text-[15px] leading-relaxed text-ink">
            <p>
              {site.role} based in {site.location}.
            </p>
            <p>I build backend &amp; AI systems — RAG pipelines, agents, APIs.</p>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <a
              href={site.resume}
              download="Anurag-Yadav-Resume.pdf"
              className="inline-flex h-8 items-center gap-2 rounded bg-ink px-2.5 text-[14px] font-medium text-paper transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <Download className="size-4" />
              Résumé
            </a>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex h-8 items-center gap-2 rounded border border-line bg-surface px-2.5 text-[14px] font-medium text-ink transition-colors hover:border-accent/40 hover:bg-accent-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <Mail className="size-4" />
              Send an email
            </a>
          </div>

          <p className="mt-4 flex items-center gap-2 text-[13px] text-muted">
            <span
              className="availability-dot size-2 rounded-full bg-accent"
              aria-hidden="true"
            />
            {site.availability} — let&apos;s talk!
          </p>

          <p className="mt-2 text-[13px] leading-6 text-muted">
            {site.education.degree} · {site.education.school} ·{" "}
            {site.education.period}
          </p>

          <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[12px] uppercase tracking-[0.05em] text-muted">
            {site.stats.map((stat) => (
              <li key={stat.label}>
                <span className="text-ink">{stat.value}</span> {stat.label}
              </li>
            ))}
          </ul>
        </section>

        <section id="skills" className="mt-10 border-t border-line pt-6">
          <SectionHeading
            label="Tech stack"
            description="The tools I use for personal and client work:"
          />
          <div className="mt-4">
            <SkillGrid />
          </div>
          <p className="mt-3 text-[12px] leading-5 text-muted">
            <span className="text-ink">Also:</span>{" "}
            {alsoFamiliar.map((item, index) => (
              <Fragment key={item}>
                <span className="whitespace-nowrap">{item}</span>
                {index < alsoFamiliar.length - 1 ? " · " : null}
              </Fragment>
            ))}
          </p>
        </section>

        <section id="work" className="mt-10 border-t border-line pt-6">
          <SectionHeading
            label="Projects"
            description="These are my personal projects, both live and ongoing:"
          />
          <ProjectList />
          <div className="mt-4">
            <a
              href={site.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-[13px] font-medium text-ink transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              More on GitHub
              <ArrowUpRight className="size-3" />
            </a>
          </div>
        </section>

        <section id="github" className="mt-10 border-t border-line pt-6">
          <SectionHeading label="GitHub activity" />
          <div className="mt-4">
            <Suspense fallback={<GitHubSkeleton />}>
              <GitHubActivity />
            </Suspense>
          </div>
        </section>

        <section id="social" className="mt-10 border-t border-line pt-6">
          <SectionHeading
            label="Find me on"
            description="You can find me on the following platforms:"
          />
          <SocialLinks align="start" className="mt-4" />
        </section>

        <section id="contact" className="mt-10 border-t border-line pt-6">
          <SectionHeading label="Get in touch" />
          <div className="mt-4 space-y-2 text-[15px] leading-relaxed text-muted">
            <p>
              You can reach me anytime at{" "}
              <a
                href={`mailto:${site.email}`}
                className="text-ink underline decoration-line-strong underline-offset-2 transition-colors hover:text-accent hover:decoration-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {site.email}
              </a>
              .
            </p>
            <p>
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
          </div>
        </section>
      </main>

      <footer className="mt-12 border-t border-line">
        <div className="mx-auto flex w-full max-w-[704px] flex-col items-start justify-between gap-2 px-4 py-6 text-[12px] text-muted sm:flex-row sm:items-center sm:px-8">
          <p>© 2026 {site.name}</p>
          <p>Next.js · TypeScript · Tailwind</p>
          <a
            href="https://github.com/ANURAGYADAV008/portfolio"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            Open source ↗
          </a>
        </div>
      </footer>
    </>
  );
}
