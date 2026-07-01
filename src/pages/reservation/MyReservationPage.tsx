import axios from 'axios';

import UserHeader from '@/shared/components/UserHeader';
import TodayReservationCard, {
  type Reservation,
} from './components/TodayReservationCard';
import HistoryTimeline from './components/HistoryTimeline';
import Toast from './components/Toast';
import CancelConfirmModal from './components/CancelConfirmModal';
import {useMyReservationPageData} from './hooks/useMyReservationPageData';
import {useReservationCancelFlow} from './hooks/useReservationCancelFlow';
import {useExitBasementOccupancy} from './hooks/useExitBasementOccupancy';
import {useToast} from '@/shared/components';

const MyReservationPage = () => {
  const pageData = useMyReservationPageData();
  const cancelFlow = useReservationCancelFlow(pageData.queryDate);
  const exitBasementOccupancy = useExitBasementOccupancy();
  const {showToast} = useToast();

  const handleExitClick = (reservation: Reservation) => {
    if (!reservation.occupancyId) return;

    exitBasementOccupancy.mutate(reservation.occupancyId, {
      onSuccess: () => {
        showToast({
          variant: 'success',
          message: '\uD1F4\uC2E4 \uCC98\uB9AC\uB418\uC5C8\uC2B5\uB2C8\uB2E4.',
        });
      },
      onError: (error) => {
        let message =
          '\uD1F4\uC2E4 \uCC98\uB9AC\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.';

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
        <UserHeader
          name={pageData.userName}
          studentInfo={pageData.studentInfo}
          isError={pageData.isUserInfoError}
        />

        <h1 className='text-title1 mb-[30px] tracking-[-0.5px]'>
          내 예약 확인
        </h1>

        <section className='mb-[34px]'>
          <h2 className='text-label1 mb-3'>오늘의 연습실</h2>

          <TodayReservationCard
            dateText={pageData.dateText}
            reservations={pageData.todayReservations}
            isLoading={pageData.isTodayLoading}
            isError={pageData.isTodayError}
            isExitPending={exitBasementOccupancy.isPending}
            onCancelClick={cancelFlow.openModal}
            onExitClick={handleExitClick}
          />
        </section>

        <section>
          <h2 className='text-label1 mb-3'>지난 이용 기록</h2>

          <HistoryTimeline
            histories={pageData.histories}
            isLoading={pageData.isHistoryLoading}
            hasError={pageData.hasHistoryError}
            hasMore={pageData.hasMoreHistory}
            isLoadingMore={pageData.isLoadingMoreHistory}
            onLoadMore={() => void pageData.loadMoreHistory()}
          />
        </section>

        <CancelConfirmModal
          isOpen={cancelFlow.isModalOpen}
          isPending={cancelFlow.isCancelPending}
          onClose={cancelFlow.closeModal}
          onConfirm={cancelFlow.confirmCancel}
        />

        <Toast
          isOpen={cancelFlow.isSuccessToastOpen}
          message='예약이 취소되었습니다.'
        />
      </main>
    </div>
  );
};

export default MyReservationPage;
