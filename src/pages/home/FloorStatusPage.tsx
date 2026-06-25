import {useState} from 'react';
import {useNavigate, useParams} from 'react-router';

import {IcSvgChevronLeft} from '@/shared/icons';
import {cn} from '@/shared/utils/cn';
import ReservationStatusTimeline from '@/pages/home/components/ReservationStatusTimeline';
import {MOCK_STATUS_SLOTS, ROOMS_BY_FLOOR, type FloorValue} from '@/pages/home/constants/home';

const getFloorLabel = (floor: string) => `${floor}층`;

const parseFloor = (floor: string): FloorValue =>
  floor === 'B1' ? 'B1' : (Number(floor) as FloorValue);

const FloorStatusPage = () => {
  const navigate = useNavigate();
  const {floor = ''} = useParams<{floor: string}>();
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  const floorValue = parseFloor(floor);
  const rooms = ROOMS_BY_FLOOR[floorValue] ?? [];

  return (
    <div className='bg-bg-page flex min-h-dvh flex-col'>
      <main className='flex flex-1 flex-col gap-8 p-5'>
        <div className='flex items-center gap-1'>
          <button type='button' onClick={() => navigate(-1)}>
            <IcSvgChevronLeft className='size-6 text-text-body' />
          </button>
          <h1 className='text-title1 text-text-body tracking-[0.72px]'>
            {getFloorLabel(floor)}
          </h1>
        </div>

        <div className='flex items-start justify-between'>
          <div className='flex flex-col gap-3'>
            {rooms.map((room) => (
              <button
                key={room}
                type='button'
                onClick={() => setSelectedRoom(room)}
                className={cn(
                  'w-60 overflow-hidden rounded-lg p-3 text-left text-button4 tracking-[-0.24px]',
                  selectedRoom === room
                    ? 'bg-action-primary text-white'
                    : 'bg-bg-surface border border-border-default text-text-body',
                )}>
                {room}
              </button>
            ))}

            <div className='mt-2 inline-grid grid-cols-[34px_auto] items-center gap-x-1.5 gap-y-1.5 rounded-lg bg-white p-2'>
              <div className='h-3.5 w-8.5 border border-dashed border-text-body' />
              <span className='text-[9px] text-text-body'>예약 가능</span>
              <div className='bg-secondary h-3.5 w-8.5 opacity-20' />
              <span className='text-[9px] text-text-body'>내 예약</span>
            </div>
          </div>

          <ReservationStatusTimeline slots={MOCK_STATUS_SLOTS} />
        </div>
      </main>
    </div>
  );
};

export default FloorStatusPage;
