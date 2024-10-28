import { useAppDispatch, useAppSelector } from '@/app/store'
import NoTableData from '@/components/atoms/NoTableData'
import TableWrapper from '@/components/elements/common/TableWrapper'
import ManageModule from '@/components/elements/modal/ManageModule'
import SkeletonTable from '@/components/elements/skeleton/SkeletonTable'
import ViewOrderDetails from '@/components/module/order-management/ViewOrderDetails'
import Table from '@/components/ui/Table'
import { coreAction } from '@/feature/core/coreSlice'
import {
  useDeleteAssignOrderMutation,
  useGetAssignOrdersQuery,
} from '@/feature/order-management/orderManagementQuery'
import { orderManagementAction } from '@/feature/order-management/orderManagementSlice'
import PageLayout from '@/layout/PageLayout'
import { AssignOrderResponse, BreadCrumbItem, RolePermission } from '@/types'
import { cn } from '@/utils/twmerge'
import { checkPermission } from '@/utils/validateSchema'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const breadcrumbItem: BreadCrumbItem[] = [
  {
    name: 'Order List',
    link: '#',
  },
]

const tableHead = [
  'SL',
  'User Name',
  'User Email',
  'Total Purchase',
  'Total Amount',
  'Order Details',
  'Order Status',
  'Action',
]

const AssignOrderList = () => {
  const navigator = useNavigate()
  const { roleDetails } = useAppSelector((state) => state.auth)
  const { type } = useAppSelector((state) => state.core)
  const { selectedAssignOrder } = useAppSelector(
    (state) => state.orderManagement,
  )
  const dispatch = useAppDispatch()

  const [deleteAssignOrder, { isLoading: isDeleteAssignOrder }] =
    useDeleteAssignOrderMutation()

  const { data, isLoading, refetch } = useGetAssignOrdersQuery({
    query: {},
  })

  useEffect(() => {
    dispatch(orderManagementAction.resetAll())
    refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // console.log(`\n\n selectedSubAssignOrder:`, selectedSubAssignOrder);

  const handleUpdateStatus = async () => {
    await deleteAssignOrder({
      id: selectedAssignOrder?.id,
      query: {
        id: selectedAssignOrder?.id as number,
      },
    })
  }

  const handleModal = (type?: string, data?: AssignOrderResponse) => {
    if (type === 'cancelled') {
      // do nothing
      dispatch(coreAction.toggleModal({ open: false, type: '' }))
      dispatch(orderManagementAction.setSelectedAssignUser(null))
    } else if (type === 'view') {
      dispatch(
        coreAction.toggleModal({
          type: 'view-assign-order',
          open: true,
        }),
      )
      dispatch(
        orderManagementAction.setSelectedAssignUser(
          data as AssignOrderResponse,
        ),
      )
    } else if (type === 'delete') {
      dispatch(
        coreAction.toggleModal({
          type: 'delete-assign-order',
          open: true,
        }),
      )
      dispatch(
        orderManagementAction.setSelectedAssignUser(
          data as AssignOrderResponse,
        ),
      )
    }
  }

  const hasAddPermission = checkPermission({
    rolePermissions: roleDetails as RolePermission,
    type: 'add',
    access: 'Order_Assign_Management',
  })

  const hasDeletePermission = checkPermission({
    rolePermissions: roleDetails as RolePermission,
    type: 'delete',
    access: 'Order_Assign_Management',
  })

  // console.log(`\n\n hasAddPermission:`, hasAddPermission)

  return (
    <>
      <ManageModule
        classes={
          type === 'delete-assign-order'
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
        headText='Delete the Order?'
        heading={
          selectedAssignOrder?.UserDetails?.first_name &&
          selectedAssignOrder?.UserDetails?.last_name
            ? `${selectedAssignOrder?.UserDetails?.first_name} ${selectedAssignOrder?.UserDetails?.last_name}`
            : ''
        }
        details='Are you certain you want to delete?'
        type='delete'
        buttonText={isDeleteAssignOrder ? 'Deleting...' : 'Delete'}
        buttonProps={{
          onClick: handleUpdateStatus,
          disabled: isDeleteAssignOrder,
        }}
      />
      <ViewOrderDetails />
      <PageLayout
        title='Order List'
        breadcrumbItem={breadcrumbItem}
        buttonText={hasAddPermission ? 'Assign Order' : ''}
        buttonProps={{
          onClick: () =>
            navigator('/admin/order-management/assign-order-list/assign-order'),
        }}
      >
        {/* <Card className="p-3 border-0 shadow-md"> */}
        <TableWrapper isActiveInactive={false} isSort={false}>
          <Table headList={tableHead}>
            {isLoading ? (
              <SkeletonTable total={8} tableCount={8} />
            ) : data?.data &&
              typeof data?.data === 'object' &&
              data?.data?.length > 0 ? (
              data?.data?.map((item, index) => (
                <tr className='table_tr' key={item?.id}>
                  <td className='table_td'>{index + 1}</td>
                  <td className='table_td'>
                    {item?.UserDetails?.first_name}{' '}
                    {item?.UserDetails?.last_name}
                  </td>
                  <td className='table_td'>{item?.UserDetails?.email}</td>
                  <td className='table_td'>{item?.Productdatas?.length}</td>
                  <td className='table_td'>₹{item?.Total}</td>
                  <td className='table_td'>
                    <button
                      className='font-medium hover:underline text-blue-600 dark:text-blue-500'
                      type='button'
                      onClick={() => handleModal('view', item)}
                    >
                      View
                    </button>
                  </td>
                  <td className='table_td'>{item?.status}</td>
                  <td className='table_td'>
                    <div className='flex items-center gap-3'>
                      {hasDeletePermission ? (
                        <button
                          onClick={() => handleModal('delete', item)}
                          className={cn(
                            'font-medium hover:underline',
                            'text-red-600 dark:text-red-500',
                          )}
                        >
                          Delete
                        </button>
                      ) : null}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <NoTableData colSpan={8} parentClass='h-40'>
                <span className='font-medium'>No data found!</span>
              </NoTableData>
            )}
          </Table>
        </TableWrapper>
        {/* </Card> */}
      </PageLayout>
    </>
  )
}

export default AssignOrderList
