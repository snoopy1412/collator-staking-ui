import { useStakingAccount } from '@/hooks/useService';
import TooltipFormattedNumber from './tooltip-formatter-number';
import useWalletStatus from '@/hooks/useWalletStatus';
import { formatEther } from 'viem';
import { Skeleton } from '@nextui-org/react';

const ReservedStakingPanel = () => {
  const { address, currentChainId } = useWalletStatus();
  const { data, isLoading } = useStakingAccount({
    where: {
      account: {
        _eq: address
      },
      chainId: {
        _eq: currentChainId
      }
    }
  });
  const totalAmount =
    data?.reduce((acc, item) => acc + (item.assets ? BigInt(item.assets) : 0n), 0n) ?? 0n;

  const formattedTotalAmount = formatEther(totalAmount);
  return (
    <div className="relative flex h-[11rem] w-full flex-col items-center justify-center gap-[0.625rem] rounded-medium bg-secondary p-5 md:w-[22.5rem]">
      <div className="relative mt-[0.62rem] size-[3.75rem]">
        <img src="/images/token/ring.svg" alt="ring" className="h-[60px] w-[60px]" />
      </div>
      <p className="m-0 text-[0.875rem] font-normal text-foreground">Reserved in Staking</p>
      {isLoading ? (
        <Skeleton className="h-[2rem] w-full max-w-[10rem] rounded-medium" />
      ) : (
        <TooltipFormattedNumber value={formattedTotalAmount} />
      )}
    </div>
  );
};

export default ReservedStakingPanel;
