import { useAppDispatch, useAppSelector } from '@/app/store'
import CustomInput from '@/components/form/CustomInput'
import InfiniteSelect from '@/components/form/InfiniteSelect'
import Modal from '@/components/ui/Modal'
import { coreAction } from '@/feature/core/coreSlice'
import { useManageNewInMutation } from '@/feature/home/homeQuery'
import { homeAction } from '@/feature/home/homeSlice'
import { useGetProductsQuery } from '@/feature/product/productQuery'
import useDebounce from '@/hooks/useDebounce'
import { IHomeFeatureNewProduct, featureNewProductSchema } from '@/models/home'
import { ProductQuery, ProductResponse } from '@/types'
import { cn } from '@/utils/twmerge'
import { Field, Form, Formik, FormikHelpers, FormikProps } from 'formik'
import { useEffect, useRef, useState } from 'react'
import { BsArrowRightShort } from 'react-icons/bs'

const initialValues: IHomeFeatureNewProduct = {
  productId: null,
  position: 1,
}

const ManageFeatureNewIn = () => {
  const { type, open } = useAppSelector((state) => state.core)
  const formRef = useRef<FormikProps<IHomeFeatureNewProduct>>(null)
  const { selectedFeatureProduct } = useAppSelector((state) => state.home)
  const [manageNewIn, { isLoading }] = useManageNewInMutation()
  const [searchValue, setSearchValue] = useState<string>('')
  // console.log(`\n\n ~ ManageFeatureNewIn ~ searchValue:`, searchValue);
  const { value, onChange } = useDebounce(() => setSearchValue(value), 1000)

  const query = () => {
    const query: Partial<ProductQuery> = {
      // page: 1,
    }
    if (searchValue) {
      query.search = searchValue
    }
    return query
  }

  const {
    isFetching: productLoading,
    refetch: productRefetch,
    data: productList,
    isError: productIsError,
  } = useGetProductsQuery(
    {
      data: {
        page: 1,
      },
      query: query(),
    },
    {
      skip: !open || type !== 'manage-new-in',
    },
  )
  // console.log(
  //   `\n\n ~ ManageFeatureNewIn ~ productList:`,
  //   productList,
  //   productErrorMessage
  // );

  useEffect(() => {
    if (open && type === 'manage-new-in') {
      productRefetch()
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
    values: IHomeFeatureNewProduct,
    { setSubmitting, resetForm }: FormikHelpers<IHomeFeatureNewProduct>,
  ) => {
    // console.log("values", values);
    await manageNewIn({
      id: selectedFeatureProduct?.id || '',
      data: {
        productId: values.productId?.id as number,
        position: values.position as number,
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
        type === 'manage-new-in' && open
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
      headText={selectedFeatureProduct?.id ? 'Update New In' : 'Create New In'}
      isModalHeader
      outSideClick
    >
      <div className='w-full h-full'>
        <Formik
          initialValues={
            (selectedFeatureProduct as IHomeFeatureNewProduct) || initialValues
          }
          validationSchema={featureNewProductSchema}
          onSubmit={onSubmit}
          enableReinitialize
          innerRef={formRef}
        >
          {({ isSubmitting, setFieldValue, values }) => (
            <Form noValidate>
              {/* {JSON.stringify(values?.productId)} */}
              <div className='mt-2'>
                <div className='grid grid-cols-2 gap-2'>
                  <div className='col-span-2'>
                    <Field
                      label='Product'
                      name='productId'
                      isRequired
                      renderData={productList?.data?.data || []}
                      isLoading={productLoading}
                      isError={productIsError}
                      errorMessage='Failed to fetch products'
                      renderItem={(item: ProductResponse) => (
                        <span className='uppercase'>{item?.book_title}</span>
                      )}
                      isActive={(item: ProductResponse) =>
                        values?.productId?.id === item?.id
                      }
                      renderName={() => {
                        return (
                          <span
                            className={cn(
                              'text-sm text-gray-700 truncate',
                              values?.productId?.book_title && 'uppercase',
                            )}
                          >
                            {values?.productId?.book_title || 'Select Product'}
                          </span>
                        )
                      }}
                      onChangeCallback={(item: ProductResponse) => {
                        setFieldValue(`productId`, item)
                      }}
                      clearData={() => {
                        setFieldValue(`productId`, null)
                      }}
                      isInsideSearch
                      searchProps={{
                        value,
                        onChange,
                        type: 'search',
                        placeholder: 'Search Product',
                      }}
                      isSelected={values?.productId !== null}
                      component={InfiniteSelect}
                      isAuth
                    />
                  </div>
                  <div className='col-span-2'>
                    <Field
                      name='position'
                      label='Position'
                      type='number'
                      component={CustomInput}
                      placeholder='Position'
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
                      {selectedFeatureProduct?.id ? 'Update' : 'Create'}
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

export default ManageFeatureNewIn
