import { useAppDispatch, useAppSelector } from '@/app/store'
import NoTableData from '@/components/atoms/NoTableData'
import ManageModule from '@/components/elements/modal/ManageModule'
import SkeletonTable from '@/components/elements/skeleton/SkeletonTable'
import Table from '@/components/ui/Table'
import { couponTableHead } from '@/constants/tableHeader'
import { coreAction } from '@/feature/core/coreSlice'
import {
  useDeleteCouponMutation,
  useGetCouponsQuery,
} from '@/feature/coupon/couponQuery'
import { couponAction } from '@/feature/coupon/couponSlice'
import PageLayout from '@/layout/PageLayout'
import { BreadCrumbItem, CouponResponse } from '@/types'
import { cn } from '@/utils/twmerge'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const breadcrumbItem: BreadCrumbItem[] = [
  {
    name: 'Coupon List',
    link: '#',
  },
]

const CouponList = () => {
  const navigate = useNavigate()
  const { type } = useAppSelector((state) => state.core)
  const { selectedCoupon } = useAppSelector((state) => state.coupon)
  const dispatch = useAppDispatch()
  const { data, isLoading, refetch } = useGetCouponsQuery({
    query: {},
  })

  const [deleteCoupon, { isLoading: isDeleteCoupon }] =
    useDeleteCouponMutation()

  useEffect(() => {
    refetch()
    return () => {
      dispatch(couponAction.resetCoupon())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // const handleModal = (type: string) => {
  //   // console.log(`\n\n handleModal ~ type:`, type);
  //   if (type === "cancelled") {
  //     dispatch(coreAction.toggleModal({ type: "", open: false }));
  //     dispatch(operatorAction.setSelectedOperator(null));
  //   }
  // };

  const handleDeleteCoupon = async () => {
    await deleteCoupon({
      id: selectedCoupon?.id,
      query: {},
    })
  }

  // const status = selectedCoupon?.isActive === 1 ? "Deactivate" : "Activate";

  const handleModal = (type?: string, data?: CouponResponse) => {
    if (type === 'cancelled') {
      // do nothing
      dispatch(coreAction.toggleModal({ open: false, type: '' }))
      dispatch(couponAction.setSelectedCoupon(null))
    } else if (type === 'delete') {
      dispatch(
        coreAction.toggleModal({
          type: 'delete-coupon',
          open: true,
        }),
      )
      dispatch(couponAction.setSelectedCoupon(data as CouponResponse))
    } else {
      dispatch(coreAction.toggleModal({ open: true, type: 'manage-coupon' }))
    }
  }

  return (
    <>
      <ManageModule
        classes={
          type === 'delete-coupon'
            ? {
                top: 'visible',
                body: `-translate-y-[0%] max-w-[400px] p-3 min-w-[400px] border-red-500`,
              }
            : {
                top: 'invisible',
                body: '-translate-y-[300%] max-w-[400px] p-3 min-w-[400px]',
              }
        }
        handleModal={handleModal}
        wrapperClass='h-full'
        isModalHeader
        outSideClick
        headText='Delete the Coupon?'
        heading={selectedCoupon?.name || ''}
        details='Are you certain you want to delete?'
        type='delete'
        buttonText={isDeleteCoupon ? 'Deleting...' : 'Delete'}
        buttonProps={{
          onClick: handleDeleteCoupon,
          disabled: isDeleteCoupon,
        }}
      />
      <PageLayout
        title='Coupon List'
        breadcrumbItem={breadcrumbItem}
        buttonText='Add Coupon'
        buttonProps={{
          onClick: () => navigate('/admin/coupon/coupon-list/add-coupon'),
        }}
      >
        <Table headList={couponTableHead}>
          {isLoading ? (
            <SkeletonTable total={8} tableCount={13} />
          ) : data?.data &&
            typeof data?.data === 'object' &&
            data?.data?.length > 0 ? (
            data?.data?.map((item, index) => (
              <tr className='table_tr' key={item?.id}>
                <td className='table_td'>{index + 1}</td>
                <td className='table_td'>{item?.name}</td>
                <td className='table_td'>{item?.startDate}</td>
                <td className='table_td'>{item?.endDate}</td>
                <td className='table_td'>
                  <div className='flex items-center gap-3'>
                    <button
                      onClick={() => handleModal('delete', item)}
                      className={cn(
                        'font-medium hover:underline',
                        'text-red-600 dark:text-red-500',
                      )}
                    >
                      Delete
                    </button>
                    <Link
                      to={`/admin/coupon/coupon-list/view-coupon/${item?.id}`}
                      // onClick={() => handleModal('edit', item)}
                      className={cn(
                        'font-medium hover:underline',
                        'text-blue-600 dark:text-blue-500',
                      )}
                    >
                      View
                    </Link>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <NoTableData colSpan={13} parentClass='h-40'>
              <span className='font-medium'>No data found!</span>
            </NoTableData>
          )}
        </Table>
      </PageLayout>
    </>
  )
}

export default CouponList
