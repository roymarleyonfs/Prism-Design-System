import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';

// Figma node: 2625-68337
export interface TwoColumnsInputProps {
  label?: string;
  helperText?: string;
  errorText?: string;
  showRequiredField?: boolean;
  showHelper?: boolean;
  isError?: boolean;
  isDisabled?: boolean;
  leftColumnLabel?: string;
  rightColumnLabel?: string;
  leftInputProps?: InputHTMLAttributes<HTMLInputElement> & {
    placeholder?: string;
    value?: string | number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
  rightInputProps?: InputHTMLAttributes<HTMLInputElement> & {
    placeholder?: string;
    value?: string | number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
}

const getInputContainerStyles = (isError: boolean, disabled: boolean) => {
  if (disabled) {
    return 'bg-[var(--semantics-surface-subtle-primary-disabled,#f5f5f5)] border-[var(--semantics-border-subtle-disabled,#ccc)]';
  }
  if (isError) {
    return 'bg-white border-[var(--semantics-border-status-error-primary-default,#da3e37)] shadow-[0px_0px_0px_1px_var(--primitives-error-red-500-25,rgba(218,62,55,0.25))]';
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

const TwoColumnsInput = forwardRef<HTMLDivElement, TwoColumnsInputProps>(
  (
    {
      label,
      helperText = '',
      errorText = '',
      showRequiredField = false,
      showHelper = true,
      isError = false,
      isDisabled = false,
      leftColumnLabel,
      rightColumnLabel,
      leftInputProps = {},
      rightInputProps = {},
    },
    ref
  ) => {
    const inputContainerStyles = getInputContainerStyles(isError, isDisabled);
    const textColor = getInputTextColor(isError, isDisabled);

    return (
      <div className="flex flex-col gap-[var(--8px,8px)] items-start w-full" ref={ref} data-node-id="2625-68337">
        {label && (
          <div className="flex gap-[var(--0px,0px)] w-full items-start">
            <div className="flex flex-1 gap-px items-center">
              <div className="flex gap-[var(--0px,0px)] h-[18px] items-start font-[var(--Weight-Regular,450)] text-[length:var(--Text-Body-md-Size,14px)] leading-[var(--Text-Body-md-LineHeight,18px)] whitespace-nowrap">
                <p className="relative shrink-0 text-[color:var(--semantics-text-subtle-primary-default,#1b1f22)]">
                  {label}
                </p>
                {showRequiredField && <p className="relative shrink-0 text-[color:var(--error-default,#da3e37)]">*</p>}
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-[var(--8px,8px)] w-full">
          <div className="flex-1 flex flex-col gap-[var(--4px,4px)]">
            {leftColumnLabel && (
              <label className="text-[12px] font-[var(--Weight-Regular,450)] text-[color:var(--semantics-text-subtle-primary-default,#1b1f22)]">
                {leftColumnLabel}
              </label>
            )}
            <div className={`border-[length:var(--thin,1px)] border-solid content-stretch flex gap-[var(--4px,4px)] items-end min-h-[36px] overflow-clip px-[var(--4px,4px)] py-[var(--2px,2px)] rounded-[var(--8px,8px)] ${inputContainerStyles}`}>
              <input
                className={`flex-1 bg-transparent border-none outline-none text-[14px] font-[var(--Weight-Regular,450)] leading-[var(--Text-Body-md-LineHeight,18px)] placeholder-[color:var(--semantics-text-on-fill-subtle-secondary,#6a6b6d)] ${textColor}`}
                disabled={isDisabled}
                {...leftInputProps}
              />
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-[var(--4px,4px)]">
            {rightColumnLabel && (
              <label className="text-[12px] font-[var(--Weight-Regular,450)] text-[color:var(--semantics-text-subtle-primary-default,#1b1f22)]">
                {rightColumnLabel}
              </label>
            )}
            <div className={`border-[length:var(--thin,1px)] border-solid content-stretch flex gap-[var(--4px,4px)] items-end min-h-[36px] overflow-clip px-[var(--4px,4px)] py-[var(--2px,2px)] rounded-[var(--8px,8px)] ${inputContainerStyles}`}>
              <input
                className={`flex-1 bg-transparent border-none outline-none text-[14px] font-[var(--Weight-Regular,450)] leading-[var(--Text-Body-md-LineHeight,18px)] placeholder-[color:var(--semantics-text-on-fill-subtle-secondary,#6a6b6d)] ${textColor}`}
                disabled={isDisabled}
                {...rightInputProps}
              />
            </div>
          </div>
        </div>

        {showHelper && (
          <div className="flex gap-[var(--0px,0px)] items-center justify-center p-[var(--0px,0px)] shrink-0">
            <p
              className={`font-[var(--Weight-Regular,450)] text-[length:var(--Text-Body-sm-Size,13px)] leading-[var(--Text-Body-sm-LineHeight,16px)] ${isError ? 'text-[color:var(--semantics-text-status-error-primary-default,#da3e37)]' : 'text-[color:var(--semantics-text-subtle-secondary-secondary,#6a6b6d)]'}`}
            >
              {isError ? errorText : helperText}
            </p>
          </div>
        )}
      </div>
    );
  }
);

TwoColumnsInput.displayName = 'TwoColumnsInput';

export default TwoColumnsInput;
