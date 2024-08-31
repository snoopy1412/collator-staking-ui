import { ScrollShadow, Skeleton } from '@nextui-org/react';
import DepositItem from './deposit-item';
import { useUserDepositDetails } from '@/hooks/useUserDepositDetails';
import useWalletStatus from '@/hooks/useWalletStatus';
import { useState, forwardRef, useImperativeHandle } from 'react';
import Empty from './empty';

const Loading = () => {
  return (
    <>
      <Skeleton className="h-8 w-full rounded-medium" />
      <Skeleton className="h-8 w-full rounded-medium" />
      <Skeleton className="h-8 w-full rounded-medium" />
      <Skeleton className="h-8 w-full rounded-medium" />
      <Skeleton className="h-8 w-full rounded-medium" />
    </>
  );
};

export type DepositListRef = {
  getCheckedDepositIds: () => bigint[];
};

const DepositList = forwardRef<DepositListRef>((_props, ref) => {
  const { chain } = useWalletStatus();
  const { depositList, isLoading: isDepositListLoading } = useUserDepositDetails({
    enabled: true
  });

  const [checkedDepositIds, setCheckedDepositIds] = useState<bigint[]>([]);

  useImperativeHandle(
    ref,
    () => ({
      getCheckedDepositIds() {
        return checkedDepositIds;
      }
    }),
    [checkedDepositIds]
  );
  function handleDepositChange(id: bigint) {
    setCheckedDepositIds((prevIds) =>
      prevIds.includes(id) ? prevIds.filter((prevId) => prevId !== id) : [...prevIds, id]
    );
  }

  return (
    <ScrollShadow hideScrollBar className="flex max-h-[20rem] w-full flex-col gap-5" size={20}>
      {isDepositListLoading ? (
        <Loading />
      ) : depositList?.length ? (
        depositList.map((deposit) => (
          <DepositItem
            key={deposit.tokenId}
            item={deposit}
            isChecked={checkedDepositIds.includes(deposit.tokenId)}
            symbol={chain?.nativeCurrency?.symbol}
            onChange={() => handleDepositChange(deposit.tokenId)}
          />
        ))
      ) : (
        <Empty label="No active deposit records" />
      )}
    </ScrollShadow>
  );
});

export default DepositList;
