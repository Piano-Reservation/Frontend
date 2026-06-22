declare module '*.svg' {
  import * as React from 'react';

  const src: string;
  export default src;

  const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {title?: string}
  >;
  export {ReactComponent};
}
