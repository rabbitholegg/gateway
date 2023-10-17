import { assert, isValidAddress } from '@/lib';
import { ERROR } from '@/lib/constants';
import request from '@/lib/request';
import { EthAddress } from '@/lib/schemas';
import { z } from 'zod';

export const AddEmailToUserResponseSchema = z.object({
  registeredEmail: z.boolean(),
});

export const AddEmailToUserRequestSchema = z.object({
  email: z.string().email(),
});

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
});

export type GetUserResponse = z.infer<typeof GetUserResponseSchema>;

const UpdateUserNotificationPreferencesResponseSchema = z.object({
  user: z.string(),
  id: z.string(),
  notificationPreferences: z.object({
    questStarted: z.boolean(),
    questCompleted: z.boolean(),
  }),
});

export type UpdateUserNotificationPreferencesResponse = z.infer<
  typeof UpdateUserNotificationPreferencesResponseSchema
>;

const VerifyEmailResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});

export type VerifyEmailResponse = z.infer<typeof VerifyEmailResponseSchema>;

export const GetUserProfileResponseSchema = z.object({
  ethEarned: z.string(),
  score: z.number(),
  ranking: z.number().nullish(),
});

export type GetUserProfileResponse = z.infer<
  typeof GetUserProfileResponseSchema
>;

class UserService {
  static async addEmailToUser({
    email,
    address,
  }: {
    email: string;
    address: string;
  }) {
    assert(isValidAddress(address), ERROR.INVALID_ADDRESS);

    return request({
      config: {
        url: `address/${address}`,
        method: 'put',
        data: { email },
      },
      requestSchema: AddEmailToUserRequestSchema,
      responseSchema: AddEmailToUserResponseSchema,
      identifier: 'UserService.addEmailToUser',
    });
  }
  static async getUser(address?: string) {
    assert(isValidAddress(address), ERROR.INVALID_ADDRESS);

    return request({
      config: {
        method: 'get',
        url: `address/${address}`,
      },
      responseSchema: GetUserResponseSchema,
      identifier: 'UserService.getUser',
    });
  }
  static async updateUserNotificationPreferences({
    address,
    notificationPreferences,
  }: {
    address: string;
    notificationPreferences: {
      questStarted: boolean;
      questCompleted: boolean;
    };
  }) {
    assert(isValidAddress(address), ERROR.INVALID_ADDRESS);

    return request({
      config: {
        method: 'put',
        url: `address/${address}/notification-preferences`,
        data: notificationPreferences,
      },
      responseSchema: UpdateUserNotificationPreferencesResponseSchema,
      identifier: 'UserService.updateUserNotificationPreferences',
    });
  }
  static async verifyEmail({ email, token }: { email: string; token: string }) {
    return request({
      config: {
        method: 'post',
        url: 'verify-email',
        data: { email, token },
      },
      responseSchema: VerifyEmailResponseSchema,
      identifier: 'UserService.verifyEmail',
    });
  }

  static async getUserProfile({ userAddress }: { userAddress: EthAddress }) {
    assert(isValidAddress(userAddress), ERROR.INVALID_ADDRESS);

    return request({
      config: {
        method: 'get',
        url: 'v1/user/profile',
        params: { userAddress },
      },
      responseSchema: GetUserProfileResponseSchema,
      identifier: 'UserService.getUserStats',
    });
  }
}

export default UserService;
