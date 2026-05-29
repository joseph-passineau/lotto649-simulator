import { useCallback, useEffect, useRef, useState } from 'react';

export interface UseIntervalOutput {
  start: () => void;
  stop: () => void;
  isRunning: boolean;
}

export function useInterval(callBack: () => void, ms: number): UseIntervalOutput {
  const [running, setRunning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const callBackRef = useRef(callBack);

  useEffect(() => {
    callBackRef.current = callBack;
  }, [callBack]);

  const stop = useCallback(() => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setRunning(false);
  }, []);

  const start = useCallback(() => {
    if (timerRef.current !== null) return;
    timerRef.current = setInterval(() => callBackRef.current(), ms);
    setRunning(true);
  }, [ms]);

  useEffect(() => {
    if (running && timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = setInterval(() => callBackRef.current(), ms);
    }
  }, [ms, running]);

  useEffect(() => () => stop(), [stop]);

  return { start, stop, isRunning: running };
}
