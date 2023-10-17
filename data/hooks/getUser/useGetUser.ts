import { useQuery } from "@tanstack/react-query"
import { minutesToMilliseconds } from "date-fns"

import { isValidAddress } from "@/lib"
import { UserData } from "@/lib/schemas/users"
import UserService, {
  type GetUserResponse,
} from "../../../services/userService"
import { queryClient } from "../../queryClient"

export const getUserKey = (address?: string) => {
  return [address, "user"]
}

export const updateUser = (address: string, partialUser: Partial<UserData>) => {
  return queryClient.setQueryData<GetUserResponse>(
    getUserKey(address),
    (user) => {
      if (!user) return user
      return { ...user, ...partialUser }
    }
  )
}

export const useGetUser = (address?: string, enabled = true) => {
  return useQuery({
    queryKey: getUserKey(address),
    queryFn: () => UserService.getUser(address),
    enabled: enabled && isValidAddress(address),
    staleTime: minutesToMilliseconds(10),
  })
}
