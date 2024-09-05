import { Button, Divider, Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';
import { X } from 'lucide-react';
import AmountInputWithBalance from '@/components/amount-input-with-balance';
import useBalance from '@/hooks/useBalance';
import { useCallback, useState } from 'react';
import { useRingStake } from '@/view/stake/_hooks/stake';
import type { CollatorSet } from '@/service/type';
import { parseEther } from 'viem';
import TransactionStatus from '@/components/transaction-status';

interface StakeMoreProps {
  isOpen: boolean;
  collator: `0x${string}`;
  collatorList: CollatorSet[];
  onClose: () => void;
}

const StakeMore = ({ isOpen, onClose, collator, collatorList }: StakeMoreProps) => {
  const [hash, setHash] = useState<`0x${string}` | undefined>(undefined);
  const [amount, setAmount] = useState<string | undefined>('0');

  const { formatted, isLoading, data: balance, refetch: refetchBalance } = useBalance();

  const { handleStake, isPending, isLoadingOldAndNewPrev } = useRingStake({
    collators: collatorList,
    targetCollator: collator,
    assets: parseEther(amount || '0')
  });

  const handleStakeMore = useCallback(async () => {
    const hash = await handleStake();
    if (hash) {
      setHash(hash);
    }
  }, [handleStake]);

  const handleAmountChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  }, []);

  const handleFail = useCallback(() => {
    setHash(undefined);
  }, []);

  const handleSuccess = useCallback(() => {
    setHash(undefined);
    refetchBalance();
    onClose();
  }, [onClose, refetchBalance]);

  return (
    <>
      <Modal
        placement="center"
        isOpen={isOpen}
        onClose={onClose}
        backdrop="blur"
        className="bg-background"
        classNames={{
          closeButton:
            'p-0 top-[1.35rem] right-[1.35rem] hover:opacity-[var(--nextui-hover-opacity)] hover:bg-transparent'
        }}
        closeButton={<X strokeWidth={1.5} />}
      >
        <ModalContent className="w-[calc(100vw-1.24rem)] px-5 py-0 md:w-[25rem]">
          <ModalHeader className="px-0 py-5 text-[1.125rem] text-foreground">
            Stake More
          </ModalHeader>

          <Divider />
          <ModalBody className="flex w-full flex-col items-center justify-center gap-5 px-0 py-5">
            <AmountInputWithBalance
              className="w-full"
              symbol={balance?.symbol}
              balance={formatted}
              isLoading={isLoading}
              value={amount}
              onChange={handleAmountChange}
            />
            <Divider />
            <Button
              color="primary"
              className="w-full"
              onClick={handleStakeMore}
              isDisabled={amount === '0'}
              isLoading={isLoadingOldAndNewPrev || isPending}
            >
              Stake
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>

      {hash && (
        <TransactionStatus
          hash={hash}
          onFail={handleFail}
          onSuccess={handleSuccess}
          title="Stake"
        />
      )}
    </>
  );
};

export default StakeMore;
