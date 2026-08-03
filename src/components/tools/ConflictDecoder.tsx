import { useState } from "react";
import { MessageSquare, ShieldAlert, Sparkles, Copy, Check, Info } from "lucide-react";
import { TPanel, Btn, Label } from "./ui";

interface AnalysisResult {
  detectedPatterns: { pattern: string; desc: string; risk: "alta" | "media" | "baja" }[];
  biffSuggestion: string;
  dearManSuggestion: string;
  grayRockSuggestion: string;
}

export const ConflictDecoder = () => {
  const [inputText, setInputText] = useState("");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);

  const analyzeMessage = () => {
    if (!inputText.trim()) return;

    const lower = inputText.toLowerCase();
    const patterns: { pattern: string; desc: string; risk: "alta" | "media" | "baja" }[] = [];

    if (lower.includes("siempre") || lower.includes("nunca") || lower.includes("tú eres") || lower.includes("por tu culpa")) {
      patterns.push({
        pattern: "Proyección / Generalización Absoluta",
        desc: "Uso de 'siempre/nunca' o culpabilización directa para provocar defensividad.",
        risk: "alta",
      });
    }

    if (lower.includes("después de todo") || lower.includes("con todo lo que he hecho") || lower.includes("no te importo")) {
      patterns.push({
        pattern: "Chantaje Emocional / Inducción de Culpa",
        desc: "Apela a la deuda moral o afectiva para forzar una concesión.",
        risk: "alta",
      });
    }

    if (lower.includes("nadie más te") || lower.includes("estás loco") || lower.includes("te inventas") || lower.includes("eso no pasó")) {
      patterns.push({
        pattern: "Gaslighting / Anulación de la Realidad",
        desc: "Invalida tu percepción objetiva de los hechos.",
        risk: "alta",
      });
    }

    if (lower.includes("contesta ya") || lower.includes("ahora mismo") || lower.includes("o si no")) {
      patterns.push({
        pattern: "Urgencia Artificial / Ultimátum",
        desc: "Busca romper tus tiempos de regulación para forzar una respuesta en caliente.",
        risk: "media",
      });
    }

    if (patterns.length === 0) {
      patterns.push({
        pattern: "Carga Emocional Intensa",
        desc: "Mensaje con tensión o ambigüedad que requiere contención y respuesta asertiva.",
        risk: "media",
      });
    }

    // Generate tailored templates based on input
    const biff = `Hola. Entiendo tu postura sobre este punto. Sin embargo, mi decisión/posición se mantiene como la acordamos. Podemos retomar el tema de forma serena más adelante si es necesario. Un saludo.`;
    
    const dearMan = `[Hecho]: Veo que hay desacuerdo sobre este tema. [Sentimiento]: Me genera incomodidad comunicarnos con esta tensión. [Necesidad]: Necesito que mantengamos una conversación respetuosa y sin descalificaciones. [Refuerzo]: Así podremos llegar a soluciones reales sin desgastarnos.`;

    const grayRock = `Enterado/a. Gracias por avisarme. Lo tendré en cuenta.`;

    setAnalysis({
      detectedPatterns: patterns,
      biffSuggestion: biff,
      dearManSuggestion: dearMan,
      grayRockSuggestion: grayRock,
    });
  };

  const copyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="reveal">
        <Label>— Asistente de Comunicación Protectora</Label>
        <h3 className="text-2xl md:text-3xl font-light text-foreground/95 mb-2">Descodificador de Mensajes & BIFF</h3>
        <p className="text-foreground/60 text-sm leading-relaxed max-w-2xl">
          Pega un mensaje confuso o agresivo para analizar patrones de manipulación o tensión emocional y generar
          respuestas no reactivas, firmes y protectoras.
        </p>
      </div>

      <TPanel laser className="reveal space-y-4">
        <div>
          <label className="block text-xs uppercase mono text-foreground/50 mb-2">
            Mensaje recibido (o conversación conflictiva):
          </label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ejemplo: 'Si de verdad me quisieras no me dejarías así. Siempre piensas solo en ti...'"
            className="w-full h-32 bg-black/40 border border-foreground/15 rounded-xl p-3.5 text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-primary/50 transition-all font-light resize-none"
          />
        </div>

        <div className="flex justify-end">
          <Btn onClick={analyzeMessage} laser className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <span>Descodificar y Generar Respuestas</span>
          </Btn>
        </div>

        {analysis && (
          <div className="pt-4 border-t border-white/10 space-y-5 animate-in fade-in duration-300">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <ShieldAlert className="w-4 h-4 text-primary" />
                <h4 className="mono text-xs uppercase text-primary tracking-wider font-semibold">
                  Patrones detectados en el mensaje
                </h4>
              </div>
              <div className="grid gap-2">
                {analysis.detectedPatterns.map((pat, idx) => (
                  <div key={idx} className="glass rounded-xl p-3 border border-white/10 flex items-start gap-3">
                    <span className={`text-[10px] px-2 py-0.5 rounded uppercase mono font-medium mt-0.5 ${
                      pat.risk === 'alta' ? 'bg-primary/20 text-primary border border-primary/40' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}>
                      {pat.risk}
                    </span>
                    <div>
                      <p className="text-xs font-medium text-foreground">{pat.pattern}</p>
                      <p className="text-[11px] text-foreground/60 mt-0.5">{pat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-primary" />
                <h4 className="mono text-xs uppercase text-foreground/80 tracking-wider">
                  Respuestas de Protección (Elige la conveniente)
                </h4>
              </div>

              {/* BIFF */}
              <div className="glass rounded-xl p-4 border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="mono text-xs font-semibold text-primary uppercase">
                    Fórmula BIFF (Brief, Informative, Friendly, Firm)
                  </span>
                  <button
                    onClick={() => copyText(analysis.biffSuggestion, "biff")}
                    className="flex items-center gap-1 text-[11px] text-foreground/60 hover:text-primary transition-colors"
                  >
                    {copiedKey === "biff" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === "biff" ? "Copiado" : "Copiar"}</span>
                  </button>
                </div>
                <p className="text-xs text-foreground/80 bg-black/30 p-3 rounded-lg border border-white/5 font-mono">
                  {analysis.biffSuggestion}
                </p>
                <p className="text-[10px] text-foreground/40 italic">
                  Ideal para mantener el límite sin entrar en justificaciones ni discusiones estériles.
                </p>
              </div>

              {/* DEAR MAN */}
              <div className="glass rounded-xl p-4 border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="mono text-xs font-semibold text-emerald-400 uppercase">
                    DBT DEAR MAN (Expresión Asertiva)
                  </span>
                  <button
                    onClick={() => copyText(analysis.dearManSuggestion, "dearman")}
                    className="flex items-center gap-1 text-[11px] text-foreground/60 hover:text-primary transition-colors"
                  >
                    {copiedKey === "dearman" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === "dearman" ? "Copiado" : "Copiar"}</span>
                  </button>
                </div>
                <p className="text-xs text-foreground/80 bg-black/30 p-3 rounded-lg border border-white/5 font-mono">
                  {analysis.dearManSuggestion}
                </p>
              </div>

              {/* Gray Rock */}
              <div className="glass rounded-xl p-4 border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="mono text-xs font-semibold text-sky-400 uppercase">
                    Piedra Gris (Gray Rock - Neutralidad Máxima)
                  </span>
                  <button
                    onClick={() => copyText(analysis.grayRockSuggestion, "grayrock")}
                    className="flex items-center gap-1 text-[11px] text-foreground/60 hover:text-primary transition-colors"
                  >
                    {copiedKey === "grayrock" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === "grayrock" ? "Copiado" : "Copiar"}</span>
                  </button>
                </div>
                <p className="text-xs text-foreground/80 bg-black/30 p-3 rounded-lg border border-white/5 font-mono">
                  {analysis.grayRockSuggestion}
                </p>
                <div className="flex items-center gap-1.5 text-[10px] text-foreground/40 mt-1">
                  <Info className="w-3 h-3 text-primary/70" />
                  <span>Usa Piedra Gris cuando cualquier emoción o argumento sea usado en tu contra.</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </TPanel>
    </div>
  );
};
