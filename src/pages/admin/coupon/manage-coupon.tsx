import { useAppDispatch, useAppSelector } from '@/app/store'
import Loader from '@/components/atoms/Loader'
import MultiSelectItem from '@/components/atoms/MultiSelectItem'
import CustomInput from '@/components/form/CustomInput'
import InfiniteSelect from '@/components/form/InfiniteSelect'
import InputSelect from '@/components/form/InputSelect'
import { Card } from '@/components/ui/Card'
import { useGetAuthorsByCategory1Query } from '@/feature/author/authorQuery'
import {
  useGetCategoriesQuery,
  useGetSubCategoryByCategoryIdsQuery,
} from '@/feature/category/categoryQuery'
import {
  useGetCouponByIdQuery,
  useManageCouponMutation,
} from '@/feature/coupon/couponQuery'
import { couponAction } from '@/feature/coupon/couponSlice'
import { useGetProductByCategory1Query } from '@/feature/product/productQuery'
import { usePublisherByCat1Query } from '@/feature/publisher/publisherQuery'
import useDebounce from '@/hooks/useDebounce'
import PageLayout from '@/layout/PageLayout'
import { couponSchema } from '@/models'
import {
  AuthorResponse,
  BreadCrumbItem,
  CategoryQuery,
  CategoryResponse,
  Coupon,
  CouponPayload,
  ProductQuery,
  ProductResponse,
  PublisherResponse,
} from '@/types'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { BsArrowRightShort } from 'react-icons/bs'
import { useNavigate, useParams } from 'react-router-dom'

const initialValues: Coupon = {
  coupon_name: '',
  start_date: '',
  end_date: '',
  discount_type: 'PERCENTAGE',
  discount_value: '',
  minimum_cart_value: 0,
  category_1: [],
  category_2: [],
  product_ids: [],
  publisher_ids: [],
  author_ids: [],
}

const ManageCoupon = () => {
  const { id } = useParams()
  const router = useNavigate()
  const dispatch = useAppDispatch()
  // const [values] = useState<Coupon | null>(null)
  // const [category1, setCategory1] = useState<CategoryResponse[]>([])
  const [search, setSearch] = useState<string>('')
  const [subCategorySearch, setSubCategorySearch] = useState<string>('')
  const [publisherSearch, setPublisherSearch] = useState<string>('')
  const [authorSearch, setAuthorSearch] = useState<string>('')
  const { value, onChange } = useDebounce(() => setSearch(value), 1000)
  // const { value: value1, onChange: onChange1 } = useDebounce(
  //   () => setSearch(value1),
  //   1000,
  // )
  const { selectedCoupon, selectedCategories } = useAppSelector(
    (state) => state.coupon,
  )
  // console.log(`\n\n ~ ManageCoupon ~ selectedCoupon:`, selectedCoupon)
  // const [category2, setCategory2] = useState<CategoryResponse | null>(null)
  const breadcrumbItem: BreadCrumbItem[] = [
    {
      name: 'Coupon List',
      link: '/admin/coupon/coupon-list',
    },
    {
      name: id ? 'Edit Coupon' : 'Create Coupon',
      link: '#',
    },
  ]

  const { isLoading: loading, refetch } = useGetCouponByIdQuery(
    { query: { id } },
    { skip: !id },
  )

  const [manageCoupon, { isLoading }] = useManageCouponMutation()

  const onSubmit = (
    values: Coupon,
    { setSubmitting, resetForm }: FormikHelpers<Coupon>,
  ) => {
    // console.log(values)
    // return setSubmitting(false)
    let query: Partial<CategoryQuery> = {}
    if (!id) {
      query = {
        id,
      }
    }
    const {
      category_1,
      category_2,
      product_ids,
      publisher_ids,
      author_ids,
      ...rest
    } = values
    const body: CouponPayload = {
      ...rest,
      category_1: category_1?.map((cat) => String(cat?.id)) || [],
      category_2: category_2?.map((cat) => String(cat?.id)) || [],
      product_ids: product_ids?.map((cat) => String(cat?.id)) || [],
      publisher_ids: publisher_ids?.map((cat) => String(cat?.id)) || [],
      author_ids: author_ids?.map((cat) => String(cat?.id)) || [],
    }
    manageCoupon({
      data: body,
      options: { router, setSubmitting, resetForm },
      query,
      id,
    })
  }

  const {
    isLoading: categoryLoading,
    refetch: categoryRefetch,
    data: categoryList,
    isError: categoryIsError,
    // error: categoryErrorMessage,
  } = useGetCategoriesQuery({
    conditions: {
      type: 'category1',
    },
  })

  const {
    isLoading: category2Loading,
    // refetch: category2Refetch,
    data: category2List,
    isError: category2IsError,
    // error: categoryErrorMessage,
  } = useGetSubCategoryByCategoryIdsQuery(
    {
      query: {
        cid: JSON.stringify(selectedCategories?.map((cat) => String(cat?.id))),
      },
    },
    {
      skip: !selectedCategories?.length,
    },
  )

  const {
    isLoading: authorLoading,
    // refetch: authorRefetch,
    data: authorList,
    isError: authorIsError,
    // error: categoryErrorMessage,
  } = useGetAuthorsByCategory1Query(
    {
      query: {
        cid: JSON.stringify(selectedCategories?.map((cat) => String(cat?.id))),
      },
    },
    {
      skip: !selectedCategories?.length,
    },
  )

  const {
    isLoading: publisherLoading,
    // refetch: publisherRefetch,
    data: publisherList,
    isError: publisherIsError,
    // error: categoryErrorMessage,
  } = usePublisherByCat1Query(
    {
      query: {
        cid: JSON.stringify(selectedCategories?.map((cat) => String(cat?.id))),
      },
    },
    {
      skip: !selectedCategories?.length,
    },
  )

  const getProductQuery = () => {
    const query: Partial<ProductQuery> = {
      cid: JSON.stringify(selectedCategories?.map((cat) => String(cat?.id))),
    }
    if (search) {
      query.search = search
    }
    return query
  }

  const {
    isLoading: productLoading,
    // refetch: productRefetch,
    data: productList,
    isError: productIsError,
    // error: categoryErrorMessage,
  } = useGetProductByCategory1Query(
    {
      query: getProductQuery(),
    },
    {
      skip: !selectedCategories?.length,
    },
  )

  // console.log(
  //   `\n\n ~ ManageCoupon ~ String(category1?.map((cat) => cat?.id)):`,
  //   JSON.stringify(category1?.map((cat) => String(cat?.id))),
  // )

  useEffect(() => {
    categoryRefetch()
  }, [categoryRefetch])

  useEffect(() => {
    if (id) {
      refetch()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const filterSubCategoryData = useMemo(() => {
    if (subCategorySearch) {
      return category2List?.data?.filter((item) =>
        item?.title?.toLowerCase().includes(subCategorySearch.toLowerCase()),
      )
    }
    return category2List?.data
  }, [subCategorySearch, category2List?.data])

  const filterAuthorData = useMemo(() => {
    if (authorSearch) {
      return authorList?.data?.filter((item) =>
        item?.Name?.toLowerCase().includes(authorSearch.toLowerCase()),
      )
    }
    return authorList?.data
  }, [authorSearch, authorList?.data])

  const filterPublisherData = useMemo(() => {
    if (publisherSearch) {
      return publisherList?.data?.filter((item) =>
        item?.Name?.toLowerCase().includes(publisherSearch.toLowerCase()),
      )
    }
    return publisherList?.data
  }, [publisherSearch, publisherList?.data])

  return (
    <PageLayout
      title={id ? 'Edit Coupon' : 'Create Coupon'}
      breadcrumbItem={breadcrumbItem}
    >
      <Card className='border rounded-md'>
        <div className='max-w-screen-lg mx-auto'>
          {/* <h3 className="text-center text-2xl font-semibold text-pink-500">
            Create Coupon
          </h3> */}
          {id && loading ? (
            <Loader />
          ) : (
            <div>
              <Formik
                initialValues={selectedCoupon || initialValues}
                validationSchema={couponSchema}
                onSubmit={onSubmit}
                enableReinitialize
              >
                {({ isSubmitting, values, setFieldValue }) => (
                  <Form>
                    {/* {console.log(values)} */}
                    <div className='mt-5 grid grid-cols-2 gap-x-3'>
                      <Field
                        name='coupon_name'
                        label='Coupon Name'
                        component={CustomInput}
                        placeholder='Enter Name'
                        isRequired
                      />

                      <Field
                        name='discount_type'
                        label='Discount Type'
                        component={InputSelect}
                        items={[
                          { name: 'Percentage', value: 'PERCENTAGE' },
                          { name: 'Amount', value: 'VALUE' },
                        ]}
                        isRequired
                      />

                      <Field
                        name='discount_value'
                        label={
                          values?.discount_type === 'PERCENTAGE'
                            ? 'Discount Percentage'
                            : 'Discount Value'
                        }
                        component={CustomInput}
                        placeholder={
                          values?.discount_type === 'PERCENTAGE'
                            ? 'Enter Discount Percentage (1-100)%'
                            : 'Enter Discount Value'
                        }
                        type='number'
                        isRequired
                      />

                      <Field
                        name='minimum_cart_value'
                        label='Minimum Cart Value'
                        component={CustomInput}
                        placeholder='Enter Minimum Cart Value'
                        type='number'
                        isRequired
                      />

                      <Field
                        name='start_date'
                        label='Start Date'
                        component={CustomInput}
                        type='date'
                        isRequired
                      />

                      <Field
                        name='end_date'
                        label='End Date'
                        component={CustomInput}
                        min={values?.start_date}
                        type='date'
                        isRequired
                      />

                      <div className='col-span-2'>
                        <Field
                          label='Category 1'
                          name='category_1'
                          renderData={categoryList?.data}
                          isLoading={categoryLoading}
                          isError={
                            typeof categoryIsError === 'string'
                              ? categoryIsError
                              : false
                          }
                          errorMessage={
                            typeof categoryIsError === 'string'
                              ? categoryIsError
                              : 'Failed to load category'
                          }
                          renderItem={(item: CategoryResponse) => (
                            <>{item?.title}</>
                          )}
                          isActive={(item: CategoryResponse) =>
                            values?.category_1?.find(
                              (el) => el?.id === item?.id,
                            )
                          }
                          renderName={() => (
                            <MultiSelectItem<CategoryResponse>
                              data={values?.category_1 as CategoryResponse[]}
                              defaultName='Select...'
                              displayName='title'
                              name={(data) => data?.title}
                              onClick={(item) => {
                                setFieldValue(
                                  'category_1',
                                  values?.category_1?.filter(
                                    (category_1) => category_1 !== item,
                                  ),
                                )
                              }}
                            />
                          )}
                          onChangeCallback={(item: CategoryResponse) => {
                            const isUnique = values?.category_1?.find(
                              (cat) => cat?.id === item?.id,
                            )
                            if (!isUnique) {
                              const data = values?.category_1 || []
                              setFieldValue('category_1', [...data, item])
                              dispatch(
                                couponAction.setSelectedCategories([
                                  ...data,
                                  item,
                                ]),
                              )
                              // category2Refetch()
                            }
                          }}
                          clearData={(item: CategoryResponse) => {
                            const data = values?.category_1?.filter(
                              (cat) => cat?.id === item?.id,
                            )
                            setFieldValue('category_1', data)
                            dispatch(
                              couponAction.setSelectedCategories(
                                data as CategoryResponse[],
                              ),
                            )
                            // category2Refetch()
                          }}
                          isSelected={false}
                          component={InfiniteSelect}
                          isAuth
                        />
                      </div>

                      {values?.category_1 && values?.category_1?.length > 0 ? (
                        <>
                          <div>
                            <Field
                              label='Sub Category'
                              name='category_2'
                              renderData={filterSubCategoryData}
                              isLoading={category2Loading}
                              isError={
                                typeof category2IsError === 'string'
                                  ? category2IsError
                                  : false
                              }
                              errorMessage={
                                typeof category2IsError === 'string'
                                  ? category2IsError
                                  : 'Failed to load sub category'
                              }
                              // reload={()}
                              // listRef={batchListRef}
                              renderItem={(item: CategoryResponse) => (
                                <>{item?.title}</>
                              )}
                              isActive={(item: CategoryResponse) =>
                                values?.category_2?.find(
                                  (el) => el?.id === item?.id,
                                )
                              }
                              renderName={() => (
                                <MultiSelectItem<CategoryResponse>
                                  data={
                                    values?.category_2 as CategoryResponse[]
                                  }
                                  defaultName='Select...'
                                  displayName='title'
                                  name={(data) => data?.title}
                                  onClick={(item) => {
                                    setFieldValue(
                                      'category_2',
                                      values?.category_2?.filter(
                                        (category_2) => category_2 !== item,
                                      ),
                                    )
                                  }}
                                />
                              )}
                              onChangeCallback={(item: CategoryResponse) => {
                                const isUnique = values?.category_2?.find(
                                  (cat) => cat?.id === item?.id,
                                )
                                if (!isUnique) {
                                  const data = values?.category_2 || []
                                  setFieldValue('category_2', [...data, item])
                                }
                              }}
                              clearData={(item: CategoryResponse) => {
                                const data = values?.category_2?.filter(
                                  (cat) => cat?.id === item?.id,
                                )
                                setFieldValue('category_2', data)
                              }}
                              component={InfiniteSelect}
                              isInsideSearch
                              searchProps={{
                                value: subCategorySearch,
                                onChange: (e: ChangeEvent<HTMLInputElement>) =>
                                  setSubCategorySearch(e.target.value),
                                placeholder: 'Search Product',
                              }}
                              onCloseCallback={() => {
                                setSubCategorySearch('')
                              }}
                              isAuth
                            />
                          </div>

                          <div>
                            <Field
                              label='Product'
                              name='product_ids'
                              renderData={productList?.data}
                              isLoading={productLoading}
                              isError={
                                typeof productIsError === 'string'
                                  ? productIsError
                                  : false
                              }
                              errorMessage={
                                typeof authorIsError === 'string'
                                  ? authorIsError
                                  : 'Failed to load product'
                              }
                              renderItem={(item: ProductResponse) => (
                                <>{item?.book_title}</>
                              )}
                              isActive={(item: ProductResponse) =>
                                values?.product_ids?.find(
                                  (el) => el?.id === item?.id,
                                )
                              }
                              renderName={() => (
                                <MultiSelectItem<ProductResponse>
                                  data={
                                    values?.product_ids as ProductResponse[]
                                  }
                                  defaultName='Select...'
                                  displayName='book_title'
                                  name={(data) => data?.book_title}
                                  onClick={(item) => {
                                    setFieldValue(
                                      'product_ids',
                                      values?.product_ids?.filter(
                                        (product) => product !== item,
                                      ),
                                    )
                                  }}
                                />
                              )}
                              onChangeCallback={(item: ProductResponse) => {
                                const isUnique = values?.product_ids?.find(
                                  (product) => product?.id === item?.id,
                                )
                                if (!isUnique) {
                                  const data = values?.product_ids || []
                                  setFieldValue('product_ids', [...data, item])
                                }
                              }}
                              clearData={(item: ProductResponse) => {
                                const data = values?.product_ids?.filter(
                                  (product) => product?.id === item?.id,
                                )
                                setFieldValue('product_ids', data)
                              }}
                              component={InfiniteSelect}
                              isInsideSearch
                              searchProps={{
                                value: value,
                                onChange: onChange,
                                placeholder: 'Search Product',
                              }}
                              onCloseCallback={() => {
                                setSearch('')
                              }}
                              isAuth
                            />
                          </div>

                          <div>
                            <Field
                              label='Author'
                              name='author_ids'
                              renderData={filterAuthorData}
                              isLoading={authorLoading}
                              isError={
                                typeof authorIsError === 'string'
                                  ? authorIsError
                                  : false
                              }
                              errorMessage={
                                typeof authorIsError === 'string'
                                  ? authorIsError
                                  : "Failed to load author's"
                              }
                              renderItem={(item: AuthorResponse) => (
                                <>{item?.Name}</>
                              )}
                              isActive={(item: AuthorResponse) =>
                                values?.author_ids?.find(
                                  (el) => el?.id === item?.id,
                                )
                              }
                              renderName={() => (
                                <MultiSelectItem<AuthorResponse>
                                  data={values?.author_ids as AuthorResponse[]}
                                  defaultName='Select...'
                                  displayName='Name'
                                  name={(data) => data?.Name}
                                  onClick={(item) => {
                                    setFieldValue(
                                      'author_ids',
                                      values?.author_ids?.filter(
                                        (author) => author !== item,
                                      ),
                                    )
                                  }}
                                />
                              )}
                              onChangeCallback={(item: AuthorResponse) => {
                                const isUnique = values?.author_ids?.find(
                                  (author) => author?.id === item?.id,
                                )
                                if (!isUnique) {
                                  const data = values?.author_ids || []
                                  setFieldValue('author_ids', [...data, item])
                                }
                              }}
                              clearData={(item: AuthorResponse) => {
                                const data = values?.author_ids?.filter(
                                  (author) => author?.id === item?.id,
                                )
                                setFieldValue('author_ids', data)
                              }}
                              component={InfiniteSelect}
                              isInsideSearch
                              searchProps={{
                                value: authorSearch,
                                onChange: (e: ChangeEvent<HTMLInputElement>) =>
                                  setAuthorSearch(e.target.value),
                                placeholder: 'Search Author',
                              }}
                              onCloseCallback={() => {
                                setAuthorSearch('')
                              }}
                              isAuth
                            />
                          </div>

                          <div>
                            <Field
                              label='Publisher'
                              name='publisher_ids'
                              renderData={filterPublisherData}
                              isLoading={publisherLoading}
                              isError={
                                typeof publisherIsError === 'string'
                                  ? publisherIsError
                                  : false
                              }
                              errorMessage={
                                typeof authorIsError === 'string'
                                  ? authorIsError
                                  : 'Failed to load publisher'
                              }
                              renderItem={(item: PublisherResponse) => (
                                <>{item?.Name}</>
                              )}
                              isActive={(item: PublisherResponse) =>
                                values?.publisher_ids?.find(
                                  (el) => el?.id === item?.id,
                                )
                              }
                              renderName={() => (
                                <MultiSelectItem<PublisherResponse>
                                  data={
                                    values?.publisher_ids as PublisherResponse[]
                                  }
                                  defaultName='Select...'
                                  displayName='Name'
                                  name={(data) => data?.Name}
                                  onClick={(item) => {
                                    setFieldValue(
                                      'publisher_ids',
                                      values?.publisher_ids?.filter(
                                        (publisher) => publisher !== item,
                                      ),
                                    )
                                  }}
                                />
                              )}
                              onChangeCallback={(item: PublisherResponse) => {
                                const isUnique = values?.publisher_ids?.find(
                                  (publisher) => publisher?.id === item?.id,
                                )
                                if (!isUnique) {
                                  const data = values?.publisher_ids || []
                                  setFieldValue('publisher_ids', [
                                    ...data,
                                    item,
                                  ])
                                }
                              }}
                              clearData={(item: PublisherResponse) => {
                                const data = values?.publisher_ids?.filter(
                                  (publisher) => publisher?.id === item?.id,
                                )
                                setFieldValue('publisher_ids', data)
                              }}
                              component={InfiniteSelect}
                              isInsideSearch
                              searchProps={{
                                value: publisherSearch,
                                onChange: (e: ChangeEvent<HTMLInputElement>) =>
                                  setPublisherSearch(e.target.value),
                                placeholder: 'Search Publisher',
                              }}
                              onCloseCallback={() => {
                                setPublisherSearch('')
                              }}
                              isAuth
                            />
                          </div>
                        </>
                      ) : null}
                    </div>
                    <div className='flex justify-end'>
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
                              {id ? 'Update' : 'Create'}
                            </span>
                            <span className='text-2xl ml-1'>
                              <BsArrowRightShort />
                            </span>
                          </>
                        )}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          )}
        </div>
      </Card>
    </PageLayout>
  )
}

export default ManageCoupon
