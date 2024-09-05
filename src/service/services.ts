import { client } from './client';
import { GET_COLLATOR_SET, GET_STAKING_ACCOUNT } from './queries';
import type {
  CollatorSet,
  CollatorSetQueryParams,
  StakingAccount,
  StakingAccountQueryParams
} from './type';

export async function fetchCollatorSet(
  params: CollatorSetQueryParams
): Promise<CollatorSet[] | null> {
  console.log('params', params);

  try {
    const response = await client.request<{ CollatorSet: CollatorSet[] }>(GET_COLLATOR_SET, params);
    return response.CollatorSet;
  } catch (error) {
    console.error('fetchCollatorSet failed:', error);
    return null;
  }
}

export async function fetchStakingAccount(
  params: StakingAccountQueryParams
): Promise<StakingAccount[] | null> {
  try {
    const response = await client.request<{ StakingAccount: StakingAccount[] }>(
      GET_STAKING_ACCOUNT,
      params
    );
    return response.StakingAccount;
  } catch (error) {
    console.error('fetchStakingAccount failed:', error);
    return null;
  }
}
