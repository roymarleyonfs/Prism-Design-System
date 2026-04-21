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
