import { useAppDispatch, useAppSelector } from '@/app/store'
import NoTableData from '@/components/atoms/NoTableData'
import ManageModule from '@/components/elements/modal/ManageModule'
import SkeletonTable from '@/components/elements/skeleton/SkeletonTable'
import Table from '@/components/ui/Table'
import { commentTableHead } from '@/constants/tableHeader'
import { coreAction } from '@/feature/core/coreSlice'
import {
  useDeleteCommentMutation,
  useGetCommentsQuery,
  useUpdateCommentStatusMutation,
} from '@/feature/product-comment/commentQuery'
import { commentAction } from '@/feature/product-comment/commentSlice'
import PageLayout from '@/layout/PageLayout'
import { BreadCrumbItem, CommentResponse, RolePermission } from '@/types'
import { cn } from '@/utils/twmerge'
import { checkPermission } from '@/utils/validateSchema'
import { useEffect } from 'react'

const breadcrumbItem: BreadCrumbItem[] = [
  {
    name: 'Comment List',
    link: '#',
  },
]

const ProductCommentList = () => {
  const { roleDetails } = useAppSelector((state) => state.auth)
  const { type } = useAppSelector((state) => state.core)
  const { selectedComment } = useAppSelector((state) => state.comment)
  const dispatch = useAppDispatch()
  const { data, isLoading, refetch } = useGetCommentsQuery({
    query: {},
  })

  const [deleteComment, { isLoading: isDeleteComment }] =
    useDeleteCommentMutation()

  const [approveComment, { isLoading: isApprovingComment }] =
    useUpdateCommentStatusMutation()

  useEffect(() => {
    refetch()
    return () => {
      dispatch(commentAction.resetComment())
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

  const handleDeleteComment = async () => {
    await deleteComment({
      id: selectedComment?.id,
      query: {},
    })
  }

  const handleApproveComment = async () => {
    await approveComment({
      id: selectedComment?.id,
      query: {},
    })
  }

  // const status = selectedComment?.isActive === 1 ? "Deactivate" : "Activate";

  const handleModal = (type?: string, data?: CommentResponse) => {
    if (type === 'cancelled') {
      // do nothing
      dispatch(coreAction.toggleModal({ open: false, type: '' }))
      dispatch(commentAction.setSelectedComment(null))
    } else if (type === 'delete' || type === 'update') {
      dispatch(
        coreAction.toggleModal({
          type: type === 'delete' ? 'delete-comment' : 'update-comment',
          open: true,
        }),
      )
      dispatch(commentAction.setSelectedComment(data as CommentResponse))
    } else {
      dispatch(coreAction.toggleModal({ open: true, type: 'manage-comment' }))
    }
  }

  const hasEditPermission = checkPermission({
    rolePermissions: roleDetails as RolePermission,
    type: 'edit',
    access: 'Product_Comment_Management',
  })

  const hasDeletePermission = checkPermission({
    rolePermissions: roleDetails as RolePermission,
    type: 'delete',
    access: 'Product_Comment_Management',
  })

  return (
    <>
      {hasDeletePermission && (
        <ManageModule
          classes={
            type === 'delete-comment'
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
          headText='Delete the Comment?'
          heading={selectedComment?.Bookid?.book_title || ''}
          details='Are you certain you want to delete?'
          type='delete'
          buttonText={isDeleteComment ? 'Deleting...' : 'Delete'}
          buttonProps={{
            onClick: handleDeleteComment,
            disabled: isDeleteComment,
          }}
        />
      )}

      {hasEditPermission && (
        <ManageModule
          classes={
            type === 'update-comment'
              ? {
                  top: 'visible',
                  body: `-translate-y-[0%] max-w-[400px] p-3 min-w-[400px] border-blue-500`,
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
          headText='Approve the Comment?'
          heading={selectedComment?.Bookid?.book_title || ''}
          details='Are you certain you want to approve?'
          type='update'
          buttonText='Approve'
          buttonProps={{
            onClick: handleApproveComment,
            disabled: isApprovingComment,
          }}
        />
      )}
      <PageLayout title='Comment List' breadcrumbItem={breadcrumbItem}>
        <Table headList={commentTableHead}>
          {isLoading ? (
            <SkeletonTable total={8} tableCount={6} />
          ) : data?.data &&
            typeof data?.data === 'object' &&
            data?.data?.length > 0 ? (
            data?.data?.map((item, index) => (
              <tr className='table_tr' key={item?.id}>
                <td className='table_td'>{index + 1}</td>
                <td className='table_td'>{item?.Bookid?.book_title}</td>
                <td className='table_td'>{item?.Bookid?.book_title}</td>
                <td className='table_td'>{item?.Bookid?.book_title}</td>
                <td className='table_td'>{item?.Message}</td>
                <td className='table_td'>
                  <div className='flex items-center gap-3'>
                    {hasEditPermission && (
                      <button
                        onClick={() => handleModal('update', item)}
                        className={cn(
                          'font-medium hover:underline',
                          'text-blue-600 dark:text-blue-500',
                        )}
                      >
                        Approve
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
            <NoTableData colSpan={8} parentClass='h-40'>
              <span className='font-medium'>No data found!</span>
            </NoTableData>
          )}
        </Table>
      </PageLayout>
    </>
  )
}

export default ProductCommentList
