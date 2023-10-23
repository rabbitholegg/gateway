import {
  assert,
  isNonEmptyString,
  isValidAddress
} from "@/lib"
import { z } from "zod"

import { ERROR } from "@/lib/constants"
import request from "@/lib/request"
import { EthAddress, EthAddressSchema } from "@/lib/schemas"
import { QuestAndRewardSchema } from "@/lib/schemas/quests"

export const MIN_REWARD_VALUE_WEI = "50000000000000" // 0.00005 ETH

export const GetQuestsResponseSchema = z.array(QuestAndRewardSchema)
export type GetQuestsResponse = z.infer<typeof GetQuestsResponseSchema>

export const GetQuestsByIdResponseSchema = QuestAndRewardSchema
export type GetQuestByIdResponse = z.infer<typeof GetQuestsByIdResponseSchema>

class QuestService {
  static async getQuests({
    address,
    pageNo,
    pageSize,
    status,
    ethValue,
    questNetwork,
    taskNetwork,
    searchQuery,
  }: {
    address?: EthAddress
    pageNo?: number
    pageSize?: number
    status?: string[]
    ethValue?: string
    questNetwork?: string
    taskNetwork?: string
    searchQuery?: string
  }) {
    if (isValidAddress(address)) {
      return request({
        config: {
          method: "get",
          url: 'v1/quests',
          params: {
            address,
            pageNo,
            pageSize,
            status: status?.join(","),
            ethValue,
            searchQuery,
            taskNetwork,
            questNetwork,
          },
        },
        responseSchema: GetQuestsResponseSchema,
        identifier: "QuestService.getQuests",
      })
    }

    return request({
      config: {
        method: "get",
        url: 'v1/quests',
        params: {
          ethValue: MIN_REWARD_VALUE_WEI,
          pageNo,
          pageSize,
          status,
          searchQuery,
          taskNetwork,
          questNetwork,
        },
      },
      responseSchema: GetQuestsResponseSchema,
      identifier: "QuestService.getPublicQuests",
    })
  }

  // Used to fetch quest info when unauthenticated, this returns the same quest information as getQuestForUser without eligibility info
  static async getQuestById({
    questId,
    address,
  }: {
    questId: string
    address?: EthAddress
  }) {
    if (isNonEmptyString(address)) {
      assert(isValidAddress(address), ERROR.INVALID_ADDRESS)
    }

    const { quest, reward } = await request({
      config: {
        method: "get",
        url: 'v1/quest',
        params: {
          address: isValidAddress(address) ? address : undefined,
          questId
        }
      },
      responseSchema: GetQuestsByIdResponseSchema,
      identifier: "QuestService.getQuestById",
    })

    return {
      ...quest,
      reward
    }
  }
}


export const QuestParticipantSchema = z.object({
  address: EthAddressSchema,
  status: z.enum(['completed', 'claimable']),
  updated_at: z.coerce.date(),
});
export type QuestParticipant = z.infer<typeof QuestParticipantSchema>;

export const GetParticipantsByQuestIdResponseSchema = z.array(
  QuestParticipantSchema,
);
export type GetParticipantsByQuestIdResponse = z.infer<
  typeof GetParticipantsByQuestIdResponseSchema
>;

export const fetchParticipantsByQuestId = async ({
  questId,
  pageSize,
  pageNumber,
  status,
}: {
  questId: string;
  pageSize: number;
  pageNumber: number;
  status?: string[];
}) => {
  assert(isNonEmptyString(questId), 'questId is required');

  return request({
    config: {
      method: 'get',
      url: `v1/participants/${questId}`,
      params: {
        pageSize,
        pageNumber,
        status:
          Array.isArray(status) && status.length > 0
            ? status.join(',')
            : undefined,
      },
    },
    responseSchema: GetParticipantsByQuestIdResponseSchema,
    identifier: 'fetchParticipantsByQuestId',
  });
};

export const fetchParticipantsByAddressAndQuestId = async ({
  questId,
  queryAddress,
  pageSize,
  pageNumber,
}: {
  questId: string;
  queryAddress: string;
  pageSize: number;
  pageNumber: number;
}) => {
  assert(isNonEmptyString(questId), 'questId is required');
  assert(isNonEmptyString(queryAddress), 'queryAddress is required');

  return request({
    config: {
      method: 'get',
      url: `v1/search/${questId}/participants`,
      params: {
        pageSize,
        pageNumber,
        queryAddress,
      },
    },
    responseSchema: GetParticipantsByQuestIdResponseSchema,
    identifier: 'fetchParticipantsByAddressAndQuestId',
  });
};

export default QuestService
