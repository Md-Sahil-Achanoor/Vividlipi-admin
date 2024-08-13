import PlaceholderImage from '@/assets/svg/placeholder'
import NoTableData from '@/components/atoms/NoTableData'
import Table from '@/components/ui/Table'
import { ProductResponse } from '@/types'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const productLIstTableHead = [
  'S.N.',
  'Title',
  'Thumbnail',
  'Language',
  'Format',
]

type CouponProductProps = {
  data: ProductResponse[]
}

const CouponProduct = (props: CouponProductProps) => {
  const products = props?.data || []
  return (
    <>
      {products && products?.length > 0 ? (
        <div className='col-span-2'>
          <h1 className='text-sm font-semibold mb-3'>Product List</h1>
          <Table headList={productLIstTableHead} totalPage={1}>
            {products && products?.length > 0 ? (
              products?.map((item, index) => (
                <tr
                  key={item?.id}
                  className={`table_tr border-0 ${
                    products?.length - 1 !== index
                      ? 'border-table-background-gray border-b'
                      : ''
                  }`}
                >
                  <th scope='row' className='table_td'>
                    {index + 1}
                  </th>
                  <td className='table_td'>{item?.book_title}</td>
                  <td className='table_td'>
                    <div className='w-16 h-16 flex justify-center'>
                      <LazyLoadImage
                        src={item?.thumbnail as string}
                        alt={item?.book_title}
                        placeholder={<PlaceholderImage />}
                        wrapperClassName='w-16 h-full object-contain bg-gray-100 p-[1px] rounded-sm'
                        effect='blur'
                        width='100%'
                        height={64}
                        className='w-16 h-full object-contain'
                      />
                    </div>
                  </td>
                  <td className='table_td'>{item?.language}</td>
                  <td className='table_td'>
                    <div className='flex flex-col'>
                      {item?.book_format?.map((el, index) => (
                        <span key={el} className='text-xs'>
                          {index + 1}:{' '}
                          {Number(el) == 1
                            ? 'Hard Copy'
                            : Number(el) == 2
                              ? 'Ebook'
                              : 'Audio Book'}
                          {Number(el) == 1 &&
                            ` (Price: ₹${item?.HardCopyPrice}; Stock: ${item?.Stock})`}
                          {Number(el) == 3 && ` (Price: ₹${item?.AudioPrice})`}
                          {Number(el) == 2 && ` (Price: ₹${item?.EbookPrice})`}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <NoTableData colSpan={5} parentClass='h-40'>
                <span className='font-medium'>No data found!</span>
              </NoTableData>
            )}
          </Table>
        </div>
      ) : null}
    </>
  )
}

export default CouponProduct
