import {
  Children,
  cloneElement,
  forwardRef,
  type ReactElement,
} from "react"

import Flex from "../Flex"

type SidebarListProps = {
  children: ReactElement[]
  className?: string
}

const SidebarList = forwardRef<HTMLDivElement, SidebarListProps>(
  ({ children, ...props }, ref) => {
    return (
      <Flex direction="column" ref={ref} {...props}>
        {Children.map(children, (child) =>
          cloneElement(child, {
            key: child.props.label,
            onClick: child.props.onClick,
            isActive: child.props.isActive,
          })
        )}
      </Flex>
    )
  }
)

SidebarList.displayName = "SidebarList"

export default SidebarList
