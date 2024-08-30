import { Suspense, useCallback, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@nextui-org/react';

import { getStakeData } from '@/faker-data';

import StakeList from './list';
import NewStake from './new';
import MangeStake from './mange';

const StakePage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['stakes'],
    queryFn: () => getStakeData()
  });

  const [isNewStakeOpen, setIsNewStakeOpen] = useState(false);
  const [isEditStakeOpen, setIsEditStakeOpen] = useState(false);

  const handleCloseNewStake = useCallback(() => {
    setIsNewStakeOpen(false);
  }, []);

  const handleCloseEditStake = useCallback(() => {
    setIsEditStakeOpen(false);
  }, []);

  const handleClick = useCallback((item: any) => {
    setIsEditStakeOpen(true);
  }, []);
  return (
    <Suspense
      fallback={
        <div>
          LoadingLoadingLoadingLoadingLoadingLoadingLoadingLoadingLoadingLoadingLoadingLoadingLoadingLoadingLoading...
        </div>
      }
    >
      <div className="flex flex-col gap-[1.25rem]">
        <StakeList data={data} isLoading={isLoading} onClick={handleClick} />

        <div className="flex flex-col gap-[0.62rem]">
          <Button className="w-full" color="primary" onClick={() => setIsNewStakeOpen(true)}>
            New Stake
          </Button>
        </div>
      </div>
      <NewStake isOpen={isNewStakeOpen} onClose={handleCloseNewStake} />
      <MangeStake isOpen={isEditStakeOpen} onClose={handleCloseEditStake} symbol="ETH" />
    </Suspense>
  );
};

export default StakePage;
