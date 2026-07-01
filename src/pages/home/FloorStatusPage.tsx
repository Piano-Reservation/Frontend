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
import {useBasementOccupancyStatus} from '@/pages/home/hooks/useBasementOccupancyStatus';

const getFloorLabel = (floor: string) => `${floor}층`;

const parseFloor = (floor: string): FloorValue =>
  floor === 'B1' ? 'B1' : (Number(floor) as FloorValue);

const formatEnteredAt = (enteredAt: string | null) => {
  if (!enteredAt) return null;

  return enteredAt.slice(11, 16);
};

const FloorStatusPage = () => {
  const navigate = useNavigate();
  const {floor = ''} = useParams<{floor: string}>();
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);

  const floorValue = parseFloor(floor);
  const apiFloor = FLOOR_TO_API_VALUE[floorValue];
  const isBasementFloor = floorValue === 'B1';
  const {data: rooms = []} = useRoomList(apiFloor, !isBasementFloor);
  const {data: schedules = []} = useRoomSchedules(apiFloor, !isBasementFloor);
  const {data: basementStatuses = []} =
    useBasementOccupancyStatus(isBasementFloor);
  const roomItems = isBasementFloor
    ? basementStatuses.map((status) => ({
        roomId: status.roomId,
        name: status.roomName,
      }))
    : rooms;
  const selectedSchedule = schedules.find(
    (schedule) => schedule.roomId === selectedRoom
  );
  const selectedBasementStatus = basementStatuses.find(
    (status) => status.roomId === selectedRoom
  );
  const basementEnteredAt = formatEnteredAt(
    selectedBasementStatus?.enteredAt ?? null
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
            {roomItems.map((room) => (
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

            {!isBasementFloor && (
              <ReservationLegendCard
                variant='reservation-list'
                className='mt-2'
              />
            )}
          </div>

          {selectedRoom === null ? (
            <p className='text-caption5 flex h-100 w-32 items-center justify-center rounded-md bg-gray-200 text-gray-600'>
              연습실을 선택해주세요
            </p>
          ) : isBasementFloor ? (
            <section
              className={cn(
                'flex h-72 w-23.5 flex-col items-center justify-center rounded-lg',
                selectedBasementStatus?.occupied
                  ? 'bg-secondary'
                  : 'border-action-primary text-action-primary border bg-white'
              )}>
              <span
                className={cn(
                  'text-label3 text-center',
                  selectedBasementStatus?.occupied
                    ? 'text-white'
                    : 'text-action-primary'
                )}>
                {selectedBasementStatus?.occupied ? '사용 중' : '사용 가능'}
              </span>
              {selectedBasementStatus?.occupied && (
                <div className='text-caption5 mt-3 flex flex-col items-center gap-1 text-black'>
                  <span>{selectedBasementStatus.occupantName}</span>
                  {basementEnteredAt && <span>{basementEnteredAt} 입실</span>}
                </div>
              )}
            </section>
          ) : (
            <ReservationStatusTimeline slots={timeSlots} />
          )}
        </div>
      </main>
    </div>
  );
};

export default FloorStatusPage;
