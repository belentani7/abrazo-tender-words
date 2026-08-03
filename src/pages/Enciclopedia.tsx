import { Suspense, lazy } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import { WIKI_DATA, DUDAS } from "@/content/wiki-data";

const Encyclopedia = lazy(() => import("@/components/Encyclopedia"));

const SITE = "https://tender-words-connect.lovable.app";

const Enciclopedia = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const entry = id ? WIKI_DATA.find((d) => d.id === id) : undefined;

  const url = entry ? `${SITE}/enciclopedia/${entry.id}` : `${SITE}/enciclopedia`;
  const title = entry
    ? `${entry.title} (${entry.short}) — síntomas, dinámicas y cómo acompañar`
    : "Enciclopedia de dinámicas y salud mental — ABRAZO";
  const description = entry
    ? entry.summary.slice(0, 155)
    : "Guía en español sobre trastornos mentales y cómo se viven en pareja, familia, amistad y trabajo. Herramientas prácticas, sin juicio y sin diagnóstico.";

  const jsonLd = entry
    ? {
        "@context": "https://schema.org",
        "@type": "MedicalWebPage",
        "@id": `${url}#webpage`,
        url,
        name: entry.title,
        inLanguage: "es",
        description: entry.summary,
        about: { "@type": "MedicalCondition", name: entry.title, alternateName: entry.short },
        keywords: entry.tags.join(", "),
        isPartOf: { "@id": `${SITE}/#website` },
      }
    : {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: DUDAS.flatMap((c) =>
          c.questions.map((q) => ({
            "@type": "Question",
            name: q.q,
            acceptedAnswer: { "@type": "Answer", text: q.a },
          })),
        ),
      };

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <Suspense fallback={<div className="min-h-screen bg-background" />}>
        <Encyclopedia
          initialId={entry ? entry.id : null}
          onSelect={(next) => navigate(next ? `/enciclopedia/${next}` : "/enciclopedia", { replace: false })}
          onExit={() => navigate("/")}
          onOpenAbrazo={() => navigate("/")}
        />
      </Suspense>
    </>
  );
};

export default Enciclopedia;