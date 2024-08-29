import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getStakeData } from '@/faker-data';

import ClaimList from './list';

export const dynamic = 'force-static';

const Claim = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['stakes'],
    queryFn: () => getStakeData()
  });
  const handleClick = useCallback((item: any) => {
    console.log(item);
  }, []);

  return <ClaimList data={data} isLoading={isLoading} onClick={handleClick} />;
};
export default Claim;
