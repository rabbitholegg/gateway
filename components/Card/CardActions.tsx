import classNames from 'classnames';
import React from 'react';

export type CardActionsProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
};

const CardActions = React.forwardRef<HTMLDivElement, CardActionsProps>(
  ({ className, ...props }, ref) => (
    <div
      {...props}
      className={classNames('card-actions', 'mt-3 md:mt-5', className)}
      ref={ref}
    />
  ),
);

CardActions.displayName = 'CardActions';

export default CardActions;
