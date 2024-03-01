import { useEffect, useRef, useState } from "react";

type MutableRefObject<T> = {
  current: T;
};

type EventType = "resize" | "scroll";

const useEffectInEvent = (
  event: EventType,
  useCapture?: boolean,
  set?: () => void
) => {
  useEffect(() => {
    if (set) {
      set();
      window.addEventListener(event, set, useCapture);

      return () => window.removeEventListener(event, set, useCapture);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export const useRect = <T extends HTMLDivElement | null>(
  event: EventType = "resize"
): [DOMRect | undefined, MutableRefObject<T | null>] => {
  const ref = useRef<T>(null);
  const [rect, setRect] = useState<DOMRect>();

  const set = (): void => {
    setRect(ref.current?.getBoundingClientRect());
  };

  useEffectInEvent(event, true, set);

  return [rect, ref];
};
