import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';

// Figma node: 1944-25990
export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  errorText?: string;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  isError?: boolean;
  isFocus?: boolean;
  isDisabled?: boolean;
  showRequiredField?: boolean;
  showHelper?: boolean;
  showCount?: boolean;
  showAction?: boolean;
  actionLabel?: string;
  orientation?: 'vertical' | 'horizontal';
  characterCount?: string;
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
    return 'text-[color:var(--semantics-text-subtle-primary-disabled,#ababab)]';
  }
  if (isError) {
    return 'text-[color:var(--semantics-text-on-fill-subtle-primary,#1b1f22)]';
  }
  return 'text-[color:var(--semantics-text-on-fill-subtle-secondary,#6a6b6d)]';
};

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      className,
      label,
      helperText = '',
      errorText = '',
      leadingIcon,
      trailingIcon,
      isError = false,
      isFocus = false,
      isDisabled = false,
      disabled = false,
      showRequiredField = false,
      showHelper = true,
      showCount = false,
      showAction = false,
      actionLabel = 'Reset',
      orientation = 'vertical',
      characterCount = '0/100',
      ...props
    },
    ref
  ) => {
    const isActuallyDisabled = disabled || isDisabled;
    const containerStyles = getContainerStyles(isError, isFocus, isActuallyDisabled);
    const textColor = getInputTextColor(isError, isActuallyDisabled);
    const isVertical = orientation === 'vertical';

    return (
      <div
        className={
          className ||
          `flex gap-[var(--8px,8px)] p-[var(--0px,0px)] ${isVertical ? 'flex-col items-start w-full' : 'items-center w-full'}`
        }
        data-node-id="1944-25990"
      >
        {label && (
          <div className={`flex gap-[var(--0px,0px)] items-start ${isVertical ? 'w-full' : 'flex-col flex-1 min-w-px'}`}>
            <div className={`flex gap-px items-center ${isVertical ? 'w-full' : ''}`}>
              {leadingIcon && <div className="shrink-0 size-[16px]">{leadingIcon}</div>}
              <div className="flex gap-[var(--0px,0px)] h-[18px] items-start font-[var(--Weight-Regular,450)] text-[length:var(--Text-Body-md-Size,14px)] leading-[var(--Text-Body-md-LineHeight,18px)] whitespace-nowrap">
                <p className="relative shrink-0 text-[color:var(--semantics-text-subtle-primary-default,#1b1f22)]">
                  {label}
                </p>
                {showRequiredField && <p className="relative shrink-0 text-[color:var(--error-default,#da3e37)]">*</p>}
              </div>
              {trailingIcon && <div className="shrink-0 size-[16px]">{trailingIcon}</div>}
            </div>
            {showCount && (
              <p className="font-[var(--Weight-Regular,450)] text-[length:var(--Text-Body-sm-Size,13px)] leading-[var(--Text-Body-sm-LineHeight,16px)] text-[color:var(--primitives-neutral-gray-800,#6a6b6d)] whitespace-nowrap">
                {characterCount}
              </p>
            )}
            {showAction && (
              <div className="flex gap-[var(--4px,4px)] items-center">
                <p className="font-[var(--Weight-Regular,450)] text-[length:var(--Text-Body-sm-Size,13px)] leading-[var(--Text-Body-sm-LineHeight,16px)] text-[color:var(--semantics-text-link-brand-default,#0084ff)] whitespace-nowrap cursor-pointer">
                  {actionLabel}
                </p>
              </div>
            )}
          </div>
        )}

        <div className={`flex flex-col gap-[var(--8px,8px)] items-start ${isVertical ? 'w-full' : 'flex-1 min-w-px'}`}>
          <div
            className={`border-[length:var(--thin,1px)] border-solid content-stretch flex gap-[var(--4px,4px)] items-end min-h-[36px] overflow-clip px-[var(--4px,4px)] py-[var(--2px,2px)] rounded-[var(--8px,8px)] shrink-0 w-full ${containerStyles}`}
            data-node-id="1944:26086"
          >
            <div className="content-stretch flex flex-1 gap-[var(--4px,4px)] items-center min-h-[32px] overflow-clip px-[var(--4px,4px)] py-[var(--5px,5px)]">
              <input
                ref={ref}
                className={`flex-1 bg-transparent border-none outline-none text-[14px] font-[var(--Weight-Regular,450)] leading-[var(--Text-Body-md-LineHeight,18px)] placeholder-[color:var(--semantics-text-on-fill-subtle-secondary,#6a6b6d)] ${textColor}`}
                disabled={isActuallyDisabled}
                {...props}
              />
            </div>
          </div>

          {showHelper && (
            <div className="flex gap-[var(--0px,0px)] items-center justify-center p-[var(--0px,0px)] shrink-0">
              <p
                className={`font-[var(--Weight-Regular,450)] text-[length:var(--Text-Body-sm-Size,13px)] leading-[var(--Text-Body-sm-LineHeight,16px)] whitespace-nowrap ${isError ? 'text-[color:var(--semantics-text-status-error-primary-default,#da3e37)]' : 'text-[color:var(--semantics-text-subtle-secondary-secondary,#6a6b6d)]'}`}
              >
                {isError ? errorText : helperText}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }
);

TextField.displayName = 'TextField';

export default TextField;
