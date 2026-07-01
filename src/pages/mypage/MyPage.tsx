import {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router';

import IcGachon from '@/shared/assets/svg/ic-gachon.svg';
import Toast from '@/pages/reservation/components/Toast';
import {ROUTES} from '@/shared/constants/routes';
import {logout} from './api/authApi';
import {getCurrentRestriction} from './api/restrictionApi';
import type {CurrentRestriction} from './api/types/restriction';
import type {Grade, UserInfo} from './api/types/user';
import {getMyInfo} from './api/userApi';
import MyInfoCard from './components/MyInfoCard';
import MyPageMenuList from './components/MyPageMenuList';
import RestrictionStatusCard from './components/RestrictionStatusCard';

const GRADE_LABELS: Record<Grade, string> = {
  FRESHMAN: '1학년',
  SOPHOMORE: '2학년',
  JUNIOR: '3학년',
  SENIOR: '4학년',
};

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
  const location = useLocation();
  const navigate = useNavigate();
  const [isToastOpen, setIsToastOpen] = useState(() =>
    Boolean(location.state?.isPasswordChanged)
  );
  const [restrictionInfo, setRestrictionInfo] =
    useState<CurrentRestriction | null>(null);
  const [restrictionError, setRestrictionError] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [userInfoError, setUserInfoError] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState<string | null>(null);
  const studentInfo = userInfo
    ? `${GRADE_LABELS[userInfo.grade]}/${userInfo.studentNumber}`
    : '';

  const handleLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);
    setLogoutError(null);

    try {
      await logout();
      navigate(ROUTES.LOGIN, {replace: true});
    } catch (error) {
      console.error('로그아웃에 실패했습니다.', error);
      setLogoutError('로그아웃에 실패했습니다. 잠시 후 다시 시도해주세요.');
      setIsLoggingOut(false);
    }
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const currentUser = await getMyInfo();
        setUserInfo(currentUser);
      } catch (error) {
        console.error('내 정보 조회에 실패했습니다.', error);
        setUserInfoError(true);
      }
    };

    void fetchUserInfo();
  }, []);

  useEffect(() => {
    const fetchRestriction = async () => {
      try {
        const restriction = await getCurrentRestriction();
        setRestrictionInfo(restriction);
      } catch (error) {
        console.error('이용 제한 상태 조회에 실패했습니다.', error);
        setRestrictionError(true);
      }
    };

    void fetchRestriction();
  }, []);

  useEffect(() => {
    if (!location.state?.isPasswordChanged) return;

    navigate(location.pathname, {replace: true, state: null});
  }, [location.pathname, location.state, navigate]);

  useEffect(() => {
    if (!isToastOpen) return;

    const toastTimer = window.setTimeout(() => {
      setIsToastOpen(false);
    }, 2000);

    return () => window.clearTimeout(toastTimer);
  }, [isToastOpen]);

  return (
    <div className='mx-auto min-h-[calc(100dvh-72px)] w-full max-w-[430px] overflow-x-hidden bg-[var(--color-blue-25)]'>
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
            {userInfo ? (
              <>
                {userInfo.name}{' '}
                <span className='text-caption5 text-[#999999]'>
                  ({studentInfo})
                </span>
              </>
            ) : (
              <span className='text-caption5 text-[#999999]'>
                {userInfoError ? '내 정보 조회 실패' : '내 정보 확인 중...'}
              </span>
            )}
          </div>
        </header>

        <h1 className='text-title1 mb-[30px] tracking-[-0.5px]'>마이 페이지</h1>

        <section className='mb-[23px]'>
          <h2 className='text-label1 mb-3'>내 정보</h2>

          <MyInfoCard
            name={
              userInfo?.name ?? (userInfoError ? '조회 실패' : '확인 중...')
            }
            studentInfo={
              userInfo
                ? studentInfo
                : userInfoError
                  ? '내 정보를 불러오지 못했습니다.'
                  : '내 정보를 불러오고 있습니다.'
            }
          />
        </section>

        {restrictionInfo ? (
          <RestrictionStatusCard restrictionInfo={restrictionInfo} />
        ) : (
          <section className='mb-[23px] overflow-hidden rounded-[14px] border border-[var(--color-blue-100)] bg-white'>
            <div className='bg-[var(--color-blue-600)] px-[22px] py-[18px]'>
              <h2 className='text-title4 text-white'>이용 제한 상태</h2>
            </div>
            <div className='flex min-h-[105px] items-center justify-center px-[22px] py-[24px]'>
              <p className='text-label2 text-black'>
                {restrictionError
                  ? '이용 제한 상태를 불러오지 못했습니다.'
                  : '이용 제한 상태를 확인하고 있습니다.'}
              </p>
            </div>
          </section>
        )}

        <MyPageMenuList
          menuItems={menuItems}
          isLoggingOut={isLoggingOut}
          logoutError={logoutError}
          onLogout={() => void handleLogout()}
        />

        <Toast isOpen={isToastOpen} message='비밀번호가 변경되었습니다.' />
      </main>
    </div>
  );
};
