import { useMemo } from 'react';
import { useCollatorSet } from '@/hooks/useService';
import useContractCollators from '@/hooks/useContractCollators';
import useWalletStatus from '@/hooks/useWalletStatus';
import type { CollatorSet } from '@/service/type';

interface UseActiveAndWaitingCollatorsResult {
  collators: CollatorSet[];
  activeCollators: CollatorSet[];
  waitingCollators: CollatorSet[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

export function useActiveAndWaitingCollators(): UseActiveAndWaitingCollatorsResult {
  const { currentChainId } = useWalletStatus();
  const {
    data: collators,
    isLoading: isCollatorSetLoading,
    error: collatorSetError,
    refetch: refetchCollatorSet
  } = useCollatorSet({
    where: {
      chainId: {
        _eq: currentChainId
      }
    },
    orderBy: [{ seq: 'asc' }, { votes: 'desc' }, { blockNumber: 'desc' }, { logIndex: 'desc' }]
  });

  console.log('collators111', collators);

  const {
    data: activeCollatorCount,
    isLoading: isContractCollatorsLoading,
    error: contractCollatorsError
  } = useContractCollators();

  const result = useMemo(() => {
    if (isCollatorSetLoading || isContractCollatorsLoading) {
      return { activeCollators: [], waitingCollators: [], isLoading: true, error: null };
    }

    if (collatorSetError || contractCollatorsError) {
      return {
        activeCollators: [],
        waitingCollators: [],
        isLoading: false,
        error: collatorSetError || contractCollatorsError
      };
    }

    const activeCount = activeCollatorCount ? Number(activeCollatorCount) : 0;
    const allCollators = collators || [];

    const activeCollators = allCollators.slice(0, activeCount);
    const waitingCollators = allCollators.slice(activeCount);

    return {
      activeCollators,
      waitingCollators,
      isLoading: false,
      error: null
    };
  }, [
    collators,
    activeCollatorCount,
    isCollatorSetLoading,
    isContractCollatorsLoading,
    collatorSetError,
    contractCollatorsError
  ]);

  return { ...result, refetch: refetchCollatorSet, collators: collators || [] };
}
