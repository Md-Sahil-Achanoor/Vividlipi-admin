import { useAppDispatch, useAppSelector } from '@/app/store'
import NoTableData from '@/components/atoms/NoTableData'
import ManageModule from '@/components/elements/modal/ManageModule'
import SkeletonTable from '@/components/elements/skeleton/SkeletonTable'
import ManageCategory from '@/components/module/category/ManageCategory'
import Table from '@/components/ui/Table'
import { categoryTableHeader } from '@/constants/tableHeader'
import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from '@/feature/category/categoryQuery'
import { categoryAction } from '@/feature/category/categorySlice'
import { coreAction } from '@/feature/core/coreSlice'
import PageLayout from '@/layout/PageLayout'
import { BreadCrumbItem, CategoryResponse } from '@/types'
import { cn } from '@/utils/twmerge'
import { useEffect } from 'react'

const breadcrumbItem: BreadCrumbItem[] = [
  {
    name: 'Category List',
    link: '#',
  },
]

const MainCategoryList = () => {
  // const navigate = useNavigate();
  const { type } = useAppSelector((state) => state.core)
  const { selectedCategory } = useAppSelector((state) => state.category)
  const dispatch = useAppDispatch()
  const { data, isLoading, refetch } = useGetCategoriesQuery({
    query: {},
    conditions: {
      type: 'category1',
    },
  })

  const [deleteCategory, { isLoading: isDeleteCategory }] =
    useDeleteCategoryMutation()

  useEffect(() => {
    refetch()
    return () => {
      dispatch(categoryAction.resetData())
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

  const handleUpdateStatus = async () => {
    await deleteCategory({
      id: selectedCategory?.id,
      query: {},
    })
  }

  // const status = selectedCategory?.isActive === 1 ? "Deactivate" : "Activate";

  const handleModal = (type?: string, data?: CategoryResponse) => {
    if (type === 'cancelled') {
      // do nothing
      dispatch(coreAction.toggleModal({ open: false, type: '' }))
      dispatch(categoryAction.setSelectedCategory(null))
    } else if (type === 'edit') {
      dispatch(
        coreAction.toggleModal({
          type: 'manage-category',
          open: true,
        }),
      )
      dispatch(categoryAction.setSelectedCategory(data as CategoryResponse))
      // setSingleCategory;
    } else if (type === 'delete') {
      dispatch(
        coreAction.toggleModal({
          type: 'delete-category',
          open: true,
        }),
      )
      dispatch(categoryAction.setSelectedCategory(data as CategoryResponse))
    } else {
      dispatch(coreAction.toggleModal({ open: true, type: 'manage-category' }))
    }
  }

  return (
    <>
      <ManageModule
        classes={
          type === 'delete-category'
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
        headText='Delete the Category?'
        heading={selectedCategory?.title || ''}
        details='Are you certain you want to delete?'
        type='delete'
        buttonText={isDeleteCategory ? 'Deleting...' : 'Delete'}
        buttonProps={{
          onClick: handleUpdateStatus,
          disabled: isDeleteCategory,
        }}
      />
      <ManageCategory />
      <PageLayout
        title='Category List'
        breadcrumbItem={breadcrumbItem}
        buttonText='Add Category'
        buttonProps={{
          onClick: () => handleModal(),
        }}
      >
        {/* <Card className=""> */}
        {/* <TableWrapper isActiveInactive isSort={false}> */}
        <Table headList={categoryTableHeader}>
          {isLoading ? (
            <SkeletonTable total={6} tableCount={4} />
          ) : data?.data &&
            typeof data?.data === 'object' &&
            data?.data?.length > 0 ? (
            data?.data?.map((item, index) => (
              <tr className='table_tr' key={item?.id}>
                <td className='table_td'>{index + 1}</td>
                <td className='table_td'>{item?.title}</td>
                <td className='table_td'>{item?.Slug}</td>
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
        {/* </TableWrapper> */}
        {/* </Card> */}
      </PageLayout>
    </>
  )
}

export default MainCategoryList
