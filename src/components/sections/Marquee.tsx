"use client";

const ITEMS = [
  "Arquitetura de Software",
  "Edição de Vídeo",
  "Sistemas Escaláveis",
  "Plataformas B2B",
  "Gov Tech",
  "Motion Design",
  "API Design",
  "Identidade Visual",
  "IA Aplicada",
];

export default function MarqueeBand() {
  const seg = ITEMS.join("  ·  ") + "  ·  ";
  return (
    <div style={{
      overflow: "hidden",
      background: "var(--accent)",
      padding: "14px 0",
      pointerEvents: "none",
      userSelect: "none",
      position: "relative",
      zIndex: 20,
    }}>
      <div style={{
        display: "flex",
        animation: "marquee 26s linear infinite",
        width: "fit-content",
        willChange: "transform",
      }}>
        {([0, 1] as const).map(i => (
          <span key={i} style={{
            fontFamily: "var(--f-body)",
            fontSize: 11,
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: "rgba(13,26,45,.90)",
            whiteSpace: "nowrap",
            paddingRight: "60px",
          }}>{seg}</span>
        ))}
      </div>
    </div>
  );
}
