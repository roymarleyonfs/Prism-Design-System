# Table Component System Design

**Date:** 2026-04-21  
**Status:** Design Approved  
**Scope:** Phase 1 - Atomic cells + column layout; Phase 2+ - Full DataTable orchestration

---

## Overview

Build a composable table component system that starts with atomic, reusable cells and column templates (Phase 1), then grows into a full-featured DataTable with selection, actions, and pinning (Phase 2+).

**Guiding principle:** Cells are Lego blocks—fully usable standalone or composed into a DataTable wrapper.

---

## Architecture: Hybrid Composition Model

### Approach
**Uncontrolled Atomic Pieces + Optional Context Layer**

- **Phase 1 (MVP):** Ship cells, headers, footers, and column metadata as independent components. Users compose them into custom table layouts.
- **Phase 2+:** DataTable wrapper orchestrates these pieces via React Context, adding built-in selection, row actions, sorting, filtering, pagination.

**Why this works:**
- Cells are truly reusable—work standalone or wrapped
- Natural phased growth—no rewrites needed
- Users can mix atomic cells with DataTable for custom layouts
- Testing is simple—cells are isolated

---

## Component Hierarchy & File Structure

```
src/components/Table/
├── cells/
│   ├── DataCell.tsx            # Base wrapper (padding, striping, pinning)
│   ├── HeaderCell.tsx          # Column header (main | check variant)
│   ├── FooterCell.tsx          # Summary row cell
│   ├── variants/
│   │   ├── TextCell.tsx        # Text, ID content
│   │   ├── NumericCell.tsx     # Plain number, Suffixed, Currencies, Volume, Dimensions
│   │   ├── DateTimeCell.tsx    # Date & Time formatting
│   │   ├── CheckboxCell.tsx    # Checkbox, Radio inputs
│   │   ├── BadgeCell.tsx       # Badge, Tag, Tags display
│   │   ├── UserCell.tsx        # User, Users with avatars
│   │   ├── ImageCell.tsx       # Image, Images grid
│   │   ├── ActionCell.tsx      # Action, Actions (button or menu)
│   │   └── EmptyCell.tsx       # Empty state (global)
├── Column.tsx                  # Metadata holder (header, accessor, variant, config)
├── ColumnTemplate.tsx          # Row layout orchestrator (pinning, striping, cell rendering)
├── TableRow.tsx                # Convenience wrapper for <tr> with row data
├── DataTable.tsx               # Phase 2: Full component with selection/actions (Context provider)
├── types.ts                    # All TypeScript interfaces
├── hooks/
│   ├── useTableContext.ts      # Access DataTable context (Phase 2)
│   └── useCellVariant.ts       # Resolve variant-specific cell props
├── tokens.ts                   # Cell-specific token references
├── index.ts                    # Public exports
└── __tests__/
    ├── DataCell.test.tsx
    ├── variants/*.test.tsx
    ├── Column.test.tsx
    └── ColumnTemplate.test.tsx
```

---

## Cell Component Interfaces

All data cells extend `HTMLAttributes<HTMLTableCellElement>` for semantic HTML + custom props.

### Base DataCell Props
```typescript
interface DataCellProps extends HTMLAttributes<HTMLTableCellElement> {
  variant: DataCellVariant; // text | numeric | date | checkbox | badge | user | image | action | empty
  children: React.ReactNode;
  accent?: 'default' | 'success' | 'warning' | 'error'; // Badge/status coloring
  striped?: 'white' | 'gray'; // Row striping from parent
  pinned?: 'left' | 'right'; // Sticky positioning
  className?: string; // Allow overrides
}
```

### Variant-Specific Props

**TextCell** — plain text, optional truncation
```typescript
interface TextCellProps extends DataCellProps {
  variant: 'text' | 'id';
  children: string;
  truncate?: boolean;
}
```

**NumericCell** — numbers with formatting (plain, suffixed, currency, volume, dimensions)
```typescript
interface NumericCellProps extends DataCellProps {
  variant: 'numeric';
  value: number;
  format: 'plain' | 'suffix' | 'currency' | 'volume' | 'dimensions';
  suffix?: string; // e.g., "kg", "m²", "$"
  decimals?: number;
  locale?: string; // For currency formatting
}
```

**DateTimeCell** — date/time with formatting
```typescript
interface DateTimeCellProps extends DataCellProps {
  variant: 'date-time';
  value: Date | string;
  format?: 'date' | 'time' | 'datetime';
  locale?: string;
}
```

**CheckboxCell** — checkbox or radio input
```typescript
interface CheckboxCellProps extends DataCellProps {
  variant: 'checkbox' | 'radio';
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}
```

**BadgeCell** — single badge or list of tags
```typescript
interface BadgeCellProps extends DataCellProps {
  variant: 'badge' | 'tag' | 'tags';
  items: Array<{ label: string; color?: 'default' | 'success' | 'warning' | 'error' }>;
  onRemove?: (index: number) => void; // For dismissible tags
}
```

**UserCell** — single user or list of users
```typescript
interface UserCellProps extends DataCellProps {
  variant: 'user' | 'users';
  users: Array<{ id: string; name: string; avatar?: string }>;
}
```

**ImageCell** — single image or image grid
```typescript
interface ImageCellProps extends DataCellProps {
  variant: 'image' | 'images';
  images: Array<{ src: string; alt: string; id?: string }>;
}
```

**ActionCell** — single button or menu of actions
```typescript
interface ActionCellProps extends DataCellProps {
  variant: 'action' | 'actions';
  items: Array<{ id: string; label: string; onClick: () => void; icon?: React.ReactNode; disabled?: boolean }>;
}
```

**HeaderCell** — column header
```typescript
interface HeaderCellProps extends HTMLAttributes<HTMLTableCellElement> {
  variant: 'main' | 'check'; // 'main' = text header, 'check' = selection checkbox header
  children?: React.ReactNode; // Header label
  sortable?: boolean; // Phase 2
  onSort?: () => void; // Phase 2
}
```

**FooterCell** — summary row
```typescript
interface FooterCellProps extends HTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode; // Summary text/element
}
```

---

## Column & ColumnTemplate

### Column Component
Lightweight metadata holder. No rendering logic—just configuration.

```typescript
interface ColumnProps {
  header: string; // Column header label
  accessor: string; // Data path: "name", "user.name", "items[0].value"
  variant: DataCellVariant; // Cell variant to use
  config?: Record<string, any>; // Variant-specific config (e.g., { format: 'currency', decimals: 2 })
  pinned?: 'left' | 'right'; // Sticky positioning
  width?: string; // CSS width: "200px" | "1fr" | "25%"
  sortable?: boolean; // Phase 2
  filterable?: boolean; // Phase 2
  resizable?: boolean; // Phase 2
}
```

Usage:
```tsx
<Column header="Product Name" accessor="name" variant="text" width="200px" />
<Column header="Price" accessor="price" variant="numeric" config={{ format: 'currency', decimals: 2 }} width="120px" pinned="right" />
<Column header="Status" accessor="status" variant="badge" />
```

### ColumnTemplate Component
Orchestrates a single row: resolves columns, extracts data, renders cells with proper pinning and striping.

```typescript
interface ColumnTemplateProps {
  columns: Column[]; // All column definitions
  data: Record<string, any>; // Row data
  rowIndex: number; // For striping (white if even, gray if odd)
  selection?: 'none' | 'single' | 'multi'; // Selection mode
  selectionCheckbox?: React.ReactNode; // Pre-rendered checkbox/radio (from parent DataTable)
  onCellClick?: (accessor: string, value: any) => void; // Phase 2: cell click handlers
  pinnedLeftWidth?: number; // For layout calculations
  pinnedRightWidth?: number;
}
```

Internal flow:
1. Extract pinned-left columns, main columns, pinned-right columns
2. Render selection checkbox in first pinned-left cell (or none)
3. Extract data from `data` object using column `accessor`
4. Resolve variant-specific props from column `config`
5. Render appropriate cell component (TextCell, NumericCell, etc.)
6. Apply striping class: `bg-white` (even rows) or `bg-[var(--color-primitive-neutral-gray-50)]` (odd rows)
7. Apply pinned styles: `position: sticky; left: 0; z-index: 10` (left) / `right: 0; z-index: 9` (right)

### TableRow Convenience Wrapper
```typescript
interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  columns: Column[];
  data: Record<string, any>;
  rowIndex: number;
  selection?: 'none' | 'single' | 'multi';
  selectionCheckbox?: React.ReactNode;
}

// Usage:
<tr>
  <TableRow columns={cols} data={rowData} rowIndex={i} selection="multi" selectionCheckbox={<input type="checkbox" />} />
</tr>
```

---

## DataTable Wrapper (Phase 2 sketch)

Context-based orchestrator for selection, row actions, and column management.

```typescript
interface DataTableProps {
  columns: Column[];
  data: Array<Record<string, any>>;
  selection?: 'none' | 'single' | 'multi'; // Default: 'none'
  selectedRows?: Set<string> | string[]; // Phase 2
  onSelectionChange?: (selected: Set<string>) => void; // Phase 2
  rowActions?: Array<{ label: string; onClick: (rowId: string) => void }>; // Phase 2
  pinnedLeft?: string[]; // Column accessors to pin left
  pinnedRight?: string[]; // Column accessors to pin right
  sorting?: { accessor: string; direction: 'asc' | 'desc' }; // Phase 2
  onSort?: (accessor: string) => void; // Phase 2
  children?: React.ReactNode; // Optional custom footer/pagination
}

// Phase 1: DataTable is just a <table> with ColumnTemplate rows
// Phase 2: DataTable provides TableContext with selection, actions, sorting
// Phase 2+: Add filtering, pagination, column resizing via context
```

---

## Data Flow

### Phase 1 (Atomic)
```
Column[] + data → ColumnTemplate extracts via accessor → renders Cell variant
```

Example:
```tsx
const columns = [
  { header: "Name", accessor: "name", variant: "text" },
  { header: "Price", accessor: "price", variant: "numeric", config: { format: "currency" } },
];

const row = { name: "Widget", price: 99.99 };

<tr>
  <ColumnTemplate columns={columns} data={row} rowIndex={0} />
</tr>
```

### Phase 2 (Full DataTable)
```
DataTable provides TableContext
  ↓
ColumnTemplate reads context (selection state, handlers)
  ↓
Cells render with event handlers from context
  ↓
User interactions update context state
```

---

## Styling Approach

**Tokens + Tailwind:**
- All cell padding, spacing, colors use CSS variables from `tokens.css`
- Row height: 48px (data rows), 40px (header/footer)
- Header: `bg-[var(--color-primitive-neutral-gray-50)]`, `text-caption-md font-semibold`
- Striping: alternating `bg-white` and `bg-[var(--color-primitive-neutral-gray-50)]`
- Cell padding: `px-[var(--spacing-20)] py-[var(--spacing-12)]`
- Pinned columns: `position: sticky; z-index: 10` (left) / `z-index: 9` (right) with white background
- Borders: `border-b border-[var(--color-primitive-neutral-gray-200)]` between rows

**Customization:**
- Cells accept `className` for custom styling but default to design tokens
- ColumnTemplate accepts `className` for row-level overrides
- No inline styles—all via Tailwind/tokens

---

## Accessibility

- **Semantic HTML:** Use `<table>`, `<thead>`, `<tbody>`, `<tfoot>`, `<tr>`, `<th>`, `<td>`
- **ARIA labels:** Action cells have `aria-label` on buttons
- **Keyboard support:** Checkboxes and radio inputs are natively keyboard accessible
- **Focus management:** Interactive cells (actions, checkboxes) receive focus visible outlines
- **Row selection:** If enabled, first cell in row is the selection control
- **Phase 2 note:** DataTable will add keyboard nav (arrow keys) and screen reader announcements for selection changes

---

## Testing Strategy

**Unit tests (Vitest):**
- Each cell variant in isolation: props → render → assert output
- DataCell striping and pinning logic
- Column accessor resolution (dot notation, array indices)
- ColumnTemplate cell resolution and rendering

**Integration tests:**
- ColumnTemplate + multiple cell variants in a row
- Selection state changes (Phase 2)
- Action cell clicks trigger handlers (Phase 2)

**No e2e needed for Phase 1** — cells are presentational. Phase 2 (DataTable interaction) may warrant Playwright tests for selection flows.

---

## Implementation Phases

### Phase 1 (MVP)
- ✅ All cell variants (9 component files)
- ✅ HeaderCell, FooterCell
- ✅ Column, ColumnTemplate, TableRow
- ✅ Type definitions and tokens
- ✅ Unit tests for cells and ColumnTemplate
- **Output:** Atomic cell library ready for composing custom tables

### Phase 2 (Full DataTable)
- 🔲 DataTable wrapper with React Context
- 🔲 Selection management (single/multi)
- 🔲 Row action handlers
- 🔲 Sorting integration (header click → callback)
- 🔲 Column pinning (pinnedLeft, pinnedRight props)

### Phase 2+ (Advanced)
- 🔲 Pagination controls
- 🔲 Column resizing
- 🔲 Filtering UI
- 🔲 Keyboard navigation (arrow keys, Enter, Escape)
- 🔲 Storybook stories

---

## Design System Alignment

**Tokens used:**
- Colors: `--color-primitive-*`, `--color-semantic-*` (from tokens/colors.json)
- Spacing: `--spacing-2`, `--spacing-4`, `--spacing-8`, `--spacing-12`, `--spacing-16`, `--spacing-20` (from tokens/spacing.json)
- Radius: `--radius-6`, `--radius-8`, `--radius-12` (from tokens/radius.json)
- Typography: `text-body-md`, `text-body-sm`, `text-caption-md` (from typography scale)

**Conventions:**
- Follow Button/Card pattern: forwardRef, displayName, className merging
- Variant mapping via Record<Type, string> type
- CSS variables for all color/spacing values
- No inline styles

---

## Figma Source

- Main design: https://www.figma.com/design/S9ZjLU7KVD3VV6THh2TI7z/Optimizing-Table
- Data Table Template: node-id=156-7178
- Cell variants: See `Prompts/untuk implemen New Table.md` for individual node links

---

## Summary

**What we're building:**
A compositional table system starting with atomic, reusable cell components and growing into a full-featured DataTable. Cells are styled to match Figma designs exactly, support all 19 data cell variants + header/footer, and work standalone or within a DataTable wrapper.

**Key architectural decisions:**
- Hybrid composition (uncontrolled cells + optional context wrapper)
- ColumnTemplate for row layout and cell resolution
- DataCell as base for all data cells (padding, striping, pinning)
- Phased rollout: Phase 1 = cells + layout, Phase 2+ = features
- CSS variables for all styling, forwardRef for all components

**Success criteria:**
- ✅ Visually matches Figma designs (exact colors, spacing, typography)
- ✅ All 9 cell variants fully functional and tested
- ✅ Cells work standalone AND within DataTable
- ✅ Row pinning (left/right) with correct z-index layering
- ✅ Row striping (white/gray) automatic based on index
- ✅ TypeScript strict mode, proper ARIA labels
