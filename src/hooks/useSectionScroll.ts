import { useEffect, useState, type RefObject } from "react";
import { nav, type NavId } from "../data/content";

export function useSectionScroll(containerRef: RefObject<HTMLElement | null>) {
  const [active, setActive] = useState<NavId>(nav[0]?.id ?? "experience");

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const nodes = nav
      .map((item) => root.querySelector(`#${item.id}`))
      .filter((node): node is HTMLElement => node instanceof HTMLElement);
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visibleEntry?.target.id) setActive(visibleEntry.target.id as NavId);
      },
      { root, rootMargin: "-20% 0px -55% 0px", threshold: [0.15, 0.4, 0.7] },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [containerRef]);

  const scrollTo = (id: NavId) => {
    const root = containerRef.current;
    const target = root?.querySelector(`#${id}`);
    if (!(target instanceof HTMLElement) || !root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const top = target.getBoundingClientRect().top - root.getBoundingClientRect().top + root.scrollTop - 12;
    root.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
    setActive(id);
    target.classList.add("is-landed");
    window.setTimeout(() => target.classList.remove("is-landed"), 700);
  };

  return { active, scrollTo };
}
