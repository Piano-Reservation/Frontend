import {useState} from 'react';

import IcGachon from '@/shared/assets/svg/ic-gachon.svg';
import TodayReservationCard, {
  type Reservation,
} from './components/TodayReservationCard';
import HistoryTimeline, {type History} from './components/HistoryTimeline';
import Toast from './components/Toast';
import CancelConfirmModal from './components/CancelConfirmModal';

const initialTodayReservations: Reservation[] = [
  {
    id: 1,
    room: '119호',
    time: '09:00-10:00',
    status: 'completed',
  },
  {
    id: 2,
    room: '301호',
    time: '14:00-16:00',
    status: 'active',
  },
  {
    id: 3,
    room: '302호',
    time: '16:00-18:00',
    status: 'cancelable',
  },
];

const historyData: History[] = [
  {
    id: 1,
    date: '4.16',
    items: [
      {
        room: '302호',
        time: '14:00-16:00',
        status: 'completed',
      },
      {
        room: '304호',
        time: '20:00-22:00',
        status: 'canceled',
      },
    ],
  },
];

export const MyReservationPage = () => {
  const [todayReservations, setTodayReservations] = useState<Reservation[]>(
    initialTodayReservations
  );
  const [selectedReservation, setSelectedReservation] =
    useState<Reservation | null>(null);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isToastOpen, setIsToastOpen] = useState(false);

  const handleOpenCancelModal = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setIsCancelModalOpen(true);
  };

  const handleCloseCancelModal = () => {
    setIsCancelModalOpen(false);
    setSelectedReservation(null);
  };

  const handleConfirmCancel = () => {
    if (!selectedReservation) return;

    setTodayReservations((prev) =>
      prev.filter((reservation) => reservation.id !== selectedReservation.id)
    );

    setIsCancelModalOpen(false);
    setSelectedReservation(null);
    setIsToastOpen(true);

    window.setTimeout(() => {
      setIsToastOpen(false);
    }, 2000);
  };

  return (
    <div className='mx-auto min-h-[calc(100dvh-72px)] w-full max-w-[430px] overflow-x-hidden bg-[#F4F5FC]'>
      <main className='w-full px-[22px] pt-[20px] pb-[24px]'>
        <header className='text-caption5 mb-[22px] flex items-center justify-between'>
          <div className='flex items-center gap-1 whitespace-nowrap text-gray-900'>
            <img
              src={IcGachon}
              alt='가천대학교 로고'
              className='h-[18px] w-[22px]'
            />
            <span>가천대학교 음대 연습실 신청</span>
          </div>

          <div className='text-label2 whitespace-nowrap'>
            이름{' '}
            <span className='text-caption5 text-[#999999]'>
              (0학년/000000000)
            </span>
          </div>
        </header>

        <h1 className='text-title1 mb-[30px] tracking-[-0.5px]'>
          내 예약 확인
        </h1>

        <section className='mb-[34px]'>
          <h2 className='text-label1 mb-3'>오늘의 연습실</h2>

          <TodayReservationCard
            dateText='x월 x일 x요일'
            reservations={todayReservations}
            onCancelClick={handleOpenCancelModal}
          />
        </section>

        <section>
          <h2 className='text-label1 mb-3'>지난 이용 기록</h2>

          <HistoryTimeline histories={historyData} />
        </section>

        <CancelConfirmModal
          isOpen={isCancelModalOpen}
          onClose={handleCloseCancelModal}
          onConfirm={handleConfirmCancel}
        />

        <Toast isOpen={isToastOpen} message='예약이 취소되었습니다.' />
      </main>
    </div>
  );
};
