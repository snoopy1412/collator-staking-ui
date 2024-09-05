import { useCallback, useMemo, useState } from 'react';

import ClaimList from './list';
import useStakingAccountWithStatus, {
  StakingAccountWithStatus
} from '@/hooks/useStakingAccountWithStatus';
import { useActiveAndWaitingCollators } from '@/hooks/useActiveAndWaitingCollators';
import { useReadContracts } from 'wagmi';
import { abi as rewardAbi } from '@/config/abi/reward';
import { ClaimableReward } from './item';
import useClaim from '../_hooks/cliam';
import TransactionStatus from '@/components/transaction-status';

export const dynamic = 'force-static';

const Claim = () => {
  const [hash, setHash] = useState<`0x${string}` | undefined>(undefined);
  const {
    activeCollators,
    waitingCollators,
    isLoading: isCollatorSetLoading,
    refetch: refetchCollatorSet
  } = useActiveAndWaitingCollators();

  const {
    data: stakingAccount,
    isLoading: isStakingAccountLoading,
    refetch: refetchStakingAccount
  } = useStakingAccountWithStatus({
    activeCollators,
    waitingCollators
  });

  // 计算 rewards
  const { data: rewards } = useReadContracts({
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

  const { claim } = useClaim();

  const stakingAccountWithRewards = useMemo(() => {
    return stakingAccount?.map((item, index) => ({
      ...item,
      reward: rewards?.[index]?.result as bigint
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
    refetchStakingAccount();
    refetchCollatorSet();
  }, [refetchStakingAccount, refetchCollatorSet]);

  const handleError = useCallback(() => {
    setHash(undefined);
  }, []);

  return (
    <>
      <ClaimList
        data={stakingAccountWithRewards as ClaimableReward[]}
        isLoading={isStakingAccountLoading || isCollatorSetLoading}
        onClick={handleClick}
      />
      {hash && (
        <TransactionStatus
          hash={hash}
          title="Claim"
          onSuccess={handleSuccess}
          onFail={handleError}
        />
      )}
    </>
  );
};
export default Claim;
