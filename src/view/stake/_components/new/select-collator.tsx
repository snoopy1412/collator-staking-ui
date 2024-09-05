import { useState, useMemo, useCallback } from 'react';
import { cn, Modal, ModalBody, ModalContent, Tab, Tabs } from '@nextui-org/react';
import { X } from 'lucide-react';
import { selectCollatorTabs } from '@/config/tabs';
import SelectCollatorTable from './select-collator-table';
import type { CollatorSet } from '@/service/type';
import type { Key, SelectionKeys } from '@/types/ui';

interface SelectCollatorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectionChange: (keys: SelectionKeys) => void;
  selection: SelectionKeys;
  activeCollators: CollatorSet[];
  waitingCollators: CollatorSet[];
  isLoading: boolean;
}

const SelectCollator = ({
  isOpen,
  onClose,
  selection,
  onSelectionChange,
  activeCollators,
  waitingCollators,
  isLoading
}: SelectCollatorProps) => {
  const [selected, setSelected] = useState<Key>(selectCollatorTabs[0].key);
  const [keyword, setKeyword] = useState('');
  const handleSearchChange = useCallback((keyword: string) => {
    setKeyword(keyword);
  }, []);

  const handleSelectionChange = useCallback(
    (selection: SelectionKeys) => {
      const arr = Array.from(selection);
      if (arr.length) {
        onSelectionChange(selection);
      }
    },
    [onSelectionChange]
  );

  const data = useMemo(() => {
    let filteredData: CollatorSet[] = [];
    if (selected === 'active-pool') {
      filteredData = activeCollators || [];
    } else if (selected === 'waiting-pool') {
      filteredData = waitingCollators || [];
    }

    if (keyword) {
      const lowercaseKeyword = keyword.toLowerCase();
      return filteredData.filter((collator) =>
        collator.address.toLowerCase().includes(lowercaseKeyword)
      );
    }

    return filteredData;
  }, [activeCollators, waitingCollators, selected, keyword]);
  return (
    <>
      <Modal
        placement="center"
        isOpen={isOpen}
        onClose={onClose}
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
              selectedKey={selected}
              onSelectionChange={setSelected}
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

            <SelectCollatorTable
              symbol="RING"
              data={data}
              selection={selection}
              isLoading={isLoading}
              keyword={keyword}
              onSearchChange={handleSearchChange}
              onSelectionChange={handleSelectionChange}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SelectCollator;
