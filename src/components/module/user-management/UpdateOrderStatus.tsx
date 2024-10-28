import { useAppDispatch, useAppSelector } from '@/app/store'
import CustomInput from '@/components/form/CustomInput'
import InputSelect from '@/components/form/InputSelect'
import Modal from '@/components/ui/Modal'
import { coreAction } from '@/feature/core/coreSlice'
import { useUpdateOrderMutation } from '@/feature/order-management/orderManagementQuery'
import { userManagementAction } from '@/feature/user-management/userManagementSlice'
import { UpdateOrderSchema, UpdateOrderType } from '@/models'
import { formatDate } from '@/utils/time'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import { BsArrowRightShort } from 'react-icons/bs'

const initialValues: UpdateOrderType = {
  OrderId: 0,
  Status: 'Packed',
  TrackingId: '',
}

const status = [
  { value: 'Packed', name: 'Packed' },
  { value: 'Shipped', name: 'Shipped' },
  { value: 'On Hold', name: 'On Hold' },
  { value: 'Delayed', name: 'Delayed' },
  { value: 'Completed', name: 'Completed' },
]

const UpdateOrderStatus = () => {
  const { type, open } = useAppSelector((state) => state.core)
  const { selectedAssignOrder } = useAppSelector(
    (state) => state.orderManagement,
  )
  const [updateOrder, { isLoading }] = useUpdateOrderMutation()
  const dispatch = useAppDispatch()

  const handleModal = (type: string) => {
    if (type === 'cancelled') {
      dispatch(coreAction.toggleModal({ open: false, type: '' }))
      dispatch(userManagementAction.setSelectedUser(null))
    }
  }

  const onSubmit = async (
    values: UpdateOrderType,
    { setSubmitting, resetForm }: FormikHelpers<UpdateOrderType>,
  ) => {
    const data: UpdateOrderType = {
      Status: values.Status,
      OrderId: selectedAssignOrder?.id as number,
    }
    if (values?.Status === 'Shipped') {
      data.TrackingId = values.TrackingId
    }
    await updateOrder({
      data,
      options: {
        setSubmitting,
        resetForm,
      },
    })
  }

  return (
    <Modal
      classes={
        type === 'update-order-status' && open
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
      headText={'Update Order Status'}
      isModalHeader
      outSideClick
    >
      <div className='w-full h-full'>
        {/* <div className='mb-3'>
          <h1>Update Order</h1>
        </div> */}
        <div className='w-full h-full'>
          <Formik
            initialValues={initialValues}
            validationSchema={UpdateOrderSchema}
            onSubmit={onSubmit}
            enableReinitialize
          >
            {({ isSubmitting, values }) => (
              <Form>
                {/* {console.log(JSON.stringify(errors))} */}
                <div className='mt-2'>
                  <Field
                    name='Status'
                    label='Status'
                    component={InputSelect}
                    items={status}
                    isRequired
                  />

                  {values?.Status === 'Shipped' && (
                    <Field
                      name='TrackingId'
                      label='Tracking Id'
                      type='text'
                      component={CustomInput}
                      placeholder='Type here...'
                      isRequired
                    />
                  )}
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
                      <span className='font-medium'>{'Update'}</span>
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

        {selectedAssignOrder?.OrderTrack &&
        selectedAssignOrder?.OrderTrack?.length > 0 ? (
          <div className='mt-10'>
            <div>
              <h1 className='font-semibold'>Status Timeline</h1>
            </div>
            <ol className='relative border-s border-gray-200 mt-5'>
              {selectedAssignOrder?.OrderTrack?.map((item, index) => (
                <li className='mb-5 ms-4' key={index}>
                  <div className='absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white'></div>
                  <time className='mb-1 text-sm font-normal leading-none text-gray-400'>
                    {formatDate(item?.Time)}
                  </time>
                  <h3 className='text-lg font-semibold text-gray-900'>
                    {item?.Status}
                  </h3>
                  {/* <a
                href='#'
                className='inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700'
              >
                Learn more{' '}
                <svg
                  className='w-3 h-3 ms-2 rtl:rotate-180'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 14 10'
                >
                  <path
                    stroke='currentColor'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='2'
                    d='M1 5h12m0 0L9 1m4 4L9 9'
                  />
                </svg>
              </a> */}
                </li>
              ))}
            </ol>
          </div>
        ) : null}
      </div>
    </Modal>
  )
}

export default UpdateOrderStatus
