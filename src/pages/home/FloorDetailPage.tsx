import {useState} from 'react';
import {useNavigate, useParams} from 'react-router';

import {IcSvgChevronLeft} from '@/shared/icons';
import {ROUTES} from '@/shared/constants/routes';
import {cn} from '@/shared/utils/cn';
import {useToast} from '@/shared/components/toast/ToastContext';
import ReservationTimeline from '@/pages/home/components/ReservationTimeline';
import {
  MOCK_SLOTS,
  ROOMS_BY_FLOOR,
  type FloorValue,
} from '@/pages/home/constants/home';

const getFloorLabel = (floor: string) => `${floor}층`;

const parseFloor = (floor: string): FloorValue =>
  floor === 'B1' ? 'B1' : (Number(floor) as FloorValue);

const FloorDetailPage = () => {
  const navigate = useNavigate();
  const {floor = ''} = useParams<{floor: string}>();
  const {showToast} = useToast();
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  const [selectedHours, setSelectedHours] = useState<number[]>([]);

  const floorValue = parseFloor(floor);
  const rooms = ROOMS_BY_FLOOR[floorValue] ?? [];

  const handleToggleHour = (hour: number) => {
    setSelectedHours((prev) =>
      prev.includes(hour) ? prev.filter((h) => h !== hour) : [...prev, hour]
    );
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

        <div className='flex items-start justify-between'>
          <div className='flex flex-col gap-3'>
            {rooms.map((room) => (
              <button
                key={room}
                type='button'
                onClick={() => setSelectedRoom(room)}
                className={cn(
                  'text-button4 w-60 overflow-hidden rounded-lg p-3 text-left tracking-[-0.24px]',
                  selectedRoom === room
                    ? 'bg-action-primary text-white'
                    : 'bg-bg-surface border-border-default text-text-body border'
                )}>
                {room}
              </button>
            ))}

            <div className='mt-2 inline-grid grid-cols-[34px_auto] items-center gap-x-1.5 gap-y-1.5 rounded-lg bg-white p-2'>
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

          <ReservationTimeline
            slots={MOCK_SLOTS}
            selectedHours={selectedHours}
            onToggleHour={handleToggleHour}
          />
        </div>
      </main>

      <div className='p-5 pt-0'>
        <button
          type='button'
          disabled={!selectedRoom}
          onClick={() => {
            showToast({variant: 'success', message: '예약이 완료되었습니다.'});
            navigate(ROUTES.RESERVATION);
          }}
          className='bg-action-primary text-button1 h-12 w-full rounded-xl tracking-[0.54px] text-white disabled:opacity-40'>
          예약하기
        </button>
      </div>
    </div>
  );
};

export default FloorDetailPage;
