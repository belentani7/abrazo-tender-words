import { describe, expect, it, vi } from "vitest";
import { streamAgentResponse } from "@/lib/onlineAiEngine";

describe("streamAgentResponse", () => {
  it("keeps emotional messages on-device and returns crisis resources", async () => {
    vi.useFakeTimers();
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);

    const responsePromise = streamAgentResponse(
      "terapeuta",
      [{ role: "user", content: "Estoy pensando en hacerme daño y no quiero vivir." }],
      () => undefined,
    );

    await vi.runAllTimersAsync();
    const response = await responsePromise;

    expect(fetchSpy).not.toHaveBeenCalled();
    expect(response).toContain("024");
    expect(response).toContain("112");

    vi.unstubAllGlobals();
    vi.useRealTimers();
  });
});
