// src/inngest/functions.ts
import { gemini, createAgent } from "@inngest/agent-kit";

import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world", triggers: [{ event: "test/hello.world" }] },
  async ({ event, step }) => {
    const summarizer = createAgent({
      name: "summarizer",
      system: "You are an expert summarizer. Summarize in 2 words.",
      model: gemini({
        model: "gemini-3.6-flash",
        apiKey: process.env.GOOGLE_API_KEY,
      }),
    });

    const { output } = await summarizer.run(
      `Summarize the following text: ${event.data.value}`
    );

    return { output };
  }
);