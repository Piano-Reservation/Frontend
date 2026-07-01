import IcGachon from '@/shared/assets/svg/ic-gachon.svg';

interface UserHeaderProps {
  name?: string;
  studentInfo?: string;
  isError?: boolean;
}

function UserHeader({name, studentInfo, isError = false}: UserHeaderProps) {
  return (
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
        {name && studentInfo ? (
          <>
            {name}{' '}
            <span className='text-caption5 text-[#999999]'>
              ({studentInfo})
            </span>
          </>
        ) : (
          <span className='text-caption5 text-[#999999]'>
            {isError ? '내 정보 조회 실패' : '내 정보 확인 중...'}
          </span>
        )}
      </div>
    </header>
  );
}

export default UserHeader;
