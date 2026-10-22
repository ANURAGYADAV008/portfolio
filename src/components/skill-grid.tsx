import { SkillIcon } from "@/components/icons";
import { skillGroups } from "@/data/skills";

export function SkillGrid() {
  return (
    <div className="mt-5 divide-y divide-line border-y border-line">
      {skillGroups.map((group) => (
        <section
          key={group.label}
          className="grid gap-2 py-3 sm:grid-cols-[7.5rem_1fr] sm:gap-6 sm:py-4"
        >
          <div className="flex items-baseline justify-between gap-3 sm:block">
            <h3 className="text-[13px] font-medium leading-5 text-ink">
              {group.label}
            </h3>
            <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted sm:mt-0.5">
              {group.caption}
            </p>
          </div>

          <ul className="flex flex-wrap items-center gap-x-3.5 gap-y-2">
            {group.skills.map((skill) => (
              <li
                key={skill.name}
                className="group/skill flex items-center gap-1.5 text-xs text-muted"
              >
                <SkillIcon name={skill.icon} />
                <span className="text-ink">{skill.name}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
