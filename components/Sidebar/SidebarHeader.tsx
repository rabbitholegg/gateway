import React, { forwardRef } from 'react';

type SidebarHeaderProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
};

const SidebarHeader = forwardRef<HTMLDivElement, SidebarHeaderProps>(
  ({ children, ...props }, ref) => {
    return (
      <div {...props} ref={ref}>
        {children}
      </div>
    );
  },
);

SidebarHeader.displayName = 'SidebarHeader';

export default SidebarHeader;
