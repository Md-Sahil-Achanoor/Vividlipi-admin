import { useAppDispatch, useAppSelector } from '@/app/store'
import CustomInput from '@/components/form/CustomInput'
import InfiniteSelect from '@/components/form/InfiniteSelect'
import Modal from '@/components/ui/Modal'
import {
  useGetCategoriesQuery,
  useManageSubCategoryMutation,
} from '@/feature/category/categoryQuery'
import { categoryAction } from '@/feature/category/categorySlice'
import { coreAction } from '@/feature/core/coreSlice'
import { IManageSubCategory, subCategorySchema } from '@/models/category'
import { CategoryResponse } from '@/types'
import { cn } from '@/utils/twmerge'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import { useEffect } from 'react'
import { BsArrowRightShort } from 'react-icons/bs'

const initialValues: IManageSubCategory = {
  title: '',
  category: null,
}

const ManageSubCategory = () => {
  const { type, open } = useAppSelector((state) => state.core)
  const { selectedSubCategory, singleSubCategory } = useAppSelector(
    (state) => state.category,
  )
  const [manageSubCategory, { isLoading }] = useManageSubCategoryMutation()
  const dispatch = useAppDispatch()
  const handleModal = (type: string) => {
    if (type === 'cancelled') {
      dispatch(coreAction.toggleModal({ open: false, type: '' }))
      dispatch(categoryAction.setSelectedSubCategory(null))
    }
  }

  const onSubmit = async (
    values: IManageSubCategory,
    { setSubmitting, resetForm }: FormikHelpers<IManageSubCategory>,
  ) => {
    // console.log("values", values, selectedSubCategory);
    await manageSubCategory({
      id: selectedSubCategory?.id as number,
      data: {
        ...values,
        category: values?.category?.id as number,
      },
      options: {
        setSubmitting,
        resetForm,
      },
    })
  }
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
      skip: !open && type !== 'manage-sub-category',
    },
  )

  useEffect(() => {
    if (open) {
      categoryRefetch()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  return (
    <Modal
      classes={
        type === 'manage-sub-category' && open
          ? {
              top: 'visible',
              body: `-translate-y-[0%] max-w-[400px] p-3 min-w-[400px]`,
            }
          : {
              top: 'invisible',
              body: '-translate-y-[300%] max-w-[400px] p-3 min-w-[400px]',
            }
      }
      handleModal={handleModal}
      wrapperClass='h-full'
      headText={
        selectedSubCategory?.id ? 'Update Sub Category' : 'Create Sub Category'
      }
      isModalHeader
      outSideClick
    >
      <div className='w-full h-full'>
        <Formik
          initialValues={singleSubCategory || initialValues}
          validationSchema={subCategorySchema}
          onSubmit={onSubmit}
          enableReinitialize
        >
          {({ isSubmitting, values, setFieldValue }) => (
            <Form noValidate>
              {/* {console.log(JSON.stringify(errors))} */}
              <div className='mt-2'>
                <div>
                  <Field
                    label='Category'
                    name='category'
                    isRequired
                    renderData={categoryList?.data}
                    isLoading={categoryLoading}
                    isError={categoryIsError}
                    errorMessage='Failed to fetch categories'
                    renderItem={(item: CategoryResponse) => (
                      <span className='uppercase'>{item?.title}</span>
                    )}
                    isActive={(item: CategoryResponse) =>
                      values?.category?.id === item?.id
                    }
                    renderName={() => {
                      return (
                        <span
                          className={cn(
                            'text-sm text-gray-700 truncate',
                            values?.category?.title && 'uppercase',
                          )}
                        >
                          {values?.category?.title || 'Select Category'}
                        </span>
                      )
                    }}
                    onChangeCallback={(item: CategoryResponse) => {
                      setFieldValue(`category`, item)
                    }}
                    clearData={() => {
                      setFieldValue(`category`, null)
                    }}
                    isSelected={values?.category !== null}
                    component={InfiniteSelect}
                    isAuth
                  />
                </div>

                <Field
                  name='title'
                  label='Category Name'
                  type='text'
                  component={CustomInput}
                  placeholder='Type here...'
                  isRequired
                />
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
                      {selectedSubCategory?.id ? 'Update' : 'Create'}
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

export default ManageSubCategory
