import { useEffect } from "react";

const useEscape = (onEscape: () => void) => {
  useEffect(() => {
    const handleEsc = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape" || event.key === " ") onEscape();
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onEscape]);
};

export default useEscape;
