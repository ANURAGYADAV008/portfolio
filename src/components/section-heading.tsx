export function SectionHeading({
  label,
  description,
}: {
  label: string;
  description?: string;
}) {
  return (
    <div>
      <h2 className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-ink">
        {label}
      </h2>
      {description ? (
        <p className="mt-2 text-[12px] leading-5 text-muted">{description}</p>
      ) : null}
    </div>
  );
}
