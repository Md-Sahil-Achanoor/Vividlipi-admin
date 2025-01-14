import { useAppDispatch, useAppSelector } from '@/app/store'
import NoTableData from '@/components/atoms/NoTableData'
import TableWrapper from '@/components/elements/common/TableWrapper'
import InfiniteFilter from '@/components/elements/filters/InfiniteFilter'
import ManageModule from '@/components/elements/modal/ManageModule'
import SkeletonTable from '@/components/elements/skeleton/SkeletonTable'
import ManageSubCategory from '@/components/module/category/ManageSubCategory'
import Table from '@/components/ui/Table'
import { subCategoryTableHeader } from '@/constants/tableHeader'
import {
  useDeleteSubCategoryMutation,
  useGetCategoriesQuery,
} from '@/feature/category/categoryQuery'
import { categoryAction } from '@/feature/category/categorySlice'
import { coreAction } from '@/feature/core/coreSlice'
import PageLayout from '@/layout/PageLayout'
import {
  BreadCrumbItem,
  CategoryQuery,
  CategoryResponse,
  RolePermission,
  SubCategoryResponse,
} from '@/types'
import { cn } from '@/utils/twmerge'
import { checkPermission } from '@/utils/validateSchema'
import { useEffect } from 'react'

const breadcrumbItem: BreadCrumbItem[] = [
  {
    name: 'Sub Category List',
    link: '#',
  },
]

const SubCategoryList = () => {
  const { roleDetails } = useAppSelector((state) => state.auth)
  const { type } = useAppSelector((state) => state.core)
  const { selectedCategory, selectedSubCategory } = useAppSelector(
    (state) => state.category,
  )
  const dispatch = useAppDispatch()

  const [deleteCategory, { isLoading: isDeleteCategory }] =
    useDeleteSubCategoryMutation()
  const query = () => {
    let q: Partial<CategoryQuery> = {}
    if (selectedCategory) {
      q = {
        cat1: selectedCategory.id,
      }
    }
    return q
  }
  const { data, isLoading, isFetching, refetch } = useGetCategoriesQuery({
    query: query(),
  })

  useEffect(() => {
    refetch()
    return () => {
      dispatch(categoryAction.resetData())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // console.log(`\n\n selectedSubCategory:`, selectedSubCategory);

  const handleUpdateStatus = async () => {
    await deleteCategory({
      id: selectedSubCategory?.id,
      query: {
        cat1: selectedCategory?.id,
      },
    })
  }

  const handleModal = (type?: string, data?: CategoryResponse) => {
    if (type === 'cancelled') {
      // do nothing
      dispatch(coreAction.toggleModal({ open: false, type: '' }))
      dispatch(categoryAction.setSelectedSubCategory(null))
    } else if (type === 'edit') {
      dispatch(
        coreAction.toggleModal({
          type: 'manage-sub-category',
          open: true,
        }),
      )
      dispatch(
        categoryAction.setSelectedSubCategory({
          ...data,
          category: selectedCategory,
        } as SubCategoryResponse),
      )
    } else if (type === 'delete') {
      dispatch(
        coreAction.toggleModal({
          type: 'delete-sub-category',
          open: true,
        }),
      )
      dispatch(categoryAction.setSelectedSubCategory(data as CategoryResponse))
    } else {
      dispatch(
        coreAction.toggleModal({ open: true, type: 'manage-sub-category' }),
      )
    }
  }

  const {
    isLoading: categoryLoading,
    refetch: categoryRefetch,
    data: categoryList,
    isError: categoryIsError,
    error: categoryErrorMessage,
  } = useGetCategoriesQuery({
    conditions: {
      type: 'category1',
    },
  })

  useEffect(() => {
    categoryRefetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const hasAddPermission = checkPermission({
    rolePermissions: roleDetails as RolePermission,
    type: 'add',
    access: 'Product_Sub_Category_Management',
  })

  const hasEditPermission = checkPermission({
    rolePermissions: roleDetails as RolePermission,
    type: 'edit',
    access: 'Product_Sub_Category_Management',
  })

  const hasDeletePermission = checkPermission({
    rolePermissions: roleDetails as RolePermission,
    type: 'delete',
    access: 'Product_Sub_Category_Management',
  })

  return (
    <>
      {hasDeletePermission && (
        <ManageModule
          classes={
            type === 'delete-sub-category'
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
          headText='Delete the Sub Category?'
          heading={selectedSubCategory?.title || ''}
          details='Are you certain you want to delete?'
          type='delete'
          buttonText={isDeleteCategory ? 'Deleting...' : 'Delete'}
          buttonProps={{
            onClick: handleUpdateStatus,
            disabled: isDeleteCategory,
          }}
        />
      )}
      {hasAddPermission && <ManageSubCategory />}
      <PageLayout
        title='Sub Category List'
        breadcrumbItem={breadcrumbItem}
        buttonText={hasAddPermission ? 'Add Sub Category' : ''}
        buttonProps={{
          onClick: () => handleModal(),
        }}
      >
        {/* <Card className="p-3 border-0 shadow-md"> */}
        <TableWrapper
          isActiveInactive={false}
          isSort={false}
          renderCustom={() => (
            <div className='max-w-[250px] min-w-[200px]'>
              <InfiniteFilter<CategoryResponse>
                wrapperClass=''
                buttonClass='border p-2'
                items={categoryList?.data || []}
                renderItem={(item) => <>{item.title}</>}
                isActive={(item) => item.id === selectedCategory?.id}
                isSelected={false}
                isLoading={categoryLoading}
                isError={categoryIsError}
                errorMessage={
                  (categoryErrorMessage as string) || 'Something went wrong!'
                }
                name={() => (
                  <div className='flex items-center gap-1'>
                    <span className='text-sm'>
                      {selectedCategory?.title || 'Select Category'}
                    </span>
                  </div>
                )}
                clearData={() =>
                  dispatch(categoryAction.setSelectedCategory(null))
                }
                handleSelectedOption={(item) =>
                  dispatch(categoryAction.setSelectedCategory(item))
                }
              />
            </div>
          )}
        >
          <Table headList={subCategoryTableHeader}>
            {isLoading || (selectedCategory && isFetching) ? (
              <SkeletonTable total={6} tableCount={4} />
            ) : data?.data &&
              typeof data?.data === 'object' &&
              data?.data?.length > 0 ? (
              data?.data?.map((item, index) => (
                <tr className='table_tr' key={item?.id}>
                  <td className='table_td'>{index + 1}</td>
                  <td className='table_td'>{item?.title}</td>
                  <td className='table_td'>{item?.Slug}</td>
                  {/* <td className='table_td'>{selectedCategory?.title}</td> */}
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
                <span className='font-medium'>
                  {selectedCategory
                    ? 'No data found!'
                    : 'Please select a category to display the sub category list'}
                </span>
              </NoTableData>
            )}
          </Table>
        </TableWrapper>
        {/* </Card> */}
      </PageLayout>
    </>
  )
}

export default SubCategoryList
