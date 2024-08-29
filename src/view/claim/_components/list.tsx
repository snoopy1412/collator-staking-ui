import React, { useCallback, useMemo } from 'react';
import { ScrollShadow } from '@nextui-org/react';
import { FixedSizeList as List } from 'react-window';

import Empty from '@/components/empty';
import ClaimLoading from './loading';
import { MAX_DOM_COUNT, MAX_ITEM_COUNT } from '@/config/site';

import Item from './item';

const itemSize = 82;
const itemGap = 20;

interface StakeListProps {
  data?: any[];
  onClick: (item: any) => void;
  isLoading: boolean;
}

const ClaimList = ({ data, isLoading, onClick }: StakeListProps) => {
  const totalHeight = useMemo(() => {
    if (!data) return 0;
    if (data?.length < 4) {
      return data?.length * itemSize + data?.length * itemGap;
    }
    return (itemSize + itemGap) * MAX_ITEM_COUNT;
  }, [data]);

  const Row = useCallback(
    ({ index, style }: { index: number; style: React.CSSProperties }) => {
      const item = data?.[index];
      return (
        <Item
          key={item.id}
          {...item}
          onClick={() => onClick(item)}
          style={{
            ...style,
            paddingRight: 'var(--scrollbar-gap)'
          }}
        />
      );
    },
    [data, onClick]
  );
  if (isLoading) {
    return <ClaimLoading />;
  }

  if (!data?.length) {
    return <Empty label="No Claim" />;
  }

  if (data.length <= MAX_DOM_COUNT) {
    return (
      <ScrollShadow
        hideScrollBar
        className="w-full space-y-[1.25rem]"
        size={20}
        style={{
          maxHeight: totalHeight
        }}
      >
        {data.map((item) => (
          <Item key={item.id} {...item} onClick={() => onClick(item)} />
        ))}
      </ScrollShadow>
    );
  }
  return (
    <List height={totalHeight} itemCount={data.length} itemSize={itemSize + itemGap} width={'100%'}>
      {Row}
    </List>
  );
};

export default ClaimList;
