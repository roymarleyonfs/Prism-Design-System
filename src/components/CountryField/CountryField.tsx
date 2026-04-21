import { forwardRef, InputHTMLAttributes, ReactNode, useState } from 'react';

// Figma node: 2554-33464
export interface CountryFieldProps extends InputHTMLAttributes<HTMLInputElement> {
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
  countries?: Array<{ label: string; code: string; flag?: string }>;
  onCountrySelect?: (code: string) => void;
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

const CountryField = forwardRef<HTMLInputElement, CountryFieldProps>(
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
      countries = [],
      onCountrySelect,
      ...props
    },
    ref
  ) => {
    const [focus, setFocus] = useState(isFocus);
    const [openDropdown, setOpenDropdown] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState('');
    const isActuallyDisabled = disabled || isDisabled;
    const containerStyles = getContainerStyles(isError, focus, isActuallyDisabled);
    const textColor = getInputTextColor(isError, isActuallyDisabled);

    return (
      <div className={className || 'flex flex-col gap-[var(--8px,8px)] items-start w-full'} data-node-id="2554-33464">
        {label && (
          <div className="flex gap-[var(--0px,0px)] w-full items-start">
            <div className="flex flex-1 gap-px items-center">
              {leadingIcon && <div className="shrink-0 size-[16px]">{leadingIcon}</div>}
              <div className="flex gap-[var(--0px,0px)] h-[18px] items-start font-[var(--Weight-Regular,450)] text-[length:var(--Text-Body-md-Size,14px)] leading-[var(--Text-Body-md-LineHeight,18px)] whitespace-nowrap">
                <p className="relative shrink-0 text-[color:var(--semantics-text-subtle-primary-default,#1b1f22)]">
                  {label}
                </p>
                {showRequiredField && <p className="relative shrink-0 text-[color:var(--error-default,#da3e37)]">*</p>}
              </div>
              {trailingIcon && <div className="shrink-0 size-[16px]">{trailingIcon}</div>}
            </div>
          </div>
        )}

        <div className="relative w-full">
          <div className={`border-[length:var(--thin,1px)] border-solid content-stretch flex gap-[var(--4px,4px)] items-end min-h-[36px] overflow-clip px-[var(--4px,4px)] py-[var(--2px,2px)] rounded-[var(--8px,8px)] w-full ${containerStyles} cursor-pointer`}>
            <div
              className={`flex-1 ${textColor}`}
              onClick={() => !isActuallyDisabled && setOpenDropdown(!openDropdown)}
            >
              {selectedCountry || 'Select a country'}
            </div>
            <span className="shrink-0">▼</span>
          </div>

          {openDropdown && countries.length > 0 && (
            <div className="absolute top-full mt-1 w-full bg-white border border-[var(--semantics-border-subtle-secondary,#e0e0e0)] rounded-[var(--8px,8px)] shadow-lg z-10 max-h-[300px] overflow-y-auto">
              {countries.map((country) => (
                <div
                  key={country.code}
                  onClick={() => {
                    setSelectedCountry(country.label);
                    onCountrySelect?.(country.code);
                    setOpenDropdown(false);
                  }}
                  className="px-[var(--12px,12px)] py-[var(--8px,8px)] cursor-pointer hover:bg-[var(--semantics-surface-subtle-secondary,#f9f9f9)] text-[14px] flex items-center gap-2"
                >
                  {country.flag && <span>{country.flag}</span>}
                  {country.label}
                </div>
              ))}
            </div>
          )}
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

CountryField.displayName = 'CountryField';

export default CountryField;
