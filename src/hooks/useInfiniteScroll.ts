import { useCallback, useEffect, useRef, useState } from "react";
import { ApiResponse, ListResponse } from "../types";
import axiosClient from "../utils/axios.config";
import useAsync from "./useAsync";
import { useEffectOnce } from "./useEffectOnce";

interface InfiniteScroll<T> {
  limit?: number;
  url: string;
  extraQuery?: string;
  isDisabled?: boolean;
  callBack?: (data: T[]) => void;
  isEnroll?: boolean;
}

const SIZE = 10;
const getUrl = (
  url: string,
  size: number,
  page: number,
  extraQuery: string
): string => `${url}?page=${page}&limit=${size}${extraQuery}`;

const useInfiniteScroll = <T extends object>({
  url,
  extraQuery = "",
  isDisabled = false,
  callBack,
  isEnroll,
}: InfiniteScroll<T>) => {
  // console.log(`extraQuery:`, extraQuery);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isReCall, setIsReCall] = useState<boolean>(false);
  const [rerender, setRerender] = useState<boolean>(false);
  // console.log(`\n\n ~ file: useInfiniteScroll.ts:39 ~ rerender:`, rerender);
  const [state, run, apiCall] = useAsync<ApiResponse<ListResponse<T>>>();
  const { isLoading, isError, data, errorMessage } = state;
  // console.log(`\n\n ~ file: useInfiniteScroll.ts:42 ~ data:`, data);
  const [renderData, setRenderData] = useState<T[]>([]);
  // console.log(`\n\n renderData:`, renderData);
  const [value, setValue] = useState<string>("");
  const [timeOut, setTimeOut] = useState<number>(0);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue(value);
  };

  useEffect(() => {
    setTimeOut(1000);
    const delayDebounceFn = setTimeout(() => {
      if (isReCall)
        reCallApi(`${extraQuery}${value ? `&search=${value}` : ""}`);
    }, timeOut);
    return () => clearTimeout(delayDebounceFn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    if (data?.data?.data) {
      callBack &&
        callBack(data?.data?.data?.length ? data?.data?.data : renderData);
      setRenderData((prev: T[]) => {
        if (isEnroll) {
          // check duplicate by loof
          const prevIds = prev.map((item: any) => item?.id);
          let newData: any = [...prev];
          data?.data.data.forEach((item: any) => {
            if (!prevIds.includes(item?.id)) {
              newData.push(item);
            }
          });
          return newData;
        } else {
          return [...new Set([...prev, ...data?.data.data])];
        }
      });
      if (data?.data?.data.length < SIZE) setHasMore(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.data?.data]);

  const clearData = () => setRenderData([]);

  const reCallApi = (extraQuery: string) => {
    clearData();
    // console.log(`reCallApi ~ extraQuery:`, extraQuery);
    apiCall(
      axiosClient(getUrl(url, SIZE, page, extraQuery)) as Promise<
        ApiResponse<ListResponse<T>>
      >
    );
  };

  const api = () =>
    run(
      axiosClient(getUrl(url, SIZE, page, extraQuery)) as Promise<
        ApiResponse<ListResponse<T>>
      >
    );

  const reload = () => {
    console.log("reload");
    setRerender((prev) => !prev);
  };

  useEffect(() => {
    if (hasMore && isReCall && !isDisabled) {
      api();
    }
    // setIsReCall(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, hasMore, run, rerender, isDisabled]);

  useEffectOnce(() => {
    if (hasMore && !isDisabled) {
      api();
    }
    setIsReCall(true);
  });

  let observer = useRef<IntersectionObserver | null>(null);
  let listRef = useCallback(
    (node: HTMLLIElement) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((page) => page + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  return {
    isLoading,
    hasMore,
    isError,
    renderData,
    errorMessage,
    isReCall,
    value,
    listRef,
    reload,
    reCall: reCallApi,
    clearData,
    api,
    onChange,
    setValue,
  };
};

export default useInfiniteScroll;
