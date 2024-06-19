import React from 'react'
import { ILoader } from '../../types'

const Loader = ({
  className,
  text = '',
  isProgress,
  progress,
}: Partial<ILoader>) => {
  return (
    <div className={className}>
      <div className='flex justify-center items-center h-full text-dark gap-2'>
        <i
          className='bx bx-loader bx-spin font-lg'
          style={{ color: '#5d5d5d' }}
        />
        {text || 'Loading...'}
      </div>
      {isProgress ? (
        <div className='w-full rounded-full'>
          <div
            className='bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full'
            style={{ width: `${progress}%` }}
          >
            {progress}%
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default Loader
