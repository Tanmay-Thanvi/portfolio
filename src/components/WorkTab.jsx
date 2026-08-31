import { ExternalLinkIcon } from "./icons.jsx";

export default function WorkTab({ content }) {
  const work = (content.work || []).filter(
    (w) => w.visible && w.safeToPublish
  );
  const metricsFor = (w) =>
    (w.metrics || []).filter((m) => m.safeToPublish);

  return (
    <section className="section">
      <h2 className="section-title">Work</h2>
      <div className="work-list">
        {work.map((w) => {
          const metrics = metricsFor(w);
          return (
            <div className="work-card" key={w.id}>
              <div className="work-top">
                <div>
                  <div className="work-name-row">
                    <span className="work-name">
                      {w.href ? (
                        <a href={w.href} target="_blank" rel="noreferrer">
                          {w.name}
                          <ExternalLinkIcon />
                        </a>
                      ) : (
                        w.name
                      )}
                    </span>
                  </div>
                  <div className="work-role">{w.role}</div>
                </div>
              </div>
              {w.text && <p className="work-text">{w.text}</p>}
              {w.stack?.length > 0 && (
                <div className="tag-row">
                  {w.stack.map((s) => (
                    <span className="tag" key={s}>
                      {s}
                    </span>
                  ))}
                </div>
              )}
              {metrics.length > 0 && (
                <div className="work-metrics">
                  {metrics.map((m) => (
                    <span className="work-metric" key={m.label}>
                      {m.value} {m.label}
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
        {work.length === 0 && (
          <p className="empty-state">Nothing to show yet.</p>
        )}
      </div>
    </section>
  );
}
