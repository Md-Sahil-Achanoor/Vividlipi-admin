import { useAppDispatch, useAppSelector } from '@/app/store'
import PlaceholderImage from '@/assets/svg/placeholder'
import PlaceholderImageLink from '@/assets/svg/placeholder.svg'
import NoTableData from '@/components/atoms/NoTableData'
import ManageModule from '@/components/elements/modal/ManageModule'
import SkeletonTable from '@/components/elements/skeleton/SkeletonTable'
import BulkUpload from '@/components/module/bulk/BulkUpload'
import Table from '@/components/ui/Table'
import { productLIstTableHead } from '@/constants/tableHeader'
import { coreAction } from '@/feature/core/coreSlice'
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from '@/feature/product/productQuery'
import { productAction } from '@/feature/product/productSlice'
import PageLayout from '@/layout/PageLayout'
import { BreadCrumbItem, RolePermission } from '@/types'
import { checkPermission } from '@/utils/validateSchema'
import { useEffect, useState } from 'react'
import { BiUpload } from 'react-icons/bi'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Link, useNavigate } from 'react-router-dom'

const breadcrumbItem: BreadCrumbItem[] = [
  {
    name: 'Product List',
    link: '#',
  },
]

const LIMIT = 10

const ProductList = () => {
  const [page, setPage] = useState(1)
  // console.log(`\n\n ~ ProductList ~ page:`, page)
  const navigate = useNavigate()
  // const { page } = useAppSelector((state) => state.core)
  const { roleDetails } = useAppSelector((state) => state.auth)
  const { reRenderBulk } = useAppSelector((state) => state.common)
  const { selectedProduct } = useAppSelector((state) => state.product)
  const { type } = useAppSelector((state) => state.core)

  const [deleteProduct, { isLoading: isDeleteProduct }] =
    useDeleteProductMutation()

  const dispatch = useAppDispatch()
  const { data, isLoading, refetch } = useGetProductsQuery({
    query: {
      page,
    },
  })

  // console.log(`\n\n ~ ProductList ~ data:`, data?.data?.data)
  useEffect(() => {
    refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reRenderBulk])

  const handleModal = (type: string) => {
    if (type === 'cancelled') {
      dispatch(coreAction.toggleModal({ type: '', open: false }))
      dispatch(productAction.setSelectedProduct(null))
    }
  }

  const handleDeleteProduct = async () => {
    await deleteProduct({
      id: selectedProduct?.id,
      query: {
        page,
      },
    })
  }

  const handleOpenModal = () => {
    dispatch(
      coreAction.toggleModal({
        type: 'bulk-upload',
        open: true,
      }),
    )
  }
  const totalPage = Math.ceil((data?.data?.total || 0) / 10) || 1
  const productList = data?.data?.data || []

  const hasAddPermission = checkPermission({
    rolePermissions: roleDetails as RolePermission,
    type: 'add',
    access: 'Product_List_Management',
  })

  const hasEditPermission = checkPermission({
    rolePermissions: roleDetails as RolePermission,
    type: 'edit',
    access: 'Product_List_Management',
  })

  const hasDeletePermission = checkPermission({
    rolePermissions: roleDetails as RolePermission,
    type: 'delete',
    access: 'Product_List_Management',
  })

  return (
    <>
      {hasAddPermission && <BulkUpload uploadType='product' />}
      {hasDeletePermission && (
        <ManageModule
          classes={
            type === 'delete-product'
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
          headText='Delete the Product?'
          heading={selectedProduct?.book_title || ''}
          details='Are you certain you want to delete?'
          type='delete'
          buttonText={isDeleteProduct ? 'Deleting...' : 'Delete'}
          buttonProps={{
            onClick: handleDeleteProduct,
            disabled: isDeleteProduct,
          }}
        />
      )}
      <PageLayout
        title='Product List'
        breadcrumbItem={breadcrumbItem}
        buttonText={hasAddPermission ? 'Add Product' : ''}
        renderElements={() =>
          hasAddPermission ? (
            <button className='button_sm_primary' onClick={handleOpenModal}>
              <BiUpload className='mr-1' />
              <span className='mr-1'>Bulk Upload</span>
            </button>
          ) : null
        }
        buttonProps={{
          onClick: () => navigate('/admin/products/product-list/add-product'),
        }}
      >
        <Table
          headList={productLIstTableHead}
          totalPage={totalPage}
          setPage={setPage}
        >
          {isLoading ? (
            <SkeletonTable total={6} tableCount={10} />
          ) : productList && productList?.length > 0 ? (
            productList?.map((item, index) => (
              <tr
                key={item?.id}
                className={`table_tr border-0 ${
                  productList?.length - 1 !== index
                    ? 'border-table-background-gray border-b'
                    : ''
                }`}
              >
                <th scope='row' className='table_td'>
                  {index + 1 + (page - 1) * LIMIT}
                </th>
                <td className='table_td'>{item?.book_title}</td>
                <td className='table_td'>
                  <div className='w-12 h-12 flex justify-center'>
                    <LazyLoadImage
                      src={(item?.thumbnail as string) || PlaceholderImageLink}
                      alt={item?.book_title}
                      placeholder={<PlaceholderImage />}
                      wrapperClassName='w-12 h-full object-contain bg-gray-100 p-[1px] rounded-sm'
                      effect='blur'
                      width='100%'
                      className='w-12 h-full object-contain'
                    />
                  </div>
                </td>
                <td className='table_td'>{item?.author?.Name || 'N/A'}</td>
                {/* <td className='table_td'>{item?.HardCopyPrice}</td> */}
                <td className='table_td'>{item?.publisher?.Name || 'N/A'}</td>
                <td className='table_td'>{item?.release_date}</td>
                <td className='table_td'>{item?.language}</td>
                <td className='table_td'>
                  <div className='flex flex-col'>
                    {item?.book_format?.map((el, index) => (
                      <span key={el} className='text-xs'>
                        {index + 1}:{' '}
                        {Number(el) == 1
                          ? 'Hard Copy'
                          : Number(el) == 2
                            ? 'Ebook'
                            : 'Audio Book'}
                        {Number(el) == 1 &&
                          ` (Price: ₹${item?.HardCopyPrice}; Stock: ${item?.Stock})`}
                        {Number(el) == 3 && ` (Price: ₹${item?.AudioPrice})`}
                        {Number(el) == 2 && ` (Price: ₹${item?.EbookPrice})`}
                      </span>
                    ))}
                  </div>
                </td>
                <td className='table_td'>
                  <div className='flex items-center gap-3'>
                    {hasEditPermission && (
                      <Link
                        className='text-blue-600 hover:underline cursor-pointer'
                        to={`/admin/products/product-list/edit-product/${item?.id}`}
                      >
                        Edit
                      </Link>
                    )}
                    {hasDeletePermission && (
                      <button
                        onClick={() => {
                          dispatch(
                            coreAction.toggleModal({
                              type: 'delete-product',
                              open: true,
                            }),
                          )
                          dispatch(productAction.setSelectedProduct(item))
                        }}
                        className='cursor-pointer text-red-600 hover:underline'
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <NoTableData colSpan={9} parentClass='h-40'>
              <span className='font-medium'>No data found!</span>
            </NoTableData>
          )}
        </Table>
      </PageLayout>
    </>
  )
}

export default ProductList
