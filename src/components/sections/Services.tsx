"use client";
import { useRef, useEffect } from "react";
import { useTilt3D } from "@/hooks/useTilt3D";
import { useAudio } from "@/providers/AudioProvider";


function ArchIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="9" height="9" rx="2.5" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="21" y="2" width="9" height="9" rx="2.5" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="11.5" y="21" width="9" height="9" rx="2.5" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="7" y1="11" x2="16" y2="21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="25" y1="11" x2="16" y2="21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}
function WebIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect x="2" y="5" width="28" height="22" rx="3" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="2" y1="12" x2="30" y2="12" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="8" cy="8.5" r="1.5" fill="currentColor"/>
      <circle cx="13" cy="8.5" r="1.5" fill="currentColor"/>
    </svg>
  );
}
function SystemsIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <ellipse cx="16" cy="8" rx="12" ry="4" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M4 8v8c0 2.2 5.4 4 12 4s12-1.8 12-4V8" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M4 16v6c0 2.2 5.4 4 12 4s12-1.8 12-4v-6" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}
function AutoIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M18 3L5 18h9L11 29 27 14h-9L18 3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round"/>
    </svg>
  );
}
function VideoIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect x="2" y="8" width="19" height="16" rx="2.5" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M21 13L30 9V23L21 19V13Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  );
}

const SERVICES = [
  {
    num: "01", Icon: ArchIcon,
    title: "Arquitetura\nde Software",
    tagline: "Sistemas que sustentam crescimento real.",
    description: "Da primeira linha ao deploy. APIs, microsserviços e decisões de arquitetura que o time consegue manter sem reescrever tudo em 1 ano.",
    items: ["Microsserviços & DDD", "APIs REST e GraphQL", "Code review & refactoring", "Cloud architecture", "Performance & escalabilidade"],
    accent: "#1B98E0", glow: "rgba(27,152,224,.15)",
  },
  {
    num: "02", Icon: WebIcon,
    title: "Desenvolvimento\nWeb",
    tagline: "Sites que convertem. Experiências que ficam.",
    description: "Landing pages, portfólios, sites institucionais e e-commerces com foco em performance, SEO e conversão real.",
    items: ["Landing pages e portfólios", "Sites institucionais", "E-commerce", "Performance e Core Web Vitals", "Animações e UX imersivo"],
    accent: "#4db5eb", glow: "rgba(77,181,235,.15)",
  },
  {
    num: "03", Icon: SystemsIcon,
    title: "Sistemas &\nPlataformas",
    tagline: "Plataformas que o negócio depende.",
    description: "SaaS, ERPs, plataformas B2B e sistemas governamentais — construídos com segurança, compliance e rastreabilidade.",
    items: ["Plataformas SaaS B2B", "Gov Tech e licitações", "ERPs customizados", "Painéis e dashboards", "Integrações com IA"],
    accent: "#247BA0", glow: "rgba(36,123,160,.15)",
  },
  {
    num: "04", Icon: AutoIcon,
    title: "Automações",
    tagline: "Processos manuais viram fluxos automáticos.",
    description: "Elimino gargalos operacionais com automações sob medida — integrações, pipelines de dados e notificações inteligentes.",
    items: ["Automação de processos (RPA)", "Integrações via APIs e webhooks", "Pipelines de dados", "Relatórios automáticos", "Notificações inteligentes"],
    accent: "#22d3a5", glow: "rgba(34,211,165,.15)",
  },
  {
    num: "05", Icon: VideoIcon,
    title: "Produção\nAudiovisual",
    tagline: "Vídeo com identidade para marcas sérias.",
    description: "Edição, motion graphics e identidade visual em vídeo para marcas que precisam ser levadas a sério — não apenas vistas.",
    items: ["Edição de vídeos institucionais", "Motion graphics e After Effects", "Identidade visual audiovisual", "Reels para redes sociais", "Color grade e sound design"],
    accent: "#4A78C4", glow: "rgba(74,120,196,.15)",
  },
] as const;

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll<HTMLElement>(".rv");
    if (!els) return;
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("on"); obs.unobserve(e.target); } }),
      { threshold: 0.10 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="services" style={{
      background: "var(--ground-mid)",
      padding: "clamp(80px,12vh,140px) clamp(28px,6vw,96px)",
      position: "relative",
      overflow: "hidden",
    }}>

      <div aria-hidden="true" style={{
        position: "absolute", top: "15%", left: "50%", transform: "translateX(-50%)",
        width: "80vw", height: "60vw",
        background: "radial-gradient(ellipse, rgba(27,152,224,.04) 0%, transparent 70%)",
        filter: "blur(80px)", pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1280, margin: "0 auto" }}>

        <div className="rv" style={{ marginBottom: "clamp(48px,7vh,88px)" }}>
          <span className="lbl">03 · Especialidades</span>
          <h2 style={{
            fontFamily: "var(--f-display)",
            fontSize: "clamp(40px,6vw,80px)",
            fontWeight: 900, lineHeight: 1,
            letterSpacing: "-.03em",
            color: "var(--text)", marginTop: 20,
          }}>
            O que eu<span style={{ color: "var(--accent)" }}> construo.</span>
          </h2>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))",
          gap: "clamp(16px,2.5vw,24px)",
        }}>
          {SERVICES.map((svc, i) => (
            <ServiceCard key={svc.num} svc={svc} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ svc, delay }: { svc: typeof SERVICES[number]; delay: number }) {
  const { cardRef, shineRef, onMove, onLeave } = useTilt3D(10);
  const { playHover } = useAudio();

  return (
    <div
      className="rv"
      style={{ transitionDelay: `${delay}s`, perspective: "900px" }}
    >
      <div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        onMouseEnter={playHover}
        style={{
          position: "relative",
          background: "rgba(14,30,45,.78)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(232,241,242,.07)",
          borderRadius: "var(--r-lg)",
          padding: "clamp(26px,3.5vw,40px)",
          boxShadow: "0 24px 64px rgba(0,0,0,.22)",
          willChange: "transform",
          overflow: "hidden",
          transformStyle: "preserve-3d",
        }}
      >
  
        <div ref={shineRef} aria-hidden="true" style={{
          position: "absolute", inset: 0,
          borderRadius: "inherit",
          pointerEvents: "none",
          opacity: 0,
          transition: "opacity .2s",
          zIndex: 20,
        }} />

   
        <div aria-hidden="true" style={{
          position: "absolute", top: 0, left: 0, right: 0,
          height: 2,
          background: `linear-gradient(90deg, ${svc.accent} 0%, transparent 100%)`,
          opacity: 0.6,
          borderRadius: "var(--r-lg) var(--r-lg) 0 0",
        }} />

        <span style={{
          fontFamily: "var(--f-body)", fontSize: 10,
          letterSpacing: "3px", textTransform: "uppercase",
          color: svc.accent, display: "block", marginBottom: 18,
        }}>{svc.num}</span>

        <div style={{
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          width: 52, height: 52, borderRadius: 14,
          background: `${svc.glow}`,
          border: `1px solid ${svc.accent}28`,
          color: svc.accent,
          marginBottom: 20,
        }}>
          <svc.Icon />
        </div>

        <h3 style={{
          fontFamily: "var(--f-display)",
          fontSize: "clamp(24px,2.8vw,36px)",
          fontWeight: 900, lineHeight: 1.05,
          letterSpacing: "-.025em",
          color: "var(--text)",
          whiteSpace: "pre-line",
          marginBottom: 10,
        }}>{svc.title}</h3>

        <p style={{
          fontFamily: "var(--f-body)", fontSize: 12,
          color: svc.accent, marginBottom: 14, lineHeight: 1.5,
        }}>{svc.tagline}</p>

        <div style={{ height: 1, background: "rgba(232,241,242,.06)", marginBottom: 18 }} />

        <p style={{
          fontFamily: "var(--f-body)",
          fontSize: "clamp(12px,1.05vw,13px)",
          lineHeight: 1.82, color: "var(--text-muted)",
          marginBottom: 24,
        }}>{svc.description}</p>

        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 9 }}>
          {svc.items.map(item => (
            <li key={item} style={{
              display: "flex", alignItems: "center", gap: 12,
              fontFamily: "var(--f-body)", fontSize: 12,
              color: "var(--text-2)",
            }}>
              <span style={{
                width: 4, height: 4, borderRadius: "50%",
                background: svc.accent, flexShrink: 0, opacity: .8,
              }} />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
