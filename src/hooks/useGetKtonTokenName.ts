import { KTON_TOKEN_MAP } from '@/config/chains';

import useWalletStatus from './useWalletStatus';

import type { ChainId } from '@/types/chains';

const useGetKtonTokenName = () => {
  const { currentChainId } = useWalletStatus();
  return KTON_TOKEN_MAP.get(currentChainId as ChainId) ?? 'KTON';
};

export default useGetKtonTokenName;
