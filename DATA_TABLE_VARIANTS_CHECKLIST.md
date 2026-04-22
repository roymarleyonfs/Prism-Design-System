# Data Table - Variants & Combinations Checklist (Composition-Based Architecture)

**Architecture Note:** This table uses **Slot-based composition**. Multiple columns are added to slots at runtime, not as design variants. Slot properties handle:
- **Pinned-left slot** — Sticky left column(s)
- **Pinned-right slot** — Sticky right column(s)  
- **Main content slot** — Central scrolling area

Multi-column configurations are achieved through composition, not separate designs. See "Composition Patterns" section below.

**Status Key:** ✅ = Already Designed | ⭕ = Need to Design | 🔄 = Composition Pattern (no design needed)

---

## 1. CELL VARIANTS (19 Total)

### Data Cell Content Types
- [ ] ✅ **Text** - Plain text content (with optional truncate)
- [ ] ✅ **ID** - Identifier text (monospace)
- [ ] ✅ **Numeric** - Numbers with formatting options:
  - [ ] Plain (e.g., "1234")
  - [ ] Suffix (e.g., "1,234 units")
  - [ ] Currency (e.g., "$1,234.50")
  - [ ] Volume (e.g., "1.5 m³")
  - [ ] Dimensions (e.g., "12×24×36 cm")
- [ ] ✅ **Date-Time** - Temporal values:
  - [ ] Date only (e.g., "Mar 15, 2025")
  - [ ] Time only (e.g., "2:30 PM")
  - [ ] DateTime (e.g., "Mar 15, 2025 2:30 PM")
- [ ] ✅ **Checkbox** - Selection control (with states: unchecked, checked, indeterminate, disabled)
- [ ] ✅ **Radio** - Single selection control (with states: unchecked, checked, disabled)
- [ ] ✅ **Badge** - Single badge/label
- [ ] ✅ **Tag** - Single tag (removable)
- [ ] ✅ **Tags** - Multiple tags (with remove icons, overflow handling)
- [ ] ✅ **User** - Single user with avatar + name
- [ ] ✅ **Users** - Multiple user avatars (stacked/grouped)
- [ ] ✅ **Image** - Single image thumbnail
- [ ] ✅ **Images** - Multiple image thumbnails (grid/carousel)
- [ ] ✅ **Action** - Single action link
- [ ] ✅ **Actions** - Multiple action links + overflow menu
- [ ] ✅ **Empty** - Empty state placeholder

---

## 2. CELL STATES & MODIFIERS

### Per-Cell Visual States
- [ ] ✅ **Striping:** White background (rest)
- [ ] ✅ **Striping:** Gray background (alternate rows)
- [ ] **Hover State** - Subtle highlight on row hover
- [ ] **Focus State** - Keyboard navigation focus ring
- [ ] **Active State** - Currently selected row emphasis
- [ ] **Disabled State** - Reduced opacity/grayed out
- [ ] ✅ **Pinned Left** - Sticky to left with shadow
- [ ] ✅ **Pinned Right** - Sticky to right with shadow

### Accent/Color States (for certain variants like Badge, Tag, Numeric)
- [ ] ✅ **Default** - Neutral/primary color
- [ ] ✅ **Success** - Green (for positive values/completed items)
- [ ] ✅ **Warning** - Orange (for caution/alerts)
- [ ] ✅ **Error** - Red (for errors/failed items)

---

## 3. HEADER CELL VARIANTS

### Header Types
- [ ] ✅ **Main Header** - Regular column header with text
- [ ] ✅ **Check Header** - Checkbox column header (for select-all)
- [ ] **Radio Header** - Radio column header (empty/no select-all)

### Header Features
- [ ] ✅ **Sortable** - With sort icon and click handler
  - [ ] Unsorted state (bidirectional arrow)
  - [ ] Ascending sorted (up arrow)
  - [ ] Descending sorted (down arrow)
- [ ] **Filterable** - With filter icon/menu
- [ ] **Resizable** - With resize handle at edge
- [ ] **Truncation** - Text overflow handling (ellipsis)
- [ ] **Tooltip** - Hover to reveal full text

### Header Pinning
- [ ] **Pinned Left Header** - Sticky with shadow
- [ ] **Pinned Right Header** - Sticky with shadow

---

## 4. FOOTER CELL VARIANTS

### Footer Row Content Types
- [ ] ✅ **Summary Footer** - Text content (e.g., "Total: 150 items")
- [ ] **Numeric Summary** - Aggregated number (sum, avg, count, etc.)
  - [ ] Sum (e.g., "Total: $5,234.50")
  - [ ] Average (e.g., "Avg: $523.45")
  - [ ] Count (e.g., "Count: 10")
  - [ ] Min/Max (e.g., "Range: $10–$1,000")
- [ ] **Action Footer** - CTA buttons or action links in footer row
- [ ] **Empty Footer** - No content (spacer)

### Footer Pinning
- [ ] **Pinned Left Footer** - Sticky column
- [ ] **Pinned Right Footer** - Sticky column

---

## 5. TABLE-LEVEL VISUAL STATES (Core Interaction Models)

### Selection Type Configurations (8 Core Variants)
These define the visual table structure based on selection + action model:

#### Multi Selection
- [ ] ✅ **Multi Selection + Multi Actions** - Checkbox column + action column (multiple actions visible/menu)
- [ ] ✅ **Multi Selection + Single Action** - Checkbox column + single action column
- [ ] ⭕ **Multi Selection + Remove Action** - Checkbox column + delete/remove action only
- [ ] ⭕ **Multi Selection + No Actions** - Checkbox column only, no action column

#### Single Selection  
- [ ] ⭕ **Single Selection (Radio) + Multi Actions** - Radio column + action column (multiple actions visible/menu)
- [ ] ⭕ **Single Selection (Radio) + Single Action** - Radio column + single action column
- [ ] ⭕ **Single Selection (Radio) + No Actions** - Radio column only
- [ ] ⭕ **No Selection + Multi Actions** - No selection control, action column only

### Pinning Slot Configurations (4 Core Visual States)
The table's spatial structure is determined by which slots are in use. Multi-column pinning is **composition**, not a separate visual variant:

- [ ] ✅ **No Pinning** - All columns in main content slot (everything scrolls)
- [ ] ✅ **Pinned Left Only** - Pinned-left slot in use (with shadow), main slot scrolls
- [ ] ✅ **Pinned Right Only** - Pinned-right slot in use (with shadow), main slot scrolls
- [ ] ⭕ **Pinned Left + Right** - Both pinned slots in use (with shadows), main slot scrolls between

**Note:** Multi-column configurations (e.g., 2+ columns pinned left) are achieved by adding multiple columns to the pinned-left slot. This is composition, not a design variant. The visual treatment (shadow, spacing, z-index) is identical whether the pinned-left slot contains 1 or 3 columns.

---

## 6. ROW STATES & INTERACTIONS

### Row Selection States
- [ ] **Unselected** - Default row state
- [ ] **Selected** - Row highlighted (when checkbox/radio checked)
- [ ] **Hover** - Subtle background on mouse over
- [ ] **Hover + Selected** - Combined hover + selected states
- [ ] **Disabled Row** - Grayed out, non-interactive

### Row Height Variants
- [ ] **Compact** - Dense row (32px height)
- [ ] **Default** - Normal row (48px height)
- [ ] **Spacious** - Relaxed row (64px height)

### Multi-Row Selection States
- [ ] **No Rows Selected** - All checkboxes unchecked
- [ ] **Some Rows Selected** - Partial selection (header shows indeterminate checkbox)
- [ ] **All Rows Selected** - All checkboxes checked (header checkbox checked)
- [ ] **All Page Selected** - Current page selected (vs. all data selected state)

---

## 7. COMPOSITION PATTERNS (Design NOT Needed — Handled by Slots)

### Why These Aren't Separate Designs
The 19 cell variants (Text, Numeric, Badge, User, Image, etc.) are reusable building blocks. Combining them with Checkbox, Radio, or Action columns is **composition**, not a design variant. You design each cell type once, then compose rows by adding those cell types to slots alongside selection/action columns.

### Checkbox Column + Content Combinations
🔄 **Composition Pattern** — Achieved by placing Checkbox column in main/pinned slot alongside any cell type variant
- Checkbox + Text
- Checkbox + Numeric
- Checkbox + Badge
- Checkbox + User  
- Checkbox + Image
- Checkbox + Date-Time
(No separate designs needed; reuse existing cell type designs)

### Action Column Positions
- [ ] **Actions on Right** - Standard position (action column in rightmost main slot or pinned-right slot)
- [ ] **Actions on Left** - Alternative layout (action column in leftmost pinned-left slot)
- [ ] ⭕ **Actions in Row** - Inline within row (hover-revealed or always visible) — behavioral variant, needs design
- [ ] ⭕ **Actions Overflow Menu** - Kebab menu for 3+ actions — behavioral variant, needs design

### Radio Column + Content Combinations
🔄 **Composition Pattern** — Achieved by placing Radio column in main/pinned slot alongside any cell type variant
- Radio + Text
- Radio + Numeric
- Radio + Badge
- Radio + User
- Radio + Status/Tag
(No separate designs needed; reuse existing cell type designs)

---

## 8. SPECIAL STATES & EDGE CASES

### Placeholder/Empty States
- [ ] **Empty Table** - "No data" message (full table width)
- [ ] **Loading State** - Skeleton loaders in rows
- [ ] **Error State** - Error message + retry button
- [ ] **No Results** - Search/filter returned no matches

### Text Overflow & Truncation
- [ ] **Text Truncate (1 line)** - "Lorem ipsum dolo..." with ellipsis
- [ ] **Text Truncate (2 lines)** - Multi-line truncation
- [ ] **Text Truncate with Tooltip** - Show full text on hover
- [ ] **Very Long Numbers** - Scientific notation or abbreviated (e.g., "1.2M")
- [ ] **Very Long Identifiers** - Truncated with copy button

### Content-Specific States
- [ ] **User Avatar Fallback** - When image not available (initials)
- [ ] **Multiple Users Overflow** - "+3 more" when >4 users
- [ ] **Multiple Tags Overflow** - "+2 more" badge when too many tags
- [ ] **Action Disabled** - Grayed out action link (e.g., "View" on deleted item)
- [ ] **Action Loading** - Loading spinner on action link during async operation

### Keyboard & Accessibility States
- [ ] **Keyboard Focus (Row)** - Outline on full row for tab navigation
- [ ] **Keyboard Focus (Cell)** - Outline on individual cell
- [ ] **Keyboard Focus (Checkbox)** - Focus ring on checkbox
- [ ] **Keyboard Focus (Action)** - Focus ring on action links

---

## 9. RESPONSIVE VARIANTS

### Mobile/Tablet Layouts
- [ ] **Narrow Table** - Stack columns, hide non-essential ones
- [ ] **Horizontal Scroll** - Fixed columns scroll horizontally
- [ ] **Card Layout** - Rows as cards (mobile alternative)
- [ ] **Action Menu (Mobile)** - Swipe or tap for row menu

### Column Visibility Configurations
- [ ] **Show/Hide Column Controls** - Toggle columns on/off
- [ ] **Default Hidden Columns** - Optional columns visible via controls
- [ ] **Always-Visible Columns** - Pinned, cannot hide
- [ ] **Responsive Column Priority** - High-priority columns shown first on mobile

---

## 10. BULK ACTIONS & TOOLBARS

### Selection Toolbar States
- [ ] **No Selection** - Toolbar hidden
- [ ] **Rows Selected** - Toolbar appears with action buttons
- [ ] **All Rows Selected** - "Select All" option visible
- [ ] **Some Rows Selected** - Count display (e.g., "3 rows selected")

### Toolbar Action Types
- [ ] **Delete Selected** - Button + confirmation
- [ ] **Export Selected** - Export to CSV/JSON
- [ ] **Archive Selected** - Bulk archive
- [ ] **Change Status Selected** - Bulk status update
- [ ] **Custom Bulk Actions** - Extensible for any action

---

## 11. SORTING & FILTERING

### Sort State Indicators
- [ ] **No Sort** - Neutral icon (both directions)
- [ ] **Ascending Sort** - Up arrow icon
- [ ] **Descending Sort** - Down arrow icon
- [ ] **Multi-Column Sort** - Number badges showing sort order

### Filter Indicators
- [ ] **Column Filtered** - Filter icon with accent color
- [ ] **Active Filters Panel** - Show active filters with clear options
- [ ] **Saved Filters** - Dropdown with preset filter combinations

---

## 12. EXPANDABLE ROWS & NESTED CONTENT

### Row Expansion States
- [ ] **Collapsed Row** - Expand icon (chevron/arrow)
- [ ] **Expanded Row** - Collapse icon + nested content visible
- [ ] **Nested Content Area** - Full-width detail panel

### Row Nesting Levels
- [ ] **Level 1** - Top-level rows only
- [ ] **Level 2** - Nested 1 level deep
- [ ] **Level 3+** - Deeply nested (tree structure)

---

## 13. PAGINATION & VIRTUALIZATION

### Pagination Variants
- [ ] **Page Numbers** - 1 2 3 4 5 ...
- [ ] **Previous/Next Only** - < > navigation
- [ ] **Jump to Page** - Input field for page number
- [ ] **Row Count Selector** - "Show 10 / 25 / 50 rows"
- [ ] **Total Count Display** - "Showing 1-50 of 500"

### Virtualization States
- [ ] **Scroll Placeholder** - Skeleton rows while scrolling
- [ ] **Smooth Scroll** - Rows fade in/out smoothly
- [ ] **Jump Scroll** - Rows appear/disappear at boundaries

---

## 14. DENSE & COMPACT MODES

### Spacing Variants
- [ ] **Compact** - Minimal padding (24px height)
  - Checkbox/radio in compact
  - Text in compact
  - Actions in compact

- [ ] **Default** - Normal padding (48px height, current)
  - All variants at default

- [ ] **Spacious** - Extra padding (64px height)
  - All variants at spacious

---

## 15. THEMING & VISUAL VARIATIONS

### Color Modes
- [ ] **Light Mode** - Current default
- [ ] **Dark Mode** - Inverted colors, adjusted contrast

### Accent Row Highlights
- [ ] **Highlight Row (Info)** - Blue background
- [ ] **Highlight Row (Success)** - Green background
- [ ] **Highlight Row (Warning)** - Orange background
- [ ] **Highlight Row (Error)** - Red background

### Border & Divider Options
- [ ] **Borders** - Full grid (all cells)
- [ ] **Horizontal Only** - Between rows only
- [ ] **Vertical Only** - Between columns only
- [ ] **None** - No dividers

---

## SUMMARY STATISTICS

**Reusable Cell Building Blocks:** 19 (Text, Numeric, Badge, User, Image, Action, etc.)  
**Core Table Visual States:**
- Selection + Action combinations: 8
- Pinning slot configurations: 4
- Subtotal: 12 core visual states

**Already Designed in Figma:** ~5-7 core states + 19 cell types (mostly complete)

**Scope Reduction Through Composition:**
- Old approach: ~100+ combinations (multi-column pinning variants, checkbox+type combinations, etc.)
- New approach: 19 cell types + 12 core visual states + edge cases = ~50 total design items
- Reduction: Multi-column configurations handled by slot composition, not separate designs

**High Priority (Recommended Next):**

1. ⭕ **Single Selection (Radio) variants** - Radio button alternative to checkbox (3-4 states to design)
2. ⭕ **Multi Selection + Remove Action** - Common delete/bulk action pattern
3. ⭕ **Pinned Left + Right simultaneously** - Both slots in use (visual state with shadows)
4. ⭕ **Row hover/active states** - Critical for UX (hover, active, disabled, combinations)
5. ⭕ **Actions in Row (inline)** - Behavioral variant for inline action placement
6. ⭕ **Actions Overflow Menu** - Kebab menu for 3+ actions

**Medium Priority:**

7. ⭕ **Footer numeric summaries** - Sum, Average, Count, Min/Max aggregations
8. ⭕ **Header features** - Filterable, Resizable, Truncation, Tooltip
9. ⭕ **Loading & empty states** - Skeleton rows, "no data" message, error state
10. ⭕ **Keyboard focus states** - Focus rings (row, cell, checkbox, action)

**Lower Priority (Future):**

11. ⭕ **Mobile/responsive variants** - Card layout, narrow table, responsive priority
12. ⭕ **Expandable/nested rows** - Row expansion, nested content panel
13. ⭕ **Pagination & virtualization** - Page controls, scroll states
14. ⭕ **Dark mode** - Full theming coverage
15. ⭕ **Advanced bulk actions toolbar** - Selection states, action buttons

---

## APPENDIX: Composition Patterns (No Separate Design Needed)

These are achieved by composing existing cell type designs with Slot-based architecture. **No new Figma designs required** — just use existing cell type variants in different slot combinations.

### Multi-Column Pinning Patterns
🔄 **Pinned Left (Multiple Columns)**
- Design: Use existing "Pinned Left" cell styling
- Composition: Add 2+ cell type columns to pinned-left slot
- Visual result: First N columns sticky to left with shadow

🔄 **Pinned Right (Multiple Columns)**
- Design: Use existing "Pinned Right" cell styling
- Composition: Add 2+ cell type columns to pinned-right slot
- Visual result: Last N columns sticky to right with shadow

🔄 **Pinned Left + Right (Multiple on Each Side)**
- Design: Use existing "Pinned Left" + "Pinned Right" styling
- Composition: Add columns to both pinned-left and pinned-right slots
- Visual result: N columns sticky left, M columns sticky right, main area scrolls between

### Selection + Cell Type Combinations
🔄 **Checkbox + [Any Cell Type]**
- Design: Each cell type designed once (Text, Numeric, Badge, User, Image, etc.)
- Composition: Place Checkbox column + add any cell type columns to main slot
- Example: Checkbox + Text + Numeric + Action = 4 cells across, checkbox just a type variant

🔄 **Radio + [Any Cell Type]**
- Design: Each cell type designed once
- Composition: Place Radio column + add any cell type columns to main slot
- Example: Radio + Text + Badge = 3 cells across, radio just a type variant

### Content-Type Combinations
🔄 **[Any Selection] + [Any Cell Types] + [Any Action Position]**
- Design: Cell types (19), Selection types (checkbox/radio states), Action variants (multi/single/menu)
- Composition: Mix and match across slots based on table needs
- Example: Checkbox + Text + Numeric + Badge + Actions(right) = all reused existing designs

---

## QUICK REFERENCE: Figma Naming Convention

For organizing designs in Figma, use this naming pattern:

```
DataTable / [Configuration] / [State]

Examples:
- DataTable / Multi + Multi Actions / Default
- DataTable / Single + Single Action / Hover
- DataTable / Multi + Remove / Pinned Left
- DataTable / Cell Types / Checkbox Checked
- DataTable / Cell Types / Tag (Multiple)
- DataTable / States / Empty Table
- DataTable / States / Loading
- DataTable / Header / Sortable Ascending
- DataTable / Footer / Summary
- DataTable / Mobile / Card Layout
```

---

## NEXT STEPS

1. **Understand composition model** — Review "Appendix: Composition Patterns" above. Design cell types once, compose tables through Slot architecture.

2. **Audit what's already done** — Check Figma against:
   - All 19 cell types with their states (accent colors, truncation, overflow)
   - 8 selection + action core states
   - 4 pinning slot configurations
   - Row states (hover, active, disabled, combinations)

3. **Design high-priority gaps** (see Summary Statistics above):
   - Single Selection (Radio) variants (3-4 states)
   - Multi Selection + Remove Action pattern
   - Pinned Left + Right simultaneously
   - Row hover/active states
   - Actions in Row (inline) + Actions Overflow Menu

4. **Create reusable component library in Figma**:
   - Cell type variants (19 types × states) → reusable components
   - Row templates (selection type × action type × pinning slot) → reusable instances
   - Use slots/overrides for cell composition

5. **Update this checklist** as you design each variant (mark ✅)

6. **Reference code** at `src/components/Table/types.ts` for exact prop signatures and validation

7. **Test compositions** — Verify that combining existing cell type designs with different slot configurations produces consistent, visually correct tables