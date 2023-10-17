import { z } from 'zod';
import { isValidAddress } from '../isValidAddress';
import { NetworkNameSchema } from '../networks';

const EthAddressSchema = z.custom<`0x${string}`>((val) =>
  isValidAddress(val),
);

export const RewardTypeSchema = z.union([
  z.literal('ERC20'),
  z.literal('erc20'),
  z.literal('erc1155'),
]);
export type RewardType = z.infer<typeof RewardTypeSchema>;

export const QuestInputActionParamsAmountOperatorEnum = z.enum([
  'any',
  'gt',
  'gte',
  'lt',
  'lte',
  'eq',
]);

export type QuestInputActionParamsAmountOperator = z.infer<
  typeof QuestInputActionParamsAmountOperatorEnum
>;

export const BridgeActionDetailSchema = z.object({
  sourceChainId: z.number(),
  destinationChainId: z.number(),
  tokenAddress: z.string(),
  amount: z.string(),
  amountOperator: QuestInputActionParamsAmountOperatorEnum,
});

export type BridgeActionDetail = z.infer<typeof BridgeActionDetailSchema>;

export const SwapActionDetailSchema = z.object({
  sourceChainId: z.number(),
  sourceTokenAddress: EthAddressSchema,
  targetTokenAddress: EthAddressSchema,
  amount: z.string(),
  amountOperator: QuestInputActionParamsAmountOperatorEnum,
});

export type SwapActionDetail = z.infer<typeof SwapActionDetailSchema>;

export const QuestActionParamsSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('bridge'), data: BridgeActionDetailSchema }),
  z.object({ type: z.literal('swap'), data: SwapActionDetailSchema }),
]);

export type QuestActionParams = z.infer<typeof QuestActionParamsSchema>;

export const RewardSchema = z.object({
  amount: z.string(),
  allocations: z.number(),
  allocationsClaimed: z.number(),
  type: RewardTypeSchema,
  tokenSymbol: z.string().nullish(),
  token: z.string().nullish(),
  network: NetworkNameSchema,
  tokenImage: z.string().nullish(),
  ethValue: z.string().nullish(),
  tokenContractAddress: EthAddressSchema,
  decimals: z.number().nullish(),
  tokenId: z.string().nullish(),
});

export type Reward = z.infer<typeof RewardSchema>;

export const TaskSchema = z.object({
  name: z.string().nullish(),
  description: z.string().optional(),
  link: z.string().optional(),
  iconOption: z.string().optional(),
  contractAddress: z.string().nullish(),
  network: NetworkNameSchema,
});

export type Task = z.infer<typeof TaskSchema>;

const QuestSchema = z.object({
  id: z.string(),
  appLink: z.string(),
  iconOption: z.string(),
  imagePath: z.string(),
  name: z.string(),
  questEnd: z.string().optional(),
  questStart: z.string().optional(),
  description: z.string(),
  network: NetworkNameSchema,
  status: z.string(),
  eligibility: z.object({ eligible: z.boolean() }).optional(),
  createdAt: z.string(),
  contractAddress: EthAddressSchema,
  creatorAddress: EthAddressSchema,
  allowlistEnabled: z.boolean(),
  task: TaskSchema,
  actionParams: QuestActionParamsSchema.optional(),
})
export type Quest = z.infer<typeof QuestSchema>

export const QuestAndRewardSchema = z.object({
  quest: QuestSchema,
  reward: RewardSchema,
})
export type QuestAndReward = z.infer<typeof QuestAndRewardSchema>

export const QuestDetailsSchema = QuestSchema
  .extend({
    reward: RewardSchema
  })
  .strict();

export type QuestDetails = z.infer<typeof QuestDetailsSchema>;
