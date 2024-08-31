import { Divider, Link } from '@nextui-org/react';

import AmountInputWithBalance from '@/components/amount-input-with-balance';
import useBalance from '@/hooks/useBalance';
import { useCallback, useState } from 'react';

interface StakeRingProps {
  className?: string;
}
const StakeRing = ({ className }: StakeRingProps) => {
  const [amount, setAmount] = useState<string | undefined>('0');
  const { formatted, isLoading, data: balance, refetch: refetchBalance } = useBalance();

  const handleAmountChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  }, []);

  return (
    <div className="flex w-full flex-col gap-5">
      <AmountInputWithBalance
        className={className}
        symbol={balance?.symbol}
        balance={formatted}
        isLoading={isLoading}
        value={amount}
        onChange={handleAmountChange}
      />
      <Divider />
      <p className="m-0 text-[0.75rem] font-normal text-foreground/50">
        Please note that staking has a lock-up period, and you can only unstake after 24 hours.
        Stake RING to automatically receive{' '}
        <span className="inline-flex items-center gap-1 text-[0.75rem] text-[#0094FF]">
          <span>gRING</span>
          <img
            src="/images/common/metamask.svg"
            alt="metamask"
            className="hidden size-4 cursor-pointer md:inline"
          />
        </span>
        , which allows you to participate in{' '}
        <Link href="#" className="text-[0.75rem] text-[#0094FF]">
          RingDAO governance
        </Link>
      </p>
      <p className="m-0 text-[0.75rem] font-normal text-foreground/50">
        Please note that gRING is non-transferable
      </p>
    </div>
  );
};

export default StakeRing;
