import { useAppDispatch } from '@/app/store'
import NoTableData from '@/components/atoms/NoTableData'
import TableWrapper, { Filter } from '@/components/elements/common/TableWrapper'
import InfiniteFilter from '@/components/elements/filters/InfiniteFilter'
import SkeletonTable from '@/components/elements/skeleton/SkeletonTable'
import UpdateOrderStatus from '@/components/module/order-management/UpdateOrderStatus'
import ViewOrderDetails from '@/components/module/order-management/ViewOrderDetails'
import Table from '@/components/ui/Table'
import { orderTableHead } from '@/constants/tableHeader'
import { coreAction } from '@/feature/core/coreSlice'
import {
  useGetOrdersQuery,
  useGetOrderUserQuery,
} from '@/feature/order-management/orderManagementQuery'
import { orderManagementAction } from '@/feature/order-management/orderManagementSlice'
import useDebounce from '@/hooks/useDebounce'
import PageLayout from '@/layout/PageLayout'
import {
  AssignOrderResponse,
  BreadCrumbItem,
  OrderQuery,
  OrderUpdateResponse,
  OrderUserResponse,
  ProductQuery,
} from '@/types'
import { cn } from '@/utils/twmerge'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const breadcrumbItem: BreadCrumbItem[] = [
  {
    name: 'Order List',
    link: '#',
  },
]

const getOrderStatus = (orderTrack: OrderUpdateResponse[]) => {
  if (orderTrack.length === 0) return 'Confirmed'
  return orderTrack[orderTrack.length - 1]?.Status || 'Confirmed'
}

const getStatusColor = (status: string) => {
  switch (status) {
    // case 'Confirmed':
    //   return 'text-yellow-600'
    case 'Packed':
      return 'text-blue-600'
    case 'Shipped':
      return 'text-green-600'
    case 'Completed':
      return 'text-green-600'
    case 'On Hold':
      return 'text-red-600'
    case 'Delayed':
      return 'text-red-600'
    default:
      return 'text-yellow-600'
  }
}

const OrderList = () => {
  const [page, setPage] = useState(1)
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
  const [selectedStatus, setSelectedStatus] = useState<string>('All')
  const [userType, setUserType] = useState<string>('All')
  const navigator = useNavigate()
  // const { roleDetails } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  const query = () => {
    const query: Partial<OrderQuery> = {
      page,
    }
    if (selectedStatus && selectedStatus !== 'All') {
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

  const { data, isLoading, refetch } = useGetOrdersQuery({
    query: query(),
  })
  // console.log(`\n\n ~ OrderList ~ data:`, data)

  useEffect(() => {
    dispatch(orderManagementAction.resetAll())
    refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // console.log(`\n\n selectedSubAssignOrder:`, selectedSubAssignOrder);

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
    } else if (type === 'update') {
      dispatch(
        coreAction.toggleModal({
          type: 'update-order-status',
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

  const totalPage = Math.ceil((data?.data?.total || 0) / 10) || 1
  const orderList = data?.data?.data || []

  const getName = (details?: OrderUserResponse) => {
    if (!details) return 'N/A'
    if (details?.first_name || details?.last_name) {
      return details?.first_name + ' ' + details?.last_name
    }
    if (details?.email) {
      return details?.email
    }
    return 'N/A'
  }

  // const hasAddPermission = checkPermission({
  //   rolePermissions: roleDetails as RolePermission,
  //   type: 'add',
  //   access: 'Order_Assign_Management',
  // })

  // const hasDeletePermission = checkPermission({
  //   rolePermissions: roleDetails as RolePermission,
  //   type: 'delete',
  //   access: 'Order_Assign_Management',
  // })

  return (
    <>
      <UpdateOrderStatus />
      <ViewOrderDetails />
      <PageLayout
        title='Order List'
        breadcrumbItem={breadcrumbItem}
        // buttonText='Assign Order'
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
                    { label: 'All', value: 'All' },
                    { label: 'Paid', value: 'Paid' },
                    { label: 'Failed', value: 'Failed' },
                  ]}
                  renderItem={(item) => <>{item.label}</>}
                  isActive={(item) => item.value === selectedStatus}
                  isSelected={false}
                  name={() => (
                    <div className='flex items-center gap-1'>
                      <span className='text-sm uppercase'>
                        {selectedStatus || 'Status'}
                      </span>
                    </div>
                  )}
                  handleSelectedOption={(item) => {
                    setPage(1)
                    setSelectedStatus(item?.value)
                  }}
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
                      <span className='text-sm uppercase'>
                        {userType || 'All'}
                      </span>
                    </div>
                  )}
                  handleSelectedOption={(item) => {
                    setPage(1)
                    setUserType(item?.value)
                  }}
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
                      <span className='text-sm uppercase'>
                        {selectedUser?.first_name || selectedUser?.last_name
                          ? `${selectedUser?.first_name || ''} ${selectedUser?.last_name || ''}`
                          : 'Select User'}
                      </span>
                    </div>
                  )}
                  handleSelectedOption={(item) => {
                    setPage(1)
                    setSelectedUser(item as OrderUserResponse)
                  }}
                  clearData={() => setSelectedUser(null)}
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
          <Table
            headList={orderTableHead}
            totalPage={totalPage}
            setPage={setPage}
          >
            {isLoading ? (
              <SkeletonTable total={8} tableCount={10} />
            ) : orderList &&
              typeof orderList === 'object' &&
              orderList?.length > 0 ? (
              orderList?.map((item, index) => (
                <tr className='table_tr' key={item?.id}>
                  <td className='table_td'>{index + 1}</td>
                  <td className='table_td'>
                    {item?.UserType === 1
                      ? getName(item?.['GuestDetails'] as OrderUserResponse)
                      : getName(item?.['UserDetails'] as OrderUserResponse)}
                  </td>
                  <td className='table_td'>
                    {item?.UserType === 1
                      ? item?.['GuestDetails']?.email || 'N/A'
                      : item?.['UserDetails']?.email || 'N/A'}
                  </td>
                  <td className='table_td'>
                    {item?.UserType === 1 ? 'Guest' : 'Normal'}
                  </td>
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
                  <td
                    className={cn(
                      'table_td',
                      // item?.status === '0' && 'text-yellow-600',
                      item?.status === 'Paid' && 'text-green-600',
                      (item?.status === 'Failed' || item?.status === '0') &&
                        'text-red-600',
                    )}
                  >
                    {item?.status === '0' ? 'Failed' : item?.status}
                  </td>
                  <td
                    className={cn(
                      'table_td',
                      getStatusColor(getOrderStatus(item?.OrderTrack)),
                    )}
                  >
                    {getOrderStatus(item?.OrderTrack)}
                  </td>
                  <td className='table_td'>
                    <div className='flex items-center gap-3'>
                      <button
                        onClick={() => handleModal('update', item)}
                        className={cn(
                          'font-medium hover:underline',
                          'text-blue-600 dark:text-blue-500',
                        )}
                      >
                        Update
                      </button>
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

export default OrderList
