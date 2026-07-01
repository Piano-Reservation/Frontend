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

            {isBasementFloor ? (
              <div className='mt-2 inline-grid grid-cols-[34px_90px] items-center gap-x-1.5 gap-y-1.5 rounded-lg bg-white p-2'>
                <div className='border-text-body h-3.5 w-8.5 border border-dashed' />
                <span className='text-text-body text-[10px] leading-none font-semibold tracking-[-0.02em] whitespace-nowrap'>
                  사용 가능
                </span>
                <div className='bg-secondary h-3.5 w-8.5' />
                <span className='text-text-body text-[10px] leading-none font-semibold tracking-[-0.02em] whitespace-nowrap'>
                  사용 중
                </span>
              </div>
            ) : (
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
            <section className='flex h-40 w-32 flex-col justify-center rounded-md bg-white p-4 shadow-[0px_0px_2px_0px_rgba(0,0,0,0.25)]'>
              <span
                className={cn(
                  'text-label3 mb-2',
                  selectedBasementStatus?.occupied
                    ? 'text-secondary'
                    : 'text-text-body'
                )}>
                {selectedBasementStatus?.occupied ? '사용 중' : '사용 가능'}
              </span>
              {selectedBasementStatus?.occupied && (
                <div className='text-caption6 text-text-body flex flex-col gap-1'>
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
