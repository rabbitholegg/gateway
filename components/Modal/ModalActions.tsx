import classNames from 'classnames';
import React from 'react';

type ModalActionsProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  className?: string;
};

const ModalActions = React.forwardRef<HTMLDivElement, ModalActionsProps>(
  ({ children, className, ...props }, ref) => {
    const rootClasses = classNames('border-t', 'border-base-300');
    const classes = classNames(
      'modal-action',
      'w-full',
      'p-6',
      'mt-0',
      className,
    );

    return (
      <div {...props} className={rootClasses} ref={ref}>
        <div className={classes}>{children}</div>
      </div>
    );
  },
);

ModalActions.displayName = 'ModalActions';

export default ModalActions;
