// import { concat, toBytes, keccak256, hexToBytes } from 'viem';

// export const twox64Concat = (data: string | Uint8Array) => {
//   const dataBytes = typeof data === 'string' ? toBytes(data) : data;
//   const hashHex = keccak256(dataBytes).slice(0, 34) as `0x${string}`; // 包含 '0x' 前缀的 16 字节
//   const hashBytes = hexToBytes(hashHex);
//   console.log('hashHex', hashHex);
//   console.log('dataBytes', dataBytes);
//   return concat([hashBytes, dataBytes]);
// };

import { HexString } from '@polkadot/util/types';
import { u8aConcat, u8aToU8a } from '@polkadot/util';
import { xxhashAsU8a } from '@polkadot/util-crypto';

export function twox64Concat(data: HexString | Uint8Array): Uint8Array {
  return u8aConcat(xxhashAsU8a(data, 64), u8aToU8a(data));
}
