import {useState} from 'react';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router';

import {IcSvgChevronLeft} from '@/shared/icons';
import {ROUTES} from '@/shared/constants/routes';
import {cn} from '@/shared/utils/cn';
import {Modal, useModal} from '@/shared/components';
import {useToast} from '@/shared/components/toast/ToastContext';
import ReservationTimeline, {
  type TimeSlot,
} from '@/pages/home/components/ReservationTimeline';
import {useRoomList} from '@/pages/home/hooks/useRoomList';
import {useRoomAvailability} from '@/pages/home/hooks/useRoomAvailability';
import {useCreateReservation} from '@/pages/home/hooks/useCreateReservation';
import {hoursToReservationTime} from '@/pages/home/utils/reservationTime';
import {FLOOR_TO_API_VALUE, type FloorValue} from '@/pages/home/constants/home';
import {type AvailabilityStatus} from '@/pages/home/api/availabilityApi';

const getFloorLabel = (floor: string) => `${floor}층`;

const parseFloor = (floor: string): FloorValue =>
  floor === 'B1' ? 'B1' : (Number(floor) as FloorValue);

const TIME_SLOT_STATUS_MAP: Record<AvailabilityStatus, TimeSlot['status']> = {
  AVAILABLE: 'available',
  RESERVED: 'reserved',
  RESERVED_BY_ME: 'reservedByMe',
};

const FloorDetailPage = () => {
  const navigate = useNavigate();
  const {floor = ''} = useParams<{floor: string}>();
  const {showToast} = useToast();
  const {isOpen, open, close} = useModal();
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);
  const [selectedHours, setSelectedHours] = useState<number[]>([]);

  const {data: availability} = useRoomAvailability(selectedRoom);
  const {mutate: createReservation, isPending} = useCreateReservation();

  const timeSlots: TimeSlot[] =
    availability?.slots.map((slot) => ({
      hour: parseInt(slot.startTime.split(':')[0], 10),
      status: TIME_SLOT_STATUS_MAP[slot.status],
    })) ?? [];

  const handleConfirmReservation = () => {
    if (!selectedRoom || selectedHours.length === 0 || isPending) return;

    const sorted = [...selectedHours].sort((a, b) => a - b);
    if (sorted.some((h, i) => i > 0 && h !== sorted[i - 1] + 1)) return;

    const {date, startTime, endTime} = hoursToReservationTime(selectedHours);

    createReservation(
      {roomId: selectedRoom, date, startTime, endTime},
      {
        onSuccess: () => {
          close();
          showToast({variant: 'success', message: '예약이 완료되었습니다.'});
          navigate(ROUTES.HOME, {state: {tab: '예약 현황'}});
        },
        onError: (error) => {
          close();
          const message =
            axios.isAxiosError(error) && error.response?.data?.message
              ? error.response.data.message
              : '예약에 실패했습니다.';
          showToast({variant: 'error', message});
        },
      }
    );
  };

  const floorValue = parseFloor(floor);
  const {data: rooms = []} = useRoomList(FLOOR_TO_API_VALUE[floorValue]);

  const handleToggleHour = (hour: number) => {
    setSelectedHours((prev) => {
      if (prev.includes(hour)) {
        const min = Math.min(...prev);
        const max = Math.max(...prev);
        if (hour !== min && hour !== max) return prev;
        return prev.filter((h) => h !== hour);
      }
      if (prev.length === 0) return [hour];
      const min = Math.min(...prev);
      const max = Math.max(...prev);
      if (hour !== min - 1 && hour !== max + 1) return prev;
      return [...prev, hour];
    });
  };

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

        <div className='flex flex-1 items-start justify-between'>
          <div className='flex flex-col justify-between self-stretch'>
            <div className='flex flex-col gap-3'>
              {rooms.map((room) => (
                <button
                  key={room.roomId}
                  type='button'
                  onClick={() => {
                    setSelectedRoom(room.roomId);
                    setSelectedHours([]);
                  }}
                  className={cn(
                    'text-button4 w-60 overflow-hidden rounded-lg p-3 text-left tracking-[-0.24px]',
                    selectedRoom === room.roomId
                      ? 'bg-action-primary text-white'
                      : 'bg-bg-surface border-border-default text-text-body border'
                  )}>
                  {room.name}
                </button>
              ))}
            </div>

            <div className='inline-grid grid-cols-[34px_auto] items-center gap-x-1.5 gap-y-1.5 rounded-lg bg-white p-2'>
              <div className='border-text-body h-3.5 w-8.5 border border-dashed' />
              <span className='text-text-body text-[9px]'>예약 가능</span>
              <div className='h-3.5 w-8.5 bg-gray-200' />
              <span className='text-text-body text-[9px]'>예약 선택 시</span>
              <div className='bg-secondary h-3.5 w-8.5' />
              <span className='text-text-body text-[9px]'>
                예약 불가(레슨, 예약됨)
              </span>
            </div>
          </div>

          {selectedRoom === null ? (
            <p className='text-caption5 flex h-100 w-32 items-center justify-center rounded-md bg-gray-200 text-gray-600'>
              연습실을 선택해주세요
            </p>
          ) : (
            <ReservationTimeline
              slots={timeSlots}
              selectedHours={selectedHours}
              onToggleHour={handleToggleHour}
            />
          )}
        </div>
      </main>

      <div className='p-5 pt-0'>
        <button
          type='button'
          disabled={!selectedRoom || selectedHours.length === 0}
          onClick={open}
          className='bg-action-primary text-button1 h-12 w-full rounded-xl tracking-[0.54px] text-white disabled:opacity-40'>
          예약하기
        </button>
      </div>

      <Modal
        isOpen={isOpen}
        title='예약 및 유의사항'
        confirmText='예약하기'
        cancelText='취소'
        confirmDisabled={isPending}
        onConfirm={handleConfirmReservation}
        onClose={close}>
        <p>
          · 3층 연습실은 한 연습실에 최대 2시간, 일일 최대 6시간까지 예약 가능
        </p>
        <p>· 오후 연습실은 본인 전공실에 맞춰 신청</p>
        <p>· 당일 오후 13:00 이후부터는 학년 구분 없이 사용 가능</p>
      </Modal>
    </div>
  );
};

export default FloorDetailPage;
