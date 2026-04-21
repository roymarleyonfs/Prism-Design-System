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
