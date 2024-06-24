import { Field, Form, Formik, FormikHelpers } from 'formik'
import { BsArrowRightShort } from 'react-icons/bs'
import { useAppDispatch, useAppSelector } from '@/app/store'
import CustomInput from '@/components/form/CustomInput'
import Modal from '@/components/ui/Modal'
import { coreAction } from '@/feature/core/coreSlice'
import { useManagePublisherMutation } from '@/feature/publisher/publisherQuery'
import { publisherAction } from '@/feature/publisher/publisherSlice'
import { IManagePublisher, publisherSchema } from '@/models/publisher'

const initialValues: IManagePublisher = {
  Name: '',
  description: '',
}

const ManagePublisher = () => {
  const { type, open } = useAppSelector((state) => state.core)
  const { singlePublisher, selectedPublisher } = useAppSelector(
    (state) => state.publisher,
  )
  const [managePublisher, { isLoading }] = useManagePublisherMutation()
  const dispatch = useAppDispatch()
  const handleModal = (type: string) => {
    if (type === 'cancelled') {
      // do nothing
      dispatch(coreAction.toggleModal({ open: false, type: '' }))
      dispatch(publisherAction.setSelectedPublisher(null))
    }
  }
  console.log(
    `\n\n ~ ManagePublisher ~ singlePublisher:`,
    singlePublisher,
    selectedPublisher,
  )

  const onSubmit = async (
    values: IManagePublisher,
    { setSubmitting, resetForm }: FormikHelpers<IManagePublisher>,
  ) => {
    // console.log("values", values);
    await managePublisher({
      id: selectedPublisher?.id,
      data: values,
      options: {
        setSubmitting,
        resetForm,
      },
    })
  }
  return (
    <Modal
      classes={
        type === 'manage-publisher' && open
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
      headText={selectedPublisher?.id ? 'Update Publisher' : 'Create Publisher'}
      isModalHeader
      outSideClick
    >
      <div className='w-full h-full'>
        <Formik
          initialValues={singlePublisher || initialValues}
          validationSchema={publisherSchema}
          onSubmit={onSubmit}
          enableReinitialize
        >
          {({ isSubmitting }) => (
            <Form noValidate>
              <div className='mt-2'>
                <Field
                  name='Name'
                  label='Publisher Name'
                  type='text'
                  component={CustomInput}
                  placeholder='Type here...'
                  isRequired
                />

                <Field
                  name='description'
                  label='Description'
                  type='textarea'
                  rows='5'
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
                      {selectedPublisher?.id ? 'Update' : 'Create'}
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

export default ManagePublisher
