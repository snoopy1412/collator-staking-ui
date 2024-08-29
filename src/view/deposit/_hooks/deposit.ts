import { useCallback } from 'react';
import { useWriteContract } from 'wagmi';
import { parseEther } from 'viem';

import { abi, address } from '@/config/abi/depoist';

type DepositProps = {
  months?: string;
  value?: string;
};

const useDeposit = () => {
  const result = useWriteContract();

  console.log('result', result);

  const handleDeposit = useCallback(
    ({ months, value }: DepositProps) => {
      console.log('handleDeposit', months, value);

      if (!months || !value) return;
      return result.writeContractAsync({
        address,
        abi,
        functionName: 'deposit',
        args: [BigInt(months)],
        value: parseEther(value)
      });
    },
    [result]
  );

  return { ...result, handleDeposit };
};

export default useDeposit;
