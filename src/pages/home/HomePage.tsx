import {useState} from 'react';
import {useNavigate} from 'react-router';

import {BottomNavigation, Header} from '@/shared/components';
import {ROUTES} from '@/shared/constants/routes';
import FloorCard from '@/pages/home/components/FloorCard';
import HomeDate from '@/pages/home/components/HomeDate';
import HomeMenu, {type HomeMenuTab} from '@/pages/home/components/HomeMenu';
import HomeNoticeSection from '@/pages/home/components/HomeNoticeSection';
import RoomCard from '@/pages/home/components/RoomCard';
import {FLOORS, ROOMS_BY_FLOOR, type FloorValue} from '@/pages/home/constants/home';

export function HomePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<HomeMenuTab>('예약하기');
  const [selectedFloor, setSelectedFloor] = useState<FloorValue | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  const handleFloorClick = (floor: FloorValue) => {
    setSelectedFloor((prev) => (prev === floor ? null : floor));
    setSelectedRoom(null);
  };

  const handleRoomClick = (room: string) => {
    setSelectedRoom(room);
    navigate(ROUTES.RESERVATION);
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
          <>
            <div className='flex flex-col gap-5'>
              <p className='text-title1 text-text-body tracking-[0.72px]'>층 선택</p>
              {FLOORS.map((floor) => (
                <FloorCard
                  key={floor}
                  floor={floor}
                  onClick={() => handleFloorClick(floor)}
                />
              ))}
            </div>
            {selectedFloor !== null && (
              <div className='flex flex-col gap-4'>
                <p className='text-title1 text-text-body tracking-[0.72px]'>호실 선택</p>
                <div className='grid grid-cols-2 gap-3'>
                  {ROOMS_BY_FLOOR[selectedFloor].map((room) => (
                    <RoomCard
                      key={room}
                      label={room}
                      isSelected={selectedRoom === room}
                      onClick={() => handleRoomClick(room)}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
        {activeTab === '유의사항' && <HomeNoticeSection />}
      </main>
      <BottomNavigation />
    </>
  );
}
