import { useCallback, useRef, type ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Download,
  FolderKanban,
  Send,
  Sparkles,
  UserRound,
  Waypoints,
  X,
} from "lucide-react";
import type { SectionId } from "../../data/portfolio";
import { MODAL_SECTIONS, portfolio, SECTION_TITLES } from "../../data/portfolio";
import { useFocusTrap } from "../../hooks/useFocusTrap";
import { useOverlayTransition } from "../../hooks/useOverlayTransition";
import { ProjectsHeaderAction } from "./ProjectsDetails";
import { SectionBadges, SectionDetails, sectionSummary } from "./SectionDetails";
import styles from "./DetailModal.module.css";

interface DetailModalProps {
  section: SectionId;
  onClose: () => void;
  onChange: (section: SectionId) => void;
}

const SECTION_ICONS: Record<SectionId, ReactNode> = {
  glance: <UserRound size={18} aria-hidden />,
  experience: <Briefcase size={18} aria-hidden />,
  projects: <FolderKanban size={18} aria-hidden />,
  strengths: <Sparkles size={18} aria-hidden />,
  howIWork: <Waypoints size={18} aria-hidden />,
  connect: <Send size={18} aria-hidden />,
};

export function DetailModal({ section, onClose, onChange }: DetailModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const { open, requestClose } = useOverlayTransition(onClose);
  const close = useCallback(() => requestClose(), [requestClose]);
  useFocusTrap(true, dialogRef, close);

  const index = MODAL_SECTIONS.indexOf(section);
  const previous = index > 0 ? MODAL_SECTIONS[index - 1] : null;
  const next = index < MODAL_SECTIONS.length - 1 ? MODAL_SECTIONS[index + 1] : null;
  const footerPrimary =
    section === "connect" ? (
      <a className="btn btn-primary" href={portfolio.links.resume}>
        <Download size={16} aria-hidden />
        Download resume
      </a>
    ) : (
      <a className="btn btn-primary" href={`mailto:${portfolio.links.email}`}>
        <Send size={16} aria-hidden />
        Contact Tanmay
      </a>
    );

  return (
    <div
      className={`overlay ${styles.overlay} ${open ? "is-open" : ""}`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) requestClose();
      }}
    >
      <div
        ref={dialogRef}
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="detail-title"
      >
        <div className={styles.handle} aria-hidden />
        <div className={styles.header}>
          <div className={styles.heading}>
            <span className="card-icon primary">{SECTION_ICONS[section]}</span>
            <div>
              <h2 id="detail-title">{SECTION_TITLES[section]}</h2>
              <p>{sectionSummary(section)}</p>
              <SectionBadges section={section} />
            </div>
          </div>
          <div className={styles.headerActions}>
            {section === "projects" ? (
              <ProjectsHeaderAction />
            ) : (
              <a className="btn btn-secondary" href={portfolio.links.resume}>
                <Download size={16} aria-hidden />
                Download resume
              </a>
            )}
            <div className={styles.closeWrap}>
              <button type="button" className="icon-btn" onClick={requestClose} aria-label="Close details">
                <X size={18} />
              </button>
              <span className={styles.esc}>Esc</span>
            </div>
          </div>
        </div>
        <div className={styles.body}>
          <SectionDetails section={section} onOpenSection={onChange} />
        </div>
        <div className={styles.footer}>
          {previous ? (
            <button type="button" className="btn btn-secondary" onClick={() => onChange(previous)}>
              <ArrowLeft size={16} aria-hidden />
              Previous: {SECTION_TITLES[previous]}
            </button>
          ) : (
            <span />
          )}
          <div className={styles.footerRight}>
            {next ? (
              <button type="button" className="btn btn-secondary" onClick={() => onChange(next)}>
                Next: {SECTION_TITLES[next]}
                <ArrowRight size={16} aria-hidden />
              </button>
            ) : null}
            {footerPrimary}
          </div>
        </div>
      </div>
    </div>
  );
}
