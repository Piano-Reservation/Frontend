import {cn} from '@/shared/utils/cn';

export interface StatusSlot {
  hour: number;
  bookedBy: string | null;
  isMine?: boolean;
}

interface ReservationStatusTimelineProps {
  slots: StatusSlot[];
}

const ReservationStatusTimeline = ({slots}: ReservationStatusTimelineProps) => (
  <div className='inline-grid grid-cols-[20px_64px] gap-x-2.5 gap-y-2.5'>
    {slots.map(({hour, bookedBy, isMine}) => (
      <div key={hour} className='contents'>
        <span className='text-label3 self-start text-center text-text-body'>{hour}</span>
        <div
          className={cn(
            'flex h-4.5 w-full items-center justify-center',
            !bookedBy && 'border border-dashed border-text-body',
            bookedBy && !isMine && 'bg-transparent',
            bookedBy && isMine && 'bg-secondary/20',
          )}>
          {bookedBy && (
            <span className='text-[14px] font-medium leading-none tracking-[-0.28px] text-text-body'>
              {bookedBy}
            </span>
          )}
        </div>
      </div>
    ))}
  </div>
);

export default ReservationStatusTimeline;
