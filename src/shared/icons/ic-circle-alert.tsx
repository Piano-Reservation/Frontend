import type {SVGProps} from 'react';
const IcSvgCircleAlert = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 20 20'
    {...props}>
    <g clipPath='url(#ic-circle-alert_svg__a)'>
      <path
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={1.667}
        d='M10 6.667V10m0 3.333h.008M18.333 10a8.333 8.333 0 1 1-16.667 0 8.333 8.333 0 0 1 16.667 0'
      />
    </g>
    <defs>
      <clipPath id='ic-circle-alert_svg__a'>
        <path fill='currentColor' d='M0 0h20v20H0z' />
      </clipPath>
    </defs>
  </svg>
);
export default IcSvgCircleAlert;
