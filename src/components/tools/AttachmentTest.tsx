import { useMemo, useState } from "react";
import { RotateCcw } from "lucide-react";
import { TPanel, Btn, Label } from "./ui";
import { ATTACH_ITEMS, ATTACH_RESULTS, type AttachStyle } from "@/content/toolkit-data";

const SCALE = [
  { v: 1, l: "Nada" },
  { v: 2, l: "Poco" },
  { v: 3, l: "A veces" },
  { v: 4, l: "Bastante" },
  { v: 5, l: "Mucho" },
];

const AttachmentTest = () => {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const done = Object.keys(answers).length === ATTACH_ITEMS.length;

  const result = useMemo(() => {
    if (!done) return null;
    const sum = (dim: "ansioso" | "evitativo") => {
      const items = ATTACH_ITEMS.map((it, i) => ({ it, i })).filter(({ it }) => it.dim === dim);
      const raw = items.reduce((s, { i }) => s + (answers[i] ?? 0), 0);
      return (raw / (items.length * 5)) * 100;
    };
    const anx = sum("ansioso");
    const avo = sum("evitativo");
    let style: AttachStyle = "seguro";
    if (anx >= 55 && avo >= 55) style = "desorganizado";
    else if (anx >= 55) style = "ansioso";
    else if (avo >= 55) style = "evitativo";
    return { anx, avo, style };
  }, [answers, done]);

  return (
    <div className="space-y-5">
      <div className="reveal">
        <Label>— Autoobservación · orientativo</Label>
        <h3 className="text-2xl md:text-3xl font-light text-foreground/95 mb-3">¿Cómo te vinculas?</h3>
        <p className="text-foreground/60 text-sm leading-relaxed max-w-2xl">
          Catorce frases sobre cómo vives la cercanía y la distancia. No mide un diagnóstico ni una etiqueta fija:
          el apego es una tendencia aprendida y, por tanto, modificable. Responde pensando en tus vínculos íntimos
          recientes.
        </p>
      </div>

      <div className="space-y-3 reveal-stagger">
        {ATTACH_ITEMS.map((item, i) => (
          <TPanel key={i} className="hover-lift">
            <p className="text-sm text-foreground/85 leading-relaxed mb-3">
              <span className="mono text-[10px] text-primary/60 mr-2">{String(i + 1).padStart(2, "0")}</span>
              {item.q}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {SCALE.map((s) => (
                <button
                  key={s.v}
                  onClick={() => setAnswers({ ...answers, [i]: s.v })}
                  className={`press-spring rounded-full px-3 py-1.5 mono text-[10px] tracking-wider uppercase border transition-all ${
                    answers[i] === s.v
                      ? "bg-primary/15 text-primary border-primary/30"
                      : "text-foreground/40 border-foreground/10 hover:text-foreground/80"
                  }`}
                >
                  {s.l}
                </button>
              ))}
            </div>
          </TPanel>
        ))}
      </div>

      {!done && (
        <TPanel className="reveal">
          <p className="text-foreground/50 text-sm">
            Respondidas {Object.keys(answers).length} de {ATTACH_ITEMS.length}.
          </p>
        </TPanel>
      )}

      {result && (
        <TPanel laser className="reveal space-y-4">
          <div>
            <Label>— Resultado orientativo</Label>
            <h4 className="text-xl font-light text-foreground/95">{ATTACH_RESULTS[result.style].title}</h4>
          </div>

          {([["Ansiedad de apego", result.anx], ["Evitación de apego", result.avo]] as const).map(([label, val]) => (
            <div key={label}>
              <div className="flex justify-between mono text-[10px] tracking-wider-2 uppercase text-foreground/45 mb-1">
                <span>{label}</span>
                <span>{Math.round(val)}%</span>
              </div>
              <div className="h-1 rounded-full bg-foreground/10 overflow-hidden">
                <div className="h-full bg-primary/70 transition-all duration-700" style={{ width: `${val}%` }} />
              </div>
            </div>
          ))}

          <p className="text-foreground/70 text-sm leading-relaxed">{ATTACH_RESULTS[result.style].body}</p>
          <div>
            <p className="mono text-[10px] tracking-wider-2 text-primary/70 uppercase mb-2">Por dónde empezar</p>
            <ul className="space-y-2">
              {ATTACH_RESULTS[result.style].work.map((w, i) => (
                <li key={i} className="flex gap-3 text-foreground/65 text-sm leading-relaxed">
                  <span className="mono text-[10px] text-primary/70 mt-1">0{i + 1}</span>
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>
          <Btn onClick={() => setAnswers({})}>
            <RotateCcw className="w-3.5 h-3.5" /> Repetir
          </Btn>
        </TPanel>
      )}
    </div>
  );
};

export default AttachmentTest;