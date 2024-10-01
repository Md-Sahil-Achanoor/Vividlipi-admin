import { PhoneInputType } from '@/types'
import { cn } from '@/utils/twmerge'
import { ErrorMessage } from 'formik'
import { FC } from 'react'
import { FaRegQuestionCircle } from 'react-icons/fa'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import TextError from './TextError'

const PhoneInputComp: FC<PhoneInputType> = ({
  field: { ...field },
  form: { touched, errors, setFieldValue },
  label,
  id,
  onChangeCallback,
  isRequired,
  horizontal,
  tooltip,
  ...props
}) => {
  const isDarkMode = document.documentElement.classList.contains('dark')
  const isValid =
    touched[field.name] && errors[field.name] && !props.disabled ? true : false
  return (
    <div
      className={cn(
        'mb-4 w-full',
        horizontal && 'mb-3 flex items-center justify-center gap-4',
      )}
    >
      <div
        className={cn(
          'w-initial',
          horizontal &&
            'INPUT_DIV flex w-full items-center justify-end p-0 lg:w-4/12',
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
          <FaRegQuestionCircle className='ml-2 text-2xl' />
        )}
      </div>
      <div className={cn(horizontal ? 'w-full lg:w-8/12' : 'w-full')}>
        <div
          className={cn(
            `my-2 flex flex-1 items-center rounded-lg border border-input focus-within:border-input`,
            isValid ? 'border-red-600' : '',
          )}
        >
          <PhoneInput
            {...field}
            country={'in'}
            // value={phone.number}
            // enableSearch
            // disableSearchIcon
            onChange={(phone, data) => {
              // console.log(data, phone)
              onChangeCallback && onChangeCallback(phone)
              setFieldValue('countryInfo', data)
              setFieldValue(field?.name, phone)
            }}
            // inputClass="w-full py-2.5 border border-input pl-0 focus-visible:outline-none border-2 rounded-lg"
            // containerClass=""

            inputStyle={{
              width: '100%',
              //   padding: '1rem 0',
              paddingBottom: '1.25rem',
              paddingTop: '1.25rem',
              backgroundColor: isDarkMode ? '#111113' : 'white',
              borderColor: isDarkMode ? '#1e293b' : '#e2e8f0',
            }}
            buttonStyle={{
              backgroundColor: isDarkMode ? '#111113' : 'white',
              borderColor: isDarkMode ? '#1e293b' : '#e2e8f0',
            }}
            buttonClass='button_hover'
            dropdownStyle={{
              backgroundColor: isDarkMode ? '#111113' : 'white',
            }}
            containerStyle={{
              borderColor: errors?.[field.name] ? '#e53e3e' : '#e2e8f0',
              width: '100%',
            }}
            inputProps={{
              autoFocus: true,
              required: true,
              placeholder: 'Enter your phone number',
              //   onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => {
              //     if (event.key === 'Enter') {
              //       event.preventDefault()
              //       onSubmit()
              //     }
              //   },
            }}
            {...props}
            // isValid={(value, country) => {
            //   if (value.length < 10) {
            //     setError("Enter a valid phone number");
            //     return false;
            //   } else {
            //     setError(null);
            //     return true;
            //   }
            // }}
          />
        </div>
        {/* <PhoneInput
        inputClass="w-full py-2.5 pl-0 focus-visible:outline-none border-2 rounded-lg"
        searchClass="w-full telSearch"
        dropdownClass=""
        disableSearchIcon
        // containerClass="mt-2"
        enableSearch
        // countryCodeEditable={false}
        onChange={(phone, data) => {
          // console.log(data);
          onChangeCallback && onChangeCallback(phone)
          setFieldValue('countryInfo', data)
          setFieldValue(field?.name, phone)
        }}
        {...field}
        {...props}
      /> */}
        <ErrorMessage name={field.name}>
          {(msg) => <TextError text={msg} />}
        </ErrorMessage>
      </div>
    </div>
  )
}

export default PhoneInputComp
