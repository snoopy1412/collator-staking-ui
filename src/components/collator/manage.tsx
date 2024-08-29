'use client';
import { useState } from 'react';
import { Button, Tooltip } from '@nextui-org/react';
import { CircleHelp } from 'lucide-react';

import StopCollation from './stop-collation';

const ManageCollator = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col gap-[1.25rem]">
      <div className="space-y-[0.62rem]">
        <div className="relative flex flex-col gap-[0.69rem] rounded-medium bg-secondary p-[0.62rem]">
          <div className="text-[0.75rem] font-normal text-foreground/50">Session Key</div>
          <div className="relative flex h-6 items-center justify-between">
            <input
              type="text"
              placeholder="Enter Session Key"
              className="w-full appearance-none bg-transparent pr-16 text-[1rem] font-bold placeholder:text-[0.875rem] placeholder:font-bold placeholder:text-[#c6c6c6] hover:bg-transparent focus-visible:outline-none"
            />
          </div>
        </div>
        <Button color="primary" className="h-[2.125rem] w-full" isDisabled>
          Update Session Key
        </Button>
      </div>
      <div className="space-y-[0.62rem]">
        <div className="relative flex flex-col gap-[0.69rem] rounded-medium bg-secondary p-[0.62rem]">
          <div className="flex items-center gap-1 text-[0.75rem] font-normal text-foreground/50">
            <span>Commission(%)</span>
            <Tooltip
              content={
                <div className="flex max-w-[16.25rem] items-center justify-center p-2 text-[0.75rem] font-normal text-foreground/50">
                  The percent a collator takes off the top of the due staking rewards.
                </div>
              }
              closeDelay={0}
              color="default"
              showArrow
            >
              <CircleHelp size={14} strokeWidth={1} className="cursor-pointer" />
            </Tooltip>
          </div>
          <div className="relative flex h-6 items-center justify-between">
            <input
              type="text"
              placeholder="0"
              className="w-full appearance-none bg-transparent pr-16 text-[1rem] font-bold placeholder:text-[0.875rem] placeholder:font-bold placeholder:text-[#c6c6c6] hover:bg-transparent focus-visible:outline-none"
            />
            <span>%</span>
          </div>
        </div>
        <Button color="primary" className="h-[2.125rem] w-full">
          Update Commission
        </Button>
      </div>

      <Button
        color="primary"
        className="h-[2.125rem] w-full"
        variant="light"
        onClick={() => setOpen(true)}
      >
        Stop Collation
      </Button>
      <StopCollation isOpen={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export default ManageCollator;
