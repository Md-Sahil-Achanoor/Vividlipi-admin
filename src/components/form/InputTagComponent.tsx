import { ErrorMessage } from 'formik'
import React from 'react'
import { FaRegQuestionCircle } from 'react-icons/fa'
import { TagsInput } from 'react-tag-input-component'
import { twMerge } from 'tailwind-merge'
import { cn } from '@/utils/twmerge'
import TextError from './TextError'

const QuillComponent = ({
  label,
  id,
  field: { name, onChange, onBlur, ...rest },
  form: { setFieldTouched },
  isRequired,
  ...props
}: any) => {
  // console.log(`\n\n ~ file: QuillComponent.tsx:14 ~ rest:`, name, rest);
  return (
    <div
      className={cn(
        'w-full mb-4',
        props.horizontal && 'flex justify-center items-center gap-4 mb-3',
      )}
    >
      <div
        className={cn(
          'w-initial',
          props.horizontal &&
            'w-full lg:w-4/12 p-0 INPUT_DIV flex items-center justify-end ',
        )}
      >
        {label ? (
          <label
            className={cn(
              'text-black text-[14px]',
              isRequired &&
                props?.horizontal &&
                'flex items-center gap-1 font-medium',
            )}
            htmlFor={id}
          >
            {isRequired && props?.horizontal ? (
              <span className='text-red-600 ml-[1px]'>*</span>
            ) : null}
            {label}
            {isRequired && !props?.horizontal ? (
              <span className='text-red-600 ml-[1px]'>*</span>
            ) : null}
          </label>
        ) : null}
        {props.horizontal && props.tooltip && (
          <FaRegQuestionCircle className='text-2xl ml-2' />
        )}
      </div>
      <div className={cn(props?.horizontal ? 'w-full lg:w-8/12' : 'w-full')}>
        <div className={twMerge('w-full', props?.classes)}>
          <TagsInput
            value={rest?.value}
            onChange={(e) => onChange({ target: { value: e, name } })}
            onBlur={() => setFieldTouched(name, true)}
            {...rest}
            classNames={{
              tag: 'tag',
              input: 'border-none',
            }}
          />
        </div>
        <ErrorMessage name={name}>
          {(msg) => <TextError text={msg} />}
        </ErrorMessage>
      </div>
    </div>
  )
}

export default QuillComponent
