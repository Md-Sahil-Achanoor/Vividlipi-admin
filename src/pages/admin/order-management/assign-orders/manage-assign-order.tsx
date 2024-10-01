import { useAppDispatch, useAppSelector } from '@/app/store'
import Loader from '@/components/atoms/Loader'
import CustomInput from '@/components/form/CustomInput'
import InfiniteSelect from '@/components/form/InfiniteSelect'
import InputSelect from '@/components/form/InputSelect'
import { Card } from '@/components/ui/Card'
import { book_format } from '@/constants/filter-list'
import {
  useGetAssignOrderByIdQuery,
  useGetOrderUserQuery,
  useManageAssignOrderMutation,
} from '@/feature/order-management/orderManagementQuery'

import { orderManagementAction } from '@/feature/order-management/orderManagementSlice'
import { useGetProductsQuery } from '@/feature/product/productQuery'
import useDebounce from '@/hooks/useDebounce'
import PageLayout from '@/layout/PageLayout'
import { assignOrderSchema } from '@/models'
import {
  BreadCrumbItem,
  IAssignOrder,
  IAssignOrderPayload,
  OrderUserResponse,
  ProductQuery,
  ProductResponse,
} from '@/types'
import { cn } from '@/utils/twmerge'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { BiTrash } from 'react-icons/bi'
import { BsArrowRightShort } from 'react-icons/bs'
import { useNavigate, useParams } from 'react-router-dom'

export type AssignOrder = IAssignOrder<OrderUserResponse, ProductResponse>

const initialValues: AssignOrder = {
  userid: null,
  Productdatas: [
    {
      id: null,
      selectedFormat: '',
      selectedFormatPrice: 0,
      quantity: 1,
    },
  ],
}

const ManageAssignOrder = () => {
  const { id } = useParams()
  // console.log(`\n\n ~ ManageAssignOrder ~ id:`, id)
  const router = useNavigate()
  const [searchValue, setSearchValue] = useState<string>('')
  // console.log(`\n\n ~ ManageFeatureProduct ~ searchValue:`, searchValue)
  const { value, onChange } = useDebounce(() => setSearchValue(value), 1000)

  const query = () => {
    const query: Partial<ProductQuery> = {
      page: 1,
    }
    if (searchValue) {
      query.search = searchValue
    }
    return query
  }
  const dispatch = useAppDispatch()
  // const [values] = useState<Role | null>(null);
  const { singleAssignOrder } = useAppSelector((state) => state.orderManagement)
  const breadcrumbItem: BreadCrumbItem[] = [
    {
      name: 'Assign Order List',
      link: '/admin/order-management/assign-order-list',
    },
    {
      name: id ? 'Edit Role' : 'Create Role',
      link: '#',
    },
  ]

  const { isLoading: loading, refetch } = useGetAssignOrderByIdQuery(
    { query: { id } },
    { skip: !id },
  )

  const [manageAssignOrder, { isLoading }] = useManageAssignOrderMutation()

  const onSubmit = async (
    values: AssignOrder,
    { setSubmitting, resetForm }: FormikHelpers<AssignOrder>,
  ) => {
    const data: IAssignOrderPayload = {
      userid: values.userid?.uid as number,
      Productdatas: values.Productdatas.map((item) => {
        return {
          id: item.id?.id as number,
          selectedFormat: item.selectedFormat as string,
          selectedFormatPrice: item.selectedFormatPrice as number,
          quantity: item.quantity as number,
        }
      }),
      Total: values.Productdatas.reduce((acc, item) => {
        return acc + Number(item.selectedFormatPrice) * Number(item.quantity)
      }, 0),
    }
    // console.log(values, data)
    // return setSubmitting(false)
    await manageAssignOrder({
      id,
      data,
      options: {
        setSubmitting,
        resetForm,
        router,
      },
    })
  }

  useEffect(() => {
    if (id) {
      refetch()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  useEffect(() => {
    return () => {
      dispatch(orderManagementAction.resetAll())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const {
    isLoading: orderUserLoading,
    refetch: orderUserRefetch,
    data: orderUserList,
    isError: orderUserIsError,
    error: orderUserErrorMessage,
  } = useGetOrderUserQuery({
    query: {},
  })

  const {
    isLoading: productLoading,
    refetch: productRefetch,
    data: productList,
    isError: productIsError,
    error: productErrorMessage,
  } = useGetProductsQuery({
    query: query(),
  })

  useEffect(() => {
    productRefetch()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    orderUserRefetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [userSearch, setUserSearch] = useState<string>('')
  const filterOrderUserData = useMemo(() => {
    if (userSearch) {
      return orderUserList?.data?.filter(
        (item) =>
          item?.first_name?.toLowerCase().includes(userSearch.toLowerCase()) ||
          item?.last_name?.toLowerCase().includes(userSearch.toLowerCase()),
      )
    }
    return orderUserList?.data
  }, [userSearch, orderUserList?.data])

  return (
    <PageLayout
      title={id ? 'Edit Role' : 'Create Role'}
      breadcrumbItem={breadcrumbItem}
    >
      <Card className='border rounded-md'>
        {id && loading ? (
          <Loader />
        ) : (
          <Formik
            initialValues={singleAssignOrder || initialValues}
            validationSchema={assignOrderSchema}
            onSubmit={onSubmit}
            enableReinitialize
          >
            {({ isSubmitting, values, setFieldValue }) => (
              <Form>
                {/* {console.log(values, errors)} */}
                <div className='mt-5'>
                  <div className='max-w-[50%]'>
                    <Field
                      label='User'
                      name='userid'
                      isRequired
                      renderData={filterOrderUserData}
                      isLoading={orderUserLoading}
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
                      renderItem={(item: OrderUserResponse) => (
                        <span className='uppercase'>
                          {item?.first_name + ' ' + item?.last_name}
                        </span>
                      )}
                      isActive={(item: OrderUserResponse) =>
                        values?.userid?.uid === item?.uid
                      }
                      renderName={() => {
                        const isName =
                          values?.userid?.first_name &&
                          values?.userid?.last_name
                        const name = isName
                          ? values?.userid?.first_name +
                            ' ' +
                            values?.userid?.last_name
                          : 'Select User'
                        return (
                          <span
                            className={cn(
                              'text-sm text-gray-700 truncate',
                              isName && 'uppercase',
                            )}
                          >
                            {name || 'Select User'}
                          </span>
                        )
                      }}
                      onChangeCallback={(item: OrderUserResponse) => {
                        setFieldValue(`userid`, item)
                      }}
                      clearData={() => {
                        setFieldValue(`userid`, null)
                      }}
                      isSelected={values?.userid !== null}
                      component={InfiniteSelect}
                      isAuth
                      isInsideSearch
                      searchProps={{
                        value: userSearch,
                        onChange: (e: ChangeEvent<HTMLInputElement>) =>
                          setUserSearch(e.target.value),
                        placeholder: 'Search Author',
                      }}
                      onCloseCallback={() => {
                        setUserSearch('')
                      }}
                    />
                  </div>

                  {values.Productdatas.map((data, index) => (
                    <div key={index} className='grid grid-cols-12 gap-x-2'>
                      <div className='col-span-4'>
                        <Field
                          label='Product'
                          name={`Productdatas.${index}.id`}
                          isRequired
                          renderData={productList?.data?.data || []}
                          isLoading={productLoading}
                          isError={
                            typeof productIsError === 'string'
                              ? productIsError
                              : false
                          }
                          errorMessage={
                            typeof productErrorMessage === 'string'
                              ? productErrorMessage
                              : 'Failed to load product'
                          }
                          renderItem={(item: ProductResponse) => (
                            <span className='uppercase'>
                              {item?.book_title}
                            </span>
                          )}
                          isActive={(item: ProductResponse) =>
                            data?.id?.id === item?.id
                          }
                          renderName={() => {
                            return (
                              <span
                                className={cn(
                                  'text-sm text-gray-700 truncate',
                                  data?.id?.book_title && 'uppercase',
                                )}
                              >
                                {data?.id?.book_title || 'Select Product'}
                              </span>
                            )
                          }}
                          onChangeCallback={(item: ProductResponse) => {
                            setFieldValue(`Productdatas.${index}.id`, item)
                            setFieldValue(
                              `Productdatas.${index}.selectedFormat`,
                              '',
                            )
                            setFieldValue(
                              `Productdatas.${index}.selectedFormatPrice`,
                              0,
                            )
                            setFieldValue(`Productdatas.${index}.quantity`, 1)
                          }}
                          clearData={() => {
                            setFieldValue(`Productdatas.${index}.id`, null)
                            setFieldValue(
                              `Productdatas.${index}.selectedFormat`,
                              '',
                            )
                            setFieldValue(
                              `Productdatas.${index}.selectedFormatPrice`,
                              0,
                            )
                            setFieldValue(`Productdatas.${index}.quantity`, 1)
                          }}
                          isInsideSearch
                          searchProps={{
                            value,
                            onChange,
                            type: 'search',
                            placeholder: 'Search Product',
                          }}
                          isSelected={data?.id !== null}
                          component={InfiniteSelect}
                          onCloseCallback={() => {
                            setSearchValue('')
                          }}
                          isAuth
                        />
                      </div>
                      <div className='col-span-3'>
                        <Field
                          label='Format'
                          name={`Productdatas.${index}.selectedFormat`}
                          component={InputSelect}
                          items={book_format?.filter((el) => {
                            const bookFormat = data?.id?.book_format?.map(
                              (el) => Number(el),
                            )
                            return (
                              bookFormat?.includes(el.value as number) || false
                            )
                          })}
                          disabled={data?.id === null}
                          onChangeCallback={(
                            e: ChangeEvent<HTMLSelectElement>,
                          ) => {
                            const value = Number(e.target.value)
                            // console.log(e.target.value)
                            const book = data?.id

                            if (value == 1) {
                              setFieldValue(
                                `Productdatas.${index}.selectedFormatPrice`,
                                book?.HardCopyPrice,
                              )
                            } else if (value == 2) {
                              setFieldValue(
                                `Productdatas.${index}.selectedFormatPrice`,
                                book?.EbookPrice,
                              )
                            } else if (value == 3) {
                              setFieldValue(
                                `Productdatas.${index}.selectedFormatPrice`,
                                book?.AudioPrice,
                              )
                            }
                          }}
                          isRequired
                        />
                      </div>
                      <div className='col-span-2'>
                        <Field
                          label='Price'
                          name={`Productdatas.${index}.selectedFormatPrice`}
                          type='number'
                          component={CustomInput}
                          disabled
                          placeholder='Type here...'
                          isRequired
                        />
                      </div>
                      <div className='col-span-2'>
                        <Field
                          label='Quantity'
                          name={`Productdatas.${index}.quantity`}
                          type='number'
                          component={CustomInput}
                          disable={
                            data?.selectedFormat ||
                            Number(data?.selectedFormat) >= 1
                          }
                          placeholder='Type here...'
                          isRequired
                        />
                      </div>
                      <div className='col-span-1 flex items-center'>
                        <button
                          type='button'
                          className='button_sm_danger'
                          onClick={() => {
                            values.Productdatas.splice(index, 1)
                            setFieldValue('Productdatas', values.Productdatas)
                          }}
                        >
                          <BiTrash />
                        </button>
                      </div>
                    </div>
                  ))}
                  <div className='flex justify-end mb-4'>
                    <button
                      type='button'
                      className='button_sm_primary'
                      onClick={() => {
                        values.Productdatas.push({
                          id: null,
                          selectedFormat: '',
                          selectedFormatPrice: 0,
                          quantity: 1,
                        })
                        setFieldValue('Productdatas', values.Productdatas)
                      }}
                    >
                      Add More
                    </button>
                  </div>
                </div>
                <div className='flex justify-end'>
                  <button
                    type='submit'
                    className='button_primary'
                    disabled={isSubmitting || isLoading}
                  >
                    {isSubmitting || isLoading ? (
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
        )}
      </Card>
    </PageLayout>
  )
}

export default ManageAssignOrder
