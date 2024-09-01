import { useState } from 'react';
import { cn, Modal, ModalBody, ModalContent, Tab, Tabs } from '@nextui-org/react';
import { X } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

import { getActivePools } from '@/faker-data';
import { selectCollatorTabs } from '@/config/tabs';

import SelectCollatorTable from './select-collator-table';

interface SelectCollatorProps {
  isOpen: boolean;
  onClose: () => void;
}

const SelectCollator = ({ isOpen, onClose }: SelectCollatorProps) => {
  //
  const { data, isLoading } = useQuery({
    queryKey: ['collators'],
    queryFn: () => getActivePools()
  });

  const [filterValue, setFilterValue] = useState('');
  const onClear = () => {
    setFilterValue('');
  };
  const onSearchChange = (value: string) => {
    setFilterValue(value);
  };
  return (
    <>
      <Modal
        placement="center"
        isOpen={isOpen}
        onOpenChange={onClose}
        size="xl"
        className="bg-background"
        classNames={{
          closeButton:
            'p-0 top-[1.25rem] right-[1.25rem] hover:opacity-[var(--nextui-hover-opacity)] hover:bg-transparent  z-10'
        }}
        closeButton={<X />}
      >
        <ModalContent className="w-[calc(100vw-1.24rem)] md:w-[35.625rem]">
          <ModalBody className={cn('p-5', isLoading ? 'overflow-hidden' : '')}>
            <Tabs
              aria-label="Options"
              color="primary"
              variant="underlined"
              className="-mt-3"
              classNames={{
                tabList: 'gap-6 w-full relative rounded-none p-0 border-b border-divider',
                cursor: 'w-full bg-foreground font-bold',
                tab: 'max-w-fit px-0 h-12',
                tabContent: 'group-data-[selected=true]:text-foreground  font-bold'
              }}
            >
              {selectCollatorTabs.map((tab) => (
                <Tab
                  key={tab.key}
                  title={
                    <div className="flex items-center space-x-2">
                      <span>{tab.label}</span>
                    </div>
                  }
                />
              ))}
            </Tabs>

            <SelectCollatorTable symbol="RING" data={data} isLoading={isLoading} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SelectCollator;
