import type {CurrentRestriction} from '../api/types/restriction';

interface RestrictionStatusCardProps {
  restrictionInfo: CurrentRestriction | undefined;
  isLoading?: boolean;
  isError?: boolean;
}

function RestrictionStatusCard({
  restrictionInfo,
  isLoading = false,
  isError = false,
}: RestrictionStatusCardProps) {
  const isRestricted = restrictionInfo?.restricted ?? false;
  const formatDate = (date: string) => date.replaceAll('-', '.');

  return (
    <section className='mb-[23px] overflow-hidden rounded-[14px] border border-[var(--color-blue-100)] bg-white'>
      <div className='flex items-center justify-between bg-[var(--color-blue-600)] px-[22px] py-[18px]'>
        <h2 className='text-title4 text-white'>이용 제한 상태</h2>

        {restrictionInfo && (
          <span
            className={`text-label2 rounded-full px-[12px] py-[6px] text-white ${
              isRestricted
                ? 'bg-[var(--color-red-600)]'
                : 'bg-[var(--color-secondary)]'
            }`}>
            {isRestricted ? '제한' : '정상'}
          </span>
        )}
      </div>

      {!restrictionInfo ? (
        <div className='flex min-h-[105px] items-center justify-center px-[22px] py-[24px]'>
          <p className='text-label2 text-black'>
            {isError
              ? '이용 제한 상태를 불러오지 못했습니다.'
              : isLoading
                ? '이용 제한 상태를 확인하고 있습니다.'
                : '이용 제한 상태를 확인할 수 없습니다.'}
          </p>
        </div>
      ) : restrictionInfo.restricted ? (
        <div>
          <div className='flex items-center justify-between border-b border-[var(--color-blue-100)] px-[22px] py-[18px]'>
            <span className='text-label2 text-black'>제한 사유</span>
            <span className='text-body2 text-black'>
              {restrictionInfo.reason}
            </span>
          </div>

          <div className='flex items-center justify-between border-b border-[var(--color-blue-100)] px-[22px] py-[18px]'>
            <span className='text-label2 text-black'>제한 시작일</span>
            <span className='text-body2 text-black'>
              {formatDate(restrictionInfo.startDate)}
            </span>
          </div>

          <div className='flex items-center justify-between border-b border-[var(--color-blue-100)] px-[22px] py-[18px]'>
            <span className='text-label2 text-black'>제한 종료일</span>
            <span className='text-body2 text-black'>
              {formatDate(restrictionInfo.endDate)}
            </span>
          </div>

          <div className='flex items-center justify-between px-[22px] py-[18px]'>
            <span className='text-label2 text-black'>남은 제한 일수</span>
            <span className='text-body2 text-[var(--color-red-600)]'>
              {restrictionInfo.remainingDays}일
            </span>
          </div>
        </div>
      ) : (
        <div className='flex min-h-[105px] items-center justify-center px-[22px] py-[24px]'>
          <p className='text-label2 text-black'>현재 이용 제한이 없습니다.</p>
        </div>
      )}
    </section>
  );
}

export default RestrictionStatusCard;
