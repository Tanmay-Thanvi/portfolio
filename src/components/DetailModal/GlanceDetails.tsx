import {
  Briefcase,
  Code2,
  Download,
  ExternalLink,
  Layers,
  Mail,
  MapPin,
  Server,
  Shield,
  TrendingUp,
  Users,
  UserRound,
} from "lucide-react";
import { portfolio } from "../../data/portfolio";
import { DottedWorldMap } from "../LocationCard/DottedWorldMap";

const BRING_ICONS = {
  shield: Shield,
  code: Code2,
  trend: TrendingUp,
  users: Users,
};

export function GlanceDetails() {
  return (
    <div className="split">
      <div className="modalStack">
        <section>
          <p className="sectionLabel">Professional snapshot</p>
          <ul className="list">
            <li className="listItem">
              <span className="glanceIcon">
                <UserRound size={18} aria-hidden />
              </span>
              <div>
                <strong>{portfolio.profile.yearsLabel}</strong>
                <span>{portfolio.profile.yearsDetail}</span>
              </div>
            </li>
            <li className="listItem">
              <span className="glanceIcon">
                <Server size={18} aria-hidden />
              </span>
              <div>
                <strong>{portfolio.profile.focus}</strong>
                <span>{portfolio.profile.focusDetail}</span>
              </div>
            </li>
            <li className="listItem">
              <span className="glanceIcon">
                <Briefcase size={18} aria-hidden />
              </span>
              <div>
                <strong>{portfolio.profile.availability}</strong>
                <span>Current status</span>
              </div>
            </li>
          </ul>
        </section>
        <div className="sideCard">
          <h3>Education</h3>
          <div className="eduRow">
            <strong>{portfolio.education.degree}</strong>
            <span>{portfolio.education.score}</span>
          </div>
          <div className="eduRow">
            <span>{portfolio.education.institution}</span>
            <span>{portfolio.education.datesShort}</span>
          </div>
        </div>
        <section>
          <p className="sectionLabel">What I bring</p>
          <div className="bringGrid">
            {portfolio.bring.map((item) => {
              const Icon = BRING_ICONS[item.icon];
              return (
                <article className="bringCard" key={item.id}>
                  <span className="achIcon">
                    <Icon size={16} aria-hidden />
                  </span>
                  <strong>{item.label}</strong>
                  <p>{item.description}</p>
                </article>
              );
            })}
          </div>
        </section>
        <section>
          <p className="sectionLabel">Role preferences</p>
          <div className="prefTags">
            {portfolio.rolePreferences.map((pref) => (
              <span className="prefTag" key={pref}>
                {pref}
              </span>
            ))}
          </div>
        </section>
      </div>
      <aside>
        <div className="sideCard">
          <h3>
            <UserRound size={16} aria-hidden />
            Candidate summary
          </h3>
          <dl className="summaryList">
            <div>
              <dt>Role</dt>
              <dd>Software Engineer</dd>
            </div>
            <div>
              <dt>Experience</dt>
              <dd>{portfolio.profile.yearsLabel}</dd>
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
        <div className="sideCard mapCard">
          <DottedWorldMap className="miniMap" />
          <p className="mapCaption">
            <MapPin size={14} aria-hidden />
            {portfolio.profile.city}, {portfolio.profile.location}
          </p>
        </div>
        <div className="sideCard">
          <h3>Quick links</h3>
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
            <li>
              <a href={`mailto:${portfolio.links.email}`}>
                <Mail size={15} aria-hidden />
                Email
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
}

export function GlanceBadges() {
  return (
    <div className="focusBadges">
      <span className="focusBadge backend">
        <Code2 size={12} aria-hidden /> Backend
      </span>
      <span className="focusBadge platform">
        <Layers size={12} aria-hidden /> Platform
      </span>
      <span className="focusBadge india">
        <MapPin size={12} aria-hidden /> India
      </span>
      <span className="focusBadge remote">
        Remote-ready
      </span>
    </div>
  );
}
