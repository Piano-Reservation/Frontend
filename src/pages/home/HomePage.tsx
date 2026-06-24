import FloorCard from '@/pages/home/components/FloorCard';
import HomeDate from '@/pages/home/components/HomeDate';
import HomeMenu from '@/pages/home/components/HomeMenu';

export function HomePage() {
  return (
    <div>
      <HomeDate />
      <HomeMenu />
      <FloorCard floor={3} />
    </div>
  );
}
