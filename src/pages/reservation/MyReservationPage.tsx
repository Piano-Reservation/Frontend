import {useRef, useState} from 'react';
import axios from 'axios';
import {useQuery} from '@tanstack/react-query';

import IcGachon from '@/shared/assets/svg/ic-gachon.svg';
import {useToast} from '@/shared/components';
import {QUERY_KEYS} from '@/shared/query/query-keys';
import {getMyInfo} from '@/pages/mypage/api/userApi';
import type {Grade} from '@/pages/mypage/api/types/user';
import TodayReservationCard, {
  type Reservation,
} from './components/TodayReservationCard';
import HistoryTimeline, {
  type History,
  type HistoryItem,
  type HistoryStatus,
} from './components/HistoryTimeline';
import Toast from './components/Toast';
import CancelConfirmModal from './components/CancelConfirmModal';
import {useTodayReservations} from './hooks/useTodayReservations';
import {useCancelReservation} from './hooks/useCancelReservation';
import {
  useBasementOccupancyHistory,
  useReservationHistory,
} from './hooks/useHistoryRecords';
import type {ApiReservationStatus} from './api/types/reservation';

const STATUS_MAP: Record<ApiReservationStatus, Reservation['status']> = {
  RESERVED: 'cancelable',
  CHECKED_IN: 'active',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  NO_SHOW: 'noShow',
};

const GRADE_LABELS: Record<Grade, string> = {
  FRESHMAN: '1학년',
  SOPHOMORE: '2학년',
  JUNIOR: '3학년',
  SENIOR: '4학년',
};

const HISTORY_STATUS_MAP: Record<ApiReservationStatus, HistoryStatus> = {
  RESERVED: 'reserved',
  CHECKED_IN: 'active',
  COMPLETED: 'completed',
  CANCELLED: 'canceled',
  NO_SHOW: 'noShow',
};

interface HistoryEntry {
  date: string;
  sortTime: string;
  item: HistoryItem;
}

const formatLocalDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const formatDateText = (date: Date) => {
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];

  return `${date.getMonth() + 1}월 ${date.getDate()}일 ${weekdays[date.getDay()]}요일`;
};

const formatHistoryDate = (date: string) => {
  const [, month, day] = date.split('-').map(Number);

  return `${month}.${day}`;
};

const groupHistoryEntries = (entries: HistoryEntry[]): History[] => {
  const groupedEntries = new Map<string, HistoryEntry[]>();

  entries.forEach((entry) => {
    const dateEntries = groupedEntries.get(entry.date) ?? [];
    dateEntries.push(entry);
    groupedEntries.set(entry.date, dateEntries);
  });

  return [...groupedEntries.entries()]
    .sort(([dateA], [dateB]) => dateB.localeCompare(dateA))
    .map(([date, dateEntries]) => ({
      id: date,
      date: formatHistoryDate(date),
      items: dateEntries
        .sort((entryA, entryB) =>
          entryB.sortTime.localeCompare(entryA.sortTime)
        )
        .map((entry) => entry.item),
    }));
};

export const MyReservationPage = () => {
  const toastTimerRef = useRef<number | null>(null);
  const [today] = useState(() => new Date());
  const queryDate = formatLocalDate(today);
  const {
    data: reservationData = [],
    isPending: isReservationsLoading,
    isError: isReservationsError,
  } = useTodayReservations(queryDate);
  const cancelReservationMutation = useCancelReservation(queryDate);
  const reservationHistoryQuery = useReservationHistory();
  const basementHistoryQuery = useBasementOccupancyHistory();
  const userInfoQuery = useQuery({
    queryKey: QUERY_KEYS.USER.ME,
    queryFn: getMyInfo,
  });

  const {showToast} = useToast();
  const [selectedReservation, setSelectedReservation] =
    useState<Reservation | null>(null);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isToastOpen, setIsToastOpen] = useState(false);
  const todayBasementReservations: Reservation[] =
    basementHistoryQuery.data
      ?.filter((occupancy) => occupancy.enteredAt.slice(0, 10) === queryDate)
      .map((occupancy) => {
        const startTime = occupancy.enteredAt.slice(11, 16);
        const endTime = occupancy.exitedAt?.slice(11, 16) ?? '이용 중';

        return {
          id: -occupancy.occupancyId,
          room: `${occupancy.roomCode}호`,
          time: `${startTime}-${endTime}`,
          status: occupancy.status === 'EXITED' ? 'completed' : 'active',
        };
      }) ?? [];
  const todayReservations: Reservation[] = [
    ...reservationData.map((reservation) => ({
      id: reservation.reservationId,
      room: `${reservation.roomCode}호`,
      time: `${reservation.startTime.slice(0, 5)}-${reservation.endTime.slice(0, 5)}`,
      status: STATUS_MAP[reservation.status],
    })),
    ...todayBasementReservations,
  ].sort((reservationA, reservationB) =>
    reservationA.time.localeCompare(reservationB.time)
  );
  const reservationHistoryEntries: HistoryEntry[] =
    reservationHistoryQuery.data?.pages.flatMap((page) =>
      page.content.map((reservation) => ({
        date: reservation.date,
        sortTime: reservation.startTime,
        item: {
          id: `reservation-${reservation.reservationId}`,
          room: `${reservation.roomCode}호`,
          time: `${reservation.startTime.slice(0, 5)}-${reservation.endTime.slice(0, 5)}`,
          status: HISTORY_STATUS_MAP[reservation.status],
        },
      }))
    ) ?? [];
  const basementHistoryEntries: HistoryEntry[] =
    basementHistoryQuery.data
      ?.filter((occupancy) => occupancy.enteredAt.slice(0, 10) < queryDate)
      .map((occupancy) => {
        const date = occupancy.enteredAt.slice(0, 10);
        const startTime = occupancy.enteredAt.slice(11, 16);
        const endTime = occupancy.exitedAt?.slice(11, 16) ?? '이용 중';

        return {
          date,
          sortTime: occupancy.enteredAt.slice(11),
          item: {
            id: `basement-${occupancy.occupancyId}`,
            room: `${occupancy.roomCode}호`,
            time: `${startTime}-${endTime}`,
            status: occupancy.status === 'EXITED' ? 'completed' : 'active',
          },
        };
      }) ?? [];
  const historyData = groupHistoryEntries([
    ...reservationHistoryEntries,
    ...basementHistoryEntries,
  ]);
  const isHistoryLoading =
    reservationHistoryQuery.isPending || basementHistoryQuery.isPending;
  const hasHistoryError =
    reservationHistoryQuery.isError || basementHistoryQuery.isError;

  const handleOpenCancelModal = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setIsCancelModalOpen(true);
  };

  const handleCloseCancelModal = () => {
    if (cancelReservationMutation.isPending) return;

    setIsCancelModalOpen(false);
    setSelectedReservation(null);
  };

  const handleConfirmCancel = () => {
    if (!selectedReservation) return;

    cancelReservationMutation.mutate(selectedReservation.id, {
      onSuccess: () => {
        setIsCancelModalOpen(false);
        setSelectedReservation(null);
        setIsToastOpen(true);

        if (toastTimerRef.current) {
          window.clearTimeout(toastTimerRef.current);
        }
        toastTimerRef.current = window.setTimeout(() => {
          setIsToastOpen(false);
        }, 2000);
      },
      onError: (error) => {
        let message = '예약 취소에 실패했습니다.';

        if (axios.isAxiosError(error)) {
          const responseMessage = error.response?.data?.message;
          if (typeof responseMessage === 'string') {
            message = responseMessage;
          }
        }

        showToast({variant: 'error', message});
      },
    });
  };

  return (
    <div className='mx-auto min-h-[calc(100dvh-72px)] w-full max-w-[430px] overflow-x-hidden bg-[var(--color-blue-25)]'>
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
            {userInfoQuery.data ? (
              <>
                {userInfoQuery.data.name}{' '}
                <span className='text-caption5 text-[#999999]'>
                  ({GRADE_LABELS[userInfoQuery.data.grade]}/
                  {userInfoQuery.data.studentNumber})
                </span>
              </>
            ) : (
              <span className='text-caption5 text-[#999999]'>
                {userInfoQuery.isError
                  ? '내 정보 조회 실패'
                  : '내 정보 확인 중...'}
              </span>
            )}
          </div>
        </header>

        <h1 className='text-title1 mb-[30px] tracking-[-0.5px]'>
          내 예약 확인
        </h1>

        <section className='mb-[34px]'>
          <h2 className='text-label1 mb-3'>오늘의 연습실</h2>

          <TodayReservationCard
            dateText={formatDateText(today)}
            reservations={todayReservations}
            isLoading={isReservationsLoading || basementHistoryQuery.isPending}
            isError={isReservationsError || basementHistoryQuery.isError}
            onCancelClick={handleOpenCancelModal}
          />
        </section>

        <section>
          <h2 className='text-label1 mb-3'>지난 이용 기록</h2>

          <HistoryTimeline
            histories={historyData}
            isLoading={isHistoryLoading}
            hasError={hasHistoryError}
            hasMore={reservationHistoryQuery.hasNextPage}
            isLoadingMore={reservationHistoryQuery.isFetchingNextPage}
            onLoadMore={() => void reservationHistoryQuery.fetchNextPage()}
          />
        </section>

        <CancelConfirmModal
          isOpen={isCancelModalOpen}
          isPending={cancelReservationMutation.isPending}
          onClose={handleCloseCancelModal}
          onConfirm={handleConfirmCancel}
        />

        <Toast isOpen={isToastOpen} message='예약이 취소되었습니다.' />
      </main>
    </div>
  );
};
