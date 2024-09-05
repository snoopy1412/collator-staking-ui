import { useReadContract } from 'wagmi';
import { address, abi } from '@/config/abi/palletHelper';

const useContractCollators = () => {
  const result = useReadContract({
    address: address,
    abi: abi,
    functionName: 'getContractCollators',
    args: []
  });

  return result;
};

export default useContractCollators;
