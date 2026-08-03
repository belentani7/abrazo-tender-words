import React from "react";
import { Heart } from "lucide-react";

interface DiscreetCreditProps {
  className?: string;
  variant?: "footer" | "header" | "badge" | "card";
}

export const DiscreetCredit: React.FC<DiscreetCreditProps> = ({
  className = "",
  variant = "footer",
}) => {
  if (variant === "badge") {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass border border-primary/20 text-[11px] mono text-foreground/70 hover:text-primary transition-all duration-300 hover:scale-105 shadow-sm ${className}`}
        title="Creado con dedicación por @belentani_"
      >
        <Heart className="w-3 h-3 text-primary animate-pulse fill-primary/30" />
        <span>Creado por <strong className="text-primary font-normal">@belentani_</strong></span>
      </span>
    );
  }

  if (variant === "header") {
    return (
      <div className={`flex items-center gap-1.5 mono text-[11px] text-foreground/45 hover:text-foreground/80 transition-colors ${className}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
        <span>Creado por <strong className="text-foreground/90 font-medium">@belentani_</strong></span>
      </div>
    );
  }

  if (variant === "card") {
    return (
      <div className={`pt-3 border-t border-foreground/10 flex items-center justify-between text-[10px] mono text-foreground/40 ${className}`}>
        <span>ABRAZO — Palabras Tiernas</span>
        <span className="flex items-center gap-1">
          <Heart className="w-2.5 h-2.5 text-primary fill-primary/40" />
          @belentani_
        </span>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center justify-center space-y-1.5 py-4 ${className}`}>
      <div className="flex items-center gap-2 text-xs text-foreground/50 font-light">
        <span>Creado con cuidado y ternura por</span>
        <a
          href="https://github.com/belentani7"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-medium text-primary hover:underline hover:text-primary/90 transition-all group"
        >
          <Heart className="w-3.5 h-3.5 text-primary fill-primary/40 group-hover:scale-125 transition-transform" />
          <span className="mono text-xs tracking-wider">@belentani_</span>
        </a>
      </div>
      <p className="mono text-[10px] text-foreground/30 uppercase tracking-widest">
        Diseño Humano · Regulaciones Somáticas · IA Compasiva
      </p>
    </div>
  );
};

export default DiscreetCredit;
