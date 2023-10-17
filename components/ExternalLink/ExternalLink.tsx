import { type HTMLProps, type MouseEvent, useCallback } from 'react';

export type ExternalLinkProps = Omit<
  HTMLProps<HTMLAnchorElement>,
  'target' | 'rel'
> & {
  href: string;
  preventPropagation?: boolean;
};

/**
 * A component that follows best practices for linking to external pages.
 * Automatically adds `target="_blank"` and `rel="nofollow noopener noreferrer"`.
 */
export default function ExternalLink({
  children,
  onClick,
  preventPropagation = false,
  ...props
}: ExternalLinkProps) {
  const handleClick = useCallback(
    (evt: MouseEvent<HTMLAnchorElement>) => {
      if (preventPropagation) {
        evt.stopPropagation();
      }
      if (typeof onClick === 'function') {
        onClick(evt);
      }
    },
    [preventPropagation, onClick],
  );

  return (
    <a
      {...props}
      target="_blank"
      rel="nofollow noopener noreferrer"
      onClick={handleClick}
    >
      {children}
    </a>
  );
}
