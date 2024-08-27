import { CheckboxGroupProps } from '@/types'
import { cn } from '@/utils/twmerge'
import { ErrorMessage, Field, FieldProps } from 'formik'
import { FaRegQuestionCircle } from 'react-icons/fa'
import TooltipButton from '../atoms/TooltipButton'
import TextError from './TextError'

function CheckboxGroup(props: CheckboxGroupProps) {
  const {
    label,
    name,
    options,
    isRequired,
    onChangeCallback,
    isMulti,
    isAuth,
    disabledProps,
    horizontal,
    tooltip,
    ...rest
  } = props
  // const values = options?.map((el: any) => el?.value);
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
              horizontal && 'flex items-center gap-1 font-medium',
            )}
            htmlFor={rest?.id}
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
          className={
            `flex items-center gap-2 flex-wrap ${rest?.itemsclass}` || ''
          }
        >
          <Field name={name}>
            {({ field, form }: FieldProps) => {
              return options.map((option, index) => {
                const checked = isMulti
                  ? field?.value?.includes(option.value)
                  : option.value === field?.value
                return (
                  <label
                    className={`duration-300 ${
                      isAuth
                        ? 'w-[40px] h-[40px] rounded-full cursor-pointer text-sm inline-flex items-center justify-center bg-borderClr-gray'
                        : 'border pl-3 pt-3 pb-3 pr-3 flex-1 rounded-md font-medium flex items-center'
                    }  ${
                      checked
                        ? isAuth
                          ? 'bg-pink-500 text-white'
                          : 'shadow-md'
                        : ''
                    } cursor-pointer`}
                    key={option.key + option.value + index}
                    htmlFor={option.value as string}
                  >
                    <input
                      type={rest?.type || 'checkbox'}
                      id={option.value as string}
                      className={`${
                        rest?.type === 'radio'
                          ? 'w-4 h-4 text-pink-500 bg-gray-100 border-gray-300 focus:ring-pink-500'
                          : 'check_box'
                      }`}
                      disabled={
                        disabledProps ? disabledProps(option) : rest?.disabled
                      }
                      {...field}
                      {...rest}
                      hidden={isAuth}
                      value={option?.value?.toString()}
                      onChange={(e) => {
                        onChangeCallback && onChangeCallback(option, e)
                        isMulti
                          ? field.onChange(e)
                          : form.setFieldValue(name, option?.value)
                      }}
                      checked={checked}
                    />
                    <span
                      className={`${
                        isAuth
                          ? ''
                          : 'ml-2 text-sm text-gray-700 dark:text-dark_form_label'
                      } cursor-pointer whitespace-nowrap`}
                    >
                      {option.key}
                    </span>
                  </label>
                )
              })
            }}
          </Field>
        </div>
        <ErrorMessage name={name}>
          {(msg: string) => <TextError text={msg} />}
        </ErrorMessage>
      </div>
    </div>
  )
}

export default CheckboxGroup
