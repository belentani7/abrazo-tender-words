import { useLang, langLabels, Lang } from "@/hooks/useLang";

const langs: Lang[] = ["es", "en", "pt", "ca"];
const codeLabels: Record<Lang, string> = { es: "ES", en: "EN", pt: "PT", ca: "CA" };

const LanguageSwitcher = () => {
  const { lang, setLang } = useLang();

  return (
    <div className="flex gap-1 glass rounded-full p-1" role="group" aria-label="Language selector">
      {langs.map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          title={langLabels[l]}
          className={`mono px-2.5 py-1 rounded-full text-[10px] tracking-wider-2 transition-all duration-500 ${
            lang === l
              ? "bg-primary text-primary-foreground shadow-tender"
              : "text-foreground/50 hover:text-foreground/90"
          }`}
        >
          {codeLabels[l]}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
