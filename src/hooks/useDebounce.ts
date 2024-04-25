import { useEffect, useRef, useState } from "react";

type RDebounce = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  isReCall: boolean;
  reCall?: () => void;
  reRenderData?: () => void;
};

const useDebounce = (callback: () => void, delay: number): RDebounce => {
  const savedCallback = useRef<() => void>();
  const [value, setValue] = useState<string>("");
  const [timeOut, setTimeOut] = useState<number>(0);
  const [reRender, setReRender] = useState<boolean>(false);
  const [isReCall, setIsReCall] = useState<boolean>(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue(value);
  };

  const reCall = () => {
    // savedCallback.current();
    callback();
  };

  const reRenderData = () => {
    setReRender((prev) => !prev);
  };

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      reCall();
      setTimeOut(delay);
      setIsReCall(true);
    }, timeOut);
    return () => clearTimeout(delayDebounceFn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, reRender]);

  return { value, isReCall, setValue, onChange, reCall, reRenderData };
};

export default useDebounce;
