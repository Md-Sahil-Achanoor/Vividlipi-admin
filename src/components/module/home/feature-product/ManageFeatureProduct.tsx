import { useAppDispatch, useAppSelector } from '@/app/store'
import CustomInput from '@/components/form/CustomInput'
import InfiniteSelect from '@/components/form/InfiniteSelect'
import Modal from '@/components/ui/Modal'
import { coreAction } from '@/feature/core/coreSlice'
import { useManageFeatureProductMutation } from '@/feature/home/homeQuery'
import { homeAction } from '@/feature/home/homeSlice'
import { useGetProductsQuery } from '@/feature/product/productQuery'
import useDebounce from '@/hooks/useDebounce'
import { IHomeFeatureProduct, featureProductsSchema } from '@/models/home'
import { ProductQuery, ProductResponse } from '@/types'
import { cn } from '@/utils/twmerge'
import { Field, Form, Formik, FormikHelpers, FormikProps } from 'formik'
import { useEffect, useRef, useState } from 'react'
import { BsArrowRightShort } from 'react-icons/bs'

const initialValues: IHomeFeatureProduct = {
  productId: null,
  main: 0,
}

const ManageFeatureProduct = () => {
  const { type, open } = useAppSelector((state) => state.core)
  const formRef = useRef<FormikProps<IHomeFeatureProduct>>(null)
  const { selectedFeatureProduct } = useAppSelector((state) => state.home)
  const [manageFeatureProduct, { isLoading }] =
    useManageFeatureProductMutation()
  const [searchValue, setSearchValue] = useState<string>('')
  console.log(`\n\n ~ ManageFeatureProduct ~ searchValue:`, searchValue)
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
    isLoading: productLoading,
    refetch: productRefetch,
    data: productList,
    isError: productIsError,
    // error: productErrorMessage,
  } = useGetProductsQuery(
    {
      data: {
        page: 1,
      },
      query: query(),
    },
    {
      skip: !open || type !== 'manage-feature-product',
    },
  )
  // console.log(
  //   `\n\n ~ ManageFeatureProduct ~ productList:`,
  //   productList,
  //   productErrorMessage
  // );

  useEffect(() => {
    if (open && type === 'manage-feature-product') {
      productRefetch()
    }
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
    values: IHomeFeatureProduct,
    { setSubmitting, resetForm }: FormikHelpers<IHomeFeatureProduct>,
  ) => {
    // console.log("values", values);
    await manageFeatureProduct({
      id: selectedFeatureProduct?.id || '',
      data: {
        productId: values.productId?.id as number,
        main: values.main as number,
        contentpositionY: 0,
        contentpostion_X: 0,
        contentpostionX: 0,
        text: '',
        id: '',
        redirectUrl: '',
        imageurl: '',
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
        type === 'manage-feature-product' && open
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
        selectedFeatureProduct?.id
          ? 'Update Feature Product'
          : 'Create Feature Product'
      }
      isModalHeader
      outSideClick
    >
      <div className='w-full h-full'>
        <Formik
          initialValues={selectedFeatureProduct || initialValues}
          validationSchema={featureProductsSchema}
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
                            {values?.productId?.book_title || 'Select Category'}
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
                      name='main'
                      label='Main'
                      type='number'
                      component={CustomInput}
                      placeholder='Main'
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

export default ManageFeatureProduct
