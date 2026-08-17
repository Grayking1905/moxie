# OmniRoute Integration Strategy

## 1. Overview & Goal
This document outlines the proposed architectural approach for integrating **OmniRoute** into the Moxie platform. In alignment with the PRD, OmniRoute is the proprietary intelligent model-routing layer responsible for abstracting LLM providers, estimating complexity, enforcing billing/credits, and dynamically routing prompts to the most efficient model (OpenAI, Anthropic, Grok, etc.) based on cost, latency, context window, and quality needs.

The goal is to seamlessly integrate this subsystem into Moxie's existing Next.js, tRPC, and Inngest architecture **without** creating monolithic bottlenecks.

## 2. Why OmniRoute is Crucial for Moxie
Moxie's core value proposition relies heavily on balancing output quality with operational costs:
- **Cost Efficiency:** Simple tasks (like fixing a typo) don't need expensive models (e.g., Claude 3.5 Sonnet / GPT-4o). OmniRoute will direct these to faster, cheaper models (e.g., GPT-4o-mini, Haiku).
- **Resilience & Fallbacks:** If an AI provider experiences an outage, OmniRoute automatically falls back to an equivalent model from a different provider, ensuring Moxie stays online.
- **Dynamic Context Management:** Generative UI and coding tasks can quickly blow up token limits. OmniRoute ensures prompts are routed to models capable of handling the specific required context window.
- **Monetization & Credit Enforcement:** By centralizing AI requests through OmniRoute, we can reliably intercept requests to deduct user credits, enforce rate limits, and block requests if the user plan is insufficient.

## 3. Proposed Architecture & Integration Points

To keep the codebase maintainable, OmniRoute should be built as an isolated, independent module (or package, if migrating to a monorepo) rather than spreading API keys and AI logic across the Next.js app.

### 3.1. Package/Module Structure
Create a dedicated boundary for OmniRoute within the project:
`src/lib/omniroute/` (or `packages/omniroute/` in a monorepo setting).
Inside, we define:
- `providers/`: Adapters for OpenAI, Anthropic, xAI, etc. All implementing a standard `CompletionProvider` interface.
- `evaluator/`: The scoring engine mapping (Quality, Latency, Cost, Context, Health) to available models.
- `router.ts`: The main entry point `OmniRoute.generate(prompt, config)`.

### 3.2. Integration with tRPC (Synchronous AI Tasks)
For fast, conversational AI interactions (like intent detection or small chat responses):
- Implement OmniRoute as a **tRPC Middleware**.
- The middleware will extract the user's ID, verify their plan/credits via Prisma, execute the `OmniRoute.generate()` call, and stream the response back to the client.

### 3.3. Integration with Inngest (Asynchronous/Heavy AI Tasks)
For heavy application generation (Prompt → Plan → Code Generation):
- OmniRoute will be invoked within **Inngest Background Jobs**.
- Since code generation can take minutes and requires multiple LLM round-trips, Inngest steps (`step.run()`) will call OmniRoute.
- This ensures that if a model times out mid-generation, Inngest's automatic retry mechanism can kick in, and OmniRoute will dynamically select a fallback provider on the retry.

## 4. Implementation Strategy (Phased Approach)

### Phase 1: Core Routing Abstraction (The Foundation)
- Define the standard unified interface for AI requests (using the standard `ai` SDK from Vercel as a wrapper if preferred).
- Implement the "Static Router" where models are explicitly chosen based on the `mode` parameter (Auto, Economy, Fast, Quality, Expert) without dynamic scoring yet.
- Hardcode the fallback mechanism (e.g., if Anthropic fails, try OpenAI).

### Phase 2: Scoring Engine & Complexity Estimation
- Implement the `Routing Score` algorithm: `score = (w1*quality) + (w2*latency) + (w3*cost) + (w4*context)`.
- Create the `Complexity Estimator` layer which briefly parses the user's prompt to determine if it is a "simple edit" or a "complex scaffolding" task, feeding this classification into the scorer.

### Phase 3: Billing, Credits, & Database Integration
- Hook OmniRoute into Prisma.
- Before executing the route, calculate `estimatedCost` based on prompt length and the selected model's pricing.
- Check user `CreditTransaction` balance.
- Post-execution, record the exact `inputTokens` and `outputTokens` in the `Generation` table and deduct credits.

## 5. Required Database Additions
To fully support OmniRoute, the Prisma schema will need the following entities (as outlined in the PRD):
- **ModelProvider / Model:** To track available models, their context windows, and current health/latency metrics.
- **Generation:** To log every AI request, including which model was ultimately chosen, token counts, and cost. This acts as the audit log for OmniRoute's decision-making.

## 6. Conclusion
By wrapping OmniRoute in a clean interface and injecting it via tRPC middlewares and Inngest jobs, Moxie will achieve a decoupled, highly resilient AI execution layer. This approach ensures the business logic (billing, routing, fallbacks) is completely isolated from the front-end user experience and backend application generation workflows.
