import React, { forwardRef } from 'react';
import SidebarHeader from './SidebarHeader';
import SidebarItem from './SidebarItem';
import SidebarList from './SidebarList';

type SidebarProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
};

const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(
  ({ children, ...props }, ref) => {
    return (
      <div
        className="grid grid-rows-[auto_1fr] bg-card grid-cols-1 h-full w-full py-4 px-1 text xl:py-6 xl:px-8 overflow-hidden border-r"
        {...props}
        ref={ref}
      >
        {children}
      </div>
    );
  },
);

Sidebar.displayName = 'Sidebar';

export default Object.assign(Sidebar, {
  Item: SidebarItem,
  Header: SidebarHeader,
  List: SidebarList,
});
