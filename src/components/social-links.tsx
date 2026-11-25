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
      className={`flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] ${
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
              data-brand={link.icon}
              className="social-inline inline-flex items-center gap-1.5 text-muted transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <SocialIcon name={link.icon} className="size-3.5" />
              <span>{link.label}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
