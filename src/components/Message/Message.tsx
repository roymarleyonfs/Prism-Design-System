import { forwardRef, HTMLAttributes, ReactNode } from 'react';

// Figma node: 3514-111253
export type MessageType = 'Helper Text' | 'Inline Alert';
export type MessageState = 'Rest' | 'Destructive' | 'Warning' | 'Disabled' | 'Info';

export interface MessageProps extends HTMLAttributes<HTMLDivElement> {
  type?: MessageType;
  state?: MessageState;
  label?: ReactNode;
  message?: ReactNode;
  showIcon?: boolean;
  showAction?: boolean;
}

const HELPER_TEXT_STYLES: Record<MessageState, string> = {
  Rest: 'text-[color:var(--semantics-text-subtle-secondary-secondary,#6a6b6d)]',
  Destructive: 'text-[color:var(--semantics-text-status-error-primary-default,#da3e37)]',
  Warning: 'text-[color:var(--semantics-text-status-warning-primary-default,#f58600)]',
  Info: 'text-[color:var(--semantics-text-status-info-primary-default,#0084ff)]',
  Disabled: 'text-[color:var(--semantics-text-subtle-primary-disabled,#ababab)]',
};

const ALERT_STYLES: Record<MessageState, { bg: string; border: string; text: string }> = {
  Rest: {
    bg: 'bg-[var(--semantics-surface-subtle-secondary-default,#f5f5f5)]',
    border: 'border-[var(--semantics-border-subtle-secondary,#e0e0e0)]',
    text: 'text-[color:var(--semantics-text-subtle-secondary-secondary,#6a6b6d)]',
  },
  Destructive: {
    bg: 'bg-[var(--semantics-surface-status-error-secondary-default,rgba(218,62,55,0.1))]',
    border: 'border-[var(--semantics-border-status-error-secondary-default,#f9dcdb)]',
    text: 'text-[color:var(--semantics-text-status-error-secondary-default,#85221e)]',
  },
  Warning: {
    bg: 'bg-[var(--semantics-surface-status-warning-secondary-default,rgba(245,134,0,0.1))]',
    border: 'border-[var(--semantics-border-status-warning-secondary-default,#ffe1bf)]',
    text: 'text-[color:var(--semantics-text-status-warning-secondary-default,#a85a00)]',
  },
  Info: {
    bg: 'bg-[var(--semantics-surface-status-info-secondary-default,rgba(0,132,255,0.1))]',
    border: 'border-[var(--semantics-border-status-info-secondary-default,#b7dcff)]',
    text: 'text-[color:var(--semantics-text-status-info-secondary-default,#005aad)]',
  },
  Disabled: {
    bg: 'bg-[var(--semantics-surface-subtle-primary-disabled,#f5f5f5)]',
    border: 'border-[var(--semantics-border-subtle-disabled,#ccc)]',
    text: 'text-[color:var(--semantics-text-subtle-primary-disabled,#ababab)]',
  },
};

const InfoIcon = () => (
  <svg className="size-4" viewBox="0 0 16 16" fill="currentColor">
    <circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <text x="8" y="10" textAnchor="middle" fontSize="10" fontWeight="bold">
      i
    </text>
  </svg>
);

const CloseIcon = () => (
  <svg className="size-4" viewBox="0 0 16 16" fill="none">
    <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const Message = forwardRef<HTMLDivElement, MessageProps>(
  (
    {
      className,
      type = 'Helper Text',
      state = 'Rest',
      label,
      message = 'Optional helper text',
      showIcon = state !== 'Rest',
      showAction = false,
      ...props
    },
    ref
  ) => {
    const isHelperText = type === 'Helper Text';
    const isAlert = type === 'Inline Alert';
    const styles = isAlert ? ALERT_STYLES[state] : HELPER_TEXT_STYLES[state];

    if (isHelperText) {
      return (
        <div
          ref={ref}
          className={className || `flex gap-1 items-center text-[13px] font-[var(--Weight-Regular,450)] leading-[var(--Text-Body-sm-LineHeight,16px)] ${styles}`}
          data-node-id="3514:111253"
          {...props}
        >
          <p>{message}</p>
        </div>
      );
    }

    if (isAlert) {
      return (
        <div
          ref={ref}
          className={
            className ||
            `flex gap-2 items-start p-3 rounded-[var(--radius-8,8px)] border border-solid ${styles.bg} ${styles.border}`
          }
          data-node-id="3514:111253"
          {...props}
        >
          {showIcon && (
            <div className={`flex-shrink-0 ${styles.text}`}>
              <InfoIcon />
            </div>
          )}

          <div className={`flex-1 ${styles.text}`}>
            {label && (
              <p className="text-[13px] font-[var(--Weight-Medium,550)] leading-[var(--Text-Body-sm-LineHeight,16px)] mb-1">
                {label}
              </p>
            )}
            <p className="text-[13px] font-[var(--Weight-Regular,450)] leading-[var(--Text-Body-sm-LineHeight,16px)]">
              {message}
            </p>
          </div>

          {showAction && (
            <button
              className="flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity"
              type="button"
              aria-label="Close"
            >
              <CloseIcon />
            </button>
          )}
        </div>
      );
    }

    return null;
  }
);

Message.displayName = 'Message';

export default Message;
