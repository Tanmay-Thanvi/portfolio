import { ArrowRight } from "lucide-react";
import { portfolio } from "../../data/portfolio";

export function ContactBand() {
  return (
    <section className="band" aria-labelledby="contact-band-heading">
      <svg className="bandLeaf bandLeafLeft" viewBox="0 0 200 200" aria-hidden>
        <path
          d="M20 180 C40 80 90 40 180 20 C120 70 80 120 70 180 Z"
          fill="currentColor"
        />
      </svg>
      <svg className="bandLeaf bandLeafRight" viewBox="0 0 200 200" aria-hidden>
        <path
          d="M20 180 C40 80 90 40 180 20 C120 70 80 120 70 180 Z"
          fill="currentColor"
        />
      </svg>
      <div>
        <h2 id="contact-band-heading">{portfolio.contactBand.heading}</h2>
        <p>{portfolio.contactBand.body}</p>
      </div>
      <a className="btn btn-secondary" href={`mailto:${portfolio.links.email}`}>
        Contact me
        <ArrowRight size={16} aria-hidden />
      </a>
    </section>
  );
}
