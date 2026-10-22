import { cacheLife } from "next/cache";

const GITHUB_USER = "ANURAGYADAV008";
const REQUEST_TIMEOUT = 12_000;

export type ContributionDay = {
  date: string;
  count: number;
  level: number;
};

export type GitHubSnapshot = {
  days: ContributionDay[];
  total: number;
  publicRepos: number | null;
  followers: number | null;
};

type ContributionsResponse = {
  total?: { lastYear?: number };
  contributions?: Array<{
    date?: unknown;
    count?: unknown;
    level?: unknown;
  }>;
};

type ProfileResponse = {
  public_repos?: unknown;
  followers?: unknown;
};

export async function getGitHubSnapshot(): Promise<GitHubSnapshot | null> {
  "use cache";
  cacheLife("hours");

  try {
    const [contributionsResponse, profileResponse] = await Promise.all([
      fetch(
        `https://github-contributions-api.jogruber.de/v4/${GITHUB_USER}?y=last`,
        {
          headers: { Accept: "application/json" },
          signal: AbortSignal.timeout(REQUEST_TIMEOUT),
        },
      ),
      fetch(`https://api.github.com/users/${GITHUB_USER}`, {
        headers: {
          Accept: "application/vnd.github+json",
          "User-Agent": "anurag-yadav-portfolio",
        },
        signal: AbortSignal.timeout(REQUEST_TIMEOUT),
      }),
    ]);

    if (!contributionsResponse.ok) return null;

    const contributions = (await contributionsResponse.json()) as ContributionsResponse;
    const days = (contributions.contributions ?? [])
      .filter(
        (day): day is { date: string; count: number; level: number } =>
          typeof day.date === "string" &&
          typeof day.count === "number" &&
          typeof day.level === "number",
      )
      .map((day) => ({
        date: day.date,
        count: day.count,
        level: Math.min(4, Math.max(0, Math.round(day.level))),
      }));

    if (days.length === 0) return null;

    let profile: ProfileResponse | null = null;
    if (profileResponse.ok) {
      profile = (await profileResponse.json()) as ProfileResponse;
    }

    return {
      days,
      total:
        typeof contributions.total?.lastYear === "number"
          ? contributions.total.lastYear
          : days.reduce((sum, day) => sum + day.count, 0),
      publicRepos:
        typeof profile?.public_repos === "number" ? profile.public_repos : null,
      followers:
        typeof profile?.followers === "number" ? profile.followers : null,
    };
  } catch {
    return null;
  }
}
