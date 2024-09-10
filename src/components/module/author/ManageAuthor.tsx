import { useAppDispatch, useAppSelector } from '@/app/store'
import CustomInput from '@/components/form/CustomInput'
import FileUpload from '@/components/form/FileUpload'
import Modal from '@/components/ui/Modal'
import { useManageAuthorMutation } from '@/feature/author/authorQuery'
import { authorAction } from '@/feature/author/authorSlice'
import { coreAction } from '@/feature/core/coreSlice'
import { IManageAuthor, authorSchema } from '@/models'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import { BsArrowRightShort } from 'react-icons/bs'

const initialValues: IManageAuthor = {
  Name: '',
  description: '',
  Slug: '',
  Pic: '',
}

const ManageAuthor = () => {
  const { type, open } = useAppSelector((state) => state.core)
  const { singleAuthor, selectedAuthor } = useAppSelector(
    (state) => state.author,
  )
  const [manageAuthor, { isLoading }] = useManageAuthorMutation()
  const dispatch = useAppDispatch()
  const handleModal = (type: string) => {
    if (type === 'cancelled') {
      // do nothing
      dispatch(coreAction.toggleModal({ open: false, type: '' }))
      dispatch(authorAction.setSelectedAuthor(null))
    }
  }

  const onSubmit = async (
    values: IManageAuthor,
    { setSubmitting, resetForm }: FormikHelpers<IManageAuthor>,
  ) => {
    // console.log("values", values);
    await manageAuthor({
      id: selectedAuthor?.id,
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
        type === 'manage-author' && open
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
      headText={selectedAuthor?.id ? 'Update Author' : 'Create Author'}
      isModalHeader
      outSideClick
    >
      <div className='w-full h-full'>
        <Formik
          initialValues={singleAuthor || initialValues}
          validationSchema={authorSchema}
          onSubmit={onSubmit}
          enableReinitialize
        >
          {({ isSubmitting }) => (
            <Form noValidate>
              <div className='mt-2'>
                <Field
                  name='Name'
                  label='Author Name'
                  type='text'
                  component={CustomInput}
                  placeholder='Type here...'
                  isRequired
                />

                <Field
                  name='Slug'
                  label='Author Slug'
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

                <Field
                  name='Pic'
                  label='Author Picture'
                  component={FileUpload}
                  maxFileSize={10}
                  supportedString='jpg, jpeg, png'
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
                      {selectedAuthor?.id ? 'Update' : 'Create'}
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

export default ManageAuthor
