import { useState, useEffect, useRef } from "react";
import { AlertCircle, Phone, X, Snowflake, Anchor, ShieldCheck } from "lucide-react";

interface SOSModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SOSModal = ({ isOpen, onClose }: SOSModalProps) => {
  const [breathPhase, setBreathPhase] = useState<"Inhala" | "Sostén" | "Exhala">("Inhala");
  const [secondsLeft, setSecondsLeft] = useState(4);
  const [currentAffirmation, setCurrentAffirmation] = useState(0);

  const affirmations = [
    "Esto es una ola neuroquímica. Alcanzará un pico y descenderá. No dura para siempre.",
    "Mi cuerpo está experimentando una falsa alarma de peligro. Estoy a salvo en este momento.",
    "No necesito tomar decisiones ni enviar mensajes ahora mismo. Mi prioridad es respirar.",
    "Tener una emoción intensa no significa que deba actuar en consecuencia."
  ];

  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    timerRef.current = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev > 1) return prev - 1;

        if (breathPhase === "Inhala") {
          setBreathPhase("Sostén");
          return 4;
        } else if (breathPhase === "Sostén") {
          setBreathPhase("Exhala");
          return 6;
        } else {
          setBreathPhase("Inhala");
          return 4;
        }
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isOpen, breathPhase]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-300">
      <div className="relative w-full max-w-2xl glass-strong laser-border rounded-3xl p-6 md:p-8 space-y-6 shadow-[0_0_80px_rgba(255,7,58,0.25)] border border-primary/40">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-primary/20 text-primary border border-primary/40 animate-pulse">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <span className="mono text-[10px] uppercase tracking-wider text-primary font-semibold">
                — SOS · Protocolo de Calma Inmediata
              </span>
              <h3 className="text-xl md:text-2xl font-light text-foreground">Regulación de Emergencia</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full glass border border-white/10 text-foreground/60 hover:text-foreground hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Breath Pace Circle */}
        <div className="flex flex-col items-center justify-center py-4 bg-black/40 rounded-2xl border border-white/5 relative overflow-hidden">
          <div className="relative w-44 h-44 flex items-center justify-center">
            <div
              className={`absolute inset-0 rounded-full bg-primary/10 border border-primary/40 transition-all duration-1000 ease-in-out ${
                breathPhase === "Inhala" ? "scale-110 blur-md bg-primary/25" : breathPhase === "Sostén" ? "scale-110 border-amber-400/50" : "scale-75 blur-none opacity-60"
              }`}
            />
            <div className="flex flex-col items-center z-10">
              <span className="mono text-2xl font-light tracking-widest text-primary uppercase">
                {breathPhase}
              </span>
              <span className="mono text-4xl font-extralight text-foreground mt-1">
                {secondsLeft}s
              </span>
            </div>
          </div>
          <p className="text-xs text-foreground/50 mt-3 mono">
            Respiración parasimpática (Inhala 4s • Sostén 4s • Exhala 6s)
          </p>
        </div>

        {/* Somatic grounding TIPP */}
        <div className="grid md:grid-cols-2 gap-3">
          <div className="glass rounded-xl p-3.5 border border-white/10 flex items-start gap-3">
            <Snowflake className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-semibold text-foreground">Choque de Agua Fría (TIPP)</h4>
              <p className="text-[11px] text-foreground/60 mt-1">
                Mójate la cara con agua congelada o sostiene un hielito. Activa el reflejo de inmersión mamífero y baja las pulsaciones en segundos.
              </p>
            </div>
          </div>

          <div className="glass rounded-xl p-3.5 border border-white/10 flex items-start gap-3">
            <Anchor className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-semibold text-foreground">Anclaje Corporal</h4>
              <p className="text-[11px] text-foreground/60 mt-1">
                Presiona los pies contra el suelo. Nombra 3 cosas de color rojo a tu alrededor. Si estás temblando, permite el temblor.
              </p>
            </div>
          </div>
        </div>

        {/* Affirmation Carousel */}
        <div className="glass rounded-xl p-4 border border-primary/20 bg-primary/[0.03] space-y-2">
          <div className="flex items-center justify-between">
            <span className="mono text-[10px] text-primary uppercase tracking-wider font-semibold">
              Afirmación de Realidad
            </span>
            <button
              onClick={() => setCurrentAffirmation((prev) => (prev + 1) % affirmations.length)}
              className="text-[10px] text-foreground/60 hover:text-primary mono uppercase underline"
            >
              Siguiente →
            </button>
          </div>
          <p className="text-sm font-light text-foreground/90 italic">
            "{affirmations[currentAffirmation]}"
          </p>
        </div>

        {/* Emergency Helplines */}
        <div className="pt-2 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-foreground/60">
            <Phone className="w-4 h-4 text-primary" />
            <span>Líneas de ayuda gratuitas y confidenciales (España):</span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="tel:024"
              className="px-3 py-1 rounded-lg bg-primary/20 border border-primary/40 text-primary font-mono font-semibold hover:bg-primary/30 transition-colors"
            >
              024 (Prevención)
            </a>
            <a
              href="tel:717003717"
              className="px-3 py-1 rounded-lg glass border border-white/10 text-foreground font-mono hover:bg-white/10 transition-colors"
            >
              717 003 717 (Esperanza)
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
