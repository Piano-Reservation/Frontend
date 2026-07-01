import IcSchedule from '@/shared/assets/svg/ic-schedule.svg';
import IcClose from '@/shared/assets/svg/ic-close.svg';

export type HistoryStatus =
  | 'completed'
  | 'canceled'
  | 'noShow'
  | 'active'
  | 'reserved';

export interface HistoryItem {
  id: string;
  room: string;
  time: string;
  status: HistoryStatus;
}

export interface History {
  id: string;
  date: string;
  items: HistoryItem[];
}

interface HistoryTimelineProps {
  histories: History[];
  isLoading?: boolean;
  hasError?: boolean;
  hasMore?: boolean;
  isLoadingMore?: boolean;
  onLoadMore?: () => void;
}

const historyStatusText: Record<HistoryStatus, string> = {
  completed: '이용 완료',
  canceled: '예약 취소',
  noShow: '미입실',
  active: '이용 중',
  reserved: '예약됨',
};

function HistoryTimeline({
  histories,
  isLoading = false,
  hasError = false,
  hasMore = false,
  isLoadingMore = false,
  onLoadMore,
}: HistoryTimelineProps) {
  if (isLoading) {
    return (
      <div className='flex min-h-[120px] items-center justify-center rounded-xl border border-gray-200 bg-white px-[18px] py-4 shadow-sm'>
        <p className='text-body2 text-[#818080]'>
          지난 이용 기록을 확인하고 있습니다.
        </p>
      </div>
    );
  }

  return (
    <div className='rounded-xl border border-gray-200 bg-white px-[18px] py-4 shadow-sm'>
      {hasError && (
        <p role='alert' className='text-body3 mb-3 text-[var(--color-red-600)]'>
          일부 이용 기록을 불러오지 못했습니다.
        </p>
      )}

      {histories.length === 0 ? (
        <div className='flex min-h-[120px] flex-col items-center justify-center text-center'>
          <p className='text-body2 mb-2 text-[#818080]'>
            지난 이용 기록이 없습니다
          </p>
          <p className='text-body3 text-[#BABABA]'>
            연습실을 이용하면 기록이 표시됩니다
          </p>
        </div>
      ) : (
        <div className='flex flex-col gap-4'>
          {histories.map((history) => (
            <div key={history.id}>
              <div className='text-label2 mb-2 flex items-center gap-2'>
                <img
                  src={IcSchedule}
                  alt='시계 로고'
                  className='h-[17px] w-[17px]'
                />
                <strong>{history.date}</strong>
              </div>

              <div className='flex flex-col gap-1'>
                {history.items.map((item) => (
                  <div
                    key={item.id}
                    className='text-caption4 flex items-center justify-between text-[#737373]'>
                    <span>
                      {item.room} {item.time}
                    </span>

                    <span
                      className={`text-body3 inline-flex items-center gap-[2px] ${
                        item.status === 'completed' || item.status === 'active'
                          ? 'text-[#6A9D26]'
                          : 'text-[#818181]'
                      }`}>
                      {item.status === 'completed' ? (
                        '✓'
                      ) : item.status === 'active' ? (
                        '●'
                      ) : (
                        <img
                          src={IcClose}
                          alt=''
                          className='h-[12px] w-[12px]'
                        />
                      )}{' '}
                      {historyStatusText[item.status]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {hasMore && (
        <button
          type='button'
          onClick={onLoadMore}
          disabled={isLoadingMore}
          className='text-body3 mx-auto mt-3 block border-none bg-transparent text-[#737373] disabled:opacity-60'>
          {isLoadingMore ? '불러오는 중...' : '+ 더보기'}
        </button>
      )}
    </div>
  );
}

export default HistoryTimeline;
