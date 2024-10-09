import { useAppDispatch, useAppSelector } from '@/app/store'
import NoTableData from '@/components/atoms/NoTableData'
import TableWrapper, { Filter } from '@/components/elements/common/TableWrapper'
import InfiniteFilter from '@/components/elements/filters/InfiniteFilter'
import ManageModule from '@/components/elements/modal/ManageModule'
import SkeletonTable from '@/components/elements/skeleton/SkeletonTable'
import ViewOrderDetails from '@/components/module/user-management/ViewOrderDetails'
import Table from '@/components/ui/Table'
import { coreAction } from '@/feature/core/coreSlice'
import {
  useDeleteAssignOrderMutation,
  useGetAssignOrdersQuery,
  useGetOrderUserQuery,
} from '@/feature/order-management/orderManagementQuery'
import { orderManagementAction } from '@/feature/order-management/orderManagementSlice'
import useDebounce from '@/hooks/useDebounce'
import PageLayout from '@/layout/PageLayout'
import {
  AssignOrderResponse,
  BreadCrumbItem,
  OrderQuery,
  OrderUserResponse,
  ProductQuery,
} from '@/types'
import { cn } from '@/utils/twmerge'
import { useEffect, useState } from 'react'
import { BiSort } from 'react-icons/bi'
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

const OrderList = () => {
  const [selectedUser, setSelectedUser] = useState<OrderUserResponse | null>(
    null,
  )
  const [userSearchValue, setUserSearch] = useState<string>('')
  const {
    value: userSearch,
    onChange: onUserSearch,
    setValue: setUserValue,
  } = useDebounce(() => {
    setUserSearch(userSearch)
  }, 1000)
  const [selectedStatus, setSelectedStatus] = useState<string>('')
  const [userType, setUserType] = useState<string>('All')
  const navigator = useNavigate()
  const { type } = useAppSelector((state) => state.core)
  const { selectedAssignOrder } = useAppSelector(
    (state) => state.orderManagement,
  )
  const dispatch = useAppDispatch()

  const [deleteAssignOrder, { isLoading: isDeleteAssignOrder }] =
    useDeleteAssignOrderMutation()

  const query = () => {
    const query: Partial<OrderQuery> = {}
    if (selectedStatus) {
      query.status = selectedStatus
    }
    if (selectedUser) {
      query.userId = selectedUser.uid
    }
    if (userType === 'Guest') {
      query.Type = 'Guest'
    }
    return query
  }

  const { data, isLoading, refetch } = useGetAssignOrdersQuery({
    query: query(),
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

  const userQuery = () => {
    const query: Partial<ProductQuery> = {
      page: 1,
    }
    if (userSearchValue) {
      query.search = userSearchValue
    }
    return query
  }

  const {
    isLoading: orderUserLoading,
    isFetching,
    // refetch: orderUserRefetch,
    data: orderUserList,
    isError: orderUserIsError,
    error: orderUserErrorMessage,
  } = useGetOrderUserQuery({
    query: userQuery(),
  })

  console.log(`\n\n orderUserList:`, orderUserList)

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
        buttonText='Assign Order'
        buttonProps={{
          onClick: () =>
            navigator('/admin/order-management/assign-order-list/assign-order'),
        }}
      >
        {/* <Card className="p-3 border-0 shadow-md"> */}
        <TableWrapper
          isActiveInactive={false}
          isSort={false}
          renderCustom={() => (
            <>
              <div className='max-w-[150px] min-w-[150px]'>
                <InfiniteFilter<Filter>
                  wrapperClass=''
                  buttonClass='border p-2'
                  items={[
                    { label: 'Paid', value: 'Paid' },
                    { label: 'Failed', value: 'Failed' },
                  ]}
                  renderItem={(item) => <>{item.label}</>}
                  isActive={(item) => item.value === selectedStatus}
                  isSelected={false}
                  name={() => (
                    <div className='flex items-center gap-1'>
                      <BiSort />
                      <span className='text-sm uppercase'>
                        {selectedStatus || 'Status'}
                      </span>
                    </div>
                  )}
                  handleSelectedOption={(item) =>
                    setSelectedStatus(item?.value)
                  }
                />
              </div>
              <div className='max-w-[150px] min-w-[150px]'>
                <InfiniteFilter<Filter>
                  wrapperClass=''
                  buttonClass='border p-2'
                  items={[
                    { label: 'All', value: 'All' },
                    { label: 'Guest', value: 'Guest' },
                  ]}
                  renderItem={(item) => <>{item.label}</>}
                  isActive={(item) => item.value === userType}
                  isSelected={false}
                  name={() => (
                    <div className='flex items-center gap-1'>
                      <BiSort />
                      <span className='text-sm uppercase'>
                        {userType || 'All'}
                      </span>
                    </div>
                  )}
                  handleSelectedOption={(item) => setUserType(item?.value)}
                />
              </div>
              <div className='max-w-[250px] min-w-[250px]'>
                <InfiniteFilter<OrderUserResponse>
                  wrapperClass=''
                  buttonClass='border p-2'
                  items={orderUserList?.data?.data as OrderUserResponse[]}
                  isLoading={isFetching || orderUserLoading}
                  isError={
                    typeof orderUserIsError === 'string'
                      ? orderUserIsError
                      : false
                  }
                  errorMessage={
                    typeof orderUserErrorMessage === 'string'
                      ? orderUserErrorMessage
                      : 'Failed to load product'
                  }
                  renderItem={(item) => (
                    <>
                      {item?.first_name || item?.last_name
                        ? `${item?.first_name} ${item?.last_name}`
                        : item?.email}
                    </>
                  )}
                  isActive={(item) => item?.uid === selectedUser?.uid}
                  isSelected={selectedUser !== null}
                  name={() => (
                    <div className='flex items-center gap-1'>
                      <BiSort />
                      <span className='text-sm uppercase'>
                        {userType ?? 'Select User'}
                      </span>
                    </div>
                  )}
                  handleSelectedOption={(item) =>
                    setSelectedUser(item as OrderUserResponse)
                  }
                  isInsideSearch
                  searchProps={{
                    value: userSearch,
                    onChange: onUserSearch,
                    placeholder: 'Search User',
                  }}
                  onCloseCallback={() => {
                    setUserValue('')
                  }}
                />
              </div>
            </>
          )}
        >
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
                      className='button_sm_primary'
                      type='button'
                      onClick={() => handleModal('view', item)}
                    >
                      View
                    </button>
                  </td>
                  <td className='table_td'>{item?.status}</td>
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

export default OrderList
