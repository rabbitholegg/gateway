import classNames from "classnames"
import React from "react"

import Typography from "../Typography"

export type CardSubtitleProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string
}

const CardSubtitle = React.forwardRef<HTMLDivElement, CardSubtitleProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        {...props}
        className={classNames("text-white/50", className)}
        ref={ref}
      >
        <Typography variant="span">{children}</Typography>
      </div>
    )
  }
)

CardSubtitle.displayName = "CardSubtitle"

export default CardSubtitle
