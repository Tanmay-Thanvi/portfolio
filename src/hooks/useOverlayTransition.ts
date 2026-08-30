import { useCallback, useEffect, useRef, useState } from "react";

const DURATION_MS = 360;

export function useOverlayTransition(onClose: () => void) {
  const [open, setOpen] = useState(false);
  const closing = useRef(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => setOpen(true));
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const requestClose = useCallback(() => {
    if (closing.current) return;
    closing.current = true;
    setOpen(false);
    window.setTimeout(onClose, DURATION_MS);
  }, [onClose]);

  return { open, requestClose };
}
