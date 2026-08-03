import { defineTool } from "@lovable.dev/mcp-js";
import { WIKI_DATA, CLINICAL_LEVELS } from "../../../content/wiki-data";

export default defineTool({
  name: "list_disorders",
  title: "List disorders",
  description:
    "List every mental-health disorder covered by the encyclopedia, with its id, name, short name, clinical level and one-line summary. Use the id with get_disorder for full detail.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const items = WIKI_DATA.map((d) => ({
      id: d.id,
      title: d.title,
      short: d.short,
      clinicalLevel: d.clinicalLevel,
      level: CLINICAL_LEVELS[d.clinicalLevel],
      cluster: d.cluster,
      tags: d.tags,
      summary: d.summary,
      hasAbrazo: Boolean(d.hasAbrazo),
    }));
    const text = items
      .map((d) => `• ${d.title} (${d.short}) — id: ${d.id} — nivel: ${d.level}\n  ${d.summary}`)
      .join("\n");
    return {
      content: [{ type: "text", text }],
      structuredContent: { count: items.length, disorders: items },
    };
  },
});