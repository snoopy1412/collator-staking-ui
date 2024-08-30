import { address as depositAddress, abi as depositAbi } from '@/config/abi/depoist';
import useWalletStatus from '@/hooks/useWalletStatus';
import { useReadContract, useReadContracts } from 'wagmi';
import { useState, useEffect, useCallback, useMemo } from 'react';
import dayjs from '@/utils/date';

export type DepositInfo = {
  tokenId: bigint;
  months: number;
  value: bigint;
  startAt: number;
  endAt: number;
  ktonAmount: bigint;
  isClaimRequirePenalty: boolean;
};

type UseUserDepositDetailsProps = {
  enabled?: boolean;
};

export function useUserDepositDetails({ enabled = true }: UseUserDepositDetailsProps) {
  const { address: account } = useWalletStatus();
  const [depositList, setDepositList] = useState<DepositInfo[]>([]);

  const {
    data: balance,
    isLoading: isBalanceLoading,
    refetch: refetchBalance
  } = useReadContract({
    address: depositAddress,
    abi: depositAbi,
    functionName: 'balanceOf',
    args: [account as `0x${string}`],
    query: {
      enabled: enabled && !!account
    }
  });

  const balanceNumber = balance ? Number(balance) : 0;

  const {
    data: tokenIdsResult,
    isLoading: isTokenIdsLoading,
    refetch: refetchTokenIds
  } = useReadContracts({
    contracts: Array.from({ length: balanceNumber }, (_, index) => ({
      address: depositAddress as `0x${string}`,
      abi: depositAbi,
      functionName: 'tokenOfOwnerByIndex',
      args: [account as `0x${string}`, BigInt(index)]
    })),
    query: {
      enabled: enabled && !!account && balanceNumber > 0
    }
  });

  const validTokenIds = useMemo(
    () =>
      tokenIdsResult
        ?.filter(
          (result): result is { status: 'success'; result: bigint } =>
            result.status === 'success' && result.result !== undefined
        )
        .map((result) => result.result) ?? [],
    [tokenIdsResult]
  );

  const {
    data: depositInfos,
    isLoading: isDepositInfosLoading,
    refetch: refetchDepositInfos
  } = useReadContracts({
    contracts: validTokenIds.map((tokenId) => ({
      address: depositAddress as `0x${string}`,
      abi: depositAbi,
      functionName: 'depositOf',
      args: [tokenId]
    })),
    query: {
      enabled: enabled && validTokenIds.length > 0
    }
  });

  const {
    data: ktonAmounts,
    isLoading: isKtonAmountsLoading,
    refetch: refetchKtonAmounts
  } = useReadContracts({
    contracts:
      depositInfos?.map((info) => ({
        address: depositAddress as `0x${string}`,
        abi: depositAbi,
        functionName: 'computeInterest',
        args: [info.result?.[2] ? BigInt(info.result?.[2]) : BigInt(0), info.result?.[0]]
      })) ?? [],
    query: {
      enabled: enabled && !!depositInfos && depositInfos.length > 0
    }
  });

  const {
    data: claimPenaltyInfos,
    isLoading: isClaimPenaltyInfosLoading,
    refetch: refetchClaimPenaltyInfos
  } = useReadContracts({
    contracts: validTokenIds.map((tokenId) => ({
      address: depositAddress as `0x${string}`,
      abi: depositAbi,
      functionName: 'isClaimRequirePenalty',
      args: [tokenId]
    })),
    query: {
      enabled: enabled && validTokenIds.length > 0
    }
  });

  const deleteDepositInfoByTokenId = useCallback((tokenId: bigint) => {
    setDepositList((prevDepositList) =>
      prevDepositList.filter((deposit) => deposit.tokenId !== tokenId)
    );
  }, []);

  useEffect(() => {
    if (validTokenIds && depositInfos && ktonAmounts && claimPenaltyInfos) {
      const newDepositList = validTokenIds.map((tokenId, index) => {
        const info = depositInfos[index]?.result || [];
        const months = info?.[0] ?? 0;
        const startAt = Number(info?.[1] ?? 0);
        const value = info?.[2] ?? 0;

        const ktonAmount = (ktonAmounts[index]?.result as bigint) ?? BigInt(0);
        const endAt = dayjs
          .unix(startAt)
          .add(dayjs.duration({ months: Number(months) }))
          .unix();

        const isClaimRequirePenalty = !!claimPenaltyInfos[index]?.result;

        return {
          tokenId,
          months,
          value,
          startAt,
          endAt,
          ktonAmount,
          isClaimRequirePenalty
        };
      });
      setDepositList(newDepositList);
    } else {
      setDepositList([]);
    }
  }, [validTokenIds, depositInfos, ktonAmounts, claimPenaltyInfos, setDepositList]);

  const isLoading = useMemo(() => {
    return (
      isBalanceLoading ||
      isTokenIdsLoading ||
      isDepositInfosLoading ||
      isKtonAmountsLoading ||
      isClaimPenaltyInfosLoading
    );
  }, [
    isBalanceLoading,
    isTokenIdsLoading,
    isDepositInfosLoading,
    isKtonAmountsLoading,
    isClaimPenaltyInfosLoading
  ]);

  const refetch = useCallback(() => {
    refetchBalance();
    refetchTokenIds();
    refetchDepositInfos();
    refetchKtonAmounts();
    refetchClaimPenaltyInfos();
  }, [
    refetchBalance,
    refetchTokenIds,
    refetchDepositInfos,
    refetchKtonAmounts,
    refetchClaimPenaltyInfos
  ]);

  return {
    depositList,
    deleteDepositInfoByTokenId,
    isLoading,
    refetch
  };
}
