import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { site } from "@/data/site";

export function SiteNav() {
  return (
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
      <Link
        href="/projects"
        className="text-nn-muted transition-colors hover:text-nn-fg"
      >
        projects →
      </Link>
      <ThemeToggle />
    </nav>
  );
}
