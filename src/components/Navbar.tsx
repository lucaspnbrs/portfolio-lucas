"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const ITEMS = [
  { label: "Início",   href: "#",        num: "01" },
  { label: "Projetos", href: "#projects", num: "02" },
  { label: "Sobre",    href: "#about",    num: "03" },
  { label: "Contato",  href: "#contact",  num: "04" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  const close = useCallback(() => setOpen(false), []);

  return (
    <>

      <header style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 200,
        padding: "22px 44px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "transparent",
      }}>

        <a href="#" onClick={close} aria-label="Lucas Barros — início"
          style={{ display: "block", lineHeight: 0, zIndex: 210 }}>
          <Image
            src="/logo-clip.png"
            alt="Lucas Barros"
            width={180}
            height={99}
            priority
            className="nav-logo"
            style={{ objectFit: "contain", filter: "brightness(0) invert(1)", opacity: 1 }}
          />
        </a>

        <button
          onClick={() => setOpen(p => !p)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="nav-menu"
          className="hamburger-btn"
          style={{
            position: "relative",
            zIndex: 210,
            width: 48, height: 44,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "rgba(255,255,255,.06)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(232,241,242,.11)",
            borderRadius: "var(--r-p)",
            cursor: "pointer",
            transition: "background .3s var(--ease), border-color .3s",
          }}
        >
          <span style={{ position: "relative", width: 22, height: 13, display: "block" }}>
            <span style={{
              position: "absolute", left: 0, top: 0,
              width: "100%", height: 1.5,
              background: "var(--text)", borderRadius: 2,
              transformOrigin: "center",
              transition: "transform .42s var(--ease-expo)",
              transform: open ? "translateY(5.75px) rotate(45deg)" : "none",
            }} />
            <span style={{
              position: "absolute", left: 0, top: "50%", marginTop: -0.75,
              width: "100%", height: 1.5,
              background: "var(--text)", borderRadius: 2,
              transition: "opacity .2s var(--ease), transform .42s var(--ease-expo)",
              opacity: open ? 0 : 1,
              transform: open ? "scaleX(0)" : "scaleX(1)",
            }} />
            <span style={{
              position: "absolute", left: 0, bottom: 0,
              width: "100%", height: 1.5,
              background: "var(--text)", borderRadius: 2,
              transformOrigin: "center",
              transition: "transform .42s var(--ease-expo)",
              transform: open ? "translateY(-5.75px) rotate(-45deg)" : "none",
            }} />
          </span>
        </button>
      </header>

      <div
        id="nav-menu"
        aria-hidden={!open}
        style={{
          position: "fixed", inset: 0, zIndex: 190,
          background: "rgba(7,15,26,.97)",
          backdropFilter: "blur(28px)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity .4s var(--ease)",
          display: "grid",
          gridTemplateColumns: "1fr 1.3fr",
        }}
      >

        <div className="nav-left" style={{
          borderRight: "1px solid rgba(232,241,242,.05)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "56px 48px",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Marca d'água LB */}
          <span aria-hidden="true" style={{
            position: "absolute",
            bottom: -24, left: -8,
            fontFamily: "var(--f-display)",
            fontSize: "clamp(160px, 20vw, 260px)",
            fontWeight: 900,
            lineHeight: 1,
            letterSpacing: "-.04em",
            color: "transparent",
            WebkitTextStroke: "1px rgba(27,152,224,.10)",
            userSelect: "none",
            opacity: open ? 1 : 0,
            transform: open ? "translateY(0)" : "translateY(24px)",
            transition: "opacity .8s var(--ease-expo) .2s, transform .8s var(--ease-expo) .2s",
          }}>LB</span>

          <div style={{
            position: "relative",
            display: "inline-flex", alignItems: "center", gap: 10,
            padding: "8px 16px",
            borderRadius: "9999px",
            border: "1px solid rgba(27,152,224,.22)",
            background: "rgba(27,152,224,.07)",
            width: "fit-content",
            opacity: open ? 1 : 0,
            transform: open ? "translateY(0)" : "translateY(14px)",
            transition: "opacity .6s var(--ease-expo) .5s, transform .6s var(--ease-expo) .5s",
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: "50%",
              background: "#22d3a5",
              boxShadow: "0 0 8px rgba(34,211,165,.55)",
              display: "block",
            }} />
            <span style={{
              fontFamily: "var(--f-body)", fontSize: 11,
              letterSpacing: "2px", textTransform: "uppercase",
              color: "rgba(232,241,242,.65)",
            }}>
              Disponível para projetos
            </span>
          </div>
        </div>

        <nav style={{
          display: "flex", flexDirection: "column", justifyContent: "center",
          padding: "56px 56px",
          gap: 0,
        }}>
          {ITEMS.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={close}
              className="nav-link"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 18,
                padding: "14px 0",
                borderBottom: "1px solid rgba(232,241,242,.06)",
                fontFamily: "var(--f-display)",
                fontSize: "clamp(32px, 4.8vw, 68px)",
                fontWeight: 700,
                letterSpacing: "-.03em",
                lineHeight: 1.1,
                color: "var(--text)",
                textDecoration: "none",
                opacity: open ? 1 : 0,
                transform: open ? "translateX(0)" : "translateX(-20px)",
                transition: [
                  `opacity .55s var(--ease-expo) ${.07 + i * .07}s`,
                  `transform .55s var(--ease-expo) ${.07 + i * .07}s`,
                ].join(", "),
              }}
            >

              <span style={{
                fontFamily: "var(--f-body)",
                fontSize: 10,
                fontWeight: 400,
                letterSpacing: "1.5px",
                color: "var(--accent)",
                padding: "3px 9px",
                border: "1px solid rgba(27,152,224,.28)",
                borderRadius: "9999px",
                lineHeight: 1.7,
                flexShrink: 0,
              }}>{item.num}</span>
              {item.label}
            </a>
          ))}
        </nav>

        <div style={{
          position: "absolute",
          bottom: 32, left: 0, right: 0,
          padding: "0 48px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          opacity: open ? 1 : 0,
          transition: `opacity .6s var(--ease-expo) .52s`,
          fontFamily: "var(--f-body)",
          fontSize: 11,
          letterSpacing: "2px",
          textTransform: "uppercase",
          color: "rgba(232,241,242,.28)",
        }}>
          <span>© 2026 Lucas Barros</span>
          <div style={{ display: "flex", gap: 28 }}>
            {["GitHub", "LinkedIn"].map(s => (
              <a key={s} href="#" style={{ color: "inherit", textDecoration: "none" }}
                className="footer-link">{s}</a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .hamburger-btn:hover { background: rgba(255,255,255,.10) !important; }
        .nav-link:hover { color: var(--accent) !important; }
        .footer-link { transition: color .2s; }
        .footer-link:hover { color: rgba(232,241,242,.7) !important; }

        @media (max-width: 640px) {
          #nav-menu { grid-template-columns: 1fr !important; }
          .nav-left  { display: none !important; }
          header     { padding: 16px 20px !important; }
          .nav-logo  { width: 120px !important; height: auto !important; }
          nav        { padding: 40px 32px !important; }
          .nav-link  { font-size: 36px !important; padding: 12px 0 !important; }
        }
      `}</style>
    </>
  );
}
