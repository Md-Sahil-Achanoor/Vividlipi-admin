import { PropsWithChildren } from 'react'

interface SkeletonTableProps extends PropsWithChildren {
  total: number
  tableCount: number
}

const SkeletonTable = ({ total = 1, tableCount = 1 }: SkeletonTableProps) => {
  return (
    <>
      {Array.from({ length: total }).map((_, index) => (
        <tr key={index} className='skeleton_table_tr'>
          {Array.from({ length: tableCount }).map((_, index) => (
            <td
              key={index + 10}
              className={`py-3.5 px-4 ${index === 0 ? 'w-[100px]' : ''}`}
            >
              <div className='skeleton_table' />
            </td>
          ))}
        </tr>
      ))}
    </>
  )
}

export default SkeletonTable
