import {useState} from 'react';
import {useNavigate, useParams} from 'react-router';

import {IcSvgChevronLeft} from '@/shared/icons';
import {cn} from '@/shared/utils/cn';
import ReservationStatusTimeline, {
  type StatusSlot,
} from '@/pages/home/components/ReservationStatusTimeline';
import {useRoomList} from '@/pages/home/hooks/useRoomList';
import {useRoomSchedules} from '@/pages/home/hooks/useRoomSchedules';
import {FLOOR_TO_API_VALUE, type FloorValue} from '@/pages/home/constants/home';
import ReservationLegendCard from '@/pages/home/components/ReservationLegendCard';

const getFloorLabel = (floor: string) => `${floor}층`;

const parseFloor = (floor: string): FloorValue =>
  floor === 'B1' ? 'B1' : (Number(floor) as FloorValue);

const FloorStatusPage = () => {
  const navigate = useNavigate();
  const {floor = ''} = useParams<{floor: string}>();
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);

  const floorValue = parseFloor(floor);
  const apiFloor = FLOOR_TO_API_VALUE[floorValue];
  const isSupportedScheduleFloor = apiFloor === 1 || apiFloor === 3;
  const {data: rooms = []} = useRoomList(apiFloor, isSupportedScheduleFloor);
  const {data: schedules = []} = useRoomSchedules(
    apiFloor,
    isSupportedScheduleFloor
  );
  const selectedSchedule = schedules.find(
    (schedule) => schedule.roomId === selectedRoom
  );
  const timeSlots: StatusSlot[] =
    selectedSchedule?.slots.map((slot) => ({
      hour: parseInt(slot.startTime.split(':')[0], 10),
      status: slot.status,
    })) ?? [];

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

            <ReservationLegendCard variant='reservation-list' className='mt-2' />
          </div>

          {selectedRoom === null ? (
            <p className='text-caption5 flex h-100 w-32 items-center justify-center rounded-md bg-gray-200 text-gray-600'>
              연습실을 선택해주세요
            </p>
          ) : (
            <ReservationStatusTimeline slots={timeSlots} />
          )}
        </div>
      </main>
    </div>
  );
};

export default FloorStatusPage;
