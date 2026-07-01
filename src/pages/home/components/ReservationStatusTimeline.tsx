import {cn} from '@/shared/utils/cn';
import {type AvailabilityStatus} from '@/pages/home/api/availabilityApi';

export interface StatusSlot {
  hour: number;
  status: AvailabilityStatus;
}

interface ReservationStatusTimelineProps {
  slots: StatusSlot[];
}

const ReservationStatusTimeline = ({slots}: ReservationStatusTimelineProps) => (
  <div className='inline-grid grid-cols-[20px_64px] gap-x-2.5 gap-y-2.5'>
    {slots.map(({hour, status}) => (
      <div key={hour} className='contents'>
        <span className='text-label3 text-text-body self-start text-center'>
          {hour}
        </span>
        <div
          className={cn(
            'h-4.5 w-full',
            status === 'AVAILABLE' && 'border-text-body border border-dashed',
            status === 'RESERVED' && 'bg-secondary',
            status === 'RESERVED_BY_ME' && 'bg-secondary/20'
          )}
        />
      </div>
    ))}
  </div>
);

export default ReservationStatusTimeline;
