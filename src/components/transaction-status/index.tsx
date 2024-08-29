import React, { useMemo } from 'react';
import { Modal, ModalBody, ModalContent } from '@nextui-org/modal';

import TransactionPending from './pending';
import TransactionSuccess from './success';
import TransactionFail from './fail';

export type TransactionStatusType = 'pending' | 'success' | 'fail' | null;

interface TransactionStatusProps {
  status: TransactionStatusType;
  isOpen: boolean;
  onClose: () => void;
  onOk?: () => void;
}

const TransactionStatus: React.FC<TransactionStatusProps> = ({ status, isOpen, onOk }) => {
  const renderContent = useMemo(() => {
    switch (status) {
      case 'pending':
        return <TransactionPending />;
      case 'success':
        return <TransactionSuccess onOk={onOk} />;
      case 'fail':
        return <TransactionFail onOk={onOk} />;
      default:
        return null;
    }
  }, [status, onOk]);

  return (
    <Modal isOpen={isOpen} hideCloseButton placement="center" className="bg-background">
      <ModalContent className="h-[calc(100vw-1.24rem)] w-[calc(100vw-1.24rem)] p-0 md:h-[25rem] md:w-[25rem]">
        <ModalBody className="flex h-full w-full flex-col items-center justify-center p-5">
          {renderContent}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default TransactionStatus;
