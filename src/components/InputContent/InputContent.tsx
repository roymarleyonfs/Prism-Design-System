import { forwardRef, HTMLAttributes, ReactNode } from 'react';

// Figma node: 1944-17521
export interface InputContentProps extends HTMLAttributes<HTMLDivElement> {
  contentTags?: boolean;
  contentText?: boolean;
  contentStatus?: boolean;
  placeholderOrFilledText?: ReactNode;
  typing?: boolean;
  tags?: Array<{ label: ReactNode; onRemove?: () => void }>;
}

const INPUT_CONTENT_BASE = 'flex items-center overflow-clip relative';
const TEXT_CONTENT_CONTAINER = 'flex flex-1 gap-px h-full items-center min-w-px p-0 relative';
const CONTENT_TEXT =
  'text-[14px] text-[color:var(--semantics-text-on-fill-subtle-secondary,#6a6b6d)] font-[var(--Weight-Regular,450)] leading-[var(--Text-Body-md-LineHeight,18px)] overflow-hidden text-ellipsis whitespace-nowrap shrink-0';
const STATUS_DOT = 'relative shrink-0 size-[6px] bg-[var(--semantics-text-subtle-primary-default,#1b1f22)]';
const STATUS_TEXT =
  'text-[14px] text-[color:var(--semantics-text-subtle-primary-default,#1b1f22)] font-[var(--Weight-Regular,450)] leading-[var(--Text-Body-md-LineHeight,18px)] overflow-hidden text-ellipsis whitespace-nowrap shrink-0';
const TAGS_CONTAINER = 'flex flex-1 flex-wrap gap-1 items-center min-w-px px-1 py-[2px] relative';
const TAG =
  'flex gap-1 h-7 items-center overflow-clip pl-2 pr-1 py-1 relative rounded-[var(--radius-4,4px)] shrink-0 bg-[var(--semantics-fill-status-subtle-secondary-default,rgba(31,36,40,0.1))]';
const TAG_LABEL =
  'text-[14px] text-[color:var(--semantics-text-on-fill-subtle-primary,#1b1f22)] font-[var(--Weight-Regular,450)] leading-[var(--Text-Body-md-LineHeight,18px)] whitespace-nowrap';
const TAG_CLOSE_BUTTON =
  'flex items-center justify-center relative rounded-[var(--radius-4,4px)] shrink-0 size-5 cursor-pointer hover:bg-black/10 transition-colors';

const CloseIcon = () => (
  <svg className="size-4" viewBox="0 0 16 16" fill="none">
    <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const CursorLine = () => (
  <svg className="w-px h-full" viewBox="0 0 1 32" fill="none">
    <line x1="0.5" y1="0" x2="0.5" y2="32" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const InputContent = forwardRef<HTMLDivElement, InputContentProps>(
  (
    {
      className,
      contentTags = true,
      contentText = false,
      contentStatus = false,
      placeholderOrFilledText = 'Change This!',
      typing = true,
      tags = [],
      ...props
    },
    ref
  ) => {
    // Determine which content to show (tags, text, or status)
    const showTags = contentTags && !contentText && !contentStatus;
    const showText = contentText && !contentTags && !contentStatus;
    const showStatus = contentStatus && !contentTags && !contentText;

    return (
      <div
        ref={ref}
        className={
          className ||
          `${INPUT_CONTENT_BASE} ${
            showText
              ? 'gap-1 min-h-8 px-1 py-[5px] w-[389px]'
              : 'gap-0 w-[389px] min-h-8'
          }`
        }
        data-node-id="1944:17521"
        {...props}
      >
        {/* Text Content Mode */}
        {showText && (
          <div className="flex flex-1 flex-row items-center self-stretch">
            <div className={TEXT_CONTENT_CONTAINER}>
              <p className={CONTENT_TEXT}>{placeholderOrFilledText}</p>
              {typing && (
                <div className="h-full relative shrink-0 w-px">
                  <CursorLine />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Status Content Mode */}
        {showStatus && (
          <div className={TEXT_CONTENT_CONTAINER}>
            <div className={STATUS_DOT} />
            <p className={STATUS_TEXT}>{placeholderOrFilledText}</p>
          </div>
        )}

        {/* Tags Content Mode */}
        {showTags && (
          <div className={TAGS_CONTAINER}>
            {tags.length > 0
              ? tags.map((tag, idx) => (
                  <div key={idx} className={TAG}>
                    <p className={TAG_LABEL}>{tag.label}</p>
                    {tag.onRemove && (
                      <button
                        className={TAG_CLOSE_BUTTON}
                        type="button"
                        onClick={tag.onRemove}
                        aria-label={`Remove tag: ${tag.label}`}
                      >
                        <CloseIcon />
                      </button>
                    )}
                  </div>
                ))
              : null}
            {/* Typing input placeholder in tags mode */}
            <div className="flex flex-1 gap-px h-7 items-center min-h-7 min-w-px p-0 relative">
              <p className="text-[14px] text-[color:var(--semantics-text-on-fill-subtle-secondary,#6a6b6d)] font-[var(--Weight-Regular,450)] leading-[var(--Text-Body-md-LineHeight,18px)] overflow-hidden text-ellipsis whitespace-nowrap shrink-0">
                {placeholderOrFilledText}
              </p>
              {typing && (
                <div className="h-full relative shrink-0 w-px">
                  <CursorLine />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
);

InputContent.displayName = 'InputContent';

export default InputContent;
