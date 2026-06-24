import {cn} from '@/shared/utils/cn';

interface RoomCardProps {
  label: string;
  isSelected?: boolean;
  onClick?: () => void;
}

const RoomCard = ({label, isSelected = false, onClick}: RoomCardProps) => (
  <button
    type='button'
    onClick={onClick}
    className={cn(
      'flex w-full items-center overflow-hidden rounded-lg p-3 text-button4 tracking-[-0.24px]',
      isSelected
        ? 'bg-action-primary text-white'
        : 'bg-bg-surface border border-border-default text-text-body',
    )}>
    {label}
  </button>
);

export default RoomCard;
