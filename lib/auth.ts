import { isAddress } from "viem"
import { z } from "zod"

import request from "./request"

const SiweSessionSchema = z.object({
  address: z.string().refine((value) => isAddress(value)),
  chainId: z.number(),
  roles: z.array(z.string()).optional(),
})

export type SiweSession = z.infer<typeof SiweSessionSchema>

export const GetNonceResponseSchema = z.string()
export const LoginResponseSchema = z.boolean()
export const GetSessionResponseSchema = SiweSessionSchema.nullable()

class AuthService {
  static async getNonce() {
    return request({
      config: {
        method: "get",
        url: "v1/auth/nonce",
      },
      responseSchema: GetNonceResponseSchema,
      identifier: "AuthService.getNonce",
    })
  }
  static async getSession() {
    return request({
      config: {
        method: "get",
        url: "v1/auth/session",
      },
      responseSchema: GetSessionResponseSchema,
      identifier: "AuthService.getSession",
    })
  }
  static async login({
    message,
    signature,
  }: {
    message: string
    signature: string
  }) {
    return request({
      config: {
        method: "post",
        url: "v1/auth/login",
        data: { signature, message },
      },
      responseSchema: LoginResponseSchema,
      identifier: "AuthService.login",
    })
  }
  static async logout() {
    return request({
      config: {
        method: "post",
        url: "v1/auth/logout",
      },
      responseSchema: z.boolean(),
      identifier: "AuthService.logout",
    })
  }
}

export default AuthService
