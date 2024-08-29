import { Checkbox } from '@nextui-org/react';

interface DepositItemProps {
  id: string;
  amount: number;
  symbol: string;
  onSelect: (id: string) => void;
}

const DepositItem = ({ id, amount, symbol, onSelect }: DepositItemProps) => {
  return (
    <div className="flex h-6 items-center justify-between">
      <Checkbox
        radius="full"
        classNames={{
          label: 'text-foreground text-[0.875rem] font-normal '
        }}
      >
        ID#{id}
      </Checkbox>
      <div className="flex items-center gap-2">
        <span className="text-[0.875rem] font-normal text-foreground">{amount}</span>
        <span className="text-[0.875rem] font-normal text-foreground">{symbol}</span>
      </div>
    </div>
  );
};

export default DepositItem;
