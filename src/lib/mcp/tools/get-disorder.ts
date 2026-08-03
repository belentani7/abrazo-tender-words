import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { WIKI_DATA, CLINICAL_LEVELS, WIKI_DISCLAIMER } from "../../../content/wiki-data";

export default defineTool({
  name: "get_disorder",
  title: "Get disorder detail",
  description:
    "Get the full encyclopedia entry for one disorder by its id (from list_disorders): clinical definition, neurobiology, DSM-5 criteria, relationship dynamics across contexts, and self-care guidance.",
  inputSchema: {
    id: z.string().min(1).describe("Disorder id, e.g. 'tlp', 'tept-c', 'bipolar' (from list_disorders)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ id }) => {
    const d = WIKI_DATA.find((x) => x.id === id.trim().toLowerCase());
    if (!d) {
      const ids = WIKI_DATA.map((x) => x.id).join(", ");
      return {
        content: [{ type: "text", text: `No existe un trastorno con id "${id}". Ids disponibles: ${ids}` }],
        isError: true,
      };
    }
    const parts: string[] = [];
    parts.push(`# ${d.title} (${d.short})`);
    parts.push(`Nivel clínico: ${CLINICAL_LEVELS[d.clinicalLevel]}${d.cluster ? ` · ${d.cluster}` : ""}`);
    parts.push(`\n${d.summary}`);
    for (const s of d.sections) parts.push(`\n## ${s.title}\n${s.content}`);
    if (d.criteria?.length) parts.push(`\n## Criterios\n${d.criteria.map((c) => `- ${c}`).join("\n")}`);
    if (d.dynamics?.length)
      parts.push(`\n## Dinámica relacional\n${d.dynamics.map((x) => `- ${x.context}: ${x.desc}`).join("\n")}`);
    if (d.care?.length) parts.push(`\n## Autocuidado\n${d.care.map((c) => `- ${c}`).join("\n")}`);
    parts.push(`\n---\n${WIKI_DISCLAIMER}`);
    return {
      content: [{ type: "text", text: parts.join("\n") }],
      structuredContent: { disorder: d, disclaimer: WIKI_DISCLAIMER },
    };
  },
});