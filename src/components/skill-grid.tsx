import { SkillIcon } from "@/components/icons";
import { skillGroups } from "@/data/skills";

const seen = new Set<string>();

const skills = skillGroups
  .flatMap((group) => group.skills)
  .filter((skill) => {
    if (seen.has(skill.name)) return false;
    seen.add(skill.name);
    return true;
  });

export function SkillGrid() {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {skills.map((skill) => (
        <li key={skill.name}>
          <span className="inline-flex items-center gap-1.5 rounded-md border border-line bg-surface px-2 py-1.5 text-[12px] leading-none text-muted transition-colors hover:border-accent/35 hover:text-ink">
            <SkillIcon name={skill.icon} />
            <span>{skill.name}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}
