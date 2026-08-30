import { useState } from "react";
import {
  Building2,
  Calendar,
  ChevronDown,
  Code2,
  Download,
  ExternalLink,
  Globe,
  Layers,
  Link2,
  Server,
  Shield,
  TrendingUp,
  UserRound,
} from "lucide-react";
import type { ExperienceRole, SectionId } from "../../data/portfolio";
import { portfolio } from "../../data/portfolio";
import { highlightMetric } from "../previews/CardPreviews";
import { ConnectBadges, ConnectDetails } from "./ConnectDetails";
import { GlanceBadges, GlanceDetails } from "./GlanceDetails";
import { ProjectsBadges, ProjectsDetails } from "./ProjectsDetails";
import { StrengthsBadges, StrengthsDetails } from "./StrengthsDetails";

const ACHIEVEMENT_ICONS = {
  trend: TrendingUp,
  shield: Shield,
  layers: Layers,
  code: Server,
};

interface SectionDetailsProps {
  section: SectionId;
  onOpenSection: (id: SectionId) => void;
}

export function sectionSummary(section: SectionId) {
  switch (section) {
    case "glance":
      return "A quick recruiter-friendly snapshot";
    case "experience":
      return `${portfolio.profile.yearsLabel} building reliable backend and platform systems.`;
    case "projects":
      return "Selected work with clear problems, contributions, and outcomes.";
    case "strengths":
      return "Capabilities I apply to real engineering problems";
    case "howIWork":
      return "How I show up on a team once the interview is over.";
    case "connect":
      return "Have a role where reliability matters? I would love to hear about it.";
  }
}

function RoleDetails({ role }: { role: ExperienceRole }) {
  return (
    <>
      <div className="achievements">
        {role.achievements.map((item) => {
          const Icon = ACHIEVEMENT_ICONS[item.icon];
          return (
            <div className="achievement" key={item.text}>
              <span className="achIcon">
                <Icon size={16} aria-hidden />
              </span>
              <p>{highlightMetric(item.text, item.highlight)}</p>
            </div>
          );
        })}
      </div>
      <p className="skillsLabel">Skills applied</p>
      <div className="tags">
        {role.technologies.map((tech) => (
          <span className="tag" key={tech}>
            {tech}
          </span>
        ))}
      </div>
    </>
  );
}

function ExperienceTimeline() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="split">
      <div className="expTimeline">
        {portfolio.experience.map((role) => {
          const expanded = role.current || openId === role.id;
          const CompanyIcon = role.current ? Building2 : Server;
          return (
            <article className={`expNode ${role.current ? "is-current" : ""}`} key={role.id}>
              <span className="expDot" aria-hidden />
              <div className="jobTop">
                <span className={`companyMark ${role.current ? "currentCo" : "prevCo"}`}>
                  <CompanyIcon size={16} aria-hidden />
                </span>
                <div className="jobMeta">
                  <div className="jobTitleRow">
                    <h3>{role.role}</h3>
                    {role.current ? <span className="current">Current</span> : (
                      <button
                        type="button"
                        className={`btn btn-secondary roleToggle ${openId === role.id ? "is-open" : ""}`}
                        onClick={(event) => {
                          event.stopPropagation();
                          setOpenId(openId === role.id ? null : role.id);
                        }}
                      >
                        {openId === role.id ? "Hide role details" : "Show role details"}
                        <ChevronDown size={16} aria-hidden />
                      </button>
                    )}
                  </div>
                  <div className="companyLine">
                    {role.companyUrl ? (
                      <a className="company" href={role.companyUrl} target="_blank" rel="noreferrer">
                        {role.company}
                      </a>
                    ) : (
                      <p className="company">{role.company}</p>
                    )}
                    <p className="dates">
                      <Calendar size={14} aria-hidden />
                      {role.dates}
                    </p>
                  </div>
                </div>
              </div>
              <p className="kicker">{role.summary}</p>
              {expanded ? <RoleDetails role={role} /> : null}
            </article>
          );
        })}
      </div>
      <aside>
        <div className="sideCard">
          <h3>
            <UserRound size={16} aria-hidden />
            Recruiter summary
          </h3>
          <dl className="summaryList">
            <div>
              <dt>Years of experience</dt>
              <dd>{portfolio.profile.yearsLabel}</dd>
            </div>
            <div>
              <dt>Focus area</dt>
              <dd>Backend · Platform</dd>
            </div>
            <div>
              <dt>Location</dt>
              <dd>
                {portfolio.profile.location} · {portfolio.profile.timezone}
              </dd>
            </div>
            <div>
              <dt>Availability</dt>
              <dd className="availability">{portfolio.profile.availability}</dd>
            </div>
          </dl>
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
              <a href={portfolio.links.linkedin} target="_blank" rel="noreferrer">
                LinkedIn profile
                <ExternalLink size={14} aria-hidden />
              </a>
            </li>
            <li>
              <a href={portfolio.links.github} target="_blank" rel="noreferrer">
                GitHub profile
                <ExternalLink size={14} aria-hidden />
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
}

export function SectionDetails({ section, onOpenSection }: SectionDetailsProps) {
  if (section === "experience") return <ExperienceTimeline />;
  if (section === "projects") return <ProjectsDetails />;
  if (section === "glance") return <GlanceDetails />;
  if (section === "strengths") return <StrengthsDetails onOpenSection={onOpenSection} />;
  if (section === "howIWork") {
    return (
      <div className="traits">
        {portfolio.traits.map((trait) => (
          <div className="trait" key={trait.id}>
            <strong>{trait.label}</strong>
            <p>{trait.description}</p>
          </div>
        ))}
      </div>
    );
  }
  return <ConnectDetails />;
}

export function SectionBadges({ section }: { section: SectionId }) {
  if (section === "glance") return <GlanceBadges />;
  if (section === "experience") {
    return (
      <div className="focusBadges">
        <span className="focusBadge backend">
          <Code2 size={12} aria-hidden /> Backend
        </span>
        <span className="focusBadge platform">
          <Layers size={12} aria-hidden /> Platform
        </span>
        <span className="focusBadge remote">
          <Globe size={12} aria-hidden /> Remote-ready
        </span>
      </div>
    );
  }
  if (section === "projects") return <ProjectsBadges />;
  if (section === "strengths") return <StrengthsBadges />;
  if (section === "connect") return <ConnectBadges />;
  return null;
}

export function ExperienceBadges() {
  return <SectionBadges section="experience" />;
}
