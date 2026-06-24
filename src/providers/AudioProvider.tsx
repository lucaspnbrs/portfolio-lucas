"use client";
import { createContext, useContext, useRef, useState, useCallback, useEffect } from "react";

interface AudioCtxValue {
  enabled: boolean;
  toggle: () => void;
  playHover: () => void;
  playClick: () => void;
}

const Ctx = createContext<AudioCtxValue>({
  enabled: false,
  toggle: () => {},
  playHover: () => {},
  playClick: () => {},
});

export function useAudio() { return useContext(Ctx); }

/* ══════════════════════════════════════════════════════
   AUDIO ENGINE
   Keyboard-click sounds via filtered white-noise bursts
   + activation chime + random ambient ticking
══════════════════════════════════════════════════════ */
export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(false);

  const actxRef    = useRef<AudioContext | null>(null);
  const masterRef  = useRef<GainNode | null>(null);
  const ambientRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ─── init AudioContext (must happen inside user gesture) ─── */
  const initCtx = useCallback((): AudioContext => {
    if (actxRef.current) return actxRef.current;
    const actx   = new AudioContext();
    const master = actx.createGain();
    master.gain.value = 0.75;
    master.connect(actx.destination);
    actxRef.current  = actx;
    masterRef.current = master;
    return actx;
  }, []);

  /* ─── Core: filtered white-noise burst (keyboard sound) ─── */
  const noiseClick = useCallback((
    actx: AudioContext, master: GainNode,
    freq: number, vol: number, durMs: number, delayS = 0,
  ) => {
    const dur     = durMs / 1000;
    const samples = Math.floor(actx.sampleRate * (dur + 0.02));
    const buf     = actx.createBuffer(1, samples, actx.sampleRate);
    const data    = buf.getChannelData(0);
    for (let i = 0; i < samples; i++) data[i] = Math.random() * 2 - 1;

    const src  = actx.createBufferSource();
    src.buffer = buf;

    const bp     = actx.createBiquadFilter();
    bp.type      = "bandpass";
    bp.frequency.value = freq;
    bp.Q.value   = 1.1;

    const hs     = actx.createBiquadFilter();
    hs.type      = "highshelf";
    hs.frequency.value = 5000;
    hs.gain.value = 4;

    const gain   = actx.createGain();
    const t0     = actx.currentTime + delayS;
    gain.gain.setValueAtTime(vol, t0);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur * 5);

    src.connect(bp);
    bp.connect(hs);
    hs.connect(gain);
    gain.connect(master);
    src.start(t0);
  }, []);

  /* ─── Activation chime: three ascending sine tones ─── */
  const playChime = useCallback((actx: AudioContext, master: GainNode) => {
    [392, 523, 659].forEach((freq, i) => {
      const osc  = actx.createOscillator();
      const gain = actx.createGain();
      osc.type   = "sine";
      osc.frequency.value = freq;
      const t    = actx.currentTime + i * 0.10;
      gain.gain.setValueAtTime(0.07, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.28);
      osc.connect(gain);
      gain.connect(master);
      osc.start(t);
      osc.stop(t + 0.30);
    });
  }, []);

  /* ─── Ambient background ticking ─── */
  const stopAmbient = useCallback(() => {
    if (ambientRef.current !== null) {
      clearTimeout(ambientRef.current);
      ambientRef.current = null;
    }
  }, []);

  const startAmbient = useCallback((actx: AudioContext) => {
    const tick = () => {
      const master = masterRef.current;
      if (!master || actx.state === "closed") return;
      noiseClick(actx, master,
        3800 + Math.random() * 2000,  // freq: 3.8–5.8 kHz
        0.010 + Math.random() * 0.006, // vol: 0.010–0.016
        10 + Math.random() * 8,        // dur: 10–18ms
      );
      ambientRef.current = setTimeout(tick, 1200 + Math.random() * 2600);
    };
    ambientRef.current = setTimeout(tick, 700 + Math.random() * 900);
  }, [noiseClick]);

  /* ─── Toggle ─── */
  const toggle = useCallback(() => {
    const next = !enabled;

    /* AudioContext must be created / resumed inside user gesture */
    const actx   = initCtx();
    const master = masterRef.current!;
    if (actx.state === "suspended") actx.resume();

    if (next) {
      playChime(actx, master);   /* immediate audible feedback */
      startAmbient(actx);        /* background key ticking */
    } else {
      stopAmbient();
    }

    setEnabled(next);
  }, [enabled, initCtx, playChime, startAmbient, stopAmbient]);

  /* ─── UI sounds ─── */
  const playHover = useCallback(() => {
    const actx = actxRef.current;
    const master = masterRef.current;
    if (!actx || !master || !enabled) return;
    noiseClick(actx, master, 5200, 0.038, 16);
  }, [enabled, noiseClick]);

  const playClick = useCallback(() => {
    const actx = actxRef.current;
    const master = masterRef.current;
    if (!actx || !master || !enabled) return;
    noiseClick(actx, master, 3600, 0.10, 26);
  }, [enabled, noiseClick]);

  useEffect(() => {
    return () => {
      stopAmbient();
      actxRef.current?.close();
    };
  }, [stopAmbient]);

  return (
    <Ctx.Provider value={{ enabled, toggle, playHover, playClick }}>
      {children}
    </Ctx.Provider>
  );
}
