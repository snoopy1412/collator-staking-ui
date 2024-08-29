import { Link, Divider, ScrollShadow } from '@nextui-org/react';

import DepositItem from '@/components/deposit-item';

const StakeDeposit = () => {
  return (
    <div className="flex flex-col gap-5">
      <ScrollShadow hideScrollBar className="max-h-[15.06rem] w-full space-y-[1.25rem]" size={20}>
        <DepositItem id="1" amount={1000} symbol="USDT" onSelect={() => {}} />
        <DepositItem id="2" amount={2000} symbol="USDT" onSelect={() => {}} />
        <DepositItem id="3" amount={3000} symbol="USDT" onSelect={() => {}} />
        <DepositItem id="4" amount={4000} symbol="USDT" onSelect={() => {}} />
        <DepositItem id="5" amount={5000} symbol="USDT" onSelect={() => {}} />
        <DepositItem id="5" amount={5000} symbol="USDT" onSelect={() => {}} />
        <DepositItem id="7" amount={7000} symbol="USDT" onSelect={() => {}} />
        <DepositItem id="8" amount={8000} symbol="USDT" onSelect={() => {}} />
        <DepositItem id="9" amount={9000} symbol="USDT" onSelect={() => {}} />
      </ScrollShadow>
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
};

export default StakeDeposit;
