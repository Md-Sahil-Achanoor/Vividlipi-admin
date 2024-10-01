import { CustomInputCom } from '@/types'
import { cn } from '@/utils/twmerge'
import { ErrorMessage } from 'formik'
import { FC, useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { FaRegQuestionCircle } from 'react-icons/fa'
import TooltipButton from '../atoms/TooltipButton'
import TextError from './TextError'

const CustomInput: FC<CustomInputCom> = ({
  field: { onChange, onBlur, ...rest },
  form,
  label,
  id,
  isPassword,
  // handleViewPassword,
  onChangeCallback,
  isRequired,
  onBlurCallback,
  leftIcon,
  rightIcon,
  className,
  horizontal,
  tooltip,
  ...props
}) => {
  const [viewPassword, setViewPassword] = useState<boolean>(false)
  const Input = () => {
    if (props.type === 'textarea') {
      return (
        <textarea
          className='input_filed'
          autoComplete='false'
          onChange={(e) => {
            const data = e
            onChangeCallback && onChangeCallback(data)
            onChange && onChange(e)
          }}
          onBlur={(e) => {
            const data = e
            onBlurCallback && onBlurCallback(data)
            onBlur(e)
          }}
          {...rest}
          {...props}
        />
      )
    }
    return (
      <input
        id={id}
        className={`input_filed ${className || ''}`}
        autoComplete='false'
        onWheel={(e) => e?.currentTarget?.blur()}
        onKeyDown={(evt) =>
          props?.type === 'number'
            ? ['e', 'E', '+', 'ArrowDown', 'ArrowUp'].includes(evt.key) &&
              evt.preventDefault()
            : {}
        }
        onChange={(e) => {
          const data = e
          onChangeCallback && onChangeCallback(data)
          onChange && onChange(e)
        }}
        onBlur={(e) => {
          const data = e
          onBlurCallback && onBlurCallback(data)
          onBlur(e)
        }}
        {...rest}
        {...props}
        type={isPassword ? (viewPassword ? 'text' : 'password') : props.type}
      />
    )
  }
  const isValid = !!(
    form.touched[rest.name] &&
    form.errors[rest.name] &&
    !props.disabled
  )

  return (
    <div
      className={cn(
        'w-full mb-4',
        horizontal && 'flex justify-center items-center gap-4 mb-3',
      )}
    >
      <div
        className={cn(
          'w-initial',
          horizontal &&
            'w-full lg:w-4/12 p-0 INPUT_DIV flex items-center justify-end ',
        )}
      >
        {label ? (
          <label
            className={cn(
              'text-black text-[14px]',
              isRequired && horizontal && 'flex items-center gap-1 font-medium',
            )}
            htmlFor={id}
          >
            {isRequired && horizontal ? (
              <span className='text-red-600 ml-[1px]'>*</span>
            ) : null}
            {label}
            {isRequired && !horizontal ? (
              <span className='text-red-600 ml-[1px]'>*</span>
            ) : null}
          </label>
        ) : null}
        {horizontal && tooltip && (
          <TooltipButton className='w-max' isInnerRelative text={tooltip}>
            <FaRegQuestionCircle className='text-2xl ml-2' />
          </TooltipButton>
        )}
      </div>
      <div className={cn(horizontal ? 'w-full lg:w-8/12' : 'w-full')}>
        <div
          className={cn(
            `border border-black flex flex-1 items-center px-3 py-1 my-2 rounded-md shadow-sm`,
            isValid ? 'border-red-600' : '',
          )}
        >
          {leftIcon && leftIcon()}
          {leftIcon && leftIcon()}
          {Input()}
          {rightIcon && rightIcon()}
          {isPassword ? (
            <div
              className={cn(
                'text-content-placeholder mx-1 cursor-pointer text-lg',
                rest?.value ? 'visible' : 'invisible',
              )}
              onClick={() => setViewPassword(!viewPassword)}
            >
              {viewPassword ? (
                <AiFillEye className='text-custom-gray-100' />
              ) : (
                <AiFillEyeInvisible className='text-custom-gray-100' />
              )}
            </div>
          ) : null}
        </div>
        <ErrorMessage name={rest.name}>
          {(msg) => <TextError text={msg} />}
        </ErrorMessage>
      </div>
    </div>
  )
}

export default CustomInput
