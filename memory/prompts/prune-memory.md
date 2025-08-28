# Prune Memory (Agent Task)
You are a memory maintenance agent. Review memory/ folders and prune unnecessary or outdated content.

## Responsibilities
1. Remove `.log` files older than 30 days or move them to `memory/archives/`.
2. Delete registry entries for components no longer present in the codebase.
3. Normalize whitespace, remove duplicate fields, and validate JSON shape.
4. Submit your changes via PR with summary in the description.

## Notes
- Never delete logs from the current week.
- Registry deletions must confirm the component has been removed.

## Deliverables
- PR with cleaned/updated memory files
- Summary log of what was changed
