import React, { useCallback, useState } from 'react';
import { Button } from '@nextui-org/react';

import Avatar from '@/components/avatar';
import { StakingAccountWithStatus } from '@/hooks/useStakingAccountWithStatus';
import { formatNumericValue, toShortAddress } from '@/utils';
import { formatEther } from 'viem';

export interface ClaimableReward extends StakingAccountWithStatus {
  reward: bigint;
}

interface ClaimableRewardCardProps {
  reward: ClaimableReward;
  onClick: () => void;
  style?: React.CSSProperties;
}

function ClaimableRewardCard({ reward, onClick, style }: ClaimableRewardCardProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(async () => {
    setIsLoading(true);
    await onClick();
    setIsLoading(false);
  }, [onClick]);

  const formattedBalance = formatNumericValue(
    reward?.reward ? formatEther(reward?.reward) : '0',
    2
  );

  return (
    <div style={style}>
      <div className="flex w-full flex-col gap-[0.62rem] rounded-medium bg-secondary p-[0.62rem]">
        <div className="flex items-center justify-between text-[0.75rem] font-normal text-foreground/50">
          <div className="flex items-center gap-[0.62rem]">
            <Avatar address={reward?.collator || '0x'} className="size-6" />
            <span
              className="line-clamp-1 text-[0.875rem] font-bold text-foreground"
              title={reward?.collator}
            >
              {toShortAddress(reward?.collator) || ''}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[0.31rem]">
            <span className="text-[0.75rem] font-normal text-foreground">Rewards</span>
            <span className="text-[0.875rem] font-bold text-primary">{formattedBalance.fixed}</span>
          </div>
          <Button
            isLoading={isLoading}
            size="sm"
            color="primary"
            className="font-bold"
            variant="flat"
            onClick={handleClick}
          >
            Claim
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ClaimableRewardCard;
