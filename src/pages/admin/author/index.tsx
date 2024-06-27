import { useAppDispatch, useAppSelector } from '@/app/store'
import PlaceholderImage from '@/assets/svg/placeholder'
import NoTableData from '@/components/atoms/NoTableData'
import ManageModule from '@/components/elements/modal/ManageModule'
import SkeletonTable from '@/components/elements/skeleton/SkeletonTable'
import ManageAuthor from '@/components/module/author/ManageAuthor'
import Table from '@/components/ui/Table'
import { authorTableHead } from '@/constants/tableHeader'
import {
  useDeleteAuthorMutation,
  useGetAuthorsQuery,
} from '@/feature/author/authorQuery'
import { authorAction } from '@/feature/author/authorSlice'
import { coreAction } from '@/feature/core/coreSlice'
import PageLayout from '@/layout/PageLayout'
import { AuthorResponse, BreadCrumbItem } from '@/types'
import { cn } from '@/utils/twmerge'
import { useEffect } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const breadcrumbItem: BreadCrumbItem[] = [
  {
    name: 'Author List',
    link: '#',
  },
]

const AuthorList = () => {
  // const navigate = useNavigate();
  const { type } = useAppSelector((state) => state.core)
  const { selectedAuthor } = useAppSelector((state) => state.author)
  const dispatch = useAppDispatch()
  const { data, isLoading, refetch } = useGetAuthorsQuery({
    query: {},
  })

  const [deleteAuthor, { isLoading: isDeleteAuthor }] =
    useDeleteAuthorMutation()

  useEffect(() => {
    refetch()
    return () => {
      dispatch(authorAction.resetAuthor())
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

  const handleDeleteAuthor = async () => {
    await deleteAuthor({
      id: selectedAuthor?.id,
      query: {},
    })
  }

  // const status = selectedAuthor?.isActive === 1 ? "Deactivate" : "Activate";

  const handleModal = (type?: string, data?: AuthorResponse) => {
    if (type === 'cancelled') {
      // do nothing
      dispatch(coreAction.toggleModal({ open: false, type: '' }))
      dispatch(authorAction.setSelectedAuthor(null))
    } else if (type === 'edit') {
      dispatch(
        coreAction.toggleModal({
          type: 'manage-author',
          open: true,
        }),
      )
      dispatch(authorAction.setSelectedAuthor(data as AuthorResponse))
      // setSingleAuthor;
    } else if (type === 'delete') {
      dispatch(
        coreAction.toggleModal({
          type: 'delete-author',
          open: true,
        }),
      )
      dispatch(authorAction.setSelectedAuthor(data as AuthorResponse))
    } else {
      dispatch(coreAction.toggleModal({ open: true, type: 'manage-author' }))
    }
  }

  return (
    <>
      <ManageModule
        classes={
          type === 'delete-author'
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
        headText='Delete the Author?'
        heading={selectedAuthor?.Name || ''}
        details='Are you certain you want to delete?'
        type='delete'
        buttonText={isDeleteAuthor ? 'Deleting...' : 'Delete'}
        buttonProps={{
          onClick: handleDeleteAuthor,
          disabled: isDeleteAuthor,
        }}
      />
      <ManageAuthor />
      <PageLayout
        title='Author List'
        breadcrumbItem={breadcrumbItem}
        buttonText='Add Author'
        buttonProps={{
          onClick: () => handleModal(),
        }}
      >
        <Table headList={authorTableHead}>
          {isLoading ? (
            <SkeletonTable total={6} tableCount={5} />
          ) : data?.data &&
            typeof data?.data === 'object' &&
            data?.data?.length > 0 ? (
            data?.data?.map((item, index) => (
              <tr className='table_tr' key={item?.id}>
                <td className='table_td'>{index + 1}</td>
                <td className='table_td'>{item?.Name}</td>
                <td className='table_td'>{item?.description}</td>
                <td className='table_td'>
                  <LazyLoadImage
                    src={item?.Pic as string}
                    alt={item?.Name}
                    placeholder={<PlaceholderImage />}
                    effect='blur'
                    width={40}
                    height={40}
                    className='w-10 h-10 object-cover rounded-full'
                  />
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
      </PageLayout>
    </>
  )
}

export default AuthorList
