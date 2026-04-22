# Figma Generate Library — Data Table High Priority Components

**Date:** 2026-04-22  
**Status:** Approved  
**Target File:** Optimizing-Table (`S9ZjLU7KVD3VV6THh2TI7z`)  
**Approach:** Code-first, all 6 in one pass

---

## Goal

Generate 6 high-priority Data Table components into the Optimizing-Table Figma file, derived directly from the codebase. This covers the items marked ⭕ in the "High Priority" section of `DATA_TABLE_VARIANTS_CHECKLIST.md`.

---

## Phase 1 — Codebase Audit

Before generating anything in Figma, read these files to map code → Figma accurately:

| File | Purpose |
|---|---|
| `src/components/Table/types.ts` | All variant types, prop interfaces, accent/state enums |
| `src/components/Table/cells/DataCell.tsx` | Striping, pinning, variant rendering logic |
| `src/components/Table/cells/HeaderCell.tsx` | Sort states, check header structure |
| `src/components/Table/cells/FooterCell.tsx` | Summary row structure |
| `src/components/Table/hooks/useCellVariant.ts` | Column-to-cell resolution logic |
| `tokens/colors.json` | Exact color values for Figma fills |

The audit determines the exact prop names, state values, and color tokens used in each component before any Figma work begins.

---

## Phase 2 — Components to Generate

### 1. Radio Selection Variants

**Figma path:** `DataTable / Cell / Radio`  
**Type:** Figma component with variant properties

**Variants:**

| Property | Values |
|---|---|
| State | Unchecked, Checked, Disabled |
| Striped | White, Gray |

**Also includes:** `DataTable / Header / Radio` — an empty radio header cell (no select-all, unlike checkbox header).

**Code reference:** `CheckboxCellProps` with `variant: 'radio'` in `types.ts`

---

### 2. Multi Selection + Remove Action

**Figma path:** `DataTable / Config / Multi + Remove`  
**Type:** Configuration frame (not a reusable component — shows the full table layout)

**Structure:**
- Checkbox column (pinned left slot, with left shadow)
- 2–3 text/numeric content columns (main slot)
- Delete/trash action column (pinned right slot, with right shadow)
- Header row + 3 data rows (default stripe: white/gray alternating)

**Code reference:** `DataCellVariant = 'checkbox'` + `DataCellVariant = 'action'` with `pinned: 'left'` / `pinned: 'right'`

---

### 3. Pinned Left + Right Simultaneously

**Figma path:** `DataTable / Config / Pinned Both`  
**Type:** Configuration frame

**Structure:**
- Left pinned column (sticky, drop-shadow on right edge)
- Main content area (shows 2–3 scrolling columns, visually truncated to indicate scroll)
- Right pinned column (sticky, drop-shadow on left edge)
- Shadow treatment documented using color tokens from `colors.json`

**Code reference:** `DataCellProps.pinned = 'left'` and `DataCellProps.pinned = 'right'` in `types.ts`

---

### 4. Row Hover / Active States

**Figma path:** `DataTable / Row / States`  
**Type:** Figma component with variant properties

**Variants:**

| Property | Values |
|---|---|
| State | Default, Hover, Selected, Hover+Selected, Disabled |
| Striped | White, Gray |

Each variant shows a full row (checkbox + 3 content cells + action cell) so the state is visible in context.

**Code reference:** Row-level state not yet in `types.ts` — these are CSS states (`:hover`, `[aria-selected]`, `[disabled]`). Figma variants should document the intended visual treatment for implementation.

---

### 5. Actions in Row (Inline)

**Figma path:** `DataTable / Cell / Actions / Inline`  
**Type:** Figma component with variant properties

**Variants:**

| Property | Values |
|---|---|
| Visibility | Always, Hover |
| Count | 1, 2, 3 |

- **Always:** Action links visible at all times in the cell
- **Hover:** Action links appear only when the row is hovered (ghost/transparent at rest)
- Count variants show 1, 2, or 3 action links side by side

**Code reference:** `ActionCellProps` with `variant: 'action' | 'actions'` in `types.ts`

---

### 6. Actions Overflow Menu

**Figma path:** `DataTable / Cell / Actions / Overflow`  
**Type:** Figma component with variant properties

**Variants:**

| Property | Values |
|---|---|
| Menu | Closed, Open |
| Item State | Default, Disabled, Destructive |

- **Closed:** Cell shows only the kebab (⋮) icon
- **Open:** Cell shows kebab icon + dropdown menu overlaid with 3–5 items
- Dropdown items use `DataCellAccent = 'error'` color for destructive actions

**Code reference:** `ActionCellProps.items` array with `disabled` flag in `types.ts`; destructive maps to `accent: 'error'`

---

## Phase 3 — Figma Organization

**Target file:** Optimizing-Table (`S9ZjLU7KVD3VV6THh2TI7z`)

**Naming convention:** `DataTable / [Category] / [Variant]`

**Categories in use:**
- `DataTable / Cell / Radio` — cell-level component
- `DataTable / Cell / Actions / Inline` — cell-level component
- `DataTable / Cell / Actions / Overflow` — cell-level component
- `DataTable / Row / States` — row-level component
- `DataTable / Config / Multi + Remove` — table configuration frame
- `DataTable / Config / Pinned Both` — table configuration frame

**Token usage:**
- All fills sourced from `tokens/colors.json` — no hardcoded hex values
- Shadow tokens use neutral gray values from the primitive scale
- Hover state background: `neutral.gray-50` light mode
- Selected state background: `brand.blue-50` light mode
- Disabled opacity: 40%

**Layout:**
- Cell and row components use Figma auto-layout (horizontal, fixed height 48px default)
- Configuration frames are fixed-size frames showing a realistic table excerpt
- All components target light mode; dark mode is out of scope for this pass

---

## Out of Scope

These items are explicitly excluded from this run:

- Dark mode variants
- Mobile / responsive layouts
- Footer numeric summaries
- Keyboard focus states
- Pagination
- Expandable/nested rows
- Header filterable / resizable features

---

## Success Criteria

- All 6 components exist in the Optimizing-Table Figma file under the `DataTable /` namespace
- Component variants match prop values defined in `types.ts`
- Color fills reference token values from `colors.json`, not arbitrary hex
- Configuration frames are readable as design references without additional explanation
- Checklist items 1–6 in `DATA_TABLE_VARIANTS_CHECKLIST.md` High Priority section can be marked ✅
