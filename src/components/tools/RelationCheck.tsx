import { useMemo, useState } from "react";
import { RotateCcw, Phone } from "lucide-react";
import { TPanel, Btn, Label } from "./ui";
import { RELATION_CHECK, CHECK_TIERS } from "@/content/toolkit-data";

const RelationCheck = () => {
  const [marked, setMarked] = useState<Set<number>>(new Set());
  const [shown, setShown] = useState(false);

  const toggle = (i: number) => {
    const next = new Set(marked);
    next.has(i) ? next.delete(i) : next.add(i);
    setMarked(next);
  };

  const tier = useMemo(() => CHECK_TIERS.find((t) => marked.size <= t.max)!, [marked.size]);

  return (
    <div className="space-y-5">
      <div className="reveal">
        <Label>— Autochequeo · salud del vínculo</Label>
        <h3 className="text-2xl md:text-3xl font-light text-foreground/95 mb-3">¿Cómo estoy en esta relación?</h3>
        <p className="text-foreground/60 text-sm leading-relaxed max-w-2xl">
          Marca lo que reconozcas de los últimos meses. No es un test de si la otra persona «tiene algo»: es un
          termómetro de cómo te está dejando a ti el vínculo. Vale para pareja, familia, amistad o trabajo.
        </p>
      </div>

      <div className="space-y-2.5 reveal-stagger">
        {RELATION_CHECK.map((item, i) => {
          const on = marked.has(i);
          return (
            <button key={i} onClick={() => toggle(i)} className="w-full text-left">
              <TPanel className={`hover-lift transition-all ${on ? "border-primary/30" : ""}`} laser={on}>
                <div className="flex items-start gap-3">
                  <span
                    className={`mt-0.5 w-4 h-4 rounded-md border shrink-0 transition-all ${
                      on ? "bg-primary/70 border-primary/70" : "border-foreground/20"
                    }`}
                  />
                  <div>
                    <p className={`text-sm leading-relaxed ${on ? "text-foreground/90" : "text-foreground/65"}`}>{item.t}</p>
                    <p className="mono text-[9px] tracking-wider-2 text-foreground/30 uppercase mt-1">{item.area}</p>
                  </div>
                </div>
              </TPanel>
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-2 reveal">
        <Btn variant="laser" onClick={() => setShown(true)}>Ver lectura</Btn>
        <Btn onClick={() => { setMarked(new Set()); setShown(false); }}>
          <RotateCcw className="w-3.5 h-3.5" /> Reiniciar
        </Btn>
      </div>

      {shown && (
        <TPanel laser className="reveal space-y-3">
          <Label>— {marked.size} de {RELATION_CHECK.length} señales marcadas</Label>
          <h4 className="text-xl font-light text-foreground/95">{tier.title}</h4>
          <p className="text-foreground/70 text-sm leading-relaxed">{tier.body}</p>
          <p className="text-foreground/50 text-xs leading-relaxed italic">
            Ninguna suma decide por ti. Un solo ítem sobre consentimiento, control económico o miedo físico ya es
            motivo suficiente para pedir ayuda, aunque el resto esté en blanco.
          </p>
          <p className="text-foreground/60 text-xs leading-relaxed flex gap-2 items-start">
            <Phone className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
            España: 016 (violencia, no deja rastro en la factura) · 024 (conducta suicida) · 112 (emergencias).
          </p>
        </TPanel>
      )}
    </div>
  );
};

export default RelationCheck;