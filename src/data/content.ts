import raw from "./content.json" with { type: "json" };

export const content = raw;

export type Content = typeof content;
export type NavItem = Content["nav"][number];
export type NavId = NavItem["id"];

export function visible<T extends { visible: boolean }>(items: readonly T[]) {
  return items.filter((item) => item.visible);
}

export const nav = visible(content.nav);
