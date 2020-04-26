import React, {useEffect, useRef } from 'react';

interface Ref {
  current: React.ReactNode
}


export function useClickOutside(
  ref: Ref,
  onClickOutside: () => void,
  withEscape: boolean = false,
  preventDefault: boolean = false,
  stopPropagation: boolean = false,
  stopImmediatePropagation: boolean = false
): void {

  const childrenRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      const { current } = childrenRef;
      if (current && !current.contains(event.target)) {
        onClickOutside();
        if (preventDefault) event.preventDefault();
        if (stopPropagation) event.stopPropagation();
        if (stopImmediatePropagation) event.stopImmediatePropagation();
      }
    }

    function handleEscapePress(event) {
      if (event.key === 'Escape') {
        handleClickOutside(event);
      }
    }

    if (withEscape) document.addEventListener('keydown', handleEscapePress);
    document.addEventListener('click', handleClickOutside, true);
    childrenRef.current = ref.current;

    return () => {
      if (withEscape) document.removeEventListener('keydown', handleEscapePress);
      document.removeEventListener('click', handleClickOutside, true);
      childrenRef.current = null;
    };
  }, [onClickOutside, preventDefault, ref, stopImmediatePropagation, stopPropagation, withEscape]);
}

export default useClickOutside;
