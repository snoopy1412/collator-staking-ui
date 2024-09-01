import React, { useCallback, useState } from 'react';
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

interface SelectCollatorTableProps {
  symbol: string;
  data: any;
  isLoading: boolean;
}

const SelectCollatorTable = ({ symbol, data, isLoading }: SelectCollatorTableProps) => {
  const [filterValue, setFilterValue] = useState('');
  const onClear = () => {
    setFilterValue('');
  };
  const onSearchChange = (value: string) => {
    setFilterValue(value);
  };
  const renderCell = useCallback((item: any, columnKey: string) => {
    const cellValue = item[columnKey];

    switch (columnKey) {
      case 'collator':
        return <AddressCard address="0x3d6d656c1bf92f7028Ce4C352563E1C363C58ED5" name="darwinia" />;
      case 'balance':
        return 999.999;
      case 'commission':
        return '45.00%';
      case 'session':
        return '34';
      default:
        return cellValue;
    }
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <Input
        isClearable
        classNames={{
          inputWrapper:
            'w-[18.75rem] h-10 items-center gap-[0.3125rem] rounded-medium dark:!bg-secondary',
          input: 'placeholder:text-foreground/50 text-[0.875rem] text-foreground '
        }}
        placeholder="Search for a collator"
        startContent={<SearchIcon className="text-foreground/50" />}
        value={filterValue}
        aria-label="Search for a collator"
        onClear={() => onClear()}
        onValueChange={onSearchChange}
      />
      <Table
        aria-label="Select collator table"
        color="primary"
        selectionMode="single"
        defaultSelectedKeys={['2']}
        removeWrapper
        classNames={{
          base: cn(isLoading ? '' : 'min-w-[100%] overflow-x-auto'),
          td: 'text-foreground'
        }}
        layout="fixed"
      >
        <TableHeader>
          <TableColumn className="w-[14rem] bg-secondary" key="collator">
            Collator
          </TableColumn>
          <TableColumn className="w-[5rem] bg-secondary" key="balance">
            Staked {symbol}
          </TableColumn>
          <TableColumn className="w-[4.43rem] bg-secondary" key="commission">
            Commission
          </TableColumn>
          <TableColumn
            className="w-[4.74rem] whitespace-normal bg-secondary"
            key="session"
            align="end"
          >
            Blocks Last Session
          </TableColumn>
        </TableHeader>
        <TableBody
          items={data || []}
          loadingContent={
            <div className="absolute inset-0 flex w-full items-center justify-center bg-background/50">
              <Spinner />
            </div>
          }
          loadingState={isLoading ? 'loading' : 'idle'}
        >
          {(item: any) => (
            <TableRow key={item?.id}>
              {(columnKey: any) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
export default SelectCollatorTable;
