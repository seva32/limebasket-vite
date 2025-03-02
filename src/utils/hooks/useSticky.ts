/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useState, useRef, useCallback } from 'react';

function useSticky() {
  const [isSticky, setSticky] = useState(false);
  const element = useRef(null); // ref to the element that fires the sticky effect

  const handleScroll = useCallback(() => {
    if (element.current) {
      // @ts-ignore
      window.scrollY > element.current.getBoundingClientRect().bottom - 10
        ? setSticky(true)
        : setSticky(false);
    }
  }, []);

  // This function handle the scroll performance issue
  const debounce = useCallback((func: any, wait = 20, immediate = true) => {
    let timeOut: any;
    return () => {
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const context = this;
      // eslint-disable-next-line prefer-rest-params
      const args = arguments;
      const later = () => {
        timeOut = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeOut;
      clearTimeout(timeOut);
      timeOut = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', debounce(handleScroll));
    return () => {
      window.removeEventListener('scroll', () => handleScroll);
    };
  }, [debounce, handleScroll]);

  return { isSticky, element };
}

export default useSticky;
