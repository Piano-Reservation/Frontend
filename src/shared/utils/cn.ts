const cn = (...classNames: Array<string | false | undefined | null>) =>
  classNames.filter(Boolean).join(' ');

export {cn};
