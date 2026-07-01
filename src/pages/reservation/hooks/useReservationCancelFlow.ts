import {useEffect, useRef, useState} from 'react';
import axios from 'axios';

import type {Reservation} from '../components/TodayReservationCard';
import {useCancelReservation} from './useCancelReservation';
import {useToast} from '@/shared/components';

export const useReservationCancelFlow = (date: string) => {
  const toastTimerRef = useRef<number | null>(null);
  const {showToast} = useToast();
  const cancelMutation = useCancelReservation(date);
  const [selectedReservation, setSelectedReservation] =
    useState<Reservation | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessToastOpen, setIsSuccessToastOpen] = useState(false);

  useEffect(
    () => () => {
      if (toastTimerRef.current) {
        window.clearTimeout(toastTimerRef.current);
      }
    },
    []
  );

  const openModal = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (cancelMutation.isPending) return;

    setIsModalOpen(false);
    setSelectedReservation(null);
  };

  const confirmCancel = () => {
    if (!selectedReservation) return;

    cancelMutation.mutate(selectedReservation.id, {
      onSuccess: () => {
        setIsModalOpen(false);
        setSelectedReservation(null);
        setIsSuccessToastOpen(true);

        if (toastTimerRef.current) {
          window.clearTimeout(toastTimerRef.current);
        }
        toastTimerRef.current = window.setTimeout(() => {
          setIsSuccessToastOpen(false);
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

  return {
    isModalOpen,
    isCancelPending: cancelMutation.isPending,
    isSuccessToastOpen,
    openModal,
    closeModal,
    confirmCancel,
  };
};
