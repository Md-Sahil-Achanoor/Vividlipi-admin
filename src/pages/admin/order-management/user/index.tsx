import { useAppDispatch, useAppSelector } from '@/app/store'
import NoTableData from '@/components/atoms/NoTableData'
import TableWrapper from '@/components/elements/common/TableWrapper'
import ManageModule from '@/components/elements/modal/ManageModule'
import SkeletonTable from '@/components/elements/skeleton/SkeletonTable'
import ManageOrderUser from '@/components/module/order-management/ManageOrderUser'
import Table from '@/components/ui/Table'
import { coreAction } from '@/feature/core/coreSlice'
import {
  useDeleteOrderUserMutation,
  useGetOrderUserQuery,
} from '@/feature/order-management/orderManagementQuery'
import { orderManagementAction } from '@/feature/order-management/orderManagementSlice'
import PageLayout from '@/layout/PageLayout'
import { BreadCrumbItem, OrderUserResponse } from '@/types'
import { cn } from '@/utils/twmerge'
import { useEffect, useState } from 'react'

const breadcrumbItem: BreadCrumbItem[] = [
  {
    name: 'User List',
    link: '#',
  },
]

const tableHead = ['SL', 'Name', 'Email', 'Role', 'Action']

const LIMIT = 10

const OrderUserList = () => {
  const [page, setPage] = useState(1)
  const { type } = useAppSelector((state) => state.core)
  const { selectedOrderUser } = useAppSelector((state) => state.orderManagement)
  const dispatch = useAppDispatch()

  const [deleteOrderUser, { isLoading: isDeleteOrderUser }] =
    useDeleteOrderUserMutation()

  const { data, isLoading, refetch } = useGetOrderUserQuery({
    query: {
      page,
    },
  })

  useEffect(() => {
    dispatch(orderManagementAction.resetOrderUser())
    refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // console.log(`\n\n selectedSubOrderUser:`, selectedSubOrderUser);

  const handleUpdateStatus = async () => {
    await deleteOrderUser({
      id: selectedOrderUser?.uid,
      query: {
        page,
      },
    })
  }

  const handleModal = (type?: string, data?: OrderUserResponse) => {
    if (type === 'cancelled') {
      // do nothing
      dispatch(coreAction.toggleModal({ open: false, type: '' }))
      dispatch(orderManagementAction.setSelectedOrderUser(null))
    } else if (type === 'edit') {
      dispatch(
        coreAction.toggleModal({
          type: 'manage-order-user',
          open: true,
        }),
      )
      dispatch(
        orderManagementAction.setSelectedOrderUser({
          ...data,
        } as OrderUserResponse),
      )
    } else if (type === 'delete') {
      dispatch(
        coreAction.toggleModal({
          type: 'delete-order-user',
          open: true,
        }),
      )
      dispatch(
        orderManagementAction.setSelectedOrderUser(data as OrderUserResponse),
      )
    } else {
      dispatch(
        coreAction.toggleModal({ open: true, type: 'manage-order-user' }),
      )
    }
  }

  const totalPage = Math.ceil((data?.data?.total || 0) / 10) || 1
  const userList = data?.data?.data || []

  return (
    <>
      <ManageModule
        classes={
          type === 'delete-order-user'
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
        headText='Delete the User?'
        heading={selectedOrderUser?.first_name || ''}
        details='Are you certain you want to delete?'
        type='delete'
        buttonText={isDeleteOrderUser ? 'Deleting...' : 'Delete'}
        buttonProps={{
          onClick: handleUpdateStatus,
          disabled: isDeleteOrderUser,
        }}
      />
      <ManageOrderUser />
      <PageLayout
        title='User List'
        breadcrumbItem={breadcrumbItem}
        buttonText='Add User'
        buttonProps={{
          onClick: () => handleModal(),
        }}
      >
        {/* <Card className="p-3 border-0 shadow-md"> */}
        <TableWrapper isActiveInactive={false} isSort={false}>
          <Table headList={tableHead} totalPage={totalPage} setPage={setPage}>
            {isLoading ? (
              <SkeletonTable total={6} tableCount={5} />
            ) : userList && userList?.length > 0 ? (
              userList?.map((item, index) => (
                <tr className='table_tr' key={item?.uid}>
                  <td className='table_td'>{index + 1 + (page - 1) * LIMIT}</td>
                  <td className='table_td'>
                    {item?.first_name + ' ' + item?.last_name}
                  </td>
                  <td className='table_td'>{item?.email}</td>
                  <td className='table_td'>
                    {item?.MobileNumber ? `+${item?.MobileNumber}` : 'N/A'}
                  </td>
                  <td className='table_td'>
                    <div className='flex items-center gap-3'>
                      <button
                        onClick={() => handleModal('edit', item)}
                        className={cn(
                          'font-medium hover:underline',
                          'text-blue-600 dark:text-blue-500',
                        )}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleModal('delete', item)}
                        className={cn(
                          'font-medium hover:underline',
                          'text-red-600 dark:text-red-500',
                        )}
                      >
                        Delete
                      </button>
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
        </TableWrapper>
        {/* </Card> */}
      </PageLayout>
    </>
  )
}

export default OrderUserList
