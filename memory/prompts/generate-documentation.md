# Prompt Template: generate-documentation

GOAL
Generate or update per-component API documentation using the AI-owned README template, and render that README directly in Storybook by wiring it into the component’s story meta (no MDX docs pages). The agent owns 100% of README content.

SCOPE (✅/❌)
✅ Create or update README.md in the component folder
✅ Update the component’s existing .stories file to render README using @storybook/addon-docs Markdown and ?raw import
✅ Compute runtime signature and update front‑matter (runtimeHash, updated)
✅ Derive declared + inherited props (exclude HTMLElement attributes)
✅ Derive public data attributes / states
✅ Compare blueprint contract/styleMap to runtime and write parity checklist
❌ Modify runtime code or blueprints
❌ Create MDX docs pages
❌ Change Storybook config or tooling

MODE
Single component mode: The caller’s invocation includes a PascalCase component name; use that name.
Bulk mode: If the caller’s invocation includes “for all” or “all components”, crawl the components tree by convention and run this process for each component. Skip components lacking a story file and report them at the end.

DISCOVERY (conventions; infer everything else)
	•	componentDir: packages/**/src/components/
	•	entryFile: /.tsx (fallback: index.tsx)
	•	storyFile: /.stories.tsx
	•	blueprintContractFile: packages/blueprints/**//.contract.ts (if present)
	•	blueprintStyleMapFile: packages/blueprints/**//.styleMap.ts (if present)
	•	htmlTag, basePrimitive, packageSegment: infer from runtime and path; if unknown, htmlTag=div, basePrimitive=host:div, packageSegment=client

FILES TO TOUCH
	1.	/README.md (create or replace)
	2.	 (modify idempotently to add README rendering)

OUTPUTS
	•	README.md that fully replaces its content using memory/examples/readme-template.md
	•	Updated stories that render README via @storybook/addon-docs

DETERMINISM & HOUSE RULES
	•	This file contains NO code fences.
	•	Write raw file contents when creating/updating README.
	•	Idempotent edits: do not duplicate imports or parameters on re-run.
	•	Never invent props/states; resolve from TypeScript AST or blueprint.
	•	Exclude HTMLElement attributes from @types/react; mention forwarding once.

ALGORITHM
	1.	PARSE RUNTIME
	•	Find exported component symbol and its Props type; resolve extended interfaces recursively.
	•	Collect prop name → type → default; record source file per prop and exclude node_modules/@types/react.
	2.	PARSE BLUEPRINTS
	•	If contract/styleMap exist, extract variant keys, slot names, and public state flags (data-* selectors).
	3.	DERIVE STATES
	•	From runtime toggles and styleMap, list public data-* states and a short effect note.
	4.	COMPUTE SIGNATURE
	•	Build normalized signature (sorted prop names + stringified types + sorted states) and sha256 hash → runtimeHash.
	5.	GENERATE README
	•	Load memory/examples/readme-template.md and fill placeholders:
	•	{{ComponentName}}, {{HTMLTag}}, {{BasePrimitiveOrHost}}, {{server | client}}, {{RuntimeSignatureHash}}, {{YYYY-MM-DD}}
	•	Fill all sections per template; concise, neutral tone; examples minimal and correct.
	6.	WIRE README INTO STORIES (no MDX)
	•	Ensure the story file:
	•	Imports: import { Markdown } from ‘@storybook/addon-docs/blocks’
	•	Imports: import Readme from ‘./README.md?raw’
	•	Includes: tags: ['autodocs'] in the default meta object after component
	•	In the default export meta object, set or merge: parameters.docs.page = () => {Readme}
	•	Preserve existing component, render, title, and other parameters.
	•	Avoid duplicate imports; if they exist, reuse them.
	•	Do not alter stories’ behavior; only add the docs page.
	7.	VERIFY
	•	Confirm README placeholders are all resolved.
	•	Confirm prop table excludes DOM attributes and includes inherited component props.
	•	Confirm parity checklist and signature hash are present.
	•	Confirm the story meta compiles (imports exist; parameters.docs.page is present exactly once).

ACCEPTANCE CRITERIA
	•	README.md exists with all sections, fully AI-generated, front‑matter updated (runtimeHash, updated).
	•	Storybook shows the README when opening the component’s Docs tab (parameters.docs.page wired with Markdown + ?raw).
	•	Canvas Controls table shows declared + inherited props from the component (DOM attributes excluded via docgen config).
	•	Re-running with no runtime changes yields zero diffs to both README and stories.

FAIL FAST
	•	If the component’s Props type cannot be resolved, stop and report the expected symbol.
	•	If the story file is missing, stop and report; do not create one.
	•	If blueprints are missing, still generate README but mark “Blueprint Parity” and “Data Attributes & States” as “Unavailable (missing blueprint)”.
