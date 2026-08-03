import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import confetti from "canvas-confetti";
import { Heart, Sparkles, Download, Copy, RefreshCw, Volume2, VolumeX, Share2, Check } from "lucide-react";
import { toast } from "sonner";
import DiscreetCredit from "./DiscreetCredit";

const TENDER_QUOTES = [
  {
    category: "Consuelo & Presencia",
    quote: "No tienes que sostener todo sola/o hoy. Es totalmente válido soltar la carga un instante y respirar.",
    author: "Refugio Abrazo",
  },
  {
    category: "Amor Propio & Paciencia",
    quote: "Estás sanando a un ritmo sagrado y propio. No hay prisa por llegar a donde tu mente cree que deberías estar.",
    author: "Palabras Tiernas",
  },
  {
    category: "Calma en Tormenta",
    quote: "Tus emociones no son un error del sistema; son señales de tu humanidad. Te mereces la misma compasión que das a los demás.",
    author: "Espacio Afectivo",
  },
  {
    category: "Límites & Valentía",
    quote: "Decir 'hasta aquí' con amor no te hace egoísta; es el abrazo de protección más sincero hacia tu paz mental.",
    author: "Guía de Autocuidado",
  },
  {
    category: "Conexión & Pertenencia",
    quote: "Aun en la distancia y en el silencio, tu presencia en este planeta hace que el mundo sea un lugar más cálido.",
    author: "Abrazo Virtual",
  },
];

const STYLES = [
  { id: "warm-rose", name: "Rosa Afectivo", bg: "from-rose-500/20 via-pink-500/10 to-amber-500/20", border: "border-rose-400/30", text: "text-rose-100" },
  { id: "deep-violet", name: "Violeta Profundo", bg: "from-purple-900/40 via-indigo-900/30 to-slate-900/40", border: "border-purple-400/30", text: "text-purple-100" },
  { id: "emerald-peace", name: "Esmeralda Calma", bg: "from-emerald-900/30 via-teal-900/20 to-slate-900/40", border: "border-teal-400/30", text: "text-teal-100" },
  { id: "golden-warmth", name: "Ámbar Cálido", bg: "from-amber-900/30 via-orange-900/20 to-amber-950/40", border: "border-amber-400/30", text: "text-amber-100" },
];

export const VirtualHugGenerator: React.FC = () => {
  // Hug State
  const [isHugging, setIsHugging] = useState(false);
  const [hugProgress, setHugProgress] = useState(0);
  const [hugCompleted, setHugCompleted] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Card Creator State
  const [selectedQuoteIdx, setSelectedQuoteIdx] = useState(0);
  const [customText, setCustomText] = useState("");
  const [recipient, setRecipient] = useState("");
  const [selectedStyle, setSelectedStyle] = useState(STYLES[0]);
  const [copied, setCopied] = useState(false);

  // Refs for animations and sound
  const heartRef = useRef<HTMLDivElement>(null);
  const auraRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioCtxRef.current) audioCtxRef.current.close();
    };
  }, []);

  // Web Audio sound generator (432Hz sine wave warm ambient tone)
  const startSound = () => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(432, ctx.currentTime); // Harmonic soothing tone
      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.15, ctx.currentTime + 1.5);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();

      audioCtxRef.current = ctx;
      oscRef.current = osc;
    } catch (_e) {
      // Audio fallback
    }
  };

  const stopSound = () => {
    if (audioCtxRef.current) {
      audioCtxRef.current.close().catch(() => {});
      audioCtxRef.current = null;
    }
  };

  // Hold to Hug Trigger
  const startHug = () => {
    setIsHugging(true);
    setHugCompleted(false);
    setHugProgress(0);
    startSound();

    // Haptic vibration on mobile
    if ("vibrate" in navigator) {
      navigator.vibrate([100, 50, 100, 50, 200]);
    }

    // GSAP Pulse Animation
    if (heartRef.current && auraRef.current) {
      gsap.to(heartRef.current, {
        scale: 1.35,
        duration: 2.5,
        ease: "power2.out",
        repeat: -1,
        yoyo: true,
      });

      gsap.to(auraRef.current, {
        scale: 2.2,
        opacity: 0.8,
        duration: 2,
        repeat: -1,
        yoyo: true,
      });
    }

    let progress = 0;
    timerRef.current = setInterval(() => {
      progress += 2;
      setHugProgress(progress);

      if (progress >= 100) {
        clearInterval(timerRef.current!);
        setIsHugging(false);
        setHugCompleted(true);
        stopSound();

        // Confetti celebration of warm energy
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#f43f5e", "#fb7185", "#fda4af", "#ffe4e6"],
        });

        toast.success("¡Abrazo enviado y recibido con todo el amor!");

        // Reset heart GSAP
        if (heartRef.current) {
          gsap.to(heartRef.current, { scale: 1, duration: 0.5 });
        }
      }
    }, 60);
  };

  const stopHug = () => {
    if (!hugCompleted) {
      setIsHugging(false);
      setHugProgress(0);
      stopSound();

      if (timerRef.current) clearInterval(timerRef.current);
      if (heartRef.current) {
        gsap.to(heartRef.current, { scale: 1, duration: 0.4 });
      }
    }
  };

  const currentQuote = TENDER_QUOTES[selectedQuoteIdx];

  const handleCopyCard = () => {
    const textToCopy = `🫂 Abrazo & Palabras Tiernas:\n\n"${customText || currentQuote.quote}"\n\n— Creado en ABRAZO por @belentani_`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    toast.success("¡Tarjeta copiada al portapapeles!");
    setTimeout(() => setCopied(false), 2000);
  };

  const nextQuote = () => {
    setSelectedQuoteIdx((prev) => (prev + 1) % TENDER_QUOTES.length);
  };

  return (
    <div className="space-y-8">
      {/* ─── VIRTUAL HUG TIMER SECTION ─── */}
      <div className="glass-laser laser-border rounded-3xl p-6 md:p-10 text-center relative overflow-hidden">
        <div className="max-w-xl mx-auto space-y-4 relative z-10">
          <p className="mono text-[10px] tracking-wider-2 text-primary/80 uppercase">
            — Experiencia Sensorial Sincrónica
          </p>
          <h3 className="text-2xl md:text-4xl font-light text-foreground/95 tracking-tight">
            Mantén presionado para recibir tu Abrazo Virtual
          </h3>
          <p className="text-foreground/60 text-sm leading-relaxed">
            Mantén presionado el corazón durante unos segundos para sincronizar tu respiración y sentir la pulsación de consuelo.
          </p>

          {/* Interactive Heart Button */}
          <div className="py-6 flex flex-col items-center justify-center select-none">
            <div className="relative">
              {/* Aura Glow */}
              <div
                ref={auraRef}
                className="absolute inset-0 rounded-full bg-primary/20 blur-2xl opacity-0 pointer-events-none transform scale-75"
              />

              <button
                onMouseDown={startHug}
                onMouseUp={stopHug}
                onTouchStart={startHug}
                onTouchEnd={stopHug}
                className={`relative w-28 h-28 md:w-32 md:h-32 rounded-full glass border border-primary/40 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 shadow-xl ${
                  isHugging ? "shadow-primary/50 border-primary" : "hover:scale-105 hover:border-primary/70"
                }`}
                aria-label="Mantener presionado para abrazo virtual"
              >
                <div ref={heartRef} className="flex items-center justify-center">
                  <Heart
                    className={`w-12 h-12 transition-colors ${
                      isHugging || hugCompleted ? "text-rose-500 fill-rose-500 animate-pulse" : "text-primary"
                    }`}
                  />
                </div>
                <span className="mono text-[10px] text-foreground/60 mt-1 uppercase tracking-wider">
                  {isHugging ? `${hugProgress}%` : hugCompleted ? "¡Abrazado/a!" : "Mantén"}
                </span>
              </button>
            </div>

            {/* Hug Progress Bar */}
            {isHugging && (
              <div className="w-48 h-1.5 bg-foreground/10 rounded-full mt-6 overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-75"
                  style={{ width: `${hugProgress}%` }}
                />
              </div>
            )}

            {/* Sound Toggle Button */}
            <div className="mt-4">
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass text-xs text-foreground/50 hover:text-foreground transition-colors"
              >
                {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-primary" /> : <VolumeX className="w-3.5 h-3.5" />}
                <span>{soundEnabled ? "Frecuencia 432Hz Activada" : "Sonido Silenciado"}</span>
              </button>
            </div>
          </div>

          {hugCompleted && (
            <div className="p-4 rounded-2xl glass border border-primary/30 animate-fade-in text-xs text-foreground/80">
              🫂 <strong>Abrazo Recibido.</strong> Que este instante de calma te acompañe durante el resto de tu jornada.
            </div>
          )}
        </div>
      </div>

      {/* ─── CUSTOMIZABLE TENDER CARDS GENERATOR ─── */}
      <div className="glass rounded-3xl border border-foreground/[0.08] p-6 md:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-foreground/[0.06] pb-4">
          <div>
            <p className="mono text-[10px] tracking-wider-2 text-primary/80 uppercase">
              — Creador de Tarjetas Afectivas
            </p>
            <h3 className="text-xl md:text-2xl font-light text-foreground/95">
              Generador de Cartas & Frases Tiernas
            </h3>
          </div>
          <button
            onClick={nextQuote}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30 text-xs mono text-foreground/80 hover:text-primary transition-all self-start md:self-auto"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Otra Frase Inspiradora</span>
          </button>
        </div>

        {/* Card Style Controls */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block mono text-[10px] text-foreground/50 uppercase mb-2">
                Para quien es esta carta:
              </label>
              <input
                type="text"
                placeholder="Ej. Para ti, Para mi alma, Para mi amiga..."
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="w-full bg-background/50 border border-foreground/10 rounded-2xl px-4 py-2.5 text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-primary/50"
              />
            </div>

            <div>
              <label className="block mono text-[10px] text-foreground/50 uppercase mb-2">
                Personalizar Mensaje (o usa la frase predeterminada):
              </label>
              <textarea
                rows={3}
                placeholder={currentQuote.quote}
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                className="w-full bg-background/50 border border-foreground/10 rounded-2xl px-4 py-2.5 text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-primary/50 resize-none"
              />
            </div>

            <div>
              <label className="block mono text-[10px] text-foreground/50 uppercase mb-2">
                Estilo Visual:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {STYLES.map((st) => (
                  <button
                    key={st.id}
                    onClick={() => setSelectedStyle(st)}
                    className={`px-3 py-2 rounded-xl text-xs mono text-left border transition-all ${
                      selectedStyle.id === st.id
                        ? "border-primary bg-primary/10 text-foreground"
                        : "border-foreground/10 text-foreground/50 hover:text-foreground"
                    }`}
                  >
                    {st.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Card Preview */}
          <div className="flex flex-col justify-between">
            <div
              className={`rounded-3xl p-7 bg-gradient-to-br ${selectedStyle.bg} border ${selectedStyle.border} shadow-2xl relative min-h-[220px] flex flex-col justify-between transition-all duration-500`}
            >
              <div className="flex items-center justify-between">
                <span className="mono text-[10px] uppercase tracking-wider text-primary/90 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  {recipient || "Carta de Amor & Regulación"}
                </span>
                <Heart className="w-4 h-4 text-rose-400 fill-rose-400/40 animate-pulse" />
              </div>

              <div className="my-4">
                <p className={`text-base md:text-lg font-light leading-relaxed ${selectedStyle.text}`}>
                  "{customText || currentQuote.quote}"
                </p>
              </div>

              <DiscreetCredit variant="card" />
            </div>

            {/* Action Buttons */}
            <div className="mt-4 flex gap-3">
              <button
                onClick={handleCopyCard}
                className="flex-1 py-2.5 rounded-full glass-laser laser-border text-xs mono text-foreground flex items-center justify-center gap-2 hover:text-laser transition-all"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "¡Copiada!" : "Copiar Texto & Créditos"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualHugGenerator;
