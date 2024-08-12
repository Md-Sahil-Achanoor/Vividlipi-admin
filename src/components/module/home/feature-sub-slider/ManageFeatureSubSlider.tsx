import { useAppDispatch, useAppSelector } from '@/app/store'
import FileUpload from '@/components/form/FileUpload'
import Modal from '@/components/ui/Modal'
import { coreAction } from '@/feature/core/coreSlice'
import { useManageFeatureSubSlideMutation } from '@/feature/home/homeQuery'
import { homeAction } from '@/feature/home/homeSlice'
import { IHomeFeatureSubSlider, featureSubSliderSchema } from '@/models'
import { File } from 'buffer'
import { Field, Form, Formik, FormikHelpers, FormikProps } from 'formik'
import { useRef } from 'react'
import { BsArrowRightShort } from 'react-icons/bs'

const initialValues: IHomeFeatureSubSlider = {
  file: null,
}

const ManageFeatureSubSlider = () => {
  const { type, open } = useAppSelector((state) => state.core)
  const formRef = useRef<FormikProps<IHomeFeatureSubSlider>>(null)
  const { selectedFeatureSubSlider } = useAppSelector((state) => state.home)
  const [manageFeatureSubSlide, { isLoading }] =
    useManageFeatureSubSlideMutation()
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
    values: IHomeFeatureSubSlider,
    { setSubmitting, resetForm }: FormikHelpers<IHomeFeatureSubSlider>,
  ) => {
    // console.log("values", values);
    // setSubmitting(false);
    const fd = new FormData()
    for (const key in values) {
      fd.append(key, (values as any)[key] as string | Blob)
    }
    // for (var pair of fd.entries()) {
    //   console.log(pair);
    // }
    await manageFeatureSubSlide({
      id: selectedFeatureSubSlider?.id,
      data: fd,
      options: {
        setSubmitting,
        resetForm,
      },
    })
  }
  return (
    <Modal
      classes={
        type === 'manage-feature-sub-slider' && open
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
        selectedFeatureSubSlider?.id
          ? 'Update Feature Sub Slide'
          : 'Create Feature Sub Slide'
      }
      isModalHeader
      outSideClick
    >
      <div className='w-full h-full'>
        <Formik
          initialValues={null || initialValues}
          validationSchema={featureSubSliderSchema}
          onSubmit={onSubmit}
          enableReinitialize
          innerRef={formRef}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form noValidate>
              <div className='mt-2'>
                <div className='grid grid-cols-2 gap-2'>
                  <div className='col-span-2'>
                    <Field
                      name='file'
                      label='Image'
                      maxFileSize={2}
                      isUpload={false}
                      component={FileUpload}
                      uploadCallBack={(files: File[]) => {
                        const file = files?.[0]
                        // console.log("file", file);
                        if (file) {
                          setFieldValue('file', file)
                        }
                      }}
                      placeholder='Image'
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
                      {selectedFeatureSubSlider?.id ? 'Update' : 'Create'}
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

export default ManageFeatureSubSlider
