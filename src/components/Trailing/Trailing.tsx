import { forwardRef, HTMLAttributes, ReactNode } from 'react';

// Figma node: 1944-18063
export interface TrailingProps extends HTMLAttributes<HTMLDivElement> {
  beforeSuffix?: boolean;
  beforeSuffixAction1?: boolean;
  beforeSuffixAction2?: boolean;
  suffix?: boolean;
  suffixDropdown?: boolean;
  afterSuffix?: boolean;
  afterSuffixAction1?: boolean;
  afterSuffixAction2?: boolean;
  suffixText?: ReactNode;
  iconBefore1?: ReactNode;
  iconBefore2?: ReactNode;
  iconAfter1?: ReactNode;
  iconAfter2?: ReactNode;
  iconDropdown?: ReactNode;
}

const TRAILING_CONTAINER = 'flex gap-0 items-center min-h-[32px] p-0 relative';
const ACTION_GROUP = 'flex gap-px items-center p-0 relative shrink-0';
const ACTION_BUTTON =
  'flex gap-0 h-8 items-center justify-center max-h-8 max-w-8 min-w-8 overflow-clip p-2 relative rounded-[var(--radius-4,6px)] shrink-0';
const DIVIDER = 'h-4 relative shrink-0 w-0';
const SUFFIX_LABEL = 'flex gap-[2px] items-center px-1 py-0 relative shrink-0';
const SUFFIX_TEXT =
  'text-[color:var(--semantics-text-on-fill-subtle-secondary,#6a6b6d)] text-[length:var(--Text-Body-md-Size,14px)] font-[var(--Weight-Regular,450)] leading-[var(--Text-Body-md-LineHeight,18px)] whitespace-nowrap';

const DefaultIcon = () => (
  <svg className="size-4" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 1a7 7 0 100 14 7 7 0 000-14zm0 12a5 5 0 110-10 5 5 0 010 10z" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg className="size-4" viewBox="0 0 16 16" fill="none">
    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const DividerLine = () => (
  <svg className="w-px h-4" viewBox="0 0 1 16" fill="none">
    <line x1="0.5" y1="0" x2="0.5" y2="16" stroke="currentColor" strokeWidth="1" />
  </svg>
);

const Trailing = forwardRef<HTMLDivElement, TrailingProps>(
  (
    {
      className,
      beforeSuffix = false,
      beforeSuffixAction1 = true,
      beforeSuffixAction2 = true,
      suffix = true,
      suffixDropdown = false,
      afterSuffix = true,
      afterSuffixAction1 = true,
      afterSuffixAction2 = false,
      suffixText = 'Suffix',
      iconBefore1,
      iconBefore2,
      iconAfter1,
      iconAfter2,
      iconDropdown,
      ...props
    },
    ref
  ) => {
    return (
      <div ref={ref} className={className || TRAILING_CONTAINER} data-node-id="1944:18063" {...props}>
        {/* Before Suffix Actions */}
        {beforeSuffix && (
          <div className={ACTION_GROUP}>
            {beforeSuffixAction1 && (
              <button
                className={`${ACTION_BUTTON} bg-[var(--semantics-fill-status-subtle-tertiary-background-hover,rgba(245,245,245,0.15))]`}
                type="button"
                aria-label="Action before suffix 1"
              >
                {iconBefore1 || <DefaultIcon />}
              </button>
            )}
            {beforeSuffixAction2 && <div className={DIVIDER}>{<DividerLine />}</div>}
            {beforeSuffixAction2 && (
              <button
                className={`${ACTION_BUTTON} bg-[var(--semantics-fill-status-subtle-tertiary-background-hover,rgba(245,245,245,0.15))]`}
                type="button"
                aria-label="Action before suffix 2"
              >
                {iconBefore2 || <DefaultIcon />}
              </button>
            )}
          </div>
        )}

        {/* Suffix Text */}
        {suffix && (
          <div className={SUFFIX_LABEL}>
            <p className={SUFFIX_TEXT}>{suffixText}</p>
            {suffixDropdown && (
              <div className="flex items-center justify-center size-4">
                {iconDropdown || <ChevronDownIcon />}
              </div>
            )}
          </div>
        )}

        {/* After Suffix Actions */}
        {afterSuffix && (
          <div className={ACTION_GROUP}>
            {afterSuffixAction1 && (
              <button className={`${ACTION_BUTTON} bg-transparent`} type="button" aria-label="Action after suffix 1">
                {iconAfter1 || <DefaultIcon />}
              </button>
            )}
            {afterSuffixAction2 && <div className={DIVIDER}>{<DividerLine />}</div>}
            {afterSuffixAction2 && (
              <button className={`${ACTION_BUTTON} bg-transparent`} type="button" aria-label="Action after suffix 2">
                {iconAfter2 || <DefaultIcon />}
              </button>
            )}
          </div>
        )}
      </div>
    );
  }
);

Trailing.displayName = 'Trailing';

export default Trailing;
