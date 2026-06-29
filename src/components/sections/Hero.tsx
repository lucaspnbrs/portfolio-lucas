"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const STORAGE = process.env.NEXT_PUBLIC_SUPABASE_STORAGE;

function Bloom() {
  return (
    <div aria-hidden="true" style={{
      position:"absolute", inset:0,
      pointerEvents:"none", overflow:"hidden",
    }}>
      <div style={{
        position:"absolute",
        width:"80vw", height:"80vw",
        top:"-20%", left:"50%",
        transform:"translateX(-50%)",
        borderRadius:"50%",
        background:"radial-gradient(circle, rgba(27,152,224,.1) 0%, transparent 65%)",
        filter:"blur(60px)",
      }} />
      <div style={{
        position:"absolute",
        width:"100%", height:"40%",
        bottom:"-10%", left:0,
        background:"radial-gradient(ellipse 70% 50% at 50% 100%, rgba(27,152,224,.08) 0%, transparent 70%)",
        filter:"blur(40px)",
      }} />
    </div>
  );
}

function Grid() {
  return (
    <div aria-hidden="true" className="hero-grid" style={{
      position:"absolute", bottom:0, left:0, right:0, height:"48%",
      backgroundImage:`
        linear-gradient(rgba(27,152,224,.08) 1px, transparent 1px),
        linear-gradient(90deg, rgba(27,152,224,.08) 1px, transparent 1px)
      `,
      backgroundSize:"72px 72px",
      transform:"perspective(700px) rotateX(62deg)",
      transformOrigin:"bottom center",
      maskImage:"linear-gradient(to top, rgba(0,0,0,.4) 0%, transparent 80%)",
      WebkitMaskImage:"linear-gradient(to top, rgba(0,0,0,.4) 0%, transparent 80%)",
      pointerEvents:"none",
    }} />
  );
}

const ORB_CFG = [
  { x:'-1%', y:'16%', s:50, dl:'0s',   dur:'10.2s', ring:false },
  { x:'5%',  y:'54%', s:30, dl:'2.4s', dur:'8.8s',  ring:true  },
  { x:'1%',  y:'80%', s:38, dl:'4.1s', dur:'12.4s', ring:false },
  { x:'14%', y:'30%', s:22, dl:'1.1s', dur:'7.3s',  ring:true  },
  { x:'19%', y:'70%', s:52, dl:'3.7s', dur:'11.1s', ring:false },
  { x:'37%', y:'4%',  s:26, dl:'0.6s', dur:'9.5s',  ring:true  },
  { x:'51%', y:'91%', s:34, dl:'2.2s', dur:'10.8s', ring:false },
  { x:'71%', y:'24%', s:46, dl:'1.8s', dur:'13.2s', ring:false },
  { x:'77%', y:'66%', s:24, dl:'0.3s', dur:'8.2s',  ring:true  },
  { x:'87%', y:'14%', s:60, dl:'0.9s', dur:'11.8s', ring:false },
  { x:'91%', y:'46%', s:36, dl:'3.3s', dur:'9.7s',  ring:true  },
  { x:'85%', y:'74%', s:20, dl:'5.2s', dur:'7.8s',  ring:false },
  { x:'42%', y:'88%', s:28, dl:'1.5s', dur:'9.0s',  ring:true  },
  { x:'60%', y:'5%',  s:18, dl:'3.8s', dur:'8.1s',  ring:false },
] as const;

function FloatOrbs() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const wrappers = Array.from(
      container.querySelectorAll<HTMLElement>("[data-orb-depth]")
    );

    let tx = 0, ty = 0;
    let cx = 0, cy = 0;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX / window.innerWidth  - 0.5;
      ty = e.clientY / window.innerHeight - 0.5;
    };

    const tick = () => {
      cx += (tx - cx) * 0.055;
      cy += (ty - cy) * 0.055;
      wrappers.forEach(el => {
        const d = parseFloat(el.dataset.orbDepth ?? "0.2");
        el.style.transform = `translate(${cx * 58 * d}px,${cy * 40 * d}px)`;
      });
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={containerRef} aria-hidden="true" style={{ position:"absolute", inset:0, pointerEvents:"none", overflow:"hidden" }}>
      {ORB_CFG.map((o, i) => {
        const depth = (0.08 + (o.s / 64) * 0.44).toFixed(2);
        return (
          <div key={i} data-orb-depth={depth}
            style={{ position:"absolute", left:o.x, top:o.y, willChange:"transform" }}>
            <div style={{
              width:o.s, height:o.s,
              borderRadius:"50%",
              background: o.ring
                ? "transparent"
                : "radial-gradient(circle at 38% 38%, rgba(27,152,224,0.18) 0%, rgba(27,152,224,0.05) 60%, transparent 100%)",
              border:`1px solid rgba(27,152,224,${o.ring ? "0.30" : "0.13"})`,
              boxShadow: o.ring
                ? "0 0 22px rgba(27,152,224,0.12), inset 0 0 18px rgba(27,152,224,0.06)"
                : "0 0 16px rgba(27,152,224,0.07)",
              backdropFilter:"blur(2px)",
              animation:`orb-float ${o.dur} ease-in-out ${o.dl} infinite`,
            }} />
          </div>
        );
      })}
      <style>{`
        @keyframes orb-float {
          0%,100% { transform:translateY(0px)   translateX(0px);  opacity:.60 }
          25%      { transform:translateY(-28px) translateX(9px);  opacity:.88 }
          50%      { transform:translateY(-14px) translateX(-6px); opacity:.68 }
          75%      { transform:translateY(-34px) translateX(4px);  opacity:.80 }
        }
      `}</style>
    </div>
  );
}

function ScrollHint() {
  return (
    <div aria-hidden="true" className="hero-scroll-hint" style={{
      position:"absolute", bottom:32, left:"50%", transform:"translateX(-50%)",
      display:"flex", flexDirection:"column", alignItems:"center", gap:10,
      opacity:0, animation:"fade-up .6s var(--ease) 2.2s forwards",
    }}>
      <div style={{
        width:1, height:52,
        background:"linear-gradient(to bottom, var(--accent), transparent)",
        animation:"drip 2s ease-in-out infinite",
      }} />
      <span style={{
        fontFamily:"var(--f-body)", fontSize:9,
        letterSpacing:"3px", textTransform:"uppercase",
        color:"var(--text-subtle)",
      }}>scroll</span>
      <style>{`
        @keyframes drip {
          0%  { transform:scaleY(0); transform-origin:top;    opacity:0 }
          40% { transform:scaleY(1); transform-origin:top;    opacity:1 }
          60% { transform:scaleY(1); transform-origin:bottom; opacity:1 }
          100%{ transform:scaleY(0); transform-origin:bottom; opacity:0 }
        }
        @keyframes fade-up { to { opacity:1; transform:translateX(-50%) translateY(0) } }
      `}</style>
    </div>
  );
}

function SoundButton({ on, onClick }: { on: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={on ? "Mute" : "Unmute"}
      className="hero-sound-btn"
      style={{
        position:"absolute", bottom:32, right:40, zIndex:20,
        display:"flex", alignItems:"center", gap:8,
        padding:"7px 14px", borderRadius:"var(--r-p)",
        border:"1px solid", borderColor: on ? "var(--border-hi)" : "var(--border)",
        fontFamily:"var(--f-body)", fontSize:9, fontWeight:500,
        letterSpacing:"2.5px", textTransform:"uppercase",
        color: on ? "var(--chrome)" : "var(--text-subtle)",
        background:"rgba(19,41,61,.75)", backdropFilter:"blur(12px)",
        boxShadow: on ? "0 0 22px var(--accent-glow)" : "none",
        transition:"all .3s var(--ease)",
        opacity:0, animation:"fade-up .6s var(--ease) 2.4s forwards",
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


export default function Hero() {
  const wrapperRef  = useRef<HTMLElement>(null);
  const videoRef    = useRef<HTMLVideoElement>(null);
  const eyebrowRef  = useRef<HTMLDivElement>(null);
  const titleRef    = useRef<HTMLHeadingElement>(null);
  const copyRef     = useRef<HTMLParagraphElement>(null);
  const subRef      = useRef<HTMLDivElement>(null);
  const ctasRef     = useRef<HTMLDivElement>(null);
  const lineRef     = useRef<HTMLDivElement>(null);

  const heroContentRef = useRef<HTMLDivElement>(null);
  const stRef = useRef<ScrollTrigger | null>(null);

  const [soundOn, setSoundOn] = useState(false);

  useEffect(() => {
    const video   = videoRef.current;
    const wrapper = wrapperRef.current;
    if (!video || !wrapper) return;

    if ('ontouchstart' in window) {
      video.loop = true;
      video.style.willChange = 'transform';
      video.style.transform  = 'scale(1.12)';

      let rafId: number;
      let lastP = -1;

      const tick = () => {
        const rect = wrapper.getBoundingClientRect();
        const h    = window.innerHeight;
        const p    = Math.max(0, Math.min(1, -rect.top / h));
        if (Math.abs(p - lastP) > 0.0005) {
          lastP = p;
          video.style.transform = `scale(1.12) translateY(${p * 55}px)`;
          const hc = heroContentRef.current;
          if (hc) {
            if (p > 0) {
              hc.style.opacity   = String(Math.max(0, 1 - p * 2));
              hc.style.transform = `translateY(${-p * 65}px)`;
            } else {
              hc.style.opacity   = '';
              hc.style.transform = '';
            }
          }
        }
        rafId = requestAnimationFrame(tick);
      };
      rafId = requestAnimationFrame(tick);

      return () => {
        cancelAnimationFrame(rafId);
        video.style.willChange = '';
        video.style.transform  = '';
        const hc = heroContentRef.current;
        if (hc) { hc.style.opacity = ''; hc.style.transform = ''; }
      };
    }

    let rafId: number | null = null;
    let pendingTime: number | null = null;

    let lastProgress = 0;
    let lastProgressTime = 0;
    let scrollVel = 0;

    const unlockVideo = () => {
      video.play().then(() => video.pause()).catch(() => {});
    };
    document.addEventListener("touchstart", unlockVideo, { once: true, passive: true });

    const pauseAtStart = () => { video.pause(); video.currentTime = 0; };
    video.addEventListener('canplay', pauseAtStart, { once: true });

    const flushSeek = () => {
      if (pendingTime !== null && video.readyState >= 2) {
        const target = pendingTime;

        if (!video.muted) {

          const rate = scrollVel * video.duration;
          video.playbackRate = scrollVel > 0.1 ? Math.min(3.5, Math.max(0.5, rate)) : 1;
          if (video.paused) video.play().catch(() => {});
          if (scrollVel > 0.1 && Math.abs(video.currentTime - target) > 1.5) {
            video.currentTime = target;
          }
        } else {
          if (!video.paused) video.pause();
          video.currentTime = target;
        }
      }
      pendingTime = null;
      rafId = null;
    };


    const ctx = gsap.context(() => {

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(lineRef.current,   { scaleX: 0, duration: .9, delay: .3, transformOrigin:"left" })
        .from(eyebrowRef.current, { y: 16, opacity: 0, duration: .6 }, "-=.4")
        .from(titleRef.current,   { y: 80, opacity: 0, duration: 1.1, rotateX: 10, transformPerspective: 1200 }, "-=.35")
        .from(copyRef.current,    { y: 24, opacity: 0, duration: .8 }, "-=.55")
        .from(subRef.current,     { y: 20, opacity: 0, duration: .7 }, "-=.55")
        .from(ctasRef.current,    { y: 16, opacity: 0, duration: .6 }, "-=.5");

      const st = ScrollTrigger.create({
        trigger: wrapper,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        onUpdate(self) {
          const now = performance.now();
          if (lastProgressTime > 0) {
            const dt = Math.max(now - lastProgressTime, 1);
            const rawVel = (self.progress - lastProgress) / (dt / 1000);
            scrollVel = scrollVel * 0.68 + rawVel * 0.32;
          }
          lastProgress = self.progress;
          lastProgressTime = now;

          const hc = heroContentRef.current;
          if (hc) {
            const p = self.progress;
            if (p > 0.75) {
              const t = (p - 0.75) / 0.25;
              hc.style.opacity = String(1 - t);
              hc.style.transform = `translateY(${-t * 60}px)`;
            } else if (hc.style.opacity !== '') {
              hc.style.opacity = '';
              hc.style.transform = '';
            }
          }

          if (video.readyState >= 1 && video.duration) {
            pendingTime = self.progress * video.duration;
            if (!rafId) rafId = requestAnimationFrame(flushSeek);
          }
        },
      });
      stRef.current = st;
    }, wrapper);

    return () => {
      document.removeEventListener("touchstart", unlockVideo);
      video.removeEventListener('canplay', pauseAtStart);
      if (rafId) cancelAnimationFrame(rafId);
      stRef.current = null;
      ctx.revert();
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
    <section ref={wrapperRef} id="hero" style={{ position:"relative" }}>
      <div style={{ position:"sticky", top:0, height:"100vh", overflow:"hidden" }}>

        <video
          ref={videoRef}
          src={'/videosite_scrub.mp4'}
          autoPlay muted playsInline preload="auto"
          aria-hidden="true"
          style={{
            position:"absolute", inset:0,
            width:"100%", height:"100%",
            objectFit:"cover", zIndex:0,
          }}
        />

        <div aria-hidden="true" className="hero-overlay" style={{
          position:"absolute", inset:0, zIndex:1,
          background:`linear-gradient(
            to bottom,
            rgba(19,41,61,.92)  0%,
            rgba(19,41,61,.78) 30%,
            rgba(19,41,61,.84) 58%,
            rgba(19,41,61,.97) 78%,
            rgba(19,41,61,1.0) 100%
          )`,
        }} />

        <div style={{ position:"absolute", inset:0, zIndex:2 }}><Bloom /></div>
        <div style={{ position:"absolute", inset:0, zIndex:2 }}><Grid  /></div>
        <div style={{ position:"absolute", inset:0, zIndex:3 }}><FloatOrbs /></div>

        <div ref={heroContentRef} className="hero-content" style={{
          position:"relative", zIndex:10,
          height:"100%",
          display:"flex", flexDirection:"column",
          alignItems:"center", justifyContent:"center",
          textAlign:"center",
          padding:"140px 48px 100px",
        }}>

          <div className="hero-eyebrow-wrap" style={{ display:"flex", flexDirection:"column", alignItems:"center", marginBottom:36 }}>
            <div ref={lineRef} style={{
              width:48, height:1,
              background:`linear-gradient(90deg, transparent, var(--accent), transparent)`,
              marginBottom:18,
            }} />

            <div ref={eyebrowRef} className="hero-eyebrow" style={{
              display:"inline-flex", alignItems:"center", gap:14,
              fontFamily:"var(--f-body)", fontSize:"clamp(11px, 1.1vw, 13px)", fontWeight:400,
              letterSpacing:"3.5px", textTransform:"uppercase",
              color:"var(--text-muted)",
            }}>
              <span className="hero-eyebrow-line" style={{ width:24, height:1, background:"var(--accent)", display:"block" }} />
              Arquitetura de Software e Edição de Vídeos
              <span className="hero-eyebrow-line" style={{ width:24, height:1, background:"var(--accent)", display:"block" }} />
            </div>
          </div>

          <h1 ref={titleRef} className="hero-title" style={{
            fontFamily:"var(--f-display)",
            fontSize:"clamp(40px, 9.2vw, 138px)",
            fontWeight:900,
            lineHeight:.88,
            letterSpacing:"-.02em",
            textTransform:"uppercase",
            marginBottom:32,
            position:"relative",
            color:"var(--text)",
          }}>
            Lucas Barros

            <span aria-hidden="true" style={{
              position:"absolute", bottom:-4, left:"50%",
              transform:"translateX(-50%) scaleX(0)",
              width:"60%", height:2, borderRadius:1,
              background:"linear-gradient(90deg, transparent, var(--accent), transparent)",
              animation:"spark .7s var(--ease-expo) 2s forwards",
            }} />
          </h1>

          <p ref={copyRef} className="hero-copy" style={{
            fontFamily:"var(--f-body)",
            fontSize:"clamp(13px, 1.4vw, 18px)",
            fontWeight:400,
            lineHeight:1.75,
            color:"var(--text-2)",
            maxWidth:800,
            margin:"0 auto 32px",
            textAlign:"center",
          }}>
            Tecnologia instável e conteúdo esquecível custam mais do que você imagina.{" "}
            Sistemas escaláveis e confiáveis e vídeos com identidade visual forte —
            para a sua marca ser levada a sério e o seu sistema nunca ser o gargalo.
          </p>

          <div ref={subRef} className="hero-tags" style={{
            display:"flex", flexWrap:"wrap", gap:8,
            justifyContent:"center",
            margin:"0 auto 52px",
          }}>
            {["Interfaces imersivas", "Animações 3D", "Código que performa"].map(tag => (
              <span key={tag} style={{
                fontFamily:"var(--f-body)",
                fontSize:"clamp(10px, .95vw, 12px)",
                fontWeight:400,
                letterSpacing:"2.5px",
                textTransform:"uppercase",
                color:"var(--text-2)",
                padding:"6px 16px",
                border:"1px solid rgba(27,152,224,.22)",
                borderRadius:"9999px",
                background:"rgba(27,152,224,.06)",
              }}>{tag}</span>
            ))}
          </div>

          <div ref={ctasRef} className="hero-ctas" style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
            <a href="#projects" className="btn btn--hi btn--lg">Ver projetos</a>
            <a href="https://w.app/znqtuc"target="_blank"  className="btn btn--ghost btn--lg">Fale comigo →</a>
          </div>
        </div>

        <SoundButton on={soundOn} onClick={toggleSound} />
        <ScrollHint />

        <style>{`
          @keyframes spark { to { transform:translateX(-50%) scaleX(1) } }

          /* Override the global fade-up (which has translateX(-50%)) so the
             sound button fades in without any horizontal shift. */
          @keyframes btn-enter {
            from { opacity: 0; transform: translateY(8px); }
            to   { opacity: 1; transform: none; }
          }
          .hero-sound-btn { animation: btn-enter .6s var(--ease) 2.4s both !important; }

          @media (max-width: 767px) {
            .hero-content {
              padding: 96px 20px 60px !important;
              justify-content: center !important;
            }
            .hero-eyebrow-wrap { margin-bottom: 18px !important; }
            .hero-eyebrow {
              font-size: 9px !important;
              letter-spacing: 2px !important;
              gap: 8px !important;
            }
            .hero-eyebrow-line { display: none !important; }
            .hero-title { margin-bottom: 16px !important; }
            .hero-copy {
              font-size: 13px !important;
              line-height: 1.6 !important;
              margin: 0 auto 18px !important;
            }
            .hero-tags {
              margin: 0 auto 24px !important;
              gap: 6px !important;
            }
            .hero-tags span {
              font-size: 9px !important;
              padding: 5px 12px !important;
              letter-spacing: 1.5px !important;
            }
            .hero-ctas {
              flex-direction: column !important;
              width: 100% !important;
              gap: 10px !important;
            }
            .hero-ctas .btn {
              width: 100% !important;
              justify-content: center !important;
            }
            .hero-sound-btn { position: fixed !important; bottom: 24px !important; right: 16px !important; left: auto !important; }
            .hero-scroll-hint { display: none !important; }
            .hero-grid { display: none !important; }
          }
        `}</style>
      </div>
    </section>
  );
}
