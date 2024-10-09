import { useGetProductInfiniteQuery } from '@/feature/product/productQuery'
import useDebounce from '@/hooks/useDebounce'
import { ProductQuery } from '@/types'
import { useCallback, useMemo, useRef, useState } from 'react'

const useInfiniteProduct = () => {
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

  const {
    isFetching: productFetching,
    isLoading: productLoading,
    refetch: productRefetch,
    data: productList,
    isError: productIsError,
    error: productErrorMessage,
  } = useGetProductInfiniteQuery({
    query: query,
  })

  const totalPage = Math.ceil((productList?.data?.total || 0) / 10) || 1

  const listRef = useCallback(
    (node: HTMLLIElement) => {
      if (productFetching) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && page < totalPage) {
          setPage((page) => page + 1)
        }
      })
      if (node) observer.current.observe(node)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [productFetching, page, totalPage],
  )

  return {
    productSearchValue: value,
    productList,
    productFetching,
    productLoading,
    productIsError,
    productErrorMessage,
    setSearchValue: setValue,
    productRefetch,
    listRef,
    productOnChange: onChange,
    setOrderPage: setPage,
  }
}

export default useInfiniteProduct
