import Pagination from '@/components/atoms/Pagination'
import { InputType } from '@/types'
import { cn } from '@/utils/twmerge'
import { Dispatch, FC, SetStateAction } from 'react'

interface TableT {
  children: React.ReactNode
  headList: string[]
  reInitialize?: boolean
  tableClass?: string
  isPaginationHide?: boolean
  totalPage?: number
  setPage?: Dispatch<SetStateAction<number>>
  isCheckbox?: boolean
  checkboxProps?: InputType
}

const Table: FC<TableT> = ({
  children,
  headList,
  reInitialize = false,
  tableClass,
  totalPage,
  setPage = () => {},
  isCheckbox = false,
  checkboxProps,
}) => {
  return (
    <div className=''>
      <div
        className={cn(
          `relative overflow-x-auto shadow-md rounded-md customTable h-max`,
          tableClass,
        )}
      >
        <table className='w-full text-sm text-left'>
          <thead className='text-xs bg-table-background-gray'>
            <tr>
              {isCheckbox && (
                <th scope='col' className='p-4'>
                  <div className='flex items-center'>
                    <input
                      id='checkbox-all-search'
                      type='checkbox'
                      className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                      {...checkboxProps}
                    />
                    <label htmlFor='checkbox-all-search' className='sr-only'>
                      checkbox
                    </label>
                  </div>
                </th>
              )}
              {headList.map((head, index) => (
                <th key={index} scope='col' className='table_th'>
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
      {totalPage && totalPage > 1 ? (
        <Pagination
          reInitialize={reInitialize}
          totalPage={totalPage}
          setPage={setPage}
        />
      ) : null}
    </div>
  )
}

export default Table
