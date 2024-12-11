import { useAppDispatch, useAppSelector } from '@/app/store'
import NoTableData from '@/components/atoms/NoTableData'
import FullTableSkeleton from '@/components/elements/skeleton/FullTableSkeleton'
import SkeletonTable from '@/components/elements/skeleton/SkeletonTable'
import ScreenLoader from '@/components/ui/ScreenLoader'
import Table from '@/components/ui/Table'
import { featureProductHeader } from '@/constants/tableHeader'
import { coreAction } from '@/feature/core/coreSlice'
import {
  useGetHomeNewInQuery,
  useGetHomeNewInStatusQuery,
  useToggleHomeNewInStatusMutation,
} from '@/feature/home/homeQuery'
import { homeAction } from '@/feature/home/homeSlice'
import { FeatureProductResponse, RolePermission } from '@/types'
import { cn } from '@/utils/twmerge'
import { checkPermission } from '@/utils/validateSchema'
import { useEffect } from 'react'
import ModuleHeader from '../ModuleHeader'

const FeatureNewIn = () => {
  const { roleDetails } = useAppSelector((state) => state.auth)
  const { data: newInStatus, isFetching: newInStatusLoading } =
    useGetHomeNewInStatusQuery({})

  const [toggleStatus, { isLoading: statusUpdateLoading }] =
    useToggleHomeNewInStatusMutation()

  const { data, isLoading, isFetching, refetch } = useGetHomeNewInQuery(
    {},
    // {
    //   skip: !newInStatus?.status,
    // },
  )

  useEffect(() => {
    refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  // console.log(`\n\n ~ FeatureNewIn ~ newInStatus:`, newInStatus, data);

  const dispatch = useAppDispatch()
  const handleModal = (type: string, item?: FeatureProductResponse) => {
    if (type === 'cancelled') {
      dispatch(coreAction.toggleModal({ type: '', open: false }))
      dispatch(homeAction.resetHome())
    } else if (item) {
      dispatch(
        coreAction.toggleModal({
          type,
          open: true,
        }),
      )
      dispatch(homeAction.setSelectedFeatureProduct(item))
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

  const hasEditPermission = checkPermission({
    rolePermissions: roleDetails as RolePermission,
    type: 'edit',
    access: 'CMS_Home_Management',
  })

  const hasDeletePermission = checkPermission({
    rolePermissions: roleDetails as RolePermission,
    type: 'delete',
    access: 'CMS_Home_Management',
  })

  return (
    <div>
      {statusUpdateLoading && <ScreenLoader />}
      {newInStatusLoading ? (
        <>
          <div className='flex items-center justify-between my-4'>
            <div className='bg-gray-300 h-4 w-32 rounded-xl animate-pulse duration-100' />
            <div className='bg-gray-300 h-8 w-14 rounded-xl animate-pulse duration-100' />
          </div>
          {/* table skeleton */}
          <FullTableSkeleton total={6} tableCount={6} />
        </>
      ) : (
        <ModuleHeader
          title='New In'
          isAdd={
            hasAddPermission || hasEditPermission
              ? newInStatus?.toggle === '1'
              : false
          }
          status={newInStatus?.toggle === '1'}
          isButton={hasAddPermission || hasEditPermission}
          handleModal={(type?: string) => {
            if (type === 'toggle')
              toggleStatus({
                data: { status: newInStatus?.toggle === '1' ? 0 : 1 },
              })
            else handleModal('manage-new-in')
          }}
        />
      )}
      {newInStatusLoading ? null : (
        <>
          {newInStatus?.toggle === '0' && (
            <div className='flex justify-center text-center mb-2'>
              <div>
                <p className='font-medium'>New In is disabled!</p>
                <span>
                  Latest 15 product will be displayed in "New In" section
                </span>
              </div>
            </div>
          )}
          <Table
            headList={
              newInStatus?.toggle === '0'
                ? featureProductHeader?.slice(
                    0,
                    featureProductHeader?.length - 1,
                  )
                : featureProductHeader
            }
          >
            {isLoading ||
            (data?.data && data?.data?.length > 0 && isFetching) ? (
              <SkeletonTable total={6} tableCount={7} />
            ) : data?.data && data?.data?.length > 0 ? (
              data?.data?.map((item, index) => (
                <tr className='table_tr' key={item?.id}>
                  <td className='table_td'>{index + 1}</td>
                  <td className='table_td'>
                    {item?.productDetails?.book_title}
                  </td>
                  <td className='table_td'>
                    {item?.productDetails?.author_name}
                  </td>
                  <td className='table_td'>
                    {item?.productDetails?.publisher?.Name || 'N/A'}
                  </td>
                  <td className='table_td'>
                    {item?.productDetails?.language || 'N/A'}
                  </td>
                  <td className='table_td'>{item?.position}</td>
                  {newInStatus?.toggle === '1' && (
                    <td className='table_td'>
                      <div className='flex items-center gap-3'>
                        {hasDeletePermission && (
                          <button
                            onClick={() => handleModal('delete-new-in', item)}
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
                  )}
                </tr>
              ))
            ) : (
              <NoTableData colSpan={7} parentClass='h-40'>
                <span className='font-medium'>No data found!</span>
              </NoTableData>
            )}
          </Table>
        </>
      )}
    </div>
  )
}

export default FeatureNewIn
