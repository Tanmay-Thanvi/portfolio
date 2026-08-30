import { FileText, Mail } from "lucide-react";
import { portfolio } from "../../data/portfolio";

export function MobileDock() {
  return (
    <div className="dock">
      <a className="btn btn-secondary" href={portfolio.links.resume}>
        <FileText size={16} aria-hidden />
        Resume
      </a>
      <a className="btn btn-primary" href={`mailto:${portfolio.links.email}`}>
        <Mail size={16} aria-hidden />
        Contact
      </a>
    </div>
  );
}
