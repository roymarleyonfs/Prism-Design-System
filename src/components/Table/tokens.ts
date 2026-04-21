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
