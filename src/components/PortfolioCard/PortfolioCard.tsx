import type { ReactNode } from "react";
import { ChevronRight, Maximize2 } from "lucide-react";
import type { SectionId } from "../../data/portfolio";
import { SECTION_PREVIEWS, SECTION_TITLES } from "../../data/portfolio";

interface PortfolioCardProps {
  id: SectionId;
  icon: ReactNode;
  accent?: "primary" | "experience" | "project";
  title?: string;
  children: ReactNode;
  expandable?: boolean;
  onOpen: (id: SectionId) => void;
}

export function PortfolioCard({
  id,
  icon,
  accent = "primary",
  title,
  children,
  expandable = true,
  onOpen,
}: PortfolioCardProps) {
  const heading = title ?? SECTION_TITLES[id];
  const open = () => onOpen(id);

  return (
    <article className={id === "experience" ? "span-experience" : undefined}>
      {expandable ? (
        <div
          className="expandable-card"
          role="button"
          tabIndex={0}
          onClick={open}
          onKeyDown={(event) => {
            if (event.target !== event.currentTarget) return;
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              open();
            }
          }}
          aria-label={`${heading}. ${SECTION_PREVIEWS[id]}`}
        >
          <div className="expandable-card-body">
            <div className="card-head">
              <div className={`card-title-row ${accent}`}>
                <span className={`card-icon ${accent}`}>{icon}</span>
                <h2>{heading}</h2>
              </div>
              <span className="expand-icon">
                <Maximize2 size={20} strokeWidth={2.25} aria-hidden />
              </span>
            </div>
            {children}
          </div>
          <span className="card-action">
            {SECTION_PREVIEWS[id]}
            <ChevronRight size={16} aria-hidden />
          </span>
        </div>
      ) : (
        <div className="card static-card">
          <div className="expandable-card-body">
            <div className="card-head">
              <div className={`card-title-row ${accent}`}>
                <span className={`card-icon ${accent}`}>{icon}</span>
                <h2>{heading}</h2>
              </div>
            </div>
            {children}
          </div>
        </div>
      )}
    </article>
  );
}
