import { useMemo, useState } from "react";
import { Copy, Wand2 } from "lucide-react";
import { toast } from "sonner";
import { TPanel, Btn, Label, Field } from "./ui";

const TONES = [
  { id: "tierno", name: "Tierno y firme", pre: "Te quiero y quiero seguir aquí, y para eso necesito decirte algo.", post: "No te lo digo para hacerte daño, te lo digo para poder quedarme bien." },
  { id: "neutro", name: "Neutro y claro", pre: "Quiero comentarte una cosa que me está afectando.", post: "Prefiero decirlo a que se acumule." },
  { id: "protector", name: "Protector (vínculo dañino)", pre: "Voy a ser directo/a porque esto ya no lo puedo sostener.", post: "No estoy abriendo una negociación: te estoy informando de mi límite." },
];

const PRESETS = [
  { label: "Mensajes de madrugada", facts: "me escribes entre la una y las cinco de la mañana varias veces por semana", feel: "no descanso y llego al día siguiente sin recursos", ask: "no escribirnos después de las once; lo que quede pendiente lo hablamos al día siguiente", gain: "podré estar presente de verdad cuando hablemos" },
  { label: "Discusiones que escalan", facts: "cuando discutimos, la conversación pasa a gritos y reproches del pasado", feel: "me bloqueo y dejo de poder pensar", ask: "que si alguno levanta la voz, paremos 30 minutos y volvamos", gain: "resolveremos más y romperemos menos cosas por el camino" },
  { label: "Amenazas de ruptura", facts: "en cada conflicto aparece la amenaza de dejarlo", feel: "vivo en alerta constante y dejo de decir lo que pienso", ask: "que dejemos la ruptura fuera de las discusiones y hablemos de la relación en frío", gain: "podré ser honesto/a sin miedo a perderte cada semana" },
  { label: "Decir que no sin culpa", facts: "me pides cosas que necesito rechazar y luego siento que te fallo", feel: "acabo diciendo que sí y guardando resentimiento", ask: "que un «no» mío se pueda quedar en «no», sin insistir ni castigo", gain: "mis «sí» volverán a ser de verdad" },
];

const BoundaryBuilder = () => {
  const [tone, setTone] = useState("tierno");
  const [facts, setFacts] = useState("");
  const [feel, setFeel] = useState("");
  const [ask, setAsk] = useState("");
  const [gain, setGain] = useState("");
  const [conseq, setConseq] = useState("");

  const t = TONES.find((x) => x.id === tone)!;

  const script = useMemo(() => {
    if (!facts.trim() && !ask.trim()) return "";
    const lines = [
      t.pre,
      facts.trim() && `Cuando ${facts.trim()},`,
      feel.trim() && `yo ${feel.trim()}.`,
      ask.trim() && `Te pido ${ask.trim()}.`,
      gain.trim() && `Si lo hacemos así, ${gain.trim()}.`,
      conseq.trim() && `Si esto sigue igual, ${conseq.trim()}.`,
      t.post,
    ].filter(Boolean);
    return lines.join(" ");
  }, [t, facts, feel, ask, gain, conseq]);

  const usePreset = (p: (typeof PRESETS)[number]) => {
    setFacts(p.facts);
    setFeel(p.feel);
    setAsk(p.ask);
    setGain(p.gain);
  };

  return (
    <div className="space-y-5">
      <div className="reveal">
        <Label>— Eficacia interpersonal · DEAR MAN</Label>
        <h3 className="text-2xl md:text-3xl font-light text-foreground/95 mb-3">Constructor de límites</h3>
        <p className="text-foreground/60 text-sm leading-relaxed max-w-2xl">
          Un límite se sostiene mucho mejor cuando está escrito antes de la conversación. Rellena las piezas y
          obtendrás un guion que puedes leer, memorizar o enviar tal cual.
        </p>
      </div>

      <TPanel className="reveal">
        <p className="text-sm font-light text-foreground/90 mb-3">Situaciones frecuentes</p>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.label}
              onClick={() => usePreset(p)}
              className="press-spring rounded-full px-3 py-1.5 mono text-[10px] tracking-wider uppercase border border-foreground/10 text-foreground/50 hover:text-foreground/90 hover:border-primary/40 transition-all"
            >
              {p.label}
            </button>
          ))}
        </div>
      </TPanel>

      <TPanel laser className="space-y-4 reveal">
        <div>
          <p className="text-sm font-light text-foreground/90 mb-2">Tono</p>
          <div className="flex flex-wrap gap-2">
            {TONES.map((x) => (
              <button
                key={x.id}
                onClick={() => setTone(x.id)}
                className={`press-spring rounded-full px-3 py-1.5 mono text-[10px] tracking-wider uppercase border transition-all ${
                  x.id === tone ? "bg-primary/15 text-primary border-primary/30" : "text-foreground/45 border-foreground/10 hover:text-foreground/85"
                }`}
              >
                {x.name}
              </button>
            ))}
          </div>
        </div>

        <Field label="D · Describe los hechos" hint="Sin adjetivos ni «siempre/nunca». Completa: «Cuando…»" value={facts} onChange={setFacts} rows={2} placeholder="cancelas planes el mismo día" />
        <Field label="E · Expresa cómo te afecta" hint="En primera persona. Completa: «yo…»" value={feel} onChange={setFeel} rows={2} placeholder="me siento poco importante y me cuesta organizarme" />
        <Field label="A · Afirma lo que pides" hint="Concreto y observable. Completa: «Te pido…»" value={ask} onChange={setAsk} rows={2} placeholder="que me avises con un día de antelación" />
        <Field label="R · Refuerza lo que gana la relación" hint="Completa: «Si lo hacemos así…»" value={gain} onChange={setGain} rows={2} placeholder="llegaré con ganas y sin reproches" />
        <Field label="Consecuencia (opcional)" hint="Solo si estás dispuesto/a a cumplirla. Un límite que no se sostiene enseña que no era un límite." value={conseq} onChange={setConseq} rows={2} placeholder="dejaré de reservar la tarde entera" />
      </TPanel>

      {script && (
        <TPanel className="reveal">
          <p className="mono text-[10px] tracking-wider-2 text-primary/80 uppercase mb-3 flex items-center gap-2">
            <Wand2 className="w-3.5 h-3.5" /> Tu guion
          </p>
          <p className="text-foreground/85 text-base leading-relaxed">{script}</p>
          <div className="mt-4">
            <Btn
              variant="laser"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(script);
                  toast.success("Guion copiado.");
                } catch {
                  toast.error("No se pudo copiar en este navegador.");
                }
              }}
            >
              <Copy className="w-3.5 h-3.5" /> Copiar
            </Btn>
          </div>
        </TPanel>
      )}

      <TPanel className="reveal">
        <p className="text-foreground/60 text-sm leading-relaxed">
          Si la otra persona desvía la conversación, vuelve a tu frase con las mismas palabras (disco rayado).
          No hace falta ganar el debate: basta con no moverte del límite.
        </p>
      </TPanel>
    </div>
  );
};

export default BoundaryBuilder;