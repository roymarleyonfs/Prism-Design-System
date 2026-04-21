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
