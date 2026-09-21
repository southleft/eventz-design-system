# Sponsor Pipeline (demo app)

A realistic event-management SaaS page built on `@eventz-ui/core`, for design-engineer review.
The fictional event is **Northwind Summit 2026**; all sponsors and figures are sample data.

## Run

Node is not required if you use Bun:

```bash
cd apps/sponsor-pipeline
bun install
bunx --bun vite          # or: npm install && npx vite
```

The app imports core **from source** (`@core/*` alias in `vite.config.ts`), so no library build is needed.
It is intentionally **not** added to `pnpm-workspace.yaml`, so it cannot affect the lockfile or CI.
Preview states with `?state=loading|empty|error`, or use the footer toggles (also switches light/dark).

## Structure

| File | Purpose |
| --- | --- |
| `src/data/types.ts` | Content model: sponsor, tier, stage, contract, payment, next action |
| `src/data/health.ts` | `getHealth()`: the single rule set behind every status. Precedence: at risk, then confirmed / pending payment / in negotiation |
| `src/data/sponsors.ts` | Sample data (16 sponsors incl. edge cases: in-kind, downgrade request, overdue, declined) |
| `src/components/PipelineSummary.tsx` | Goal-gap headline, stacked bar, tier inventory |
| `src/components/AttentionList.tsx` | "Needs attention today" |
| `src/components/SponsorTable.tsx` | Urgency-sorted table (local, no core Table exists) |
| `src/components/StatusPill.tsx` | Health pill (local, see gaps) |
| `src/components/SponsorDetail.tsx`, `AddSponsor.tsx` | Dialogs |

## Status model

| Health | Rule |
| --- | --- |
| At risk | Payment overdue, downgrade requested, contract sent 10+ days unsigned, or unsigned with 14+ days of silence |
| Pending payment | Contract signed, not yet paid |
| Confirmed | Contract signed and paid (or in-kind) |
| In negotiation | Contract not signed and nothing above applies |

## Core components used

Breadcrumbs, Heading, Text, Tag (filters), Badge (tier), InteractiveListItem (attention),
Button, Input, Select, Textarea, Dialog, Stepper, Alert (toast).

## Findings for systematizing

1. **No Table component.** `SponsorTable` is semantic `<table>` + tokens.
2. **No status pill.** `Tag` has no status variant, leading indicator or compact size. `StatusPill` uses `--dt-color-background-utility-*`.
3. **Badge has no semantic variants**, only decorative gradients. Fine for tier, unusable for status.
4. **Alert is fixed-width (390px)**, so it works as a toast but not a page banner.
5. **Dark theme contrast:** `Text color="success-strong"` / `"danger-strong"` resolve to dark greens/reds in dark mode and read poorly on dark backgrounds.
6. **No Tailwind preflight** in the core CSS entry, so consuming apps need a small reset (see `src/styles.css`).
7. **Dialog requires a `trigger` prop**, even when controlled. This app passes a hidden span for the row-opened detail dialog.
8. **Select/Input layout**: the Select's negative margins make it need a full-width wrapper; Textarea is slightly indented compared to Input.
9. No `Progress`/stacked-bar or stat components. The goal bar is local markup.
