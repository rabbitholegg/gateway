import classNames from 'classnames';
import React, { useMemo } from 'react';

type FlexProps = React.HTMLAttributes<HTMLDivElement> & {
  align?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  justify?: 'start' | 'end' | 'center' | 'around' | 'between' | 'evenly';
  wrap?: 'wrap' | 'wrap-reverse' | 'nowrap';
  basis?: string | number;
  grow?: string | number;
  shrink?: string | number;
  className?: string;
};

const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  (
    {
      align,
      direction,
      justify,
      wrap,
      basis,
      grow,
      shrink,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const flexClasses = useMemo(
      () =>
        classNames(
          'flex',
          className,
          { 'flex-row': direction === 'row' },
          { 'flex-col': direction === 'column' },
          { 'flex-row-reverse': direction === 'row-reverse' },
          { 'flex-col-reverse': direction === 'column-reverse' },
          { [`flex-${wrap}`]: !!wrap },
          { [`justify-${justify}`]: !!justify },
          { [`items-${align}`]: !!align },
          { [`basis-${basis}`]: !!basis },
          { [`grow-${grow}`]: !!grow },
          { [`shrink-${shrink}`]: !!shrink },
        ),
      [direction, className, wrap, justify, align, basis, grow, shrink],
    );

    return (
      <div className={flexClasses} {...props} ref={ref}>
        {children}
      </div>
    );
  },
);

Flex.displayName = 'Flex';

export default Flex;
