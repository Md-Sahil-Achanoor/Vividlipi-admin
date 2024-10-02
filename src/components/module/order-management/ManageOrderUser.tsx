import { useAppDispatch, useAppSelector } from '@/app/store'
import CustomInput from '@/components/form/CustomInput'
import InputSelect from '@/components/form/InputSelect'
import PhoneInputComp from '@/components/form/PhoneNumberInput'
import Modal from '@/components/ui/Modal'
import countryList from '@/constants/countryList'
import { coreAction } from '@/feature/core/coreSlice'
import { useManageOrderUserMutation } from '@/feature/order-management/orderManagementQuery'
import { orderManagementAction } from '@/feature/order-management/orderManagementSlice'
import { manageOrderUserSchema } from '@/models'
import { IOrderUserPayload } from '@/types'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import { BsArrowRightShort } from 'react-icons/bs'

const initialValues: IOrderUserPayload = {
  first_name: '',
  last_name: '',
  email: '',
  MobileNumber: '',
  country: '',
  password: '0',
  confirmPassword: '0',
  countryInfo: {},
}

const ManageOrderUser = () => {
  const { type, open } = useAppSelector((state) => state.core)
  const { singleOrderUser, selectedOrderUser } = useAppSelector(
    (state) => state.orderManagement,
  )
  const [manageOrderUser, { isLoading }] = useManageOrderUserMutation()
  const dispatch = useAppDispatch()

  const handleModal = (type: string) => {
    if (type === 'cancelled') {
      dispatch(coreAction.toggleModal({ open: false, type: '' }))
      dispatch(orderManagementAction.setSelectedOrderUser(null))
    }
  }

  // console.log(
  //   `\n\n ~ ManageOrderUser ~ selectedUser:`,
  //   singleOrderUser,
  //   selectedOrderUser,
  // )
  const onSubmit = async (
    values: IOrderUserPayload,
    { setSubmitting, resetForm }: FormikHelpers<IOrderUserPayload>,
  ) => {
    // console.log(`\n\n values:`, values)
    // return setSubmitting(false)
    const data = {
      first_name: values?.first_name,
      last_name: values?.last_name,
      email: values?.email,
      MobileNumber: values?.MobileNumber,
      country: values?.country,
      password: values?.password,
      CountryCode: values?.countryInfo?.dialCode as string,
    }
    await manageOrderUser({
      id: selectedOrderUser?.uid as number,
      data: data,
      options: {
        setSubmitting,
        resetForm,
      },
    })
  }

  return (
    <Modal
      classes={
        type === 'manage-order-user' && open
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
      headText={selectedOrderUser?.uid ? 'Update User' : 'Create User'}
      isModalHeader
      outSideClick
    >
      <div className='w-full h-full'>
        <Formik
          initialValues={singleOrderUser || initialValues}
          validationSchema={manageOrderUserSchema}
          onSubmit={onSubmit}
          enableReinitialize
        >
          {({ isSubmitting }) => (
            <Form noValidate>
              {/* {console.log(JSON.stringify(errors))} */}
              <div className='mt-2 grid grid-cols-2 gap-x-2'>
                <Field
                  name='first_name'
                  label='First Name'
                  placeholder='First Name'
                  component={CustomInput}
                />

                <Field
                  name='last_name'
                  label='Last Name'
                  placeholder='Last Name'
                  component={CustomInput}
                />

                <div className='col-span-2'>
                  <Field
                    name='email'
                    label='Email'
                    placeholder='Email'
                    component={CustomInput}
                  />
                </div>

                <Field
                  name='MobileNumber'
                  label='Mobile'
                  placeholder='Mobile'
                  component={PhoneInputComp}
                />

                <Field
                  name='country'
                  label={'Country'}
                  type='text'
                  component={InputSelect}
                  customValue='name'
                  items={countryList}
                  placeholder='Country'
                  isRequired
                />

                {/* <Field
                  name='password'
                  label='Password'
                  placeholder='Password'
                  type={'text'}
                  isPassword
                  component={CustomInput}
                />

                <Field
                  name='confirmPassword'
                  label='Confirm Password'
                  placeholder='Confirm Password'
                  type={'text'}
                  isPassword
                  component={CustomInput}
                /> */}
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
                      {selectedOrderUser?.uid ? 'Update' : 'Create'}
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

export default ManageOrderUser
