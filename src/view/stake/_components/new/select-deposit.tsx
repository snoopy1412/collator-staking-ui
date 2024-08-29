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

interface SelectDepositProps {
  isOpen: boolean;
  onClose: () => void;
}

const SelectDeposit = ({ isOpen, onClose }: SelectDepositProps) => {
  return (
    <Modal
      placement="center"
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      classNames={{
        closeButton:
          'p-0 top-[1.25rem] right-[1.25rem] hover:opacity-[var(--nextui-hover-opacity)] hover:bg-transparent'
      }}
      className="bg-background"
      closeButton={<X />}
    >
      <ModalContent className="w-[calc(100vw-1.24rem)] md:w-[35.625rem]">
        <div className="flex flex-col gap-5 p-5">
          <ModalHeader className="p-0 text-foreground">Select Deposit</ModalHeader>
          <Divider />
          <ModalBody className="flex flex-col gap-5 p-0">
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

            <Divider />
            <div className="flex flex-col gap-5">
              <Button color="primary" className="w-full">
                Stake
              </Button>
              <Button variant="flat" color="primary" className="w-full">
                Cancel
              </Button>
            </div>
          </ModalBody>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default SelectDeposit;
