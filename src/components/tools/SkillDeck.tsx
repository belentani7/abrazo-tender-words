import { useState } from "react";
import { TPanel, Label } from "./ui";
import { SKILL_CARDS } from "@/content/toolkit-data";

const MODULES = ["Todos", "Mindfulness", "Tolerancia al malestar", "Regulación emocional", "Eficacia interpersonal"] as const;

const SkillDeck = () => {
  const [mod, setMod] = useState<(typeof MODULES)[number]>("Todos");
  const cards = SKILL_CARDS.filter((c) => mod === "Todos" || c.module === mod);

  return (
    <div className="space-y-5">
      <div className="reveal">
        <Label>— DBT aplicada · fichas de bolsillo</Label>
        <h3 className="text-2xl md:text-3xl font-light text-foreground/95 mb-3">Habilidades, paso a paso</h3>
        <p className="text-foreground/60 text-sm leading-relaxed max-w-2xl">
          La terapia dialéctico-conductual es el tratamiento con más evidencia para la desregulación emocional.
          Estas son sus habilidades centrales, resumidas para usarlas en mitad de la vida real, no en un aula.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 reveal">
        {MODULES.map((m) => (
          <button
            key={m}
            onClick={() => setMod(m)}
            className={`press-spring rounded-full px-3 py-1.5 mono text-[10px] tracking-wider uppercase border transition-all ${
              m === mod ? "bg-primary/15 text-primary border-primary/30" : "text-foreground/40 border-foreground/10 hover:text-foreground/80"
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4 reveal-stagger">
        {cards.map((c) => (
          <TPanel key={c.id} className="hover-lift h-full">
            <div className="flex items-center justify-between gap-3 mb-2">
              <span className="mono text-[11px] tracking-wider-2 text-laser uppercase">{c.acronym}</span>
              <span className="mono text-[9px] tracking-wider-2 text-foreground/35 uppercase border border-foreground/10 rounded-full px-2 py-0.5">
                {c.module}
              </span>
            </div>
            <h4 className="text-lg font-light text-foreground/95 mb-2">{c.name}</h4>
            <p className="text-foreground/50 text-xs leading-relaxed mb-4 italic">{c.when}</p>
            <ul className="space-y-2.5">
              {c.steps.map((s) => (
                <li key={s.k}>
                  <p className="text-sm text-foreground/90 font-light">{s.k}</p>
                  <p className="text-foreground/55 text-xs leading-relaxed">{s.v}</p>
                </li>
              ))}
            </ul>
            {c.note && <p className="text-foreground/40 text-[11px] italic leading-relaxed mt-4">{c.note}</p>}
          </TPanel>
        ))}
      </div>
    </div>
  );
};

export default SkillDeck;