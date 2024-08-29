import Avatar from '@/components/avatar';

import ClipboardIconButton from './clipboard-icon-button';

interface AddressCardProps {
  address: `0x${string}`;
  name: string;
  copyable?: boolean;
}
const AddressCard = ({ address, name, copyable = true }: AddressCardProps) => {
  return (
    <div className="flex items-center gap-[0.31rem]">
      <Avatar address={address} />
      <span className="text-[0.875rem] font-bold text-foreground">{name}</span>
      {copyable && <ClipboardIconButton size={16} text={address} />}
    </div>
  );
};

export default AddressCard;
