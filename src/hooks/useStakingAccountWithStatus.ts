import { useMemo } from 'react';
import useWalletStatus from './useWalletStatus';
import { useStakingAccount } from './useService';
import type { CollatorSet, StakingAccount } from '@/service/type';

export type StakingAccountWithStatus = StakingAccount & {
  status?: 'active' | 'inactive' | 'waiting';
};

type UseStakingAccountWithStatusProps = {
  activeCollators: CollatorSet[];
  waitingCollators: CollatorSet[];
};
const useStakingAccountWithStatus = ({
  activeCollators,
  waitingCollators
}: UseStakingAccountWithStatusProps) => {
  const { address, currentChainId } = useWalletStatus();

  const { data, isLoading, isRefetching, refetch } = useStakingAccount({
    address,
    currentChainId
  });
  const processedData = useMemo<StakingAccountWithStatus[]>(() => {
    if (!data) return [];

    return data.map((account) => {
      const activeCollator = activeCollators.find((c) => c.address === account.collator);
      const waitingCollator = waitingCollators.find((c) => c.address === account.collator);

      let status: 'active' | 'inactive' | 'waiting' | undefined;

      if (activeCollator?.inset === 0 || waitingCollator?.inset === 0) {
        status = 'inactive';
      } else if (activeCollator?.inset === 1) {
        status = 'active';
      } else if (waitingCollator?.inset === 1) {
        status = 'waiting';
      } else {
        status = undefined; // 默认状态
      }

      return { ...account, status };
    });
  }, [data, activeCollators, waitingCollators]);

  return {
    data: processedData,
    isLoading: isLoading || isRefetching,
    isRefetching,
    refetch
  };
};

export default useStakingAccountWithStatus;
