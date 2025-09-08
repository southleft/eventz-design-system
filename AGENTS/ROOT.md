# 🤖 Agents Overview

This repository uses AI-assisted workflows to enhance development. Policies and guidelines for AI agents are organized across multiple documents within this folder.

<!-- @agents:paths:start -->
### 📍 Canonical paths
- Components root: `packages/core/src/components/<ComponentName>/`
- Contract: `packages/blueprints/src/components/<ComponentName>/<ComponentName>.contract.ts`
- styleMap: `packages/blueprints/src/components/<ComponentName>/<ComponentName>.styleMap.ts`
> Source: AGENTS/META.yml (version: 1)
<!-- @agents:paths:end -->

---

## 📚 Agent Policy Documents

- 🤝 [CODE_REVIEW.md](./CODE_REVIEW.md) – Guidelines for reviewing agent-generated code
- ⚙️ [GENERATION.md](./GENERATION.md) – Instructions on generating components and tests
- 🔐 [PERMISSIONS.md](./PERMISSIONS.md) – Access and write permissions for agents
- 📋 [PR_PROTOCOL.md](./PR_PROTOCOL.md) – Pull request requirements and checklist for agents
- 🧱 [STACK.md](./STACK.md) – Technologies and tools used in the agent workflows
- 🚦 [WORKFLOW.md](./WORKFLOW.md) – Step-by-step agent operation process

---

Please ensure all AI agents strictly follow these rules. The continuous integration (CI) system remains the ultimate source of truth for code quality and correctness.
