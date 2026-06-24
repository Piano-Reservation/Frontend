import {IcSvgChevronRight} from '@/shared/icons';

interface FloorCardProps {
  floor: number | string;
  onClick?: () => void;
}

const FloorCard = ({floor, onClick}: FloorCardProps) => (
  <button
    type='button'
    onClick={onClick}
    className='bg-bg-surface flex h-22 w-full items-center justify-between rounded-2xl p-4 shadow-[0px_0px_2px_0px_rgba(0,0,0,0.25)]'>
    <span className='text-title1 text-text-body tracking-[0.72px]'>{floor}층</span>
    <IcSvgChevronRight className='size-6 shrink-0 text-gray-400' />
  </button>
);

export default FloorCard;
