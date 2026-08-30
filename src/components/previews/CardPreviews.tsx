import {
  BookOpen,
  Briefcase,
  Calendar,
  Layers,
  MessageSquareText,
  Server,
  Shield,
  ShieldCheck,
  TrendingUp,
  UserRound,
} from "lucide-react";
import type { ReactNode } from "react";
import { EmailMark, GitHubMark, LinkedInMark } from "../BrandMarks";
import { portfolio } from "../../data/portfolio";

const ACHIEVEMENT_ICONS = {
  trend: TrendingUp,
  shield: Shield,
  layers: Layers,
  code: Server,
};

function GlanceIcon({ children }: { children: ReactNode }) {
  return <span className="glanceIcon">{children}</span>;
}

export function GlancePreview() {
  return (
    <ul className="list">
      <li className="listItem">
        <GlanceIcon>
          <UserRound size={18} fill="currentColor" strokeWidth={0} aria-hidden />
        </GlanceIcon>
        <div>
          <strong>{portfolio.profile.yearsLabel}</strong>
          <span>{portfolio.profile.yearsDetail}</span>
        </div>
      </li>
      <li className="listItem">
        <GlanceIcon>
          <Server size={18} fill="currentColor" strokeWidth={1.25} aria-hidden />
        </GlanceIcon>
        <div>
          <strong>{portfolio.profile.focus}</strong>
          <span>{portfolio.profile.focusDetail}</span>
        </div>
      </li>
      <li className="listItem">
        <GlanceIcon>
          <Briefcase size={18} fill="currentColor" strokeWidth={1.25} aria-hidden />
        </GlanceIcon>
        <div>
          <strong>{portfolio.profile.availability}</strong>
          <span>{portfolio.profile.availabilityDetail}</span>
        </div>
      </li>
    </ul>
  );
}

export function ExperiencePreview() {
  const snaps = [
    ...portfolio.experience[0].achievements.slice(0, 2),
    ...portfolio.experience.slice(1).flatMap((role) => role.achievements).slice(0, 1),
  ];
  const companies = portfolio.experience.map((role) => role.company).join(" · ");
  return (
    <div>
      <div className="roleHead">
        <div>
          <h3>Software Engineer</h3>
          <p className="company">{companies}</p>
        </div>
        <p className="dates">
          <Calendar size={14} aria-hidden />
          2024 – Present
        </p>
      </div>
      <ul className="list" style={{ marginTop: 14 }}>
        {snaps.map((item) => {
          const Icon = ACHIEVEMENT_ICONS[item.icon];
          return (
            <li className="listItem" key={item.text}>
              <Icon size={18} color="var(--primary)" aria-hidden />
              <span style={{ color: "var(--text)" }}>{item.text}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function ProjectsPreview() {
  return (
    <div>
      {portfolio.projects.slice(0, 1).map((project) => (
        <div className="project" key={project.id}>
          <h3>{project.name}</h3>
          <p className="metaLine">Role · {project.role}</p>
          <p className="metaLine">Contribution · {project.contribution}</p>
          <p className="metaLine">Outcome · {project.outcome}</p>
        </div>
      ))}
    </div>
  );
}

export function StrengthsPreview() {
  return (
    <ul className="list">
      {portfolio.strengths.map((strength) => (
        <li className="listItem" key={strength.id}>
          <Layers size={16} color="var(--primary)" aria-hidden />
          <strong>{strength.label}</strong>
        </li>
      ))}
    </ul>
  );
}

const TRAIT_ICONS = {
  ownership: UserRound,
  clarity: MessageSquareText,
  reliability: ShieldCheck,
  learning: BookOpen,
};

export function HowIWorkPreview() {
  return (
    <div className="traits">
      {portfolio.traits.map((trait) => {
        const Icon = TRAIT_ICONS[trait.id as keyof typeof TRAIT_ICONS] ?? Layers;
        return (
          <div className="trait" key={trait.id}>
            <span className="traitIcon">
              <Icon size={28} strokeWidth={1.6} aria-hidden />
            </span>
            <strong>{trait.label}</strong>
            <p>{trait.description}</p>
          </div>
        );
      })}
    </div>
  );
}

function stopCardOpen(event: { stopPropagation: () => void }) {
  event.stopPropagation();
}

export function ConnectPreview() {
  return (
    <div className="connect">
      <a href={`mailto:${portfolio.links.email}`} onClick={stopCardOpen}>
        <EmailMark size={18} />
        {portfolio.links.email}
      </a>
      <a href={portfolio.links.linkedin} target="_blank" rel="noreferrer" onClick={stopCardOpen}>
        <LinkedInMark size={18} />
        LinkedIn
      </a>
      <a href={portfolio.links.github} target="_blank" rel="noreferrer" onClick={stopCardOpen}>
        <span className="brandMark inline github">
          <GitHubMark size={18} />
        </span>
        GitHub
      </a>
      <span className="btn btn-primary schedule">Send a message</span>
      <p className="reply">{portfolio.replyNote}</p>
    </div>
  );
}

export function highlightMetric(text: string, highlight?: string) {
  if (!highlight) return text;
  const index = text.indexOf(highlight);
  if (index === -1) return text;
  return (
    <>
      {text.slice(0, index)}
      <span className="metric">{highlight}</span>
      {text.slice(index + highlight.length)}
    </>
  );
}
