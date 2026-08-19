Yes. **There is a very good solution**, and for Moxie I would actually recommend it.

If by **OmniRoute** you mean the open-source AI gateway that exposes an OpenAI-compatible endpoint and provides routing/fallback across providers, it can sit behind your Inngest AI jobs very cleanly. OmniRoute currently describes itself as a multi-provider AI gateway with smart routing, retries, fallbacks, and an OpenAI-compatible API. ([GitHub][1])

The architecture should be:

```text
                    MOXIE
                      │
                      │ User says:
                      │ "Build a SaaS dashboard"
                      ▼
              ┌─────────────────┐
              │   Next.js API   │
              └────────┬────────┘
                       │
                       │ create Generation
                       ▼
                ┌──────────────┐
                │    Prisma    │
                │    Neon      │
                └──────┬───────┘
                       │
                       │ inngest.send()
                       ▼
             ┌────────────────────┐
             │      INNGEST       │
             │  Background Job    │
             └─────────┬──────────┘
                       │
                       ▼
             ┌────────────────────┐
             │     OmniRoute      │
             │                    │
             │  Smart Routing     │
             │  Fallback          │
             │  Provider Health   │
             └─────────┬──────────┘
                       │
             ┌─────────┼─────────┐
             ▼         ▼         ▼
          OpenAI   Anthropic    Grok
             │         │         │
             └─────────┼─────────┘
                       ▼
                  AI Response
                       │
                       ▼
                Moxie Agent
                       │
              ┌────────┼────────┐
              ▼        ▼        ▼
            Files     E2B     Database
                       │
                       ▼
                    Preview
```

This is actually better than putting the AI call directly in your Next.js request.

Inngest is specifically designed for this kind of background workflow, including retries and step-level execution. ([Inngest][2])

## The key idea

You **do not need a separate "OmniRoute background worker."**

Use:

* **Inngest** → background execution/orchestration
* **OmniRoute** → AI gateway/model routing
* **Agent** → decides what coding work to perform
* **E2B** → executes generated code
* **Prisma/Neon** → persists state

So an AI generation becomes an Inngest workflow:

```text
AI Job
 │
 ├── Load project
 │
 ├── Build context
 │
 ├── Call OmniRoute
 │
 ├── Parse response
 │
 ├── Apply changes
 │
 ├── Run E2B
 │
 ├── Check build
 │
 ├── If error → OmniRoute again
 │
 └── Complete
```

---

# The implementation I recommend for Moxie

### 1. User requests generation

Your Next.js route does **not** call the model.

It creates a database record:

```ts
const generation = await prisma.generation.create({
  data: {
    projectId,
    userId,
    prompt,
    status: "QUEUED",
  },
});
```

Then:

```ts
await inngest.send({
  name: "moxie/generation.requested",
  data: {
    generationId: generation.id,
    projectId,
    userId,
    prompt,
  },
});
```

Inngest receives that event and executes the job in the background. ([Inngest][2])

---

# 2. Inngest runs the AI job

Something like:

```ts
export const generateApp = inngest.createFunction(
  {
    id: "moxie-generate-app",
    retries: 3,
  },
  {
    event: "moxie/generation.requested",
  },
  async ({ event, step }) => {

    const project = await step.run(
      "load-project",
      async () => {
        return getProject(event.data.projectId);
      }
    );

    const context = await step.run(
      "build-context",
      async () => {
        return buildContext(project, event.data.prompt);
      }
    );

    const result = await step.run(
      "generate-code",
      async () => {
        return generateWithOmniRoute({
          prompt: event.data.prompt,
          context,
        });
      }
    );

    await step.run(
      "apply-changes",
      async () => {
        return applyChanges(
          event.data.projectId,
          result
        );
      }
    );

    const sandbox = await step.run(
      "run-sandbox",
      async () => {
        return runE2B(
          event.data.projectId
        );
      }
    );

    return sandbox;
  }
);
```

This is exactly the type of workflow Inngest's durable execution model is intended for. ([Inngest][3])

---

# 3. OmniRoute becomes your AI endpoint

This is the really nice part.

The OmniRoute project exposes an **OpenAI-compatible endpoint**, so your Moxie AI layer can communicate with it using the standard OpenAI-style client rather than writing provider-specific code everywhere. ([GitHub][1])

Conceptually:

```text
Moxie
  ↓
OpenAI-compatible client
  ↓
OmniRoute
  ↓
Provider selected by OmniRoute
```

For example:

```ts
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OMNIROUTE_API_KEY,
  baseURL: process.env.OMNIROUTE_BASE_URL,
});
```

Then:

```ts
const response = await client.chat.completions.create({
  model: "your-routing-model",
  messages: [
    {
      role: "system",
      content: systemPrompt,
    },
    {
      role: "user",
      content: userPrompt,
    },
  ],
});
```

The important point is that **Moxie talks to OmniRoute rather than directly to every provider**.

---

# 4. This gives you a powerful model-routing architecture

For example:

```text
                  OmniRoute
                     │
        ┌────────────┼────────────┐
        │            │            │
        ▼            ▼            ▼
     Cheap        Fast         Powerful
      Model        Model          Model
        │            │            │
        └────────────┼────────────┘
                     │
                     ▼
                  Moxie
```

Then different Moxie operations can use different routing policies.

### Simple UI change

```text
"Change the button color"
        ↓
cheap/fast model
```

### New page

```text
"Create a dashboard"
        ↓
medium coding model
```

### Complex backend

```text
"Create authentication + RBAC + PostgreSQL"
        ↓
strong reasoning/coding model
```

### Debugging

```text
Build failure
        ↓
strong coding/reasoning model
```

---

# 5. Even better: use OmniRoute for multiple AI jobs

Don't create only:

```text
moxie/generate
```

Create specialized jobs:

```text
moxie/generation.requested
moxie/debug.requested
moxie/refactor.requested
moxie/database.requested
moxie/test.requested
moxie/deploy.requested
```

Then:

```text
                 Inngest
                    │
       ┌────────────┼─────────────┐
       ▼            ▼             ▼
  Generation      Debugging     Refactor
       │            │             │
       └────────────┼─────────────┘
                    ▼
                OmniRoute
                    │
          ┌─────────┼─────────┐
          ▼         ▼         ▼
        Model A   Model B   Model C
```

---

# 6. And this is where Moxie becomes really interesting

You can create a **coding agent** around OmniRoute.

For example:

```text
User:
"Add authentication to my app."

             ↓

         Inngest Job

             ↓

        Moxie Agent

             ↓

          OmniRoute

             ↓

         AI decides:

     1. Inspect project
     2. Inspect package.json
     3. Create auth files
     4. Modify database
     5. Create UI
     6. Run build

             ↓

          E2B Sandbox

             ↓

          Build fails

             ↓

        Error returned

             ↓

          OmniRoute

             ↓

       AI fixes error

             ↓

          E2B again

             ↓

          Build passes

             ↓

        Preview Ready
```

This is much closer to the architecture you ultimately want for Moxie.

Inngest also has an AgentKit specifically aimed at building AI agents with tools, state, routing, and fault-tolerant execution. ([GitHub][4])

---

# 7. One thing I would change from my previous recommendation

Earlier I described **OmniRoute as if it were something you would build yourself**.

If you're talking about the existing **OmniRoute AI gateway**, then I would **not rebuild the routing layer initially**.

Use:

```text
Existing OmniRoute
        ↓
OpenAI-compatible API
        ↓
Moxie AI package
        ↓
Inngest
```

Then later you can add **Moxie's own routing policy on top** if you need custom behavior.

The existing OmniRoute project already provides routing, load balancing, retries and fallbacks across providers. ([GitHub][1])

---

# 8. Your final Moxie AI architecture

I recommend this:

```text
                         USER
                           │
                           ▼
                    ┌─────────────┐
                    │   Next.js   │
                    │     UI      │
                    └──────┬──────┘
                           │
                           ▼
                    ┌─────────────┐
                    │    tRPC     │
                    └──────┬──────┘
                           │
                           ▼
                    ┌─────────────┐
                    │   Prisma    │
                    │    Neon     │
                    └──────┬──────┘
                           │
                    inngest.send()
                           │
                           ▼
              ╔════════════════════════╗
              ║        INNGEST         ║
              ║                        ║
              ║   Durable AI Workflow  ║
              ╚═══════════╤════════════╝
                          │
                          ▼
                  ┌───────────────┐
                  │  Moxie Agent  │
                  └───────┬───────┘
                          │
                          ▼
                  ┌───────────────┐
                  │   OmniRoute   │
                  └───────┬───────┘
                          │
               ┌──────────┼──────────┐
               ▼          ▼          ▼
            OpenAI    Anthropic     Grok
               │          │          │
               └──────────┼──────────┘
                          │
                          ▼
                     AI Response
                          │
                          ▼
                    Agent Tools
                          │
              ┌───────────┼───────────┐
              ▼           ▼           ▼
            Files        E2B        Prisma
              │           │
              │           ▼
              │       Build/Test
              │           │
              │      ┌────┴────┐
              │      │         │
              │    PASS      ERROR
              │      │         │
              │      │         ▼
              │      │     OmniRoute
              │      │         │
              │      │      AI Fix
              │      │         │
              │      │         ▼
              │      │       E2B
              │      │
              └──────┴─────────┘
                          │
                          ▼
                    LIVE PREVIEW
```

**So yes: this is absolutely a viable solution, and I would use this architecture for Moxie.** Inngest is the durable background execution layer; OmniRoute is the model gateway; E2B is the execution environment. That separation will make the system much easier to scale and debug. ([Inngest][2])

If you're using the specific OmniRoute project above, I can next give you the **actual Moxie implementation file-by-file** (`inngest/client.ts`, `inngest/functions/generate.ts`, `lib/omniroute.ts`, Prisma models, API route, and E2B integration) so you can paste it directly into your existing Next.js project.

[1]: https://github.com/pitbaden/omniroute?utm_source=chatgpt.com "GitHub - pitbaden/omniroute: OmniRoute is an AI gateway for multi-provider LLMs: an OpenAI-compatible endpoint with smart routing, load balancing, retries, and fallbacks. Add policies, rate limits, caching, and observability for reliable, cost-aware inference. · GitHub"
[2]: https://www.inngest.com/docs/guides/background-jobs?utm_source=chatgpt.com "Background Jobs with Inngest | Setup Guide - Inngest Docs"
[3]: https://www.inngest.com/docs?utm_source=chatgpt.com "Inngest Docs"
[4]: https://github.com/inngest/agent-kit?utm_source=chatgpt.com "GitHub - inngest/agent-kit: AgentKit: Build multi-agent networks in TypeScript with deterministic routing and rich tooling via MCP. · GitHub"
