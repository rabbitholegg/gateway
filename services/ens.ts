import { assert } from '@/lib';
import request from '@/lib/request';
import { EthAddress, EthAddressSchema } from '@/lib/schemas';
import { z } from 'zod';

const EnsDataSchema = z.object({
  ens: z.string().nullish(),
  avatar: z.string().nullish(),
});

export type EnsData = z.infer<typeof EnsDataSchema>;

const FetchEnsAddressesResponseSchema = z.record(
  EthAddressSchema,
  EnsDataSchema,
);

export type FetchEnsAddressesResponse = z.infer<
  typeof FetchEnsAddressesResponseSchema
>;

export const MAX_ENS_ADDRESSES = 25;
export const fetchEnsAddresses = async (addresses: EthAddress[]) => {
  assert(
    addresses.length <= MAX_ENS_ADDRESSES,
    `fetchEnsAddresses: Max ${MAX_ENS_ADDRESSES} addressses allowed`,
  );

  return request({
    config: {
      method: 'get',
      url: 'v1/ens',
      params: {
        addresses: addresses.join(','),
      },
    },
    responseSchema: FetchEnsAddressesResponseSchema,
    identifier: 'fetchEnsAddresses',
  });
};
