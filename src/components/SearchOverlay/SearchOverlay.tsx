import { useCallback, useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import type { SectionId } from "../../data/portfolio";
import { useFocusTrap } from "../../hooks/useFocusTrap";
import { useOverlayTransition } from "../../hooks/useOverlayTransition";
import { usePortfolioSearch } from "../../hooks/usePortfolioSearch";
import styles from "./SearchOverlay.module.css";

interface SearchOverlayProps {
  onClose: () => void;
  onOpenSection: (id: SectionId) => void;
}

export function SearchOverlay({ onClose, onOpenSection }: SearchOverlayProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const { open, requestClose } = useOverlayTransition(onClose);
  const close = useCallback(() => requestClose(), [requestClose]);
  const { groups, count, flat } = usePortfolioSearch(query);

  useFocusTrap(true, dialogRef, close);

  useEffect(() => {
    setActive(0);
  }, [query]);

  const openItem = useCallback(
    (index: number) => {
      const item = flat[index];
      if (!item) return;
      if (item.href) {
        window.open(item.href, item.href.startsWith("mailto:") ? "_self" : "_blank", "noreferrer");
        requestClose();
        return;
      }
      if (item.section) {
        requestClose();
        onOpenSection(item.section);
      }
    },
    [flat, requestClose, onOpenSection],
  );

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActive((value) => (flat.length ? (value + 1) % flat.length : 0));
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        setActive((value) => (flat.length ? (value - 1 + flat.length) % flat.length : 0));
      }
      if (event.key === "Enter") {
        event.preventDefault();
        openItem(active);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [active, flat.length, openItem]);

  let cursor = -1;

  return (
    <div
      className={`overlay ${open ? "is-open" : ""}`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) requestClose();
      }}
    >
      <div
        ref={dialogRef}
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="search-title"
      >
        <div className={styles.inputRow}>
          <Search size={18} aria-hidden />
          <input
            ref={inputRef}
            id="search-title"
            className={styles.input}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search roles, companies, skills, projects…"
            aria-label="Search portfolio"
            autoComplete="off"
          />
          {query ? (
            <button type="button" className="icon-btn" onClick={() => setQuery("")} aria-label="Clear search">
              <X size={16} />
            </button>
          ) : null}
          <span className={styles.esc}>Esc</span>
        </div>
        <div className={styles.results} role="listbox" aria-label={`${count} search results`}>
          {groups.length === 0 ? (
            <p className={styles.empty}>No matches. Try “backend”, “DeepIntent”, or “resume”.</p>
          ) : (
            groups.map((group) => (
              <section key={group.group}>
                <h3 className={styles.groupTitle}>{group.label}</h3>
                {group.items.map((item) => {
                  cursor += 1;
                  const index = cursor;
                  return (
                    <button
                      type="button"
                      key={item.id}
                      className={styles.item}
                      data-active={index === active}
                      role="option"
                      aria-selected={index === active}
                      onMouseEnter={() => setActive(index)}
                      onClick={() => openItem(index)}
                    >
                      <span>
                        <span className={styles.itemTitle}>{item.title}</span>
                        <span className={styles.itemSub}>{item.subtitle}</span>
                      </span>
                      <span className={styles.tag}>{item.group === "actions" ? "Action" : item.group}</span>
                    </button>
                  );
                })}
              </section>
            ))
          )}
        </div>
        <div className={styles.footer}>
          <span>↑↓ Navigate</span>
          <span>Enter Open</span>
          <span>Esc Close</span>
        </div>
      </div>
    </div>
  );
}
