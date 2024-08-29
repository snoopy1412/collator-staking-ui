import { useAccount } from 'wagmi';

import { getChains } from '@/utils/chain';

const chainIds = getChains().map((chain) => chain.id);

function useWalletStatus() {
  const result = useAccount();
  const isSupportedChain = result.chainId ? chainIds.includes(result.chainId) : false;
  return {
    ...result,
    isSupportedChain,
    isEnabled: !!result.isConnected && isSupportedChain && !!result.address,
    currentChainId: isSupportedChain ? result.chainId : undefined
  };
}

export default useWalletStatus;
