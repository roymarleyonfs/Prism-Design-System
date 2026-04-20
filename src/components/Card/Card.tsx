import { HTMLAttributes, forwardRef } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export type CardVariant = 'white' | 'grey';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  /** Card header: title + optional description */
  title?: string;
  description?: string;
  /** Trailing slot — actions, badges, etc. */
  trailing?: React.ReactNode;
  /** Card body content */
  children?: React.ReactNode;
  /** Remove default padding from the body (useful for full-bleed content like tables) */
  noPadding?: boolean;
}

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  trailing?: React.ReactNode;
}

export interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {
  noPadding?: boolean;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(({
  title,
  description,
  trailing,
  className = '',
  ...props
}, ref) => (
  <div
    ref={ref}
    className={[
      'flex items-start justify-between gap-[var(--spacing-12)]',
      'px-[var(--spacing-20)] pt-[var(--spacing-20)] pb-[var(--spacing-16)]',
      'border-b border-[var(--color-primitive-neutral-gray-200)]',
      className,
    ].join(' ')}
    {...props}
  >
    <div className="flex flex-col gap-[var(--spacing-2)]">
      <span className="text-body-md font-semibold text-[var(--color-primitive-neutral-gray-900)]">
        {title}
      </span>
      {description && (
        <span className="text-caption-md font-regular text-[var(--color-primitive-neutral-gray-700)]">
          {description}
        </span>
      )}
    </div>
    {trailing && (
      <div className="shrink-0 flex items-center gap-[var(--spacing-8)]">
        {trailing}
      </div>
    )}
  </div>
));
CardHeader.displayName = 'CardHeader';

export const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(({
  noPadding = false,
  className = '',
  children,
  ...props
}, ref) => (
  <div
    ref={ref}
    className={[
      noPadding ? '' : 'p-[var(--spacing-20)]',
      className,
    ].join(' ')}
    {...props}
  >
    {children}
  </div>
));
CardBody.displayName = 'CardBody';

// ─── Root Card ────────────────────────────────────────────────────────────────

export const Card = forwardRef<HTMLDivElement, CardProps>(({
  variant = 'white',
  title,
  description,
  trailing,
  noPadding = false,
  children,
  className = '',
  ...props
}, ref) => {
  const variantClasses: Record<CardVariant, string> = {
    white: 'bg-white border border-[var(--color-primitive-neutral-gray-200)]',
    grey:  'bg-[var(--color-primitive-neutral-gray-50)] border border-[var(--color-primitive-neutral-gray-200)]',
  };

  return (
    <div
      ref={ref}
      className={[
        'rounded-[var(--radius-12)] overflow-hidden',
        variantClasses[variant],
        className,
      ].join(' ')}
      {...props}
    >
      {title && (
        <CardHeader title={title} description={description} trailing={trailing} />
      )}
      <CardBody noPadding={noPadding}>
        {children}
      </CardBody>
    </div>
  );
});

Card.displayName = 'Card';
export default Card;
