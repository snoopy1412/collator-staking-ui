import React from 'react';
import { Button } from '@nextui-org/react';

import Avatar from '@/components/avatar';

interface ItemProps {
  address: `0x${string}`;
  amount: number;
  ensName: string;
  id: number;
  onClick: () => void;
  style?: React.CSSProperties;
}
const Item = ({ address, amount, ensName, id, onClick, style }: ItemProps) => {
  return (
    <div style={style}>
      <div className="flex w-full flex-col gap-[0.62rem] rounded-medium bg-secondary p-[0.62rem]">
        <div className="flex items-center justify-between text-[0.75rem] font-normal text-foreground/50">
          <div className="flex items-center gap-[0.62rem]">
            <Avatar address={address} className="size-6" />
            <span className="line-clamp-1 text-[0.875rem] font-bold text-foreground">
              {ensName}
            </span>
          </div>
          <span>No#{id}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[0.31rem]">
            <span className="text-[0.75rem] font-normal text-foreground">Rewards</span>
            <span className="text-[0.875rem] font-bold text-primary">1,144.421</span>
          </div>
          <Button size="sm" color="primary" className="font-bold" variant="flat" onClick={onClick}>
            Claim
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Item;
