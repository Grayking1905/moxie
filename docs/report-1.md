# Project Moxie Status Report

## Overview
**Moxie** is an AI-first full-stack application development platform designed to build, edit, run, debug, review, and deploy complete web applications from natural-language instructions. It empowers non-technical founders, designers, and developers to turn ideas into production-ready software.

A core differentiator of Moxie is **OmniRoute**, an intelligent model-routing layer that orchestrates AI models based on task complexity, quality requirements, latency, context size, and cost.

## Current Project Phase
The project is currently in the **Initial MVP Development Phase**. We are establishing the core technical foundation and infrastructure required to support the AI generation, sandboxed execution, and user interfaces outlined in the PRD.

## Technology Stack
The foundational application is built using a modern, robust, full-stack ecosystem:
- **Framework:** Next.js 16.3.1 (React 19)
- **Styling:** Tailwind CSS v4, Base UI, shadcn/ui components
- **API/Data Fetching:** tRPC v11 with `@tanstack/react-query` v5
- **Database / ORM:** Prisma v7 with Neon adapter (`@neondatabase/serverless`)
- **Background Jobs:** Inngest v4
- **Schema Validation:** Zod
- **Icons:** Lucide React

## Recent Development & Fixes
We have successfully established the core backend infrastructure (tRPC + Prisma + Inngest) and frontend integration (React Query + UI Components). Recent efforts focused on wiring up the client UI to background processing seamlessly:

1. **tRPC & Next.js Server/Client Boundaries:**
   - Fixed `'use client'` directives to ensure React hooks like `useTRPC` and `useMutation` execute properly on the client side.
   - Resolved HTML validation and hydration issues within `layout.tsx` by properly structuring the `TRPCReactProvider` around the DOM body.

2. **Toast Notifications (Base UI):**
   - Refactored the notification system in `page.tsx` to use the custom Base UI toast implementation (`@/components/ui/toast`).
   - Corrected the method signature for creating toasts (`toast.add()`).
   - Added robust `onSuccess` and `onError` handlers in the tRPC mutation to give immediate visual feedback when a background job is queued.

3. **Inngest Background Jobs:**
   - Corrected how background events are fired from tRPC routers, using `inngest.send()` properly in `_app.ts`.
   - Updated the mock background job steps in `functions.ts` to use unique step IDs (`wait-a-moment`, `wait-for-download`, `wait-for-save`), preventing collisions during execution.

## Next Steps (Path to MVP)
With the basic web application shell, routing, and background job system working, the next priorities to fulfill the PRD requirements include:

1. **AI Integration (OmniRoute):** Begin implementing the AI orchestrator and OmniRoute logic to process natural-language prompts.
2. **Sandbox Environment:** Integrate E2B Sandbox or Docker templates to safely execute generated code.
3. **Project Management:** Expand the Prisma database schema to handle Users, Organizations, Projects, and Versions.
4. **Code Editor & Explorer:** Build out the frontend UI for the Code Explorer, Code Editor, and Terminal as specified in the Product Modules.
5. **Live Preview:** Implement the Live Preview module to render the sandboxed applications.
