import classNames from "classnames"
import React, { forwardRef, useCallback } from "react"
import { twMerge } from "tailwind-merge"

import Flex from "../Flex"

export type SidebarItemProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string
  label: string
  icon: ({ className }: { className?: string }) => JSX.Element
  isActive?: boolean
  onClick?: (label: string) => void
}

const SidebarItem = forwardRef<HTMLDivElement, SidebarItemProps>(
  (
    {
      label,
      icon,
      onClick,
      isActive = false,
      className,
      ...props
    }: SidebarItemProps,
    ref
  ): JSX.Element => {
    const handleClick = useCallback(() => {
      if (typeof onClick === "function") {
        onClick(label)
      }
    }, [onClick, label])
    const Icon = icon

    return (
      <Flex
        onClick={handleClick}
        align="center"
        className={twMerge(
          classNames(className, "text-tertiary-text", {
            "bg-backdrop border-primary-stroke rounded": isActive,
          })
        )}
        {...props}
        ref={ref}
      >
        <Icon
          className={classNames({
            "bg-brand-primary":
              isActive,
            "bg-tertiary-text": !isActive,
          })}
        />

        <p
          className={classNames("xl:block hidden font-semibold text-md", {
            "text-primary-text": isActive,
            "text-secondary-text": !isActive,
          })}
        >
          {label}
        </p>
      </Flex>
    )
  }
)

SidebarItem.displayName = "SidebarItem"

export default SidebarItem
