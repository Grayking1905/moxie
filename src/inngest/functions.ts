// src/inngest/functions.ts
import { gemini, createAgent } from "@inngest/agent-kit";

import { Sandbox } from "@e2b/code-interpreter";

import { inngest } from "./client";
import { getSandbox } from "./util";

export const helloWorld = inngest.createFunction(
  { id: "hello-world", triggers: [{ event: "test/hello.world" }] },
  async ({ event, step}) => {
    const sandboxId = await step.run("get-sandbox-id", async () => {
      const sandbox = await Sandbox.create("grays-project/moxie-nextjs-test2");
      return sandbox.sandboxId;
    });

    const codeAgent = createAgent({
      name: "code-agent",
      system: "You are an expert frontend developer. you code the next.js website as the user reqireed make it in compect website for web",
      model: gemini({
        model: "gemini-3.5-flash",
        apiKey: process.env.GOOGLE_API_KEY,
      }),
    });

    const { output } = await codeAgent.run(
      `code the website: ${event.data.value}`
    );

    const sandboxUrl = await step.run("get-sandbox-url", async() => {
      const sannbox = await getSandbox(sandboxId);
      const host = sannbox.getHost(3000);
      return `https://${host}`;
    })

    return { output , sandboxUrl };
  }
);