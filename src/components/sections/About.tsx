"use client";
import { useRef, useEffect, useState, useCallback } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";


const STORAGE = process.env.NEXT_PUBLIC_SUPABASE_STORAGE;

function eio(t: number): number {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}
function lerp01(raw: number, s: number, e: number): number {
  return Math.min(1, Math.max(0, (raw - s) / (e - s)));
}

function SoundButton({ on, onClick }: { on: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={on ? "Mute" : "Unmute"}
      className="about-sound-btn"
      style={{
        position: "absolute", bottom: 32, right: 40, zIndex: 20,
        display: "flex", alignItems: "center", gap: 8,
        padding: "7px 14px", borderRadius: "var(--r-p)",
        border: "1px solid", borderColor: on ? "var(--border-hi)" : "var(--border)",
        fontFamily: "var(--f-body)", fontSize: 9, fontWeight: 500,
        letterSpacing: "2.5px", textTransform: "uppercase",
        color: on ? "var(--chrome)" : "var(--text-subtle)",
        background: "rgba(19,41,61,.75)", backdropFilter: "blur(12px)",
        boxShadow: on ? "0 0 22px var(--accent-glow)" : "none",
        transition: "all .3s var(--ease)",
        cursor: "pointer",
      }}
    >
      {on ? (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
        </svg>
      ) : (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
          <line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>
        </svg>
      )}
      {on ? "som ligado" : "ligar som"}
    </button>
  );
}

export default function About() {
  const wrapperRef = useRef<HTMLElement>(null);
  const videoRef   = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const stickyRef  = useRef<HTMLDivElement>(null);
  const [soundOn, setSoundOn] = useState(false);

  useEffect(() => {
    const video   = videoRef.current;
    const wrapper = wrapperRef.current;
    const content = contentRef.current;
    if (!video || !wrapper || !content) return;

    let rafId: number | null = null;
    let pendingP: number | null = null;
    let ctx: gsap.Context;

    let lastProgress = 0;
    let lastProgressTime = 0;
    let scrollVel = 0;

    // Mobile: force browser to load the video on first user touch.
    const unlockVideo = () => {
      video.play().then(() => video.pause()).catch(() => {});
    };
    document.addEventListener("touchstart", unlockVideo, { once: true, passive: true });

    // Pause autoPlay immediately when data is ready so frame-0 is shown until scroll.
    const pauseAtStart = () => { video.pause(); video.currentTime = 0; };
    video.addEventListener('canplay', pauseAtStart, { once: true });

    const flush = () => {
      if (pendingP !== null) {
        const raw = pendingP;

        // Video scrubbing — only if video is ready
        if (video.readyState >= 2 && video.duration) {
          if (!video.muted) {
            // Sound on: always keep playing; match speed to scroll velocity.
            const target = raw * video.duration;
            const rate = scrollVel * video.duration;
            video.playbackRate = scrollVel > 0.1 ? Math.min(3.5, Math.max(0.5, rate)) : 1;
            if (video.paused) video.play().catch(() => {});
            if (scrollVel > 0.1 && Math.abs(video.currentTime - target) > 1.5) {
              video.currentTime = target;
            }
          } else {
            // Muted scrub: use currentTime for frame-accurate seeking (no keyframe jumps).
            if (!video.paused) video.pause();
            const target = raw * video.duration;
            video.currentTime = target;
          }
        }

        // Content reveal — always runs regardless of video state
        const cp  = lerp01(raw, 0.42, 0.82);
        const cp2 = eio(cp);
        content.style.opacity   = String(cp);
        content.style.transform = `translateY(${(1 - cp2) * 52}px)`;

        // Fade the entire sticky viewport out in the last 25% of scroll so
        // the section exits gracefully. Fading the parent works even on mobile
        // where children have opacity:1 !important — parent opacity is multiplicative.
        const sticky = stickyRef.current;
        if (sticky) {
          if (raw > 0.75) {
            const t = (raw - 0.75) / 0.25;
            sticky.style.opacity = String(1 - t);
          } else if (sticky.style.opacity !== '') {
            sticky.style.opacity = '';
          }
        }
      }
      pendingP = null;
      rafId    = null;
    };

    // ScrollTrigger created immediately — no longer gated on video loading
    ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: wrapper,
        start:   "top top",
        end:     "bottom bottom",
        scrub:   1.0,
        onUpdate(self) {
          const now = performance.now();
          if (lastProgressTime > 0) {
            const dt = Math.max(now - lastProgressTime, 1);
            const rawVel = (self.progress - lastProgress) / (dt / 1000);
            scrollVel = scrollVel * 0.68 + rawVel * 0.32;
          }
          lastProgress = self.progress;
          lastProgressTime = now;

          // Always fire flush — content reveal must not depend on video
          pendingP = self.progress;
          if (!rafId) rafId = requestAnimationFrame(flush);
        },
      });
    }, wrapper);

    return () => {
      document.removeEventListener("touchstart", unlockVideo);
      video.removeEventListener('canplay', pauseAtStart);
      if (rafId) cancelAnimationFrame(rafId);
      ctx?.revert();
    };
  }, []);

  const toggleSound = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    const next = !soundOn;
    video.muted = !next;
    if (next) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
    setSoundOn(next);
  }, [soundOn]);

  return (
    <>
    <style>{`
      @keyframes about-btn-enter {
        from { opacity: 0; transform: translateY(8px); }
        to   { opacity: 1; transform: none; }
      }
      .about-sound-btn { animation: about-btn-enter .5s var(--ease) .8s both; }

      @media (max-width: 767px) {
        .about-info-grid {
          grid-template-columns: 1fr !important;
          gap: 20px !important;
        }
        .about-content-strip {
          padding: 0 20px 28px !important;
        }
        .about-stats {
          flex-direction: row !important;
          align-items: flex-start !important;
          gap: 20px !important;
          flex-wrap: wrap !important;
        }
        .about-stats > div { text-align: left !important; }
        .about-sound-btn { position: fixed !important; bottom: 24px !important; right: 16px !important; left: auto !important; }
      }
    `}</style>
    <section
      ref={wrapperRef}
      id="about"
      style={{ position: "relative", background: "#13293D" }}
    >
      <div ref={stickyRef} style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", display: "flex", flexDirection: "column" }}>

        <div aria-hidden="true" style={{
          position: "absolute", top: 0, left: 0, right: 0,
          height: "22vh",
          background: "linear-gradient(to bottom, rgba(19,41,61,1) 0%, transparent 100%)",
          zIndex: 6, pointerEvents: "none",
        }} />

        <video
          ref={videoRef}
          src={`${STORAGE}/2-dobrasite-scrub.mp4`}
          autoPlay muted playsInline preload="auto"
          aria-hidden="true"
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover", zIndex: 0,
          }}
        />

        <div aria-hidden="true" style={{
          position: "absolute", inset: 0, zIndex: 1,
          background: `linear-gradient(
            to bottom,
            rgba(19,41,61,.45)  0%,
            rgba(19,41,61,.22) 28%,
            rgba(19,41,61,.38) 52%,
            rgba(19,41,61,.88) 76%,
            rgba(19,41,61,.98) 100%
          )`,
        }} />

        <div aria-hidden="true" style={{
          position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute",
            width: "55vw", height: "55vw",
            bottom: "5%", left: "-5%",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(74,120,196,.07) 0%, transparent 70%)",
            filter: "blur(80px)",
          }} />
        </div>


        <div
          ref={contentRef}
          className="about-content-strip"
          style={{
            position: "relative",
            marginTop: "auto",
            zIndex: 10,
            opacity: 0,
            transform: "translateY(52px)",
            willChange: "opacity, transform",
            padding: "0 clamp(28px, 6vw, 96px) clamp(40px, 6vh, 64px)",
          }}
        >
          <div style={{
            width: "100%", height: 1,
            background: "rgba(232,241,242,.08)",
            marginBottom: "clamp(24px, 4vh, 40px)",
          }} />

          <div className="about-info-grid" style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: "clamp(32px, 6vw, 80px)",
            alignItems: "end",
          }}>

            <div>
              <span style={{
                fontFamily: "var(--f-body)",
                fontSize: 11, letterSpacing: "3px",
                textTransform: "uppercase",
                color: "var(--accent)",
                display: "block", marginBottom: 16,
              }}>
                · 02  ·  Sobre
              </span>

              <h2 style={{
                fontFamily: "var(--f-display)",
                fontSize: "clamp(26px, 4vw, 52px)",
                fontWeight: 900,
                lineHeight: 1.05,
                letterSpacing: "-.03em",
                color: "var(--text)",
                marginBottom: 16,
              }}>
                Software que escala
                <br />
                <span style={{ color: "var(--accent)" }}>nasce da arquitetura.</span>
              </h2>

              <p style={{
                fontFamily: "var(--f-body)",
                fontSize: "clamp(12px, 1.05vw, 14px)",
                lineHeight: 1.80,
                color: "var(--text-muted)",
                maxWidth: 540,
              }}>
                Maioria dos sistemas falha exatamente quando o negócio mais precisa —
                no crescimento. Travam, acumulam retrabalho e viram custo.
                Sou Arquiteto de Software focado em aplicações de alta performance
                para empresas privadas e licitações públicas.{" "}
                <span style={{ color: "rgba(232,241,242,.80)" }}>
                  Aqui, tecnologia é ativo. Não despesa.
                </span>
              </p>
            </div>

            <div className="about-stats" style={{
              display: "flex",
              flexDirection: "column",
              gap: "clamp(20px, 3vh, 32px)",
              alignItems: "flex-end",
              flexShrink: 0,
            }}>
              {[
                { num: "3+",  label: "Anos" },
                { num: "15+", label: "Projetos" },
                { num: "2",   label: "Setores" },
              ].map(stat => (
                <div key={stat.label} style={{ textAlign: "right" }}>
                  <div style={{
                    fontFamily: "var(--f-display)",
                    fontSize: "clamp(32px, 4.5vw, 60px)",
                    fontWeight: 900,
                    lineHeight: 1,
                    letterSpacing: "-.04em",
                    color: "var(--text)",
                  }}>{stat.num}</div>
                  <div style={{
                    fontFamily: "var(--f-body)",
                    fontSize: 10, letterSpacing: "2.5px",
                    textTransform: "uppercase",
                    color: "var(--text-muted)",
                    marginTop: 4,
                  }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <SoundButton on={soundOn} onClick={toggleSound} />

      </div>
    </section>
    </>
  );
}
