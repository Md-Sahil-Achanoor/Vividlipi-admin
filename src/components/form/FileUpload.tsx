/* eslint-disable no-unsafe-optional-chaining */
import logo from '@/assets/Images/male.png'
import Loader from '@/components/atoms/Loader'
import useFileUploader from '@/hooks/useFileUploader'
import { ChangeEventType, FormikFileUploadProps } from '@/types'
import { displayFileName } from '@/utils/file'
import { cn } from '@/utils/twmerge'
import { ErrorMessage } from 'formik'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { BiLoaderCircle, BiTrash } from 'react-icons/bi'
import { FaRegQuestionCircle } from 'react-icons/fa'
import { LuImagePlus } from 'react-icons/lu'
import TooltipButton from '../atoms/TooltipButton'
import UploadFile from '../ui/Upload'
import TextError from './TextError'

const FileUpload = ({
  label,
  id,
  field: { name },
  form: { values, setFieldValue },
  isRequired,
  acceptFile = {
    'image/jpg': [],
    'image/png': [],
    'image/jpeg': [],
  },
  uploadCallBack,
  isUpload = true,
  resolution,
  supportedString = '', // "jpg, png, jpeg"
  isEdit = false,
  disabled = false,
  isSuggestion = true,
  horizontal = false,
  tooltip = '',
  ...props
}: FormikFileUploadProps) => {
  const [reRender, setReRender] = useState(false)
  // const dispatch = useDispatch();

  useEffect(() => {
    setReRender((prev) => !prev)
  }, [values?.[name], name])

  const { onUploadFile, isLoading, ref, progress } = useFileUploader({
    uploadCallBack: uploadCallBack || (() => {}),
    isMultiple: props.isMultiple,
    name,
    values,
  })

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
        {isEdit ? (
          <div className='flex gap-8 items-center'>
            <label
              htmlFor={id}
              className='block relative w-24 lg:w-28 h-24 lg:h-28 cursor-pointer'
            >
              {isLoading && (
                <div className='absolute top-0 left-0 w-full h-full bg-gray-100/50 z-10 flex justify-center items-center rounded-full'>
                  <BiLoaderCircle className='text-pink-500 text-3xl animate-spin duration-400' />
                </div>
              )}
              <div className='absolute -top-2 -right-2 bg-bg-gray p-3 rounded-full z-20'>
                <LuImagePlus />
              </div>
              <input
                hidden
                type='file'
                id={id}
                multiple={props.isMultiple}
                disabled={disabled || isLoading}
                accept={Object.keys(acceptFile)?.join(',')}
                ref={ref}
                onChange={(e: ChangeEventType) => {
                  if (!e.target?.files) return
                  if (e.target?.files?.length > 0) {
                    const files = Array.from(e.target.files)
                    isUpload
                      ? onUploadFile(files)
                      : uploadCallBack && uploadCallBack(files)
                  }
                }}
              />
              <img
                alt='logo'
                src={values?.[name] || logo}
                className='rounded-full object-contain text-center object-center w-full h-full'
                loading='lazy'
              />
            </label>
            {/* <div className="text-sm text-content-tertiary mb-2 mt-1 w-[300px]">
              <span>We recommend an image of at least {resolution}px.</span>
            </div> */}
          </div>
        ) : props.isProfile ? (
          <div>
            {/* <div className="text-sm text-content-tertiary mb-3 mt-1 w-[40%]">
              <span>
                Upload photo. We recommend an image of at least {resolution}px.x
              </span>
            </div> */}
            <input
              className='block w-full text-sm font-medium text-gray-900 cursor-pointer bg-white focus:outline-none file:px-4 file:py-[10px] file:bg-white file:border-pink-500 file:border-1 file:rounded-lg file:text-pink-500 file:text-semibold file:text-md file:cursor-pointer disabled:cursor-no-drop file:disabled:cursor-no-drop'
              id={id}
              type='file'
              multiple={props.isMultiple}
              disabled={disabled || isLoading}
              accept={Object.keys(acceptFile)?.join(',')}
              ref={ref}
              onChange={(e: ChangeEventType) => {
                if (!e.target?.files || !uploadCallBack) return
                if (e.target?.files?.length > 0) {
                  const files = Array.from(e.target.files)
                  isUpload ? onUploadFile(files) : uploadCallBack(files)
                }
              }}
            />
          </div>
        ) : (
          <UploadFile
            onDropCallBack={(files, rejectFile) => {
              // console.log(`UploadContent ~ file`, files, rejectFile);
              // if (!uploadCallBack) {
              //   return;
              // }
              if (rejectFile && rejectFile?.length > 0) {
                toast.error(rejectFile?.[0]?.errors?.[0]?.code)
              }
              if (files.length > 0) {
                isUpload
                  ? onUploadFile(files)
                  : uploadCallBack && uploadCallBack(files)
              }
            }}
            dropZoneClass={props?.dropZoneClass}
            acceptFile={acceptFile}
            isMultiple={props.isMultiple}
            dropText={props?.dropText}
            reRender={reRender}
            isBrowse={props?.isBrowse}
            imageDefault={props?.imageDefault}
            maxFileSize={props?.maxFileSize}
            isDisabled={disabled || (isLoading as boolean)}
            // {...props}
          />
        )}
        {!isEdit && isLoading ? (
          <div className='my-2'>
            <Loader
              text='Uploading...'
              isProgress={false}
              progress={progress}
            />
          </div>
        ) : null}
        {!props.isProfile && isSuggestion && (
          <div className='flex items-center justify-between my-2'>
            <span className='text-textClr-muted text-sm'>
              File supported:{' '}
              <span className='uppercase text-sm'>
                {supportedString ||
                  Object.keys(acceptFile)?.map(
                    (el) => `${el?.split('/')?.[1] || ''}, `,
                  )}
              </span>
            </span>
            <span className='text-textClr-muted text-sm'>
              {props?.maxFileSize
                ? `Maximum file size: ${props?.maxFileSize}MB`
                : `Size: ${resolution}PX`}
            </span>
          </div>
        )}
        {props.isMultiple ? (
          <div>
            {values?.[name]?.map((el: string, index: number) => (
              <div
                key={index}
                className='flex items-center justify-between my-2'
              >
                <a
                  title='Click to download'
                  className='text-primary-main hover:underline'
                  href={el}
                  download
                >
                  {displayFileName(el)}
                </a>
                <button
                  className='text-red-600 text-sm cursor-pointer'
                  type='button'
                  onClick={() => {
                    const newValues = [...values?.[name]]
                    newValues.splice(index, 1)
                    setFieldValue(name, newValues)
                  }}
                >
                  <BiTrash />
                </button>
              </div>
            ))}
          </div>
        ) : (
          !isEdit && (
            <div>
              {!isUpload ? (
                <span className='text-primary-main hover:underline flex-1 break-all'>
                  {typeof values?.[name] === 'string'
                    ? values?.[name]
                    : values?.[name]?.name}
                </span>
              ) : (
                <a
                  title='Click to download'
                  className='text-primary-main hover:underline'
                  href={values?.[name]}
                  download={isUpload}
                >
                  {displayFileName(values?.[name])}
                </a>
              )}
            </div>
          )
        )}
        <ErrorMessage name={name}>
          {(msg) => <TextError text={msg} />}
        </ErrorMessage>
      </div>
    </div>
  )
}

export default FileUpload
