import NoTableData from '@/components/atoms/NoTableData'
import Table from '@/components/ui/Table'
import { CategoryResponse } from '@/types'

const categoryListTableHead = ['S.N.', 'Name', 'Slug']

type CouponCategoryProps = {
  data: CategoryResponse[]
}

const CouponSubCategory = (props: CouponCategoryProps) => {
  const category = props?.data || []
  return (
    <>
      {category && category?.length > 0 ? (
        <div className='col-span-2 '>
          <h1 className='text-sm font-semibold mb-3'>Sub Category List</h1>
          <Table headList={categoryListTableHead} totalPage={1}>
            {category && category?.length > 0 ? (
              category?.map((item, index) => (
                <tr
                  key={item?.id}
                  className={`table_tr border-0 ${
                    category?.length - 1 !== index
                      ? 'border-table-background-gray border-b'
                      : ''
                  }`}
                >
                  <th scope='row' className='table_td'>
                    {index + 1}
                  </th>
                  <td className='table_td'>{item?.title}</td>
                  <td className='table_td'>{item?.Slug}</td>
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

export default CouponSubCategory
