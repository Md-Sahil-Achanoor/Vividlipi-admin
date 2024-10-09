import { useCallback, useEffect, useRef, useState } from 'react'

const useInfiniteHook = ({ isLoading, data }: any) => {
  // console.log(`extraQuery:`, extraQuery);
  const [page, setPage] = useState<number>(1)
  const [hasMore, setHasMore] = useState<boolean>(true)

  const observer = useRef<IntersectionObserver | null>(null)
  const listRef = useCallback(
    (node: HTMLLIElement) => {
      if (isLoading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((page) => page + 1)
        }
      })
      if (node) observer.current.observe(node)
    },
    [isLoading, hasMore],
  )

  useEffect(() => {
    if (data?.hasMore === false) {
      setHasMore(false)
    }
  }, [data])

  return {
    listRef,
    page,
  }
}

export default useInfiniteHook
