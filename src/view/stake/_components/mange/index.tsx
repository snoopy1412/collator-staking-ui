import { useMemo, useCallback, useState } from 'react';
import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Spinner,
  Tooltip
} from '@nextui-org/react';
import { X } from 'lucide-react';

import AddressCard from '@/components/address-card';

import StakeMore from './stake-more';
import Unstake from './unstake';
import StakeMoreDeposits from './stake-more-deposits';
import UnstakeDeposits from './unstake-deposts';
import { useStaked } from '../../_hooks/staked';
import { formatEther } from 'viem';
import FormattedNumberTooltip from '@/components/formatted-number-tooltip';
import { CollatorSet } from '@/service/type';

interface ManageStakeeProps {
  isOpen: boolean;
  onClose: () => void;
  symbol: string;
  collatorList: CollatorSet[];
  collator: `0x${string}`;
}

const ManageStake = ({ isOpen, onClose, symbol, collator, collatorList }: ManageStakeeProps) => {
  const [isStakeMoreOpen, setIsStakeMoreOpen] = useState(false);
  const [isUnstakeOpen, setIsUnstakeOpen] = useState(false);
  const [isStakeMoreDepositsOpen, setIsStakeMoreDepositsOpen] = useState(false);
  const [isUnstakeDepositsOpen, setIsUnstakeDepositsOpen] = useState(false);

  const { stakedRING, stakingLocks, stakedDeposits, isLoading, refetch } = useStaked({
    collator
  });

  console.log('stakedDeposits', stakedDeposits);

  const formattedStakedRING = useMemo(() => {
    return stakedRING ? formatEther(stakedRING) : '0';
  }, [stakedRING]);

  const isLocked = useMemo(() => {
    if (stakingLocks) {
      const now = BigInt(Math.floor(Date.now() / 1000));
      return stakingLocks > now;
    }
    return false;
  }, [stakingLocks]);

  const formattedStakedDeposits = useMemo(() => {
    if (stakedDeposits?.length) {
      const amount = stakedDeposits.reduce((acc, deposit) => {
        return acc + deposit.amount;
      }, 0n);
      return formatEther(amount);
    }
    return '0';
  }, [stakedDeposits]);

  const handleCloseStakeMore = useCallback(() => {
    setIsStakeMoreOpen(false);
  }, []);

  const handleCloseUnstake = useCallback(() => {
    setIsUnstakeOpen(false);
  }, []);

  const handleCloseStakeMoreDeposits = useCallback(() => {
    setIsStakeMoreDepositsOpen(false);
  }, []);

  const handleCloseUnstakeDeposits = useCallback(() => {
    setIsUnstakeDepositsOpen(false);
  }, []);

  const renderDays = useMemo(() => {
    return (
      <span>
        <span className="text-primary">1</span> day
      </span>
    );
  }, []);

  return (
    <>
      <Modal
        placement="center"
        isOpen={isOpen}
        onClose={onClose}
        backdrop="blur"
        classNames={{
          closeButton:
            'p-0 top-[1.35rem] right-[1.35rem] hover:opacity-[var(--nextui-hover-opacity)] hover:bg-transparent'
        }}
        className="bg-background"
        closeButton={<X strokeWidth={1.5} />}
      >
        <ModalContent className="w-[calc(100vw-1.24rem)] px-5 py-0 md:w-[25rem]">
          <ModalHeader className="px-0 py-5 text-[1.125rem] text-foreground">
            Manage Stake
          </ModalHeader>
          <Divider />
          <ModalBody className="relative flex w-full flex-col items-center justify-center gap-5 px-0 py-5">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/50">
                <Spinner />
              </div>
            )}

            <div className="flex w-full flex-col gap-[0.62rem]">
              <div className="flex flex-col gap-[0.62rem] rounded-medium bg-secondary p-[0.62rem] hover:opacity-[var(--nextui-opacity-hover)]">
                <p className="m-0 text-[0.875rem] text-foreground/50">Collator</p>
                <div className="flex items-center justify-between">
                  <AddressCard address={collator} copyable={false} />
                </div>
              </div>

              <div className="flex flex-col gap-[0.62rem] rounded-medium bg-secondary p-[0.62rem] hover:opacity-[var(--nextui-opacity-hover)]">
                <p className="m-0 text-[0.875rem] text-foreground/50">{symbol}</p>
                <div className="flex items-center justify-between">
                  <FormattedNumberTooltip value={formattedStakedRING}>
                    {(formattedValue) => (
                      <p className="m-0 text-[0.875rem] font-bold text-foreground">
                        {formattedValue}
                      </p>
                    )}
                  </FormattedNumberTooltip>
                  <div className="flex items-center gap-[0.62rem]">
                    {isLocked ? (
                      <Tooltip
                        content={
                          <div className="max-w-[16.25rem] p-2 text-[0.75rem] font-normal text-foreground">
                            You can perform the unstake operation {renderDays} after your last stake
                            with the selected collator. You have {renderDays} remaining before you
                            can unstake.
                          </div>
                        }
                        closeDelay={0}
                        color="default"
                        showArrow
                      >
                        <Button
                          variant="flat"
                          size="sm"
                          color="primary"
                          isDisabled
                          className="font-bold"
                          onClick={() => setIsUnstakeOpen(true)}
                        >
                          Unstake
                        </Button>
                      </Tooltip>
                    ) : (
                      <Button
                        variant="flat"
                        size="sm"
                        color="primary"
                        isDisabled={isLocked}
                        className="font-bold"
                        onClick={() => setIsUnstakeOpen(true)}
                      >
                        Unstake
                      </Button>
                    )}

                    <Button
                      size="sm"
                      color="primary"
                      onClick={() => setIsStakeMoreOpen(true)}
                      className="font-bold"
                    >
                      Stake
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-[0.62rem] rounded-medium bg-secondary p-[0.62rem] hover:opacity-[var(--nextui-opacity-hover)]">
                <p className="m-0 text-[0.875rem] text-foreground/50">Deposit {symbol}</p>
                <div className="flex items-center justify-between">
                  <FormattedNumberTooltip value={formattedStakedDeposits}>
                    {(formattedValue) => (
                      <p className="m-0 text-[0.875rem] font-bold text-foreground">
                        {formattedValue}
                      </p>
                    )}
                  </FormattedNumberTooltip>
                  <div className="flex items-center gap-[0.62rem]">
                    {isLocked ? (
                      <Tooltip
                        content={
                          <div className="max-w-[16.25rem] p-2 text-[0.75rem] font-normal text-foreground">
                            You can perform the unstake operation {renderDays} after your last stake
                            with the selected collator. You have {renderDays} remaining before you
                            can unstake.
                          </div>
                        }
                        closeDelay={0}
                        color="default"
                        showArrow
                      >
                        <Button
                          variant="flat"
                          size="sm"
                          color="primary"
                          isDisabled
                          className="font-bold"
                          onClick={() => setIsUnstakeDepositsOpen(true)}
                        >
                          Unstake
                        </Button>
                      </Tooltip>
                    ) : (
                      <Button
                        variant="flat"
                        size="sm"
                        color="primary"
                        isDisabled={isLocked}
                        className="font-bold"
                        onClick={() => setIsUnstakeDepositsOpen(true)}
                      >
                        Unstake
                      </Button>
                    )}
                    <Button
                      size="sm"
                      color="primary"
                      className="font-bold"
                      onClick={() => setIsStakeMoreDepositsOpen(true)}
                    >
                      Stake
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
      <StakeMore
        isOpen={isStakeMoreOpen}
        onClose={handleCloseStakeMore}
        collator={collator}
        collatorList={collatorList}
      />
      <Unstake
        isOpen={isUnstakeOpen}
        onClose={handleCloseUnstake}
        symbol={symbol}
        totalAmount={formattedStakedRING}
        refreshAmount={refetch}
        collator={collator}
        collatorList={collatorList}
      />
      <StakeMoreDeposits
        isOpen={isStakeMoreDepositsOpen}
        onClose={handleCloseStakeMoreDeposits}
        collators={collatorList}
        targetCollator={collator}
      />
      <UnstakeDeposits
        isOpen={isUnstakeDepositsOpen}
        onClose={handleCloseUnstakeDeposits}
        symbol={symbol}
        deposits={stakedDeposits}
        collators={collatorList}
        targetCollator={collator}
      />
    </>
  );
};

export default ManageStake;
