import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Play, Pause, RefreshCw, Wind, Heart, Sparkles } from "lucide-react";

type BreathTechnique = "478" | "box" | "coherence";

interface TechniqueConfig {
  name: string;
  subtitle: string;
  phases: { name: string; duration: number; scale: number }[];
}

const TECHNIQUES: Record<BreathTechnique, TechniqueConfig> = {
  "478": {
    name: "Respiración 4-7-8 (Desescalada Profunda)",
    subtitle: "Activa el sistema parasimpático para reducir taquicardia y pánico.",
    phases: [
      { name: "Inhala despacio por la nariz...", duration: 4, scale: 1.5 },
      { name: "Retén el aire suavemente...", duration: 7, scale: 1.5 },
      { name: "Exhala todo el aire por la boca...", duration: 8, scale: 1.0 },
    ],
  },
  box: {
    name: "Respiración Cuadrada 4-4-4-4",
    subtitle: "Restaura la claridad mental y la concentración bajo tensión.",
    phases: [
      { name: "Inhala...", duration: 4, scale: 1.5 },
      { name: "Retén...", duration: 4, scale: 1.5 },
      { name: "Exhala...", duration: 4, scale: 1.0 },
      { name: "Sostén en vacío...", duration: 4, scale: 1.0 },
    ],
  },
  coherence: {
    name: "Coherencia Cardíaca 5-5",
    subtitle: "Sincroniza el ritmo cardíaco con las ondas cerebrales.",
    phases: [
      { name: "Inhala con fluidez...", duration: 5, scale: 1.4 },
      { name: "Exhala con fluidez...", duration: 5, scale: 1.0 },
    ],
  },
};

export const GSAPBreathingVisualizer: React.FC = () => {
  const [selectedTech, setSelectedTech] = useState<BreathTechnique>("478");
  const [isActive, setIsActive] = useState(false);
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);

  const circleRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const tech = TECHNIQUES[selectedTech];

  useEffect(() => {
    // Reset when switching technique
    stopBreathing();
  }, [selectedTech]);

  const startBreathing = () => {
    setIsActive(true);
    setCurrentPhaseIndex(0);
    setCycleCount(0);
    runPhaseLoop(0);
  };

  const runPhaseLoop = (phaseIdx: number) => {
    const phases = TECHNIQUES[selectedTech].phases;
    const phase = phases[phaseIdx];
    setCurrentPhaseIndex(phaseIdx);

    if (circleRef.current && glowRef.current) {
      timelineRef.current = gsap.timeline({
        onComplete: () => {
          const nextIdx = (phaseIdx + 1) % phases.length;
          if (nextIdx === 0) {
            setCycleCount((c) => c + 1);
          }
          runPhaseLoop(nextIdx);
        },
      });

      timelineRef.current.to(circleRef.current, {
        scale: phase.scale,
        duration: phase.duration,
        ease: phase.scale > 1 ? "power1.inOut" : "power1.out",
      });

      timelineRef.current.to(
        glowRef.current,
        {
          opacity: phase.scale > 1 ? 0.7 : 0.2,
          scale: phase.scale * 1.3,
          duration: phase.duration,
          ease: "power1.inOut",
        },
        "<"
      );
    }
  };

  const stopBreathing = () => {
    setIsActive(false);
    if (timelineRef.current) {
      timelineRef.current.kill();
    }
    if (circleRef.current) {
      gsap.to(circleRef.current, { scale: 1, duration: 0.5 });
    }
    if (glowRef.current) {
      gsap.to(glowRef.current, { opacity: 0.2, scale: 1, duration: 0.5 });
    }
  };

  return (
    <div className="glass-laser laser-border rounded-3xl p-6 md:p-10 space-y-8 relative overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-foreground/[0.06] pb-4">
        <div>
          <p className="mono text-[10px] tracking-wider-2 text-primary/80 uppercase">
            — Motor Somático Kinetic GSAP
          </p>
          <h3 className="text-xl md:text-3xl font-light text-foreground/95">
            Visualizador de Respiración & Enraizamiento
          </h3>
          <p className="text-foreground/55 text-sm mt-1">{tech.subtitle}</p>
        </div>

        {/* Technique Switcher */}
        <div className="flex flex-wrap gap-2">
          {(["478", "box", "coherence"] as BreathTechnique[]).map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTech(t)}
              className={`px-3 py-1.5 rounded-full text-xs mono transition-all ${
                selectedTech === t
                  ? "bg-primary/20 text-primary border border-primary/40"
                  : "glass text-foreground/50 hover:text-foreground"
              }`}
            >
              {t === "478" ? "4-7-8" : t === "box" ? "Cuadrada" : "Coherencia"}
            </button>
          ))}
        </div>
      </div>

      {/* Visualizer Canvas Area */}
      <div className="py-12 flex flex-col items-center justify-center min-h-[320px] relative select-none">
        {/* Animated Glow Aura */}
        <div
          ref={glowRef}
          className="absolute w-44 h-44 md:w-56 md:h-56 rounded-full bg-primary/20 blur-3xl opacity-20 pointer-events-none"
        />

        {/* Main Breathing Circle */}
        <div
          ref={circleRef}
          className="w-40 h-40 md:w-52 md:h-52 rounded-full glass border border-primary/40 flex flex-col items-center justify-center p-4 text-center shadow-2xl relative z-10"
        >
          <Wind className={`w-8 h-8 text-primary mb-2 ${isActive ? "animate-pulse" : ""}`} />
          <p className="text-xs md:text-sm font-light text-foreground/90 max-w-[140px] leading-snug">
            {isActive ? tech.phases[currentPhaseIndex]?.name : "Listo para empezar"}
          </p>
          {isActive && (
            <span className="mono text-[10px] text-primary/70 mt-2">
              Ciclo: {cycleCount + 1}
            </span>
          )}
        </div>
      </div>

      {/* Control Actions */}
      <div className="flex items-center justify-center gap-4">
        {!isActive ? (
          <button
            onClick={startBreathing}
            className="px-8 py-3 rounded-full glass-laser laser-border mono text-xs text-foreground hover:text-laser flex items-center gap-2.5 transition-all shadow-lg hover:scale-105"
          >
            <Play className="w-4 h-4 text-primary fill-primary" />
            <span>Iniciar Respiración Guiada</span>
          </button>
        ) : (
          <button
            onClick={stopBreathing}
            className="px-8 py-3 rounded-full glass border border-rose-500/40 mono text-xs text-rose-300 hover:text-rose-100 flex items-center gap-2.5 transition-all"
          >
            <Pause className="w-4 h-4 fill-rose-400" />
            <span>Pausar Ejercicio</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default GSAPBreathingVisualizer;
