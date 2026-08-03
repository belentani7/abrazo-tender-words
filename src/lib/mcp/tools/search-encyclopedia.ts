import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { WIKI_DATA, DUDAS } from "../../../content/wiki-data";

export default defineTool({
  name: "search_encyclopedia",
  title: "Search encyclopedia",
  description:
    "Full-text search across the encyclopedia: disorder names, summaries, sections, criteria, relationship dynamics, and the FAQ. Returns the best-matching disorders and questions for a query.",
  inputSchema: {
    query: z.string().min(2).describe("Search terms, e.g. 'miedo al abandono', 'límites', 'gaslighting'."),
    limit: z.number().int().min(1).max(25).default(8).describe("Max results to return (default 8)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ query, limit }) => {
    const q = query.trim().toLowerCase();
    const terms = q.split(/\s+/).filter(Boolean);
    const score = (haystack: string) => {
      const h = haystack.toLowerCase();
      return terms.reduce((n, t) => (h.includes(t) ? n + 1 : n), 0);
    };

    const disorderHits = WIKI_DATA.map((d) => {
      const blob = [d.title, d.short, d.summary, ...d.tags, ...d.sections.map((s) => `${s.title} ${s.content}`), ...(d.criteria ?? []), ...d.dynamics.map((x) => `${x.context} ${x.desc}`)].join(" ");
      return { d, s: score(blob) };
    })
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s)
      .map((x) => ({ type: "disorder" as const, id: x.d.id, title: x.d.title, short: x.d.short, summary: x.d.summary }));

    const faqHits = DUDAS.flatMap((cat) =>
      cat.questions.map((item) => ({ cat, item, s: score(`${item.q} ${item.a}`) })),
    )
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s)
      .map((x) => ({ type: "faq" as const, category: x.cat.category, question: x.item.q, answer: x.item.a }));

    const results = [...disorderHits, ...faqHits].slice(0, limit);
    if (results.length === 0)
      return { content: [{ type: "text", text: `Sin resultados para "${query}".` }], structuredContent: { results: [] } };

    const text = results
      .map((r) =>
        r.type === "disorder"
          ? `📘 ${r.title} (${r.short}) — id: ${r.id}\n   ${r.summary}`
          : `❓ [${r.category}] ${r.question}\n   ${r.answer}`,
      )
      .join("\n\n");
    return { content: [{ type: "text", text }], structuredContent: { count: results.length, results } };
  },
});