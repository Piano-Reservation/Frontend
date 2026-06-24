import IcSchedule from '@/shared/assets/svg/ic-schedule.svg';

export type HistoryStatus = "completed" | "canceled";

export interface HistoryItem {
  room: string;
  time: string;
  status: HistoryStatus;
}

export interface History {
  id: number;
  date: string;
  items: HistoryItem[];
}

interface HistoryTimelineProps {
  histories: History[];
}

const historyStatusText: Record<HistoryStatus, string> = {
  completed: "이용 완료",
  canceled: "예약 취소",
};

function HistoryTimeline({ histories }: HistoryTimelineProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white px-[18px] py-4 shadow-sm">
      {histories.length === 0 ? (
        <div className="flex min-h-[120px] flex-col items-center justify-center text-center">
          <p className="mb-2 text-[14px] font-medium text-[#818080]">
            지난 이용 기록이 없습니다
          </p>
          <p className="text-[12px] font-medium text-[#BABABA]">
            연습실을 이용하면 기록이 표시됩니다
          </p>
        </div>
      ) : (
        histories.map((history) => (
          <div key={history.id}>
            <div className="mb-2 flex items-center gap-2 text-[14px] font-bold">
              <img
                src={IcSchedule}
                alt="시계 로고"
                className="h-[17px] w-[17px]"
              />
              <strong>{history.date}</strong>
            </div>

            <div className="flex flex-col gap-1">
              {history.items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between text-[14px] font-regular text-[#737373]"
                >
                  <span>
                    {item.room} {item.time}
                  </span>

                  <span
                    className={`text-[12px] font-medium ${
                      item.status === "completed"
                        ? "text-[#6A9D26]"
                        : "text-[#818181]"
                    }`}
                  >
                    {item.status === "completed" ? "✓" : "×"}{" "}
                    {historyStatusText[item.status]}
                  </span>
                </div>
              ))}
            </div>

            <button className="mx-auto mt-3 block border-none bg-transparent text-[12px] font-medium text-[#737373]">
              + 더보기
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default HistoryTimeline;