"use client";
import { useAudio } from "@/providers/AudioProvider";

function WaveIcon({ active }: { active: boolean }) {
  return (
    <svg width="20" height="18" viewBox="0 0 20 18" fill="none" aria-hidden="true">
      <rect x="0"  y="7"  width="2" height="4"  rx="1" fill="currentColor" opacity={active ? 1 : 0.3}/>
      <rect x="4"  y="4"  width="2" height="10" rx="1" fill="currentColor" opacity={active ? 1 : 0.5}/>
      <rect x="9"  y="1"  width="2" height="16" rx="1" fill="currentColor"/>
      <rect x="14" y="4"  width="2" height="10" rx="1" fill="currentColor" opacity={active ? 1 : 0.5}/>
      <rect x="18" y="7"  width="2" height="4"  rx="1" fill="currentColor" opacity={active ? 1 : 0.3}/>
    </svg>
  );
}

export default function SoundToggle() {
  const { enabled, toggle } = useAudio();

  return (
    <button
      onClick={toggle}
      aria-label={enabled ? "Desativar som ambiente" : "Ativar som ambiente"}
      style={{
        position: "fixed",
        bottom: 28, left: 28,
        zIndex: 500,
        display: "flex", alignItems: "center", gap: 9,
        padding: "9px 16px",
        borderRadius: 9999,
        border: `1px solid ${enabled
          ? "rgba(27,152,224,.35)"
          : "rgba(232,241,242,.11)"}`,
        background: enabled
          ? "rgba(27,152,224,.10)"
          : "rgba(13,26,45,.75)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        color: enabled ? "var(--accent)" : "var(--text-muted)",
        fontFamily: "var(--f-body)",
        fontSize: 10,
        letterSpacing: "2.5px",
        textTransform: "uppercase",
        cursor: "pointer",
        transition: "all .3s var(--ease)",
        boxShadow: enabled
          ? "0 0 20px rgba(27,152,224,.15)"
          : "0 4px 16px rgba(0,0,0,.25)",
      }}
    >
      <WaveIcon active={enabled} />
      {enabled ? "SOM ON" : "SOM OFF"}
    </button>
  );
}
