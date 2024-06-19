import { InputCheckbox } from '@/types'
import { ErrorMessage } from 'formik'
import { Link } from 'react-router-dom'
import TextError from './TextError'

const CheckBox = ({
  field: { onChange, ...rest },
  form,
  label,
  id,
  onChangeCallback,
  isTerms,
  ...props
}: InputCheckbox) => {
  return (
    <div className=''>
      <div className='flex items-center'>
        <input
          id={id}
          onChange={(e) => {
            const data = e
            onChange(e)
            onChangeCallback && onChangeCallback(data)
          }}
          className='check_box'
          {...rest}
          {...props}
        />
        {label ? (
          <label className='ml-2 text-sm text-content-tertiary ' htmlFor={id}>
            {label}
            {isTerms ? (
              <>
                <br />
                <Link
                  to='/termsandcondition'
                  className='text-primary font-semibold font-inter text-sm'
                >
                  Terms & Conditions
                </Link>
              </>
            ) : null}
          </label>
        ) : null}
      </div>
      <ErrorMessage name={rest.name}>
        {(msg: string) => <TextError text={msg} />}
      </ErrorMessage>
    </div>
  )
}

export default CheckBox
