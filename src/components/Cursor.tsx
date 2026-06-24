"use client";
import { useEffect } from "react";

export default function Cursor() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    document.body.classList.add("has-cursor");

    const dot  = document.createElement("div");
    const ring = document.createElement("div");

    Object.assign(dot.style, {
      position: "fixed", top: "0", left: "0",
      width: "6px", height: "6px", borderRadius: "50%",
      background: "var(--accent)",
      pointerEvents: "none", zIndex: "99999",
      willChange: "transform",
      transition: "opacity .3s",
    } as CSSStyleDeclaration);

    Object.assign(ring.style, {
      position: "fixed", top: "0", left: "0",
      width: "38px", height: "38px", borderRadius: "50%",
      border: "1px solid rgba(27,152,224,.45)",
      pointerEvents: "none", zIndex: "99998",
      willChange: "transform",
      transition: "width .18s ease, height .18s ease, border-color .18s ease, background .18s ease",
    } as CSSStyleDeclaration);

    document.body.appendChild(dot);
    document.body.appendChild(ring);

    let mx = -200, my = -200;
    let rx = -200, ry = -200;
    let raf: number;

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };

    const tick = () => {
      dot.style.transform  = `translate(${mx - 3}px,${my - 3}px)`;
      rx += (mx - rx) * 0.10;
      ry += (my - ry) * 0.10;
      ring.style.transform = `translate(${rx - 19}px,${ry - 19}px)`;
      raf = requestAnimationFrame(tick);
    };

    const onEnter = () => {
      ring.style.width  = "54px";
      ring.style.height = "54px";
      ring.style.borderColor  = "rgba(27,152,224,.75)";
      ring.style.background   = "rgba(27,152,224,.07)";
    };
    const onLeave = () => {
      ring.style.width  = "38px";
      ring.style.height = "38px";
      ring.style.borderColor = "rgba(27,152,224,.45)";
      ring.style.background  = "transparent";
    };

    const bindHover = (root: Document | Element) => {
      root.querySelectorAll("a, button, [role=button], [tabindex='0'], label").forEach(el => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };

    bindHover(document);

    const obs = new MutationObserver(() => bindHover(document));
    obs.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      obs.disconnect();
      dot.remove();
      ring.remove();
      document.body.classList.remove("has-cursor");
    };
  }, []);

  return null;
}
