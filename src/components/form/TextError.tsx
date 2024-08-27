import { FC } from 'react'

type Props = {
  text: string | null
}

const TextError: FC<Props> = (props) => {
  return (
    <div className='mt-1 capitalize select-none text-red-500 text-[11px] font-normal'>
      {props?.text}
    </div>
  )
}

export default TextError
