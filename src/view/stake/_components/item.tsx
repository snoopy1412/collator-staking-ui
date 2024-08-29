import { memo } from 'react';

import TooltipFormattedNumber from '@/components/tooltip-formatter-number';
import Avatar from '@/components/avatar';

interface ItemProps {
  address: `0x${string}`;
  amount: string;
  ensName: string;
  id: number;
  onClick: () => void;
  style?: React.CSSProperties;
}
const Item = ({ address, amount, ensName, id, onClick, style }: ItemProps) => {
  return (
    <div style={style}>
      <div className="flex h-[82px] w-full flex-col gap-[0.62rem] rounded-medium bg-secondary p-[0.62rem]">
        <div className="flex items-center justify-between text-[0.75rem] font-normal text-foreground/50">
          <span>No#{id}</span>
          <div
            className="cursor-pointer text-foreground/50 transition-opacity hover:opacity-[--nextui-hover-opacity]"
            onClick={onClick}
          >
            <img
              src="/images/common/setting.svg"
              alt="setting"
              className="block size-4 dark:hidden"
              loading="lazy"
            />
            <img
              src="/images/common/setting-dark.svg"
              alt="setting"
              className="hidden size-4 dark:block"
              loading="lazy"
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[0.62rem]">
            <Avatar address={address} />
            <span className="text-[0.875rem] font-bold text-foreground">{ensName}</span>
          </div>
          <TooltipFormattedNumber
            value={amount}
            interClassName="text-[0.875rem] text-foreground"
            decimalClassName="text-[0.875rem] text-foreground/50"
            zeroClassName="text-[0.875rem] text-foreground/50"
          />
        </div>
      </div>
    </div>
  );
};

export default memo(Item);
