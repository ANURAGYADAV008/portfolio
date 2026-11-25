export function SectionHeading({
  label,
  description,
}: {
  label: string;
  description?: string;
}) {
  return (
    <div>
      <h2 className="text-[13px] font-medium uppercase tracking-wider text-ink">
        {label}
      </h2>
      {description ? (
        <p className="mt-2 text-[15px] leading-relaxed text-muted">
          {description}
        </p>
      ) : null}
    </div>
  );
}
