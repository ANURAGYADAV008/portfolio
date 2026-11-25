import { ThemeToggle } from "@/components/theme-toggle";
import { site } from "@/data/site";

const links = [
  { label: "Stack", href: "#skills" },
  { label: "Projects", href: "#work" },
  { label: "Contact", href: "#contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-paper/85 backdrop-blur-xl">
      <div className="mx-auto flex h-12 w-full max-w-[680px] items-center justify-between px-5 sm:px-6">
        <a
          href="#top"
          className="font-mono text-[11px] tracking-[0.04em] text-muted transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          aria-label={`${site.name} — back to top`}
        >
          <span className="text-accent">{"//"}</span> {site.monogram}
        </a>

        <div className="flex items-center gap-4">
          <nav aria-label="Sections" className="hidden items-center gap-4 sm:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[10px] tracking-wide text-muted transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
