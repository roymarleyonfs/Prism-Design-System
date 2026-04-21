import { forwardRef, InputHTMLAttributes, ReactNode, useState } from 'react';

// Figma node: 3512-32365
export interface InlineEditFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  errorText?: string;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  isError?: boolean;
  isEditing?: boolean;
  isDisabled?: boolean;
  showRequiredField?: boolean;
  showHelper?: boolean;
  displayValue?: string;
  onEditStart?: () => void;
  onEditEnd?: () => void;
}

const getContainerStyles = (isError: boolean, isEditing: boolean, disabled: boolean) => {
  if (disabled) {
    return 'bg-[var(--semantics-surface-subtle-primary-disabled,#f5f5f5)] border-[var(--semantics-border-subtle-disabled,#ccc)]';
  }
  if (isError) {
    return 'bg-white border-[var(--semantics-border-status-error-primary-default,#da3e37)] shadow-[0px_0px_0px_1px_var(--primitives-error-red-500-25,rgba(218,62,55,0.25))]';
  }
  if (isEditing) {
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

const InlineEditField = forwardRef<HTMLInputElement, InlineEditFieldProps>(
  (
    {
      className,
      label,
      helperText = '',
      errorText = '',
      leadingIcon,
      trailingIcon,
      isError = false,
      isEditing: isEditingProp = false,
      isDisabled = false,
      disabled = false,
      showRequiredField = false,
      showHelper = true,
      displayValue,
      onEditStart,
      onEditEnd,
      ...props
    },
    ref
  ) => {
    const [isEditing, setIsEditing] = useState(isEditingProp);
    const isActuallyDisabled = disabled || isDisabled;
    const containerStyles = getContainerStyles(isError, isEditing, isActuallyDisabled);
    const textColor = getInputTextColor(isError, isActuallyDisabled);

    const handleEditStart = () => {
      setIsEditing(true);
      onEditStart?.();
    };

    const handleEditEnd = () => {
      setIsEditing(false);
      onEditEnd?.();
    };

    return (
      <div className={className || 'flex flex-col gap-[var(--8px,8px)] items-start w-full'} data-node-id="3512-32365">
        {label && (
          <div className="flex gap-px items-center">
            <div className="flex gap-[var(--0px,0px)] h-[18px] items-start font-[var(--Weight-Regular,450)] text-[length:var(--Text-Body-md-Size,14px)] leading-[var(--Text-Body-md-LineHeight,18px)] whitespace-nowrap">
              <p className="relative shrink-0 text-[color:var(--semantics-text-subtle-primary-default,#1b1f22)]">
                {label}
              </p>
              {showRequiredField && <p className="relative shrink-0 text-[color:var(--error-default,#da3e37)]">*</p>}
            </div>
          </div>
        )}

        {isEditing ? (
          <div className={`border-[length:var(--thin,1px)] border-solid content-stretch flex gap-[var(--4px,4px)] items-end min-h-[36px] overflow-clip px-[var(--4px,4px)] py-[var(--2px,2px)] rounded-[var(--8px,8px)] w-full ${containerStyles}`}>
            <div className="content-stretch flex flex-1 gap-[var(--4px,4px)] items-center min-h-[32px] overflow-clip px-[var(--4px,4px)] py-[var(--5px,5px)]">
              <input
                ref={ref}
                className={`flex-1 bg-transparent border-none outline-none text-[14px] font-[var(--Weight-Regular,450)] leading-[var(--Text-Body-md-LineHeight,18px)] placeholder-[color:var(--semantics-text-on-fill-subtle-secondary,#6a6b6d)] ${textColor}`}
                disabled={isActuallyDisabled}
                onBlur={handleEditEnd}
                autoFocus
                {...props}
              />
            </div>
          </div>
        ) : (
          <div
            className="flex gap-[var(--4px,4px)] items-center min-h-[36px] px-[var(--4px,4px)] py-[var(--2px,2px)] rounded-[var(--8px,8px)] w-full cursor-pointer hover:bg-[var(--semantics-surface-subtle-secondary,#f9f9f9)] transition-colors"
            onClick={!isActuallyDisabled ? handleEditStart : undefined}
          >
            <div className="flex-1 text-[14px] font-[var(--Weight-Regular,450)] leading-[var(--Text-Body-md-LineHeight,18px)] text-[color:var(--semantics-text-on-fill-subtle-primary,#1b1f22)]">
              {displayValue || props.placeholder}
            </div>
            {!isActuallyDisabled && (
              <div className="shrink-0 text-[12px] text-[color:var(--semantics-text-subtle-secondary,#999)]">✎</div>
            )}
          </div>
        )}

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
    );
  }
);

InlineEditField.displayName = 'InlineEditField';

export default InlineEditField;
