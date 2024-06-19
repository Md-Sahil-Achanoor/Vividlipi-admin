import { ErrorMessage } from 'formik'
import React, { FC } from 'react'
import { FormikFileUpload } from '@/types'
import TextError from './TextError'

const FileUploadCom: FC<FormikFileUpload> = ({
  field: { onChange, ...rest },
  form: { touched, errors },
  label,
  onChangeCallback,
  isRequired,
  ...props
}) => {
  // const isCustom = isPassword || isTel;
  const isValid = !!(touched[rest.name] && errors[rest.name] && !props.disabled)
  return (
    <div className='w-full mb-4'>
      {label ? (
        <label className='text-form_placeholder mb-1 font-semibold text-md'>
          {label}
          {isRequired ? (
            <span className='text-asterisk_color ml-[1px]'>{' *'}</span>
          ) : (
            ''
          )}
        </label>
      ) : null}
      <div
        className={`flex items-center border-2 mt-2 rounded-xl isPassword ${
          isValid ? 'border-error_color' : 'border-form_border'
        }`}
      >
        <input
          style={{
            border: 'none',
            boxShadow: 'none',
          }}
          className={`w-full p-3 pl-0 ${'focus-visible:outline-none border-2 rounded-xl'} placeholder:text-form_label placeholder:text-semibold`}
          autoComplete='false'
          onChange={(e) => {
            const data = e
            onChangeCallback && onChangeCallback(data)
            onChange && onChange(e)
          }}
          // onBlur={(e) => {
          //   const data = e;
          //   onBlurCallback && onBlurCallback(data);
          //   onBlur(e);
          // }}
          {...rest}
          {...props}
        />
      </div>
      <ErrorMessage name={rest.name}>
        {(msg: string) => <TextError text={msg} />}
      </ErrorMessage>
    </div>
  )
}

export default FileUploadCom
