interface SkeletonTableProps {
  total: number
  tableCount: number
}

const FullTableSkeleton = ({
  total = 1,
  tableCount = 1,
}: SkeletonTableProps) => {
  return (
    <table className='w-full text-sm text-left'>
      <thead className='text-xs bg-table-background-gray'>
        <tr>
          {Array.from({ length: tableCount }).map((_, index) => (
            <th key={index} scope='col' className='table_th'>
              <div className='skeleton_table' />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
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
      </tbody>
    </table>
  )
}

export default FullTableSkeleton
