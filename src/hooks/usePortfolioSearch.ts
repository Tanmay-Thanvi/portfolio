import { useMemo } from "react";
import type { SearchGroup, SearchItem } from "../data/portfolio";
import { portfolio } from "../data/portfolio";

export interface GroupedResults {
  group: SearchGroup;
  label: string;
  items: SearchItem[];
}

const GROUP_LABELS: Record<SearchGroup, string> = {
  best: "Best match",
  experience: "Experience",
  projects: "Projects",
  skills: "Skills",
  actions: "Actions",
};

function normalize(value: string) {
  return value.toLowerCase().replace(/[’']/g, "'").trim();
}

function scoreItem(item: SearchItem, tokens: string[]) {
  const haystack = normalize([item.title, item.subtitle, ...item.keywords].join(" "));
  let score = 0;
  for (const token of tokens) {
    if (normalize(item.title) === token) score += 8;
    else if (normalize(item.title).includes(token)) score += 5;
    else if (item.keywords.some((keyword) => normalize(keyword).includes(token))) score += 3;
    else if (haystack.includes(token)) score += 1;
    else return 0;
  }
  return score;
}

export function usePortfolioSearch(query: string) {
  return useMemo(() => {
    const tokens = normalize(query).split(/\s+/).filter(Boolean);
    if (tokens.length === 0) {
      return {
        groups: [
          {
            group: "actions" as const,
            label: GROUP_LABELS.actions,
            items: portfolio.searchItems.filter((item) => item.group === "actions"),
          },
          {
            group: "experience" as const,
            label: GROUP_LABELS.experience,
            items: portfolio.searchItems.filter((item) => item.group === "experience"),
          },
        ] satisfies GroupedResults[],
        count: portfolio.searchItems.filter((item) => item.group === "actions" || item.group === "experience").length,
        flat: [
          ...portfolio.searchItems.filter((item) => item.group === "actions"),
          ...portfolio.searchItems.filter((item) => item.group === "experience"),
        ],
      };
    }

    const ranked = portfolio.searchItems
      .map((item) => ({ item, score: scoreItem(item, tokens) }))
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score);

    const used = new Set<string>();
    const groups: GroupedResults[] = [];
    if (ranked[0]) {
      groups.push({
        group: "best",
        label: GROUP_LABELS.best,
        items: [ranked[0].item],
      });
      used.add(ranked[0].item.id);
    }

    (["experience", "projects", "skills", "actions"] as const).forEach((group) => {
      const items = ranked.filter((entry) => entry.item.group === group && !used.has(entry.item.id)).map((entry) => entry.item);
      if (items.length) {
        groups.push({ group, label: GROUP_LABELS[group], items });
      }
    });

    const flat = groups.flatMap((group) => group.items);
    return { groups, count: flat.length, flat };
  }, [query]);
}
