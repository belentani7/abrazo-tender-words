import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Activity, NotebookPen, ShieldCheck, MessageSquareQuote, HeartHandshake, ClipboardCheck, Layers } from "lucide-react";
import { TPanel } from "./ui";
import { TOOLKIT_DISCLAIMER } from "@/content/toolkit-data";
import RegulateNow from "./RegulateNow";
import Journal from "./Journal";
import CrisisPlan from "./CrisisPlan";
import BoundaryBuilder from "./BoundaryBuilder";
import AttachmentTest from "./AttachmentTest";
import RelationCheck from "./RelationCheck";
import SkillDeck from "./SkillDeck";
import { ConflictDecoder } from "./ConflictDecoder";

const TOOLS = [
  { id: "sos", label: "Regular ahora", icon: Activity, node: <RegulateNow /> },
  { id: "biff", label: "Descodificador BIFF", icon: MessageSquareQuote, node: <ConflictDecoder /> },
  { id: "habilidades", label: "Habilidades DBT", icon: Layers, node: <SkillDeck /> },
  { id: "diario", label: "Diario emocional", icon: NotebookPen, node: <Journal /> },
  { id: "limites", label: "Constructor de límites", icon: MessageSquareQuote, node: <BoundaryBuilder /> },
  { id: "apego", label: "Estilo de apego", icon: HeartHandshake, node: <AttachmentTest /> },
  { id: "chequeo", label: "Autochequeo del vínculo", icon: ClipboardCheck, node: <RelationCheck /> },
  { id: "crisis", label: "Plan de crisis", icon: ShieldCheck, node: <CrisisPlan /> },
];

const Toolkit = () => {
  const [active, setActive] = useState("sos");
  useScrollReveal(active);
  const current = TOOLS.find((t) => t.id === active)!;

  return (
    <div className="space-y-8">
      <div className="reveal">
        <p className="mono text-[10px] tracking-wider-2 text-primary/80 uppercase mb-3">— Práctica · siete herramientas</p>
        <h2 className="text-3xl md:text-5xl font-light text-foreground/95 leading-[1.05] tracking-tight mb-4">
          Herramientas
        </h2>
        <p className="text-foreground/65 text-base leading-relaxed max-w-3xl">
          Saber no basta: hay que tener algo que hacer a las tres de la mañana. Esto es lo que puedes usar hoy,
          sin cuenta, sin registro y sin que nada salga de tu dispositivo.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 reveal">
        {TOOLS.map((t) => {
          const Icon = t.icon;
          const on = t.id === active;
          return (
            <button
              key={t.id}
              onClick={() => {
                setActive(t.id);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`press-spring flex items-center gap-1.5 rounded-full px-3.5 py-2 mono text-[10px] tracking-wider uppercase border transition-all duration-500 ${
                on ? "bg-primary/15 text-primary border-primary/30" : "text-foreground/40 border-foreground/10 hover:text-foreground/85 hover:border-foreground/25"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {t.label}
            </button>
          );
        })}
      </div>

      <div key={active}>{current.node}</div>

      <TPanel className="reveal">
        <p className="text-foreground/55 text-xs italic leading-relaxed">{TOOLKIT_DISCLAIMER}</p>
      </TPanel>
    </div>
  );
};

export default Toolkit;