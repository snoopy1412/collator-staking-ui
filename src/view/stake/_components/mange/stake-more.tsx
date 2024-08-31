import { Button, Divider, Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';
import { X } from 'lucide-react';

import AmountInputWithBalance from '@/components/amount-input-with-balance';
import useBalance from '@/hooks/useBalance';
import { useCallback, useState } from 'react';

interface StakeMoreProps {
  isOpen: boolean;
  onClose: () => void;
}

const StakeMore = ({ isOpen, onClose }: StakeMoreProps) => {
  const [amount, setAmount] = useState<string | undefined>('0');

  const { formatted, isLoading, data: balance, refetch: refetchBalance } = useBalance();

  const handleAmountChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  }, []);

  return (
    <Modal
      placement="center"
      isOpen={isOpen}
      onOpenChange={onClose}
      backdrop="blur"
      className="bg-background"
      classNames={{
        closeButton:
          'p-0 top-[1.35rem] right-[1.35rem] hover:opacity-[var(--nextui-hover-opacity)] hover:bg-transparent'
      }}
      closeButton={<X strokeWidth={1.5} />}
    >
      <ModalContent className="w-[calc(100vw-1.24rem)] px-5 py-0 md:w-[25rem]">
        <ModalHeader className="px-0 py-5 text-[1.125rem] text-foreground">Stake More</ModalHeader>

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
          <Button color="primary" className="w-full">
            Stake
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default StakeMore;
