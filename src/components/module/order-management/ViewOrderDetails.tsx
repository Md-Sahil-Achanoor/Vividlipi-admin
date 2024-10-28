import { useAppDispatch, useAppSelector } from '@/app/store'
import NoTableData from '@/components/atoms/NoTableData'
import Modal from '@/components/ui/Modal'
import Table from '@/components/ui/Table'
import { coreAction } from '@/feature/core/coreSlice'
import { userManagementAction } from '@/feature/user-management/userManagementSlice'

const tableHead = [
  'SL',
  'Book Name',
  'Book Author',
  'Book Format',
  'Book Price',
  'Book Quantity',
]

const ViewOrderDetails = () => {
  const { type, open } = useAppSelector((state) => state.core)
  const { selectedAssignOrder } = useAppSelector(
    (state) => state.orderManagement,
  )
  const dispatch = useAppDispatch()

  const handleModal = (type: string) => {
    if (type === 'cancelled') {
      dispatch(coreAction.toggleModal({ open: false, type: '' }))
      dispatch(userManagementAction.setSelectedUser(null))
    }
  }

  // console.log(`\n\n ~ ViewOrderDetails ~ selectedUser:`, selectedUser)

  return (
    <Modal
      classes={
        type === 'view-assign-order' && open
          ? {
              top: 'visible',
              body: `-translate-y-[0%] max-w-[800px] p-3 min-w-[800px]`,
            }
          : {
              top: 'invisible',
              body: '-translate-y-[300%] max-w-[800px] p-3 min-w-[800px]',
            }
      }
      handleModal={handleModal}
      wrapperClass='h-full'
      headText={'View Order Details'}
      isModalHeader
      outSideClick
    >
      <div className='w-full h-full'>
        <div className='mb-3'>
          <h1>Order List</h1>
        </div>
        <Table headList={tableHead}>
          {selectedAssignOrder?.Productdatas &&
          typeof selectedAssignOrder?.Productdatas === 'object' &&
          selectedAssignOrder?.Productdatas?.length > 0 ? (
            selectedAssignOrder?.Productdatas?.map((item, index) => (
              <tr className='table_tr' key={index}>
                <td className='table_td'>{index + 1}</td>
                <td className='table_td'>{item?.ProductDetails?.book_title}</td>
                <td className='table_td'>
                  {item?.ProductDetails?.author?.Name || 'N/A'}
                </td>
                <td className='table_td'>
                  {item?.selectedFormat == '1'
                    ? 'Hard Copy'
                    : item?.selectedFormat == '2'
                      ? 'Ebook'
                      : 'Audio Book'}
                </td>
                <td className='table_td'>₹{item?.selectedFormatPrice}</td>
                <td className='table_td'>{item?.quantity}</td>
              </tr>
            ))
          ) : (
            <NoTableData colSpan={7} parentClass='h-40'>
              <span className='font-medium'>No data found!</span>
            </NoTableData>
          )}
        </Table>
      </div>
    </Modal>
  )
}

export default ViewOrderDetails
