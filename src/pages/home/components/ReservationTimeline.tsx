import {cn} from '@/shared/utils/cn';

export type TimeSlotStatus = 'available' | 'booked';

export interface TimeSlot {
  hour: number;
  status: TimeSlotStatus;
}

interface ReservationTimelineProps {
  slots: TimeSlot[];
  selectedHours?: number[];
  onToggleHour?: (hour: number) => void;
}

const ReservationTimeline = ({
  slots,
  selectedHours = [],
  onToggleHour,
}: ReservationTimelineProps) => (
  <div className='inline-grid grid-cols-[20px_64px] gap-x-2.5 gap-y-2.5'>
    {slots.map(({hour, status}) => {
      const isUserSelected = selectedHours.includes(hour);
      const isToggleable = status === 'available';
      const statusLabel = isUserSelected
        ? '선택됨'
        : status === 'available'
          ? '예약 가능'
          : '예약됨';

      return (
        <div key={hour} className='contents'>
          <span className='text-label3 text-text-body self-start text-center'>
            {hour}
          </span>
          <button
            type='button'
            aria-label={`${hour}시 ${statusLabel}`}
            disabled={!isToggleable}
            onClick={() => isToggleable && onToggleHour?.(hour)}
            className={cn(
              'h-4.5 w-full',
              status === 'available' &&
                !isUserSelected &&
                'border-text-body border border-dashed',
              status === 'available' && isUserSelected && 'bg-gray-200',
              status === 'booked' && 'bg-secondary'
            )}
          />
        </div>
      );
    })}
  </div>
);

export default ReservationTimeline;
