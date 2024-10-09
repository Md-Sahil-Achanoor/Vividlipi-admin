import { useGetOrderUserInfiniteQuery } from '@/feature/order-management/orderManagementQuery'
import useDebounce from '@/hooks/useDebounce'
import { ProductQuery } from '@/types'
import { useCallback, useMemo, useRef, useState } from 'react'

const useInfiniteOrderUser = () => {
  const observer = useRef<IntersectionObserver | null>(null)
  const [page, setPage] = useState(1)
  const [searchValue, setSearchValue] = useState<string | null>(null)

  const { value, onChange, setValue } = useDebounce(() => {
    setPage(1)
    setSearchValue(value ? value : null)
  }, 1000)

  const query = useMemo(() => {
    const query: Partial<ProductQuery> = {
      page: page,
    }
    if (searchValue !== null) {
      query.search = searchValue
    }
    return query
  }, [page, searchValue])

  // console.log(`\n\n ~ useInfiniteOrderUser ~ query:`, query())

  const {
    isFetching: orderUserFetching,
    isLoading: orderUserLoading,
    refetch: orderUserRefetch,
    data: orderUserList,
    isError: orderUserIsError,
    error: orderUserErrorMessage,
  } = useGetOrderUserInfiniteQuery({
    query: query,
  })

  const totalPage = Math.ceil((orderUserList?.data?.total || 0) / 10) || 1

  const listRef = useCallback(
    (node: HTMLLIElement) => {
      if (orderUserFetching) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        const isHasMore = Object.keys(orderUserList?.data || {}).includes(
          'hasMore',
        )
        if (
          entries[0].isIntersecting &&
          page < totalPage &&
          (!isHasMore ? true : orderUserList?.data.hasMore)
        ) {
          setPage((page) => page + 1)
        }
      })
      if (node) observer.current.observe(node)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [orderUserFetching, page, totalPage, orderUserList],
  )

  return {
    orderSearchValue: value,
    orderUserList,
    orderUserFetching,
    orderUserLoading,
    orderUserIsError,
    orderUserErrorMessage,
    setSearchValue: setValue,
    orderUserRefetch,
    listRef,
    orderOnChange: onChange,
    setOrderPage: setPage,
  }
}

export default useInfiniteOrderUser

// const {
//   orderSearchValue,
//   orderUserList,
//   orderUserFetching,
//   orderUserLoading,
//   orderUserIsError,
//   orderUserErrorMessage,
//   setSearchValue,
//   orderUserRefetch,
//   listRef,
//   orderOnChange,
//   setOrderPage,
// } = useInfiniteOrder()

// const {
//   productSearchValue,
//   productList,
//   productFetching,
//   productLoading,
//   productIsError,
//   productErrorMessage,
//   setSearchValue: productSerachValue,
//   productRefetch,
//   listRef: productRef,
//   productOnChange,
//   setOrderPage: setProductPage,
// } = useInfiniteProduct()
