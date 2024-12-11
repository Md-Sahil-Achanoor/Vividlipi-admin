import { useAppDispatch, useAppSelector } from '@/app/store'
import PlaceholderImage from '@/assets/svg/placeholder'
import PlaceholderImageLink from '@/assets/svg/placeholder.svg'
import NoTableData from '@/components/atoms/NoTableData'
import InfiniteFilter from '@/components/elements/filters/InfiniteFilter'
import SkeletonTable from '@/components/elements/skeleton/SkeletonTable'
import Table from '@/components/ui/Table'
import { topTenProductHeader } from '@/constants/tableHeader'
import { coreAction } from '@/feature/core/coreSlice'
import { useGetHomeTopTenBooksQuery } from '@/feature/home/homeQuery'
import { homeAction } from '@/feature/home/homeSlice'
import { RolePermission } from '@/types'
import { cn } from '@/utils/twmerge'
import { checkPermission } from '@/utils/validateSchema'
import React, { useEffect } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import ModuleHeader from '../ModuleHeader'

export interface Filter {
  label: string
  value: string
}

const items = [
  {
    label: 'Ebooks',
    value: 'Ebooks',
  },
  {
    label: 'Print Books',
    value: 'Print Books',
  },
]

// type TopTenBookProps = {
//   data: FeatureProductResponse[];
//   isLoading: boolean;
// };

const TopTenBook = () => {
  const [category, setCategory] = React.useState('Ebooks')
  const { roleDetails } = useAppSelector((state) => state.auth)

  const { data, isLoading, isFetching, refetch } = useGetHomeTopTenBooksQuery({
    query: {
      Type: category,
    },
  })

  useEffect(() => {
    refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const dispatch = useAppDispatch()
  const handleModal = (type: string, item?: any) => {
    if (type === 'cancelled') {
      dispatch(homeAction.resetHome())
      dispatch(coreAction.toggleModal({ type: '', open: false }))
    } else if (item) {
      dispatch(
        coreAction.toggleModal({
          type,
          open: true,
        }),
      )
      dispatch(homeAction.setSelectedTopTenBooks(item))
    } else {
      dispatch(
        coreAction.toggleModal({
          type,
          open: true,
        }),
      )
    }
  }

  const hasAddPermission = checkPermission({
    rolePermissions: roleDetails as RolePermission,
    type: 'add',
    access: 'CMS_Home_Management',
  })
  // const hasEditPermission = checkPermission({
  //   rolePermissions: roleDetails as RolePermission,
  //   type: 'edit',
  //   access: 'CMS_Home_Management',
  // })
  const hasDeletePermission = checkPermission({
    rolePermissions: roleDetails as RolePermission,
    type: 'delete',
    access: 'CMS_Home_Management',
  })

  return (
    <div>
      <ModuleHeader
        title='Top Ten Books'
        isAdd={hasAddPermission ? data?.data && data?.data?.length < 9 : false}
        isButton={false}
        handleModal={() => handleModal('manage-top-ten-books')}
        customFilter={
          <div className='max-w-[150px] min-w-[150px]'>
            <InfiniteFilter<Filter>
              wrapperClass=''
              buttonClass='border p-2'
              items={items}
              renderItem={(item) => <>{item.label}</>}
              isActive={(item) => item.value === category}
              isSelected={false}
              name={() => (
                <div className='flex items-center gap-1'>
                  <span className='text-sm uppercase'>
                    {category || 'Select Type'}
                  </span>
                </div>
              )}
              handleSelectedOption={(item) => setCategory(item.value)}
            />
          </div>
        }
      />
      <Table headList={topTenProductHeader}>
        {isLoading || (data?.data && data?.data?.length > 0 && isFetching) ? (
          <SkeletonTable total={6} tableCount={5} />
        ) : data?.data && data?.data?.length > 0 ? (
          data?.data?.map((item, index) => (
            <tr className='table_tr' key={item?.Id}>
              <td className='table_td'>{index + 1}</td>
              <td className='table_td'>{item?.BookId?.book_title}</td>
              <td className='table_td'>
                {' '}
                <div className='w-12 h-12 flex justify-center'>
                  <LazyLoadImage
                    src={
                      (item?.BookId?.thumbnail as string) ||
                      PlaceholderImageLink
                    }
                    alt={item?.BookId?.book_title}
                    placeholder={<PlaceholderImage />}
                    wrapperClassName='w-12 h-full object-contain bg-gray-100 p-[1px] rounded-sm'
                    effect='blur'
                    width='100%'
                    className='w-12 h-full object-contain'
                  />
                </div>
              </td>
              <td className='table_td'>{item?.Type}</td>
              <td className='table_td'>
                <div className='flex items-center gap-3'>
                  {/* <button
                    onClick={() => handleModal("manage-top-ten-books", item)}
                    className={cn(
                      "font-medium hover:underline",
                      "text-blue-600 dark:text-blue-500"
                    )}
                  >
                    Edit
                  </button> */}
                  {hasDeletePermission && (
                    <button
                      onClick={() => handleModal('delete-top-ten-books', item)}
                      className={cn(
                        'font-medium hover:underline',
                        'text-red-600 dark:text-red-500',
                      )}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))
        ) : (
          <NoTableData colSpan={7} parentClass='h-40'>
            <span className='font-medium'>No data found!</span>
          </NoTableData>
        )}
      </Table>
    </div>
  )
}

export default TopTenBook
