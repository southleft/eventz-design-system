GOAL
Generate or update per‑component API documentation using the AI‑owned README template, and render that README directly in Storybook by wiring it into the component’s story meta (no MDX docs pages). The agent owns 100% of README content.

SCOPE (✅/❌)
✅ Create or update README.md in the component folder (no YAML front‑matter)
✅ Update the component’s existing .stories file to render README using @storybook/addon-docs Markdown and ?raw import
✅ Ensure the story’s default export includes tags: [‘autodocs’] (merge without duplicates)
✅ Derive declared + inherited props (exclude HTMLElement attributes except className)
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
	•	htmlTag, basePrimitive: infer from runtime and path; if unknown, htmlTag=div, basePrimitive=host:div

FILES TO TOUCH
	1.	/README.md (create or replace)
	2.	 (modify idempotently to add README rendering)

OUTPUTS
	•	README.md that fully replaces its content using memory/examples/readme-template.md
	•	Updated stories that render README via @storybook/addon-docs

DETERMINISM & HOUSE RULES
	•	This file contains NO code fences.
	•	Write raw file contents when creating/updating README.
	•	Idempotent edits: do not duplicate imports, parameters, or tags on re-run.
	•	Never invent props/states; resolve from the TypeScript AST or blueprint.
	•	Exclude HTMLElement attributes from @types/react (e.g., React.ButtonHTMLAttributes) from the prop table; mention forwarding once.
	•	Do NOT include catch‑all rows like “…rest”, “Other props”, or “Pass‑through”. Every inherited prop must be listed explicitly.

ALGORITHM
	1.	PARSE RUNTIME
	•	Find the exported component symbol and its Props type; resolve extended interfaces recursively.
	•	Resolve utility/union/intersection types, including: Omit, Pick, Partial, Required, Readonly, & intersections.
	•	Build the complete public prop set:
• Start with declared props.
• Add inherited props from extended/aliased types.
• For Omit<T, K>, subtract K from T before adding.
• Exclude anything sourced from node_modules/@types/react (DOM attributes), EXCEPT allow className.
	•	For each prop, record: name, type (stringified), default (if determinable via initializer/param/defaultProps), and required (true/false).
	2.	PARSE BLUEPRINTS
	•	If contract/styleMap exist, extract variant keys, slot names, and public state flags (data-* selectors).
	3.	DERIVE STATES
	•	From runtime toggles and styleMap, list public data-* states and a short effect note.
	4.	COMPUTE SIGNATURE
	•	Build a normalized signature (sorted prop names + stringified types + sorted states) and sha256 hash → runtimeHash (for internal parity only; do not add front‑matter).
	5.	GENERATE README
	•	Load memory/examples/readme-template.md and fill placeholders:
	•	{{ComponentName}}, {{HTMLTag | BasePrimitive}}, {{server | client}}, {{YYYY-MM-DD}}
	•	OVERVIEW: 2–4 sentences, neutral and specific to this component.
	•	IMPORT/USAGE: minimal, correct examples.
	•	PROPS: Alphabetized table of Declared + Inherited (DOM excluded except className). Include Extends: names (for reference), but every inherited prop must appear as its own row. Never add a “…rest” or “Other props” row.
	•	STRUCTURE: slots exactly as in the blueprint contract (if present); include compact DOM sketch if helpful.
	•	DATA ATTRIBUTES & STATES: public flags only.
	•	ACCESSIBILITY: concrete, testable guidance.
	•	PATTERNS & EXAMPLES: 2–4 concise examples.
	•	BLUEPRINT PARITY: checklist vs runtime. Include the signature hash textually in this section only.
	•	CHANGELOG: add an entry with today’s date.
	6.	WIRE README INTO STORIES (no MDX)
	•	Ensure the story file:
	•	Imports: import { Markdown } from ‘@storybook/addon-docs/blocks’
	•	Imports: import Readme from ‘./README.md?raw’
	•	Default export meta includes: tags: [‘autodocs’] (merged; dedupe)
	•	Default export meta sets or merges: parameters.docs.page = () => {Readme}
	•	Preserve existing component, render, title, and other parameters.
	•	Avoid duplicate imports; if they exist, reuse them.
	7.	VERIFY
	•	Confirm README placeholders are all resolved.
	•	Confirm the props table includes explicit rows for each inherited prop (no catch‑all row).
	•	Confirm DOM attributes are excluded (except className).
	•	Confirm parity checklist and signature hash text are present.
	•	Confirm the story meta compiles (imports exist; tags include ‘autodocs’; parameters.docs.page is present exactly once).

ACCEPTANCE CRITERIA
	•	README.md exists with all sections, fully AI‑generated, and contains no front‑matter.
	•	Props table includes every inherited prop (flattened), with defaults where determinable; no “…rest” or “Other props” row.
	•	Storybook shows the README in the component’s Docs tab (Markdown + ?raw).
	•	Canvas Controls table shows declared + inherited props (DOM attributes excluded via docgen config).
	•	Re‑running with no runtime changes yields zero diffs to README and stories.

FAIL FAST
	•	If the component’s Props type cannot be resolved, stop and report the expected symbol.
	•	If the story file is missing, stop and report; do not create one.
	•	If blueprints are missing, still generate README but mark “Blueprint Parity” and “Data Attributes & States” as “Unavailable (missing blueprint)”.
	•	Open the file /Users/tonym/Documents/Github/eventz-ui/memory/examples/readme-template.md.
	•	In the “## Props (Declared + Inherited)” introduction paragraph, replace the existing guidance line with the exact line below, preserving surrounding formatting:

{{Agent: Resolve all extended interfaces and list only public, component-level props. Except for className, exclude HTMLElement attributes from @types/react. List props in alphabetical order. Do NOT include a catch‑all row like “…rest” or “Other props”—every inherited prop must appear as its own row.}}
