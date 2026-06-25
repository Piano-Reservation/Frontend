import IcGachon from '@/shared/assets/svg/ic-gachon.svg';
import MyInfoCard from './components/MyInfoCard';
import MyPageMenuList from './components/MyPageMenuList';
import RestrictionStatusCard from './components/RestrictionStatusCard';

const userInfo = {
  name: '이름',
  studentInfo: '0학년/000000000',
};

const restrictionInfo = {
  status: 'restricted', // normal, restricted
  reason: '부정 예약',
  startDate: '2026.06.20',
  endDate: '2026.06.27',
  remainingDays: '7일',
} as const;

const menuItems = [
  {
    id: 1,
    label: '비밀번호 수정',
  },
  {
    id: 2,
    label: '신고하기',
  },
  {
    id: 3,
    label: '이용 약관',
  },
];

export const MyPage = () => {
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
            {userInfo.name}{' '}
            <span className='text-caption5 text-[#999999]'>
              ({userInfo.studentInfo})
            </span>
          </div>
        </header>

        <h1 className='text-title1 mb-[30px] tracking-[-0.5px]'>
          마이 페이지
        </h1>

        <section className='mb-[34px]'>
          <h2 className='text-label1 mb-3'>내 정보</h2>

          <MyInfoCard
            name={userInfo.name}
            studentInfo={userInfo.studentInfo}
          />
        </section>

        <RestrictionStatusCard restrictionInfo={restrictionInfo} />

        <MyPageMenuList menuItems={menuItems} />
      </main>
    </div>
  );
};