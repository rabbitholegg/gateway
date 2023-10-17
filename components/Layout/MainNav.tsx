import { openInNewWindow } from "@/lib"
import { DISCORD_URL, TERMINAL_URL, TWITTER_URL } from "@/lib/constants"
import classNames from "classnames"
import { Avatar, ConnectKitButton } from "connectkit"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { BiWallet } from "react-icons/bi"
import { FaDiscord, FaTwitter } from "react-icons/fa"
import Flex from "../Flex"
import QuestsIcon from "../Icon/QuestsIcon"
import Sidebar from "../Sidebar"
import { TerminalLogoIcon } from "../TerminalLogo/TerminalLogo"

const navLinkClass =
  "w-full border border-transparent px-3 py-2 gap-7 cursor-pointer justify-center xl:justify-start"

const navList = [
  {
    icon: QuestsIcon,
    label: "Quests",
    link: "/quests",
  },
]

export function MainNav() {
  const router = useRouter()
  const pathname = usePathname()

  const logoUri = process.env.NEXT_PUBLIC_THEME_BRAND_LOGO_URI

  return (
    <Sidebar>
      <Sidebar.Header>
        <Link
          href={navList[0].link}
          className="w-full text-center flex items-center justify-center xl:justify-start"
        >
          <span className="hidden xl:block">
            { logoUri && <img src={logoUri} className="max-w-[180px]" /> }
          </span>
        </Link>
      </Sidebar.Header>

      <div className="pt-10 xl:pt-64 h-full overflow-y-auto -mx-4">
        <Sidebar.List>
          {navList
            .map((navItem) => {
              const isActive = pathname.includes(navItem.link)

              return (
                <Sidebar.Item
                  key={navItem.label}
                  label={navItem.label}
                  isActive={isActive}
                  icon={navItem.icon}
                  className={navLinkClass}
                  onClick={() => router.push(navItem.link)}
                />
              )
            })
            .filter(Boolean)
            .concat(
              <Sidebar.Item
                key="terminal"
                icon={() => <TerminalLogoIcon size={24} fill="currentColor" />}
                label="Create Quest"
                className={navLinkClass}
                onClick={() => openInNewWindow(TERMINAL_URL)}
              />
            )}
        </Sidebar.List>
      </div>
      <div className="-mx-4">
        <Sidebar.List>
          {[
            <Sidebar.Item
              key="discord"
              icon={() => <FaDiscord size={24} />}
              label="Discord"
              className={navLinkClass}
              onClick={() => openInNewWindow(DISCORD_URL)}
            />,
            <Sidebar.Item
              key="twitter"
              icon={() => <FaTwitter size={24} />}
              label="Twitter"
              className={navLinkClass}
              onClick={() => openInNewWindow(TWITTER_URL)}
            />,
          ]}
        </Sidebar.List>
      </div>
    </Sidebar>
  )
}

export function MobileNav() {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <div className="flex justify-center h-full w-full gap-4">
      {navList.map((navItem) => {
        const isActive = pathname.includes(navItem.link)
        const Icon = navItem.icon
        return (
          <Flex
            direction="column"
            justify="center"
            align="center"
            className="gap-1 w-full"
            key={navItem.label}
            onClick={() => router.push(navItem.link)}
          >
            <Icon
              id="mobile-nav-icon"
              className={classNames({
                "bg-brand-primary":
                  isActive,
                "bg-tertiary-text": !isActive,
              })}
            />
          </Flex>
        )
      })}
      <Flex
        direction="column"
        justify="center"
        align="center"
        className="gap-1 w-full"
      >
        <ConnectKitButton.Custom>
          {({ isConnected, show, address }) => {
            if (isConnected) {
              return (
                <button
                  className="flex flex-col items-center gap-1 w-full"
                  onClick={show}
                >
                  <Avatar address={address} size={22} />
                </button>
              )
            }

            return (
              <button
                className="flex flex-col items-center gap-1 w-full"
                onClick={show}
              >
                <div className="text-tertiary-text">
                  <BiWallet size={22} />
                </div>
              </button>
            )
          }}
        </ConnectKitButton.Custom>
      </Flex>
    </div>
  )
}
