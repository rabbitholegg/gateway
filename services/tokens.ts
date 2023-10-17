import request from '@/lib/request';
import { EthAddress } from '@/lib/schemas';
import { z } from 'zod';

export const GetTokenDetailsForContractAddressResponseSchema = z.object({
  name: z.string(),
  address: z.string(),
  chainId: z.number(),
  decimals: z.number(),
  symbol: z.string(),
  imageUri: z.string(),
});

export type GetTokenDetailsForContractAddressResponse = z.infer<
  typeof GetTokenDetailsForContractAddressResponseSchema
>;

const GetUsdValueForContractAddressResponseSchema = z.object({
  usdValue: z.number(),
});

export type GetUsdValueForContractAddressResponse = z.infer<
  typeof GetUsdValueForContractAddressResponseSchema
>;

export const fetchTokenDetailsForContractAddress = async ({
  contractAddress,
  chainId,
}: {
  contractAddress: EthAddress;
  chainId: number;
}) => {
  return request({
    config: {
      method: 'get',
      url: `v1/tokens/${chainId}/${contractAddress}`,
    },
    responseSchema: GetTokenDetailsForContractAddressResponseSchema,
    identifier: 'fetchTokenDetailsForContractAddress',
  });
};

export const fetchUsdValueForContractAddress = async ({
  contractAddress,
  chainId,
}: {
  contractAddress: EthAddress;
  chainId: number;
}) => {
  return request({
    config: {
      method: 'get',
      url: `v1/tokens/${chainId}/${contractAddress}/usd-value`,
    },
    responseSchema: GetUsdValueForContractAddressResponseSchema,
    identifier: 'fetchUsdValueForContractAddress',
  });
};

export const fetchUsdValueForEthereum = async ({
  timestamp,
}: {
  timestamp: number;
}) => {
  return request({
    config: {
      method: 'get',
      url: 'v1/tokens/eth-to-usd',
      params: { timestamp },
    },
    responseSchema: GetUsdValueForContractAddressResponseSchema,
    identifier: 'fetchUsdValueForEthereum',
  });
};
