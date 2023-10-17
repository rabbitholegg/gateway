import { QueryClient } from "@tanstack/react-query"
import axios from "axios"
import { minutesToMilliseconds } from "date-fns"

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: minutesToMilliseconds(1),
      retry: (failureCount, err) => {
        if (axios.isAxiosError(err) && err.response?.status === 401) {
          return false
        }

        return failureCount < 3
      },
    },
  },
})
