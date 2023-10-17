import { fetchTokenDetailsForContractAddress } from '@/services/tokens';
import { useQuery } from '@tanstack/react-query';
import { minutesToMilliseconds } from 'date-fns';
import { isNumber } from 'lodash';
import { assert } from '../assert';
import { isValidAddress } from '../isValidAddress';
import { EthAddress } from '../schemas';

type Options = {
  contractAddress?: EthAddress;
  chainId?: number;
  enabled?: boolean;
};

function getTokenDetailsForContractAddressQueryKey({
  contractAddress,
  chainId,
}: Options) {
  return ['usd-value', { chainId, contractAddress }];
}

export default function useGetTokenDetailsForContractAddress({
  contractAddress,
  chainId,
  enabled = true,
}: Options) {
  return useQuery({
    queryKey: getTokenDetailsForContractAddressQueryKey({
      contractAddress,
      chainId,
    }),
    queryFn: () => {
      assert(isNumber(chainId), 'chainId must be a number');
      assert(
        isValidAddress(contractAddress),
        'contractAddress must be valid contract address',
      );
      return fetchTokenDetailsForContractAddress({ contractAddress, chainId });
    },
    enabled: enabled && isNumber(chainId) && isValidAddress(contractAddress),
    staleTime: minutesToMilliseconds(5),
    retry: 0,
    refetchOnWindowFocus: (query) => query.state.status !== 'error',
  });
}
