import { SocialIcon } from "@/components/icons";
import { socials } from "@/data/site";

export function SocialLinks({
  className = "",
  align = "center",
}: {
  className?: string;
  align?: "center" | "start";
}) {
  return (
    <ul
      className={`flex flex-wrap items-center gap-2 ${
        align === "start" ? "justify-start" : "justify-center"
      } ${className}`}
    >
      {socials.map((link) => {
        const external = link.href.startsWith("http");

        return (
          <li key={link.label}>
            <a
              href={link.href}
              target={external ? "_blank" : undefined}
              rel={external ? "noreferrer" : undefined}
              aria-label={link.label}
              title={link.label}
              className="flex size-9 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-line-strong hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <SocialIcon name={link.icon} className="size-3.5" />
              <span className="sr-only">{link.label}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
