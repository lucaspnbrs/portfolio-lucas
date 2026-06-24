"use client";
import { useRef, useEffect, useState } from "react";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

  const EMAIL = "lucas@lucasbarros.dev";

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  };

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll<HTMLElement>(".rv");
    if (!els) return;
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("on"); obs.unobserve(e.target); } }),
      { threshold: 0.12 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="contact" style={{
      background: `linear-gradient(180deg, var(--ground-mid) 0%, var(--ground) 100%)`,
      padding: "clamp(80px,14vh,160px) clamp(28px,6vw,96px) clamp(48px,8vh,80px)",
      position: "relative",
      overflow: "hidden",
    }}>

      <div aria-hidden="true" style={{
        position: "absolute",
        top: "50%", left: "50%",
        transform: "translate(-50%, -60%)",
        width: "80vw", height: "60vw",
        background: "radial-gradient(ellipse, rgba(27,152,224,.07) 0%, transparent 65%)",
        filter: "blur(80px)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 860, margin: "0 auto", position: "relative" }}>

        <div className="rv" style={{ marginBottom: 32 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            padding: "8px 18px", borderRadius: 9999,
            border: "1px solid rgba(27,152,224,.22)",
            background: "rgba(27,152,224,.07)",
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: "50%",
              background: "#22d3a5",
              boxShadow: "0 0 8px rgba(34,211,165,.6)",
              display: "block",
            }} />
            <span style={{
              fontFamily: "var(--f-body)", fontSize: 11,
              letterSpacing: "2.5px", textTransform: "uppercase",
              color: "rgba(232,241,242,.65)",
            }}>
              Disponível para novos projetos
            </span>
          </div>
        </div>

        <h2 className="rv" style={{
          fontFamily: "var(--f-display)",
          fontSize: "clamp(40px, 7vw, 96px)",
          fontWeight: 900,
          lineHeight: 1,
          letterSpacing: "-.04em",
          color: "var(--text)",
          marginBottom: "clamp(16px, 2.5vh, 28px)",
        }}>
          Pronto para
          <br />
          <span style={{ color: "var(--accent)" }}>construir algo</span>
          <br />
          que preste?
        </h2>

        <p className="rv" style={{
          fontFamily: "var(--f-body)",
          fontSize: "clamp(13px, 1.2vw, 16px)",
          lineHeight: 1.75,
          color: "var(--text-muted)",
          marginBottom: "clamp(40px,6vh,64px)",
          maxWidth: 560,
        }}>
          Tecnologia instável e conteúdo esquecível custam mais do que você imagina.
          Me conta o que você precisa — respondi em menos de 24h.
        </p>

        <div className="rv" style={{ display: "flex", flexWrap: "wrap", gap: 16, marginBottom: "clamp(40px,7vh,80px)" }}>
          <button
            onClick={copyEmail}
            className="btn btn--hi btn--lg"
            style={{ minWidth: 220 }}
          >
            <span style={{
              display: "inline-block",
              transition: "opacity .2s",
            }}>
              {copied ? "Email copiado!" : "Copiar meu email"}
            </span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginLeft: 6 }}>
              {copied
                ? <path d="M3 8l3.5 3.5L13 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                : <path d="M10 2H4a1 1 0 00-1 1v9h1V3h6V2zm1 2H6a1 1 0 00-1 1v9a1 1 0 001 1h5a1 1 0 001-1V5a1 1 0 00-1-1z" fill="currentColor"/>
              }
            </svg>
          </button>

          <a href="https://www.linkedin.com/in/lucas-barros-30a22330a/" target="_blank" rel="noopener noreferrer"
            className="btn btn--ghost btn--lg">
            LinkedIn
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ marginLeft: 4, opacity: .7 }}>
              <path d="M3 3h8v8M3 11L11 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
          </a>

          <a href="https://github.com/lucaspnbrs" target="_blank" rel="noopener noreferrer"
            className="btn btn--ghost btn--lg">
            GitHub
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ marginLeft: 4, opacity: .7 }}>
              <path d="M3 3h8v8M3 11L11 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
          </a>
        </div>


        <hr className="rule" style={{ marginBottom: 24 }} />


        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 16,
          fontFamily: "var(--f-body)",
          fontSize: 11,
          letterSpacing: "2px",
          textTransform: "uppercase",
          color: "rgba(232,241,242,.28)",
        }}>
          <span>© 2026 Lucas Barros</span>
          <span>Arquitetura · Vídeo · Identidade</span>
        </div>
      </div>
    </section>
  );
}
