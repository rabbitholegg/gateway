import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { Provider } from "jotai"
import { type PropsWithChildren } from "react"
import { IntlProvider } from "react-intl"

import { getUserPreferredLanguage } from "@/lib"
import { queryClient } from "../data/queryClient"
import {
  useSetReferrerAddress
} from "../hooks/useReferrerAddress"
import ConnectKitProvider from "./ConnectKitProvider"

export const AllTheProviders = ({ children }: PropsWithChildren) => {
  const userLanguage = getUserPreferredLanguage()
  
  useSetReferrerAddress()

  return (
    <QueryClientProvider client={queryClient}>
      <IntlProvider locale={userLanguage}>
        <ConnectKitProvider>
          <Provider>{children}</Provider>
        </ConnectKitProvider>
      </IntlProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
