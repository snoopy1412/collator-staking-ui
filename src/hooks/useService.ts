import { useQuery } from '@tanstack/react-query';

import { fetchCollatorSet, fetchStakingAccount } from '@/service/services';
import type { CollatorSetQueryParams, StakingAccountQueryParams } from '@/service/type';

export function useCollatorSet(params: CollatorSetQueryParams = {}) {
  return useQuery({
    queryKey: ['collatorSet', params],
    queryFn: async () => {
      const result = await fetchCollatorSet(params);
      if (result === null) {
        throw new Error('Failed to fetch collator set');
      }
      return result;
    }
  });
}

export type StakingAccountParams = {
  address?: string;
  currentChainId?: number;
};
export function useStakingAccount({ address, currentChainId }: StakingAccountParams) {
  const params: StakingAccountQueryParams = {
    where: {
      account: {
        _eq: address
      },
      chainId: {
        _eq: currentChainId
      }
    }
  };
  const queryKey = ['stakingAccount', params];
  const result = useQuery({
    queryKey,
    queryFn: async () => {
      const result = await fetchStakingAccount(params);
      if (result === null) {
        throw new Error('Failed to fetch staking account');
      }
      return result;
    },
    enabled: !!address && !!currentChainId
  });

  return { ...result, queryKey };
}
