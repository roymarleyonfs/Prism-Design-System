import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';

// Figma node: 1944-18229
export interface MainInputBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  leading?: ReactNode;
  trailing?: ReactNode;
  isError?: boolean;
  isFocus?: boolean;
  containerized?: boolean;
  placeholder?: string;
}

const getContainerStyles = (isError: boolean, isFocus: boolean, disabled: boolean) => {
  if (disabled) {
    return 'bg-[var(--semantics-surface-subtle-primary-disabled,#f5f5f5)] border-[var(--semantics-border-subtle-disabled,#ccc)]';
  }
  if (isError) {
    return 'bg-white border-[var(--semantics-border-status-error-primary-default,#da3e37)] shadow-[0px_0px_0px_1px_var(--primitives-error-red-500-25,rgba(218,62,55,0.25))]';
  }
  if (isFocus) {
    return 'bg-white border-[var(--semantics-border-brand-default,#0084ff)] shadow-[0px_0px_0px_1px_var(--primitives-brand-blue-100,#b7dcff)]';
  }
  return 'bg-white border-[var(--semantics-border-subtle-secondary,#e0e0e0)]';
};

const getInputTextColor = (isError: boolean, disabled: boolean) => {
  if (disabled) {
    return 'text-[color:var(--semantics-text-on-fill-subtle-disabled,#ababab)]';
  }
  if (isError) {
    return 'text-[color:var(--semantics-text-on-fill-subtle-primary,#1b1f22)]';
  }
  return 'text-[color:var(--semantics-text-on-fill-subtle-secondary,#6a6b6d)]';
};

const MainInputBox = forwardRef<HTMLInputElement, MainInputBoxProps>(
  (
    {
      className,
      leading,
      trailing,
      isError = false,
      isFocus = false,
      containerized = false,
      disabled = false,
      placeholder = "What's the content",
      ...props
    },
    ref
  ) => {
    const containerStyles = getContainerStyles(isError, isFocus, disabled || false);
    const textColor = getInputTextColor(isError, disabled || false);

    return (
      <div
        className={
          className ||
          `flex gap-1 items-end min-h-[36px] overflow-clip px-1 border border-solid rounded-[var(--radius-8,8px)] w-full ${containerStyles}`
        }
        data-node-id="1944-18229"
      >
        {/* Leading adornment */}
        {leading && <div className="flex-shrink-0">{leading}</div>}

        {/* Input content area */}
        <div className="flex-1 flex gap-1 items-center min-h-[32px] overflow-clip px-1 py-[5px]">
          <input
            ref={ref}
            className={`flex-1 bg-transparent border-none outline-none text-[14px] font-[var(--Weight-Regular,450)] leading-[var(--Text-Body-md-LineHeight,18px)] placeholder-[color:var(--semantics-text-on-fill-subtle-secondary,#6a6b6d)] ${textColor}`}
            placeholder={placeholder}
            disabled={disabled}
            {...props}
          />
        </div>

        {/* Trailing adornment */}
        {trailing && <div className="flex-shrink-0">{trailing}</div>}
      </div>
    );
  }
);

MainInputBox.displayName = 'MainInputBox';

export default MainInputBox;
