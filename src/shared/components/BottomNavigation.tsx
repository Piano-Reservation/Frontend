import type {ComponentType, SVGProps} from 'react';
import {NavLink, useLocation} from 'react-router';

import {ROUTES} from '@/shared/constants/routes';
import {
  IcSvgBell,
  IcSvgCalendarCheck,
  IcSvgHouse,
  IcSvgUser,
} from '@/shared/icons';

type NavigationItem = {
  label: string;
  path: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  isActive: (pathname: string) => boolean;
};

const navigationItems: NavigationItem[] = [
  {
    label: '홈',
    path: ROUTES.HOME,
    icon: IcSvgHouse,
    isActive: (pathname) => pathname === ROUTES.HOME,
  },
  {
    label: '공지사항',
    path: ROUTES.ANNOUNCEMENT,
    icon: IcSvgBell,
    isActive: (pathname) => pathname === ROUTES.ANNOUNCEMENT,
  },
  {
    label: '내 예약 확인',
    path: ROUTES.RESERVATION,
    icon: IcSvgCalendarCheck,
    isActive: (pathname) => pathname.startsWith(ROUTES.RESERVATION),
  },
  {
    label: '마이페이지',
    path: ROUTES.MY_PAGE,
    icon: IcSvgUser,
    isActive: (pathname) => pathname === ROUTES.MY_PAGE,
  },
];

const BottomNavigation = () => {
  const {pathname} = useLocation();

  return (
    <nav
      aria-label='하단 내비게이션'
      className='border-border-default bg-bg-surface fixed right-0 bottom-0 left-0 z-50 mx-auto grid h-[72px] max-w-[430px] min-w-[375px] grid-cols-4 items-start border-t shadow-[0_-4px_18px_rgba(12,45,82,0.06)]'>
      {navigationItems.map(({label, path, icon: Icon, isActive}) => {
        const active = isActive(pathname);

        return (
          <NavLink
            key={path}
            to={path}
            aria-label={label}
            className={[
              'flex h-full min-w-0 flex-col items-center justify-center gap-[4px] transition-colors',
              active ? 'text-action-primary font-semibold' : 'text-text-muted',
            ].join(' ')}>
            <Icon className='h-[20px] w-[20px] shrink-0' aria-hidden='true' />
            <span className='text-button3'>{label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
};

export default BottomNavigation;
