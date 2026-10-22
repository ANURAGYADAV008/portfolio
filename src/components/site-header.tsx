import { ThemeToggle } from "@/components/theme-toggle";
import { site } from "@/data/site";

const links = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "GitHub", href: "#github" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper px-5">
      <div className="mx-auto flex h-16 w-full max-w-[800px] items-center justify-between gap-2 sm:gap-4">
        <a
          href="#top"
          className="group flex items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          aria-label={`${site.name} — back to top`}
        >
          <span className="flex size-8 items-center justify-center rounded-full border border-line-strong font-display text-sm leading-none text-ink transition-colors group-hover:border-accent group-hover:text-accent">
            {site.monogram}
          </span>
          <span className="hidden text-sm font-medium tracking-tight text-ink sm:block">
            {site.name}
          </span>
        </a>

        <div className="flex items-center gap-2 sm:gap-6">
          <nav
            aria-label="Sections"
            className="flex items-center gap-2 sm:gap-5"
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted transition-colors hover:text-ink sm:text-[11px]"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <span className="hidden h-4 w-px bg-line sm:block" aria-hidden="true" />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
