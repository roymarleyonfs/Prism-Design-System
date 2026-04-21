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
