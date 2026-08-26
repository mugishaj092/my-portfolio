export interface GithubContributionDay {
    date: string;
    count: number;
}

export interface GithubActivityData {
    username: string;
    profileUrl: string;
    totalContributions: number;
    dayStreak: number;
    languageCount: number;
    /** One entry per calendar week, each holding 7 slots indexed by weekday
     * (0 = Sunday). `null` marks a slot outside the year's actual range,
     * keeping every week column aligned regardless of where it starts/ends. */
    contributionWeeks: (GithubContributionDay | null)[][];
}
