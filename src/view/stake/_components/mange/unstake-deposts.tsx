import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ScrollShadow
} from '@nextui-org/react';
import { X } from 'lucide-react';

import DepositItem from '@/components/deposit-item';

interface EditStakeProps {
  isOpen: boolean;
  onClose: () => void;
  symbol: string;
}

const UnstakeDeposits = ({ isOpen, onClose }: EditStakeProps) => {
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
          Unstake deposits
        </ModalHeader>
        <Divider />
        <ModalBody className="flex w-full flex-col items-center justify-center gap-5 px-0 py-5">
          <ScrollShadow
            hideScrollBar
            className="max-h-[15.06rem] w-full space-y-[1.25rem]"
            size={20}
          >
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

          <Button color="primary" className="w-full">
            Unstake
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default UnstakeDeposits;
