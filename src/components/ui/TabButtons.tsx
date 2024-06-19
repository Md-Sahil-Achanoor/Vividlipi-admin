import { ChangeEventType, TabItem } from '@/types'
import { cn } from '@/utils/twmerge'

interface Props<T> {
  data: T[]
  onChangeCallback: (data: T, index?: number) => void
  itemClasses?: string
  containerClass?: string
  isActive: (e?: T, index?: number) => boolean
  renderData: (e: T) => React.ReactElement
  isScrollable?: boolean
  handleScrollToEnd?: () => void
}

const TabButtons = <T extends TabItem>({
  data,
  onChangeCallback,
  itemClasses,
  containerClass,
  isActive,
  renderData,
}: // handleScrollToEnd,
// isScrollable,
Props<T>) => {
  // console.log(`\n\n hasHorizontalScrollbar:`, hasHorizontalScrollbar);

  return (
    <div className={cn('flex item-center', containerClass)}>
      {data?.map((el, idx) => (
        <label
          key={idx}
          className={cn(
            'flex items-center py-2 px-3 border border-r-0 last:border-r first:rounded-l-md last:rounded-r-md cursor-pointer text-sm transition-colors duration-300',
            isActive(el, idx) && 'bg-primary-main text-white',
            itemClasses && itemClasses,
          )}
          htmlFor={el?.type as string}
        >
          <input
            type='checkbox'
            name={el?.type as string}
            id={el?.type as string}
            checked={!!isActive(el, idx)}
            onChange={(_e: ChangeEventType) => {
              onChangeCallback(el, idx)
            }}
            value={el?.type}
            className='w-4 h-4 border border-gray-300 rounded sr-only'
          />
          {renderData(el)}
        </label>
      ))}
    </div>
  )
}

export default TabButtons
