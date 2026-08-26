import { cache } from "react";

import { CONTACT_INFO } from "@/constant/resume";
import type { GithubActivityData } from "@/types/github";

const GITHUB_GRAPHQL_ENDPOINT = "https://api.github.com/graphql";
const MAX_TRACKED_REPOS = 100;

const QUERY = `
  query GithubActivity($login: String!, $repoCount: Int!) {
    user(login: $login) {
      repositories(
        ownerAffiliations: [OWNER]
        privacy: PUBLIC
        isFork: false
        first: $repoCount
      ) {
        nodes {
          primaryLanguage {
            name
          }
        }
      }
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              weekday
              contributionCount
            }
          }
        }
      }
    }
  }
`;

interface GraphQLDay {
    date: string;
    weekday: number;
    contributionCount: number;
}

interface GraphQLWeek {
    contributionDays: GraphQLDay[];
}

interface GraphQLRepoNode {
    primaryLanguage: { name: string } | null;
}

interface GraphQLResponse {
    data?: {
        user: {
            repositories: { nodes: GraphQLRepoNode[] };
            contributionsCollection: {
                contributionCalendar: {
                    totalContributions: number;
                    weeks: GraphQLWeek[];
                };
            };
        } | null;
    };
    errors?: { message: string }[];
}

/** Reads the username straight out of the same GitHub URL the footer/contact
 * links already use, so there's exactly one place this ever needs updating. */
function getUsername(): string | null {
    if (!CONTACT_INFO.githubUrl) return null;
    try {
        const path = new URL(CONTACT_INFO.githubUrl).pathname.replace(/\//g, "");
        return path || null;
    } catch {
        return null;
    }
}

/** Consecutive-day streak ending "today" (or "yesterday" if today's day
 * hasn't logged a contribution yet, since that day is still in progress). */
function calculateStreak(weeks: GraphQLWeek[]): number {
    const days = weeks.flatMap((week) => week.contributionDays);
    const today = new Date().toISOString().slice(0, 10);

    let index = days.length - 1;
    if (index >= 0 && days[index].date === today && days[index].contributionCount === 0) {
        index -= 1;
    }

    let streak = 0;
    for (; index >= 0 && days[index].contributionCount > 0; index -= 1) {
        streak += 1;
    }
    return streak;
}

function buildCalendarWeeks(weeks: GraphQLWeek[]): GithubActivityData["contributionWeeks"] {
    return weeks.map((week) => {
        const slots: GithubActivityData["contributionWeeks"][number] = Array(7).fill(null);
        for (const day of week.contributionDays) {
            slots[day.weekday] = { date: day.date, count: day.contributionCount };
        }
        return slots;
    });
}

/** Fetches live GitHub stats (contributions, day streak, languages) for
 * the GitHub Activity section. Requires a `GITHUB_TOKEN` env var — the
 * GraphQL API used for the contribution calendar has no unauthenticated
 * mode, even for public data. Returns null on any failure so the section
 * simply doesn't render rather than showing broken/fake data. */
export const getGithubActivity = cache(async (): Promise<GithubActivityData | null> => {
    const username = getUsername();
    const token = process.env.GITHUB_TOKEN;

    if (!username) return null;
    if (!token) {
        console.warn("GITHUB_TOKEN is not set — skipping the GitHub Activity section.");
        return null;
    }

    try {
        const response = await fetch(GITHUB_GRAPHQL_ENDPOINT, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query: QUERY,
                variables: { login: username, repoCount: MAX_TRACKED_REPOS },
            }),
            next: { revalidate: 3600 },
        });

        if (!response.ok) {
            console.error(`GitHub API request failed with status ${response.status}`);
            return null;
        }

        const payload = (await response.json()) as GraphQLResponse;

        if (payload.errors?.length || !payload.data?.user) {
            console.error("GitHub API returned errors:", payload.errors);
            return null;
        }

        const { user } = payload.data;
        const repoNodes = user.repositories.nodes;

        const languageCount = new Set(
            repoNodes
                .map((repo) => repo.primaryLanguage?.name)
                .filter((name): name is string => Boolean(name))
        ).size;

        return {
            username,
            profileUrl: `https://github.com/${username}`,
            totalContributions: user.contributionsCollection.contributionCalendar.totalContributions,
            dayStreak: calculateStreak(user.contributionsCollection.contributionCalendar.weeks),
            languageCount,
            contributionWeeks: buildCalendarWeeks(
                user.contributionsCollection.contributionCalendar.weeks
            ),
        };
    } catch (error) {
        console.error("Failed to fetch GitHub activity:", error);
        return null;
    }
});
