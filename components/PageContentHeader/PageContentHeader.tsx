import classNames from "classnames"
import { Children, type PropsWithChildren } from "react"

import ConnectWalletButton from "../ConnectWalletButton/ConnectWalletButton"

type PageContentHeaderProps = PropsWithChildren

export default function PageContentHeader({
  children,
}: PageContentHeaderProps) {
  const hasChildren = Children.count(children) >= 1

  return (
    <div
      className={classNames(
        "flex-col-reverse gap-4 sm:flex-row sm:items-center justify-center sm:justify-between overflow-x-auto py-4 px-7",
        {
          "hidden md:flex": !hasChildren,
          flex: hasChildren,
        }
      )}
    >
      <div className="flex items-center gap-5 justify-center w-full sm:w-auto">
        {children}
      </div>
      <div className="items-center justify-center gap-4 hidden md:flex">
        {/* <UserPowerScoreBadge /> */}
        <ConnectWalletButton
          spacing="sm"
          color="primary"
          variant="gradient"
          uppercase={false}
        />
        {/* <UserNotificationsPopover /> */}
      </div>
    </div>
  )
}
