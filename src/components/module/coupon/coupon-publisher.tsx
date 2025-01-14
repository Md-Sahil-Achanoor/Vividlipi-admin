import NoTableData from '@/components/atoms/NoTableData'
import Table from '@/components/ui/Table'
import { PublisherResponse } from '@/types'
import { truncate } from '@/utils/file'

const authorListTableHead = ['S.N.', 'Name', 'Description']

type CouponPublisherProps = {
  data: PublisherResponse[]
}

const CouponPublisher = (props: CouponPublisherProps) => {
  const author = props?.data || []
  return (
    <>
      {author && author?.length > 0 ? (
        <div className='col-span-2'>
          <h1 className='text-sm font-semibold mb-3'>Publisher List</h1>
          <Table headList={authorListTableHead} totalPage={1}>
            {author && author?.length > 0 ? (
              author?.map((item, index) => (
                <tr
                  key={item?.id}
                  className={`table_tr border-0 ${
                    author?.length - 1 !== index
                      ? 'border-table-background-gray border-b'
                      : ''
                  }`}
                >
                  <th scope='row' className='table_td'>
                    {index + 1}
                  </th>
                  <td className='table_td'>{item?.Name}</td>
                  <td className='table_td'>
                    {truncate(item?.description, 50)}
                  </td>
                </tr>
              ))
            ) : (
              <NoTableData colSpan={3} parentClass='h-40'>
                <span className='font-medium'>No data found!</span>
              </NoTableData>
            )}
          </Table>
        </div>
      ) : null}
    </>
  )
}

export default CouponPublisher
