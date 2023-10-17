import classNames from 'classnames';
import React from 'react';

type ModalBodyProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  className?: string;
};

const ModalBody = React.forwardRef<HTMLDivElement, ModalBodyProps>(
  ({ children, className, ...props }, ref) => {
    const classes = classNames('p-6', className);

    return (
      <div {...props} className={classes} ref={ref}>
        {children}
      </div>
    );
  },
);

ModalBody.displayName = 'ModalBody';

export default ModalBody;
