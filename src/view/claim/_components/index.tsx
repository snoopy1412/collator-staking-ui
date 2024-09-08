import { useCallback, useMemo, useState } from 'react';
import { useReadContracts } from 'wagmi';
import useStakingAccountWithStatus, {
  StakingAccountWithStatus
} from '@/hooks/useStakingAccountWithStatus';
import TransactionStatus from '@/components/transaction-status';
import { useActiveAndWaitingCollators } from '@/hooks/useActiveAndWaitingCollators';
import { abi as rewardAbi } from '@/config/abi/reward';
import { ClaimableReward } from './item';
import useClaim from '../_hooks/cliam';
import ClaimList from './list';

const Claim = () => {
  const [hash, setHash] = useState<`0x${string}` | undefined>(undefined);
  const {
    activeCollators,
    waitingCollators,
    isLoading: isCollatorSetLoading
  } = useActiveAndWaitingCollators();

  const { claim } = useClaim();

  const { data: stakingAccount, isLoading: isStakingAccountLoading } = useStakingAccountWithStatus({
    activeCollators,
    waitingCollators
  });

  const {
    data: rewards,
    refetch: refetchRewards,
    isLoading: isRewardsLoading,
    isRefetching: isRewardsRefetching
  } = useReadContracts({
    contracts: stakingAccount?.map((item) => ({
      address: item?.pool as `0x${string}`,
      abi: rewardAbi,
      functionName: 'earned',
      args: [item?.account as `0x${string}`]
    })),
    query: {
      enabled: !!stakingAccount && !!stakingAccount?.length
    }
  });

  const stakingAccountWithRewards = useMemo(() => {
    return stakingAccount?.map((item, index) => ({
      ...item,
      reward:
        typeof rewards?.[index]?.result === 'undefined' ? 0n : (rewards?.[index]?.result as bigint)
    }));
  }, [stakingAccount, rewards]);

  const handleClick = useCallback(
    async (item: StakingAccountWithStatus) => {
      const tx = await claim(item?.collator as `0x${string}`);
      if (tx) {
        setHash(tx);
      }
    },
    [claim]
  );

  const handleSuccess = useCallback(() => {
    setHash(undefined);
    refetchRewards();
  }, [refetchRewards]);

  const handleError = useCallback(() => {
    setHash(undefined);
  }, []);

  return (
    <>
      <ClaimList
        data={stakingAccountWithRewards as ClaimableReward[]}
        isLoading={isStakingAccountLoading || isCollatorSetLoading}
        rewardIsLoading={isRewardsLoading || isRewardsRefetching}
        onClick={handleClick}
      />
      <TransactionStatus hash={hash} title="Claim" onSuccess={handleSuccess} onFail={handleError} />
    </>
  );
};
export default Claim;
