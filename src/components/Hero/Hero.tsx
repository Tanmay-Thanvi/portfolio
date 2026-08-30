import { ArrowRight, Mail } from "lucide-react";
import { portfolio } from "../../data/portfolio";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={`card ${styles.card}`} aria-labelledby="hero-heading">
      <div className={styles.copy}>
        <h1 id="hero-heading" className={styles.headline}>
          {portfolio.profile.headlineLines[0]}
          <br />
          {portfolio.profile.headlineLines[1]}
        </h1>
        <p className={styles.summary}>{portfolio.profile.summary}</p>
      </div>
      <div className={styles.actions}>
        <a className="btn btn-primary" href={portfolio.links.resume}>
          View Resume
          <ArrowRight size={16} aria-hidden />
        </a>
        <a className="btn btn-secondary" href={`mailto:${portfolio.links.email}`}>
          <Mail size={16} aria-hidden />
          Contact me
        </a>
      </div>
    </section>
  );
}
