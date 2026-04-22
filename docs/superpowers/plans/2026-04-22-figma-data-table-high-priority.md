# Figma Library — Data Table High Priority Components

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Generate 6 high-priority Data Table Figma components into the Optimizing-Table file, derived directly from the codebase.

**Architecture:** Code-first single pass — all relevant source files were read upfront and their values are baked into this plan. Generate all 6 components sequentially in the Optimizing-Table Figma file using the `figma:figma-generate-library` skill. Each task is self-contained.

**Tech Stack:** Figma MCP (`mcp__claude_ai_Figma__*`), `figma:figma-generate-library` skill. No new code files — only one type update and a checklist update at the end.

---

## Token Reference (pre-extracted — do not re-read source files)

| Token | Hex | Use |
|---|---|---|
| neutral.default | `#ffffff` | White stripe bg, pinned cell bg |
| neutral.gray-50 | `#f5f5f5` | Gray stripe bg, header/footer bg, hover overlay |
| neutral.gray-100 | `#ebebeb` | Hover on gray-striped row |
| neutral.gray-200 | `#e0e0e0` | Row/header border, dropdown border |
| neutral.gray-400 | `#cccccc` | Disabled text, disabled control border |
| neutral.gray-800 | `#6a6b6d` | Kebab icon color, secondary text |
| neutral.gray-900 | `#1b1f22` | Primary text, shadow base color |
| brand.blue-50 | `#e5f2ff` | Selected row background |
| brand.blue-100 | `#b7dbff` | Hover + selected row background |
| brand.blue-500 | `#0084ff` | Checked radio/checkbox fill, action link text |
| error.red-500 | `#da3e37` | Destructive action text |
| success.green-500 | `#00935c` | Active/success badge text |
| warning.orange-500 | `#f58700` | Pending/warning badge text |

**Standard dimensions (from DataCell.tsx):**
- Data row height: 48px
- Header / Footer row height: 40px
- Cell padding: 20px horizontal, 12px vertical
- Checkbox / Radio column width: 48px
- Border: 1px solid `#e0e0e0` (bottom on data cells, bottom on header, top on footer)
- Pinned shadow: `x=4, y=0, blur=8, spread=0, color=rgba(27,31,34,0.12)` (left pin right-edge); flip x to -4 for right pin left-edge

**Figma target file:** key `S9ZjLU7KVD3VV6THh2TI7z` (Optimizing-Table)

---

## Task 1: Verify File Access and Audit Existing Components

**Files:** None (read-only Figma)

- [ ] **Step 1: Load figma-generate-library skill**

Invoke skill: `figma:figma-generate-library`

- [ ] **Step 2: Confirm file access**

Call `mcp__claude_ai_Figma__get_metadata` with `fileKey: "S9ZjLU7KVD3VV6THh2TI7z"`.

Expected: response contains file name with "Table" or "Optimizing". If the call fails or returns an error, stop — do not proceed to generation tasks.

- [ ] **Step 3: Check for existing DataTable components**

Call `mcp__claude_ai_Figma__search_design_system` with query `"DataTable"` in file `S9ZjLU7KVD3VV6THh2TI7z`.

Record any existing components whose names start with `DataTable /`. This avoids duplication. If `DataTable / Cell / Radio` already exists, skip Task 2.

---

## Task 2: Generate Radio Selection Variants

**Creates:**
- Figma component `DataTable / Cell / Radio`
- Figma component `DataTable / Header / Radio`

- [ ] **Step 1: Generate `DataTable / Cell / Radio`**

Using `figma:figma-generate-library`, create a Figma component in file `S9ZjLU7KVD3VV6THh2TI7z`:

```
Name: DataTable / Cell / Radio
Auto-layout: Horizontal, align center, padding 20px H / 12px V
Width: 48px, Height: 48px

Variant property "State": Unchecked | Checked | Disabled
Variant property "Striped": White | Gray

Background fill:
  Striped=White → #ffffff
  Striped=Gray  → #f5f5f5

Radio circle (16×16px, centered):
  State=Unchecked → border 2px #1b1f22, fill none
  State=Checked   → border 2px #0084ff, fill #0084ff; inner white dot 8×8px #ffffff centered
  State=Disabled  → border 2px #cccccc, fill none; layer opacity 40%

Bottom border: 1px #e0e0e0
```

Total: 6 variants (3 State × 2 Striped).

- [ ] **Step 2: Generate `DataTable / Header / Radio`**

Using `figma:figma-generate-library`, create a Figma component in file `S9ZjLU7KVD3VV6THh2TI7z`:

```
Name: DataTable / Header / Radio
Auto-layout: Horizontal, align center, padding 20px H / 12px V
Width: 48px, Height: 40px
Fill: #f5f5f5
Content: empty (no select-all control — radio columns don't support select-all)
Bottom border: 1px #e0e0e0
```

- [ ] **Step 3: Verify with screenshot**

Call `mcp__claude_ai_Figma__get_screenshot` on the `DataTable / Cell / Radio` component node.

Confirm:
- 6 variants visible in the component set
- Unchecked: plain circle outline
- Checked: filled blue circle with white dot
- Disabled: gray outline, clearly muted

---

## Task 3: Generate Multi Selection + Remove Action

**Creates:** Figma frame `DataTable / Config / Multi + Remove`

- [ ] **Step 1: Generate the configuration frame**

Using `figma:figma-generate-library`, create a fixed-size reference frame in file `S9ZjLU7KVD3VV6THh2TI7z`:

```
Name: DataTable / Config / Multi + Remove
Type: Frame (not a component — this is a reference layout)
Width: 728px, Height: auto (fit content)
Auto-layout: Vertical

── Header row (height 40px, fill #f5f5f5, border-bottom 1px #e0e0e0) ──
  Col A  48px   "☑" — check header (select-all checkbox, mixed/indeterminate state shown)
  Col B  240px  "Name" — main header, sortable (show ↕ bidirectional icon)
  Col C  160px  "Status" — main header
  Col D  160px  "Date" — main header
  Col E  120px  "" — action header (empty label, right-aligned)

── Row 1 (height 48px, fill #ffffff, border-bottom 1px #e0e0e0) ──
  Col A  48px   Checkbox unchecked (border 2px #1b1f22, fill none)
  Col B  240px  "Acme Corporation" (text #1b1f22)
  Col C  160px  Badge "Active" (text #00935c, bg #d8ede5, border-radius 4px, padding 4px 8px)
  Col D  160px  "Mar 15, 2025" (text #1b1f22)
  Col E  120px  Trash icon 16×16px, color #da3e37, right-aligned

── Row 2 (height 48px, fill #e5f2ff [selected], border-bottom 1px #e0e0e0) ──
  Col A  48px   Checkbox checked (border 2px #0084ff, fill #0084ff, checkmark #ffffff)
  Col B  240px  "Beta Industries" (text #1b1f22)
  Col C  160px  Badge "Pending" (text #f58700, bg #fff3e5)
  Col D  160px  "Apr 2, 2025"
  Col E  120px  Trash icon #da3e37, right-aligned

── Row 3 (height 48px, fill #f5f5f5, border-bottom 1px #e0e0e0) ──
  Col A  48px   Checkbox unchecked
  Col B  240px  "Gamma LLC"
  Col C  160px  Badge "Inactive" (text #6a6b6d, bg #f5f5f5, border 1px #e0e0e0)
  Col D  160px  "Apr 10, 2025"
  Col E  120px  Trash icon #da3e37, right-aligned

Pinning annotations (text labels on the frame canvas, not inside cells):
  Above Col A: "pinned=left · sticky left-0 z-10"
  Above Col E: "pinned=right · sticky right-0 z-9"
  Drop shadow on Col A right edge: x=4, y=0, blur=8, color=rgba(27,31,34,0.12)
  Drop shadow on Col E left edge:  x=-4, y=0, blur=8, color=rgba(27,31,34,0.12)
```

- [ ] **Step 2: Verify with screenshot**

Call `mcp__claude_ai_Figma__get_screenshot` on the frame node.

Confirm:
- 5 columns, 4 rows (1 header + 3 data)
- Row 2 has blue-50 (#e5f2ff) background (selected)
- Trash icon is red (#da3e37) in action column
- Shadow annotations visible on Col A and Col E edges

---

## Task 4: Generate Pinned Left + Right Simultaneously

**Creates:** Figma frame `DataTable / Config / Pinned Both`

- [ ] **Step 1: Generate the configuration frame**

Using `figma:figma-generate-library`, create a fixed-size reference frame in file `S9ZjLU7KVD3VV6THh2TI7z`:

```
Name: DataTable / Config / Pinned Both
Type: Frame
Width: 800px, Height: auto (fit content)
Auto-layout: Vertical

── Header row (height 40px, fill #f5f5f5, border-bottom 1px #e0e0e0) ──
  Region A  200px  "Product Name" — pinned left header
  Region B  400px  "SKU · · · · · · · Quantity" — main header (show two column labels
                    separated by dashed line to indicate scrollable area)
  Region C  200px  "Actions" — pinned right header

── Rows 1–3 (height 48px each, alternating #ffffff / #f5f5f5) ──
  Region A  200px  TextCell content (e.g., "Widget Pro", "Gear Set", "Cable Kit")
  Region B  400px  Two columns with dashed overflow indicator left/right edges
                    (dashed vertical line at x=0 and x=400 of region, color #e0e0e0,
                    to visually communicate horizontal scroll)
  Region C  200px  ActionCell "Edit" link (#0084ff) + "Delete" link (#da3e37)

Pinning visual treatments:
  Region A right edge: drop shadow x=4, y=0, blur=8, rgba(27,31,34,0.12)
  Region C left edge:  drop shadow x=-4, y=0, blur=8, rgba(27,31,34,0.12)

Canvas annotations (text outside frame boundary):
  Left of Region A:  "pinned=left · sticky left-0 z-10"
  Right of Region C: "pinned=right · sticky right-0 z-9"
  Above Region B:    "main slot · scrolls horizontally ↔"
  Below frame:       "Shadow token: rgba(27,31,34,0.12) = neutral.gray-900 at 12% opacity"
                     "Code: DataCellProps.pinned = 'left' | 'right'"
```

- [ ] **Step 2: Verify with screenshot**

Call `mcp__claude_ai_Figma__get_screenshot` on the frame node.

Confirm:
- 3 distinct visual regions visible
- Shadows on inner edges of left and right pinned regions
- Dashed scroll overflow indicator in main region
- Token annotation readable below frame

---

## Task 5: Generate Row Hover / Active States

**Creates:** Figma component `DataTable / Row / States`

- [ ] **Step 1: Generate the Row States component**

Using `figma:figma-generate-library`, create a Figma component in file `S9ZjLU7KVD3VV6THh2TI7z`:

```
Name: DataTable / Row / States
Auto-layout: Horizontal, align center
Width: 728px, Height: 48px

Variant property "State": Default | Hover | Selected | Hover Selected | Disabled
Variant property "Striped": White | Gray

Each variant contains these columns (left to right):
  Col A  48px   CheckboxCell
  Col B  240px  TextCell "Acme Corporation"
  Col C  160px  BadgeCell "Active" (text #00935c, bg #d8ede5)
  Col D  160px  DateCell "Mar 15, 2025"
  Col E  120px  ActionCell "Edit" (text #0084ff)

Background fills:
  Default / White:        #ffffff
  Default / Gray:         #f5f5f5
  Hover / White:          #f5f5f5
  Hover / Gray:           #ebebeb
  Selected / White:       #e5f2ff
  Selected / Gray:        #e5f2ff  (selection color overrides stripe)
  Hover Selected / White: #b7dbff
  Hover Selected / Gray:  #b7dbff  (selection color overrides stripe)
  Disabled / White:       #ffffff
  Disabled / Gray:        #f5f5f5

Disabled state — apply to all child elements in variant:
  Col A checkbox: border 2px #cccccc, fill none
  Col B–E text:   color #cccccc (neutral.gray-400)
  Col E action:   color #cccccc
  Do NOT change row background — only content becomes muted

Bottom border: 1px #e0e0e0 on all variants
```

Total: 10 variants (5 State × 2 Striped).

- [ ] **Step 2: Verify with screenshot**

Call `mcp__claude_ai_Figma__get_screenshot` on the `DataTable / Row / States` component node.

Confirm:
- 10 variants in grid
- Blue tones on Selected / Hover Selected variants
- Disabled row text visibly gray vs Default

---

## Task 6: Generate Actions in Row (Inline)

**Creates:** Figma component `DataTable / Cell / Actions / Inline`

- [ ] **Step 1: Generate the Inline Actions Cell component**

Using `figma:figma-generate-library`, create a Figma component in file `S9ZjLU7KVD3VV6THh2TI7z`:

```
Name: DataTable / Cell / Actions / Inline
Auto-layout: Horizontal, align center, gap=8px
Height: 48px, Width: hug content
Padding: 20px H / 12px V

Variant property "Visibility": Always | Hover
Variant property "Count": 1 | 2 | 3

Action link element spec:
  Typography: body-md, no underline at rest
  "Edit":   color #0084ff (brand.blue-500)
  "View":   color #0084ff (brand.blue-500)
  "Delete": color #da3e37 (error.red-500)

Vertical divider between links: 1px line, height=16px, color #e0e0e0

Count=1: [Edit]
Count=2: [Edit] | divider | [Delete]
Count=3: [Edit] | divider | [View] | divider | [Delete]

Visibility=Always:  all action links opacity 1.0
Visibility=Hover:   all action links opacity 0.0
  + Add a dashed 1px border around the full cell in color #cccccc
  + Add annotation label inside cell: "opacity: 0 → 1 on row :hover"
  (The dashed border and label exist only in the Figma variant to make
   the invisible state visible to designers. They don't represent code.)

Bottom border: 1px #e0e0e0
```

Total: 6 variants (2 Visibility × 3 Count).

- [ ] **Step 2: Verify with screenshot**

Call `mcp__claude_ai_Figma__get_screenshot` on the component node.

Confirm:
- 6 variants
- Hover variants show dashed outline + annotation (links invisible)
- Always variants show full-opacity links
- Dividers appear between links in Count=2 and Count=3

---

## Task 7: Generate Actions Overflow Menu

**Creates:** Figma component `DataTable / Cell / Actions / Overflow`

- [ ] **Step 1: Generate the Overflow Menu Cell component**

Using `figma:figma-generate-library`, create a Figma component in file `S9ZjLU7KVD3VV6THh2TI7z`:

```
Name: DataTable / Cell / Actions / Overflow
Auto-layout: Horizontal, align center
Width: 48px, Height: 48px
Padding: 20px H / 12px V

Variant property "Menu": Closed | Open
Variant property "Item State": Default | Disabled | Destructive

Kebab icon (⋮):
  Size: 16×16px, centered in cell
  Color: #6a6b6d (neutral.gray-800)
  Always visible in all variants

Menu=Closed:
  No dropdown — icon only

Menu=Open:
  Kebab icon (same as closed)
  Dropdown panel (absolutely positioned, overlapping row below):
    Width: 180px
    Background: #ffffff
    Border: 1px #e0e0e0, border-radius 6px
    Drop shadow: x=0, y=4, blur=12, rgba(27,31,34,0.12)
    Position: below and left-aligned with icon

    Three menu items (height 36px each, padding 12px H):
      Item "Edit":
        Left icon: pencil 14×14px, color #6a6b6d
        Label: "Edit", text #1b1f22
      Item "View":
        Left icon: eye 14×14px, color #6a6b6d
        Label: "View", text #1b1f22
      Item "Delete":
        Left icon: trash 14×14px
        Label: "Delete"

    Item State applies to all three items simultaneously:
      Default:     icon+text #1b1f22 / #6a6b6d, hover bg #f5f5f5 (annotate hover)
      Disabled:    icon+text #cccccc, cursor not-allowed (add annotation label)
      Destructive: icon+text #da3e37 on all three items (entire menu is destructive-toned)

Bottom border on cell: 1px #e0e0e0
```

Total: 6 variants (2 Menu × 3 Item State).

- [ ] **Step 2: Verify with screenshot**

Call `mcp__claude_ai_Figma__get_screenshot` on the component node.

Confirm:
- Closed variants: only kebab icon visible
- Open variants: dropdown panel with 3 labeled items
- Destructive variant: all menu item text in red (#da3e37)
- Disabled variant: all menu item text in gray (#cccccc)

---

## Task 8: Update Types and Checklist

**Files:**
- Modify: `src/components/Table/types.ts` (line 88)
- Modify: `DATA_TABLE_VARIANTS_CHECKLIST.md`

- [ ] **Step 1: Add `radio` to HeaderCellProps variant**

In `src/components/Table/types.ts`, find line 88:

```typescript
export interface HeaderCellProps extends React.HTMLAttributes<HTMLTableCellElement> {
  variant: 'main' | 'check';
```

Change to:

```typescript
export interface HeaderCellProps extends React.HTMLAttributes<HTMLTableCellElement> {
  variant: 'main' | 'check' | 'radio';
```

- [ ] **Step 2: Mark checklist items complete**

In `DATA_TABLE_VARIANTS_CHECKLIST.md`, make these changes:

Section 3 — HEADER CELL VARIANTS:
```
- [ ] **Radio Header** - Radio column header (empty/no select-all)
→ - [x] ✅ **Radio Header** - Radio column header (empty/no select-all)
```

Section 2 — CELL STATES & MODIFIERS:
```
- [ ] **Hover State** - Subtle highlight on row hover
→ - [x] ✅ **Hover State** - Subtle highlight on row hover

- [ ] **Active State** - Currently selected row emphasis
→ - [x] ✅ **Active State** - Currently selected row emphasis

- [ ] **Disabled State** - Reduced opacity/grayed out
→ - [x] ✅ **Disabled State** - Reduced opacity/grayed out
```

Section 5 — TABLE-LEVEL VISUAL STATES:
```
- [ ] ⭕ **Multi Selection + Remove Action**
→ - [x] ✅ **Multi Selection + Remove Action**

- [ ] ⭕ **Pinned Left + Right**
→ - [x] ✅ **Pinned Left + Right**
```

Section 7 — COMPOSITION PATTERNS:
```
- [ ] ⭕ **Actions in Row** - Inline within row
→ - [x] ✅ **Actions in Row** - Inline within row

- [ ] ⭕ **Actions Overflow Menu** - Kebab menu for 3+ actions
→ - [x] ✅ **Actions Overflow Menu** - Kebab menu for 3+ actions
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Table/types.ts DATA_TABLE_VARIANTS_CHECKLIST.md
git commit -m "feat: add radio header variant and mark high-priority table designs complete

- HeaderCellProps.variant now includes 'radio'
- DATA_TABLE_VARIANTS_CHECKLIST: mark 8 high-priority items as designed in Figma
  (Radio cell/header, Multi+Remove config, Pinned Both config,
   Row hover/active/disabled states, Actions inline, Actions overflow menu)"
```
