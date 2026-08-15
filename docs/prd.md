# Moxie — Product Requirements Document (PRD)

**Document version:** 1.0  
**Date:** 2026-08-14  
**Product:** Moxie  
**Category:** AI-powered full-stack application builder  
**Primary goal:** Build, edit, run, debug, review, and deploy complete web applications from natural-language instructions.

---

## 1. Executive Summary

Moxie is an AI-first full-stack application development platform inspired by the workflow of modern prompt-to-app builders such as Lovable and Bolt, but with an independent product identity, architecture, and implementation.

Moxie's primary differentiator is **OmniRoute**, an intelligent model-routing layer that selects and orchestrates AI models according to task complexity, quality requirements, latency, context size, provider health, and cost.

The product should allow a user to move from:

**Idea → Prompt → Plan → Generated code → Running application → Iteration → Debugging → Git → Review → Deployment**

without requiring the user to manually configure a conventional development environment.

Moxie is not intended to be a pixel-for-pixel clone of another product. It should provide a comparable high-level workflow while maintaining its own visual design system, codebase, branding, and product behavior.

---

# 2. Product Vision

> **Moxie turns natural-language ideas into production-ready full-stack applications.**

A user should be able to say:

> "Build a modern SaaS dashboard with authentication, organizations, PostgreSQL, subscriptions, analytics, dark mode, and an admin panel."

Moxie should:

1. Understand the request.
2. Create an implementation plan.
3. Select appropriate AI models through OmniRoute.
4. Generate the application.
5. Create or modify frontend and backend code.
6. Configure the database.
7. Run the application in an isolated sandbox.
8. Show a live preview.
9. Detect build/runtime/browser errors.
10. Repair problems automatically.
11. Allow conversational iteration.
12. Track changes and versions.
13. Create Git commits/branches/PRs.
14. Support AI-assisted code review.
15. Deploy the finished application.

---

# 3. Product Goals

## 3.1 Primary goals

- Generate complete full-stack web applications from prompts.
- Provide an excellent visual development experience.
- Support conversational code modification.
- Provide live project previews.
- Execute generated code safely in isolated sandboxes.
- Automatically diagnose and fix common application errors.
- Route AI workloads intelligently through OmniRoute.
- Reduce AI inference cost through model selection and context optimization.
- Provide authentication, billing, credits, usage tracking, and project management.
- Integrate GitHub into the development workflow.
- Support production deployment.
- Make the free tier useful while protecting infrastructure economics.

## 3.2 Secondary goals

- Screenshot-to-website generation.
- Design-system generation.
- Template marketplace.
- Figma-to-code.
- Multi-agent development.
- Advanced deployment management.
- Team collaboration.
- Enterprise controls.

---

# 4. Non-Goals for Initial MVP

The first release should NOT attempt to provide:

- A complete replacement for professional IDEs.
- Unlimited free compute.
- Unlimited AI generations.
- Arbitrary unrestricted server execution.
- Every programming language/framework.
- Full enterprise collaboration.
- A complete Figma replacement.
- A complete GitHub replacement.

The initial focus should be web applications using a controlled, reliable technology stack.

---

# 5. Target Users

## 5.1 Primary users

### Non-technical founders

People who have product ideas but limited programming ability.

### Designers

Users who want to turn designs and ideas into working applications.

### Developers

Developers who want to accelerate boilerplate, prototyping, debugging, and feature implementation.

### Students

Users learning application development through AI-assisted construction.

### Agencies

Teams that repeatedly create dashboards, SaaS applications, landing pages, internal tools, and prototypes.

---

# 6. Core User Journey

```text
Landing Page
    ↓
Sign Up / Sign In
    ↓
Dashboard
    ↓
Create Project
    ↓
Describe Application
    ↓
AI Planning
    ↓
AI Generation
    ↓
Sandbox Creation
    ↓
Application Build
    ↓
Live Preview
    ↓
Conversational Iteration
    ↓
Automatic Debugging
    ↓
Git Commit / Branch
    ↓
AI Code Review
    ↓
Deployment
    ↓
Production Application
```

---

# 7. Product Modules

Moxie consists of the following major systems:

1. Marketing Website
2. Authentication
3. User Account System
4. Organizations / Workspaces
5. Project Management
6. Project File System
7. Code Explorer
8. Code Editor
9. AI Chat
10. AI Orchestrator
11. OmniRoute
12. AI Agent Runtime
13. Tool System
14. Context Management
15. Inngest Job System
16. E2B Sandbox Runtime
17. Docker Sandbox Templates
18. Live Preview
19. Terminal
20. Logs
21. Error Detection
22. Automatic Debugging
23. Database Management
24. GitHub Integration
25. Git Workflow
26. CodeRabbit Integration
27. Billing
28. Credits
29. Usage Tracking
30. Deployment
31. Project Versions
32. Templates
33. Design System
34. Admin Dashboard
35. Observability
36. Security
37. Rate Limiting

---

# 8. Technology Stack

Versions below represent the target baseline for the project. Before production deployment, dependency versions should be pinned and verified against current compatibility/security advisories.

## 8.1 Frontend

| Technology | Target Version |
|---|---|
| Next.js | 15.x |
| React | 19.x |
| TypeScript | 5.x |
| Tailwind CSS | 4.x |
| shadcn/ui | Current compatible release |
| Radix UI | Current compatible release |
| Lucide React | Current compatible release |
| Monaco Editor | Current stable release |
| TanStack Query | Current compatible release |

## 8.2 Backend

| Technology | Target Version |
|---|---|
| Next.js Server Components / Route Handlers | 16.x |
| tRPC | 11.x |
| TypeScript | 5.x |
| Zod | 3.x/current compatible release |
| Prisma | 6.x/current compatible release |
| Node.js | 22 LTS |
| pnpm | 10.x |

## 8.3 Database

| Technology | Target |
|---|---|
| PostgreSQL | 16+ |
| Neon | Managed PostgreSQL |
| Prisma | ORM |
| Redis | Current stable release / managed Redis |

## 8.4 Authentication and Billing

| Technology | Purpose |
|---|---|
| Clerk | Authentication |
| Clerk Billing | Subscription management |
| Custom Moxie Credits | AI/compute usage accounting |

## 8.5 AI

| Technology | Purpose |
|---|---|
| OmniRoute | AI routing and provider abstraction |
| OpenAI | AI provider |
| Anthropic | AI provider |
| Grok/xAI | AI provider |
| Additional providers | Future expansion |

Moxie must NOT hard-code application logic directly against one model provider.

All AI requests should preferably flow through an internal model abstraction.

## 8.6 Background Jobs

| Technology | Purpose |
|---|---|
| Inngest | Durable background workflows |
| Inngest Agent Toolkit | Agent/job orchestration |
| Redis | Cache, rate limiting, transient state |

## 8.7 Sandbox

| Technology | Purpose |
|---|---|
| E2B | Cloud execution environment |
| Docker | Sandbox templates and containerization |
| Node.js | Primary application runtime |

## 8.8 Git

| Technology | Purpose |
|---|---|
| GitHub | Repository hosting |
| GitHub API | Repository/PR operations |
| CodeRabbit | AI-assisted PR review |

## 8.9 Deployment

Initial deployment architecture may use:

- Vercel or equivalent for Moxie's control-plane application.
- E2B for temporary project execution.
- Container infrastructure for production workloads.
- Managed PostgreSQL.
- Object storage for artifacts.

Production deployment providers should remain abstracted so additional providers can be added later.

---

# 9. High-Level Architecture

```text
                         ┌───────────────────────┐
                         │         USER          │
                         └───────────┬───────────┘
                                     │
                                     ▼
                         ┌───────────────────────┐
                         │      Moxie Web App    │
                         │   Next.js + React      │
                         └───────────┬───────────┘
                                     │
                    ┌────────────────┼────────────────┐
                    │                │                │
                    ▼                ▼                ▼
                 tRPC API          Clerk          Project UI
                    │                                 │
                    └───────────────┬─────────────────┘
                                    │
                                    ▼
                         ┌───────────────────────┐
                         │   AI Orchestrator     │
                         └───────────┬───────────┘
                                     │
                                     ▼
                         ┌───────────────────────┐
                         │       OmniRoute       │
                         └───────────┬───────────┘
                                     │
                 ┌───────────────────┼───────────────────┐
                 ▼                   ▼                   ▼
              OpenAI             Anthropic              Grok
                 │                   │                   │
                 └───────────────────┼───────────────────┘
                                     │
                                     ▼
                         ┌───────────────────────┐
                         │     Agent Runtime     │
                         │                       │
                         │ Tools / Context /     │
                         │ Planning / Validation │
                         └───────────┬───────────┘
                                     │
                                     ▼
                         ┌───────────────────────┐
                         │       Inngest         │
                         │ Background Workflows  │
                         └───────────┬───────────┘
                                     │
                                     ▼
                         ┌───────────────────────┐
                         │       E2B Sandbox     │
                         │        Docker         │
                         └───────────┬───────────┘
                                     │
                      ┌──────────────┼──────────────┐
                      ▼              ▼              ▼
                   Preview        Terminal        Logs
                      │
                      ▼
                  User Browser

Supporting infrastructure:

Clerk ─────── Authentication / Billing
Neon ──────── PostgreSQL
Prisma ────── ORM
Redis ─────── Cache / Rate Limits
GitHub ────── Git Workflow
CodeRabbit ── AI PR Review
Object Store ─ Artifacts
```

---

# 10. Control Plane vs Execution Plane

Moxie should explicitly separate its control plane from generated-code execution.

## 10.1 Control plane

Responsible for:

- Users
- Authentication
- Billing
- Projects
- Project metadata
- AI requests
- Credits
- Usage
- Git metadata
- Sandbox lifecycle
- Deployment metadata
- Job scheduling
- Security policies

Technologies:

- Next.js
- tRPC
- Prisma
- Neon
- Clerk
- Inngest
- Redis

## 10.2 Execution plane

Responsible for:

- Generated source code
- npm installation
- Development server
- Builds
- Tests
- Runtime
- Browser execution
- Logs

Technologies:

- E2B
- Docker
- Node.js
- Project-specific runtime

This separation is essential because generated code is untrusted.

---

# 11. Monorepo Architecture

Recommended structure:

```text
moxie/
│
├── apps/
│   ├── web/
│   │   ├── app/
│   │   ├── components/
│   │   ├── features/
│   │   ├── server/
│   │   └── styles/
│   │
│   ├── worker/
│   │   ├── agents/
│   │   ├── jobs/
│   │   └── tools/
│   │
│   └── sandbox-manager/
│
├── packages/
│   ├── ui/
│   ├── database/
│   ├── trpc/
│   ├── ai/
│   ├── omniroute/
│   ├── agent/
│   ├── sandbox/
│   ├── github/
│   ├── billing/
│   ├── credits/
│   ├── config/
│   ├── types/
│   └── utils/
│
├── prisma/
│   ├── schema.prisma
│   └── migrations/
│
├── docker/
│   ├── base/
│   └── templates/
│
├── scripts/
│
├── docs/
│
├── turbo.json
├── pnpm-workspace.yaml
├── package.json
└── README.md
```

Recommended monorepo tooling:

- pnpm workspaces
- Turborepo
- TypeScript project references where useful

---

# 12. Database Architecture

Core entities:

```text
User
Organization
OrganizationMember
Project
ProjectFile
ProjectVersion
Generation
GenerationMessage
AgentRun
AgentToolCall
Sandbox
SandboxSession
UsageEvent
CreditTransaction
Subscription
GitRepository
GitBranch
GitCommit
PullRequest
Deployment
DeploymentLog
Template
ApiKey
ModelProvider
Model
RoutingPolicy
```

## 12.1 Project

A project represents an application.

Fields:

- id
- organizationId
- name
- slug
- description
- framework
- templateId
- currentVersionId
- sandboxId
- repositoryId
- createdAt
- updatedAt

## 12.2 ProjectFile

Fields:

- id
- projectId
- path
- content
- hash
- mimeType
- size
- createdAt
- updatedAt

For large projects, the database should not necessarily become the only source of truth for file contents. A Git repository/object store can become the canonical artifact store while the database stores metadata and indexing information.

## 12.3 Generation

Fields:

- id
- projectId
- userId
- prompt
- status
- model
- provider
- inputTokens
- outputTokens
- estimatedCost
- creditsUsed
- startedAt
- completedAt
- error

---

# 13. AI Architecture

Moxie should use a layered AI architecture.

```text
User Prompt
    ↓
Intent Detection
    ↓
Project Context Retrieval
    ↓
Planning
    ↓
Task Decomposition
    ↓
OmniRoute
    ↓
Model
    ↓
Structured AI Response
    ↓
Agent Tool Calls
    ↓
Code Changes
    ↓
Validation
    ↓
Sandbox
    ↓
Feedback
    ↓
AI Repair
```

---

# 14. OmniRoute Architecture

OmniRoute is the key proprietary subsystem.

## Responsibilities

- Provider abstraction
- Model registry
- Routing rules
- Model selection
- Cost estimation
- Token estimation
- Context management
- Fallback
- Retry
- Timeout
- Provider health
- Usage tracking
- Credit conversion
- Budget enforcement
- User-plan restrictions

## Request flow

```text
AI Request
   ↓
Normalize Request
   ↓
Identify Task Type
   ↓
Estimate Complexity
   ↓
Check User Plan
   ↓
Check Available Credits
   ↓
Retrieve Model Candidates
   ↓
Score Models
   ↓
Select Model
   ↓
Execute Request
   ↓
Validate Response
   ↓
Fallback if required
   ↓
Record Usage
   ↓
Return Result
```

## Routing score

A conceptual model:

```text
score =
    qualityWeight * quality
  + latencyWeight * latencyScore
  + costWeight * costEfficiency
  + contextWeight * contextFit
  + reliabilityWeight * providerHealth
```

The exact scoring implementation should remain configurable.

## Routing modes

### Auto

Moxie chooses the best model.

### Economy

Prioritizes cost.

### Fast

Prioritizes latency.

### Quality

Prioritizes output quality.

### Expert

Uses stronger models for difficult tasks.

---

# 15. AI Agent Architecture

The initial agent should be a controlled tool-using agent.

## Core tools

```text
read_file
read_files
search_files
write_file
edit_file
delete_file

list_directory
inspect_project

run_command
install_package

run_build
run_tests

get_terminal_logs
get_server_logs
get_browser_errors

create_database_schema
run_database_migration

create_git_branch
git_commit
git_diff
```

Future tools:

```text
deploy
create_pull_request
search_web
inspect_screenshot
generate_image
modify_image
```

---

# 16. Agent Execution Loop

```text
User Request
     ↓
Create Task
     ↓
Plan
     ↓
Retrieve Context
     ↓
Select Model via OmniRoute
     ↓
Generate Tool Call
     ↓
Execute Tool
     ↓
Observe Result
     ↓
Update Context
     ↓
Continue?
   /     \
 Yes      No
 │         │
 └───────→ Validation
             ↓
           Build
             ↓
        Runtime Test
             ↓
          Success?
          /     \
        No       Yes
        │         │
     Repair       Done
```

Maximum iterations must be configurable to prevent infinite loops.

---

# 17. Context Management

The agent must not send the entire project to the model for every request.

Use:

- File search
- Symbol search
- Dependency graph
- Relevant-file retrieval
- Git diff
- Recent changes
- Error logs
- Project manifest
- Design-system context
- Database schema context

Example:

```text
User:
"Make the pricing cards look better."

Context:
├── Pricing.tsx
├── PricingCard.tsx
├── Button.tsx
├── globals.css
└── design-system.json
```

Only relevant context should be sent to the model.

---

# 18. Code Generation Strategy

Generated applications should use a controlled default stack.

Initial supported stack:

```text
Next.js 15
React 19
TypeScript 5.x
Tailwind CSS 4
shadcn/ui
Prisma
PostgreSQL
```

The generator should have strong templates rather than creating every project from an empty directory.

---

# 19. Project Templates

Initial templates:

1. SaaS Starter
2. Landing Page
3. Dashboard
4. Admin Panel
5. E-commerce
6. Blog
7. Portfolio
8. AI Application
9. CRM
10. Internal Tool

Each template should include:

- File structure
- Design system
- Authentication hooks where appropriate
- Database configuration where appropriate
- Reusable components
- Accessibility baseline
- Responsive layout
- AI generation instructions

---

# 20. Design System

Moxie should have a consistent design language.

Core tokens:

```text
Colors
Typography
Spacing
Radius
Shadows
Motion
Breakpoints
Z-index
Component variants
```

Generated projects should inherit a design system.

The AI should not randomly invent styles for each component.

---

# 21. UI / UX Requirements

Main project workspace:

```text
┌───────────────────────────────────────────────────────────────┐
│ Moxie │ Project Name                         Save Deploy      │
├───────────────┬──────────────────────────────┬───────────────┤
│ FILE EXPLORER │ CODE EDITOR                 │ LIVE PREVIEW  │
│               │                              │               │
│ app/          │ Monaco Editor                │               │
│ components/   │                              │   Browser     │
│ lib/          │                              │   Preview     │
│ public/       │                              │               │
│               │                              │               │
├───────────────┴──────────────────────────────┴───────────────┤
│ AI CHAT                                                        │
│                                                               │
│ Ask Moxie to modify your application...                      │
│                                                               │
└───────────────────────────────────────────────────────────────┘
```

Workspace tabs:

- Preview
- Code
- Terminal
- Logs
- Database
- Git
- Changes

---

# 22. Live Preview

The preview system should:

1. Start sandbox.
2. Install dependencies.
3. Start development server.
4. Detect exposed port.
5. Generate secure preview URL.
6. Stream status to UI.
7. Show runtime errors.
8. Restart when necessary.

Preview states:

```text
Creating
Installing
Starting
Ready
Building
Error
Stopped
Expired
```

---

# 23. Sandbox Security

Generated code must be treated as untrusted.

Controls:

- CPU limits
- Memory limits
- Disk limits
- Execution timeout
- Process limits
- Network policies
- Secret isolation
- Ephemeral environments
- Automatic cleanup
- No access to control-plane credentials
- Separate sandbox identity

Never expose:

```text
DATABASE_URL
CLERK_SECRET_KEY
OMNIROUTE_MASTER_KEY
GITHUB_APP_PRIVATE_KEY
```

to arbitrary generated code unless explicitly scoped through secure project-specific secrets.

---

# 24. Inngest Job Architecture

Background jobs should handle long-running operations.

Jobs:

```text
project.created
generation.requested
generation.started
generation.completed
generation.failed

sandbox.created
sandbox.started
sandbox.stopped
sandbox.expired

build.started
build.completed
build.failed

agent.started
agent.tool.executed
agent.completed
agent.failed

deployment.started
deployment.completed
deployment.failed

github.pr.created
github.review.requested
```

Long-running agent tasks should never depend on a single synchronous HTTP request.

---

# 25. Credits System

Moxie should use internal credits.

Credit usage should consider:

- Model input tokens
- Model output tokens
- Model class
- Sandbox execution time
- Build time
- Storage
- Deployment resources

Example plans:

### Free

- Limited projects
- Limited AI credits
- Public projects
- Limited sandbox runtime
- Basic model routing

### Pro

- More credits
- Private projects
- Better models
- More sandbox time
- GitHub integration
- Deployment

### Business

- Large usage allowance
- Team features
- Advanced controls
- Higher limits
- Priority infrastructure

Exact pricing should be decided after cost modeling.

---

# 26. Usage Tracking

Every billable event should generate a usage event.

Example:

```text
UsageEvent
├── userId
├── organizationId
├── projectId
├── type
├── provider
├── model
├── inputTokens
├── outputTokens
├── duration
├── estimatedCost
├── credits
└── timestamp
```

This provides:

- User billing
- Analytics
- Abuse detection
- Cost optimization
- OmniRoute optimization
- Admin reporting

---

# 27. Authentication

Clerk should provide:

- Email/password
- OAuth
- Sessions
- User profile
- Organizations
- Organization members
- Protected routes

Moxie should never implement password authentication manually unless there is a specific future requirement.

---

# 28. Billing

Clerk Billing should manage:

- Subscription state
- Plan state
- Upgrade
- Downgrade
- Cancellation
- Billing portal

Moxie manages:

- Credits
- AI usage
- Sandbox usage
- Usage limits

---

# 29. GitHub Integration

Users should be able to:

1. Connect GitHub.
2. Create repository.
3. Import repository.
4. Push project.
5. Create branch.
6. Commit AI changes.
7. View diff.
8. Create PR.
9. Review PR.
10. Merge.
11. Roll back.

---

# 30. CodeRabbit Integration

CodeRabbit can be used for AI-assisted pull-request review.

Workflow:

```text
Moxie Agent
     ↓
Modify Project
     ↓
Commit
     ↓
Create PR
     ↓
CodeRabbit Review
     ↓
Review Comments
     ↓
Moxie Agent
     ↓
Apply Fixes
```

---

# 31. Deployment

Moxie should support:

```text
Development
     ↓
Preview
     ↓
Production
```

Deployment metadata:

```text
Deployment
├── projectId
├── environment
├── provider
├── commitSha
├── url
├── status
├── logs
├── startedAt
└── completedAt
```

Future deployment providers should be supported through an abstraction layer.

---

# 32. Error Handling

Errors should be classified:

```text
AI_ERROR
AUTH_ERROR
DATABASE_ERROR
BUILD_ERROR
TYPE_ERROR
DEPENDENCY_ERROR
RUNTIME_ERROR
BROWSER_ERROR
SANDBOX_ERROR
DEPLOYMENT_ERROR
GITHUB_ERROR
BILLING_ERROR
```

The UI should provide useful human-readable errors while retaining detailed internal diagnostics.

---

# 33. Automatic Debugging

Moxie should automatically collect:

```text
Build logs
TypeScript errors
Runtime logs
Browser console
Network failures
Dependency errors
```

Then:

```text
Error
 ↓
Relevant files
 ↓
OmniRoute
 ↓
Agent
 ↓
Patch
 ↓
Build
 ↓
Test
```

The agent must have a maximum repair-loop limit.

---

# 34. Versioning

Every meaningful AI change should create a recoverable version.

Users should be able to:

- Undo
- Redo
- Compare
- Restore
- View change summary

Git should eventually become the authoritative long-term history for connected repositories.

---

# 35. Security Requirements

Moxie must protect:

- User data
- Source code
- API keys
- Provider keys
- Billing information
- GitHub credentials
- Database credentials
- Sandbox infrastructure

Security requirements:

- Server-side secrets only
- Encrypted secret storage
- Least-privilege credentials
- Project-level isolation
- Organization-level authorization
- Rate limiting
- Abuse prevention
- Audit logging
- Sandbox isolation
- Input validation
- Output validation
- Dependency safety checks

---

# 36. Observability

Recommended tooling:

- Structured logging
- Error monitoring
- Metrics
- Tracing
- AI request telemetry
- Sandbox telemetry
- Job telemetry

Monitor:

```text
AI latency
AI failure rate
Model cost
Credits consumed
Sandbox startup time
Build success rate
Agent success rate
Auto-fix success rate
Deployment success rate
```

---

# 37. Admin Dashboard

Admin functionality:

- Users
- Organizations
- Projects
- AI usage
- Provider usage
- Model costs
- Credits
- Sandboxes
- Failed jobs
- Error rates
- Deployments
- Abuse signals
- Provider health

OmniRoute admin controls:

```text
Provider
Model
Price
Priority
Enabled
Health
Max context
Capabilities
Routing weight
```

---

# 38. API Architecture

Public API should eventually support:

```text
POST /projects
GET /projects
GET /projects/:id
DELETE /projects/:id

POST /projects/:id/generate
POST /projects/:id/agent

GET /projects/:id/files
PUT /projects/:id/files

POST /projects/:id/sandbox
GET /projects/:id/preview

GET /projects/:id/usage
GET /projects/:id/versions

POST /github/connect
POST /github/repositories
POST /github/pr

POST /deployments
GET /deployments/:id
```

Internally, tRPC should be used where appropriate for type-safe application communication.

---

# 39. API Key Architecture

Future users may need Moxie API keys.

Keys should support:

- Creation
- Revocation
- Rotation
- Scopes
- Usage limits
- Organization ownership

Never store raw API keys in plaintext.

---

# 40. Rate Limiting

Rate limits should exist at:

- IP
- User
- Organization
- Project
- API key
- AI provider
- Sandbox

Example:

```text
User
 ↓
Rate Limit
 ↓
Credit Check
 ↓
Plan Check
 ↓
Request
```

---

# 41. Free Tier Economics

The free tier must be designed around real infrastructure costs.

Controls:

- AI credits
- Daily request limits
- Sandbox minutes
- Project count
- Storage
- Deployment limits
- Concurrent jobs

OmniRoute should automatically favor lower-cost models for simple tasks.

---

# 42. Performance Requirements

Target goals:

### Dashboard

- Fast initial page load.
- Streaming where appropriate.
- Optimistic UI for common actions.

### AI

- Stream model responses.
- Show progress.
- Show current agent action.
- Avoid blocking requests.

### Sandbox

- Minimize startup time.
- Reuse templates.
- Cache dependencies where safe.

### Editor

- Monaco should remain responsive for large projects.
- Files should load incrementally.

---

# 43. AI UX

The user should always understand what Moxie is doing.

Example:

```text
✨ Planning application
✓ Understanding requirements

🧠 Generating application
✓ Created dashboard
✓ Created authentication
✓ Created database schema

🧪 Testing application
✓ Build successful

🚀 Preview ready
```

For tool calls:

```text
Moxie is reading:
components/dashboard.tsx

Moxie is modifying:
app/dashboard/page.tsx

Moxie is running:
npm run build
```

---

# 44. AI Approval Modes

Support:

### Auto

Agent can perform normal changes automatically.

### Ask

Agent asks before sensitive operations.

### Safe

Agent requires approval for:

- Database destructive changes
- Deployment
- Secret changes
- Git merge
- Package installation with risk
- External API configuration

---

# 45. Project Permissions

Organizations should eventually support:

```text
Owner
Admin
Developer
Editor
Viewer
```

Project permissions should be checked server-side.

---

# 46. Database Generation

When the user asks for a feature requiring persistent data:

```text
User request
 ↓
Database analysis
 ↓
Schema generation
 ↓
Migration
 ↓
Validation
 ↓
API generation
 ↓
UI generation
```

The agent should explain potentially destructive migrations.

---

# 47. Design-to-Code

Future feature:

```text
Image/Screenshot
 ↓
Vision analysis
 ↓
Layout extraction
 ↓
Component mapping
 ↓
Design tokens
 ↓
React implementation
 ↓
Preview
```

The generated UI should be responsive and accessible.

---

# 48. Accessibility

Generated applications should target:

- Semantic HTML
- Keyboard navigation
- Focus states
- Accessible labels
- Appropriate contrast
- ARIA only where needed
- Responsive behavior

Moxie should include automated accessibility checks in future QA workflows.

---

# 49. Testing Strategy

Moxie itself:

- Unit tests
- Integration tests
- API tests
- E2E tests
- Sandbox tests
- Agent evaluation tests
- OmniRoute routing tests

Generated applications:

- TypeScript validation
- Build validation
- Unit tests where requested
- Runtime checks
- Browser checks
- Optional accessibility tests

---

# 50. AI Evaluation

Moxie needs a benchmark suite.

Test prompts should evaluate:

- UI quality
- Functional correctness
- Code quality
- Database correctness
- API correctness
- Responsiveness
- Accessibility
- Error recovery
- Agent efficiency
- Cost

Track:

```text
Generation success rate
Build success rate
First-pass success
Auto-fix success
Average credits
Average latency
Human correction rate
```

---

# 51. Development Phases

## Phase 0 — Foundation

Build:

- Repository
- Monorepo
- Next.js
- TypeScript
- Tailwind
- shadcn/ui
- tRPC
- Prisma
- Neon
- CI/CD
- Environment configuration

**Deliverable:** Working application shell.

---

## Phase 1 — SaaS Dashboard

Build:

- Landing page
- Dashboard
- Project cards
- Settings
- Workspace
- Project creation
- Responsive UI
- Dark mode

**Deliverable:** Polished SaaS shell.

---

## Phase 2 — Authentication and Billing

Build:

- Clerk
- Login
- Signup
- Organizations
- Clerk Billing
- Plans
- Credit system
- Usage tracking

**Deliverable:** Real SaaS account system.

---

## Phase 3 — Project/File System

Build:

- Projects
- Files
- Versions
- File explorer
- Editor
- Project persistence
- Search

**Deliverable:** Working coding workspace.

---

## Phase 4 — AI Generation

Build:

- AI chat
- Prompt processing
- Basic generation
- File creation
- File modification
- Streaming responses

**Deliverable:** Prompt-to-code MVP.

---

## Phase 5 — Sandbox

Build:

- E2B
- Docker templates
- Sandbox lifecycle
- npm install
- Dev server
- Preview
- Terminal
- Logs

**Deliverable:** Working prompt-to-running-app product.

**MVP launch target.**

---

## Phase 6 — OmniRoute

Build:

- Provider abstraction
- Model registry
- Routing engine
- Cost tracking
- Provider fallback
- Health checks
- Routing policies
- Credit integration

**Deliverable:** Intelligent AI routing platform.

---

## Phase 7 — AI Agent

Build:

- Tool system
- Planning
- Context retrieval
- File operations
- Command execution
- Build/test tools
- Database tools

**Deliverable:** Autonomous coding agent.

---

## Phase 8 — Auto Debugging

Build:

- Error collection
- Error classification
- Browser logs
- Build errors
- Runtime errors
- Repair loop
- Validation

**Deliverable:** Self-repairing generated applications.

---

## Phase 9 — GitHub

Build:

- GitHub OAuth/App
- Repository creation
- Import
- Branches
- Commits
- Diffs
- PRs
- CodeRabbit integration

**Deliverable:** AI-assisted Git workflow.

---

## Phase 10 — Deployment

Build:

- Deployment abstraction
- Environment variables
- Production builds
- Deployment logs
- Custom domains
- Rollbacks

**Deliverable:** Prompt-to-production workflow.

---

## Phase 11 — Advanced AI

Build:

- Screenshot-to-code
- Figma-to-code
- Multi-agent architecture
- Design system generation
- AI image generation
- Template marketplace
- Collaboration
- Advanced deployment
- Enterprise features

---

# 52. MVP Definition

The MVP is complete when a new user can:

1. Create an account.
2. Create a project.
3. Enter a natural-language prompt.
4. Moxie generates a web application.
5. Generated code is stored.
6. Code runs inside an isolated E2B sandbox.
7. User receives a live preview.
8. User can ask Moxie to modify the application.
9. Moxie can rebuild the application.
10. User can inspect code.
11. User can inspect terminal/log output.
12. Usage is measured.
13. Credits are deducted.

---

# 53. V1 Definition

V1 adds:

- OmniRoute
- Autonomous agent
- Automatic debugging
- GitHub
- AI PR review
- Production deployment
- Better templates
- Better design generation
- Usage dashboard

---

# 54. V2 Definition

V2 adds:

- Multi-agent development
- Screenshot-to-code
- Figma-to-code
- Team collaboration
- Marketplace
- Enterprise
- Multiple deployment providers
- More frameworks
- Advanced model routing
- Custom AI providers

---

# 55. Success Metrics

Primary metrics:

### Activation

Percentage of users who create their first project.

### Generation success

Percentage of prompts producing a working application.

### First-build success

Percentage of generated projects that build successfully without manual fixes.

### AI repair success

Percentage of detected errors automatically fixed.

### Retention

7-day and 30-day active project retention.

### Cost efficiency

Average AI + sandbox infrastructure cost per successful generation.

### Conversion

Free → paid conversion.

### Deployment

Percentage of active projects deployed.

---

# 56. Key Product Metrics

Dashboard:

```text
Projects Created
AI Generations
Successful Builds
Agent Success Rate
Auto-Fix Rate
Sandbox Minutes
AI Credits Used
Average Generation Cost
Average Generation Time
Deployments
GitHub PRs
```

---

# 57. Reliability Targets

Initial targets:

- API availability: 99.9% target.
- AI routing fallback on provider failure.
- Durable background jobs.
- No single synchronous request should own a long-running agent task.
- Sandbox failures should be recoverable.
- User project versions should be recoverable.
- Billing events must be idempotent.
- AI usage events must be idempotent.

---

# 58. Idempotency

Critical operations should be idempotent:

- Generation jobs
- Credit deductions
- Billing webhooks
- Sandbox creation
- Deployment
- Git operations where possible

Every asynchronous workflow should have an operation ID.

---

# 59. Caching

Use caching for:

- Project metadata
- File indexes
- Model metadata
- Provider health
- Dependency templates
- Sandbox templates
- Frequently accessed project context

Do not cache secrets.

---

# 60. Queue Strategy

Long-running operations:

```text
AI Generation
Agent execution
Build
Testing
Sandbox creation
Deployment
GitHub synchronization
PR review
```

should run through durable background workflows.

---

# 61. Logging

Every AI operation should have a trace:

```text
requestId
userId
organizationId
projectId
agentRunId
jobId
provider
model
tool
duration
status
error
```

This is essential for debugging and billing.

---

# 62. Secrets Management

Moxie must support project-level secrets:

```text
OPENAI_API_KEY
STRIPE_SECRET_KEY
DATABASE_URL
CUSTOM_API_KEY
```

But secrets must:

- Never be included in model prompts.
- Never be logged.
- Never be committed to Git.
- Never be exposed to unrelated projects.
- Be encrypted at rest.

---

# 63. Dependency Management

Generated projects should have controlled dependency installation.

Agent should:

1. Inspect package.json.
2. Determine whether dependency exists.
3. Install only when necessary.
4. Prefer stable compatible versions.
5. Run build after installation.

Future feature:

```text
Dependency Risk Scanner
```

---

# 64. Model Provider Failure Handling

If the selected model fails:

```text
Primary Model
     ↓
Failure
     ↓
Retry
     ↓
Fallback Model
     ↓
Retry
     ↓
Secondary Provider
```

OmniRoute should record provider failures and temporarily reduce routing priority for unhealthy models.

---

# 65. Cost Optimization

OmniRoute should optimize:

- Model selection
- Prompt size
- Context retrieval
- Output size
- Repeated context
- Caching
- Agent iterations
- Sandbox lifetime

The goal is:

> **Minimum cost that still produces an acceptable result.**

---

# 66. Project Lifecycle

```text
CREATED
   ↓
GENERATING
   ↓
RUNNING
   ↓
EDITING
   ↓
TESTING
   ↓
READY
   ↓
DEPLOYED
   ↓
ARCHIVED
```

---

# 67. Sandbox Lifecycle

```text
REQUESTED
   ↓
CREATING
   ↓
INITIALIZING
   ↓
INSTALLING
   ↓
STARTING
   ↓
READY
   ↓
ACTIVE
   ↓
IDLE
   ↓
STOPPED
   ↓
EXPIRED
```

---

# 68. Agent Safety

The agent should require approval for dangerous operations.

Examples:

```text
DROP DATABASE
DELETE ALL DATA
DELETE PROJECT
DEPLOY PRODUCTION
EXPOSE SECRET
PUSH FORCE
MERGE PR
```

The agent should never be allowed to bypass Moxie's permission system.

---

# 69. UX Principle

The interface should feel:

- Fast
- Premium
- Minimal
- Modern
- Developer-friendly
- Non-technical-user-friendly
- Responsive
- Transparent

Avoid excessive configuration.

The ideal user experience is:

> **Describe → Watch → Refine → Ship**

---

# 70. Branding

Product name:

**Moxie**

Suggested positioning:

> **Build anything with AI.**

Alternative positioning:

> **Your AI-powered full-stack development environment.**

Brand personality:

- Confident
- Fast
- Creative
- Technical
- Friendly
- Premium

Moxie should have an independent visual identity and should not reproduce another company's branding.

---

# 71. Recommended Initial Repository Setup

```text
Moxie
│
├── apps
│   ├── web
│   ├── worker
│   └── sandbox-manager
│
├── packages
│   ├── ai
│   ├── omniroute
│   ├── agent
│   ├── sandbox
│   ├── database
│   ├── trpc
│   ├── ui
│   ├── credits
│   ├── billing
│   ├── github
│   └── config
│
├── prisma
├── docker
├── docs
├── scripts
│
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
└── README.md
```

---

# 72. Initial Environment Variables

Examples only; production secrets must be stored in a secure secret manager.

```text
DATABASE_URL=
DIRECT_DATABASE_URL=

CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=

INNGEST_EVENT_KEY=
INNGEST_SIGNING_KEY=

E2B_API_KEY=

OMNIROUTE_API_KEY=

OPENAI_API_KEY=
ANTHROPIC_API_KEY=
XAI_API_KEY=

GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
GITHUB_APP_ID=
GITHUB_PRIVATE_KEY=

REDIS_URL=

CODE_RABBIT_API_KEY=

DEPLOYMENT_PROVIDER_TOKEN=
```

Provider-specific secrets should preferably be owned by OmniRoute rather than scattered throughout application code.

---

# 73. Critical Architectural Rule

The application must maintain a strict boundary:

```text
Moxie Control Plane
        │
        │ secure API
        ▼
Agent Runtime
        │
        │ scoped sandbox API
        ▼
E2B Sandbox
        │
        ▼
Generated Application
```

Generated applications must not be treated as trusted Moxie infrastructure.

---

# 74. Final Product Architecture

```text
                              MOXIE
                                │
                  ┌─────────────┴─────────────┐
                  │                           │
             Control Plane              Execution Plane
                  │                           │
        ┌─────────┼─────────┐          ┌──────┴──────┐
        │         │         │          │             │
      Clerk     tRPC      Prisma      E2B          Docker
        │         │         │          │             │
     Billing    API      Neon       Sandbox       Templates
                  │                    │
                  ▼                    ▼
             AI Orchestrator      Generated App
                  │                    │
                  ▼                    │
              OmniRoute                │
                  │                    │
        ┌─────────┼─────────┐          │
        ▼         ▼         ▼          │
     OpenAI   Anthropic    Grok        │
        │         │         │          │
        └─────────┼─────────┘          │
                  ▼                    │
             AI Agents                 │
                  │                    │
                  ▼                    │
              Inngest                  │
                  │                    │
                  └──────────┬─────────┘
                             ▼
                         Validation
                             │
                 ┌───────────┼───────────┐
                 ▼           ▼           ▼
              Preview      GitHub     Deploy
                             │
                             ▼
                         CodeRabbit
```

---

# 75. Definition of Done

Moxie is considered production-ready when:

- Authentication works reliably.
- Billing is integrated.
- Credits are accurate.
- Projects persist reliably.
- AI generation works.
- OmniRoute supports multiple providers.
- Agent tools are permission-controlled.
- Sandboxes are isolated.
- Generated applications can run successfully.
- Preview URLs work.
- Automatic debugging works.
- GitHub integration works.
- PR review workflow works.
- Deployment works.
- Usage is observable.
- Failures are recoverable.
- Secrets are protected.
- Rate limits and abuse controls are active.
- Automated tests cover critical paths.
- AI evaluation benchmarks meet agreed quality thresholds.

---

# 76. Product North Star

Moxie should ultimately make this workflow possible:

```text
"I have an idea."

        ↓

"Describe it to Moxie."

        ↓

Moxie understands the idea.

        ↓

OmniRoute chooses the right intelligence.

        ↓

Moxie builds the frontend.

        ↓

Moxie builds the backend.

        ↓

Moxie creates the database.

        ↓

Moxie runs the application.

        ↓

Moxie finds and fixes errors.

        ↓

The user refines the product conversationally.

        ↓

Moxie creates the Git workflow.

        ↓

Moxie reviews the changes.

        ↓

Moxie deploys the application.

        ↓

                    🚀

               IDEA → PRODUCTION
```

**Moxie's core promise:**

> **From an idea to a working full-stack application, with AI handling the engineering work while the user remains in control.**
