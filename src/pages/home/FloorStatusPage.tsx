import {useState} from 'react';
import {useNavigate, useParams} from 'react-router';

import {IcSvgChevronLeft} from '@/shared/icons';
import {cn} from '@/shared/utils/cn';
import ReservationStatusTimeline from '@/pages/home/components/ReservationStatusTimeline';
import {useRoomList} from '@/pages/home/hooks/useRoomList';
import {FLOOR_TO_API_VALUE, type FloorValue} from '@/pages/home/constants/home';

const getFloorLabel = (floor: string) => `${floor}층`;

const parseFloor = (floor: string): FloorValue =>
  floor === 'B1' ? 'B1' : (Number(floor) as FloorValue);

const FloorStatusPage = () => {
  const navigate = useNavigate();
  const {floor = ''} = useParams<{floor: string}>();
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);

  const floorValue = parseFloor(floor);
  const {data: rooms = []} = useRoomList(FLOOR_TO_API_VALUE[floorValue]);

  return (
    <div className='bg-bg-page flex min-h-dvh flex-col'>
      <main className='flex flex-1 flex-col gap-8 p-5'>
        <div className='flex items-center gap-1'>
          <button type='button' onClick={() => navigate(-1)}>
            <IcSvgChevronLeft className='text-text-body size-6' />
          </button>
          <h1 className='text-title1 text-text-body tracking-[0.72px]'>
            {getFloorLabel(floor)}
          </h1>
        </div>

        <div className='flex items-start justify-between'>
          <div className='flex flex-col gap-3'>
            {rooms.map((room) => (
              <button
                key={room.roomId}
                type='button'
                onClick={() => setSelectedRoom(room.roomId)}
                className={cn(
                  'text-button4 w-60 overflow-hidden rounded-lg p-3 text-left tracking-[-0.24px]',
                  selectedRoom === room.roomId
                    ? 'bg-action-primary text-white'
                    : 'bg-bg-surface border-border-default text-text-body border'
                )}>
                {room.name}
              </button>
            ))}

            <div className='mt-2 inline-grid grid-cols-[34px_auto] items-center gap-x-1.5 gap-y-1.5 rounded-lg bg-white p-2'>
              <div className='border-text-body h-3.5 w-8.5 border border-dashed' />
              <span className='text-text-body text-[9px]'>예약 가능</span>
              <div className='bg-secondary h-3.5 w-8.5' />
              <span className='text-text-body text-[9px]'>예약됨</span>
              <div className='bg-secondary/20 h-3.5 w-8.5' />
              <span className='text-text-body text-[9px]'>내 예약</span>
            </div>
          </div>

          <ReservationStatusTimeline slots={[]} />
        </div>
      </main>
    </div>
  );
};

export default FloorStatusPage;
