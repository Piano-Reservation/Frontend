import {useState} from 'react';
import {useNavigate} from 'react-router';

import {BottomNavigation, Header} from '@/shared/components';
import {createPath} from '@/shared/constants/routes';
import FloorCard from '@/pages/home/components/FloorCard';
import HomeDate from '@/pages/home/components/HomeDate';
import HomeMenu, {type HomeMenuTab} from '@/pages/home/components/HomeMenu';
import HomeNoticeSection from '@/pages/home/components/HomeNoticeSection';
import {FLOORS, type FloorValue} from '@/pages/home/constants/home';

export function HomePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<HomeMenuTab>('예약하기');

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
          <Header userName='이름' userGrade={0} studentId='000000000' />
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
              <FloorCard key={floor} floor={floor} onClick={() => handleFloorStatusClick(floor)} />
            ))}
          </div>
        )}
      </main>
      <BottomNavigation />
    </>
  );
}
