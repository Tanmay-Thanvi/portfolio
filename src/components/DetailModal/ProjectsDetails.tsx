import { useState } from "react";
import {
  Box,
  ChevronDown,
  Code2,
  ExternalLink,
  Layers,
  Link2,
  Shield,
  Sparkles,
  Wrench,
} from "lucide-react";
import type { Project } from "../../data/portfolio";
import { portfolio } from "../../data/portfolio";

function ProjectBlock({ project, index, defaultOpen }: { project: Project; index: number; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <article className="projectBlock">
      <div className="projectHead">
        <span className="companyMark projectMark">
          <Box size={16} aria-hidden />
          <em>{index + 1}</em>
        </span>
        <div className="jobMeta">
          <div className="jobTitleRow">
            <h3>{project.name}</h3>
            {project.featured ? <span className="featured">Featured</span> : null}
          </div>
          <p className="metaLine">Role · {project.role}</p>
        </div>
      </div>
      {open ? (
        <>
          <div className="projectCols">
            <div>
              <p className="sectionLabel">Challenge</p>
              <p>{project.problem}</p>
            </div>
            <div>
              <p className="sectionLabel">My contribution</p>
              <p>{project.contribution}</p>
            </div>
            <div>
              <p className="sectionLabel">Outcome</p>
              <p>{project.outcome}</p>
            </div>
          </div>
          <div className="tags">
            {project.technologies.map((tech) => (
              <span className="tag" key={tech}>
                {tech}
              </span>
            ))}
          </div>
          {project.links?.length ? (
            <div className="projectActions">
              {project.links.map((link) => (
                <a className="btn btn-secondary" key={link.href} href={link.href} target="_blank" rel="noreferrer">
                  {link.label}
                  <ExternalLink size={14} aria-hidden />
                </a>
              ))}
            </div>
          ) : null}
        </>
      ) : (
        <button
          type="button"
          className="btn btn-secondary roleToggle"
          onClick={() => setOpen(true)}
        >
          Show project details
          <ChevronDown size={16} aria-hidden />
        </button>
      )}
    </article>
  );
}

export function ProjectsDetails() {
  return (
    <div className="split">
      <div className="modalStack">
        {portfolio.projects.map((project, index) => (
          <ProjectBlock
            key={project.id}
            project={project}
            index={index}
            defaultOpen={Boolean(project.featured) || index === 0}
          />
        ))}
      </div>
      <aside>
        <div className="sideCard">
          <h3>Project summary</h3>
          <dl className="summaryList">
            <div>
              <dt>Projects</dt>
              <dd>{portfolio.projects.length}</dd>
            </div>
            <div>
              <dt>Focus</dt>
              <dd>Backend / Platform</dd>
            </div>
            <div>
              <dt>Domains</dt>
              <dd>AdTech / Personal site</dd>
            </div>
            <div>
              <dt>Role</dt>
              <dd>Backend Engineer</dd>
            </div>
          </dl>
        </div>
        <div className="sideCard">
          <h3>What recruiters should notice</h3>
          <ul className="noticeCards">
            <li>
              <span className="achIcon">
                <Layers size={16} aria-hidden />
              </span>
              <div>
                <strong>Architecture ownership</strong>
                <span>Owned the rate limiter as a core platform piece.</span>
              </div>
            </li>
            <li>
              <span className="achIcon">
                <Sparkles size={16} aria-hidden />
              </span>
              <div>
                <strong>Clear story</strong>
                <span>Each project states the problem, my work, and the result.</span>
              </div>
            </li>
            <li>
              <span className="achIcon">
                <Shield size={16} aria-hidden />
              </span>
              <div>
                <strong>Production work</strong>
                <span>Built on live advertising systems at DeepIntent and PubMatic.</span>
              </div>
            </li>
          </ul>
        </div>
        <div className="sideCard">
          <h3>
            <Link2 size={16} aria-hidden />
            Project links
          </h3>
          <ul className="linkList">
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

export function ProjectsBadges() {
  return (
    <div className="focusBadges">
      <span className="focusBadge backend">
        <Code2 size={12} aria-hidden /> Backend
      </span>
      <span className="focusBadge platform">
        <Layers size={12} aria-hidden /> Distributed systems
      </span>
      <span className="focusBadge remote">
        <Wrench size={12} aria-hidden /> Developer tooling
      </span>
    </div>
  );
}

export function ProjectsHeaderAction() {
  return (
    <a className="btn btn-secondary" href={portfolio.links.github} target="_blank" rel="noreferrer">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.1-.75.41-1.27.74-1.56-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.77.12 3.06.74.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.39-5.25 5.67.42.36.79 1.09.79 2.2 0 1.59-.01 2.87-.01 3.26 0 .31.21.67.8.56A10.52 10.52 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
      </svg>
      View GitHub
    </a>
  );
}
