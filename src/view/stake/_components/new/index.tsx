import { useCallback, useRef, useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  cn,
  Tab,
  Tabs,
  Divider
} from '@nextui-org/react';
import { ChevronDown, X } from 'lucide-react';

import { TransitionPanel } from '@/components/transition-panel';
import { stakeTabs } from '@/config/tabs';

import StakeRing from './stake-ring';
import StakeDeposit from './stake-deposit';
import SelectCollator from './select-collator';

import type { DepositListRef } from '@/components/deposit-list';

import type { Key } from 'react';

interface NewStakeModalProps {
  onClose: () => void;
  isOpen?: boolean;
}
const NewStakeModal = ({ onClose, isOpen }: NewStakeModalProps) => {
  const depositListRef = useRef<DepositListRef>(null);

  const [selected, setSelected] = useState<Key>(stakeTabs[0].key);
  const [isStaking, setIsStaking] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectCollatorOpen, setSelectCollatorOpen] = useState(false);

  const handleClose = useCallback(() => {
    setSelectCollatorOpen(false);
  }, []);

  return (
    <>
      <Modal
        placement="center"
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onClose}
        className="bg-background"
        classNames={{
          closeButton:
            'p-0 top-[1.35rem] right-[1.35rem] hover:opacity-[var(--nextui-hover-opacity)] hover:bg-transparent'
        }}
        closeButton={<X strokeWidth={1.5} />}
      >
        <ModalContent className="w-[calc(100vw-1.24rem)] gap-5 md:w-[25rem]">
          <ModalHeader className="px-5 pb-0 pt-5 text-[1.125rem] font-bold text-foreground">
            <span>New Stake</span>
          </ModalHeader>
          <div className="px-5">
            <Divider />
          </div>
          <ModalBody className="flex flex-col gap-[1.25rem] p-0 px-5 pb-5">
            <div
              className="flex cursor-pointer flex-col gap-[0.625rem] rounded-medium bg-secondary p-[0.62rem] transition-all hover:opacity-[var(--nextui-hover-opacity)] active:scale-[1.01]"
              onClick={() => setSelectCollatorOpen(!selectCollatorOpen)}
            >
              <div className="text-[0.75rem] font-normal text-foreground/50">Collator</div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-[0.62rem]">
                  <div className="size-[1.625rem] rounded-full bg-[#c6c6c6]"></div>
                  <div className="text-[0.875rem] font-bold text-foreground">Select a collator</div>
                </div>
                <ChevronDown
                  size={16}
                  strokeWidth={2}
                  className={cn(
                    'transform transition-transform',
                    selectCollatorOpen ? 'rotate-180' : 'rotate-0'
                  )}
                />
              </div>
            </div>
            {/* todo  */}
            {/* Animation is not working when tabs are used inside a modal. */}
            {/* https://github.com/nextui-org/nextui/issues/2297 */}
            {/* https://github.com/framer/motion/issues/1302 */}
            <Tabs
              aria-label="Options"
              color="primary"
              variant="underlined"
              className="-mt-4"
              selectedKey={selected}
              onSelectionChange={setSelected}
              classNames={{
                tabList: 'gap-6 w-full relative rounded-none p-0 border-b border-divider',
                cursor: 'w-full bg-foreground font-bold',
                tab: 'max-w-fit px-0 h-12',
                tabContent: 'group-data-[selected=true]:text-foreground  font-bold'
              }}
            >
              {stakeTabs.map((tab) => (
                <Tab
                  key={tab.key}
                  title={
                    <div className="flex items-center space-x-2">
                      <span>{tab.label}</span>
                    </div>
                  }
                ></Tab>
              ))}
            </Tabs>
            <TransitionPanel
              activeIndex={selected === 'stake-ring' ? 0 : 1}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              variants={{
                enter: { opacity: 0, filter: 'blur(4px)' },
                center: { opacity: 1, filter: 'blur(0px)' },
                exit: { opacity: 0, filter: 'blur(4px)' }
              }}
            >
              {selected === 'stake-ring' && <StakeRing />}
              {selected === 'stake-deposit' && <StakeDeposit ref={depositListRef} />}
            </TransitionPanel>

            <Button
              color="primary"
              onPress={() => {
                setIsStaking(true);
                setTimeout(() => {
                  setIsStaking(false);
                  setIsSuccess(true);
                }, 3000);
              }}
              className="w-full font-bold"
            >
              Stake
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>

      <SelectCollator isOpen={selectCollatorOpen} onClose={handleClose} />
    </>
  );
};

export default NewStakeModal;
