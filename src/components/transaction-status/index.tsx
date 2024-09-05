import React, { useMemo } from 'react';
import { Modal, ModalBody, ModalContent } from '@nextui-org/modal';
import { useWaitForTransactionReceipt } from 'wagmi';

import TransactionPending from './pending';
import TransactionSuccess from './success';
import TransactionFail from './fail';

interface TransactionStatusProps {
  hash: `0x${string}`;
  title: string;
  onSuccess?: () => void;
  onFail?: () => void;
  isLoading?: boolean;
}

const TransactionStatus: React.FC<TransactionStatusProps> = ({
  hash,
  title,
  onSuccess,
  onFail,
  isLoading
}) => {
  const {
    isLoading: isLoadingProps,
    isSuccess,
    isError
  } = useWaitForTransactionReceipt({
    hash,
    query: {
      enabled: !!hash
    }
  });
  const renderContent = useMemo(() => {
    if (isLoadingProps) {
      return <TransactionPending />;
    }
    if (isSuccess) {
      return <TransactionSuccess onOk={onSuccess} title={title} isLoading={isLoading} />;
    }
    if (isError) {
      return <TransactionFail onOk={onFail} title={title} />;
    }
  }, [isLoadingProps, isSuccess, isError, title, onSuccess, onFail, isLoading]);

  return (
    <Modal isOpen hideCloseButton placement="center" className="bg-background">
      <ModalContent className="h-[calc(100vw-1.24rem)] max-h-[28rem] w-[calc(100vw-1.24rem)] p-0 md:h-[25rem] md:w-[25rem]">
        <ModalBody className="flex h-full w-full flex-col items-center justify-center p-5">
          {renderContent}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default TransactionStatus;
