import { useAppDispatch, useAppSelector } from '@/app/store'
import NoTableData from '@/components/atoms/NoTableData'
import TableWrapper from '@/components/elements/common/TableWrapper'
import ManageModule from '@/components/elements/modal/ManageModule'
import SkeletonTable from '@/components/elements/skeleton/SkeletonTable'
import ManageAdminUser from '@/components/module/user-management/ManageAdminUser'
import Table from '@/components/ui/Table'
import { coreAction } from '@/feature/core/coreSlice'
import {
  useDeleteAdminUserMutation,
  useGetAdminUsersQuery,
} from '@/feature/user-management/userManagementQuery'
import { userManagementAction } from '@/feature/user-management/userManagementSlice'
import PageLayout from '@/layout/PageLayout'
import { BreadCrumbItem, RolePermission, UserManagementResponse } from '@/types'
import { cn } from '@/utils/twmerge'
import { checkPermission } from '@/utils/validateSchema'
import { useEffect } from 'react'

const breadcrumbItem: BreadCrumbItem[] = [
  {
    name: 'User List',
    link: '#',
  },
]

const tableHead = ['SL', 'Name', 'Email', 'Role', 'Action']

const UserList = () => {
  const { roleDetails } = useAppSelector((state) => state.auth)
  const { type } = useAppSelector((state) => state.core)
  const { selectedUser } = useAppSelector((state) => state.userManagement)
  const dispatch = useAppDispatch()

  const [deleteAdminUser, { isLoading: isDeleteAdminUser }] =
    useDeleteAdminUserMutation()

  const { data, isLoading, refetch } = useGetAdminUsersQuery({
    query: {},
  })

  useEffect(() => {
    dispatch(userManagementAction.resetAdminUser())
    refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // console.log(`\n\n selectedSubAdminUser:`, selectedSubAdminUser);

  const handleUpdateStatus = async () => {
    await deleteAdminUser({
      id: selectedUser?.id,
      query: {
        id: selectedUser?.id,
      },
    })
  }

  const handleModal = (type?: string, data?: UserManagementResponse) => {
    if (type === 'cancelled') {
      // do nothing
      dispatch(coreAction.toggleModal({ open: false, type: '' }))
      dispatch(userManagementAction.setSelectedUser(null))
    } else if (type === 'edit') {
      dispatch(
        coreAction.toggleModal({
          type: 'manage-admin-user',
          open: true,
        }),
      )
      dispatch(
        userManagementAction.setSelectedUser({
          ...data,
        } as UserManagementResponse),
      )
    } else if (type === 'delete') {
      dispatch(
        coreAction.toggleModal({
          type: 'delete-admin-user',
          open: true,
        }),
      )
      dispatch(
        userManagementAction.setSelectedUser(data as UserManagementResponse),
      )
    } else {
      dispatch(
        coreAction.toggleModal({ open: true, type: 'manage-admin-user' }),
      )
    }
  }

  const hasAddPermission = checkPermission({
    rolePermissions: roleDetails as RolePermission,
    type: 'add',
    access: 'User_Admin_Management',
  })

  const hasEditPermission = checkPermission({
    rolePermissions: roleDetails as RolePermission,
    type: 'edit',
    access: 'User_Admin_Management',
  })

  const hasDeletePermission = checkPermission({
    rolePermissions: roleDetails as RolePermission,
    type: 'delete',
    access: 'User_Admin_Management',
  })

  return (
    <>
      {hasDeletePermission && (
        <ManageModule
          classes={
            type === 'delete-admin-user'
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
          heading={selectedUser?.name || ''}
          details='Are you certain you want to delete?'
          type='delete'
          buttonText={isDeleteAdminUser ? 'Deleting...' : 'Delete'}
          buttonProps={{
            onClick: handleUpdateStatus,
            disabled: isDeleteAdminUser,
          }}
        />
      )}
      {hasAddPermission && <ManageAdminUser />}
      <PageLayout
        title='User List'
        breadcrumbItem={breadcrumbItem}
        buttonText={hasAddPermission ? 'Add User' : ''}
        buttonProps={{
          onClick: () => handleModal(),
        }}
      >
        {/* <Card className="p-3 border-0 shadow-md"> */}
        <TableWrapper isActiveInactive={false} isSort={false}>
          <Table headList={tableHead}>
            {isLoading ? (
              <SkeletonTable total={6} tableCount={5} />
            ) : data?.data &&
              typeof data?.data === 'object' &&
              data?.data?.length > 0 ? (
              data?.data?.map((item, index) => (
                <tr className='table_tr' key={item?.id}>
                  <td className='table_td'>{index + 1}</td>
                  <td className='table_td'>{item?.name}</td>
                  <td className='table_td'>{item?.email}</td>
                  <td className='table_td'>{item?.role?.Title || 'N/A'}</td>
                  <td className='table_td'>
                    <div className='flex items-center gap-3'>
                      {hasEditPermission && (
                        <button
                          onClick={() => handleModal('edit', item)}
                          className={cn(
                            'font-medium hover:underline',
                            'text-blue-600 dark:text-blue-500',
                          )}
                        >
                          Edit
                        </button>
                      )}
                      {hasDeletePermission && (
                        <button
                          onClick={() => handleModal('delete', item)}
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
        </TableWrapper>
        {/* </Card> */}
      </PageLayout>
    </>
  )
}

export default UserList
