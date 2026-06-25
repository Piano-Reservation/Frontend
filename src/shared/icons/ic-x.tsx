import type {SVGProps} from 'react';
const IcSvgX = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 20 20'
    {...props}>
    <path
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.667}
      d='M15 5 5 15M5 5l10 10'
    />
  </svg>
);
export default IcSvgX;
