import { SkillIcon } from "@/components/icons";
import { skillGroups } from "@/data/skills";

export function SkillGrid() {
  return (
    <div className="space-y-4">
      {skillGroups.map((group) => (
        <div key={group.label}>
          <p className="text-[11px] tracking-[0.04em] text-muted/60">
            {group.label.toLowerCase()}
          </p>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {group.skills.map((skill) => (
              <li key={skill.name}>
                <span className="inline-flex items-center gap-1.5 rounded-md border border-line bg-surface px-2 py-1.5 text-[12px] leading-none text-muted transition-colors hover:border-accent/35 hover:text-ink">
                  <SkillIcon name={skill.icon} />
                  <span>{skill.name}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
