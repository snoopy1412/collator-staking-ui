import { ChainId } from '@/types/chains';

export { chain as crab, nativeTokenIcon as crabNativeTokenIcon } from './crab';
export { chain as darwinia, nativeTokenIcon as darwiniaNativeTokenIcon } from './darwinia';
export { chain as koi, nativeTokenIcon as koiNativeTokenIcon } from './koi';

export const KTON_TOKEN_MAP = new Map<ChainId, string>([
  [ChainId.CRAB, 'CKTON'],
  [ChainId.DARWINIA, 'KTON'],
  [ChainId.KOI, 'PKTON']
]);
