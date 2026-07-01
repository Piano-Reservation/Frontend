import {useMemo, useState} from 'react';

import {useMyInfo} from '@/pages/mypage/hooks/useMyInfo';
import {
  useBasementOccupancyHistory,
  useReservationHistory,
} from './useHistoryRecords';
import {useTodayReservations} from './useTodayReservations';
import {formatDateText, formatLocalDate} from '../utils/reservationFormatters';
import {
  mapHistoryRecords,
  mapTodayReservations,
} from '../utils/reservationMappers';
import type {BasementOccupancy} from '../api/types/basementOccupancy';
import {getCurrentDate} from '@/shared/utils/date';

const GRADE_LABELS = {
  FRESHMAN: '1학년',
  SOPHOMORE: '2학년',
  JUNIOR: '3학년',
  SENIOR: '4학년',
} as const;

const EMPTY_BASEMENT_HISTORY: BasementOccupancy[] = [];

export const useMyReservationPageData = () => {
  const [today] = useState(() => getCurrentDate());
  const queryDate = formatLocalDate(today);
  const todayQuery = useTodayReservations(queryDate);
  const reservationHistoryQuery = useReservationHistory();
  const basementHistoryQuery = useBasementOccupancyHistory();
  const userInfoQuery = useMyInfo();

  const reservationHistory = useMemo(
    () =>
      reservationHistoryQuery.data?.pages.flatMap((page) => page.content) ?? [],
    [reservationHistoryQuery.data]
  );
  const basementHistory = basementHistoryQuery.data ?? EMPTY_BASEMENT_HISTORY;
  const todayReservations = useMemo(
    () =>
      mapTodayReservations(todayQuery.data ?? [], basementHistory, queryDate),
    [basementHistory, queryDate, todayQuery.data]
  );
  const histories = useMemo(
    () => mapHistoryRecords(reservationHistory, basementHistory, queryDate),
    [basementHistory, queryDate, reservationHistory]
  );
  const studentInfo = userInfoQuery.data
    ? `${GRADE_LABELS[userInfoQuery.data.grade]}/${userInfoQuery.data.studentNumber}`
    : undefined;

  return {
    queryDate,
    dateText: formatDateText(today),
    todayReservations,
    isTodayLoading: todayQuery.isPending || basementHistoryQuery.isPending,
    isTodayError: todayQuery.isError || basementHistoryQuery.isError,
    histories,
    isHistoryLoading:
      reservationHistoryQuery.isPending || basementHistoryQuery.isPending,
    hasHistoryError:
      reservationHistoryQuery.isError || basementHistoryQuery.isError,
    hasMoreHistory: reservationHistoryQuery.hasNextPage,
    isLoadingMoreHistory: reservationHistoryQuery.isFetchingNextPage,
    loadMoreHistory: reservationHistoryQuery.fetchNextPage,
    userName: userInfoQuery.data?.name,
    studentInfo,
    isUserInfoError: userInfoQuery.isError,
  };
};
