import React, { PropsWithChildren } from 'react'
import { BiSort } from 'react-icons/bi'
import { GoDotFill } from 'react-icons/go'
import { coreAction } from '@/feature/core/coreSlice'
import { useAppDispatch, useAppSelector } from '@/app/store'
import { Card } from '../../ui/Card'
import InfiniteFilter from '../filters/InfiniteFilter'

export interface Filter {
  label: string
  value: string
}

const TableWrapper = ({
  children,
  isSort = true,
  isActiveInactive = false,
  renderCustom,
}: PropsWithChildren & {
  isSort?: boolean
  isActiveInactive?: boolean
  renderCustom?: () => React.ReactNode
}) => {
  const dispatch = useAppDispatch()
  const { sortType, selectedStatus } = useAppSelector((state) => state.core)
  return (
    <Card className='h-max py-5'>
      <div className='flex justify-end mb-2 w-full gap-2'>
        {/* ASC/DESC Select */}
        {isSort && (
          <div className='max-w-[150px] min-w-[150px]'>
            <InfiniteFilter<Filter>
              wrapperClass=''
              buttonClass='border p-2'
              items={[
                { label: 'ASC', value: 'asc' },
                { label: 'DESC', value: 'desc' },
              ]}
              renderItem={(item) => <>{item.label}</>}
              isActive={(item) => item.value === sortType}
              isSelected={false}
              name={() => (
                <div className='flex items-center gap-1'>
                  <BiSort />
                  <span className='text-sm uppercase'>
                    {sortType || 'ASC/DESC'}
                  </span>
                </div>
              )}
              handleSelectedOption={(item) =>
                dispatch(coreAction.setSortType(item.value))
              }
            />
          </div>
        )}
        {isActiveInactive && (
          <div className='max-w-[150px] min-w-[150px]'>
            <InfiniteFilter<Filter>
              wrapperClass=''
              buttonClass='border p-2'
              items={[
                { label: 'Active', value: '1' },
                { label: 'Inactive', value: '0' },
              ]}
              renderItem={(item) => <>{item.label}</>}
              isActive={(item) => item.value === selectedStatus}
              isSelected={false}
              name={() => (
                <div className='flex items-center gap-1'>
                  <GoDotFill
                    className={`${
                      selectedStatus === '1' ? 'text-green-500' : 'text-red-500'
                    }`}
                  />
                  <span className='text-sm uppercase'>
                    {selectedStatus === '1' ? 'Active' : 'Inactive'}
                  </span>
                </div>
              )}
              clearData={() => dispatch(coreAction.setSelectedStatus(''))}
              handleSelectedOption={(item) =>
                dispatch(coreAction.setSelectedStatus(item.value))
              }
            />
          </div>
        )}
        {renderCustom && renderCustom()}
      </div>
      {children}
    </Card>
  )
}

export default TableWrapper
