import { useState, type FormEvent } from "react";
import { Clock, Download, Globe, Link2, Lock, Send, Shield, UserRound } from "lucide-react";
import { portfolio } from "../../data/portfolio";
import { DottedWorldMap } from "../LocationCard/DottedWorldMap";
import { EmailMark, GitHubMark, LinkedInMark } from "../BrandMarks";

const TOPICS = ["A role", "A project", "Something else"] as const;

export function ConnectDetails() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState<(typeof TOPICS)[number]>("A role");
  const [message, setMessage] = useState("");
  const [okToContact, setOkToContact] = useState(true);

  const sendMessage = (event: FormEvent) => {
    event.preventDefault();
    if (!okToContact || !message.trim()) return;
    const subject = encodeURIComponent(`${topic} for ${portfolio.profile.name}`);
    const body = encodeURIComponent(
      `${message.trim()}\n\n${name.trim()}${email.trim() ? `\n${email.trim()}` : ""}`,
    );
    window.location.href = `mailto:${portfolio.links.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="split">
      <div className="modalStack">
        <div className="contactCards">
          <a className="contactCard" href={`mailto:${portfolio.links.email}`}>
            <span className="brandMark">
              <EmailMark size={28} />
            </span>
            <strong>Email</strong>
            <p>Send an email directly</p>
            <span className="contactMeta">{portfolio.links.email}</span>
          </a>
          <a className="contactCard" href={portfolio.links.linkedin} target="_blank" rel="noreferrer">
            <span className="brandMark">
              <LinkedInMark size={28} />
            </span>
            <strong>LinkedIn</strong>
            <p>View my LinkedIn profile</p>
            <span className="contactMeta">linkedin.com/in/tanmay-thanvi</span>
          </a>
          <a className="contactCard" href={portfolio.links.github} target="_blank" rel="noreferrer">
            <span className="brandMark github">
              <GitHubMark size={28} />
            </span>
            <strong>GitHub</strong>
            <p>View my GitHub profile</p>
            <span className="contactMeta">github.com/Tanmay-Thanvi</span>
          </a>
        </div>
        <form className="messageForm" onSubmit={sendMessage}>
          <p className="sectionLabel">Send a message</p>
          <div className="formRow">
            <label>
              Your name
              <input value={name} onChange={(event) => setName(event.target.value)} name="name" autoComplete="name" />
            </label>
            <label>
              Work email
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                name="email"
                type="email"
                autoComplete="email"
              />
            </label>
          </div>
          <label>
            What would you like to discuss?
            <select value={topic} onChange={(event) => setTopic(event.target.value as (typeof TOPICS)[number])}>
              {TOPICS.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label>
            Message
            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              name="message"
              rows={5}
              required
            />
          </label>
          <div className="formFooter">
            <label className="checkLabel">
              <input
                type="checkbox"
                checked={okToContact}
                onChange={(event) => setOkToContact(event.target.checked)}
              />
              You may contact me about this message
            </label>
            <button className="btn btn-primary" type="submit" disabled={!okToContact}>
              <Send size={16} aria-hidden />
              Send message
            </button>
          </div>
          <p className="trustLine">
            <span>
              <Shield size={13} aria-hidden /> No account required
            </span>
            <span>
              <Lock size={13} aria-hidden /> Your details are only used to reply
            </span>
          </p>
        </form>
      </div>
      <aside>
        <div className="sideCard">
          <h3>
            <UserRound size={16} aria-hidden />
            Availability
          </h3>
          <dl className="summaryList">
            <div>
              <dt>Status</dt>
              <dd className="availability">{portfolio.profile.availability}</dd>
            </div>
            <div>
              <dt>Location</dt>
              <dd>{portfolio.profile.location}</dd>
            </div>
            <div>
              <dt>Time zone</dt>
              <dd>{portfolio.profile.timezone}</dd>
            </div>
            <div>
              <dt>Work mode</dt>
              <dd>Remote / Hybrid</dd>
            </div>
          </dl>
          <div className="miniMapWrap">
            <DottedWorldMap className="miniMap" />
          </div>
        </div>
        <div className="sideCard">
          <h3>
            <Link2 size={16} aria-hidden />
            Quick links
          </h3>
          <ul className="linkList">
            <li>
              <a href={portfolio.links.resume}>
                <Download size={15} aria-hidden />
                Resume (PDF)
              </a>
            </li>
            <li>
              <a href={portfolio.links.github} target="_blank" rel="noreferrer">
                <span className="brandMark inline">
                  <GitHubMark size={16} />
                </span>
                GitHub profile
              </a>
            </li>
            <li>
              <a href={portfolio.links.linkedin} target="_blank" rel="noreferrer">
                <span className="brandMark inline">
                  <LinkedInMark size={16} />
                </span>
                LinkedIn profile
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
}

export function ConnectBadges() {
  return (
    <div className="focusBadges">
      <span className="focusBadge backend">
        <UserRound size={12} aria-hidden /> {portfolio.profile.availability}
      </span>
      <span className="focusBadge muted">
        <Clock size={12} aria-hidden /> {portfolio.profile.location} · {portfolio.profile.timezone}
      </span>
      <span className="focusBadge remote">
        <Globe size={12} aria-hidden /> Remote-ready
      </span>
    </div>
  );
}
