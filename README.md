# Prism Design System

React component library for MobileSentrix Backend products.  
Source of truth: [Prism Design System (Figma)](https://www.figma.com/design/Y7cCiUPph5BjjWtQZ6r8lG/Prism-Design-System)

---

## Stack

| Layer | Tool |
|---|---|
| Framework | React 18 + TypeScript |
| Styling | Tailwind CSS (custom config generated from tokens) |
| Token pipeline | `scripts/build-tokens.js` → `src/tokens.css` + `tailwind.config.ts` |
| Build | Vite |

---

## Getting started

```bash
npm install
npm run build:tokens   # generate tokens.css + tailwind.config.ts from tokens/*.json
npm run dev            # start dev server
```

---

## Memory & Collaboration

**Claude Code Memory Protocol:**  
This project uses Claude's persistent memory system for collaboration context. Whenever memory is compacted or updated, the summary is automatically saved to `@Prompts/Compacted memory.md`. This file serves as the single source of truth for:
- Project context and ongoing goals
- Technical patterns and architectural decisions
- Known issues, blockers, and resolutions
- Component implementation status and validation results

**For team members:** Review `@Prompts/Compacted memory.md` when picking up work to understand the current state, recent changes, and any pending tasks.

---

## Token pipeline

Tokens live in `tokens/` as JSON, sourced directly from Figma Variables.  
Run `npm run build:tokens` any time variables are updated in Figma.

```
tokens/
├── colors.json       ← primitives + semantic layer
├── spacing.json      ← 38 spacing values
├── radius.json       ← 18 radius values
├── typography.json   ← Inter + Roboto Mono, full type scale
└── breakpoints.json  ← desktop-first (md: 1440px, lg: 1921px)
```

---

## Components

### Button

Matches Prism DS Button component set (node: `361:3849`).

```tsx
import { Button } from './src';

// Variants
<Button variant="primary">Save</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="subtle">View</Button>
<Button variant="primary-destructive">Delete</Button>
<Button variant="secondary-destructive">Remove</Button>
<Button variant="warning">Force Submit</Button>

// Sizes: lg | md (default) | sm | tiny
<Button size="sm">Small</Button>

// With icon
<Button iconPosition="leading" icon={<IconPlus />}>Add Item</Button>
<Button iconPosition="icon-only" icon={<IconEdit />} />

// States
<Button loading>Saving...</Button>
<Button disabled>Unavailable</Button>
<Button floating variant="primary" iconPosition="icon-only" icon={<IconPlus />} />
```

### Card

Matches Prism DS Card Template/White and Card Template/Grey.

```tsx
import { Card } from './src';

// With header
<Card title="Product Details" description="Essential product information" variant="white">
  {/* content */}
</Card>

// With trailing action in header
<Card title="Orders" trailing={<Button size="sm">Export</Button>}>
  {/* content */}
</Card>

// Grey surface variant
<Card variant="grey" title="Summary">
  {/* content */}
</Card>

// No padding (for full-bleed content like tables)
<Card title="Order List" noPadding>
  <table>...</table>
</Card>
```

---

## Breakpoints

Desktop-first. Mobile breakpoints to be added in a future migration pass.

| Breakpoint | Min width | Nav state |
|---|---|---|
| `md` | 1440px | expanded / collapsed |
| `lg` | 1921px | expanded / collapsed |

---

## Roadmap

- [ ] Checkbox component
- [ ] Text Field component  
- [ ] Badge / Tag component
- [ ] Storybook (v0.3)
- [ ] Mobile breakpoints + Responsive DS token sync
- [ ] npm package publish
