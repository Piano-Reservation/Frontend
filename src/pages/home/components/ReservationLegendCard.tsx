import {cn} from '@/shared/utils/cn';

type ReservationLegendVariant = 'reservation' | 'reservation-list';

interface ReservationLegendItem {
  label: string;
  swatchClassName: string;
}

interface ReservationLegendCardProps {
  variant: ReservationLegendVariant;
  className?: string;
}

const RESERVATION_ITEMS: ReservationLegendItem[] = [
  {
    label: '예약 가능',
    swatchClassName: 'border-text-body border border-dashed',
  },
  {
    label: '예약 선택 시',
    swatchClassName: 'bg-gray-200',
  },
  {
    label: '내 예약',
    swatchClassName: 'bg-secondary/20',
  },
  {
    label: '예약 불가(레슨, 예약됨)',
    swatchClassName: 'bg-secondary',
  },
];

const RESERVATION_LIST_ITEMS: ReservationLegendItem[] =
  RESERVATION_ITEMS.filter((item) => item.label !== '예약 선택 시');

const ReservationLegendCard = ({
  variant,
  className,
}: ReservationLegendCardProps) => {
  const items =
    variant === 'reservation' ? RESERVATION_ITEMS : RESERVATION_LIST_ITEMS;

  return (
    <div
      className={cn(
        'inline-grid grid-cols-[34px_90px] items-center gap-x-1.5 gap-y-1.5 rounded-lg bg-white p-2',
        className
      )}>
      {items.map((item) => (
        <div key={item.label} className='contents'>
          <div className={cn('h-3.5 w-8.5', item.swatchClassName)} />
          <span className='text-text-body text-[10px] leading-none font-semibold tracking-[-0.02em] whitespace-nowrap'>
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ReservationLegendCard;
