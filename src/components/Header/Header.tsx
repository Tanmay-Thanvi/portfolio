import { Search } from "lucide-react";
import { portfolio } from "../../data/portfolio";
import type { Theme } from "../../hooks/useTheme";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";
import styles from "./Header.module.css";

interface HeaderProps {
  theme: Theme;
  onToggleTheme: () => void;
  onOpenSearch: () => void;
}

export function Header({ theme, onToggleTheme, onOpenSearch }: HeaderProps) {
  const isMac =
    typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform);

  return (
    <header className={styles.header}>
      <div className={`page-wrap ${styles.inner}`}>
        <a className={styles.brand} href="#top">
          <span className={styles.mark} aria-hidden>
            {portfolio.profile.initials}
          </span>
          <span className={`${styles.name} ${styles.fullName}`}>{portfolio.profile.name}</span>
          <span className={`${styles.name} ${styles.shortName}`}>{portfolio.profile.shortName}</span>
        </a>
        <div className={styles.actions}>
          <button type="button" className={`btn btn-secondary ${styles.search}`} onClick={onOpenSearch}>
            <Search size={16} aria-hidden />
            Search
            <kbd className={styles.shortcut}>{isMac ? "⌘ K" : "Ctrl K"}</kbd>
          </button>
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>
      </div>
    </header>
  );
}
