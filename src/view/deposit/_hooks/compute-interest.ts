import { useReadContract } from 'wagmi';
import { parseEther } from 'viem';

import { abi, address } from '@/config/abi/depoist';
import useWalletStatus from '@/hooks/useWalletStatus';

const useComputeInterest = (amount?: string, selectedMonthPeriod?: string) => {
  const { isEnabled } = useWalletStatus();
  const result = useReadContract({
    address,
    abi,
    functionName: 'computeInterest',
    args: [
      amount ? parseEther(amount) : BigInt(0),
      selectedMonthPeriod ? BigInt(selectedMonthPeriod) : BigInt(0)
    ],
    query: {
      enabled: !!isEnabled && !!address && !!amount && !!selectedMonthPeriod
    }
  });

  console.log(
    'useComputeInterest',
    amount ? parseEther(amount) : BigInt(0),
    selectedMonthPeriod ? BigInt(selectedMonthPeriod) : BigInt(0),
    result.isLoading,
    result.data
  );

  return result;
};

export default useComputeInterest;
