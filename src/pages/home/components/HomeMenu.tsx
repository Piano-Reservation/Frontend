import {cn} from '@/shared/utils/cn';

export type HomeMenuTab = '예약하기' | '유의사항' | '예약 현황';

const TABS: HomeMenuTab[] = ['예약하기', '유의사항', '예약 현황'];

interface HomeMenuProps {
  activeTab?: HomeMenuTab;
  onTabChange?: (tab: HomeMenuTab) => void;
}

const HomeMenu = ({activeTab, onTabChange}: HomeMenuProps) => (
  <div className='flex items-center justify-between'>
    {TABS.map((tab) => {
      const isActive = activeTab === tab;
      return (
        <button
          key={tab}
          type='button'
          onClick={() => onTabChange?.(tab)}
          className={cn(
            'text-button3 flex h-8.5 w-[108px] items-center justify-center rounded-full border tracking-[0.24px]',
            isActive
              ? 'bg-action-primary border-transparent text-white'
              : 'bg-bg-surface border-border-default text-gray-600'
          )}>
          {tab}
        </button>
      );
    })}
  </div>
);

export default HomeMenu;
