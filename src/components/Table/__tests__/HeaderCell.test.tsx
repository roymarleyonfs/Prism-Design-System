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
