import Image from "next/image";
import type { SVGProps } from "react";
import { BRAND_ICONS, type BrandIconSlug } from "@/data/brand-icons";
import type { SkillIconName } from "@/data/skills";
import type { SocialIcon as SocialIconName } from "@/data/site";

type IconProps = SVGProps<SVGSVGElement>;

const strokeProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function ArrowUpRight({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      {...strokeProps}
      {...props}
    >
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

export function ArrowDown({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      {...strokeProps}
      {...props}
    >
      <path d="M12 4v16" />
      <path d="m19 13-7 7-7-7" />
    </svg>
  );
}

export function Download({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      {...strokeProps}
      {...props}
    >
      <path d="M12 3v12" />
      <path d="m7 10 5 5 5-5" />
      <path d="M5 21h14" />
    </svg>
  );
}

export function Mail({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      {...strokeProps}
      {...props}
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

export function Sun({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      {...strokeProps}
      {...props}
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42" />
    </svg>
  );
}

export function Moon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      {...strokeProps}
      {...props}
    >
      <path d="M20.5 14.1A8.5 8.5 0 0 1 9.9 3.5 8.5 8.5 0 1 0 20.5 14.1Z" />
    </svg>
  );
}

export function GraduationCap({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      {...strokeProps}
      {...props}
    >
      <path d="m2 9 10-5 10 5-10 5L2 9Z" />
      <path d="M6 11v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5" />
      <path d="M22 9v6" />
    </svg>
  );
}

export function Layers({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      {...strokeProps}
      {...props}
    >
      <path d="m12 2 9 5-9 5-9-5 9-5Z" />
      <path d="m3 12 9 5 9-5" />
      <path d="m3 17 9 5 9-5" />
    </svg>
  );
}

export function BrandIcon({
  slug,
  className,
}: {
  slug: BrandIconSlug;
  className?: string;
}) {
  const icon = BRAND_ICONS[slug];

  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d={icon.path} />
    </svg>
  );
}

const DARK_INVERTED_SKILL_ICONS = new Set<SkillIconName>([
  "nextdotjs",
  "express",
  "github",
  "vercel",
]);

export function SkillIcon({
  name,
  className,
}: {
  name: SkillIconName;
  className?: string;
}) {
  return (
    <Image
      src={`/skills/${name}.svg`}
      alt=""
      width={16}
      height={16}
      unoptimized
      className={[
        "size-4 shrink-0 object-contain transition-transform duration-150 group-hover/skill:scale-110",
        DARK_INVERTED_SKILL_ICONS.has(name) ? "dark:invert" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );
}

export function SocialIcon({
  name,
  className,
}: {
  name: SocialIconName;
  className?: string;
}) {
  if (name === "mail") {
    return <Mail className={className} />;
  }

  return <BrandIcon slug={name} className={className} />;
}
