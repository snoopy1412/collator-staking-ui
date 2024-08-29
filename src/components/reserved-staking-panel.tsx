import TooltipFormattedNumber from './tooltip-formatter-number';

const fakerFormatted = '121212.123123';
const ReservedStakingPanel = () => {
  return (
    <div className="relative flex h-[11rem] w-full flex-col items-center justify-center gap-[0.625rem] rounded-medium bg-secondary p-5 md:w-[22.5rem]">
      <div className="relative mt-[0.62rem] size-[3.75rem]">
        <img src="/images/token/ring.svg" alt="ring" className="h-[60px] w-[60px]" />
      </div>
      <p className="m-0 text-[0.875rem] font-normal text-foreground">Reserved in Staking</p>
      <TooltipFormattedNumber value={fakerFormatted} />
    </div>
  );
};

export default ReservedStakingPanel;
