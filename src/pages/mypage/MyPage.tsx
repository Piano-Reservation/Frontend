import UserHeader from '@/shared/components/UserHeader';
import type {Grade} from './api/types/user';
import MyInfoCard from './components/MyInfoCard';
import MyPageMenuList from './components/MyPageMenuList';
import RestrictionStatusCard from './components/RestrictionStatusCard';
import {useCurrentRestriction} from './hooks/useCurrentRestriction';
import {useLogout} from './hooks/useLogout';
import {useMyInfo} from './hooks/useMyInfo';

const GRADE_LABELS: Record<Grade, string> = {
  FRESHMAN: '1학년',
  SOPHOMORE: '2학년',
  JUNIOR: '3학년',
  SENIOR: '4학년',
};

const menuItems = [
  {id: 1, label: '비밀번호 수정'},
  {id: 2, label: '신고하기'},
  {id: 3, label: '이용 약관'},
];

export const MyPage = () => {
  const userInfoQuery = useMyInfo();
  const restrictionQuery = useCurrentRestriction();
  const logoutMutation = useLogout();
  const userInfo = userInfoQuery.data;
  const studentInfo = userInfo
    ? `${GRADE_LABELS[userInfo.grade]}/${userInfo.studentNumber}`
    : undefined;

  return (
    <div className='mx-auto min-h-[calc(100dvh-72px)] w-full max-w-[430px] overflow-x-hidden bg-[var(--color-blue-25)]'>
      <main className='w-full px-[22px] pt-[20px] pb-[24px]'>
        <UserHeader
          name={userInfo?.name}
          studentInfo={studentInfo}
          isError={userInfoQuery.isError}
        />

        <h1 className='text-title1 mb-[30px] tracking-[-0.5px]'>마이 페이지</h1>

        <section className='mb-[23px]'>
          <h2 className='text-label1 mb-3'>내 정보</h2>

          <MyInfoCard
            name={
              userInfo?.name ??
              (userInfoQuery.isError ? '조회 실패' : '확인 중...')
            }
            studentInfo={
              studentInfo ??
              (userInfoQuery.isError
                ? '내 정보를 불러오지 못했습니다.'
                : '내 정보를 불러오고 있습니다.')
            }
          />
        </section>

        <RestrictionStatusCard
          restrictionInfo={restrictionQuery.data}
          isLoading={restrictionQuery.isPending}
          isError={restrictionQuery.isError}
        />

        <MyPageMenuList
          menuItems={menuItems}
          isLoggingOut={logoutMutation.isPending}
          onLogout={() => logoutMutation.mutate()}
        />
      </main>
    </div>
  );
};
