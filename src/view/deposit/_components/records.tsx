import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Pagination,
  Progress,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from '@nextui-org/react';
import { X } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getActiveDepositRecords } from '@/faker-data';

interface SelectCollatorProps {
  isOpen: boolean;
  onClose: () => void;
  symbol: string;
  ktonSymbol: string;
}

const Records = ({ isOpen, symbol, ktonSymbol, onClose }: SelectCollatorProps) => {
  //
  const { data, isLoading } = useQuery({
    queryKey: ['collators'],
    queryFn: () => getActiveDepositRecords()
  });

  console.log('data', data);

  const renderCell = useCallback((item: any, columnKey: string) => {
    const cellValue = item[columnKey];
    switch (columnKey) {
      case 'id':
        return <div className="text-[0.875rem] font-bold text-primary">ID #{cellValue}</div>;
      case 'duration':
        if (cellValue.length === 2) {
          return (
            <Progress
              label={`${cellValue[0]} - ${cellValue[1]}`}
              value={55}
              className="w-full"
              size="sm"
              color="primary"
            />
          );
        }
        return '-';
      case 'amount':
        return (
          <span>
            {cellValue} {symbol}
          </span>
        );
      case 'reward':
        return (
          <span>
            {cellValue} {ktonSymbol}
          </span>
        );
      case 'action':
        return (
          <Button color="primary" size="sm">
            Withdraw Earlier
          </Button>
        );
      default:
        return cellValue;
    }
  }, []);
  const rowsPerPage = 10;
  const [page, setPage] = useState(1);

  const pages = useMemo(() => {
    return data?.count ? Math.ceil(data.count / rowsPerPage) : 0;
  }, [data?.count, rowsPerPage]);

  const loadingState = isLoading || data?.results?.length === 0 ? 'loading' : 'idle';

  return (
    <Modal
      isOpen={isOpen}
      placement="center"
      onClose={onClose}
      size="4xl"
      className="bg-background"
      classNames={{
        closeButton:
          'p-0 top-[1.25rem] right-[1.25rem] hover:opacity-[var(--nextui-hover-opacity)] hover:bg-transparent  z-10'
      }}
      closeButton={<X />}
    >
      <ModalContent className="w-[calc(100vw-1.24rem)] px-5 py-0 md:max-w-[58.125rem]">
        <ModalHeader className="px-0 py-5 text-[1.125rem] font-bold text-foreground">
          <span>Active Deposit Records</span>
        </ModalHeader>
        <Divider />
        <ModalBody className="px-0 py-5">
          <Table
            aria-label="Select collator table"
            color="primary"
            layout="fixed"
            selectionMode="single"
            classNames={{
              base: 'min-w-[100%] overflow-x-auto',
              td: 'text-foreground'
            }}
            defaultSelectedKeys={['2']}
            removeWrapper
            bottomContent={
              pages > 0 ? (
                <div className="flex w-full justify-end">
                  <Pagination
                    showControls
                    showShadow
                    color="default"
                    page={page}
                    total={pages}
                    onChange={(page) => setPage(page)}
                  />
                </div>
              ) : null
            }
          >
            <TableHeader>
              <TableColumn className="w-[9.375rem] bg-secondary" key="id">
                No.
              </TableColumn>
              <TableColumn className="w-[15.625rem] bg-secondary" key="duration">
                Duration
              </TableColumn>
              <TableColumn className="w-[10.625rem] bg-secondary" key="amount">
                Amount
              </TableColumn>
              <TableColumn className="w-[10.625rem] bg-secondary" key="reward">
                Reward
              </TableColumn>
              <TableColumn className="w-[9.375rem] bg-secondary" key="action" align="end">
                Action
              </TableColumn>
            </TableHeader>
            <TableBody
              items={data?.results || []}
              loadingContent={<Spinner />}
              loadingState={loadingState}
            >
              {(item: any) => (
                <TableRow key={item?.id}>
                  {(columnKey: any) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Records;
