import UserHeader from '@/shared/components/UserHeader';
import TodayReservationCard from './components/TodayReservationCard';
import HistoryTimeline from './components/HistoryTimeline';
import Toast from './components/Toast';
import CancelConfirmModal from './components/CancelConfirmModal';
import {useMyReservationPageData} from './hooks/useMyReservationPageData';
import {useReservationCancelFlow} from './hooks/useReservationCancelFlow';

const MyReservationPage = () => {
  const pageData = useMyReservationPageData();
  const cancelFlow = useReservationCancelFlow(pageData.queryDate);

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
            onCancelClick={cancelFlow.openModal}
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
