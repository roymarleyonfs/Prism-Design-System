import { forwardRef, InputHTMLAttributes, useRef, useEffect } from 'react';

// Figma node: 6752-38709
export interface CodeInputBoxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  length?: number;
  isError?: boolean;
  isFocus?: boolean;
  isDisabled?: boolean;
}

const getInputStyles = (isError: boolean, isFocus: boolean, disabled: boolean) => {
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

const getTextColor = (isError: boolean, disabled: boolean) => {
  if (disabled) {
    return 'text-[color:var(--semantics-text-on-fill-subtle-disabled,#ababab)]';
  }
  if (isError) {
    return 'text-[color:var(--semantics-text-on-fill-subtle-primary,#1b1f22)]';
  }
  return 'text-[color:var(--semantics-text-on-fill-subtle-secondary,#6a6b6d)]';
};

const CodeInputBox = forwardRef<HTMLInputElement, CodeInputBoxProps>(
  (
    {
      className,
      length = 6,
      isError = false,
      isFocus = false,
      isDisabled = false,
      disabled = false,
      maxLength = length,
      onChange,
      ...props
    },
    ref
  ) => {
    const actualRef = useRef<HTMLInputElement>(null);
    const mergedRef = ref || actualRef;
    const isActuallyDisabled = disabled || isDisabled;

    const inputStyles = getInputStyles(isError, isFocus, isActuallyDisabled);
    const textColor = getTextColor(isError, isActuallyDisabled);

    const renderCodeBoxes = () => {
      return Array.from({ length }).map((_, idx) => (
        <div
          key={idx}
          className={`flex items-center justify-center h-16 w-16 rounded-[var(--radius-8,8px)] border border-solid font-[var(--Weight-Regular,450)] text-[16px] leading-[20px] ${inputStyles} ${textColor}`}
        >
          {idx === 0 ? '−' : ''}
        </div>
      ));
    };

    return (
      <div
        className={className || 'flex gap-5 items-center w-full'}
        data-node-id="6752-38709"
      >
        <div className="flex gap-3 items-center flex-1">
          {renderCodeBoxes()}
        </div>

        {/* Hidden input for actual value */}
        <input
          ref={mergedRef}
          type="text"
          className="hidden"
          maxLength={maxLength}
          disabled={isActuallyDisabled}
          onChange={onChange}
          {...props}
        />
      </div>
    );
  }
);

CodeInputBox.displayName = 'CodeInputBox';

export default CodeInputBox;
