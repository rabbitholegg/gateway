import { useQueries } from '@tanstack/react-query';
import { chunk } from 'lodash';
import { useMemo } from 'react';
import { MAX_ENS_ADDRESSES, fetchEnsAddresses } from '@/services/ens';
import { isValidAddress } from '../isValidAddress';
import { EthAddress, EthAddressSchema } from '../schemas';

function getEnsAddressesQueryKey(addresses: EthAddress[]) {
  return ['ens', { addresses }];
}

export default function useGetEnsAddresses(addresses: EthAddress[]) {
  // dedupe and chunkify addresses in order to avoid hitting the max ens addresses limit on the API
  const dedupedAddresses = useMemo(
    () =>
      chunk(
        Array.from(
          new Set([
            ...addresses
              .filter(isValidAddress)
              .map((address) => EthAddressSchema.parse(address.toLowerCase())),
          ]),
        ),
        MAX_ENS_ADDRESSES,
      ),
    [addresses],
  );

  // Will fetch ENS data for all addresses in paralell
  // see https://tanstack.com/query/v4/docs/vue/guides/parallel-queries
  const queries = useQueries({
    queries: dedupedAddresses.map((chunk) => ({
      queryKey: getEnsAddressesQueryKey(chunk),
      queryFn: () => fetchEnsAddresses(chunk),
      enabled: chunk.length > 0 && chunk.length <= MAX_ENS_ADDRESSES,
      staleTime: 30 * 60 * 1000, // 30 minutes
    })),
  });

  const data = queries
    .map(({ data }) => data)
    .reduce((acc, cur) => {
      return { ...acc, ...cur };
    }, {});

  return useMemo(
    () => ({
      isLoading: queries.some((query) => query.isLoading),
      error: queries.find((query) => query.error)?.error,
      getDataForAddress: (address: EthAddress) => {
        try {
          return data?.[EthAddressSchema.parse(address.toLowerCase())];
        } catch (_) {
          return undefined;
        }
      },
      data,
    }),
    [queries, data],
  );
}
