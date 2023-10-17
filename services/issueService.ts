import { assert, isNonEmptyString } from '@/lib';
import request from '@/lib/request';
import { z } from 'zod';

const CreateIssueRequestSchema = z.object({
  questId: z.string(),
  userId: z.string(),
  type: z.string(),
  description: z.string(),
});

const CreateIssueResponseSchema = z.object({
  success: z.boolean(),
});

export function createIssue({
  questId,
  userId,
  type,
  description,
}: {
  questId: string;
  userId: string;
  type: string;
  description: string;
}) {
  assert(isNonEmptyString(questId), 'questId is required');
  assert(isNonEmptyString(userId), 'userId is required');
  assert(isNonEmptyString(type), 'type is required');
  assert(isNonEmptyString(description), 'description is required');

  return request({
    config: {
      method: 'post',
      url: 'v1/issues',
      data: {
        questId,
        userId,
        type,
        description,
      },
    },
    requestSchema: CreateIssueRequestSchema,
    responseSchema: CreateIssueResponseSchema,
    identifier: 'issueService.createIssue',
  });
}
