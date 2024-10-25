import { useAppDispatch, useAppSelector } from '@/app/store'
import NoTableData from '@/components/atoms/NoTableData'
import ManageModule from '@/components/elements/modal/ManageModule'
import SkeletonTable from '@/components/elements/skeleton/SkeletonTable'
import ManagePublisher from '@/components/module/publisher/ManagePublisher'
import Table from '@/components/ui/Table'
import { publisherTableHead } from '@/constants/tableHeader'
import { coreAction } from '@/feature/core/coreSlice'
import {
  useDeletePublisherMutation,
  useGetPublishersQuery,
} from '@/feature/publisher/publisherQuery'
import { publisherAction } from '@/feature/publisher/publisherSlice'
import PageLayout from '@/layout/PageLayout'
import { BreadCrumbItem, PublisherResponse, RolePermission } from '@/types'
import { truncate } from '@/utils/file'
import { cn } from '@/utils/twmerge'
import { checkPermission } from '@/utils/validateSchema'
import { useEffect } from 'react'

const breadcrumbItem: BreadCrumbItem[] = [
  {
    name: 'Publisher List',
    link: '#',
  },
]

const PublisherList = () => {
  // const navigate = useNavigate();
  const { roleDetails } = useAppSelector((state) => state.auth)
  const { type } = useAppSelector((state) => state.core)
  const { selectedPublisher } = useAppSelector((state) => state.publisher)
  const dispatch = useAppDispatch()
  const { data, isLoading, refetch } = useGetPublishersQuery({
    query: {},
  })

  const [deletePublisher, { isLoading: isDeletePublisher }] =
    useDeletePublisherMutation()

  useEffect(() => {
    refetch()
    return () => {
      dispatch(publisherAction.resetPublisher())
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

  const handleDeletePublisher = async () => {
    await deletePublisher({
      id: selectedPublisher?.id,
      query: {},
    })
  }

  // const status = selectedPublisher?.isActive === 1 ? "Deactivate" : "Activate";

  const handleModal = (type?: string, data?: PublisherResponse) => {
    if (type === 'cancelled') {
      // do nothing
      dispatch(coreAction.toggleModal({ open: false, type: '' }))
      dispatch(publisherAction.setSelectedPublisher(null))
    } else if (type === 'edit') {
      dispatch(
        coreAction.toggleModal({
          type: 'manage-publisher',
          open: true,
        }),
      )
      dispatch(publisherAction.setSelectedPublisher(data as PublisherResponse))
      // setSinglePublisher;
    } else if (type === 'delete') {
      dispatch(
        coreAction.toggleModal({
          type: 'delete-publisher',
          open: true,
        }),
      )
      dispatch(publisherAction.setSelectedPublisher(data as PublisherResponse))
    } else {
      dispatch(coreAction.toggleModal({ open: true, type: 'manage-publisher' }))
    }
  }

  const hasAddPermission = checkPermission({
    rolePermissions: roleDetails as RolePermission,
    type: 'add',
    access: 'Product_Publisher_Management',
  })

  const hasEditPermission = checkPermission({
    rolePermissions: roleDetails as RolePermission,
    type: 'edit',
    access: 'Product_Publisher_Management',
  })

  const hasDeletePermission = checkPermission({
    rolePermissions: roleDetails as RolePermission,
    type: 'delete',
    access: 'Product_Publisher_Management',
  })

  return (
    <>
      {hasDeletePermission && (
        <ManageModule
          classes={
            type === 'delete-publisher'
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
          headText='Delete the Publisher?'
          heading={selectedPublisher?.Name || ''}
          details='Are you certain you want to delete?'
          type='delete'
          buttonText={isDeletePublisher ? 'Deleting...' : 'Delete'}
          buttonProps={{
            onClick: handleDeletePublisher,
            disabled: isDeletePublisher,
          }}
        />
      )}
      {hasEditPermission || (hasAddPermission && <ManagePublisher />)}
      <PageLayout
        title='Publisher List'
        breadcrumbItem={breadcrumbItem}
        buttonText='Add Publisher'
        buttonProps={{
          onClick: () => handleModal(),
        }}
      >
        <Table headList={publisherTableHead}>
          {isLoading ? (
            <SkeletonTable total={6} tableCount={5} />
          ) : data?.data &&
            typeof data?.data === 'object' &&
            data?.data?.length > 0 ? (
            data?.data?.map((item, index) => (
              <tr className='table_tr' key={item?.id}>
                <td className='table_td'>{index + 1}</td>
                <td className='table_td'>{item?.Name}</td>
                {/* <td className='table_td'>{item?.Slug}</td> */}
                <td className='table_td'>{truncate(item?.description, 20)}</td>
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
      </PageLayout>
    </>
  )
}

export default PublisherList
