import { Key, useCallback, useTransition } from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Spinner,
  cn
} from '@nextui-org/react';
import { SearchIcon } from 'lucide-react';

import AddressCard from '@/components/address-card';
import type { CollatorSet } from '@/service/type';
import type { SelectionKeys } from '@/types/ui';

interface SelectCollatorTableProps {
  symbol: string;
  data: CollatorSet[];
  isLoading: boolean;
  keyword?: string;
  selection: SelectionKeys;
  onSearchChange?: (keyword: string) => void;
  onSelectionChange?: (keys: SelectionKeys) => void;
}

const SelectCollatorTable = ({
  symbol,
  keyword,
  data,
  isLoading,
  selection,
  onSearchChange,
  onSelectionChange
}: SelectCollatorTableProps) => {
  const [isPending, startTransition] = useTransition();

  const handleSearchChange = useCallback(
    (keyword: string) => {
      startTransition(() => {
        onSearchChange?.(keyword);
      });
    },
    [onSearchChange]
  );

  const handleClear = useCallback(() => {
    onSearchChange?.('');
  }, [onSearchChange]);

  const renderCell = useCallback((item: CollatorSet, columnKey: Key) => {
    const cellValue = item[columnKey as keyof CollatorSet];

    switch (columnKey) {
      case 'collator':
        return <AddressCard address={item.address as `0x${string}`} />;
      case 'balance':
        return item.assets;
      case 'commission':
        return cellValue ? `${cellValue}%` : '-';
      case 'session':
        return '34';
      default:
        return null;
    }
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <Input
        isClearable
        classNames={{
          inputWrapper:
            'w-[18.75rem] h-10 items-center gap-[0.3125rem] rounded-medium dark:!bg-secondary',
          input: 'placeholder:text-foreground/50 text-[0.875rem] text-foreground'
        }}
        placeholder="Search for a collator"
        startContent={<SearchIcon className="text-foreground/50" />}
        value={keyword}
        aria-label="Search for a collator"
        onClear={handleClear}
        onValueChange={handleSearchChange}
      />
      <Table
        aria-label="Select collator table"
        color="primary"
        selectionMode="single"
        selectionBehavior="replace"
        selectedKeys={selection}
        onSelectionChange={onSelectionChange}
        removeWrapper
        classNames={{
          base: cn(isLoading ? '' : 'min-w-[100%] overflow-x-auto'),
          td: 'text-foreground'
        }}
        layout="fixed"
      >
        <TableHeader>
          <TableColumn className="w-[10rem] bg-secondary" key="collator">
            Collator
          </TableColumn>
          <TableColumn className="w-[5rem] bg-secondary" key="balance">
            Staked {symbol}
          </TableColumn>
          <TableColumn className="w-[4.43rem] bg-secondary" key="commission">
            Commission
          </TableColumn>
          <TableColumn
            className="w-[6rem] whitespace-normal bg-secondary"
            key="session"
            align="end"
          >
            Last Session rewards
          </TableColumn>
        </TableHeader>
        <TableBody
          items={data || []}
          loadingContent={
            <div className="absolute inset-0 flex w-full items-center justify-center bg-background/50">
              <Spinner />
            </div>
          }
          emptyContent={<div className="text-center">No records</div>}
          loadingState={isLoading || isPending ? 'loading' : 'idle'}
        >
          {(item: CollatorSet) => (
            <TableRow key={item?.id}>
              {(columnKey: Key) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
export default SelectCollatorTable;
