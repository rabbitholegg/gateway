import classNames from 'classnames';
import React from 'react';

export type CardBodyProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
};

const CardBody = React.forwardRef<HTMLDivElement, CardBodyProps>(
  ({ className, ...props }, ref) => (
    <div
      {...props}
      className={classNames('flex', 'flex-col', 'p-3 md:p-5', className)}
      ref={ref}
    />
  ),
);

CardBody.displayName = 'CardBody';

export default CardBody;
