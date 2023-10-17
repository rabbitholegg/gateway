import classNames from "classnames"
import Image from "next/image"
import { isValidElement, type PropsWithChildren } from "react"

import { isNonEmptyString } from "@/lib"
import Flex from "../Flex"
import Loading from "../Loading"

export type CustomToastProps = PropsWithChildren & {
  type?: "error" | "success" | "loading"
  title: string
  body?: string
}

export default function CustomToast({
  type = "success",
  title,
  body,
  children,
}: CustomToastProps) {
  const hasBody = isNonEmptyString(body)

  return (
    <Flex align={hasBody ? "start" : "center"} className="gap-3">
      <div className="flex-shrink-0 w-8">
        {type === "success" && (
          <Image
            src="/toast-success-icon.svg"
            width={32}
            height={32}
            alt="Success Icon"
          />
        )}
        {type === "error" && (
          <Image
            src="/toast-error-icon.svg"
            width={32}
            height={32}
            alt="Error Icon"
          />
        )}
        {type === "loading" && <Loading size={32} color="#41B569" />}
      </div>

      <Flex direction="column" className="w-full">
        <p
          className={classNames("text-sm font-semibold", {
            "text-[#41B569]": type === "success" || type === "loading",
            "text-[#FF6666]": type === "error",
          })}
        >
          {title}
        </p>
        {hasBody && <p className="text-white/50 text-xs">{body}</p>}
        {isValidElement(children) && (
          <div className="pt-3 w-full text-right">{children}</div>
        )}
      </Flex>
    </Flex>
  )
}
