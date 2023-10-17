import classNames from 'classnames';
import { type HTMLAttributes, type PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

type ValidTableGap = 1 | 2 | 3;
type TableRowProps = PropsWithChildren & {
  className?: string;
  gap?: ValidTableGap;
};

const gapToClassNameMap: Record<ValidTableGap, string> = {
  1: 'gap-1',
  2: 'gap-2',
  3: 'gap-3',
};

type TableColProps = HTMLAttributes<HTMLDivElement> & {
  minWidth?: string | number;
  maxWidth?: string | number;
};

export function TableCol({
  minWidth = 0,
  maxWidth = 'none',
  children,
  className,
  style,
  ...rest
}: TableColProps) {
  return (
    <div
      className={twMerge(
        classNames(
          'w-full items-center flex flex-1 whitespace-nowrap text-ellipsis truncate min-w-0',
          className,
        ),
      )}
      style={{ ...style, maxWidth, minWidth }}
      {...rest}
    >
      {children}
    </div>
  );
}

export function TableHeading({ children, ...rest }: TableColProps) {
  return (
    <TableCol {...rest}>
      <p className="text-xs text-white/75 font-semibold">{children}</p>
    </TableCol>
  );
}

export function TableRow({ gap = 1, className, children }: TableRowProps) {
  return (
    <div
      className={twMerge(
        classNames(
          'w-full flex items-center',
          gapToClassNameMap[gap],
          className,
        ),
      )}
    >
      {children}
    </div>
  );
}
