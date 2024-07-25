import { cn } from '@/utils/twmerge'
import Tooltip from './Tooltip'

const TooltipButton = (props: {
  text: string
  className?: string
  isInnerRelative?: boolean
  children?: React.ReactNode
}) => {
  return (
    <div
      className={cn(
        'p-2 rounded-xl group w-max',
        props?.isInnerRelative && 'relative',
      )}
    >
      {props.children}
      <Tooltip {...props} />
    </div>
  )
}

export default TooltipButton
