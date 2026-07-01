import {cn} from '@/shared/utils/cn';

export type ReservationLegendVariant = 'reservation' | 'reservation-list';

interface ReservationLegendItem {
  label: string;
  swatchClassName: string;
}

interface ReservationLegendCardProps {
  variant: ReservationLegendVariant;
  className?: string;
}

const RESERVATION_LEGEND_ITEMS: Record<
  ReservationLegendVariant,
  ReservationLegendItem[]
> = {
  reservation: [
    {
      label: '예약 가능',
      swatchClassName: 'border-text-body border border-dashed',
    },
    {
      label: '예약 선택 중',
      swatchClassName: 'bg-gray-200',
    },
    {
      label: '내 예약',
      swatchClassName: 'bg-secondary/20',
    },
    {
      label: '예약 불가(입실, 예약중)',
      swatchClassName: 'bg-secondary',
    },
  ],
  'reservation-list': [
    {
      label: '예약 가능',
      swatchClassName: 'border-text-body border border-dashed',
    },
    {
      label: '내 예약',
      swatchClassName: 'bg-secondary/20',
    },
    {
      label: '예약 불가(입실, 예약중)',
      swatchClassName: 'bg-secondary',
    },
  ],
};

const ReservationLegendCard = ({
  variant,
  className,
}: ReservationLegendCardProps) => {
  const items = RESERVATION_LEGEND_ITEMS[variant];

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
