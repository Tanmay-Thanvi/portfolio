import {
  ChevronRight,
  Cloud,
  Code2,
  Download,
  Globe,
  Layers,
  Link2,
  Server,
  Sparkles,
  Target,
  Users,
  UserRound,
} from "lucide-react";
import type { SectionId } from "../../data/portfolio";
import { portfolio } from "../../data/portfolio";

const STRENGTH_ICONS = {
  "api-design": Code2,
  "distributed-systems": Layers,
  "cloud-infrastructure": Cloud,
  collaboration: Users,
};

interface StrengthsDetailsProps {
  onOpenSection: (id: SectionId) => void;
}

export function StrengthsDetails({ onOpenSection }: StrengthsDetailsProps) {
  return (
    <div className="split">
      <div className="modalStack">
        <div className="strengthGrid">
          {portfolio.strengths.map((strength) => {
            const Icon = STRENGTH_ICONS[strength.id as keyof typeof STRENGTH_ICONS] ?? Sparkles;
            return (
              <article className="strengthCard" key={strength.id}>
                <span className="achIcon">
                  <Icon size={16} aria-hidden />
                </span>
                <h3>{strength.label}</h3>
                <p>{strength.description}</p>
                <p className="applyLine">
                  <strong>How I apply it. </strong>
                  {strength.apply}
                </p>
                <div className="tags">
                  {strength.tags.map((tag) => (
                    <span className="tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
        <section>
          <p className="sectionLabel">Supporting toolkit</p>
          <div className="tags">
            {portfolio.toolkit.map((item) => (
              <span className="tag" key={item}>
                {item}
              </span>
            ))}
          </div>
        </section>
      </div>
      <aside>
        <div className="sideCard">
          <h3>
            <UserRound size={16} aria-hidden />
            Strength profile
          </h3>
          <dl className="summaryList">
            {portfolio.strengthProfile.map((row) => (
              <div key={row.label}>
                <dt>{row.label}</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="sideCard">
          <h3>
            <Target size={16} aria-hidden />
            Best-fit problems
          </h3>
          <ul className="noticeList">
            {portfolio.bestFit.map((item) => (
              <li key={item}>
                <ChevronRight size={14} aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="sideCard">
          <h3>
            <Link2 size={16} aria-hidden />
            Relevant links
          </h3>
          <ul className="linkList">
            <li>
              <a href={portfolio.links.resume}>
                <Download size={15} aria-hidden />
                Resume (PDF)
              </a>
            </li>
            <li>
              <button type="button" className="textLink" onClick={() => onOpenSection("experience")}>
                Experience
                <ChevronRight size={14} aria-hidden />
              </button>
            </li>
            <li>
              <button type="button" className="textLink" onClick={() => onOpenSection("projects")}>
                Projects
                <ChevronRight size={14} aria-hidden />
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
}

export function StrengthsBadges() {
  return (
    <div className="focusBadges">
      <span className="focusBadge backend">
        <Globe size={12} aria-hidden /> Systems thinking
      </span>
      <span className="focusBadge platform">
        <Server size={12} aria-hidden /> Backend
      </span>
      <span className="focusBadge cloud">
        <Cloud size={12} aria-hidden /> Cloud
      </span>
    </div>
  );
}
