# Search
*Type: client* | *Base: Popover.Root* | *Last updated: 2025-11-08*

## Overview
Search combines an `Input` trigger with a Radix Popover that displays async search results, loading state, and an optional “view all” action. It handles controlled and uncontrolled terms, swaps icons as you type, announces empty states, and maps each result to a `MenuItem`. Use it anywhere you need a multi-source search surface inside dashboards or marketing sites.

---

## Import

### Component
```ts
import { Search } from '@doxyz-ui/core/client/Search';
```

### Types

```ts
import type { SearchProps, SearchResult } from '@doxyz-ui/core/client/Search';
```

---

## Usage

```tsx
<Search
  value={term}
  onSearchTermChange={setTerm}
  results={results}
  onResultSelect={result => router.push(result.href ?? '#')}
  onViewAllClick={term => router.push(`/search?term=${term}`)}
  loading={isLoading}
  noResultsMessage="No matches yet"
/>
```

- `results` is an array of `{ id, label, description?, href?, icon?, type? }`. When `icon` is absent, the component picks a default icon based on `type`.
- `onSearchTermChange` fires on every keystroke—debounce/fetch in the parent.

---

## Props (Declared + Inherited)

| Prop               | Type                                               | Default | Required | Notes |
| ------------------ | -------------------------------------------------- | ------: | :------: | ----- |
| `className`        | `string`                                           |         |          | Appends utility classes to the root `Popover.Root` wrapper.
| `closeIcon`        | `React.ReactNode`                                  |   `CloseIcon` |      | Replaces the default glyph inside the clear button.
| `defaultValue`     | `string`                                           |         |          | Initial search term when uncontrolled.
| `InputProps`       | `Partial<InputProps>` (minus `value/defaultValue/startIcon/endIcon`) |         |          | Pass-through props for the inner `Input`; you can override `startIcon`, `endIcon`, placeholder behavior, etc.
| `loading`          | `boolean`                                          |   `false` |          | Shows the spinner status row and hides any previous results while true.
| `noResultsMessage` | `string`                                           |         |          | Message displayed when there are no results for the current non-empty term.
| `onResultSelect`   | `(result: SearchResult) => void`                  |         |   Yes    | Called when a result is clicked; receives the raw `results[i]` object.
| `onSearchTermChange`| `(term: string) => void`                          |         |   Yes    | Fires on every input change with the latest term (controlled or uncontrolled).
| `onViewAllClick`   | `(term: string) => void`                          |         |          | Renders a view-all button when provided and results exist.
| `placeholder`      | `string`                                           | `'Search…'` |        | Placeholder text for the input.
| `results`          | `ReadonlyArray<SearchResult>`                      |         |   Yes    | Data used to render MenuItem entries. Each result requires a unique `id`.
| `value`            | `string`                                           |         |          | Controlled search term; use with `onSearchTermChange`.
| `viewAllLabel`     | `string`                                           | `'View all listings matching {searchTerm}'` | | Template for the view-all button. `{searchTerm}` will be replaced with the current value.

* **Extends:** `React.HTMLAttributes<HTMLDivElement>` for the outer wrapper.
* **Forwards:** Additional props (`aria-label`, `style`, etc.) onto the root container.

---

## Structure

* **anchor** — `Popover.Anchor` containing the `Input`. Defaults to `SearchIcon` on the left and a clear button on the right when the term is non-empty.
* **results** — `Popover.Content` body that holds result rows, status messages, and the optional view-all action.
* **status** — Row that shows the spinner (`AnimatedCircularProgressIcon`) when `loading`, or the `noResultsMessage` when appropriate.
* **viewAllRow** — Right-aligned `Button` rendered when `onViewAllClick` exists and results are present.
* **clearButton** — Inline `Button` used as `Input.endIcon` when the term is non-empty; clicking it clears the search term, closes the popover, and returns focus to the input.

> DOM structure sketch:

```jsx
<Popover.Root>
  <Popover.Anchor className="min-w-480">
    <Input
      type="search"
      value={term}
      placeholder={placeholder}
      startIcon={InputProps?.startIcon ?? <SearchIcon />}
      endIcon={term ? (
        <button type="button" aria-label="Clear search" data-slot="clearButton">
          {closeIcon ?? <CloseIcon />}
        </button>
      ) : InputProps?.endIcon}
      {...restInputProps}
    />
  </Popover.Anchor>
  {popoverOpen && (
    <Popover.Portal>
      <Popover.Content
        data-popover-content="true"
        className="results"
        data-is-loading={loading}
        data-no-results={noResults}
      >
        {loading && <span data-slot="status">Loading <AnimatedCircularProgressIcon /></span>}
        {!loading && results.map(result => (
          <MenuItem
            key={result.id}
            type="complex"
            option={result.label}
            supportingText={result.description}
            href={result.href}
            mediaIcon={result.icon ?? defaultIcon(result.type)}
            onClick={() => onResultSelect(result)}
          />
        ))}
        {viewAll && (
          <div data-slot="viewAllRow">
            <Button variant="secondary" onClick={() => onViewAllClick(term)}>
              {viewAllText}
            </Button>
          </div>
        )}
      </Popover.Content>
    </Popover.Portal>
  )}
</Popover.Root>
```

---

## Data Attributes & States

| State flag                | Effect |
| ------------------------- | ------ |
| `data-is-loading="true"` | Sets a fixed height for the results surface while the spinner is visible.
| `data-no-results="true"` | Centers the empty-state message area when there are no matches.

---

## Classes

| Data slot      | Classes |
| -------------- | ------- |
| `anchor`       | `min-w-480` (ensures the dropdown matches the input width).
| `results`      | `inline-flex flex-col justify-center p-4 rounded-sm border overflow-hidden border-color-border-subtle bg-color-background-default content-center -ml-[31px] mt-6` + state modifiers for loading/empty.
| `status`       | `inline-block w-full text-center text-sm text-color-content-weak` |
| `viewAllRow`   | `inline-flex w-full justify-end` |
| `clearButton`  | `inline-flex h-20 w-20 items-center justify-center rounded-full border-0 bg-background-none text-color-content-default hover:bg-color-background-default-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-comp-border-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-color-background-default` |

---

## Accessibility

* **Name:** The input should receive an external label (`aria-label` or surrounding `FormElement`). Add `announceLabel`-style copy via `noResultsMessage`/status text for state changes.
* **Keyboard:** Input handles traditional search interactions; pressing `Escape` clears the term and closes the popover. MenuItem rows remain focusable via Tab.
* **Roles/States:** The status row uses `aria-live="polite"` so loading/empty updates are announced. Results list acts as a simple listbox (no explicit ARIA role, but rows are standard buttons/links).
* **Announcements:** While loading, the spinner row explains that new results are coming; once results arrive, each MenuItem has a descriptive label/description.
* **Icon-only pattern:** Default icons for result types are marked `aria-hidden`; labels and descriptions carry the accessible name.

---

## Patterns & Examples

### Controlled search with view-all

```tsx
const [term, setTerm] = useState('');
const results = useAsyncResults(term);

<Search
  value={term}
  onSearchTermChange={setTerm}
  results={results}
  onResultSelect={result => router.push(result.href ?? '#')}
  onViewAllClick={() => router.push(`/search?term=${term}`)}
  loading={isLoading}
  noResultsMessage="Try a different keyword"
/>
```

- Hide old results during a new fetch by setting `loading=true` until the request resolves.

### Uncontrolled search with custom icons

```tsx
<Search
  defaultValue="New York"
  onSearchTermChange={handleSearch}
  results={venues.map(venue => ({
    ...venue,
    icon: <VenueAvatar venue={venue} />
  }))}
  onResultSelect={handleSelect}
/>
```

- Provide custom nodes via `result.icon` to override the default icon mapping.

### Input adornment overrides

```tsx
<Search
  value={term}
  onSearchTermChange={setTerm}
  results={results}
  onResultSelect={handleSelect}
  InputProps={{
    startIcon: <MapIcon aria-hidden="true" />,
    placeholder: 'Search locations…'
  }}
/>
```

- `InputProps` can set any Input attribute except `value`, `defaultValue`, `startIcon`, and `endIcon` (those are controlled by the component).

---

## Blueprint Parity

* Contract ↔ styleMap variants: **OK**
* Slots parity: **OK**
* State flags parity: **OK**
* Signature hash: `672b83f93021b019fcb131083a4e2b63c0e8d65ab6712f0e0a732b5d1fb6ef16`

---

## Changelog

| Date       | Changes |
| ---------- | ------- |
| 2025-11-08 | Initial documentation and Storybook README wiring. |
