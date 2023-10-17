import assert from "assert"
import { isAddress } from "viem"
import { z } from "zod"

import request from "./request"

export const GetUserResponseSchema = z.object({
  user: z.string(),
  id: z.string(),
  emailRegistered: z.boolean(),
  name: z.string(),
  email: z.string(),
  isReferralPartner: z.boolean(),
  notificationPreferences: z.object({
    questStarted: z.boolean(),
    questCompleted: z.boolean(),
  }),
})

export type GetUserResponse = z.infer<typeof GetUserResponseSchema>

class UserService {
  static async getUser(address?: string) {
    assert(address && isAddress(address), "Invalid Address")

    return request({
      config: {
        method: "get",
        url: `address/${address}`,
      },
      responseSchema: GetUserResponseSchema,
      identifier: "UserService.getUser",
    })
  }
}

export default UserService
