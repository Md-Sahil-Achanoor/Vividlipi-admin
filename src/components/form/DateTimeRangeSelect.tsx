import { ErrorMessage } from 'formik'
import React, { FC, useEffect } from 'react'
import { CustomInputCom } from '@/types'
import { getTime } from '@/utils/time'
import TextError from './TextError'

const DateTimeRangeSelect: FC<CustomInputCom> = ({
  field: { ...rest },
  form,
  label,
  isRequired,
  leftIcon,
  rightIcon,
  ...props
}) => {
  const [startTime, setStartTime] = React.useState(getTime(rest.value, 0))
  const [endTime, setEndTime] = React.useState(getTime(rest.value, 1))

  useEffect(() => {
    setStartTime(getTime(rest.value, 0))
    setEndTime(getTime(rest.value, 1))
  }, [rest.value])

  useEffect(() => {
    if (startTime && endTime) {
      form.setFieldValue(rest.name, `${startTime}-${endTime}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startTime, endTime])

  useEffect(() => {
    return () => {
      setStartTime('')
      setEndTime('')
    }
  }, [])

  const isValid = !!(
    form.touched[rest.name] &&
    form.errors[rest.name] &&
    !props.disabled
  )

  return (
    <div className='w-full mb-4'>
      {label ? (
        <label className='text-gray-600 text-[14px]'>
          {label}
          {isRequired ? <span className='text-red-600 ml-[1px]'>*</span> : null}
        </label>
      ) : null}
      <div
        className={`border border-gray-300 flex flex-1 items-center px-3 py-1 my-2 rounded-lg shadow-sm ${
          isValid ? 'border-red-600' : ''
        }`}
      >
        {leftIcon && leftIcon()}
        <div className='flex items-center gap-2 date-time'>
          <label htmlFor='start'>
            <input
              type='time'
              id='start'
              name='start'
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className='input_filed picker'
              required
              max={endTime}
            />
          </label>
          <span>-</span>
          <label htmlFor='end'>
            <input
              type='time'
              id='end'
              name='end'
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className='input_filed picker'
              min={startTime}
              required
            />
          </label>
        </div>
        {rightIcon && rightIcon()}
      </div>
      <ErrorMessage name={rest.name}>
        {(msg) => <TextError text={msg} />}
      </ErrorMessage>
    </div>
  )
}

export default DateTimeRangeSelect
