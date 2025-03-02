import { useState, useEffect } from "react";

function useMediaQuery() {
  const [isPortrait, setPortrait] = useState(false);
  const [isMobile, setMobile] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia("(max-width: 639px)");
    function handleWidthChange(mql: MediaQueryListEvent) {
      if (mql.matches) {
        setPortrait(true);
      } else {
        setPortrait(false);
      }
    }
    handleWidthChange(mediaQueryList as unknown as MediaQueryListEvent);
    mediaQueryList.addEventListener("change", handleWidthChange);

    return () => {
      mediaQueryList.removeEventListener("change", handleWidthChange);
    };
  }, []);

  useEffect(() => {
    const mediaQueryListMobile = window.matchMedia("(max-width: 767px)");
    function handleWidthChange(mql: MediaQueryListEvent) {
      if (mql.matches) {
        setMobile(true);
      } else {
        setMobile(false);
      }
    }
    handleWidthChange(mediaQueryListMobile as unknown as MediaQueryListEvent);
    mediaQueryListMobile.addEventListener("change", handleWidthChange);

    return () => {
      mediaQueryListMobile.removeEventListener("change", handleWidthChange);
    };
  }, []);

  return { isPortrait, isMobile };
}

export default useMediaQuery;
