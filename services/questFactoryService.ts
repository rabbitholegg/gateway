import { assert, isNonEmptyString, isValidAddress } from '@/lib';
import questFactoryAbi from '@/lib/abi/quest-factory';
import { ERROR } from '@/lib/constants';
import request from '@/lib/request';
import { EthAddress, EthAddressSchema } from '@/lib/schemas';
import { zeroAddress } from 'viem';
import { type PublicClient, type WalletClient } from 'wagmi';
import { z } from 'zod';

const QUEST_CONTRACT_ADDRESS = "0x52629961F71C1C2564C5aa22372CB1b9fa9EBA3E"

const MintReceiptRequestSchema = z.object({
  questId: z.string(),
  address: z.string(),
  referrerAddress: z.string().optional(),
});

const MintReceiptResponseSchema = z.object({
  signature: z.string(),
  hash: z.string(),
  fee: z.string(),
  referrerAddress: z.string().optional(),
});

class QuestFactoryService {
  static async getHashAndSignatureForQuest(
    address: string,
    questId: string,
    referrerAddress?: string,
  ) {
    assert(isNonEmptyString(questId), 'invalid questId');
    assert(isValidAddress(address), ERROR.INVALID_ADDRESS);

    return request({
      config: {
        method: 'post',
        url: 'v1/quest/claim',
        data: { questId, address, referrerAddress },
      },
      requestSchema: MintReceiptRequestSchema,
      responseSchema: MintReceiptResponseSchema,
      identifier: 'QuestFactoryService.getHashAndSignatureForQuest',
    });
  }

  static async claimReward({
    publicClient,
    walletClient,
    address,
    questId,
    referrer,
  }: {
    publicClient: PublicClient;
    walletClient: WalletClient;
    address: EthAddress;
    questId: string;
    referrer?: string;
  }) {
    const { hash, signature, fee, referrerAddress } =
      await this.getHashAndSignatureForQuest(address, questId, referrer);

    const adjustedReferrerAddress = isValidAddress(referrerAddress)
      ? referrerAddress
      : zeroAddress;

    const { request } = await publicClient.simulateContract({
      account: address,
      address: EthAddressSchema.parse(QUEST_CONTRACT_ADDRESS),
      abi: questFactoryAbi,
      functionName: 'claim',
      // @ts-expect-error viem is very strict here and expects hash and signature to be in the form of `0x` strings
      args: [questId, hash, signature, adjustedReferrerAddress],
      value: BigInt(fee),
    });

    return walletClient.writeContract(request);
  }
}

export default QuestFactoryService;
