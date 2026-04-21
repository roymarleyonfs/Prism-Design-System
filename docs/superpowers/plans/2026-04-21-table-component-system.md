# Table Component System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement Phase 1 atomic table components (cells, headers, footers, columns) that work standalone or composed into a DataTable.

**Architecture:** Base DataCell wrapper → 9 cell variants → Column metadata → ColumnTemplate row orchestrator. TDD approach: failing test → minimal implementation → commit.

**Tech Stack:** React 18, TypeScript, Tailwind CSS, Vitest, forwardRef pattern, CSS variables from design tokens.

---

## File Structure

**Create:**
```
src/components/Table/
├── cells/
│   ├── DataCell.tsx
│   ├── HeaderCell.tsx
│   ├── FooterCell.tsx
│   └── variants/
│       ├── TextCell.tsx
│       ├── NumericCell.tsx
│       ├── DateTimeCell.tsx
│       ├── CheckboxCell.tsx
│       ├── BadgeCell.tsx
│       ├── UserCell.tsx
│       ├── ImageCell.tsx
│       ├── ActionCell.tsx
│       └── EmptyCell.tsx
├── Column.tsx
├── ColumnTemplate.tsx
├── TableRow.tsx
├── DataTable.tsx (Phase 2 placeholder)
├── types.ts
├── hooks/
│   └── useCellVariant.ts
├── tokens.ts
├── index.ts
└── __tests__/
    ├── DataCell.test.tsx
    ├── HeaderCell.test.tsx
    ├── FooterCell.test.tsx
    ├── variants/
    │   ├── TextCell.test.tsx
    │   ├── NumericCell.test.tsx
    │   ├── DateTimeCell.test.tsx
    │   ├── CheckboxCell.test.tsx
    │   ├── BadgeCell.test.tsx
    │   ├── UserCell.test.tsx
    │   ├── ImageCell.test.tsx
    │   ├── ActionCell.test.tsx
    │   └── EmptyCell.test.tsx
    ├── Column.test.tsx
    └── ColumnTemplate.test.tsx
```

---

### Task 1: Types & Constants

**Files:**
- Create: `src/components/Table/types.ts`

- [ ] **Step 1: Write types.ts with all interfaces**

```typescript
import React from 'react';

export type DataCellVariant =
  | 'text'
  | 'id'
  | 'numeric'
  | 'date-time'
  | 'checkbox'
  | 'radio'
  | 'badge'
  | 'tag'
  | 'tags'
  | 'user'
  | 'users'
  | 'image'
  | 'images'
  | 'action'
  | 'actions'
  | 'empty';

export type DataCellAccent = 'default' | 'success' | 'warning' | 'error';
export type DataCellStriped = 'white' | 'gray';
export type DataCellPinned = 'left' | 'right';

export interface DataCellProps extends React.HTMLAttributes<HTMLTableCellElement> {
  variant: DataCellVariant;
  children: React.ReactNode;
  accent?: DataCellAccent;
  striped?: DataCellStriped;
  pinned?: DataCellPinned;
}

export interface TextCellProps extends DataCellProps {
  variant: 'text' | 'id';
  children: string;
  truncate?: boolean;
}

export interface NumericCellProps extends DataCellProps {
  variant: 'numeric';
  value: number;
  format: 'plain' | 'suffix' | 'currency' | 'volume' | 'dimensions';
  suffix?: string;
  decimals?: number;
  locale?: string;
}

export interface DateTimeCellProps extends DataCellProps {
  variant: 'date-time';
  value: Date | string;
  format?: 'date' | 'time' | 'datetime';
  locale?: string;
}

export interface CheckboxCellProps extends DataCellProps {
  variant: 'checkbox' | 'radio';
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export interface BadgeCellProps extends DataCellProps {
  variant: 'badge' | 'tag' | 'tags';
  items: Array<{ label: string; color?: DataCellAccent }>;
  onRemove?: (index: number) => void;
}

export interface UserCellProps extends DataCellProps {
  variant: 'user' | 'users';
  users: Array<{ id: string; name: string; avatar?: string }>;
}

export interface ImageCellProps extends DataCellProps {
  variant: 'image' | 'images';
  images: Array<{ src: string; alt: string; id?: string }>;
}

export interface ActionCellProps extends DataCellProps {
  variant: 'action' | 'actions';
  items: Array<{ id: string; label: string; onClick: () => void; icon?: React.ReactNode; disabled?: boolean }>;
}

export interface EmptyCellProps extends DataCellProps {
  variant: 'empty';
}

export interface HeaderCellProps extends React.HTMLAttributes<HTMLTableCellElement> {
  variant: 'main' | 'check';
  children?: React.ReactNode;
  sortable?: boolean;
  onSort?: () => void;
}

export interface FooterCellProps extends React.HTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode;
}

export interface ColumnProps {
  header: string;
  accessor: string;
  variant: DataCellVariant;
  config?: Record<string, any>;
  pinned?: 'left' | 'right';
  width?: string;
  sortable?: boolean;
  filterable?: boolean;
  resizable?: boolean;
}

export interface ColumnTemplateProps extends React.HTMLAttributes<HTMLTableRowElement> {
  columns: ColumnProps[];
  data: Record<string, any>;
  rowIndex: number;
  selection?: 'none' | 'single' | 'multi';
  selectionCheckbox?: React.ReactNode;
  onCellClick?: (accessor: string, value: any) => void;
  pinnedLeftWidth?: number;
  pinnedRightWidth?: number;
}

export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  columns: ColumnProps[];
  data: Record<string, any>;
  rowIndex: number;
  selection?: 'none' | 'single' | 'multi';
  selectionCheckbox?: React.ReactNode;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Table/types.ts
git commit -m "feat: add table component types and interfaces"
```

---

### Task 2: Design Tokens Reference

**Files:**
- Create: `src/components/Table/tokens.ts`

- [ ] **Step 1: Write tokens.ts**

```typescript
// Design tokens for table components
// Referenced from src/tokens.css (generated from tokens/*.json)

export const TableTokens = {
  // Spacing
  cellPaddingX: 'var(--spacing-20)',
  cellPaddingY: 'var(--spacing-12)',
  cellGap: 'var(--spacing-4)',
  rowGap: 'var(--spacing-0)',

  // Heights
  headerRowHeight: '40px',
  dataRowHeight: '48px',
  footerRowHeight: '40px',

  // Colors
  bgWhite: 'white',
  bgGray: 'var(--color-primitive-neutral-gray-50)',
  bgHeader: 'var(--color-primitive-neutral-gray-50)',
  borderColor: 'var(--color-primitive-neutral-gray-200)',
  textPrimary: 'var(--color-primitive-neutral-gray-900)',
  textSecondary: 'var(--color-primitive-neutral-gray-700)',
  textSubtle: 'var(--color-primitive-neutral-gray-500)',

  // Badge colors
  badgeSuccessBg: 'var(--color-semantic-success-50)',
  badgeSuccessText: 'var(--color-primitive-success-green-700)',
  badgeWarningBg: 'var(--color-semantic-warning-50)',
  badgeWarningText: 'var(--color-primitive-warning-orange-700)',
  badgeErrorBg: 'var(--color-semantic-error-50)',
  badgeErrorText: 'var(--color-primitive-error-red-700)',
  badgeDefaultBg: 'var(--color-primitive-neutral-gray-100)',
  badgeDefaultText: 'var(--color-primitive-neutral-gray-900)',

  // Border
  borderWidth: '1px',

  // Radius
  cellRadius: 'var(--radius-6)',

  // Z-index for pinning
  pinnedLeftZ: '10',
  pinnedRightZ: '9',

  // Typography
  headerFontSize: 'text-caption-md',
  headerFontWeight: 'font-semibold',
  dataFontSize: 'text-body-md',
  dataFontWeight: 'font-regular',
} as const;
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Table/tokens.ts
git commit -m "feat: add table design token references"
```

---

### Task 3: useCellVariant Hook

**Files:**
- Create: `src/components/Table/hooks/useCellVariant.ts`

- [ ] **Step 1: Write useCellVariant hook**

```typescript
import { useMemo } from 'react';
import type { ColumnProps } from '../types';

export function useCellVariant(column: ColumnProps, value: any) {
  return useMemo(() => {
    return {
      variant: column.variant,
      config: column.config || {},
      value,
    };
  }, [column.variant, column.config, value]);
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Table/hooks/useCellVariant.ts
git commit -m "feat: add useCellVariant hook for column-to-cell resolution"
```

---

### Task 4: DataCell Base Component

**Files:**
- Create: `src/components/Table/cells/DataCell.tsx`
- Create: `src/components/Table/__tests__/DataCell.test.tsx`

- [ ] **Step 1: Write DataCell.test.tsx**

```typescript
import { render, screen } from '@testing-library/react';
import { DataCell } from '../cells/DataCell';
import { describe, it, expect } from 'vitest';

describe('DataCell', () => {
  it('renders a td element with children', () => {
    render(
      <table>
        <tbody>
          <tr>
            <DataCell variant="text">Test</DataCell>
          </tr>
        </tbody>
      </table>
    );
    const cell = screen.getByText('Test');
    expect(cell.tagName).toBe('TD');
  });

  it('applies striped class for gray variant', () => {
    render(
      <table>
        <tbody>
          <tr>
            <DataCell variant="text" striped="gray">
              Test
            </DataCell>
          </tr>
        </tbody>
      </table>
    );
    const cell = screen.getByText('Test');
    expect(cell.className).toContain('bg-[var(--color-primitive-neutral-gray-50)]');
  });

  it('applies striped class for white variant', () => {
    render(
      <table>
        <tbody>
          <tr>
            <DataCell variant="text" striped="white">
              Test
            </DataCell>
          </tr>
        </tbody>
      </table>
    );
    const cell = screen.getByText('Test');
    expect(cell.className).toContain('bg-white');
  });

  it('applies pinned-left sticky positioning', () => {
    render(
      <table>
        <tbody>
          <tr>
            <DataCell variant="text" pinned="left">
              Test
            </DataCell>
          </tr>
        </tbody>
      </table>
    );
    const cell = screen.getByText('Test');
    expect(cell.className).toContain('sticky');
    expect(cell.className).toContain('left-0');
    expect(cell.className).toContain('z-10');
  });

  it('applies pinned-right sticky positioning', () => {
    render(
      <table>
        <tbody>
          <tr>
            <DataCell variant="text" pinned="right">
              Test
            </DataCell>
          </tr>
        </tbody>
      </table>
    );
    const cell = screen.getByText('Test');
    expect(cell.className).toContain('sticky');
    expect(cell.className).toContain('right-0');
    expect(cell.className).toContain('z-9');
  });

  it('merges custom className', () => {
    render(
      <table>
        <tbody>
          <tr>
            <DataCell variant="text" className="custom-class">
              Test
            </DataCell>
          </tr>
        </tbody>
      </table>
    );
    const cell = screen.getByText('Test');
    expect(cell.className).toContain('custom-class');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm run test -- src/components/Table/__tests__/DataCell.test.tsx
```

Expected: FAIL - DataCell component not found

- [ ] **Step 3: Write DataCell.tsx**

```typescript
import { forwardRef } from 'react';
import type { DataCellProps } from '../types';

export const DataCell = forwardRef<HTMLTableCellElement, DataCellProps>(
  ({ variant, children, accent, striped, pinned, className = '', ...props }, ref) => {
    const baseClasses = [
      'px-[var(--spacing-20)] py-[var(--spacing-12)]',
      'text-body-md font-regular',
      'border-b border-[var(--color-primitive-neutral-gray-200)]',
      'text-[var(--color-primitive-neutral-gray-900)]',
    ];

    const stripingClasses =
      striped === 'gray'
        ? 'bg-[var(--color-primitive-neutral-gray-50)]'
        : striped === 'white'
          ? 'bg-white'
          : '';

    const pinnedClasses =
      pinned === 'left'
        ? 'sticky left-0 z-10 bg-white'
        : pinned === 'right'
          ? 'sticky right-0 z-9 bg-white'
          : '';

    const allClasses = [
      ...baseClasses,
      stripingClasses,
      pinnedClasses,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <td ref={ref} className={allClasses} {...props}>
        {children}
      </td>
    );
  }
);

DataCell.displayName = 'DataCell';
export default DataCell;
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npm run test -- src/components/Table/__tests__/DataCell.test.tsx
```

Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/Table/cells/DataCell.tsx src/components/Table/__tests__/DataCell.test.tsx
git commit -m "feat: add DataCell base component with striping and pinning"
```

---

### Task 5: HeaderCell Component

**Files:**
- Create: `src/components/Table/cells/HeaderCell.tsx`
- Create: `src/components/Table/__tests__/HeaderCell.test.tsx`

- [ ] **Step 1: Write HeaderCell.test.tsx**

```typescript
import { render, screen } from '@testing-library/react';
import { HeaderCell } from '../cells/HeaderCell';
import { describe, it, expect } from 'vitest';

describe('HeaderCell', () => {
  it('renders a th element with main variant', () => {
    render(
      <table>
        <thead>
          <tr>
            <HeaderCell variant="main">Column Name</HeaderCell>
          </tr>
        </thead>
      </table>
    );
    const cell = screen.getByText('Column Name');
    expect(cell.tagName).toBe('TH');
  });

  it('applies header styling', () => {
    render(
      <table>
        <thead>
          <tr>
            <HeaderCell variant="main">Column Name</HeaderCell>
          </tr>
        </thead>
      </table>
    );
    const cell = screen.getByText('Column Name');
    expect(cell.className).toContain('bg-[var(--color-primitive-neutral-gray-50)]');
    expect(cell.className).toContain('font-semibold');
    expect(cell.className).toContain('text-caption-md');
  });

  it('renders check variant for selection header', () => {
    render(
      <table>
        <thead>
          <tr>
            <HeaderCell variant="check" />
          </tr>
        </thead>
      </table>
    );
    const cells = screen.getAllByRole('columnheader');
    expect(cells.length).toBeGreaterThan(0);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm run test -- src/components/Table/__tests__/HeaderCell.test.tsx
```

- [ ] **Step 3: Write HeaderCell.tsx**

```typescript
import { forwardRef } from 'react';
import type { HeaderCellProps } from '../types';

export const HeaderCell = forwardRef<HTMLTableCellElement, HeaderCellProps>(
  ({ variant, children, sortable, onSort, className = '', ...props }, ref) => {
    const baseClasses = [
      'px-[var(--spacing-20)] py-[var(--spacing-12)]',
      'h-10',
      'bg-[var(--color-primitive-neutral-gray-50)]',
      'text-caption-md font-semibold',
      'text-[var(--color-primitive-neutral-gray-900)]',
      'border-b border-[var(--color-primitive-neutral-gray-200)]',
      'text-left',
    ];

    const allClasses = [...baseClasses, className].filter(Boolean).join(' ');

    return (
      <th ref={ref} className={allClasses} {...props}>
        {children}
      </th>
    );
  }
);

HeaderCell.displayName = 'HeaderCell';
export default HeaderCell;
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npm run test -- src/components/Table/__tests__/HeaderCell.test.tsx
```

- [ ] **Step 5: Commit**

```bash
git add src/components/Table/cells/HeaderCell.tsx src/components/Table/__tests__/HeaderCell.test.tsx
git commit -m "feat: add HeaderCell component for column headers"
```

---

### Task 6: FooterCell Component

**Files:**
- Create: `src/components/Table/cells/FooterCell.tsx`
- Create: `src/components/Table/__tests__/FooterCell.test.tsx`

- [ ] **Step 1: Write FooterCell.test.tsx**

```typescript
import { render, screen } from '@testing-library/react';
import { FooterCell } from '../cells/FooterCell';
import { describe, it, expect } from 'vitest';

describe('FooterCell', () => {
  it('renders a td element with footer styling', () => {
    render(
      <table>
        <tfoot>
          <tr>
            <FooterCell>Total</FooterCell>
          </tr>
        </tfoot>
      </table>
    );
    const cell = screen.getByText('Total');
    expect(cell.tagName).toBe('TD');
  });

  it('applies footer-specific styling', () => {
    render(
      <table>
        <tfoot>
          <tr>
            <FooterCell>Total</FooterCell>
          </tr>
        </tfoot>
      </table>
    );
    const cell = screen.getByText('Total');
    expect(cell.className).toContain('bg-[var(--color-primitive-neutral-gray-50)]');
    expect(cell.className).toContain('font-semibold');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm run test -- src/components/Table/__tests__/FooterCell.test.tsx
```

- [ ] **Step 3: Write FooterCell.tsx**

```typescript
import { forwardRef } from 'react';
import type { FooterCellProps } from '../types';

export const FooterCell = forwardRef<HTMLTableCellElement, FooterCellProps>(
  ({ children, className = '', ...props }, ref) => {
    const baseClasses = [
      'px-[var(--spacing-20)] py-[var(--spacing-12)]',
      'h-10',
      'bg-[var(--color-primitive-neutral-gray-50)]',
      'text-caption-md font-semibold',
      'text-[var(--color-primitive-neutral-gray-900)]',
      'border-t border-[var(--color-primitive-neutral-gray-200)]',
    ];

    const allClasses = [...baseClasses, className].filter(Boolean).join(' ');

    return (
      <td ref={ref} className={allClasses} {...props}>
        {children}
      </td>
    );
  }
);

FooterCell.displayName = 'FooterCell';
export default FooterCell;
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npm run test -- src/components/Table/__tests__/FooterCell.test.tsx
```

- [ ] **Step 5: Commit**

```bash
git add src/components/Table/cells/FooterCell.tsx src/components/Table/__tests__/FooterCell.test.tsx
git commit -m "feat: add FooterCell component for summary rows"
```

---

## Next Steps (Tasks 7-12)

Continue with remaining cell variants (TextCell, NumericCell, DateTimeCell, CheckboxCell, BadgeCell, UserCell, ImageCell, ActionCell, EmptyCell), then Column, ColumnTemplate, TableRow, and public exports. Use same TDD pattern for each.

Plan continues in next segment due to token limits.
