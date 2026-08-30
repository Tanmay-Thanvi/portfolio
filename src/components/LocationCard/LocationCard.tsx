import { MapPin } from "lucide-react";
import { portfolio } from "../../data/portfolio";
import { DottedWorldMap } from "./DottedWorldMap";
import styles from "./LocationCard.module.css";

export function LocationCard() {
  const { location, timezone, remote } = portfolio.profile;
  return (
    <section className={`card ${styles.card}`} aria-label={`${location}, ${timezone}`}>
      <div className={styles.map}>
        <DottedWorldMap />
      </div>
      <div className={styles.meta}>
        <MapPin className={styles.pin} size={18} aria-hidden />
        <div>
          <p className={styles.place}>
            {location} · {timezone}
          </p>
          <p className={styles.remote}>{remote}</p>
        </div>
      </div>
    </section>
  );
}
