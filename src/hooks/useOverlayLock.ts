import { useEffect } from "react";

export function useOverlayLock(locked: boolean) {
  useEffect(() => {
    document.body.classList.toggle("overlay-open", locked);
    return () => document.body.classList.remove("overlay-open");
  }, [locked]);
}
