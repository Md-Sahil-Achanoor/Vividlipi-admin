import { cn } from '@/utils/twmerge'

const Tooltip = ({
  text,
  className,
}: {
  text: string
  className?: string
  isIcon?: boolean
}) => {
  return (
    <div
      className={cn(
        'absolute bg-gray-400 text-border-default invisible transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100 group-hover:visible right-0 top-full mt-1 rounded-md px-2 py-0.5 text-[11px] leading-5 after:right-3  after:content-[""] after:absolute after:-top-[5px] after:rotate-45 after:w-2.5 after:h-2.5 after:bg-gray-400 after:border-t after:border-l flex gap-2 z-50 shadow-sm',
        // isTopLeft
        className,
      )}
    >
      <span className='line-clamp-3 text-left whitespace-normal text-white'>
        {text}
      </span>
    </div>
  )
}

export default Tooltip
