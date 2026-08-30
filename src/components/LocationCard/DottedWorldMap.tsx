import { useMemo } from "react";
import DottedMap from "dotted-map/without-countries";
import type { MapData } from "dotted-map/without-countries";
import mapJson from "../../data/dotted-world.json";
import indiaDots from "../../data/india-dots.json";

const indiaKeys = new Set(
  (indiaDots as Array<[number, number]>).map(([x, y]) => `${x.toFixed(3)}:${y.toFixed(3)}`),
);

function isIndiaDot(x: number, y: number) {
  const key = `${Number(x.toFixed(3))}:${Number(y.toFixed(3))}`;
  if (indiaKeys.has(key)) return true;
  for (const [ix, iy] of indiaDots as Array<[number, number]>) {
    const dx = x - ix;
    const dy = y - iy;
    if (dx * dx + dy * dy < 0.36) return true;
  }
  return false;
}

export function DottedWorldMap({ className }: { className?: string }) {
  const { points, width, height } = useMemo(() => {
    const map = new DottedMap({ map: mapJson as MapData });
    return {
      points: map.getPoints().map((point) => ({
        ...point,
        india: isIndiaDot(point.x, point.y),
      })),
      width: map.image.width,
      height: map.image.height,
    };
  }, []);

  return (
    <svg
      className={className ? `dotted-world-map ${className}` : "dotted-world-map"}
      viewBox={`0 0 ${width} ${height}`}
      role="presentation"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      {points.map((point, index) => (
        <circle
          key={`${point.x}-${point.y}-${index}`}
          cx={point.x}
          cy={point.y}
          r={point.india ? 0.42 : 0.22}
          fill={point.india ? "var(--primary)" : "currentColor"}
          opacity={point.india ? 1 : 0.28}
        />
      ))}
    </svg>
  );
}
