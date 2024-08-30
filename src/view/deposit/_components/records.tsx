import {
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Progress,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from '@nextui-org/react';
import { X } from 'lucide-react';
import { Key, useCallback, useState } from 'react';

import { useUserDepositDetails } from '@/hooks/useUserDepositDetails';
import { formatEther } from 'viem';

import type { DepositInfo } from '@/hooks/useUserDepositDetails';
import useWalletStatus from '@/hooks/useWalletStatus';
import dayjs from 'dayjs';
import { formatNumericValue } from '@/utils';
import { checkIsClaimRequirePenalty } from '@/view/deposit/service';
import WithdrawEarlier from './withdraw-earlier';
import { useWithdraw } from '@/view/deposit/_hooks/withdraw';
import TransactionStatus from '@/components/transaction-status';
import AsyncButton from '@/components/async-button';
import { toast } from 'sonner';

interface SelectCollatorProps {
  isOpen: boolean;
  onClose: () => void;
  onRefreshRingBalance?: () => void;
}

const Records = ({ isOpen, onClose, onRefreshRingBalance }: SelectCollatorProps) => {
  const { currentChain, ktonInfo } = useWalletStatus();
  const [currentTokenId, setCurrentTokenId] = useState<bigint>();
  const [withdrawEarlierOpen, setWithdrawEarlierOpen] = useState<boolean>(false);
  const [withdrawHash, setWithdrawHash] = useState<`0x${string}` | null>(null);
  const {
    depositList,
    isLoading: isDepositListLoading,
    deleteDepositInfoByTokenId
  } = useUserDepositDetails({
    enabled: isOpen
  });
  const { withdraw } = useWithdraw();

  const handleWithdraw = useCallback(
    async (tokenId: bigint) => {
      setCurrentTokenId(tokenId);
      try {
        const tx = await withdraw(tokenId);
        setWithdrawHash(tx);
      } catch (error) {
        console.warn('Error withdrawing:', error);

        toast.error('Something went wrong while withdrawing', {
          classNames: {
            toast:
              'flex items-center gap-[0.31rem] !bg-background  px-[0.62rem] py-[0.5rem] rounded-medium',
            title: 'text-danger text-[0.75rem] font-normal'
          }
        });
        setCurrentTokenId(undefined);
      }
    },
    [withdraw]
  );

  const handleWithdrawEarlier = useCallback(
    async (tokenId: bigint) => {
      setCurrentTokenId(tokenId);

      try {
        const isClaimRequirePenalty = await checkIsClaimRequirePenalty(tokenId);
        if (isClaimRequirePenalty) {
          setWithdrawEarlierOpen(true);
        } else {
          await handleWithdraw(tokenId);
        }
      } catch (error) {
        console.error('Error checking claim penalty:', error);
      }
    },
    [handleWithdraw]
  );

  const handleCloseWithdrawEarlier = useCallback(() => {
    setWithdrawHash(null);
    setCurrentTokenId(undefined);
    setWithdrawEarlierOpen(false);
  }, []);

  const handleWithdrawEarlierSuccess = useCallback(() => {
    if (currentTokenId) {
      deleteDepositInfoByTokenId(currentTokenId);
      onRefreshRingBalance?.();
    }
    setWithdrawHash(null);
    setWithdrawEarlierOpen(false);
    handleCloseWithdrawEarlier();
  }, [
    deleteDepositInfoByTokenId,
    currentTokenId,
    handleCloseWithdrawEarlier,
    onRefreshRingBalance
  ]);

  const handleWithdrawFail = useCallback(() => {
    setWithdrawHash(null);
  }, []);

  const handleWithdrawSuccess = useCallback(() => {
    if (currentTokenId) {
      deleteDepositInfoByTokenId(currentTokenId);
      onRefreshRingBalance?.();
    }
    handleWithdrawFail();
  }, [deleteDepositInfoByTokenId, currentTokenId, handleWithdrawFail, onRefreshRingBalance]);

  const renderCell = useCallback(
    (item: DepositInfo, columnKey: Key) => {
      const cellValue = item[columnKey as keyof DepositInfo];
      const { startAt, endAt } = item;

      const formattedValue = formatNumericValue(formatEther(item?.value), 3);
      const formattedKtonAmount = formatNumericValue(formatEther(item?.ktonAmount), 3);

      switch (columnKey) {
        case 'tokenId':
          return (
            <div className="text-[0.875rem] font-bold text-primary">ID #{cellValue.toString()}</div>
          );
        case 'duration':
          if (startAt && endAt) {
            const startAtDate = dayjs(startAt * 1000).format('YYYY-MM-DD');
            const endAtDate = dayjs(endAt * 1000).format('YYYY-MM-DD');
            const now = dayjs().unix();
            const totalDuration = endAt - startAt;
            const elapsedDuration = Math.max(0, Math.min(now - startAt, totalDuration));
            const progressValue = (elapsedDuration / totalDuration) * 100;

            return (
              <Progress
                label={`${startAtDate} - ${endAtDate}`}
                value={progressValue}
                className="w-full"
                size="sm"
                color="primary"
              />
            );
          }
          return '-';
        case 'value':
          return (
            <span>
              {formattedValue.fixed} {currentChain?.nativeCurrency?.symbol}
            </span>
          );
        case 'ktonAmount':
          return (
            <span>
              {formattedKtonAmount.fixed} {ktonInfo?.symbol}
            </span>
          );
        case 'action': {
          if (item.isClaimRequirePenalty) {
            return (
              <AsyncButton
                color="primary"
                size="sm"
                loadingText="Pending"
                onClick={() => handleWithdrawEarlier(item.tokenId)}
              >
                Withdraw Earlier
              </AsyncButton>
            );
          } else {
            return (
              <AsyncButton
                color="primary"
                size="sm"
                loadingText="Pending"
                onClick={() => handleWithdraw(item.tokenId)}
              >
                Withdraw
              </AsyncButton>
            );
          }
        }

        default:
          return null;
      }
    },
    [ktonInfo?.symbol, currentChain?.nativeCurrency?.symbol, handleWithdrawEarlier, handleWithdraw]
  );

  return (
    <>
      <Modal
        isOpen={isOpen}
        placement="center"
        onClose={onClose}
        size="4xl"
        className="bg-background"
        classNames={{
          closeButton:
            'p-0 top-[1.25rem] right-[1.25rem] hover:opacity-[var(--nextui-hover-opacity)] hover:bg-transparent  z-10'
        }}
        closeButton={<X />}
      >
        <ModalContent className="w-[calc(100vw-1.24rem)] px-5 py-0 md:max-w-[58.125rem]">
          <ModalHeader className="px-0 py-5 text-[1.125rem] font-bold text-foreground">
            <span>Active Deposit Records</span>
          </ModalHeader>
          <Divider />
          <ModalBody className="px-0 py-5">
            <Table
              aria-label="Select collator table"
              color="primary"
              layout="fixed"
              selectionMode="single"
              classNames={{
                base: 'min-w-[100%] overflow-x-auto',
                td: 'text-foreground'
              }}
              removeWrapper
            >
              <TableHeader>
                <TableColumn className="w-[9.375rem] bg-secondary" key="tokenId">
                  No.
                </TableColumn>
                <TableColumn className="w-[15.625rem] bg-secondary" key="duration">
                  Duration
                </TableColumn>
                <TableColumn className="w-[10.625rem] bg-secondary" key="value">
                  Amount
                </TableColumn>
                <TableColumn className="w-[10.625rem] bg-secondary" key="ktonAmount">
                  Reward
                </TableColumn>
                <TableColumn className="w-[9.375rem] bg-secondary" key="action" align="end">
                  Action
                </TableColumn>
              </TableHeader>
              <TableBody
                items={depositList || []}
                loadingContent={<Spinner />}
                emptyContent={<div className="text-center">No active deposit records</div>}
                loadingState={isDepositListLoading ? 'loading' : 'idle'}
              >
                {(item: DepositInfo) => (
                  <TableRow key={item?.tokenId}>
                    {(columnKey: Key) => {
                      return <TableCell>{renderCell(item, columnKey)}</TableCell>;
                    }}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </ModalBody>
        </ModalContent>
      </Modal>
      <WithdrawEarlier
        symbol={ktonInfo?.symbol || ''}
        tokenId={currentTokenId}
        isOpen={withdrawEarlierOpen}
        onClose={handleCloseWithdrawEarlier}
        onSuccess={handleWithdrawEarlierSuccess}
      />
      {withdrawHash && (
        <TransactionStatus
          hash={withdrawHash}
          title="Withdraw"
          onSuccess={handleWithdrawSuccess}
          onFail={handleWithdrawFail}
        />
      )}
    </>
  );
};

export default Records;
