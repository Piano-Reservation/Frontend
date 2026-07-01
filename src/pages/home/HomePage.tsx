import {useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import {useLocation, useNavigate} from 'react-router';

import {Header} from '@/shared/components';
import {createPath} from '@/shared/constants/routes';
import {QUERY_KEYS} from '@/shared/query/query-keys';
import FloorCard from '@/pages/home/components/FloorCard';
import HomeDate from '@/pages/home/components/HomeDate';
import HomeMenu, {type HomeMenuTab} from '@/pages/home/components/HomeMenu';
import HomeNoticeSection from '@/pages/home/components/HomeNoticeSection';
import {FLOORS, type FloorValue} from '@/pages/home/constants/home';
import {getMyInfo} from '@/pages/mypage/api/userApi';
import {type Grade} from '@/pages/mypage/api/types/user';

const GRADE_LABELS: Record<Grade, number> = {
  FRESHMAN: 1,
  SOPHOMORE: 2,
  JUNIOR: 3,
  SENIOR: 4,
};

export function HomePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const initialTab =
    (location.state as {tab?: HomeMenuTab} | null)?.tab ?? '예약하기';
  const [activeTab, setActiveTab] = useState<HomeMenuTab>(initialTab);
  const {data: userInfo} = useQuery({
    queryKey: QUERY_KEYS.USER.ME,
    queryFn: getMyInfo,
  });

  const handleFloorClick = (floor: FloorValue) => {
    navigate(createPath.floorDetail(floor));
  };

  const handleFloorStatusClick = (floor: FloorValue) => {
    navigate(createPath.floorStatus(floor));
  };

  return (
    <>
      <main className='flex flex-col gap-8 p-5 pb-23'>
        <div className='flex flex-col gap-5'>
          <Header
            userName={userInfo?.name ?? ''}
            userGrade={userInfo ? GRADE_LABELS[userInfo.grade] : 0}
            studentId={userInfo?.studentNumber ?? ''}
          />
          <HomeDate />
          <HomeMenu activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
        {activeTab === '예약하기' && (
          <div className='flex flex-col gap-5'>
            {FLOORS.map((floor) => (
              <FloorCard
                key={floor}
                floor={floor}
                onClick={() => handleFloorClick(floor)}
              />
            ))}
          </div>
        )}
        {activeTab === '유의사항' && <HomeNoticeSection />}
        {activeTab === '예약 현황' && (
          <div className='flex flex-col gap-5'>
            {FLOORS.map((floor) => (
              <FloorCard
                key={floor}
                floor={floor}
                onClick={() => handleFloorStatusClick(floor)}
              />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
