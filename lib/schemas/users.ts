import { z } from 'zod';

export const UserDataSchema = z.object({
  user: z.string(),
  id: z.string(),
  emailRegistered: z.boolean(),
  name: z.string(),
  email: z.string(),
  notificationPreferences: z.object({
    questStarted: z.boolean(),
    questCompleted: z.boolean(),
  }),
});

export type UserData = z.infer<typeof UserDataSchema>;
