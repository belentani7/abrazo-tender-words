import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Brain,
  HeartHandshake,
  Send,
  Sparkles,
  User2,
  AlertTriangle,
  Loader2,
  Trash2,
  Volume2,
  VolumeX,
  Copy,
  Check,
  Shield,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import { streamAgentResponse, AgentRole, AGENT_CONFIGS, ChatMessage } from "@/lib/onlineAiEngine";
import DiscreetCredit from "./DiscreetCredit";

const QUICK_PROMPTS = [
  "🫂 Necesito un abrazo virtual y palabras tiernas hoy.",
  "🌿 Siento mucha ansiedad y miedo al rechazo en este momento.",
  "🛡️ ¿Cómo redacto un mensaje BIFF para poner un límite firme?",
  "🧘 Ayúdame a hacer un ejercicio rápido de calma física.",
  "💖 Valida mi dolor: siento que exagero mis emociones.",
];

export const AgentChat: React.FC = () => {
  const [agentRole, setAgentRole] = useState<AgentRole>("aura");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const activeAgent = AGENT_CONFIGS[agentRole];

  useEffect(() => {
    setMessages([]);
    setInput("");
    window.speechSynthesis?.cancel();
    setSpeaking(false);
  }, [agentRole]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async (overrideText?: string) => {
    const text = (overrideText || input).trim();
    if (!text || loading) return;

    const nextMsgs: ChatMessage[] = [...messages, { role: "user", content: text }];
    setMessages(nextMsgs);
    setInput("");
    setLoading(true);

    try {
      setMessages((m) => [...m, { role: "assistant", content: "" }]);

      await streamAgentResponse(agentRole, nextMsgs, (accumulated) => {
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: "assistant", content: accumulated };
          return updated;
        });
      });
    } catch (_err) {
      toast.error("Error procesando mensaje. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const handleSpeak = (text: string) => {
    if (!window.speechSynthesis) {
      toast.error("Tu navegador no soporta síntesis de voz.");
      return;
    }

    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }

    const cleanText = text.replace(/[*_>#`]/g, "");
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = "es-ES";
    utterance.rate = 0.92;
    utterance.pitch = 1.0;

    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    setSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleCopy = (content: string, idx: number) => {
    const cardText = `"${content.replace(/[*_>#`]/g, "")}"\n\n— Generado por ${activeAgent.name} (@belentani_)`;
    navigator.clipboard.writeText(cardText);
    setCopiedIdx(idx);
    toast.success("¡Mensaje copiado al portapapeles!");
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="space-y-6">
      {/* Zero API Badge Header */}
      <div className="glass-laser laser-border rounded-2xl p-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Zap className="w-4 h-4 text-primary shrink-0 animate-pulse" />
          <p className="text-foreground/80 text-xs leading-relaxed">
            <strong className="text-laser font-normal">IA Especializada Integrada (Sin Necesidad de API Keys)</strong> — 
            Servidores de inferencia en tiempo real y motor local en tu propio navegador.
          </p>
        </div>
        <DiscreetCredit variant="badge" />
      </div>

      {/* Agent Selector Tabs */}
      <div className="grid sm:grid-cols-3 md:grid-cols-5 gap-2.5">
        {(Object.keys(AGENT_CONFIGS) as AgentRole[]).map((roleKey) => {
          const a = AGENT_CONFIGS[roleKey];
          const isSelected = agentRole === roleKey;
          return (
            <button
              key={roleKey}
              onClick={() => setAgentRole(roleKey)}
              className={`text-left rounded-2xl p-3.5 border transition-all duration-300 ${
                isSelected
                  ? "glass-laser laser-border shadow-lg"
                  : "glass border-foreground/[0.06] hover:border-foreground/20"
              }`}
            >
              <div className="text-xl mb-1">{a.avatar}</div>
              <h4 className={`text-xs font-light line-clamp-1 ${isSelected ? "text-foreground font-normal" : "text-foreground/80"}`}>
                {a.name.split("—")[0]}
              </h4>
              <p className="text-foreground/45 text-[10px] line-clamp-2 mt-0.5">{a.subtitle}</p>
            </button>
          );
        })}
      </div>

      {/* Main Chat Interface */}
      <div className="glass rounded-3xl border border-foreground/[0.08] overflow-hidden flex flex-col" style={{ height: "min(70vh, 600px)" }}>
        {/* Chat Topbar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-foreground/[0.06]">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">{activeAgent.avatar}</span>
            <div>
              <p className="mono text-xs text-foreground/90 font-light flex items-center gap-2">
                {activeAgent.name}
              </p>
              <p className="text-[10px] text-foreground/50">{activeAgent.subtitle}</p>
            </div>
          </div>

          {messages.length > 0 && (
            <button
              onClick={() => setMessages([])}
              className="text-foreground/40 hover:text-rose-400 transition-colors p-1.5"
              title="Borrar conversación"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Message Log */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto scrollbar-hide px-5 py-5 space-y-4">
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center px-4 space-y-6">
              <div className="w-16 h-16 rounded-full glass-laser laser-border flex items-center justify-center text-3xl animate-bounce">
                {activeAgent.avatar}
              </div>
              <p className="text-foreground/70 text-sm leading-relaxed max-w-md">
                {activeAgent.openers[0]}
              </p>

              {/* Quick Prompts Pills */}
              <div className="w-full max-w-lg space-y-2">
                <p className="mono text-[10px] text-foreground/40 uppercase">Atajos Rápidos:</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {QUICK_PROMPTS.map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(prompt)}
                      className="px-3 py-1.5 rounded-full glass border border-primary/20 text-xs text-foreground/75 hover:text-primary hover:border-primary/50 transition-all text-left"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed relative group ${
                  m.role === "user"
                    ? "bg-primary/15 border border-primary/25 text-foreground/90"
                    : "glass border border-foreground/[0.08] text-foreground/90"
                }`}
              >
                {m.role === "assistant" ? (
                  <div>
                    <div className="prose-chat">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.content || "…"}</ReactMarkdown>
                    </div>

                    {/* Action icons on message hover */}
                    {m.content && (
                      <div className="mt-3 pt-2 border-t border-foreground/[0.06] flex items-center justify-between text-xs text-foreground/40">
                        <span className="mono text-[10px]">IA Especializada · @belentani_</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleSpeak(m.content)}
                            className="hover:text-primary transition-colors flex items-center gap-1"
                            title="Escuchar en voz alta"
                          >
                            {speaking ? <VolumeX className="w-3.5 h-3.5 text-primary" /> : <Volume2 className="w-3.5 h-3.5" />}
                          </button>
                          <button
                            onClick={() => handleCopy(m.content, i)}
                            className="hover:text-primary transition-colors flex items-center gap-1"
                            title="Copiar respuesta"
                          >
                            {copiedIdx === i ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  m.content
                )}
              </div>
            </div>
          ))}

          {loading && messages[messages.length - 1]?.role === "user" && (
            <div className="flex justify-start">
              <div className="glass border border-foreground/[0.08] rounded-2xl px-4 py-3 flex items-center gap-2 text-xs text-foreground/50">
                <Loader2 className="w-4 h-4 text-primary animate-spin" />
                <span>Sintonizando respuesta empática...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="border-t border-foreground/[0.06] p-3 bg-background/30">
          <div className="flex items-end gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              rows={1}
              placeholder={`Escribe a ${activeAgent.name.split("—")[0]}...`}
              className="flex-1 resize-none bg-transparent text-foreground text-sm placeholder:text-foreground/30 focus:outline-none px-3 py-2 max-h-32 scrollbar-hide"
            />
            <button
              onClick={() => handleSend()}
              disabled={loading || !input.trim()}
              className="shrink-0 w-10 h-10 rounded-full glass-laser laser-border flex items-center justify-center text-foreground hover:text-laser disabled:opacity-40 disabled:pointer-events-none transition-all"
              aria-label="Enviar mensaje"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentChat;