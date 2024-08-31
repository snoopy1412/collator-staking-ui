import { Button, Divider, Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';
import { X } from 'lucide-react';

import DepositList, { DepositListRef } from '@/components/deposit-list';
import { useRef } from 'react';

interface EditStakeProps {
  isOpen: boolean;
  onClose: () => void;
  symbol: string;
}

const StakeMoreDeposits = ({ isOpen, onClose }: EditStakeProps) => {
  const depositListRef = useRef<DepositListRef>(null);
  const handleStake = () => {
    const checkedDepositId = depositListRef.current?.getCheckedDepositId();
    console.log(checkedDepositId);
  };
  return (
    <Modal
      placement="center"
      isOpen={isOpen}
      onOpenChange={onClose}
      className="bg-background"
      classNames={{
        closeButton:
          'p-0 top-[1.35rem] right-[1.35rem] hover:opacity-[var(--nextui-hover-opacity)] hover:bg-transparent'
      }}
      closeButton={<X strokeWidth={1.5} />}
    >
      <ModalContent className="w-[calc(100vw-1.24rem)] px-5 py-0 md:w-[25rem]">
        <ModalHeader className="px-0 py-5 text-[1.125rem] text-foreground">
          Stake more deposits
        </ModalHeader>
        <Divider />
        <ModalBody className="flex w-full flex-col items-center justify-center gap-5 px-0 py-5">
          <DepositList ref={depositListRef} />
          <Divider />
          <Button color="primary" className="w-full" onClick={handleStake}>
            Stake
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default StakeMoreDeposits;
