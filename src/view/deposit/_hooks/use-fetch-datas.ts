import { useMemo, useState, useCallback } from 'react';
import { useReadContract, useReadContracts } from 'wagmi';

// 假设您已经定义了合约配置
import { contractConfig } from './contractConfig';

const PAGE_SIZE = 10; // 每页加载的项目数

export function usePaginatedData(totalOfFunctionName: string, infoByIdFunctionName: string) {
  const [currentPage, setCurrentPage] = useState(1);

  const { data: totalData, refetch: refetchTotal } = useReadContract({
    ...contractConfig,
    functionName: totalOfFunctionName
  });

  const totalIds = useMemo(() => {
    return totalData ? Number(totalData) : 0;
  }, [totalData]);

  const ids = useMemo(() => {
    return Array.from({ length: totalIds }, (_, i) => i + 1);
  }, [totalIds]);

  const pageIds = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return ids.slice(start, start + PAGE_SIZE);
  }, [ids, currentPage]);

  const { data: pageData, refetch: refetchPage } = useReadContracts({
    contracts: pageIds.map((id) => ({
      ...contractConfig,
      functionName: infoByIdFunctionName,
      args: [id]
    }))
  });

  const hasNextPage = useMemo(() => {
    return currentPage * PAGE_SIZE < totalIds;
  }, [currentPage, totalIds]);

  const loadNextPage = useCallback(() => {
    if (hasNextPage) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  }, [hasNextPage]);

  const refetch = useCallback(() => {
    setCurrentPage(1);
    refetchTotal();
    refetchPage();
  }, [refetchTotal, refetchPage]);

  return {
    data: pageData,
    loadNextPage,
    hasNextPage,
    refetch,
    currentPage
  };
}
