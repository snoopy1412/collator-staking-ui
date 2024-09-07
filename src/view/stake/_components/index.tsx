import { Suspense, useCallback, useState } from 'react';
import { Button } from '@nextui-org/react';
import { useActiveAndWaitingCollators } from '@/hooks/useActiveAndWaitingCollators';

import StakeList from './list';
import NewStake from './new';
import MangeStake from './mange';
import useStakingAccountWithStatus from '@/hooks/useStakingAccountWithStatus';

import type { StakingAccountWithStatus } from '@/hooks/useStakingAccountWithStatus';
import useWalletStatus from '@/hooks/useWalletStatus';

const StakePage = () => {
  const { currentChain } = useWalletStatus();
  const [current, setCurrent] = useState<StakingAccountWithStatus | null>(null);
  const {
    collators,
    activeCollators,
    waitingCollators,
    isLoading: isCollatorSetLoading,
    refetch
  } = useActiveAndWaitingCollators();

  const { data: stakingAccount, isLoading: isStakingAccountLoading } = useStakingAccountWithStatus({
    activeCollators,
    waitingCollators
  });

  const [isNewStakeOpen, setIsNewStakeOpen] = useState(false);
  const [isEditStakeOpen, setIsEditStakeOpen] = useState(false);

  const handleCloseNewStake = useCallback(() => {
    setIsNewStakeOpen(false);
  }, []);

  const handleCloseEditStake = useCallback(() => {
    setIsEditStakeOpen(false);
  }, []);

  const handleClick = useCallback((item: StakingAccountWithStatus) => {
    setCurrent(item);
    setIsEditStakeOpen(true);
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex flex-col gap-[1.25rem]">
        <StakeList
          data={stakingAccount}
          isLoading={isStakingAccountLoading}
          onClick={handleClick}
        />

        <div className="flex flex-col gap-[0.62rem]">
          <Button className="w-full" color="primary" onClick={() => setIsNewStakeOpen(true)}>
            New Stake
          </Button>
        </div>
      </div>
      <NewStake
        isOpen={isNewStakeOpen}
        onClose={handleCloseNewStake}
        collators={collators}
        activeCollators={activeCollators}
        waitingCollators={waitingCollators}
        isLoading={isCollatorSetLoading}
      />
      {current?.collator && (
        <MangeStake
          isOpen={isEditStakeOpen}
          onClose={handleCloseEditStake}
          symbol={currentChain?.nativeCurrency.symbol || ''}
          collator={current?.collator}
          collatorList={collators}
        />
      )}
    </Suspense>
  );
};

export default StakePage;
