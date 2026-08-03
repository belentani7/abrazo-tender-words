import { Copy, Printer, Trash2, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { TPanel, Btn, Label, Field, useLocalState } from "./ui";
import { CRISIS_FIELDS } from "@/content/toolkit-data";

type Plan = Record<string, string>;

const CrisisPlan = () => {
  const [plan, setPlan] = useLocalState<Plan>("abrazo-crisis-plan", {});

  const asText = () =>
    `MI PLAN DE CRISIS\n\n${CRISIS_FIELDS.map(
      (f) => `${f.label.toUpperCase()}\n${(plan[f.id] || "—").trim()}\n`,
    ).join("\n")}\nTeléfonos: 024 conducta suicida · 016 violencia · 112 emergencias`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(asText());
      toast.success("Plan copiado. Pégalo donde lo tengas a mano.");
    } catch {
      toast.error("No se pudo copiar en este navegador.");
    }
  };

  const print = () => {
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(
      `<pre style="font-family:ui-monospace,monospace;white-space:pre-wrap;padding:32px;line-height:1.7">${asText().replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c] as string))}</pre>`,
    );
    w.document.close();
    w.print();
  };

  const filled = CRISIS_FIELDS.filter((f) => (plan[f.id] || "").trim()).length;

  return (
    <div className="space-y-5">
      <div className="reveal">
        <Label>— Prevención · escríbelo en calma</Label>
        <h3 className="text-2xl md:text-3xl font-light text-foreground/95 mb-3">Plan de crisis personal</h3>
        <p className="text-foreground/60 text-sm leading-relaxed max-w-2xl">
          Un plan escrito cuando estás bien es una carta a tu yo desbordado. En crisis no se inventa: se lee.
          Rellénalo poco a poco; se guarda solo aquí, en tu dispositivo.
        </p>
      </div>

      <TPanel laser className="reveal">
        <div className="flex items-center justify-between gap-3 mb-2">
          <p className="mono text-[10px] tracking-wider-2 text-primary/80 uppercase flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5" /> Completado
          </p>
          <p className="mono text-[11px] text-foreground/60">{filled} / {CRISIS_FIELDS.length}</p>
        </div>
        <div className="h-1 rounded-full bg-foreground/10 overflow-hidden">
          <div
            className="h-full bg-primary/70 transition-all duration-700"
            style={{ width: `${(filled / CRISIS_FIELDS.length) * 100}%` }}
          />
        </div>
      </TPanel>

      <div className="space-y-4 reveal-stagger">
        {CRISIS_FIELDS.map((f) => (
          <TPanel key={f.id} className="hover-lift">
            <Field
              label={f.label}
              hint={f.hint}
              value={plan[f.id] ?? ""}
              onChange={(v) => setPlan({ ...plan, [f.id]: v })}
            />
          </TPanel>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 reveal">
        <Btn variant="laser" onClick={copy}>
          <Copy className="w-3.5 h-3.5" /> Copiar plan
        </Btn>
        <Btn onClick={print}>
          <Printer className="w-3.5 h-3.5" /> Imprimir
        </Btn>
        <Btn
          onClick={() => {
            setPlan({});
            toast.success("Plan borrado de este dispositivo.");
          }}
        >
          <Trash2 className="w-3.5 h-3.5" /> Borrar
        </Btn>
      </div>

      <TPanel className="reveal">
        <p className="text-foreground/60 text-sm leading-relaxed">
          Comparte una copia con una persona de confianza y, si tienes terapeuta, revísalo con quien te acompaña.
          Un plan que otros conocen funciona mucho mejor que uno secreto.
        </p>
      </TPanel>
    </div>
  );
};

export default CrisisPlan;