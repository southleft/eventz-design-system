# Write Component Test
Write a Jest test file for a component, based on contract props and behaviors.

## Inputs
- Component name
- Props from contract
- Expected behavior

## Output
- A valid `.test.tsx` file

## Guidelines
1. Import component with relative path (`../Dialog`)
2. Use `@testing-library/react` for rendering and queries
3. Cover at least:
   - renders without crashing
   - renders children
   - fires expected events if props define handlers