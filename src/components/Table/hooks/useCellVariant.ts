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
