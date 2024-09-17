import { useEffect, useRef } from "react";
type RefType<T extends HTMLElement> = React.RefObject<T>;

export const useOutsideClick = <T extends HTMLElement>(
  callback: () => void,
  ref: RefType<T>
) => {
  useEffect(() => {
    const handleClick = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [callback, ref]);

  return ref;
};
