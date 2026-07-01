"use client";
import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAudio } from "@/providers/AudioProvider";

const PROJECTS = [
  {
    id: "gov",  num: "01", category: "Gov Tech",
    title: "Plataforma de\nProcurement Público",
    description: "Sistema de licitações para órgão federal com módulo de IA para análise automática de propostas e detecção de irregularidades em contratos.",
    tags: ["Next.js", "Node.js", "PostgreSQL", "GPT-4"],
    year: "2024", link: "#", linkLabel: "Confidencial", linkDisabled: true,
    accent: "#1B98E0",
    gradient: "linear-gradient(140deg,#040e1a 0%,#071828 50%,#003a58 100%)",
  },
  {
    id: "b2b",  num: "02", category: "Plataforma Pública",
    title: "Plataforma de\nDenúncias de Arboviroses",
    description: "SaaS para denúncia e gestão de doenças negligenciadas. A gestão ocorre por meio dos administrações diretas e indiretas do poder público e a denúnica por meio da população.",
    tags: ["Next", "Microservices", "Vercel & Render", "Redis"],
    year: "2026", link: "https://arboviroses-front.vercel.app/", linkLabel: "Ver Projeto", linkDisabled: false,
    accent: "#4db5eb",
    gradient: "linear-gradient(140deg,#060f1a 0%,#091522 50%,#0e4a7a 100%)",
  },
  {
    id: "ai",   num: "03", category: "IA Aplicada",
    title: "Site Empresarial\n+ Automação",
    description: "Site Empresarial para posicionamento de marca. Performático otimizado para desktop, tablet e mobile. Uma automação foi feita com o intuito de ser um braço de compliance em conjunto com o sistema",
    tags: ["Next.js", "TypeScript", "N8N", "Motion React"],
    year: "2024", link: "https://grupoferreirasupermercados.com.br/", linkLabel: "Ver Projeto", linkDisabled: false,
    accent: "#247BA0",
    gradient: "linear-gradient(140deg,#050e18 0%,#081520 50%,#0d3d55 100%)",
  },
  {
    id: "video", num: "04", category: "Audiovisual",
    title: "Portfólio de\nEdição & Motion",
    description: "Projetos de edição de vídeo, motion graphics e identidade audiovisual para marcas — do conceito ao corte final.",
    tags: ["Premiere Pro", "CapCut Pro", "DaVinci", "Motion"],
    year: "2024",
    link: "https://drive.google.com/drive/folders/1WDfu_6TlNPjQukcx59gHhqz9vSsp8erO",
    linkLabel: "Ver no Drive", linkDisabled: false,
    accent: "#4A78C4",
    gradient: "linear-gradient(140deg,#060810 0%,#0c1128 50%,#1e2e5a 100%)",
  },
];

/* ─── SVG VISUALS ─────────────────────────────────────── */

function NetworkVisual({ accent }: { accent: string }) {
  const nodes = [
    {cx:200,cy:60,r:16},{cx:90,cy:160,r:10},{cx:310,cy:160,r:10},
    {cx:60,cy:290,r:8},{cx:200,cy:290,r:13},{cx:340,cy:290,r:8},
    {cx:130,cy:390,r:7},{cx:270,cy:390,r:7},
  ];
  const edges = [[0,1],[0,2],[1,3],[1,4],[2,4],[2,5],[3,6],[4,6],[4,7],[5,7]];
  return (
    <svg viewBox="0 0 400 450" fill="none" style={{width:"88%",maxWidth:360}}>
      <defs>
        <filter id="gn2"><feGaussianBlur stdDeviation="3.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <radialGradient id="ng1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.18"/>
          <stop offset="100%" stopColor={accent} stopOpacity="0"/>
        </radialGradient>
      </defs>
      {/* Outer orbit ring */}
      <circle cx="200" cy="220" r="190" stroke={`${accent}12`} strokeWidth="1" strokeDasharray="4 8"/>
      <circle cx="200" cy="220" r="130" stroke={`${accent}10`} strokeWidth="1" strokeDasharray="2 12"/>

      {edges.map(([a,b],i)=>(
        <line key={i} x1={nodes[a].cx} y1={nodes[a].cy} x2={nodes[b].cx} y2={nodes[b].cy}
          stroke={`${accent}30`} strokeWidth="1.2"/>
      ))}
      {edges.map(([a,b],i)=>(
        <circle key={`ep${i}`} r="3.5" fill={accent} filter="url(#gn2)" opacity="0.9">
          <animateMotion dur={`${2.2+i*0.25}s`} begin={`${i*0.35}s`} repeatCount="indefinite"
            path={`M${nodes[a].cx},${nodes[a].cy}L${nodes[b].cx},${nodes[b].cy}`}/>
        </circle>
      ))}
      {nodes.map((n,i)=>(
        <g key={i}>
          <circle cx={n.cx} cy={n.cy} r={n.r*3.5} fill={`${accent}08`}/>
          <circle cx={n.cx} cy={n.cy} r={n.r*2} fill={`${accent}14`}>
            <animate attributeName="r" values={`${n.r*2};${n.r*3};${n.r*2}`} dur={`${2.8+i*0.3}s`} repeatCount="indefinite"/>
          </circle>
          <circle cx={n.cx} cy={n.cy} r={n.r} fill={`${accent}40`} stroke={accent} strokeWidth="1.5" filter="url(#gn2)"/>
        </g>
      ))}
    </svg>
  );
}

function DashboardVisual({ accent }: { accent: string }) {
  const bars = [52,70,40,88,64,48,82,60,76,44];
  return (
    <div style={{width:"88%",maxWidth:360}}>
      <style>{`@keyframes brise{from{transform:scaleY(0);transform-origin:bottom}to{transform:scaleY(1);transform-origin:bottom}}`}</style>
      <div style={{background:"rgba(0,0,0,.55)",backdropFilter:"blur(12px)",border:"1px solid rgba(255,255,255,.08)",borderRadius:16,overflow:"hidden"}}>
        {/* Header bar */}
        <div style={{padding:"14px 20px",borderBottom:"1px solid rgba(255,255,255,.06)",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{display:"flex",gap:6}}>
            {["#ff5f57","#febc2e","#28c840"].map(c=>(
              <div key={c} style={{width:10,height:10,borderRadius:"50%",background:c,opacity:.7}}/>
            ))}
          </div>
          <span style={{fontFamily:"var(--f-body)",fontSize:9,letterSpacing:"2px",textTransform:"uppercase",color:`${accent}90`}}>Dashboard · Live</span>
          <div style={{width:6,height:6,borderRadius:"50%",background:"#22d3a5",boxShadow:"0 0 6px #22d3a5"}}/>
        </div>
        <div style={{padding:"18px 20px 20px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
            <div>
              <div style={{fontFamily:"var(--f-body)",fontSize:9,letterSpacing:"2px",textTransform:"uppercase",color:`${accent}80`,marginBottom:4}}>Receita Mensal</div>
              <div style={{fontFamily:"var(--f-display)",fontSize:28,fontWeight:900,color:"white",lineHeight:1}}>R$2.4M</div>
              <span style={{fontSize:10,color:"#22d3a5",fontFamily:"var(--f-body)"}}>▲ +34% vs anterior</span>
            </div>
            <div style={{textAlign:"right"}}>
              <div style={{fontFamily:"var(--f-body)",fontSize:9,color:"rgba(255,255,255,.28)",letterSpacing:"1px"}}>Jan–Dez 2024</div>
              <div style={{fontFamily:"var(--f-display)",fontSize:14,fontWeight:700,color:"rgba(255,255,255,.6)",marginTop:2}}>1.247 usuários</div>
            </div>
          </div>

          <div style={{display:"flex",alignItems:"flex-end",gap:4,height:72,marginBottom:14}}>
            {bars.map((h,i)=>(
              <div key={i} style={{flex:1,height:`${h}%`,background:i===bars.length-1?accent:i===3?`${accent}cc`:`${accent}44`,borderRadius:"3px 3px 0 0",animation:`brise .8s ease-out ${i*0.06}s both`}}/>
            ))}
          </div>

          <div style={{height:"1px",background:"rgba(255,255,255,.06)",margin:"0 0 12px"}}/>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
            {[["Módulos","8"],["SLA","99.9%"],["Tempo","<120ms"]].map(([k,v])=>(
              <div key={k} style={{background:"rgba(255,255,255,.04)",borderRadius:8,padding:"8px 10px"}}>
                <div style={{fontFamily:"var(--f-body)",fontSize:8,color:"rgba(255,255,255,.28)",letterSpacing:"1.5px",textTransform:"uppercase",marginBottom:3}}>{k}</div>
                <div style={{fontFamily:"var(--f-display)",fontSize:13,fontWeight:700,color:"rgba(255,255,255,.88)"}}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function NeuralVisual({ accent }: { accent: string }) {
  const layers = [
    [{x:60,y:60},{x:60,y:160},{x:60,y:260},{x:60,y:360}],
    [{x:170,y:35},{x:170,y:110},{x:170,y:185},{x:170,y:260},{x:170,y:335}],
    [{x:280,y:80},{x:280,y:180},{x:280,y:280},{x:280,y:360}],
    [{x:370,y:140},{x:370,y:250}],
  ];
  const conns: Array<{x1:number;y1:number;x2:number;y2:number;di:number}>=[];
  let di=0;
  for(let l=0;l<layers.length-1;l++)
    for(const a of layers[l]) for(const b of layers[l+1])
      conns.push({x1:a.x,y1:a.y,x2:b.x,y2:b.y,di:di++});
  return (
    <svg viewBox="0 0 430 420" fill="none" style={{width:"88%",maxWidth:360}}>
      <defs>
        <filter id="gai2"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      {/* Layer labels */}
      {["INPUT","HIDDEN 1","HIDDEN 2","OUTPUT"].map((lbl,i)=>(
        <text key={i} x={[60,170,280,370][i]} y={410} textAnchor="middle"
          fontFamily="var(--f-body)" fontSize="9" letterSpacing="1.5" fill={`${accent}50`}>{lbl}</text>
      ))}
      {conns.map(c=>(<line key={c.di} x1={c.x1} y1={c.y1} x2={c.x2} y2={c.y2} stroke={`${accent}18`} strokeWidth="0.9"/>))}
      {conns.filter((_,i)=>i%3===0).map(c=>(
        <circle key={`cp${c.di}`} r="3" fill={accent} filter="url(#gai2)">
          <animateMotion dur={`${1.4+(c.di%5)*0.18}s`} begin={`${(c.di%7)*0.2}s`} repeatCount="indefinite"
            path={`M${c.x1},${c.y1}L${c.x2},${c.y2}`}/>
        </circle>
      ))}
      {layers.flat().map((n,i)=>(
        <g key={i}>
          <circle cx={n.x} cy={n.y} r={26} fill={`${accent}06`}/>
          <circle cx={n.x} cy={n.y} r={13} fill={`${accent}18`} stroke={`${accent}60`} strokeWidth="1" filter="url(#gai2)">
            <animate attributeName="opacity" values="0.45;1;0.45" dur={`${1.8+i*0.22}s`} repeatCount="indefinite"/>
          </circle>
          <circle cx={n.x} cy={n.y} r={5} fill={accent} filter="url(#gai2)"/>
        </g>
      ))}
    </svg>
  );
}

function WaveformVisual({ accent }: { accent: string }) {
  const bars = Array.from({length:32},(_,i)=>({
    h:Math.round(20+Math.abs(Math.sin(i*0.76)*56+Math.cos(i*0.44)*22)),
    dur:`${0.48+(i%5)*0.13}s`,del:`${i*0.035}s`,
  }));
  return (
    <div style={{width:"88%",maxWidth:360}}>
      <style>{`@keyframes wfb{from{transform:scaleY(.15)}to{transform:scaleY(1)}}`}</style>
      <div style={{background:"rgba(0,0,0,.5)",backdropFilter:"blur(12px)",border:"1px solid rgba(255,255,255,.08)",borderRadius:16,overflow:"hidden"}}>
        <div style={{padding:"14px 20px",borderBottom:"1px solid rgba(255,255,255,.06)",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span style={{fontFamily:"var(--f-body)",fontSize:9,letterSpacing:"2px",textTransform:"uppercase",color:`${accent}80`}}>Timeline · Export</span>
          <div style={{display:"flex",gap:12}}>
            {["4K","60fps","HDR"].map(t=>(
              <span key={t} style={{fontFamily:"var(--f-body)",fontSize:8,color:"rgba(255,255,255,.35)",letterSpacing:"1px"}}>{t}</span>
            ))}
          </div>
        </div>
        <div style={{padding:"20px 20px 0"}}>
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
            <div style={{width:36,height:36,borderRadius:8,background:`${accent}20`,border:`1px solid ${accent}30`,display:"flex",alignItems:"center",justifyContent:"center"}}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <polygon points="3,1 13,7 3,13" fill={accent}/>
              </svg>
            </div>
            <div>
              <div style={{fontFamily:"var(--f-display)",fontSize:13,fontWeight:700,color:"white"}}>Seq_Master_v3.prproj</div>
              <div style={{fontFamily:"var(--f-body)",fontSize:9,color:"rgba(255,255,255,.3)",letterSpacing:"1px"}}>02:34:18 · 847 clips</div>
            </div>
          </div>

          <div style={{display:"flex",alignItems:"flex-end",gap:2.5,height:80,justifyContent:"center",marginBottom:0}}>
            {bars.map((b,i)=>(
              <div key={i} style={{width:7,height:b.h,borderRadius:"2px 2px 0 0",background:i%8===0?accent:i%4===0?`${accent}88`:`${accent}45`,animation:`wfb ${b.dur} ease-in-out ${b.del} infinite alternate`,transformOrigin:"bottom"}}/>
            ))}
          </div>
        </div>
        <div style={{padding:"10px 20px 16px",borderTop:"1px solid rgba(255,255,255,.05)",display:"flex",justifyContent:"space-between",marginTop:4}}>
          {["Premiere","After Effects","DaVinci","Motion"].map(tool=>(
            <span key={tool} style={{fontFamily:"var(--f-body)",fontSize:8,letterSpacing:"1px",color:"rgba(255,255,255,.28)"}}>{tool}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

const VISUALS: Record<string, ({ accent }: { accent: string }) => React.JSX.Element> = {
  gov: NetworkVisual, b2b: DashboardVisual, ai: NeuralVisual, video: WaveformVisual,
};

/* ─── HUD CORNERS ───────────────────────────────────────── */
function HudCorners({ accent, size = 28 }: { accent: string; size?: number }) {
  const s = size;
  const c = `${accent}50`;
  const t = 2;
  return (
    <>
      <div style={{position:"absolute",top:20,left:20,width:s,height:s,borderTop:`${t}px solid ${c}`,borderLeft:`${t}px solid ${c}`,borderRadius:"2px 0 0 0"}}/>
      <div style={{position:"absolute",top:20,right:20,width:s,height:s,borderTop:`${t}px solid ${c}`,borderRight:`${t}px solid ${c}`,borderRadius:"0 2px 0 0"}}/>
      <div style={{position:"absolute",bottom:20,left:20,width:s,height:s,borderBottom:`${t}px solid ${c}`,borderLeft:`${t}px solid ${c}`,borderRadius:"0 0 0 2px"}}/>
      <div style={{position:"absolute",bottom:20,right:20,width:s,height:s,borderBottom:`${t}px solid ${c}`,borderRight:`${t}px solid ${c}`,borderRadius:"0 0 2px 0"}}/>
    </>
  );
}

/* ─── MAIN COMPONENT ────────────────────────────────────── */
export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);
  const dotsRef    = useRef<HTMLDivElement>(null);
  const { playClick } = useAudio();

  useEffect(() => {
    const section = sectionRef.current;
    const track   = trackRef.current;
    if (!section || !track) return;

    if (window.innerWidth < 768) return;

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate(self) {
            const idx = Math.min(PROJECTS.length - 1, Math.floor(self.progress * PROJECTS.length));
            dotsRef.current?.querySelectorAll<HTMLElement>(".pdot").forEach((d, i) => {
              d.style.opacity = i === idx ? "1" : "0.2";
              d.style.width   = i === idx ? "22px" : "6px";
            });
          },
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        /* keyframes */
        @keyframes ping-ring {
          0%   { transform: translate(-50%,-50%) scale(.6); opacity: .7 }
          100% { transform: translate(-50%,-50%) scale(1.5); opacity: 0 }
        }
        @keyframes scan-line {
          0%   { transform: translateY(-100%); opacity: 0 }
          10%  { opacity: .4 }
          90%  { opacity: .4 }
          100% { transform: translateY(100vh); opacity: 0 }
        }

        /* Desktop: full horizontal scroll */
        #projects { height: 400vh; }

        /* Mobile: vertical stack */
        @media (max-width: 767px) {
          #projects   { height: auto; }
          .proj-sticky { position: relative !important; height: auto !important; overflow: visible !important; }
          .proj-track  { display: block !important; width: 100% !important; height: auto !important; transform: none !important; }
          .pc {
            width: 100% !important; height: auto !important;
            min-height: 0 !important;
            display: flex !important; flex-direction: column !important;
          }
          .pc-info {
            padding: 40px 24px 36px !important;
            min-height: 0 !important;
            justify-content: flex-start !important;
          }
          .pc-info-top { top: 20px !important; left: 24px !important; right: 24px !important; }
          .pc-vis { height: 62vw !important; min-height: 220px !important; }
          .pdots  { display: none !important; }
          .proj-section-label { display: none !important; }
        }
        @media (min-width: 768px) and (max-width: 1100px) {
          .pc { grid-template-columns: 46% 54% !important; }
        }
      `}</style>

      <section
        ref={sectionRef}
        id="projects"
        style={{ background: "var(--ground)", position: "relative" }}
      >
        {/* Section label — top of sticky viewport */}
        <div className="proj-sticky" style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>

          {/* Progress dots */}
          <div ref={dotsRef} className="pdots" style={{
            position: "absolute", right: 28, top: "50%",
            transform: "translateY(-50%)",
            zIndex: 100, display: "flex", flexDirection: "column", gap: 10,
            pointerEvents: "none",
          }}>
            {PROJECTS.map((_, i) => (
              <div key={i} className="pdot" style={{
                height: 6, borderRadius: 3,
                width: i === 0 ? 22 : 6,
                background: "var(--accent)",
                opacity: i === 0 ? 1 : 0.2,
                transition: "width .35s var(--ease), opacity .35s var(--ease)",
              }}/>
            ))}
          </div>

          {/* Track */}
          <div ref={trackRef} className="proj-track" style={{
            display: "flex",
            width: `${PROJECTS.length * 100}vw`,
            height: "100vh",
            willChange: "transform",
          }}>
            {PROJECTS.map((p) => {
              const Visual = VISUALS[p.id];
              return (
                <div key={p.id} className="pc" style={{
                  width: "100vw", height: "100vh", flexShrink: 0,
                  display: "grid", gridTemplateColumns: "42% 58%",
                }}>

                  {/* ── LEFT PANEL ── */}
                  <div className="pc-info" style={{
                    background: "linear-gradient(160deg, rgba(6,14,26,.99) 0%, rgba(9,19,32,.98) 60%, rgba(8,18,30,.99) 100%)",
                    display: "flex", flexDirection: "column", justifyContent: "center",
                    padding: "0 clamp(36px,5vw,88px)",
                    borderRight: "1px solid rgba(232,241,242,.05)",
                    position: "relative", overflow: "hidden",
                  }}>

                    {/* Subtle dot grid */}
                    <div aria-hidden="true" style={{
                      position: "absolute", inset: 0, pointerEvents: "none",
                      backgroundImage: `radial-gradient(circle, ${p.accent}18 1px, transparent 1px)`,
                      backgroundSize: "32px 32px",
                      opacity: 0.4,
                    }}/>

                    {/* Left glow accent */}
                    <div aria-hidden="true" style={{
                      position: "absolute", left: 0, top: "15%", bottom: "15%",
                      width: 3,
                      background: `linear-gradient(to bottom, transparent, ${p.accent}, transparent)`,
                      borderRadius: "0 2px 2px 0",
                    }}/>

                    {/* Top meta bar */}
                    <div className="pc-info-top" style={{
                      position: "absolute", top: 32, left: "clamp(36px,5vw,88px)", right: 32,
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{
                          fontFamily: "var(--f-body)", fontSize: 9,
                          letterSpacing: "2.5px", textTransform: "uppercase",
                          color: p.accent, opacity: 0.9,
                        }}>· {p.num}</span>
                        <span style={{ width: 1, height: 10, background: `${p.accent}40`, display: "block" }}/>
                        <span style={{
                          fontFamily: "var(--f-body)", fontSize: 9,
                          letterSpacing: "2px", textTransform: "uppercase",
                          color: "rgba(232,241,242,.35)",
                        }}>{p.category}</span>
                      </div>
                      <span style={{
                        fontFamily: "var(--f-body)", fontSize: 9,
                        letterSpacing: "2px",
                        color: "rgba(232,241,242,.22)",
                      }}>{p.year}</span>
                    </div>

                    {/* Ghost watermark number */}
                    <span aria-hidden="true" style={{
                      position: "absolute", bottom: -20, right: -10,
                      fontFamily: "var(--f-display)",
                      fontSize: "clamp(140px,20vw,300px)",
                      fontWeight: 900, lineHeight: 1,
                      color: "transparent",
                      WebkitTextStroke: `1px ${p.accent}14`,
                      pointerEvents: "none", userSelect: "none",
                    }}>{p.num}</span>

                    {/* Main content */}
                    <div style={{ position: "relative", zIndex: 2 }}>

                      {/* Category badge */}
                      <span style={{
                        display: "inline-flex", alignItems: "center", gap: 8,
                        padding: "5px 14px", borderRadius: 9999,
                        background: `${p.accent}10`, border: `1px solid ${p.accent}28`,
                        fontFamily: "var(--f-body)", fontSize: 10,
                        letterSpacing: "2px", textTransform: "uppercase",
                        color: p.accent, marginBottom: 24,
                      }}>
                        <span style={{ width: 5, height: 5, borderRadius: "50%", background: p.accent, display: "block" }}/>
                        {p.category}
                      </span>

                      <h2 style={{
                        fontFamily: "var(--f-display)",
                        fontSize: "clamp(28px,3.8vw,62px)",
                        fontWeight: 900, lineHeight: 1.02,
                        letterSpacing: "-.03em",
                        color: "var(--text)", whiteSpace: "pre-line",
                        marginBottom: 20,
                      }}>{p.title}</h2>

                      {/* Accent line */}
                      <div style={{
                        width: 40, height: 2, borderRadius: 1,
                        background: `linear-gradient(90deg, ${p.accent}, transparent)`,
                        marginBottom: 18,
                      }}/>

                      <p style={{
                        fontFamily: "var(--f-body)",
                        fontSize: "clamp(12px,1.05vw,13.5px)",
                        lineHeight: 1.85, color: "var(--text-muted)",
                        maxWidth: 420, marginBottom: 26,
                      }}>{p.description}</p>

                      <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 36 }}>
                        {p.tags.map(t => (
                          <span key={t} style={{
                            fontFamily: "var(--f-body)", fontSize: 10,
                            letterSpacing: "1.5px", textTransform: "uppercase",
                            padding: "5px 12px", borderRadius: 6,
                            background: `${p.accent}0c`,
                            border: `1px solid ${p.accent}22`,
                            color: `${p.accent}cc`,
                          }}>{t}</span>
                        ))}
                      </div>

                      {p.linkDisabled ? (
                        <div style={{
                          display: "inline-flex", alignItems: "center", gap: 10,
                          padding: "10px 18px", borderRadius: 8,
                          border: "1px solid rgba(232,241,242,.07)",
                          background: "rgba(232,241,242,.03)",
                        }}>
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <rect x="2" y="5" width="8" height="6" rx="1" stroke="rgba(232,241,242,.28)" strokeWidth="1.2"/>
                            <path d="M4 5V4a2 2 0 014 0v1" stroke="rgba(232,241,242,.28)" strokeWidth="1.2"/>
                          </svg>
                          <span style={{
                            fontFamily: "var(--f-body)", fontSize: 10,
                            letterSpacing: "2px", textTransform: "uppercase",
                            color: "rgba(232,241,242,.22)",
                          }}>{p.linkLabel}</span>
                        </div>
                      ) : (
                        <a href={p.link} target="_blank" rel="noopener noreferrer"
                          onClick={playClick}
                          className="btn btn--hi btn--lg"
                          style={{ display: "inline-flex", alignItems: "center", gap: 10, textDecoration: "none" }}
                        >
                          {p.linkLabel}
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* ── RIGHT PANEL ── */}
                  <div className="pc-vis" style={{
                    background: p.gradient,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    position: "relative", overflow: "hidden",
                  }}>

                    {/* Fine grid */}
                    <div aria-hidden="true" style={{
                      position: "absolute", inset: 0,
                      backgroundImage: `
                        linear-gradient(rgba(255,255,255,.022) 1px,transparent 1px),
                        linear-gradient(90deg,rgba(255,255,255,.022) 1px,transparent 1px)
                      `,
                      backgroundSize: "40px 40px",
                    }}/>

                    {/* Radial glow */}
                    <div aria-hidden="true" style={{
                      position: "absolute",
                      top: "42%", left: "50%", transform: "translate(-50%,-50%)",
                      width: "75%", height: "75%",
                      background: `radial-gradient(circle,${p.accent}28 0%,transparent 70%)`,
                      filter: "blur(48px)",
                    }}/>

                    {/* Concentric rings */}
                    {[160, 240, 320].map((r, i) => (
                      <div key={i} aria-hidden="true" style={{
                        position: "absolute",
                        top: "42%", left: "50%",
                        width: r, height: r,
                        transform: "translate(-50%,-50%)",
                        borderRadius: "50%",
                        border: `1px solid ${p.accent}${i === 0 ? "22" : i === 1 ? "14" : "0a"}`,
                      }}/>
                    ))}

                    {/* Ping animation ring */}
                    <div aria-hidden="true" style={{
                      position: "absolute", top: "42%", left: "50%",
                      width: 200, height: 200,
                      borderRadius: "50%",
                      border: `1px solid ${p.accent}30`,
                      animation: "ping-ring 3.5s ease-out infinite",
                    }}/>

                    {/* Scan line */}
                    <div aria-hidden="true" style={{
                      position: "absolute", left: 0, right: 0, height: 1,
                      background: `linear-gradient(90deg, transparent 0%, ${p.accent}40 20%, ${p.accent}80 50%, ${p.accent}40 80%, transparent 100%)`,
                      animation: "scan-line 5s linear infinite",
                      animationDelay: `${PROJECTS.findIndex(pr=>pr.id===p.id)*1.2}s`,
                    }}/>

                    {/* HUD Corners */}
                    <HudCorners accent={p.accent} size={32}/>

                    {/* Visual */}
                    <div style={{ position: "relative", zIndex: 2, width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                      <Visual accent={p.accent}/>
                    </div>

                    {/* Bottom info strip */}
                    <div style={{
                      position: "absolute", bottom: 0, left: 0, right: 0,
                      padding: "12px 28px",
                      background: `linear-gradient(to top, rgba(0,0,0,.55), transparent)`,
                      borderTop: `1px solid ${p.accent}15`,
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      zIndex: 10,
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{
                          width: 6, height: 6, borderRadius: "50%",
                          background: p.linkDisabled ? "rgba(232,241,242,.2)" : "#22d3a5",
                          boxShadow: p.linkDisabled ? "none" : "0 0 6px #22d3a5",
                        }}/>
                        <span style={{
                          fontFamily: "var(--f-body)", fontSize: 9,
                          letterSpacing: "2px", textTransform: "uppercase",
                          color: "rgba(232,241,242,.4)",
                        }}>{p.linkDisabled ? "Confidencial" : "Case disponível"}</span>
                      </div>
                      <span style={{
                        fontFamily: "var(--f-display)", fontSize: 11,
                        letterSpacing: "1px",
                        color: `${p.accent}70`,
                      }}>{p.year}</span>
                    </div>

                    {/* Year watermark */}
                    <span aria-hidden="true" style={{
                      position: "absolute", bottom: 36, right: -10,
                      fontFamily: "var(--f-display)",
                      fontSize: "clamp(110px,14vw,200px)",
                      fontWeight: 900, lineHeight: 1,
                      color: "transparent",
                      WebkitTextStroke: `1px ${p.accent}10`,
                      userSelect: "none", pointerEvents: "none",
                    }}>{p.year}</span>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
