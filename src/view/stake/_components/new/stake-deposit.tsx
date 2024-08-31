import { Link, Divider } from '@nextui-org/react';

import DepositList, { DepositListRef } from '@/components/deposit-list';
import { forwardRef } from 'react';

const StakeDeposit = forwardRef<DepositListRef>((_props, ref) => {
  return (
    <div className="flex flex-col gap-5">
      <DepositList ref={ref} />

      <Divider />
      <p className="m-0 text-[0.75rem] font-normal text-foreground/50">
        Both staked Deposit and Deposit can be used to participate in{' '}
        <Link href="#" className="text-[0.75rem] text-[#0094FF]">
          RingDAO governance
        </Link>
        .
      </p>
    </div>
  );
});

export default StakeDeposit;
