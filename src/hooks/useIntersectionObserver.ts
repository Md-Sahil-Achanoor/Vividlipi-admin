import { useCallback, useRef } from "react";

const useIntersectionObserver = (reRender: boolean, loadMore: () => void) => {
  let observer = useRef<IntersectionObserver | null>(null);
  let listRef = useCallback(
    (node: HTMLLIElement) => {
      //   if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      });
      if (node) observer.current.observe(node);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [reRender]
  );
  return { listRef };
};

export default useIntersectionObserver;
