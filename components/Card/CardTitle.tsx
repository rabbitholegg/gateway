import React from "react"

import { cn } from "@/lib"
import Typography from "../Typography"

export type CardTitleProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string
}

const CardTitle = React.forwardRef<HTMLDivElement, CardTitleProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        {...props}
        className={cn("card-title", "text-white", className)}
        ref={ref}
      >
        <Typography variant="title4" className="text-bold">
          {children}
        </Typography>
      </div>
    )
  }
)

CardTitle.displayName = "CardTitle"

export default CardTitle
