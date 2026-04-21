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
