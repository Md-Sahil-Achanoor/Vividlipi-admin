import { useAppDispatch, useAppSelector } from '@/app/store'
import InfiniteSelect from '@/components/form/InfiniteSelect'
import Modal from '@/components/ui/Modal'
import { useGetCategoriesQuery } from '@/feature/category/categoryQuery'
import { coreAction } from '@/feature/core/coreSlice'
import { useManageTopTenBookMutation } from '@/feature/home/homeQuery'
import { homeAction } from '@/feature/home/homeSlice'
import { useGetProductsQuery } from '@/feature/product/productQuery'
import useDebounce from '@/hooks/useDebounce'
import { ITopTenBooks, featureProductsSchema } from '@/models'
import { CategoryResponse, ProductQuery, ProductResponse } from '@/types'
import { cn } from '@/utils/twmerge'
import { Field, Form, Formik, FormikHelpers, FormikProps } from 'formik'
import { useEffect, useRef, useState } from 'react'
import { BsArrowRightShort } from 'react-icons/bs'

const initialValues: ITopTenBooks = {
  BookId: null,
  Type: null,
}

const ManageTopTenBook = () => {
  const { type, open } = useAppSelector((state) => state.core)
  const formRef = useRef<FormikProps<ITopTenBooks>>(null)
  const { selectedTopTenBooks } = useAppSelector((state) => state.home)
  const [manageTopTenBook, { isLoading }] = useManageTopTenBookMutation()
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryResponse | null>(null)
  const [searchValue, setSearchValue] = useState<string>('')
  // console.log(`\n\n ~ ManageTopTenBook ~ searchValue:`, searchValue)
  const { value, onChange } = useDebounce(() => setSearchValue(value), 1000)

  const query = () => {
    const query: Partial<ProductQuery> = {
      page: 1,
    }
    if (searchValue) {
      query.search = searchValue
    }
    if (selectedCategory) {
      query.cid = selectedCategory?.id
    }
    return query
  }

  const {
    isLoading: productLoading,
    refetch: productRefetch,
    data: productList,
    isError: productIsError,
    // error: productErrorMessage,
  } = useGetProductsQuery(
    {
      // data: {
      //   page: 1,
      // },
      query: query(),
    },
    {
      skip: !open || type !== 'manage-top-ten-books',
    },
  )
  // console.log(
  //   `\n\n ~ ManageTopTenBook ~ productList:`,
  //   productList,
  //   productErrorMessage
  // );

  const {
    isLoading: categoryLoading,
    refetch: categoryRefetch,
    data: categoryList,
    isError: categoryIsError,
    // error: categoryErrorMessage,
  } = useGetCategoriesQuery(
    {
      conditions: {
        type: 'category1',
      },
    },
    {
      skip: !open && type !== 'manage-top-ten-books',
    },
  )

  useEffect(() => {
    if (open && type === 'manage-top-ten-books') {
      productRefetch()
      categoryRefetch()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type])

  const dispatch = useAppDispatch()
  const handleModal = (type: string) => {
    if (type === 'cancelled') {
      // do nothing
      dispatch(homeAction.resetHome())
      formRef.current?.resetForm()
      dispatch(coreAction.toggleModal({ open: false, type: '' }))
    }
  }

  const onSubmit = async (
    values: ITopTenBooks,
    { setSubmitting, resetForm }: FormikHelpers<ITopTenBooks>,
  ) => {
    // console.log("values", values);
    await manageTopTenBook({
      id: selectedTopTenBooks?.Id || '',
      data: {
        BookId: values?.BookId?.id as number,
        Type: values?.Type?.title as string,
      },
      options: {
        setSubmitting,
        resetForm,
      },
    })
  }
  return (
    <Modal
      classes={
        type === 'manage-top-ten-books' && open
          ? {
              top: 'visible',
              body: `-translate-y-[0%] max-w-[500px] p-3 min-w-[500px]`,
            }
          : {
              top: 'invisible',
              body: '-translate-y-[300%] max-w-[500px] p-3 min-w-[500px]',
            }
      }
      handleModal={handleModal}
      wrapperClass='h-full'
      headText={
        selectedTopTenBooks?.Id ? 'Update Top 10 Books' : 'Create Top 10 Books'
      }
      isModalHeader
      outSideClick
    >
      <div className='w-full h-full'>
        <Formik
          initialValues={selectedTopTenBooks || initialValues}
          validationSchema={featureProductsSchema}
          onSubmit={onSubmit}
          enableReinitialize
          innerRef={formRef}
        >
          {({ isSubmitting, setFieldValue, values }) => (
            <Form noValidate>
              {/* {JSON.stringify(values?.BookId)} */}
              <div className='mt-2'>
                <div className='grid grid-cols-2 gap-2'>
                  <div className='col-span-2'>
                    <div>
                      <Field
                        label='Category'
                        name='Type'
                        isRequired
                        renderData={categoryList?.data}
                        isLoading={categoryLoading}
                        isError={categoryIsError}
                        errorMessage='Failed to fetch categories'
                        renderItem={(item: CategoryResponse) => (
                          <span className='uppercase'>{item?.title}</span>
                        )}
                        isActive={(item: CategoryResponse) =>
                          values?.Type?.id === item?.id
                        }
                        renderName={() => {
                          return (
                            <span
                              className={cn(
                                'text-sm text-gray-700 truncate',
                                values?.Type?.title && 'uppercase',
                              )}
                            >
                              {values?.Type?.title || 'Select Category'}
                            </span>
                          )
                        }}
                        onChangeCallback={(item: CategoryResponse) => {
                          setFieldValue(`Type`, item)
                          setSelectedCategory(item)
                        }}
                        clearData={() => {
                          setFieldValue(`Type`, null)
                          setSelectedCategory(null)
                        }}
                        isSelected={values?.Type !== null}
                        component={InfiniteSelect}
                        isAuth
                      />
                    </div>
                  </div>
                  <div className='col-span-2'>
                    <Field
                      label='Product'
                      name='BookId'
                      isRequired
                      renderData={productList?.data?.data || []}
                      isLoading={productLoading}
                      isError={productIsError}
                      errorMessage='Failed to fetch products'
                      renderItem={(item: ProductResponse) => (
                        <span className='uppercase'>{item?.book_title}</span>
                      )}
                      isActive={(item: ProductResponse) =>
                        values?.BookId?.id === item?.id
                      }
                      disabled={!values?.Type?.id}
                      renderName={() => {
                        return (
                          <span
                            className={cn(
                              'text-sm text-gray-700 truncate',
                              values?.BookId?.book_title && 'uppercase',
                            )}
                          >
                            {values?.BookId?.book_title || 'Select Product'}
                          </span>
                        )
                      }}
                      onChangeCallback={(item: ProductResponse) => {
                        setFieldValue(`BookId`, item)
                      }}
                      clearData={() => {
                        setFieldValue(`BookId`, null)
                      }}
                      isInsideSearch
                      searchProps={{
                        value,
                        onChange,
                        type: 'search',
                        placeholder: 'Search Product',
                      }}
                      isSelected={values?.BookId !== null}
                      component={InfiniteSelect}
                      isAuth
                    />
                  </div>
                </div>
              </div>
              {/* <div className="flex"> */}
              <button
                type='submit'
                className='button_primary'
                disabled={isSubmitting || isLoading}
              >
                {isLoading || isSubmitting ? (
                  <>
                    <span className='w-5 h-5 border-2 animate-spin rounded-full border-transparent border-t-white mr-2' />
                    <span className='font-medium'>Processing</span>
                  </>
                ) : (
                  <>
                    <span className='font-medium'>
                      {selectedTopTenBooks?.Id ? 'Update' : 'Create'}
                    </span>
                    <span className='text-2xl ml-1'>
                      <BsArrowRightShort />
                    </span>
                  </>
                )}
              </button>
              {/* </div> */}
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  )
}

export default ManageTopTenBook
