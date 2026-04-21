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
