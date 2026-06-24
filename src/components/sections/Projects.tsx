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
    gradient: "linear-gradient(135deg,#0a1520 0%,#0d2035 45%,#004a70 100%)",
  },
  {
    id: "b2b",  num: "02", category: "SaaS B2B",
    title: "Plataforma de\nGestão Empresarial",
    description: "SaaS para gestão de médias empresas com dashboard analítico em tempo real, automação de fluxos operacionais e integrações com ERP legado.",
    tags: ["React", "Microservices", "AWS", "Redis"],
    year: "2024", link: "#", linkLabel: "Ver case", linkDisabled: false,
    accent: "#4db5eb",
    gradient: "linear-gradient(135deg,#0c1e2d 0%,#0f2840 40%,#1B6EA8 100%)",
  },
  {
    id: "ai",   num: "03", category: "IA Aplicada",
    title: "AI Document\nAnalyzer",
    description: "Análise automática de documentos jurídicos com GPT-4 e embeddings vetoriais — reduz em 80% o tempo de triagem de contratos.",
    tags: ["Python", "FastAPI", "LangChain", "Pinecone"],
    year: "2023", link: "https://github.com", linkLabel: "GitHub", linkDisabled: false,
    accent: "#247BA0",
    gradient: "linear-gradient(135deg,#0e1b2a 0%,#112235 50%,#164E6B 100%)",
  },
  {
    id: "video", num: "04", category: "Audiovisual",
    title: "Portfólio de\nEdição & Motion",
    description: "Projetos de edição de vídeo, motion graphics e identidade audiovisual para marcas — do conceito ao corte final.",
    tags: ["Premiere Pro", "After Effects", "DaVinci", "Motion"],
    year: "2024",
    link: "https://drive.google.com/drive/folders/1WDfu_6TlNPjQukcx59gHhqz9vSsp8erO",
    linkLabel: "Ver no Drive", linkDisabled: false,
    accent: "#4A78C4",
    gradient: "linear-gradient(135deg,#0e1425 0%,#151d35 45%,#2a3a6e 100%)",
  },
];


function NetworkVisual({ accent }: { accent: string }) {
  const nodes = [
    {cx:200,cy:74,r:14},{cx:104,cy:176,r:9},{cx:296,cy:176,r:9},
    {cx:80,cy:294,r:7},{cx:200,cy:294,r:11},{cx:320,cy:294,r:7},
  ];
  const edges = [[0,1],[0,2],[1,3],[1,4],[2,4],[2,5],[3,4],[4,5]];
  return (
    <svg viewBox="0 0 400 370" fill="none" style={{width:"70%",maxWidth:300}}>
      <defs><filter id="gn"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
      {edges.map(([a,b],i)=>(
        <line key={i} x1={nodes[a].cx} y1={nodes[a].cy} x2={nodes[b].cx} y2={nodes[b].cy} stroke={`${accent}35`} strokeWidth="1"/>
      ))}
      {edges.map(([a,b],i)=>(
        <circle key={`ep${i}`} r="3" fill={accent} filter="url(#gn)" opacity="0.9">
          <animateMotion dur={`${2.2+i*0.28}s`} begin={`${i*0.38}s`} repeatCount="indefinite"
            path={`M${nodes[a].cx},${nodes[a].cy}L${nodes[b].cx},${nodes[b].cy}`}/>
        </circle>
      ))}
      {nodes.map((n,i)=>(
        <g key={i}>
          <circle cx={n.cx} cy={n.cy} r={n.r*2.8} fill={`${accent}10`}>
            <animate attributeName="r" values={`${n.r*2.8};${n.r*4};${n.r*2.8}`} dur={`${2.6+i*0.32}s`} repeatCount="indefinite"/>
          </circle>
          <circle cx={n.cx} cy={n.cy} r={n.r} fill={`${accent}38`} stroke={accent} strokeWidth="1.5" filter="url(#gn)"/>
        </g>
      ))}
    </svg>
  );
}

function DashboardVisual({ accent }: { accent: string }) {
  const bars = [52,70,40,88,64,48,82,60];
  return (
    <div style={{width:"70%",maxWidth:300}}>
      <style>{`@keyframes brise{from{transform:scaleY(0);transform-origin:bottom}to{transform:scaleY(1);transform-origin:bottom}}`}</style>
      <div style={{background:"rgba(0,0,0,.45)",backdropFilter:"blur(10px)",border:"1px solid rgba(255,255,255,.07)",borderRadius:14,padding:22}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
          <span style={{fontFamily:"var(--f-body)",fontSize:9,letterSpacing:"2px",textTransform:"uppercase",color:accent}}>Analytics</span>
          <span style={{fontFamily:"var(--f-body)",fontSize:9,color:"rgba(255,255,255,.28)"}}>Tempo real</span>
        </div>
        <div style={{marginBottom:16}}>
          <div style={{fontFamily:"var(--f-display)",fontSize:26,fontWeight:900,color:"white",lineHeight:1}}>R$2.4M</div>
          <span style={{fontSize:9,color:"#22d3a5",fontFamily:"var(--f-body)"}}>▲ +34% vs anterior</span>
        </div>
        <div style={{display:"flex",alignItems:"flex-end",gap:5,height:66,marginBottom:12}}>
          {bars.map((h,i)=>(
            <div key={i} style={{flex:1,height:`${h}%`,background:i===7?accent:`${accent}55`,borderRadius:"2px 2px 0 0",animation:`brise .8s ease-out ${i*0.07}s both`}}/>
          ))}
        </div>
        <div style={{height:1,background:"rgba(255,255,255,.05)",margin:"0 0 10px"}}/>
        <div style={{display:"flex",gap:16}}>
          {[["Usuários","1.2k"],["Módulos","8"],["SLA","99.9%"]].map(([k,v])=>(
            <div key={k}>
              <div style={{fontFamily:"var(--f-body)",fontSize:8,color:"rgba(255,255,255,.28)",letterSpacing:"1.5px",textTransform:"uppercase"}}>{k}</div>
              <div style={{fontFamily:"var(--f-display)",fontSize:14,fontWeight:700,color:"rgba(255,255,255,.88)"}}>{v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function NeuralVisual({ accent }: { accent: string }) {
  const layers = [
    [{x:80,y:70},{x:80,y:170},{x:80,y:270}],
    [{x:200,y:50},{x:200,y:130},{x:200,y:210},{x:200,y:290}],
    [{x:320,y:110},{x:320,y:250}],
  ];
  const conns: Array<{x1:number;y1:number;x2:number;y2:number;di:number}>=[];
  let di=0;
  for(let l=0;l<layers.length-1;l++)
    for(const a of layers[l]) for(const b of layers[l+1])
      conns.push({x1:a.x,y1:a.y,x2:b.x,y2:b.y,di:di++});
  return (
    <svg viewBox="0 0 400 340" fill="none" style={{width:"70%",maxWidth:300}}>
      <defs><filter id="gai"><feGaussianBlur stdDeviation="2.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
      {conns.map(c=>(<line key={c.di} x1={c.x1} y1={c.y1} x2={c.x2} y2={c.y2} stroke={`${accent}22`} strokeWidth="0.9"/>))}
      {conns.filter((_,i)=>i%2===0).map(c=>(
        <circle key={`cp${c.di}`} r="2.5" fill={accent} filter="url(#gai)">
          <animateMotion dur={`${1.5+(c.di%5)*0.18}s`} begin={`${(c.di%7)*0.22}s`} repeatCount="indefinite"
            path={`M${c.x1},${c.y1}L${c.x2},${c.y2}`}/>
        </circle>
      ))}
      {layers.flat().map((n,i)=>(
        <g key={i}>
          <circle cx={n.x} cy={n.y} r={22} fill={`${accent}08`}/>
          <circle cx={n.x} cy={n.y} r={11} fill={`${accent}22`} stroke={`${accent}70`} strokeWidth="1" filter="url(#gai)">
            <animate attributeName="opacity" values="0.5;1;0.5" dur={`${2+i*0.28}s`} repeatCount="indefinite"/>
          </circle>
        </g>
      ))}
    </svg>
  );
}

function WaveformVisual({ accent }: { accent: string }) {
  const bars = Array.from({length:28},(_,i)=>({
    h:Math.round(18+Math.abs(Math.sin(i*0.78)*52+Math.cos(i*0.42)*20)),
    dur:`${0.52+(i%5)*0.14}s`,del:`${i*0.04}s`,
  }));
  return (
    <div style={{width:"70%",maxWidth:300}}>
      <style>{`@keyframes wfb{from{transform:scaleY(.2)}to{transform:scaleY(1)}}`}</style>
      <div style={{display:"flex",alignItems:"center",gap:4,height:88,justifyContent:"center",marginBottom:16}}>
        {bars.map((b,i)=>(
          <div key={i} style={{width:7,height:b.h,borderRadius:4,background:i%5===0?accent:`${accent}65`,animation:`wfb ${b.dur} ease-in-out ${b.del} infinite alternate`,transformOrigin:"center"}}/>
        ))}
      </div>
      <div style={{display:"flex",gap:3,justifyContent:"center",padding:"6px 0",borderTop:`1px solid ${accent}28`,borderBottom:`1px solid ${accent}28`,marginBottom:10}}>
        {Array.from({length:8}).map((_,i)=>(
          <div key={i} style={{width:32,height:20,background:"rgba(0,0,0,.5)",border:`1px solid ${accent}22`,borderRadius:2,position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",inset:0,background:`linear-gradient(135deg,${accent}18 0%,transparent 100%)`}}/>
          </div>
        ))}
      </div>
      <div style={{textAlign:"center",fontFamily:"var(--f-body)",fontSize:8,letterSpacing:"3px",textTransform:"uppercase",color:`${accent}70`}}>Motion · Edit · Color</div>
    </div>
  );
}

const VISUALS: Record<string, ({ accent }: { accent: string }) => React.JSX.Element> = {
  gov: NetworkVisual, b2b: DashboardVisual, ai: NeuralVisual, video: WaveformVisual,
};


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
        /* ── Mobile: vertical stack ── */
        @media (max-width: 767px) {
          .proj-sticky { position: relative !important; height: auto !important; overflow: visible !important; }
          .proj-track  { display: block !important; width: 100% !important; height: auto !important; transform: none !important; }
          .pc { width: 100% !important; height: auto !important; min-height: 0 !important; display: flex !important; flex-direction: column !important; }
          .pc-info { padding: 36px 24px !important; }
          .pc-vis  { height: 54vw !important; min-height: 200px !important; }
        }
        /* ── Tablet: narrower info panel ── */
        @media (min-width: 768px) and (max-width: 1100px) {
          .pc { grid-template-columns: 48% 52% !important; }
        }
      `}</style>

      <section
        ref={sectionRef}
        id="projects"
        style={{ height: "400vh", background: "var(--ground)", position: "relative" }}
      >

        <div className="proj-sticky" style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>

          <div ref={dotsRef} style={{
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
                  display: "grid", gridTemplateColumns: "44% 56%",
                }}>

                  <div className="pc-info" style={{
                    background: "rgba(10,21,34,.97)",
                    display: "flex", flexDirection: "column", justifyContent: "center",
                    padding: "0 clamp(36px,5.5vw,96px)",
                    borderRight: "1px solid rgba(232,241,242,.05)",
                    position: "relative", overflow: "hidden",
                  }}>
                 
                    <span aria-hidden="true" style={{
                      position: "absolute", bottom: -16, left: -8,
                      fontFamily: "var(--f-display)",
                      fontSize: "clamp(130px,19vw,280px)",
                      fontWeight: 900, lineHeight: 1,
                      color: "transparent",
                      WebkitTextStroke: `1px ${p.accent}10`,
                      pointerEvents: "none", userSelect: "none",
                    }}>{p.num}</span>

                    <div style={{ position: "relative", zIndex: 2 }}>
                      {p.num === "01" && (
                        <span className="lbl" style={{ display: "block", marginBottom: 20 }}>04 · Portfólio</span>
                      )}

                      <span style={{
                        display: "inline-flex", alignItems: "center",
                        padding: "4px 14px", borderRadius: 9999,
                        background: `${p.accent}12`, border: `1px solid ${p.accent}28`,
                        fontFamily: "var(--f-body)", fontSize: 10,
                        letterSpacing: "2px", textTransform: "uppercase",
                        color: p.accent, marginBottom: 20,
                      }}>{p.category}</span>

                      <h2 style={{
                        fontFamily: "var(--f-display)",
                        fontSize: "clamp(26px,3.6vw,60px)",
                        fontWeight: 900, lineHeight: 1.0,
                        letterSpacing: "-.03em",
                        color: "var(--text)", whiteSpace: "pre-line",
                        marginBottom: 16,
                      }}>{p.title}</h2>

                      <p style={{
                        fontFamily: "var(--f-body)",
                        fontSize: "clamp(12px,1.0vw,13.5px)",
                        lineHeight: 1.85, color: "var(--text-muted)",
                        maxWidth: 400, marginBottom: 24,
                      }}>{p.description}</p>

                      <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 32 }}>
                        {p.tags.map(t => (
                          <span key={t} className="tag" style={{ fontSize: 10, padding: "4px 11px" }}>{t}</span>
                        ))}
                      </div>

                      {p.linkDisabled ? (
                        <span style={{
                          display: "inline-flex", alignItems: "center", gap: 8,
                          fontFamily: "var(--f-body)", fontSize: 10,
                          letterSpacing: "2.5px", textTransform: "uppercase",
                          color: "rgba(232,241,242,.22)",
                        }}>
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <rect x="2" y="5" width="8" height="6" rx="1" stroke="currentColor" strokeWidth="1.2"/>
                            <path d="M4 5V4a2 2 0 014 0v1" stroke="currentColor" strokeWidth="1.2"/>
                          </svg>
                          {p.linkLabel}
                        </span>
                      ) : (
                        <a href={p.link} target="_blank" rel="noopener noreferrer"
                          onClick={playClick}
                          className="btn btn--hi btn--lg"
                          style={{ display: "inline-flex", alignItems: "center", gap: 10, textDecoration: "none", width: "fit-content" }}
                        >
                          {p.linkLabel}
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="pc-vis" style={{
                    background: p.gradient,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    position: "relative", overflow: "hidden",
                  }}>
                    <div aria-hidden="true" style={{
                      position: "absolute", inset: 0,
                      backgroundImage: `linear-gradient(rgba(255,255,255,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px)`,
                      backgroundSize: "44px 44px",
                    }}/>
                    <div aria-hidden="true" style={{
                      position: "absolute",
                      top: "40%", left: "50%", transform: "translate(-50%,-50%)",
                      width: "70%", height: "70%",
                      background: `radial-gradient(circle,${p.accent}22 0%,transparent 70%)`,
                      filter: "blur(50px)",
                    }}/>
                    <div style={{ position: "relative", zIndex: 2, width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                      <Visual accent={p.accent}/>
                    </div>
                    <span aria-hidden="true" style={{
                      position: "absolute", bottom: -28, right: -14,
                      fontFamily: "var(--f-display)",
                      fontSize: "clamp(110px,14vw,220px)",
                      fontWeight: 900, lineHeight: 1,
                      color: "transparent",
                      WebkitTextStroke: `1px ${p.accent}12`,
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
