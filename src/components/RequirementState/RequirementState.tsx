import { forwardRef, HTMLAttributes } from 'react';

// Figma node: 1018-23141
export type RequirementStateType = 'Pending' | 'Success' | 'Error' | 'Disabled';

export interface RequirementStateProps extends HTMLAttributes<HTMLDivElement> {
  state?: RequirementStateType;
  label?: string;
}

const STATE_CONTAINER = 'flex items-center p-0 relative';
const STATE_LABEL =
  'text-[13px] font-[var(--Weight-Medium,550)] leading-[var(--Text-Body-sm-LineHeight,16px)] whitespace-nowrap shrink-0';

const PENDING_LABEL = 'text-[color:var(--semantics-text-subtle-secondary-secondary,#6a6b6d)]';
const SUCCESS_LABEL = 'text-[color:var(--semantics-text-status-success-primary-default,#00935c)]';
const ERROR_LABEL = 'text-[color:var(--semantics-text-status-error-primary-default,#da3e37)]';
const DISABLED_LABEL = 'text-[color:var(--semantics-text-subtle-secondary-secondary,#6a6b6d)] opacity-0';

const LoadingIcon = () => (
  <svg className="size-4 animate-spin" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" opacity="0.3" />
    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="3 20" />
  </svg>
);

const SuccessIcon = () => (
  <svg className="size-4 text-[#00935c]" viewBox="0 0 16 16" fill="currentColor">
    <circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <path d="M12 6L7 11L4.5 8.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ErrorIcon = () => (
  <svg className="size-4 text-[#da3e37]" viewBox="0 0 16 16" fill="currentColor">
    <circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <path d="M6 6L10 10M10 6L6 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const DisabledIcon = () => (
  <svg className="size-4 opacity-50" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1" />
  </svg>
);

const RequirementState = forwardRef<HTMLDivElement, RequirementStateProps>(
  (
    {
      className,
      state = 'Pending',
      label = 'Requirement',
      ...props
    },
    ref
  ) => {
    const isPending = state === 'Pending';
    const isSuccess = state === 'Success';
    const isError = state === 'Error';
    const isDisabled = state === 'Disabled';

    return (
      <div
        ref={ref}
        className={
          className ||
          `${STATE_CONTAINER} ${
            isDisabled
              ? 'gap-1 bg-[var(--semantics-surface-subtle-secondary-default,#f5f5f5)] rounded-[var(--radius-4,4px)]'
              : 'gap-[6px]'
          }`
        }
        data-node-id="1018:23141"
        {...props}
      >
        {isPending && (
          <>
            <div className="text-[color:var(--semantics-text-subtle-secondary-secondary,#6a6b6d)]">
              <LoadingIcon />
            </div>
            <p className={`${STATE_LABEL} ${PENDING_LABEL}`}>{label}</p>
          </>
        )}

        {isSuccess && (
          <>
            <SuccessIcon />
            <p className={`${STATE_LABEL} ${SUCCESS_LABEL}`}>{label}</p>
          </>
        )}

        {isError && (
          <>
            <ErrorIcon />
            <p className={`${STATE_LABEL} ${ERROR_LABEL}`}>{label}</p>
          </>
        )}

        {isDisabled && (
          <>
            <DisabledIcon />
            <p className={`${STATE_LABEL} ${DISABLED_LABEL}`}>{label}</p>
          </>
        )}
      </div>
    );
  }
);

RequirementState.displayName = 'RequirementState';

export default RequirementState;
