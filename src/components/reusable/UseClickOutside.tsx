import { useEffect } from 'react';

export function UseClickOutside(ref: any, onClickOut: () => void, deps = []) {
  useEffect(() => {
    const onClick = ({ target }: any) =>
      !ref?.contains(target) && onClickOut?.();
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, deps);
}
