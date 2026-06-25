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
        <span className='text-label3 text-text-body self-start text-center'>
          {hour}
        </span>
        <div
          className={cn(
            'flex h-4.5 w-full items-center justify-center',
            !bookedBy && 'border-text-body border border-dashed',
            bookedBy && !isMine && 'bg-transparent',
            bookedBy && isMine && 'bg-secondary/20'
          )}>
          {bookedBy && (
            <span className='text-text-body text-[14px] leading-none font-medium tracking-[-0.28px]'>
              {bookedBy}
            </span>
          )}
        </div>
      </div>
    ))}
  </div>
);

export default ReservationStatusTimeline;
