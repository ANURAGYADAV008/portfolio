import { ArrowUpRight } from "@/components/icons";
import { site } from "@/data/site";
import {
  getGitHubSnapshot,
  type ContributionDay,
} from "@/lib/github";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function buildWeeks(days: ContributionDay[]) {
  const first = days[0];
  if (!first) return [];

  const firstDay = new Date(`${first.date}T00:00:00Z`).getUTCDay();
  const padded: Array<ContributionDay | null> = [
    ...Array<null>(firstDay).fill(null),
    ...days,
  ];

  while (padded.length % 7 !== 0) {
    padded.push(null);
  }

  const weeks: Array<Array<ContributionDay | null>> = [];
  for (let index = 0; index < padded.length; index += 7) {
    weeks.push(padded.slice(index, index + 7));
  }

  return weeks;
}

function monthLabels(weeks: Array<Array<ContributionDay | null>>) {
  let previous = "";
  const labels: Array<{ index: number; label: string }> = [];

  for (const [index, week] of weeks.entries()) {
    const firstDay = week.find((day): day is ContributionDay => day !== null);
    if (!firstDay) continue;

    const month = firstDay.date.slice(5, 7);
    if (month === previous) continue;

    labels.push({
      index,
      label: MONTHS[Number(month) - 1] ?? "",
    });
    previous = month;
  }

  return labels;
}

function formatDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export async function GitHubActivity() {
  const snapshot = await getGitHubSnapshot();

  if (!snapshot) return <GitHubUnavailable />;

  const weeks = buildWeeks(snapshot.days);
  const labels = monthLabels(weeks);

  return (
    <div>
      <div
        className="overflow-x-auto pb-1"
        role="img"
        aria-label={`${snapshot.total} GitHub contributions in the last year`}
      >
        <div className="w-full min-w-[677px]">
          <div className="relative ml-11 h-4">
            {labels.map(({ index, label }) => (
              <span
                key={`${label}-${index}`}
                className="absolute top-0 font-mono text-[9px] leading-none text-muted"
                style={{ left: `${(index / weeks.length) * 100}%` }}
              >
                {label}
              </span>
            ))}
          </div>

          <div className="flex gap-3">
            <div className="grid w-8 shrink-0 grid-rows-7 gap-[3px] text-[9px] leading-[9px] text-muted">
              <span />
              <span>Mon</span>
              <span />
              <span>Wed</span>
              <span />
              <span>Fri</span>
              <span />
            </div>

            <div
              className="grid min-w-0 flex-1 gap-[3px]"
              style={{
                gridAutoFlow: "column",
                gridAutoColumns: "minmax(0, 1fr)",
                gridTemplateRows: "repeat(7, minmax(0, 1fr))",
                aspectRatio: `${weeks.length} / 7`,
              }}
            >
              {weeks.flatMap((week, weekIndex) =>
                week.map((day, dayIndex) =>
                  day ? (
                    <span
                      key={day.date}
                      title={`${day.count} contribution${
                        day.count === 1 ? "" : "s"
                      } on ${formatDate(day.date)}`}
                      className="gh-cell rounded-[2px]"
                      style={{
                        backgroundColor: `var(--gh-${day.level})`,
                      }}
                    />
                  ) : (
                    <span
                      key={`empty-${weekIndex}-${dayIndex}`}
                      className="rounded-[2px] bg-transparent"
                    />
                  ),
                ),
              )}
            </div>
          </div>
        </div>
      </div>

      <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.12em] text-muted min-[800px]:hidden">
        Swipe to see the full year →
      </p>

      <div className="mt-3 flex items-center justify-end gap-1.5">
        <span className="mr-1 font-mono text-[9px] uppercase tracking-[0.12em] text-muted">
          Less
        </span>
        {[0, 1, 2, 3, 4].map((level) => (
          <span
            key={level}
            className="size-[9px] rounded-[2px]"
            style={{ backgroundColor: `var(--gh-${level})` }}
          />
        ))}
        <span className="ml-1 font-mono text-[9px] uppercase tracking-[0.12em] text-muted">
          More
        </span>
      </div>
    </div>
  );
}

function GitHubUnavailable() {
  return (
    <div className="border-y border-line py-6 text-center">
      <p className="text-sm text-muted">
        The contribution graph couldn&apos;t load right now.
      </p>
      <a
        href={site.githubUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-2 inline-flex items-center gap-1 border-b border-line-strong/70 pb-0.5 text-xs font-medium text-ink transition-colors hover:border-accent hover:text-accent"
      >
        View GitHub profile
        <ArrowUpRight className="size-3" />
      </a>
    </div>
  );
}

export function GitHubSkeleton() {
  return (
    <div className="border-y border-line py-5">
      <div className="h-24 w-full animate-pulse rounded bg-line/40" />
    </div>
  );
}
