import { Button, Divider, Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';
import { X } from 'lucide-react';
import AmountInputWithBalance from '@/components/amount-input-with-balance';
import TransactionStatus from '@/components/transaction-status';
import { useCallback, useState } from 'react';
import { parseEther } from 'viem';
import { useUnstakeRING } from '../../_hooks/unstake';
import { CollatorSet } from '@/service/type';

interface EditStakeProps {
  isOpen: boolean;
  onClose: () => void;
  symbol: string;
  collator: `0x${string}`;
  collatorList: CollatorSet[];
  totalAmount: string;
  refreshAmount?: () => void;
}

const Unstake = ({
  isOpen,
  onClose,
  symbol,
  collator,
  collatorList,
  totalAmount,
  refreshAmount
}: EditStakeProps) => {
  const [hash, setHash] = useState<`0x${string}` | undefined>(undefined);
  const [amount, setAmount] = useState<string>('0');
  const { unstakeRING, isPending, isLoadingOldAndNewPrev } = useUnstakeRING({
    collatorList,
    collator,
    inputAmount: parseEther(amount)
  });

  const handleAmountChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  }, []);

  const handleUnstake = useCallback(async () => {
    const tx = await unstakeRING();
    if (tx) {
      setHash(tx);
    }
  }, [unstakeRING]);

  const handleFail = useCallback(() => {
    setHash(undefined);
  }, []);

  const handleSuccess = useCallback(() => {
    setHash(undefined);
    refreshAmount?.();
    onClose();
  }, [onClose, refreshAmount]);
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
          <ModalHeader className="px-0 py-5 text-[1.125rem] text-foreground">Unstake</ModalHeader>

          <Divider />
          <ModalBody className="flex w-full flex-col items-center justify-center gap-5 px-0 py-5">
            <AmountInputWithBalance
              className="w-full"
              symbol={symbol}
              balance={totalAmount}
              text="Staking"
              value={amount}
              onChange={handleAmountChange}
            />
            <Divider />
            <Button
              color="primary"
              className="w-full"
              isDisabled={amount === '0'}
              isLoading={isPending || isLoadingOldAndNewPrev}
              onClick={handleUnstake}
            >
              Unstake
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
      {hash && (
        <TransactionStatus
          hash={hash}
          onFail={handleFail}
          onSuccess={handleSuccess}
          title="Unstake"
        />
      )}
    </>
  );
};

export default Unstake;
