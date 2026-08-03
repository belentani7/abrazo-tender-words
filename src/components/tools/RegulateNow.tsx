import { useEffect, useRef, useState } from "react";
import { Play, Pause, RotateCcw, Wind, Snowflake, Anchor } from "lucide-react";
import { TPanel, Btn, Label } from "./ui";
import { SKILL_CARDS } from "@/content/toolkit-data";

const PATTERNS = [
  { id: "coherente", name: "Coherencia 4-6", phases: [["Inspira", 4], ["Espira", 6]] as [string, number][], desc: "Espiración más larga: activa el freno parasimpático. La base para bajar de 8 a 5." },
  { id: "caja", name: "Caja 4-4-4-4", phases: [["Inspira", 4], ["Sostén", 4], ["Espira", 4], ["Sostén", 4]] as [string, number][], desc: "Ordena la mente cuando hay ruido mental y necesitas foco." },
  { id: "calma", name: "Calma 4-7-8", phases: [["Inspira", 4], ["Sostén", 7], ["Espira", 8]] as [string, number][], desc: "Para el insomnio y la activación nocturna. Puede marear los primeros ciclos: ve despacio." },
];

const GROUNDING = [
  { n: 5, sense: "cosas que puedes VER", hint: "Nómbralas en voz baja, con detalle: color, textura, distancia." },
  { n: 4, sense: "cosas que puedes TOCAR", hint: "Toca de verdad. La tela, la mesa, tu propio brazo." },
  { n: 3, sense: "cosas que puedes OÍR", hint: "Incluye el sonido de fondo que no estabas escuchando." },
  { n: 2, sense: "cosas que puedes OLER", hint: "Si no hueles nada, busca algo: café, jabón, aire de la ventana." },
  { n: 1, sense: "cosa que puedes SABOREAR", hint: "Un sorbo de agua cuenta. Termina con una respiración lenta." },
];

const RegulateNow = () => {
  const [patternId, setPatternId] = useState("coherente");
  const [running, setRunning] = useState(false);
  const [phase, setPhase] = useState(0);
  const [left, setLeft] = useState(PATTERNS[0].phases[0][1]);
  const [cycles, setCycles] = useState(0);
  const [step, setStep] = useState(0);
  const timer = useRef<number | null>(null);

  const pattern = PATTERNS.find((p) => p.id === patternId)!;
  const [phaseName, phaseLen] = pattern.phases[phase];

  useEffect(() => {
    if (!running) return;
    timer.current = window.setInterval(() => {
      setLeft((l) => {
        if (l > 1) return l - 1;
        setPhase((p) => {
          const next = (p + 1) % pattern.phases.length;
          if (next === 0) setCycles((c) => c + 1);
          setLeft(pattern.phases[next][1]);
          return next;
        });
        return pattern.phases[(phase + 1) % pattern.phases.length][1];
      });
    }, 1000);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [running, pattern, phase]);

  const reset = (id = patternId) => {
    setRunning(false);
    setPatternId(id);
    setPhase(0);
    setCycles(0);
    const p = PATTERNS.find((x) => x.id === id)!;
    setLeft(p.phases[0][1]);
  };

  const expanding = phaseName === "Inspira";
  const scale = phaseName === "Sostén" ? 1 : expanding ? 1 : 0.62;
  const tipp = SKILL_CARDS.find((s) => s.id === "tipp")!;

  return (
    <div className="space-y-5">
      <div className="reveal">
        <Label>— SOS · regulación en caliente</Label>
        <h3 className="text-2xl md:text-3xl font-light text-foreground/95 mb-3">Bajar la ola, ahora</h3>
        <p className="text-foreground/60 text-sm leading-relaxed max-w-2xl">
          Cuando la emoción está por encima de 7, no se razona: se regula el cuerpo primero. Elige un ritmo y
          respira con la figura. Dos minutos ya cambian la química.
        </p>
      </div>

      <TPanel laser className="reveal">
        <div className="flex flex-wrap gap-2 mb-6">
          {PATTERNS.map((p) => (
            <button
              key={p.id}
              onClick={() => reset(p.id)}
              className={`press-spring rounded-full px-3 py-1.5 mono text-[10px] tracking-wider-2 uppercase border transition-all ${
                p.id === patternId
                  ? "bg-primary/15 text-primary border-primary/30"
                  : "text-foreground/40 border-foreground/10 hover:text-foreground/80"
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>

        <div className="flex flex-col items-center gap-6 py-4">
          <div className="relative w-52 h-52 flex items-center justify-center">
            <div
              className="absolute inset-0 rounded-full bg-primary/[0.07] blur-2xl transition-transform ease-in-out"
              style={{ transform: `scale(${scale})`, transitionDuration: `${phaseLen * 1000}ms` }}
            />
            <div
              className="absolute inset-0 rounded-full border border-primary/30 transition-transform ease-in-out"
              style={{ transform: `scale(${scale})`, transitionDuration: `${phaseLen * 1000}ms` }}
            />
            <div className="text-center relative z-10">
              <p className="mono text-[11px] tracking-wider-2 text-primary/80 uppercase mb-1">{phaseName}</p>
              <p className="text-5xl font-extralight text-foreground/90 tabular-nums">{left}</p>
            </div>
          </div>

          <p className="text-foreground/45 text-xs text-center max-w-sm leading-relaxed">{pattern.desc}</p>

          <div className="flex items-center gap-2">
            <Btn variant="laser" onClick={() => setRunning((r) => !r)}>
              {running ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              {running ? "Pausar" : "Empezar"}
            </Btn>
            <Btn onClick={() => reset()}>
              <RotateCcw className="w-3.5 h-3.5" /> Reiniciar
            </Btn>
          </div>
          <p className="mono text-[10px] tracking-wider-2 text-foreground/30 uppercase">
            Ciclos completados · {cycles}
          </p>
        </div>
      </TPanel>

      <div className="grid md:grid-cols-2 gap-4 reveal-stagger">
        <TPanel className="hover-lift">
          <p className="mono text-[10px] tracking-wider-2 text-primary/70 uppercase mb-3 flex items-center gap-2">
            <Anchor className="w-3.5 h-3.5" /> Anclaje 5·4·3·2·1
          </p>
          <p className="text-foreground/55 text-xs leading-relaxed mb-4">
            Para disociación, pánico o cuando la cabeza está en otro sitio. Avanza a tu ritmo.
          </p>
          <div className="space-y-3">
            {GROUNDING.map((g, i) => (
              <div
                key={g.n}
                className={`rounded-2xl border p-3 transition-all duration-500 ${
                  i === step ? "border-primary/30 bg-primary/[0.05]" : "border-foreground/[0.06] opacity-45"
                }`}
              >
                <p className="text-sm text-foreground/90 font-light">
                  <span className="text-laser mono mr-2">{g.n}</span>
                  {g.sense}
                </p>
                {i === step && <p className="text-foreground/50 text-xs mt-1.5 leading-relaxed">{g.hint}</p>}
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-4">
            <Btn onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>
              Anterior
            </Btn>
            <Btn
              variant="laser"
              onClick={() => setStep((s) => (s + 1) % GROUNDING.length)}
            >
              {step === GROUNDING.length - 1 ? "Volver a empezar" : "Siguiente"}
            </Btn>
          </div>
        </TPanel>

        <TPanel className="hover-lift">
          <p className="mono text-[10px] tracking-wider-2 text-primary/70 uppercase mb-3 flex items-center gap-2">
            <Snowflake className="w-3.5 h-3.5" /> {tipp.acronym} · crisis 9-10/10
          </p>
          <p className="text-foreground/55 text-xs leading-relaxed mb-4">{tipp.when}</p>
          <ul className="space-y-3">
            {tipp.steps.map((s) => (
              <li key={s.k}>
                <p className="text-sm text-foreground/90 font-light">{s.k}</p>
                <p className="text-foreground/50 text-xs leading-relaxed">{s.v}</p>
              </li>
            ))}
          </ul>
          <p className="text-foreground/40 text-[11px] italic leading-relaxed mt-4">{tipp.note}</p>
        </TPanel>
      </div>

      <TPanel className="reveal">
        <p className="text-foreground/60 text-sm leading-relaxed flex gap-3">
          <Wind className="w-4 h-4 text-primary shrink-0 mt-0.5" />
          Si después de diez minutos sigues en el mismo punto, no es que lo estés haciendo mal: es que necesitas
          a otra persona. Escribe a alguien de tu lista. En España, el <strong className="text-laser">024</strong> atiende 24 h.
        </p>
      </TPanel>
    </div>
  );
};

export default RegulateNow;