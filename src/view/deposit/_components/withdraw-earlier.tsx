import { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Divider, Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';
import { formatEther } from 'viem';
import { X } from 'lucide-react';

import TransactionStatus from '@/components/transaction-status';
import { formatNumericValue } from '@/utils';
import { useWithdrawEarlier } from '../_hooks/withdraw-earlier';
import useGetWithdrawPenalty from '../_hooks/get-withdraw-penalty';
import { useTokenAllowanceAndApprove } from '../_hooks/token-allowance-and-approve';
import useWalletStatus from '@/hooks/useWalletStatus';
import { useKtonBalance } from '@/hooks/useKtonBalance';
import { toast } from 'sonner';

interface WithdrawEarlierProps {
  tokenId?: bigint;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  symbol: string;
}
const WithdrawEarlier = ({ tokenId, isOpen, onClose, symbol, onSuccess }: WithdrawEarlierProps) => {
  const [withdrawEarlierHash, setWithdrawEarlierHash] = useState<`0x${string}` | null>(null);
  const [approveHash, setApproveHash] = useState<`0x${string}` | null>(null);
  const { withdrawEarlier, isPending: isWithdrawEarlierPending } = useWithdrawEarlier();
  const { data: ktonValue, isLoading: isKtonBalanceLoading } = useKtonBalance();
  const { address, ktonInfo } = useWalletStatus();

  const { value: penalty, isLoading: isPenaltyLoading } = useGetWithdrawPenalty(tokenId);

  const { allowance, isAllowanceLoading, isWaitingApproving, updateAllowance, handleApprove } =
    useTokenAllowanceAndApprove({
      tokenAddress: ktonInfo?.address as `0x${string}`,
      ownerAddress: address as `0x${string}`,
      amount: penalty,
      enabled: !!penalty && !!address && !!ktonInfo?.address
    });

  const penaltyInKton = formatNumericValue(formatEther(penalty), 3);

  const allowPenalty = useMemo(() => {
    return ktonValue && ktonValue >= penalty;
  }, [ktonValue, penalty]);

  const needApprove = useMemo(() => {
    if (typeof allowance === 'undefined' || typeof penalty === 'undefined') return false;
    if (allowance === 0n) return true;
    return !!penalty && allowance < penalty;
  }, [penalty, allowance]);

  const buttonText = useMemo(() => {
    if (isPenaltyLoading || isAllowanceLoading) {
      return 'Loading...';
    }
    if (!allowPenalty) {
      return `Insufficient balance`;
    }
    if (needApprove) {
      return `Approve ${penaltyInKton.fixed} ${symbol}`;
    }
    return `Pay ${penaltyInKton.fixed} ${symbol}`;
  }, [
    allowPenalty,
    isPenaltyLoading,
    needApprove,
    penaltyInKton.fixed,
    symbol,
    isAllowanceLoading
  ]);

  const handleWithdraw = async () => {
    if (!tokenId) return;
    if (needApprove) {
      try {
        const hash = await handleApprove();
        if (hash) {
          setApproveHash(hash);
        }
      } catch (error) {
        console.error('Error approving:', error);
        toast.error('Something went wrong while approving', {
          classNames: {
            toast:
              'flex items-center gap-[0.31rem] !bg-background  px-[0.62rem] py-[0.5rem] rounded-medium',
            title: 'text-danger text-[0.75rem] font-normal'
          }
        });
      }
      return;
    }
    try {
      const hash = await withdrawEarlier(tokenId);
      if (hash) {
        setWithdrawEarlierHash(hash);
      }
    } catch (error) {
      console.warn('Error withdrawing earlier:', error);
      toast.error('Something went wrong while withdrawing earlier', {
        classNames: {
          toast:
            'flex items-center gap-[0.31rem] !bg-background  px-[0.62rem] py-[0.5rem] rounded-medium',
          title: 'text-danger text-[0.75rem] font-normal'
        }
      });
    }
  };

  const handleApproveSuccess = useCallback(() => {
    setApproveHash(null);
    updateAllowance(penalty);
  }, [penalty, updateAllowance]);

  const handleSuccess = useCallback(() => {
    setWithdrawEarlierHash(null);
    onSuccess();
  }, [onSuccess]);

  const handleFail = useCallback(() => {
    setWithdrawEarlierHash(null);
  }, []);

  useEffect(() => {
    if (!tokenId) {
      setWithdrawEarlierHash(null);
    }
  }, [tokenId]);

  return (
    <>
      <Modal
        placement="center"
        isOpen={isOpen}
        onOpenChange={onClose}
        classNames={{
          closeButton:
            'p-0 top-[1.35rem] right-[1.35rem] hover:opacity-[var(--nextui-hover-opacity)] hover:bg-transparent'
        }}
        className="bg-background"
        closeButton={<X strokeWidth={1.5} />}
      >
        <ModalContent className="w-[calc(100vw-1.24rem)] px-5 py-0 md:w-[25rem]">
          <ModalHeader className="px-0 py-5 text-[1.125rem] text-foreground">
            Sure to withdraw now?
          </ModalHeader>

          <Divider />
          <ModalBody className="flex w-full flex-col items-center justify-center gap-5 px-0 py-5">
            <p className="m-0 text-left text-[0.75rem] font-bold text-foreground">
              Since the deposit term doesn’t end yet, you’ll be charged a penalty of 3 times the
              KTON reward if you try to withdraw the RINGs in advance.
            </p>
            <Button
              color="primary"
              className="w-full"
              isDisabled={!allowPenalty}
              isLoading={
                isPenaltyLoading ||
                isKtonBalanceLoading ||
                isAllowanceLoading ||
                isWaitingApproving ||
                isWithdrawEarlierPending
              }
              onClick={handleWithdraw}
            >
              {buttonText}
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>

      {withdrawEarlierHash && (
        <TransactionStatus
          hash={withdrawEarlierHash}
          title="Withdraw"
          onSuccess={handleSuccess}
          onFail={handleFail}
        />
      )}
      {approveHash && (
        <TransactionStatus hash={approveHash} title="Approve" onSuccess={handleApproveSuccess} />
      )}
    </>
  );
};
export default WithdrawEarlier;
