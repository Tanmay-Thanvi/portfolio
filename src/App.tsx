import { useEffect, useRef } from "react";
import { Calendar, Clock, Download, ExternalLink, FileText, Mail, MapPin, Star } from "lucide-react";
import { EmailMark, GitHubMark, LinkedInMark } from "./components/BrandMarks";
import { ThemeToggle } from "./components/ThemeToggle/ThemeToggle";
import { content, nav, visible } from "./data/content";
import { useSectionScroll } from "./hooks/useSectionScroll";
import { useTheme } from "./hooks/useTheme";

const SOCIALS = [
  { key: "linkedin" as const, Icon: LinkedInMark },
  { key: "github" as const, Icon: GitHubMark },
  { key: "email" as const, Icon: EmailMark },
];

const META_ICONS = {
  mail: Mail,
  map: MapPin,
  clock: Clock,
};

function Mark({ logoUrl, mark, alt }: { logoUrl: string; mark: string; alt: string }) {
  if (logoUrl) {
    return <img className="company-logo" src={logoUrl} alt={alt} />;
  }
  return <span className="company-mark">{mark}</span>;
}

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const scrollRef = useRef<HTMLElement>(null);
  const { active, scrollTo } = useSectionScroll(scrollRef);
  const jobs = visible(content.experience);
  const schools = visible(content.education);
  const work = visible(content.work);
  const leadership = visible(content.leadership);
  const certifications = visible(content.certifications);
  const showLeadership = nav.some((item) => item.id === "leadership");
  const showCerts = nav.some((item) => item.id === "certifications");
  const pageSkills = content.skillsOnPage;

  useEffect(() => {
    document.title = content.site.title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", content.site.description);
  }, []);

  return (
    <div className="page">
      <div className="shell">
      <aside className="rail">
        <div className="rail-top">
          <div className="identity">
            <span className="mark">{content.identity.initials}</span>
            <h1>{content.identity.name}</h1>
            <p className="role-pill">{content.identity.title}</p>
          </div>
          <div className="rail-divider" />
          <dl className="meta">
            {visible(content.rail.meta).map((row) => {
              const Icon = META_ICONS[row.icon as keyof typeof META_ICONS] ?? Mail;
              return (
                <div className="meta-row" key={row.id}>
                  <Icon size={18} strokeWidth={1.8} aria-hidden />
                  <div>
                    <dt>{row.label}</dt>
                    <dd>{row.value}</dd>
                  </div>
                </div>
              );
            })}
          </dl>
          <a className="resume-btn" href={content.links.resume.href}>
            <FileText size={16} aria-hidden />
            {content.links.resume.label}
          </a>
        </div>
        <div className="socials">
          {SOCIALS.map(({ key, Icon }) => {
            const link = content.links[key];
            return (
              <a
                key={key}
                href={link.href}
                target={key === "email" ? undefined : "_blank"}
                rel={key === "email" ? undefined : "noreferrer"}
              >
                <Icon size={18} />
                {link.label}
                <ExternalLink size={14} aria-hidden />
              </a>
            );
          })}
        </div>
      </aside>

      <section className="pane">
        <div className="pane-head">
          <span />
          <nav className="nav" aria-label="Resume sections">
            {nav.map((item) => (
              <button
                key={item.id}
                type="button"
                className={active === item.id ? "is-active" : undefined}
                onClick={() => scrollTo(item.id)}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </div>
        <div className="pane-divider" />

        <article className="scroll" ref={scrollRef}>
          <section className="section" id="experience">
            <h2>Experience</h2>
            {jobs.map((job) => (
              <div className="entry" key={job.id}>
                <Mark logoUrl={job.logoUrl} mark={job.mark} alt={job.company} />
                <div>
                  <div className="entry-top">
                    <h3>{job.company}</h3>
                    <span className="when">
                      <Calendar size={14} strokeWidth={1.8} aria-hidden />
                      {job.dates}
                    </span>
                  </div>
                  <p className="role">{job.role}</p>
                  <p className="desc">{job.summary}</p>
                  <div className="pills">
                    {job.stack.map((item) => (
                      <span className="pill" key={item}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </section>

          <section className="section" id="skills">
            <h2>Skills</h2>
            <div className="pills">
              {pageSkills.map((item) => (
                <span className="pill" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </section>

          <section className="section" id="education">
            <h2>Education</h2>
            {schools.map((school) => (
              <div className="entry" key={school.id}>
                <Mark logoUrl={school.logoUrl} mark={school.mark} alt={school.school} />
                <div>
                  <div className="entry-top">
                    <h3>{school.school}</h3>
                    <span className="when">
                      <Calendar size={14} strokeWidth={1.8} aria-hidden />
                      {school.dates}
                    </span>
                  </div>
                  <p className="role">{school.degree}</p>
                  <p className="score">
                    <Star size={14} strokeWidth={1.8} aria-hidden />
                    {school.score}
                  </p>
                </div>
              </div>
            ))}
          </section>

          <section className="section" id="work">
            <h2>Work</h2>
            {work.map((item) => (
              <div className="entry" key={item.id}>
                <Mark logoUrl={item.logoUrl} mark={item.name.charAt(0)} alt={item.name} />
                <div>
                  <h3>{item.name}</h3>
                  <p className="role">{item.role}</p>
                  <p className="desc">{item.text}</p>
                  <div className="pills">
                    {item.stack.map((tech) => (
                      <span className="pill" key={tech}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </section>

          {showLeadership && (
            <section className="section" id="leadership">
              <h2>Leadership</h2>
              {leadership.map((item) => (
                <div className="entry" key={item.id}>
                  {item.logoUrl ? <Mark logoUrl={item.logoUrl} mark="" alt={item.org} /> : <span className="company-mark">L</span>}
                  <div>
                    <div className="entry-top">
                      <h3>{item.org}</h3>
                      {item.dates ? (
                        <span className="when">
                          <Calendar size={14} strokeWidth={1.8} aria-hidden />
                          {item.dates}
                        </span>
                      ) : null}
                    </div>
                    <p className="role">{item.role}</p>
                    <p className="desc">{item.text}</p>
                    <div className="pills">
                      {item.stack.map((tech) => (
                        <span className="pill" key={tech}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </section>
          )}

          {showCerts && (
            <section className="section" id="certifications">
              <h2>Certifications</h2>
              {certifications.map((item) => (
                <div className="entry" key={item.id}>
                  {item.logoUrl ? <Mark logoUrl={item.logoUrl} mark="" alt={item.issuer} /> : <span className="company-mark">C</span>}
                  <div>
                    <div className="entry-top">
                      <h3>{item.name}</h3>
                      <span className="when">
                        <Calendar size={14} strokeWidth={1.8} aria-hidden />
                        {item.issued}
                      </span>
                    </div>
                    <p className="role">{item.issuer}</p>
                  </div>
                </div>
              ))}
            </section>
          )}

          <section className="section" id="contact">
            <h2>Contact</h2>
            <p className="contact-line">
              <Mail size={16} aria-hidden />
              {content.identity.email}
            </p>
            <p className="desc">{content.copy.contactBody}</p>
            <a className="resume-btn resume-btn-inline" href={content.links.downloadResume.href}>
              <Download size={16} aria-hidden />
              {content.links.downloadResume.label}
            </a>
          </section>
        </article>
      </section>
      </div>
    </div>
  );
}
