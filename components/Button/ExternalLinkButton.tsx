import { BiLinkExternal } from "react-icons/bi"

import ExternalLink, {
  type ExternalLinkProps,
} from "../ExternalLink/ExternalLink"
import Button, { type ButtonProps } from "./Button"

export type ExternalLinkButtonProps = Pick<
  ExternalLinkProps,
  "href" | "preventPropagation" | "onClick"
> &
  ButtonProps

export default function ExternalLinkButton({
  href,
  preventPropagation,
  onClick,
  children,
  ...rest
}: ExternalLinkButtonProps) {
  return (
    <ExternalLink
      href={href}
      preventPropagation={preventPropagation}
      onClick={onClick}
      className={rest.fullWidth ? "block w-full" : undefined}
    >
      <Button
        size="sm"
        spacing="sm"
        color="tertiary"
        variant="flat"
        {...rest}
      >
        {children}
        <BiLinkExternal size={14} color="rgba(110, 113, 126, 0.63)" />
      </Button>
    </ExternalLink>
  )
}
