import { useQuery } from '@tanstack/react-query';
import { isNonEmptyString, isValidAddress } from '..';
import AuthService from '../auth';
import { EthAddress } from '../schemas';

function getSessionQueryKey({ address }: { address?: EthAddress }) {
  return ['user-session', address];
}

type UseGetSessionOptions = Partial<{
  address?: EthAddress;
}>;

// unfortunately connectkit does not support custom session props
// https://github.com/family/connectkit/discussions/118
export const useGetSession = ({ address }: UseGetSessionOptions) => {
  return useQuery({
    queryKey: getSessionQueryKey({ address }),
    queryFn: AuthService.getSession,
    enabled: isNonEmptyString(address) && isValidAddress(address),
  });
};
