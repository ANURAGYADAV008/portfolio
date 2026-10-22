export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
}: {
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <p className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
        <span className="h-px w-4 bg-line-strong" aria-hidden="true" />
        <span>
          <span className="text-accent">{index}</span> / {eyebrow}
        </span>
        <span className="h-px w-4 bg-line-strong" aria-hidden="true" />
      </p>
      <h2 className="mt-2 max-w-2xl text-balance font-display text-2xl leading-[1.05] tracking-[-0.01em] text-ink sm:text-3xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-2 max-w-xl text-balance text-xs leading-5 text-muted">
          {description}
        </p>
      ) : null}
    </div>
  );
}
