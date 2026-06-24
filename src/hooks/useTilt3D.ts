import { useRef, useCallback } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";

export function useTilt3D(maxDeg = 13) {
  const cardRef  = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);

  const onMove = useCallback((e: ReactMouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top)  / rect.height;
    const rx = (py - 0.5) * -maxDeg;
    const ry = (px - 0.5) *  maxDeg;

    el.style.transition = "transform .06s ease";
    el.style.transform  = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(6px) scale(1.02)`;

    if (shineRef.current) {
      shineRef.current.style.opacity = "1";
      shineRef.current.style.background = `radial-gradient(
        circle at ${px * 100}% ${py * 100}%,
        rgba(255,255,255,.13) 0%,
        transparent 62%
      )`;
    }
  }, [maxDeg]);

  const onLeave = useCallback(() => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transition = "transform .65s cubic-bezier(.16,1,.3,1)";
    el.style.transform  = "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0) scale(1)";
    if (shineRef.current) {
      shineRef.current.style.opacity = "0";
    }
  }, []);

  return { cardRef, shineRef, onMove, onLeave };
}
