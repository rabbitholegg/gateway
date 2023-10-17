import classNames from 'classnames';
import React from 'react';

type ModalHeaderProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  className?: string;
};

const ModalHeader = React.forwardRef<HTMLDivElement, ModalHeaderProps>(
  ({ children, className, ...props }, ref) => {
    const classes = classNames(
      'w-full text-xl p-6 border-b border-base-300',
      className,
    );
    return (
      <div {...props} className={classes} ref={ref}>
        {children}
      </div>
    );
  },
);

ModalHeader.displayName = 'ModalHeader';

export default ModalHeader;
